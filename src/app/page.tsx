import Hero from '../components/sections/Hero'
import Services from '../components/sections/Services'
import Packages from '../components/sections/Packages'
import Works from '../components/sections/Works'
import Stats from '../components/sections/Stats'
import TechStack from '../components/sections/TechStack'
import About from '../components/sections/About'
import Testimonials from '../components/sections/Testimonials'
import CTABanner from '../components/sections/CTABanner'
import Contact from '../components/sections/Contact'
import ScrollToHash from '../components/ui/ScrollToHash'

export default function HomePage() {
  return (
    <>
      <ScrollToHash />
      <Hero />
      <Services />
      <Packages />
      <Works />
      <Stats />
      <TechStack />
      <About />
      <Testimonials />
      <CTABanner />
      <Contact />
    </>
  )
}
