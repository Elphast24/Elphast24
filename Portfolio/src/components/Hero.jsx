import React from 'react'
import '../styles/Hero.css'
import illustrate from '../assets/img/profile.png'
import {ReactTyped} from 'react-typed'
// import {phone} from

const Hero = () => {
  return (
    <section id="home" className="section hero">
            <div className="section-container">
                <div className="hero-content fade-in-up">
                    <div className="hero-text">
                        <h1><ReactTyped
                            strings={['Developer','Designer','Innovator']}
                            typeSpeed={90}
                            backSpeed={60}
                            loop
                            className="typed-text"
                        />
                        </h1>
                        <p className="subtitle">Samuel Bannor Annor</p>
                        <p className="description">I craft seamless digital solutions that combine technical expertise, creative design, and forward-thinking innovation. With a strong focus on user experience and responsive development, I bring ideas to life through modern web technologies, creating intuitive, visually appealing, and impactful solutions that inspire engagement and deliver real results</p>
                        <div className="hero-actions">
                            <a href="#portfolio" className="btn btn-primary">
                                {/* <img src={illustrate} alt="Download" /> */}
                                Download CV
                            </a>
                            <a href="#contact" className="btn btn-outline">Get In Touch</a>
                        </div>
                    </div>
                    <div className="hero-image">
                        <img src={illustrate} alt="Samuel Bannor Annor" />
                        {/* <div className="social-grid"> */}
                            {/* <a href="#" className="social-link"> */}
                                {/* <img src={} alt="WhatsApp" /> */}
                            {/* </a> */}
                            {/* <a href="#" className="social-link"> */}
                                {/* <img src={} /> */}
                            {/* </a> */}
                            {/* <a href="#" className="social-link"> */}
                                {/* <img src={} alt="Twitter" /> */}
                            {/* </a> */}
                            {/* <a href="#" className="social-link"> */}
                                {/* <img src={} alt="Facebook" /> */}
                            {/* </a> */}
                            {/* <a href="#" className="social-link"> */}
                                {/* <img src={} alt="Telegram" /> */}
                            {/* </a> */}
                        {/* </div> */}
                        <div className="copyright">
                            Copyright&copy;2024: <span className="brand">Unrelinquish</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
  )
}

export default Hero