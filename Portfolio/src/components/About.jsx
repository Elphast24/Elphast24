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
                        <h3>Web Developer & Software Engineer</h3>
                        <p>I'm a dedicated intermediate frontend developer with over five years of experience creating exceptional digital experiences. With a strong foundation in modern web technologies, I focus on building responsive, accessible, and performant web applications.</p>
                        <p>My expertise spans across multiple frontend frameworks and tools, allowing me to deliver robust solutions that meet both user needs and business objectives. I have a proven track record of leading development teams and architecting scalable web applications.</p>
                        <p>My approach combines technical excellence with strategic thinking, ensuring that every project not only meets current requirements but is also positioned for future growth and scalability.</p>
                        <div className="about-social">
                            <a href="#" className="social-link">
                                <img src="img/icons/whatsapp_1400479.png" alt="WhatsApp" />
                            </a>
                            <a href="#" className="social-link">
                                <img src="img/icons/linkedin.svg" alt="LinkedIn" />
                            </a>
                            <a href="#" className="social-link">
                                <img src="img/icons/twitter_2525779.png" alt="Twitter" />
                            </a>
                            <a href="#" className="social-link">
                                <img src="img/icons/facebook.svg" alt="Facebook" />
                            </a>
                            <a href="#" className="social-link">
                                <img src="img/icons/paper-plane_2516962.png" alt="Telegram" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
  )
}

export default About