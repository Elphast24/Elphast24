import { ReactTyped } from 'react-typed'
import { LuArrowUpRight, LuCode, LuMail } from 'react-icons/lu'
import { FaGithub, FaLinkedinIn } from 'react-icons/fa'
import {
  HTML5, CSS3, JavaScript, TypeScript, React as ReactIcon, NodeJs, ExpressJsLight, MongoDB, Python,
  Git, GitHubDark, Redux, TailwindCSS, Sass, Figma, Firebase, ViteJS,
} from 'developer-icons'
import sopSite from '../assets/img/works/sop.png'
import imageClassifier from '../assets/img/works/ImageClassifier.png'
import titi from '../assets/img/works/titi.png'
import adongo from '../assets/img/clients/adongo-foundation.png'
import adroit360 from '../assets/img/clients/adroit360.png'
import conversibl from '../assets/img/clients/CON-green.png'
import elphast from '../assets/img/clients/elphast.png'
import helperHelp from '../assets/img/clients/helper-help.png'
import oneSky from '../assets/img/clients/one-sky.png'
import palm from '../assets/img/clients/PUC-Logo.png'
import sopt from '../assets/img/clients/sopt.png'
import spydarcorp from '../assets/img/clients/spydarcorp.png'
import starise from '../assets/img/clients/starise.png'
import saints from '../assets/img/clients/the-saints-assembly.png'
import '../styles/HeroExtras.css'

// One featured project per stage (Design, Build, Ship), from the Projects section.
const FEATURED = [
  { label: 'Featured design', title: 'SOP Global Advisory', tags: ['Website', 'Responsive'], image: sopSite, href: 'https://sopglobaladvisory.com' },
  { label: 'Featured build', title: 'AI Image Classifier', tags: ['AI/ML', 'Python'], image: imageClassifier, href: 'https://amber-katalin-58.tiiny.site/' },
  { label: 'Featured launch', title: 'Titi', tags: ['AI', 'React Native'], image: titi, href: 'https://titi-five-beta.vercel.app/' },
]

const STATS = [
  { value: '15+', label: 'Projects shipped' },
  { value: '3+', label: 'Years building' },
  { value: '5+', label: 'Happy clients' },
]

// Languages and tools from the Skills section and the projects, grouped by what they are for.
const TOOL_GROUPS = [
  {
    label: 'Frontend',
    items: [
      { name: 'React', Icon: ReactIcon }, { name: 'JavaScript', Icon: JavaScript }, { name: 'TypeScript', Icon: TypeScript },
      { name: 'HTML5', Icon: HTML5 }, { name: 'CSS3', Icon: CSS3 }, { name: 'Tailwind CSS', Icon: TailwindCSS },
      { name: 'Sass', Icon: Sass }, { name: 'Redux', Icon: Redux },
    ],
  },
  {
    label: 'Backend and data',
    items: [
      { name: 'Node.js', Icon: NodeJs }, { name: 'Express', Icon: ExpressJsLight }, { name: 'Python', Icon: Python },
      { name: 'MongoDB', Icon: MongoDB }, { name: 'Firebase', Icon: Firebase },
    ],
  },
  {
    label: 'Tooling',
    items: [
      { name: 'Git', Icon: Git }, { name: 'GitHub', Icon: GitHubDark }, { name: 'Figma', Icon: Figma }, { name: 'Vite', Icon: ViteJS },
    ],
  },
]

// Organisations I have worked with. The files are downsized copies (96px tall) of the originals
// in src/assets/img/org/, which are too large to ship to the browser.
const CLIENTS = [
  { name: 'Elphast', logo: elphast },
  { name: 'Conversibl', logo: conversibl },
  { name: 'Adroit360', logo: adroit360 },
  { name: 'Spydarcorp', logo: spydarcorp },
  { name: 'One Sky', logo: oneSky },
  { name: 'Palm University College', logo: palm },
  { name: 'Helper & Help', logo: helperHelp },
  { name: 'Adongo Foundation', logo: adongo },
  { name: 'The Saints Assembly', logo: saints },
  { name: 'Starise', logo: starise },
  { name: 'SOPT', logo: sopt },
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

      <section className="hero-ui__tools" style={{ '--i': 0 }} aria-labelledby="hero-tools-title">
        <h2 id="hero-tools-title" className="hero-ui__tools-title">Languages and tools</h2>
        {TOOL_GROUPS.map((group) => (
          <div key={group.label} className="hero-ui__tool-group">
            <h3>{group.label}</h3>
            <ul>
              {group.items.map(({ name, Icon }) => (
                <li key={name} className="hero-ui__tool">
                  <span className="hero-ui__tool-tile" data-name={name}>
                    <Icon size={24} aria-hidden="true" />
                    <span className="hero-ui__sr">{name}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

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

      <section className="hero-ui__clients" style={{ '--i': 6 }} aria-label="Organisations I have worked with">
        <p className="hero-ui__clients-label">Worked with</p>
        <div className="hero-ui__clients-view">
          <ul className="hero-ui__clients-track">
            {CLIENTS.map((client) => (
              <li key={client.name}>
                <img src={client.logo} alt={client.name} loading="lazy" />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}

export default HeroExtras
