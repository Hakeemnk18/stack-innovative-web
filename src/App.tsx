import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import Services from './components/sections/Services'
import Works from './components/sections/Works'
import Stats from './components/sections/Stats'
import TechStack from './components/sections/TechStack'
import About from './components/sections/About'
import Testimonials from './components/sections/Testimonials'
import CTABanner from './components/sections/CTABanner'
import Contact from './components/sections/Contact'
import WhatsAppButton from './components/ui/WhatsAppButton'

export default function App() {
  return (
    <div className="w-full min-h-screen">
      <Navbar />
      <main className="w-full">
        <Hero />
        <Services />
        <Works />
        <Stats />
        <TechStack />
        <About />
        <Testimonials />
        <CTABanner />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
