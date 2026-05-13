'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Bold, Italic, Link as LinkIcon, Code, Image as ImageIcon, Send } from 'lucide-react'
import { createBrowserClient } from '@supabase/ssr'
import Footer from '@/components/Footer'

const PREDEFINED_CATEGORIES = ['Technology', 'Food', 'Lifestyle', 'Travel', 'Architecture', 'Design']

export default function WritePage() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [imageUrl, setImageUrl] = useState('/images/react_hooks_garden.png')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const lineNumbersRef = useRef<HTMLDivElement>(null)

  // Handle textarea scroll syncing with line numbers
  const handleScroll = () => {
    if (textareaRef.current && lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop
    }
  }

  // Calculate line numbers
  const linesCount = content.split('\n').length
  const lines = Array.from({ length: Math.max(linesCount, 20) }, (_, i) => i + 1)

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    )
  }

  const handlePublish = async () => {
    if (!title.trim() || !content.trim()) {
      setErrorMsg('제목과 본문을 모두 입력해주세요!')
      return
    }
    
    setIsSubmitting(true)
    setErrorMsg('')
    
    try {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )

      // Get user session to check auth and get author info
      const { data: { session }, error: authError } = await supabase.auth.getSession()
      
      if (authError || !session) {
        setErrorMsg('글을 발행하려면 로그인이 필요합니다.')
        setIsSubmitting(false)
        return
      }

      // Format markdown content as simple HTML for now
      // In a real app, use marked or react-markdown, but we'll store raw markdown and let the display layer handle it,
      // or convert simple paragraphs here. For now, we store raw markdown and rely on a simple renderer or raw display.
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
      const finalCategories = selectedCategories.length > 0 ? selectedCategories : ['Technology']

      const { error: insertError } = await supabase.from('posts').insert([
        {
          title,
          content: formattedContent,
          excerpt: finalExcerpt,
          image_url: imageUrl,
          categories: finalCategories,
          author_name: session.user.email?.split('@')[0] || '해탈한 개발자',
          author_avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${session.user.id}`,
          read_time: Math.ceil(content.split(' ').length / 200) || 5
        }
      ])

      if (insertError) {
        throw insertError
      }

      router.push('/')
      router.refresh()
    } catch (err: any) {
      setErrorMsg(err.message || '글 발행 중 오류가 발생했습니다.')
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#FCFAF6] font-sans flex flex-col relative text-xl">
      {/* Background Pattern */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.15]" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='50' y='65' font-size='40' text-anchor='middle' opacity='0.5'%3E%F0%9F%8D%83%3C/text%3E%3C/svg%3E")`,
          backgroundSize: '120px 120px',
          backgroundPosition: 'center'
        }}
      />

      {/* Top Navigation */}
      <header className="relative z-10 w-full h-20 border-b border-[#EBE8DF] bg-white/50 backdrop-blur-md flex items-center justify-between px-6 sm:px-10">
        <Link href="/" className="flex items-center gap-2 text-[#3B702B] font-semibold text-2xl hover:text-[#2A5921] transition-colors">
          <ArrowLeft size={24} />
          돌아가기
        </Link>
        <div className="flex items-center gap-4">
          <button className="px-6 py-2.5 rounded-full bg-[#F2EBBF] text-[#7A6D17] font-semibold text-2xl hover:bg-[#EAE0AA] transition-colors shadow-sm border border-[#EBE8DF]">
            임시저장
          </button>
          <button 
            onClick={handlePublish}
            disabled={isSubmitting}
            className="px-6 py-2.5 rounded-full bg-[#336125] text-white font-semibold text-2xl flex items-center gap-2 hover:bg-[#254A1A] transition-colors shadow-md disabled:opacity-50"
          >
            <Send size={20} />
            {isSubmitting ? '발행 중...' : '발행하기'}
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 flex flex-col lg:flex-row gap-6 p-6 sm:p-10 w-full max-w-[1600px] mx-auto overflow-hidden">
        
        {/* Editor Section */}
        <div className="flex-1 flex flex-col min-w-0">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력하세요..."
            className="w-full bg-transparent text-4xl sm:text-5xl font-bold text-[#1F1E1A] placeholder:text-[#C5C3BB] focus:outline-none mb-8 mt-4 tracking-tight"
          />

          <div className="flex-1 bg-white/70 backdrop-blur-xl border border-[#EBE8DF] rounded-[32px] overflow-hidden shadow-sm flex flex-col">
            {/* Editor Toolbar */}
            <div className="h-14 border-b border-[#EBE8DF] bg-[#FDFCF9] flex items-center justify-between px-6">
              <span className="font-semibold text-[#5C5A52] text-2xl">마크다운 본문</span>
              <div className="flex items-center gap-4 text-[#8B8982]">
                <button className="hover:text-[#3B702B] transition-colors"><Bold size={20} /></button>
                <button className="hover:text-[#3B702B] transition-colors"><Italic size={20} /></button>
                <button className="hover:text-[#3B702B] transition-colors"><LinkIcon size={20} /></button>
                <button className="hover:text-[#3B702B] transition-colors"><Code size={20} /></button>
                <button className="hover:text-[#3B702B] transition-colors"><ImageIcon size={20} /></button>
              </div>
            </div>

            {/* Editor Area with Line Numbers */}
            <div className="flex-1 flex overflow-hidden">
              <div 
                ref={lineNumbersRef}
                className="w-16 flex-shrink-0 bg-[#F7F5EE] border-r border-[#EBE8DF] text-right pr-4 pt-6 pb-6 text-[#C5C3BB] font-mono text-lg select-none overflow-hidden"
              >
                {lines.map(line => (
                  <div key={line} className="h-8 leading-8">{line}</div>
                ))}
              </div>
              <textarea
                ref={textareaRef}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onScroll={handleScroll}
                placeholder="# 코드가 춤추는 숲에서..."
                className="flex-1 w-full h-full bg-transparent resize-none focus:outline-none p-6 font-mono text-lg text-[#1F1E1A] leading-8 whitespace-pre-wrap overflow-auto"
                spellCheck={false}
              />
            </div>
          </div>
        </div>

        {/* Sidebar Settings Section */}
        <div className="w-full lg:w-[400px] flex flex-col gap-6 mt-4 lg:mt-0 flex-shrink-0">
          <div className="bg-white/70 backdrop-blur-xl border border-[#EBE8DF] rounded-[32px] p-6 shadow-sm">
            <h3 className="text-3xl font-bold text-[#1F1E1A] mb-6 flex items-center gap-2">
              <span className="text-2xl">⚙️</span> 글 설정
            </h3>

            {errorMsg && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-2xl text-xl">
                {errorMsg}
              </div>
            )}

            <div className="space-y-6">
              {/* Thumbnail Image */}
              <div className="space-y-2">
                <label className="text-2xl font-semibold text-[#5C5A52]">썸네일 이미지 링크</label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="/images/example.png"
                  className="w-full bg-[#FCFBF8] border border-[#E6E3DB] rounded-2xl px-4 py-3 text-2xl text-[#3C3A32] focus:outline-none focus:ring-2 focus:ring-[#BCE0B8]"
                />
                {imageUrl && (
                  <div className="mt-3 w-full h-32 rounded-2xl overflow-hidden border border-[#EBE8DF]">
                    <img src={imageUrl} alt="Thumbnail preview" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.src = '/images/react_hooks_garden.png')} />
                  </div>
                )}
              </div>

              {/* Categories */}
              <div className="space-y-2">
                <label className="text-2xl font-semibold text-[#5C5A52]">카테고리</label>
                <div className="flex flex-wrap gap-2 pt-1">
                  {PREDEFINED_CATEGORIES.map(cat => (
                    <button
                      key={cat}
                      onClick={() => toggleCategory(cat)}
                      className={`px-4 py-1.5 rounded-full text-xl font-medium transition-colors border ${
                        selectedCategories.includes(cat)
                          ? 'bg-[#EAF0E4] border-[#3B702B] text-[#3B702B]'
                          : 'bg-white border-[#EBE8DF] text-[#AFAEA8] hover:border-[#C5C3BB]'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Excerpt */}
              <div className="space-y-2">
                <label className="text-2xl font-semibold text-[#5C5A52]">요약문</label>
                <textarea
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="글의 핵심 내용을 짧게 요약해 주세요..."
                  className="w-full h-32 bg-[#FCFBF8] border border-[#E6E3DB] rounded-2xl px-4 py-3 text-2xl text-[#3C3A32] focus:outline-none focus:ring-2 focus:ring-[#BCE0B8] resize-none"
                />
              </div>
            </div>
          </div>
        </div>

      </main>
      
      <Footer />
    </div>
  )
}
