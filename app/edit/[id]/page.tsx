'use client'

import { useState, useRef, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Bold, Italic, Link as LinkIcon, Code, Image as ImageIcon, Save } from 'lucide-react'
import { createBrowserClient } from '@supabase/ssr'
import Footer from '@/components/Footer'

const PREDEFINED_CATEGORIES = ['Technology', 'Food', 'Lifestyle', 'Travel', 'Architecture', 'Design']

export default function EditPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const params = use(paramsPromise)
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const lineNumbersRef = useRef<HTMLDivElement>(null)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', params.id)
        .single()

      if (error || !data) {
        setErrorMsg('게시글을 불러오는 데 실패했습니다.')
        setIsLoading(false)
        return
      }

      setTitle(data.title)
      // Strip HTML tags for editing if they were stored as HTML
      // If we store raw markdown, this is easier. For now, assuming raw-ish content.
      setContent(data.content.replace(/<p>|<\/p>|<h1>|<\/h1>|<h2>|<\/h2>|<h3>|<\/h3>|<blockquote>|<\/blockquote>|<pre><code>|<\/code><\/pre>/g, '\n\n').trim())
      setExcerpt(data.excerpt)
      setImageUrl(data.image_url)
      setSelectedCategories(data.categories)
      setIsLoading(false)
    }

    fetchPost()
  }, [params.id, supabase])

  const handleScroll = () => {
    if (textareaRef.current && lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop
    }
  }

  const linesCount = content.split('\n').length
  const lines = Array.from({ length: Math.max(linesCount, 20) }, (_, i) => i + 1)

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    )
  }

  const handleUpdate = async () => {
    if (!title.trim() || !content.trim()) {
      setErrorMsg('제목과 본문을 모두 입력해주세요!')
      return
    }
    
    setIsSubmitting(true)
    setErrorMsg('')
    
    try {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        setErrorMsg('수정 권한이 없습니다. 로그인이 필요합니다.')
        setIsSubmitting(false)
        return
      }

      // Re-format into simple HTML
      const formattedContent = content
        .split('\n\n')
        .map(paragraph => {
          if (paragraph.startsWith('# ')) return `<h1>${paragraph.replace('# ', '')}</h1>`
          if (paragraph.startsWith('## ')) return `<h2>${paragraph.replace('## ', '')}</h2>`
          if (paragraph.startsWith('### ')) return `<h3>${paragraph.replace('### ', '')}</h3>`
          if (paragraph.startsWith('> ')) return `<blockquote>${paragraph.replace('> ', '')}</blockquote>`
          if (paragraph.startsWith('```')) return `<pre><code>${paragraph.replace(/```/g, '')}</code></pre>`
          return `<p>${paragraph}</p>`
        })
        .join('')

      const finalExcerpt = excerpt.trim() || content.substring(0, 100) + '...'

      const { error: updateError } = await supabase
        .from('posts')
        .update({
          title,
          content: formattedContent,
          excerpt: finalExcerpt,
          image_url: imageUrl,
          categories: selectedCategories.length > 0 ? selectedCategories : ['Technology'],
          read_time: Math.ceil(content.split(' ').length / 200) || 5
        })
        .eq('id', params.id)

      if (updateError) throw updateError

      router.push(`/posts/${params.id}`)
      router.refresh()
    } catch (err: any) {
      setErrorMsg(err.message || '수정 중 오류가 발생했습니다.')
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FCFAF6]">
        <div className="text-3xl font-bold text-[#3B702B] animate-pulse">게시글 로딩 중...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FCFAF6] font-sans flex flex-col relative text-xl">
      <div 
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.15]" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='50' y='65' font-size='40' text-anchor='middle' opacity='0.5'%3E%F0%9F%8D%83%3C/text%3E%3C/svg%3E")`,
          backgroundSize: '120px 120px',
          backgroundPosition: 'center'
        }}
      />

      <header className="relative z-10 w-full h-20 border-b border-[#EBE8DF] bg-white/50 backdrop-blur-md flex items-center justify-between px-6 sm:px-10">
        <Link href={`/posts/${params.id}`} className="flex items-center gap-2 text-[#3B702B] font-semibold text-2xl hover:text-[#2A5921] transition-colors">
          <ArrowLeft size={24} />
          돌아가기
        </Link>
        <div className="flex items-center gap-4">
          <button 
            onClick={handleUpdate}
            disabled={isSubmitting}
            className="px-6 py-2.5 rounded-full bg-[#336125] text-white font-semibold text-2xl flex items-center gap-2 hover:bg-[#254A1A] transition-colors shadow-md disabled:opacity-50"
          >
            <Save size={20} />
            {isSubmitting ? '수정 중...' : '수정 완료'}
          </button>
        </div>
      </header>

      <main className="relative z-10 flex-1 flex flex-col lg:flex-row gap-6 p-6 sm:p-10 w-full max-w-[1600px] mx-auto overflow-hidden">
        <div className="flex-1 flex flex-col min-w-0">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력하세요..."
            className="w-full bg-transparent text-4xl sm:text-5xl font-bold text-[#1F1E1A] placeholder:text-[#C5C3BB] focus:outline-none mb-8 mt-4 tracking-tight"
          />

          <div className="flex-1 bg-white/70 backdrop-blur-xl border border-[#EBE8DF] rounded-[32px] overflow-hidden shadow-sm flex flex-col">
            <div className="h-14 border-b border-[#EBE8DF] bg-[#FDFCF9] flex items-center justify-between px-6">
              <span className="font-semibold text-[#5C5A52] text-2xl">마크다운 본문</span>
              <div className="flex items-center gap-4 text-[#8B8982]">
                <Bold size={20} /><Italic size={20} /><LinkIcon size={20} /><Code size={20} /><ImageIcon size={20} />
              </div>
            </div>

            <div className="flex-1 flex overflow-hidden">
              <div ref={lineNumbersRef} className="w-16 flex-shrink-0 bg-[#F7F5EE] border-r border-[#EBE8DF] text-right pr-4 pt-6 pb-6 text-[#C5C3BB] font-mono text-lg select-none overflow-hidden">
                {lines.map(line => <div key={line} className="h-8 leading-8">{line}</div>)}
              </div>
              <textarea
                ref={textareaRef}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onScroll={handleScroll}
                className="flex-1 w-full h-full bg-transparent resize-none focus:outline-none p-6 font-mono text-lg text-[#1F1E1A] leading-8 whitespace-pre-wrap overflow-auto"
                spellCheck={false}
              />
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[400px] flex flex-col gap-6 mt-4 lg:mt-0 flex-shrink-0">
          <div className="bg-white/70 backdrop-blur-xl border border-[#EBE8DF] rounded-[32px] p-6 shadow-sm">
            <h3 className="text-3xl font-bold text-[#1F1E1A] mb-6 flex items-center gap-2">
              <span className="text-2xl">⚙️</span> 글 수정 설정
            </h3>

            {errorMsg && <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-2xl text-xl">{errorMsg}</div>}

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-2xl font-semibold text-[#5C5A52]">썸네일 이미지 링크</label>
                <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="w-full bg-[#FCFBF8] border border-[#E6E3DB] rounded-2xl px-4 py-3 text-2xl text-[#3C3A32] focus:outline-none focus:ring-2 focus:ring-[#BCE0B8]" />
              </div>

              <div className="space-y-2">
                <label className="text-2xl font-semibold text-[#5C5A52]">카테고리</label>
                <div className="flex flex-wrap gap-2 pt-1">
                  {PREDEFINED_CATEGORIES.map(cat => (
                    <button
                      key={cat}
                      onClick={() => toggleCategory(cat)}
                      className={`px-4 py-1.5 rounded-full text-xl font-medium transition-colors border ${selectedCategories.includes(cat) ? 'bg-[#EAF0E4] border-[#3B702B] text-[#3B702B]' : 'bg-white border-[#EBE8DF] text-[#AFAEA8]'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-2xl font-semibold text-[#5C5A52]">요약문</label>
                <textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} className="w-full h-32 bg-[#FCFBF8] border border-[#E6E3DB] rounded-2xl px-4 py-3 text-2xl text-[#3C3A32] focus:outline-none focus:ring-2 focus:ring-[#BCE0B8] resize-none" />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
