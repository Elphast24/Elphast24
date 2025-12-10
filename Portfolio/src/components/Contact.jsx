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

                            {/* </div> */}
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