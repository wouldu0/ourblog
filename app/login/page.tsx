import { login, signup } from './actions'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default async function LoginPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const searchParams = await props.searchParams
  const mode = searchParams.mode === 'signup' ? 'signup' : 'login'
  const message = searchParams.message

  const isSignup = mode === 'signup'

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative font-sans overflow-hidden bg-transparent">


      <main className="flex-1 flex flex-col justify-center items-center w-full z-10 px-4">
        <div className="relative w-full max-w-[400px]">
          {/* Faint green glow behind/inside the card top right */}
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-green-200/50 rounded-full blur-[60px] pointer-events-none" />

          <div className="relative bg-white/70 backdrop-blur-xl border border-[#EBE8DF] rounded-[32px] p-8 sm:p-10 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.05)] overflow-hidden">
            {/* Inner faint green glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#E8F3E8] to-transparent opacity-80 pointer-events-none rounded-tr-[32px]" />

            <div className="relative z-10">
              <div className="text-center mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-[#2A5921] tracking-tight mb-3">
                  {isSignup ? '새로운 시작' : '환영합니다!'}
                </h1>
                <p className="text-[15px] text-[#5C5A52]">
                  {isSignup ? '해탈한 코드의 숲에 합류하세요.' : '해탈한 코드의 숲으로 로그인하세요.'}
                </p>
              </div>

              <form className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-[13px] font-semibold text-[#3C3A32] ml-2 block">
                    이메일 주소
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                    className="w-full h-12 bg-[#FCFBF8] border border-[#E6E3DB] rounded-full px-5 text-[15px] text-[#3C3A32] placeholder:text-[#AFAEA8] focus:outline-none focus:ring-2 focus:ring-[#BCE0B8] focus:border-[#4B7A42] transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[13px] font-semibold text-[#3C3A32] ml-2 block">
                    비밀번호
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    required
                    className="w-full h-12 bg-[#FCFBF8] border border-[#E6E3DB] rounded-full px-5 text-[15px] text-[#3C3A32] placeholder:text-[#AFAEA8] focus:outline-none focus:ring-2 focus:ring-[#BCE0B8] focus:border-[#4B7A42] transition-all"
                  />
                </div>

                {!isSignup && (
                  <div className="flex justify-end pt-1">
                    <Link href="#" className="text-[13px] font-semibold text-[#2A5921] hover:text-[#1F4218] transition-colors">
                      비밀번호 찾기
                    </Link>
                  </div>
                )}

                {message && (
                  <div className="text-[13px] text-red-600 bg-red-50 p-3 rounded-2xl text-center border border-red-100">
                    {message}
                  </div>
                )}

                <div className="pt-2">
                  <button
                    formAction={isSignup ? signup : login}
                    className="w-full h-12 bg-[#336125] hover:bg-[#254A1A] text-white rounded-full font-medium text-[15px] flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.98]"
                  >
                    {isSignup ? '회원가입' : '로그인'}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>

              <div className="mt-8 text-center text-[14px] text-[#5C5A52]">
                {isSignup ? '이미 계정이 있으신가요? ' : '처음이신가요? '}
                <Link
                  href={isSignup ? '/login' : '/login?mode=signup'}
                  className="font-bold text-[#2A5921] hover:text-[#1F4218] transition-colors"
                >
                  {isSignup ? '로그인하기' : '회원가입하기'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="w-full py-8 text-center z-10 bg-[#F7F5EE] border-t border-[#EBE8DF]">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-[14px]">
          <span className="font-bold text-[#2A5921] text-lg tracking-tight">해탈한 코드의 숲</span>
          <div className="flex gap-4 sm:gap-6 text-[#5C5A52] font-medium">
            <Link href="#" className="hover:text-[#2A5921] transition-colors">아카이브</Link>
            <Link href="#" className="hover:text-[#2A5921] transition-colors">방명록</Link>
            <Link href="#" className="hover:text-[#2A5921] transition-colors">개인정보처리방침</Link>
            <Link href="#" className="hover:text-[#2A5921] transition-colors">고객지원</Link>
          </div>
          <span className="text-[#8B8982] text-[13px]">
            © 2026 해탈한 코드의 숲. Built with leafy love.
          </span>
        </div>
      </footer>
    </div>
  )
}
