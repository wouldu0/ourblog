import Link from 'next/link'
import { Search, PenLine } from 'lucide-react'
import { createClient } from '@/utils/supabase/server'
import { logout } from '@/app/login/actions'

export default async function Navbar() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <nav className="flex items-center justify-between py-6 px-10 max-w-7xl mx-auto w-full relative z-50">
      <div className="flex-1">
        <Link href="/" className="text-2xl font-extrabold text-[#3B702B] tracking-tight">
          해탈한 코드의 숲
        </Link>
      </div>

      <div className="flex-1 flex justify-center">
        <div className="relative w-full max-w-md">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400">
            <Search size={18} />
          </div>
          <input
            type="text"
            placeholder="Search articles..."
            className="w-full pl-12 pr-4 py-3 rounded-full bg-[#EFECE1] border-none focus:ring-2 focus:ring-[#3B702B] focus:outline-none text-gray-700 placeholder-gray-500 transition-shadow"
          />
        </div>
      </div>

      <div className="flex-1 flex items-center justify-end gap-6">
        {user ? (
          <>
            <Link 
              href="/write" 
              className="flex items-center gap-2 text-xl font-medium px-5 py-2 bg-[#447631] text-white rounded-full hover:bg-[#345c25] transition-colors shadow-sm"
            >
              <PenLine size={18} />
              Write
            </Link>
            <form action={logout}>
              <button className="text-xl font-semibold text-gray-800 hover:text-gray-600 transition-colors">
                Logout
              </button>
            </form>
          </>
        ) : (
          <>
            <Link href="/login" className="text-xl font-semibold text-gray-800 hover:text-gray-600 transition-colors">
              Login
            </Link>
            <Link href="/login?mode=signup" className="text-xl font-medium px-5 py-2 bg-[#447631] text-white rounded-full hover:bg-[#345c25] transition-colors shadow-sm">
              Sign-up
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}
