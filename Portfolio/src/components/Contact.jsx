import React from 'react'
import '../styles/Contact.css'

const Contact = () => {
  return (
    <section id="contact" className="section contact">
            <div className="section-container">
                <h2 className="section-title scroll-animate">Professional Contact</h2>
                <div className="contact-container scroll-animate">
                    <div className="contact-grid">
                        <div className="contact-info">
                            <h3>Business Inquiries</h3>
                            <p>Available for senior-level frontend development projects, technical consulting, and team leadership opportunities. Let's discuss how we can collaborate on your next strategic initiative.</p>
                            <div className="social-grid">
                                <a href="#" className="social-link">
                                    <img src="img/icons/whatsapp_1400479.png" alt="WhatsApp" />
                                </a>
                                <a href="#" className="social-link">
                                    <img src="img/icons/linkedin_2190367.png" alt="LinkedIn" />
                                </a>
                                <a href="#" className="social-link">
                                    <img src="img/icons/twitter_2525779.png" alt="Twitter" />
                                </a>
                                <a href="#" className="social-link">
                                    <img src="img/icons/letter-f_9605566.png" alt="Facebook" />
                                </a>
                                <a href="#" className="social-link">
                                    <img src="img/icons/paper-plane_2516962.png" alt="Telegram" />
                                </a>
                            </div>
                        </div>
                        <form className="contact-form" >
                            <div className="form-group">
                                <label htmlFor="name">Full Name</label>
                                <input type="text" id="name" name="name" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <input type="email" id="email" name="email" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="message">Project Details</label>
                                <textarea id="message" name="message" placeholder="Describe your project requirements, timeline, and technical specifications..." required></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary">Send Inquiry</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
  )
}

export default Contact