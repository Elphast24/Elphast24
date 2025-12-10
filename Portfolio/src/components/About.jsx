import React from 'react'
import Samuel from '../assets/img/samuel.jpg'
import '../styles/About.css'

const About = () => {
  return (
    <section id="about" className="section about">
            <div className="section-container">
                <h2 className="section-title scroll-animate">About</h2>
                <div className="about-grid scroll-animate">
                    <div className="about-image">
                        <img src={Samuel} alt="Samuel Bannor Annor" />
                    </div>
                    <div className="about-content">
                        <h3>Software Engineer</h3>
                        <p>I'm a dedicated intermediate frontend developer with over five years of experience creating exceptional digital experiences. With a strong foundation in modern web technologies, I focus on building responsive, accessible, and performant web applications.</p>
                        <p>My expertise spans across multiple frontend frameworks and tools, allowing me to deliver robust solutions that meet both user needs and business objectives. I have a proven track record of leading development teams and architecting scalable web applications.</p>
                        <p>My approach combines technical excellence with strategic thinking, ensuring that every project not only meets current requirements but is also positioned for future growth and scalability.</p>
                        <div className="about-social">

                    {/* LinkedIn */}
                    <a 
                        href="https://www.linkedin.com/in/samuel-bannor-annor/" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="social-link"
                    >
                        <img 
                        src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/linkedin.svg" 
                        alt="LinkedIn" 
                        width="28" 
                        />
                    </a>

                    {/* Instagram */}
                    <a 
                        href="https://www.instagram.com" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="social-link"
                    >
                        <img 
                        src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg" 
                        alt="Instagram" 
                        width="28" 
                        />
                    </a>

                    {/* GitHub */}
                    <a 
                        href="https://github.com/Elphast24" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="social-link"
                    >
                        <img 
                        src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/github.svg" 
                        alt="GitHub" 
                        width="28" 
                        />
                    </a>

                    {/* Gmail */}
                    <a 
                        href="mailto:samuelbannor44@gmail.com" 
                        className="social-link"
                    >
                        <img 
                        src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/gmail.svg" 
                        alt="Gmail" 
                        width="28" 
                        />
                    </a>

                    </div>

                    </div>
                </div>
            </div>
        </section>
  )
}

export default About