import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="w-full bg-[#FAF9F4] border-t border-[#EBE8DF] py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          {/* Logo icon placeholder */}
          <div className="text-[#3B702B]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            </svg>
          </div>
          <span className="text-xl font-bold text-[#3B702B]">해탈한 코드의 숲</span>
        </div>

        <div className="flex flex-wrap items-center gap-8 text-sm font-semibold text-gray-700">
          <Link href="#" className="hover:text-[#3B702B] transition-colors">Archives</Link>
          <Link href="#" className="hover:text-[#3B702B] transition-colors">Guestbook</Link>
          <Link href="#" className="hover:text-[#3B702B] transition-colors">Privacy</Link>
          <Link href="#" className="hover:text-[#3B702B] transition-colors">Support</Link>
        </div>

        <div className="text-sm text-gray-500 font-medium text-center md:text-right">
          © 2026 해탈한 코드의 숲. Built <br /> with zoo0 🌿
        </div>
      </div>
    </footer>
  )
}
