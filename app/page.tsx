import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import HomePageClient from '@/components/HomePageClient'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-transparent">
      <Navbar />
      <main className="flex-1 flex flex-col items-center pb-20 w-full pt-10">
        <Hero />
        <HomePageClient />
      </main>
      <Footer />
    </div>
  )
}
