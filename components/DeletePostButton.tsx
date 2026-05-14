'use client'

import { Trash2 } from 'lucide-react'
import { deletePost } from '@/app/posts/actions'
import { useState } from 'react'

export default function DeletePostButton({ postId }: { postId: string }) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (confirm('정말로 이 글을 삭제하시겠습니까?')) {
      setIsDeleting(true)
      try {
        await deletePost(postId)
      } catch (error) {
        alert('글 삭제 중 오류가 발생했습니다.')
        setIsDeleting(false)
      }
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="w-14 h-14 bg-white rounded-full border border-[#EBE8DF] flex items-center justify-center text-[#EFA688] hover:bg-[#FFF4F0] hover:text-[#D15D3B] hover:scale-105 transition-all shadow-md disabled:opacity-50"
    >
      <Trash2 className="w-6 h-6" />
    </button>
  )
}
