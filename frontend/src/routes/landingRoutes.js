import Home from '../pages/landingPage/homePage.js';
import About from '../pages/landingPage/aboutPage.js';
import Testimonial from '../pages/landingPage/testimonialPage.js';
import Features from '../pages/landingPage/featuresPage.js';
import Footer from '../components/Footer.js';

export function renderLanding(app) {
  app.innerHTML = `
    <div id="home" class="section">${Home()}</div>
    <div id="about" class="section">${About()}</div>
    <div id="testimonial" class="section">${Testimonial()}</div>
    <div id="features" class="section">${Features()}</div>
    ${Footer()}
  `;
}
