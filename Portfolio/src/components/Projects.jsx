import React from 'react'
import '../styles/Projects.css'
import tsaWeb from '../assets/img/works/tsaWeb.png'
import newImage from '../assets/img/new.png'
import resto from '../assets/img/resto.png'
import ufe from '../assets/img/works/ufe.png'
import imageClassifier from '../assets/img/works/ImageClassifier.png'
import emailGenerator from '../assets/img/works/EmailGenerator.png'
// import { Link } from 'react-router-dom'



const Projects = () => {
    const projectData = [
        {
            id: 1,
            title: 'TSA Web Platform',
            description: 'Enterprise-level web platform featuring advanced UI/UX design, real-time data visualization, and seamless user experience optimization.',
            image: tsaWeb,
            link: 'https://bespoke-choux-b0059d.netlify.app/'
        },
        {
            id: 2,
            title: 'Enterprise Application',
            description: 'Full-stack web application with sophisticated content management system and responsive design implementation.',
            image: newImage,
            link: 'https://quickstock-2r9a.onrender.com'
        },
        {
            id: 3,
            title: 'Restaurant Management',
            description: 'Comprehensive restaurant management system with online ordering, inventory tracking, and customer relationship management.',
            image: resto,
            link: 'http://gripsonresto-e001.netlify.app/'
        },
        {
            id: 4,
            title: 'Educational Platform',
            description: 'Advanced learning management system with interactive features, progress tracking, and multimedia content delivery.',
            image: ufe,
            link: 'https://dls-1.onrender.com/'
        },
        {
            id: 5,
            title: 'AI Image Classifier',
            description: 'Machine learning integrated web application with real-time image classification and advanced data processing capabilities.',
            image: imageClassifier,
            link: 'https://amber-katalin-58.tiiny.site/'
        },
        {
            id: 6,
            title: 'Email Automation',
            description: 'Professional email generation and automation tool with template management and advanced customization options.',
            image: emailGenerator,
            link: 'http://gripsonresto-e001.netlify.app/'
        }
    ]
  return (
    <section id="portfolio" className="section portfolio">
            <div className="section-container">
                <h2 className="section-title scroll-animate">Featured Projects</h2>
                <div className="portfolio-grid scroll-animate">
                    {projectData.map(project => {
                        return(
                            <div key={project.id} className="project-card">
                                <img src={project.image} className='project-image' />
                                <div className='project-content'>
                                    <h3>{project.title}</h3>
                                    <p>{project.description}</p>
                                    <a href={project.link} target="_blank" className="project-link">View Project →</a>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>

  )
}

export default Projects