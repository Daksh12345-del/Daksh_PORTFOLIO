import useTheme from './hooks/useTheme.js'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import LearningTicker from './components/LearningTicker.jsx'
import About from './components/About.jsx'
import Education from './components/Education.jsx'
import Skills from './components/Skills.jsx'
import Projects from './components/Projects.jsx'
import Experience from './components/Experience.jsx'
import ClientWork from './components/ClientWork.jsx'
import Services from './components/Services.jsx'
import Achievements from './components/Achievements.jsx'
import Testimonials from './components/Testimonials.jsx'
import GithubActivity from './components/GithubActivity.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  const { theme, toggleTheme } = useTheme()

  return (
    <>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <LearningTicker />
        <About />
        <Education />
        <Skills />
        <Projects />
        <Experience />
        <ClientWork />
        <Services />
        <Achievements />
        <Testimonials />
        <GithubActivity />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
