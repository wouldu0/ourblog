'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import PostCard from './PostCard'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Post {
  id: string
  title: string
  excerpt: string
  image_url: string
  categories: string[]
  created_at: string
}

export default function HomePageClient() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 3
  
  const supabase = createClient()

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true)
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (!error && data) {
        setPosts(data)
      }
      setLoading(false)
    }

    fetchPosts()
  }, [supabase])

  // Get unique categories
  const allCategories = ['All', ...Array.from(new Set(posts.flatMap(p => p.categories)))]

  // Filter posts
  const filteredPosts = selectedCategory === 'All' 
    ? posts 
    : posts.filter(p => p.categories.includes(selectedCategory))

  // Pagination logic
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage, 
    currentPage * postsPerPage
  )

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setCurrentPage(1) // Reset to first page on filter change
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-6">
      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {allCategories.map(category => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`px-5 py-2 rounded-full text-xl font-semibold transition-colors ${
              selectedCategory === category 
                ? 'bg-[#3B702B] text-white' 
                : 'bg-white text-gray-600 hover:bg-[#EAF0E4] border border-[#EBE8DF]'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3B702B]"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentPosts.map(post => (
              <PostCard
                key={post.id}
                id={post.id}
                title={post.title}
                excerpt={post.excerpt}
                imageUrl={post.image_url}
                categories={post.categories}
                date={post.created_at}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-16 mb-20">
              <button 
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-500 shadow-sm border border-[#EBE8DF] disabled:opacity-50 hover:bg-gray-50"
              >
                <ChevronLeft size={18} />
              </button>
              
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i + 1)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-xl transition-colors ${
                    currentPage === i + 1 
                      ? 'bg-[#3B702B] text-white' 
                      : 'bg-white text-gray-700 shadow-sm border border-[#EBE8DF] hover:bg-gray-50'
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button 
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-500 shadow-sm border border-[#EBE8DF] disabled:opacity-50 hover:bg-gray-50"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
