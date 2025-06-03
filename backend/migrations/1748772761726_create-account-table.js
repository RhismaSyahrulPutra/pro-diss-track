/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  // Tabel accounts
  pgm.createTable('accounts', {
    account_id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    email: {
      type: 'VARCHAR(100)',
      notNull: true,
      unique: true,
    },
    password: {
      type: 'TEXT',
      notNull: true,
    },
    username: {
      type: 'VARCHAR(50)',
      notNull: true,
      unique: true,
    },
    last_login: {
      type: 'TIMESTAMP',
      notNull: false,
    },
    created_at: {
      type: 'TIMESTAMP',
      notNull: true,
      default: pgm.func('CURRENT_TIMESTAMP'),
    },
  });

  // Tabel authentications
  pgm.createTable('authentications', {
    token: {
      type: 'TEXT',
      primaryKey: true,
    },
  });

  // Tabel profiles
  pgm.createTable('profiles', {
    profile_id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    profile_photo: {
      type: 'TEXT',
      notNull: false,
    },
    job_title: {
      type: 'VARCHAR(100)',
      notNull: true,
    },
    age: {
      type: 'INTEGER',
      notNull: false,
    },
    about_me: {
      type: 'TEXT',
      notNull: false,
    },
    account_id: {
      type: 'VARCHAR(50)',
      notNull: true,
      references: 'accounts(account_id)',
      onDelete: 'CASCADE',
    },
  });

  // Tabel testimonials
  pgm.createTable('testimonials', {
    testimonial_id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    testimonial_text: {
      type: 'TEXT',
      notNull: true,
    },
    account_id: {
      type: 'VARCHAR(50)',
      notNull: true,
      references: 'accounts(account_id)',
      onDelete: 'CASCADE',
    },
    username: {
      type: 'VARCHAR(100)',
      notNull: true,
    },
    rating: {
      type: 'INTEGER',
      notNull: true,
      check: 'rating >= 1 AND rating <= 5',
    },
  });

  // Tabel courses
  pgm.createTable('courses', {
    course_id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    course_photo: {
      type: 'TEXT',
      notNull: false,
    },
    course_title: {
      type: 'VARCHAR(100)',
      notNull: true,
    },
    course_desc: {
      type: 'TEXT',
      notNull: true,
    },
  });

  // table lessons
  pgm.createTable('lessons', {
    lesson_id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    lesson_photo: {
      type: 'TEXT',
      notNull: false,
    },
    lesson_title: {
      type: 'VARCHAR(100)',
      notNull: true,
    },
    lesson_desc: {
      type: 'TEXT',
      notNull: true,
    },
    lesson_content: {
      type: 'TEXT',
      notNull: true,
    },
    course_id: {
      type: 'VARCHAR(50)',
      notNull: true,
      references: 'courses(course_id)',
      onDelete: 'CASCADE',
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropTable('lessons');
  pgm.dropTable('courses');
  pgm.dropTable('testimonials');
  pgm.dropTable('profiles');
  pgm.dropTable('authentications');
  pgm.dropTable('accounts');
};
