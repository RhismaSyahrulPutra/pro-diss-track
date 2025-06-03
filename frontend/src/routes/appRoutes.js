import Course from '../pages/mainPage/coursePage.js';
import Scanner from '../pages/mainPage/scannerPage.js';
import CreateTestimonial from '../pages/mainPage/testimonialPage.js';
import Profile from '../pages/mainPage/profilePage.js';
import Lesson from '../pages/mainPage/lessonPage.js';

const pages = {
  '#course': Course,
  '#scanner': Scanner,
  '#create-testimonial': CreateTestimonial,
  '#profile': Profile,
  '#lesson': Lesson,
};

export async function renderApp(app, fullHash) {
  const [path, queryString] = fullHash.split('?');

  const page = pages[path];
  if (page) {
    app.innerHTML = await page(queryString || '');
  } else {
    app.innerHTML = `<h1>Page Not Found</h1>`;
  }
}
