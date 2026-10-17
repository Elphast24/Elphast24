import { ReactTyped } from 'react-typed'
import { LuArrowUpRight, LuCode, LuMail } from 'react-icons/lu'
import { FaGithub, FaLinkedinIn } from 'react-icons/fa'
import tsaWeb from '../assets/img/works/tsaWeb.png'
import imageClassifier from '../assets/img/works/ImageClassifier.png'
import slinq from '../assets/img/works/slinq.png'
import '../styles/HeroExtras.css'

// One featured project per stage (Design, Build, Ship), from the Projects section.
const FEATURED = [
  { label: 'Featured design', title: 'TSA Web Platform', tags: ['React', 'UI/UX'], image: tsaWeb, href: 'https://bespoke-choux-b0059d.netlify.app/' },
  { label: 'Featured build', title: 'AI Image Classifier', tags: ['AI/ML', 'Python'], image: imageClassifier, href: 'https://amber-katalin-58.tiiny.site/' },
  { label: 'Featured launch', title: 'Slinq', tags: ['Full Stack', 'Dashboard'], image: slinq, href: 'https://slinq-wxgw.onrender.com/' },
]

const STATS = [
  { value: '15+', label: 'Projects shipped' },
  { value: '3+', label: 'Years building' },
  { value: '5+', label: 'Happy clients' },
]

const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com/Elphast24', Icon: FaGithub, external: true },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/samuel-bannor-annor/', Icon: FaLinkedinIn, external: true },
  { label: 'Email', href: 'mailto:samuelbannor44@gmail.com', Icon: LuMail, external: false },
]

// The hero content that sits around the laptop on the white backdrop. It appears once the
// laptop is on screen (`stage` >= 0); the featured project follows the stage.
function HeroExtras({ stage }) {
  const live = stage >= 0

  return (
    <div className={`hero-ui${live ? ' is-live' : ''}`} inert={!live}>
      <h1 className="hero-ui__title">Samuel Bannor Annor, full-stack developer and designer</h1>

      <div className="hero-ui__badge" style={{ '--i': 0 }}>
        <span className="hero-ui__dot" aria-hidden="true" />
        Available for freelance work
      </div>

      <article className="hero-ui__building" style={{ '--i': 1 }}>
        <header>
          <span className="hero-ui__icon" aria-hidden="true"><LuCode /></span>
          <h2>Currently building</h2>
        </header>
        <ul>
          <li>
            <span><strong>Elphast</strong><small>Smart AI assistant</small></span>
            <em>In progress</em>
          </li>
          <li>
            <span><strong>Joekar</strong><small>Sales &amp; inventory system</small></span>
            <em>In progress</em>
          </li>
        </ul>
      </article>

      <div className="hero-ui__base">
        <p className="hero-ui__kicker" style={{ '--i': 2 }}>
          Hi, I&rsquo;m Samuel, a{' '}
          <ReactTyped
            strings={['developer', 'designer', 'innovator']}
            typeSpeed={80}
            backSpeed={50}
            loop
            className="hero-ui__typed"
          />
        </p>

        <div className="hero-ui__actions" style={{ '--i': 3 }}>
          <a href="#portfolio" className="hero-ui__cta">
            View my work
            <span className="hero-ui__cta-icon" aria-hidden="true"><LuArrowUpRight /></span>
          </a>
          <a href="#contact" className="hero-ui__link">Get in touch</a>
        </div>

        <div className="hero-ui__proof" style={{ '--i': 4 }}>
          <dl className="hero-ui__stats">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <dt>{stat.label}</dt>
                <dd>{stat.value}</dd>
              </div>
            ))}
          </dl>
          <ul className="hero-ui__socials">
            {SOCIALS.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  aria-label={social.label}
                  {...(social.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                >
                  <social.Icon aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="hero-ui__featured" style={{ '--i': 5 }}>
        {FEATURED.map((project, index) => (
          <a
            key={project.title}
            className={`hero-ui__project${stage === index ? ' is-active' : ''}`}
            href={project.href}
            target="_blank"
            rel="noreferrer"
            tabIndex={stage === index ? 0 : -1}
            aria-hidden={stage !== index}
          >
            <img src={project.image} alt="" loading="lazy" />
            <span className="hero-ui__project-body">
              <small>{project.label}</small>
              <strong>{project.title}</strong>
              <span className="hero-ui__tags">
                {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </span>
            </span>
            <LuArrowUpRight className="hero-ui__project-arrow" aria-hidden="true" />
          </a>
        ))}
      </div>
    </div>
  )
}

export default HeroExtras
