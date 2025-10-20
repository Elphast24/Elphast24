import React from 'react'
import '../styles/Skills.css'
import html from '../assets/img/icons/icons8-html.svg'
import css from '../assets/img/icons/icons8-css.svg'
import js from "../assets/img/icons/icons8-javascript.svg"
import react from "../assets/img/icons/codesandbox.svg"
import node from "../assets/img/icons/command.svg"


const Skills = () => {
  return (
    <section id="skills" className="section skills">
            <div className="section-container">
                <h2 className="section-title scroll-animate">Technical Expertise</h2>
                <div className="skills-grid scroll-animate">
                    <div className="skill-card">
                        <div className="skill-icon">
                            <img src={html} alt="HTML" />
                        </div>
                        <h3>HTML5</h3>
                        <p>Semantic markup, accessibility standards, and modern HTML5 features for robust web foundations.</p>
                    </div>
                    <div className="skill-card">
                        <div className="skill-icon">
                            <img src={css} alt="CSS" />
                        </div>
                        <h3>CSS3</h3>
                        <p>Advanced styling, responsive design, Grid & Flexbox, animations, and CSS preprocessors.</p>
                    </div>
                    <div className="skill-card">
                        <div className="skill-icon">
                            <img src={react} alt="React" />
                        </div>
                        <h3>React.js</h3>
                        <p>Component architecture, state management, hooks, and modern React ecosystem tools.</p>
                    </div>
                    <div className="skill-card">
                        <div className="skill-icon">
                            <img src={js} alt="JavaScript" />
                        </div>
                        <h3>JavaScript</h3>
                        <p>ES6+, asynchronous programming, DOM manipulation, and modern JavaScript patterns.</p>
                    </div>
                    <div className="skill-card">
                        <div className="skill-icon">
                            <img src={node} alt="Node.js" />
                        </div>
                        <h3>Node.js</h3>
                        <p>Server-side development, API design, database integration, and backend architecture.</p>
                    </div>
                </div>
            </div>
        </section>
  )
}

export default Skills