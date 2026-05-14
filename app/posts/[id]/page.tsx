import { createClient } from '@/utils/supabase/server'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Heart, Edit2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import DeletePostButton from '@/components/DeletePostButton'

export default async function PostDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: post } = await supabase
    .from('posts')
    .select('*')
    .eq('id', params.id)
    .single()

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-4xl text-gray-500 font-bold">게시글을 찾을 수 없습니다</h1>
      </div>
    )
  }

  const formattedDate = new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(post.created_at))

  return (
    <div className="relative z-10 flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 flex flex-col items-center pb-20 w-full pt-10">
        <article className="w-full max-w-[800px] px-6 sm:px-12 bg-white/70 backdrop-blur-xl border border-[#EBE8DF] rounded-[32px] p-10 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.05)] relative mt-10">

          {/* Action Buttons */}
          <div className="absolute -top-6 -right-6 flex flex-col gap-3 z-20">
            <button className="w-14 h-14 bg-white rounded-full border border-[#EBE8DF] flex items-center justify-center text-[#7BA05B] hover:bg-[#F4F7F1] hover:text-[#3B702B] hover:scale-105 transition-all shadow-md">
              <Heart className="w-6 h-6" />
            </button>
            {user && (
              <>
                <Link
                  href={`/edit/${params.id}`}
                  className="w-14 h-14 bg-white rounded-full border border-[#EBE8DF] flex items-center justify-center text-[#5C5A52] hover:bg-[#F7F5EE] hover:text-[#1F1E1A] hover:scale-105 transition-all shadow-md"
                >
                  <Edit2 className="w-6 h-6" />
                </Link>
                <DeletePostButton postId={params.id} />
              </>
            )}
          </div>

          {/* Header */}
          <header className="mb-8">
            <div className="flex gap-2 mb-6">
              {post.categories.map((category: string, idx: number) => (
                <span
                  key={idx}
                  className={`px-4 py-1.5 rounded-full text-xl font-semibold ${idx === 0
                      ? 'bg-[#F2EBBF] text-[#7A6D17]'
                      : 'bg-[#EAF0E4] text-[#3B702B]'
                    }`}
                >
                  {category}
                </span>
              ))}
            </div>

            <h1 className="text-5xl sm:text-6xl font-bold text-[#1F1E1A] mb-8 leading-tight tracking-tight">
              {post.title}
            </h1>

            <div className="flex items-center gap-4 border-b border-dashed border-[#EBE8DF] pb-8">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#EBE8DF]">
                <img
                  src={post.author_avatar_url || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Arthur'}
                  alt={post.author_name}
                  className="w-full h-full object-cover bg-green-50"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-2xl text-[#1F1E1A]">{post.author_name}</span>
                <span className="text-[#8B8982] text-xl font-medium">
                  {formattedDate} • {post.read_time}분 소요
                </span>
              </div>
            </div>
          </header>

          {/* Cover Image */}
          {post.image_url && (
            <div className="w-full h-[400px] relative rounded-3xl overflow-hidden mb-12 shadow-md border border-[#EBE8DF]">
              <img
                src={post.image_url}
                alt={post.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          )}

          {/* Content */}
          <div
            className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-[#1F1E1A] prose-p:text-[#5C5A52] prose-p:leading-relaxed prose-p:text-2xl prose-a:text-[#3B702B] prose-strong:text-[#2A5921] prose-blockquote:border-l-4 prose-blockquote:border-[#7BA05B] prose-blockquote:bg-[#F4F7F1] prose-blockquote:p-6 prose-blockquote:rounded-r-2xl prose-blockquote:text-[#5C5A52] prose-blockquote:italic prose-blockquote:not-italic prose-blockquote:font-medium prose-pre:bg-[#F7F5EE] prose-pre:text-[#5C5A52] prose-pre:border prose-pre:border-[#EBE8DF] prose-pre:rounded-2xl prose-img:rounded-3xl prose-img:shadow-lg prose-h3:text-3xl prose-h3:flex prose-h3:items-center prose-h3:gap-2"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

        {/* Comments Section */}
        <section className="w-full max-w-[800px] px-6 mt-16">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-3xl">🍃</span>
            <h2 className="text-4xl font-bold text-[#1F1E1A]">댓글 (2)</h2>
          </div>

          <div className="relative bg-white/70 backdrop-blur-md border border-[#EBE8DF] rounded-3xl p-6 shadow-sm mb-10">
            <div className="absolute -left-4 top-6 w-8 h-8 rounded-full border-4 border-[#EFA688] bg-white z-10" />
            <textarea
              placeholder="따뜻한 한마디를 남겨주세요..."
              className="w-full h-24 bg-[#FDFCF9] border border-[#EBE8DF] rounded-2xl p-4 text-2xl text-[#5C5A52] placeholder:text-[#B5B3AA] focus:outline-none focus:ring-2 focus:ring-[#BCE0B8] focus:border-[#4B7A42] transition-all resize-none"
            />
            <div className="flex justify-end mt-4">
              <button className="px-6 py-2 bg-[#336125] hover:bg-[#254A1A] text-white rounded-full font-medium text-xl flex items-center gap-2 transition-all shadow-md">
                🪴 댓글 남기기
              </button>
            </div>
          </div>

          {/* Static Comments */}
          <div className="space-y-6">
            {/* Comment 1 */}
            <div className="relative pl-12">
              <div className="absolute left-0 top-0 w-8 h-8 rounded-full border border-[#EBE8DF] overflow-hidden bg-white z-10">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Beatrice" alt="Beatrice Wood" />
              </div>
              <div className="bg-[#FFFDF4] border border-[#EBE8DF] rounded-2xl rounded-tl-none p-5 shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-xl text-[#1F1E1A]">Beatrice Wood</span>
                  <span className="text-lg text-[#AFAEA8]">2시간 전</span>
                </div>
                <p className="text-2xl text-[#5C5A52] leading-relaxed italic">
                  I love this perspective! I've been trying to add more of that 'tactile squish' to my recent React projects and the feedback from users has been overwhelmingly positive. They say it feels 'friendlier'.
                </p>
              </div>
            </div>

            {/* Comment 2 */}
            <div className="relative pl-12">
              <div className="absolute left-0 top-0 w-8 h-8 rounded-full border border-[#EBE8DF] overflow-hidden bg-white z-10">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Oliver" alt="Oliver Sprout" />
              </div>
              <div className="bg-[#EAF5EC] border border-[#EBE8DF] rounded-2xl rounded-tl-none p-5 shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-xl text-[#1F1E1A]">Oliver Sprout</span>
                  <span className="text-lg text-[#AFAEA8]">어제</span>
                </div>
                <p className="text-2xl text-[#5C5A52] leading-relaxed italic">
                  That CSS snippet for the button is exactly what I was looking for. Simple, but effective. Thanks for sharing, Arthur!
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
