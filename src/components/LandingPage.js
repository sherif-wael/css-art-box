import React, {useEffect, useRef} from "react";
import {Link} from "react-router-dom"
import canvas from "../images/canvas.svg"
import css from "../images/css.svg";
import gsap from "../utils/gsap";
import {htmlCode, cssCode} from "../utils/spanCode";
import pureCss1 from "../images/pure-css1.png";
import pureCss4 from "../images/pure-css4.png";
import cssCoding from "../images/css-begin.svg";


export default function LandingPage(){
    let codeLines = useRef([]);
    let codeWrapper = useRef(null);
    useEffect(() => {
        let timeline = gsap.timeline({
            scrollTrigger: {
                trigger: codeWrapper.current,
                start: "top center",
                end: "bottom top"
            }
        })
       codeLines.current.forEach((ref, i) => {
           timeline.from(ref, {width: "0px", duration: ref.textContent.length * 2 / 18, ease: "none"})
       })
    })
    return (
        <div class="landing-page">
            <section class="intro-section">
                <div class="high-index">
                    <header class="header flex">
                        <h1>CSS ARTS</h1>
                    </header>
                    <div class="about side-paddings">
                        <div class="about-info">
                            <h2>CREATE BEUATIFUL CSS SHAPES, UNLEASH THE POWER OF CSS.</h2>
                            <Link to="/playground">PLAYGROUND &#8594;</Link>
                        </div>
                        <div class="img-responsive">
                            <img src={canvas} alt="illustration" />
                        </div>
                    </div>
                </div>
                <div class="overlay"></div> 
            </section>
            <section class="gsap-section side-paddings grid-wrapper">
                <div class="illus img-responsive">
                    <img src={css} alt="illustration" />
                </div>
                <div class="code-wrapper" ref={codeWrapper}>
                    <pre class="html-code-view code-view">
                        {
                            Object.keys(htmlCode).map((prop, i) => (
                                <div key={i}><span dangerouslySetInnerHTML={{__html: htmlCode[prop]}} ref={el => codeLines.current[i] = el} class="line"></span></div>
                            ))
                        }
                    </pre>
                    <pre class="css-code-view code-view">
                        {
                            Object.keys(cssCode).map((prop, i) => (
                                <div key={i}><span dangerouslySetInnerHTML={{__html: cssCode[prop]}} ref={el => codeLines.current[i + 5] = el} class="line"></span></div>
                            ))
                        }
                    </pre>
                </div>
            </section>
            <section class="arts-section">
                <div class="arts-grid side-paddings grid-wrapper">
                    <div class="header-wrapper arts-intro">
                        <h2>all these great arts can be created using our tool.</h2>
                    </div>
                    <div class="arts-examples">
                        <img src={pureCss1} alt="pure css art" />
                        <img src={pureCss4} alt="pure css art" />
                    </div>
                </div> 
            </section>
            <section class="css-for-beginners side-paddings grid-wrapper">
                <div class="header-wrapper">
                    <h2>an easier way for beginners to get to know css.</h2>
                    <Link to="/playground" className="border-link">start now</Link>
                </div>
                <div class="css-coding">
                    <img src={cssCoding} alt="css coding" />
                </div>
            </section>
            <footer class="side-padding">
                <h3>built with <span>&hearts;</span> by <b>sherif wael</b></h3>
            </footer>
        </div>
    )
}