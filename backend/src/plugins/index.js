// ACCOUNTS
const AccountsHandler = require('../api/accounts');
const AccountsService = require('../services/postgres/AccountsService');
const AccountsValidator = require('../validator/accounts');

// AUTHENTICATIONS
const AuthenticationsHandler = require('../api/Authentications');
const AuthenticationsService = require('../services/postgres/AuthenticationsService');
const TokenManager = require('../token/TokenManager');
const AuthenticationsValidator = require('../validator/Authentications');

// PROFILES
const ProfilesHandler = require('../api/Profile');
const ProfilesService = require('../services/postgres/ProfilesService');
const ProfilesValidator = require('../validator/Profile');

// TESTIMONIALS
const TestimonialsHandler = require('../api/Testimonials');
const TestimonialsService = require('../services/postgres/TestimonialsService');
const TestimonialsValidator = require('../validator/Testimonials');

// COURSES
const CoursesHandler = require('../api/Courses');
const CoursesService = require('../services/postgres/CoursesService');
const CoursesValidator = require('../validator/Courses');

// LESSONS
const LessonsHandler = require('../api/Lessons');
const LessonsService = require('../services/postgres/LessonsService');
const LessonsValidator = require('../validator/Lessons');

const accountsService = new AccountsService();
const authenticationsService = new AuthenticationsService();
const profilesService = new ProfilesService();
const testimonialsService = new TestimonialsService();
const coursesService = new CoursesService();
const lessonsService = new LessonsService();
const tokenManager = TokenManager;

const plugins = [
  {
    plugin: AccountsHandler,
    options: {
      service: accountsService,
      validator: AccountsValidator,
    },
  },
  {
    plugin: AuthenticationsHandler,
    options: {
      authenticationsService,
      accountsService,
      tokenManager,
      validator: AuthenticationsValidator,
    },
  },
  {
    plugin: ProfilesHandler,
    options: {
      service: profilesService,
      validator: ProfilesValidator,
    },
  },
  {
    plugin: TestimonialsHandler,
    options: {
      service: testimonialsService,
      validator: TestimonialsValidator,
    },
  },
  {
    plugin: CoursesHandler,
    options: {
      service: coursesService,
      validator: CoursesValidator,
    },
  },
  {
    plugin: LessonsHandler,
    options: {
      service: lessonsService,
      validator: LessonsValidator,
    },
  },
];

module.exports = plugins;
