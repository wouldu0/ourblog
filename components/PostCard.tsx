import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface PostCardProps {
  id: string
  title: string
  excerpt: string
  imageUrl: string
  categories: string[]
  date: string
}

export default function PostCard({ id, title, excerpt, imageUrl, categories, date }: PostCardProps) {
  // Format date correctly if it's ISO, e.g. "Oct 12, 2024"
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric'
  })

  return (
    <Link href={`/posts/${id}`} className="block">
      <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-[#EBE8DF] flex flex-col group hover:shadow-md transition-shadow h-full">
        <div className="relative h-48 w-full">
          {/* We use standard img for simplicity with external urls, or next/image with unoptimized if domains aren't configured */}
          <img 
            src={imageUrl} 
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <div className="p-6 flex flex-col flex-1">
          <div className="flex gap-2 mb-4">
            {categories.map((category, idx) => (
              <span 
                key={idx} 
                className={`px-3 py-1 rounded-full text-xl font-semibold ${
                  idx === 0 
                    ? 'bg-[#F2EBBF] text-[#7A6D17]' 
                    : 'bg-[#EAF0E4] text-[#3B702B]'
                }`}
              >
                {category}
              </span>
            ))}
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-[#3B702B] transition-colors">
            {title}
          </h2>
          <p className="text-gray-600 mb-6 flex-1 line-clamp-3 text-xl">
            {excerpt}
          </p>
          
          <div className="border-t border-dashed border-gray-200 pt-4 mt-auto flex items-center justify-between">
            <span className="text-xl font-semibold text-gray-500">{formattedDate}</span>
            <button className="w-8 h-8 rounded-full bg-[#EAF0E4] flex items-center justify-center text-[#3B702B] group-hover:bg-[#3B702B] group-hover:text-white transition-colors">
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}
