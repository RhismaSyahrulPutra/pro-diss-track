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
  // Seed courses A-Z (dibagi 5 kelompok)
  pgm.sql(`
    INSERT INTO courses (course_id, course_title, course_desc, course_photo) VALUES
    ('course-1', 'Materi A - E', 'Belajar huruf A sampai E', '/assets/images/course_placeholder.jpg'),
    ('course-2', 'Materi F - J', 'Belajar huruf F sampai J', '/assets/images/course_placeholder.jpg'),
    ('course-3', 'Materi K - O', 'Belajar huruf K sampai O', '/assets/images/course_placeholder.jpg'),
    ('course-4', 'Materi P - T', 'Belajar huruf P sampai T', '/assets/images/course_placeholder.jpg'),
    ('course-5', 'Materi U - Z', 'Belajar huruf U sampai Z', '/assets/images/course_placeholder.jpg');
  `);

  // Seed lessons A-Z sesuai course_id
  pgm.sql(`
    INSERT INTO lessons (lesson_id, lesson_title, lesson_desc, lesson_content, lesson_photo, course_id) VALUES
    -- Course 1: A-E
    ('lesson-a', 'Huruf A', 'Belajar huruf A', 'Konten huruf A', '/assets/images/lesson_a.jpg', 'course-1'),
    ('lesson-b', 'Huruf B', 'Belajar huruf B', 'Konten huruf B', '/assets/images/lesson_b.jpg', 'course-1'),
    ('lesson-c', 'Huruf C', 'Belajar huruf C', 'Konten huruf C', '/assets/images/lesson_c.jpg', 'course-1'),
    ('lesson-d', 'Huruf D', 'Belajar huruf D', 'Konten huruf D', '/assets/images/lesson_d.jpg', 'course-1'),
    ('lesson-e', 'Huruf E', 'Belajar huruf E', 'Konten huruf E', '/assets/images/lesson_e.jpg', 'course-1'),

    -- Course 2: F-J
    ('lesson-f', 'Huruf F', 'Belajar huruf F', 'Konten huruf F', '/assets/images/lesson_f.jpg', 'course-2'),
    ('lesson-g', 'Huruf G', 'Belajar huruf G', 'Konten huruf G', '/assets/images/lesson_g.jpg', 'course-2'),
    ('lesson-h', 'Huruf H', 'Belajar huruf H', 'Konten huruf H', '/assets/images/lesson_h.jpg', 'course-2'),
    ('lesson-i', 'Huruf I', 'Belajar huruf I', 'Konten huruf I', '/assets/images/lesson_i.jpg', 'course-2'),
    ('lesson-j', 'Huruf J', 'Belajar huruf J', 'Konten huruf J', '/assets/images/lesson_j.jpg', 'course-2'),

    -- Course 3: K-O
    ('lesson-k', 'Huruf K', 'Belajar huruf K', 'Konten huruf K', '/assets/images/lesson_k.jpg', 'course-3'),
    ('lesson-l', 'Huruf L', 'Belajar huruf L', 'Konten huruf L', '/assets/images/lesson_l.jpg', 'course-3'),
    ('lesson-m', 'Huruf M', 'Belajar huruf M', 'Konten huruf M', '/assets/images/lesson_m.jpg', 'course-3'),
    ('lesson-n', 'Huruf N', 'Belajar huruf N', 'Konten huruf N', '/assets/images/lesson_n.jpg', 'course-3'),
    ('lesson-o', 'Huruf O', 'Belajar huruf O', 'Konten huruf O', '/assets/images/lesson_o.jpg', 'course-3'),

    -- Course 4: P-T
    ('lesson-p', 'Huruf P', 'Belajar huruf P', 'Konten huruf P', '/assets/images/lesson_p.jpg', 'course-4'),
    ('lesson-q', 'Huruf Q', 'Belajar huruf Q', 'Konten huruf Q', '/assets/images/lesson_q.jpg', 'course-4'),
    ('lesson-r', 'Huruf R', 'Belajar huruf R', 'Konten huruf R', '/assets/images/lesson_r.jpg', 'course-4'),
    ('lesson-s', 'Huruf S', 'Belajar huruf S', 'Konten huruf S', '/assets/images/lesson_s.jpg', 'course-4'),
    ('lesson-t', 'Huruf T', 'Belajar huruf T', 'Konten huruf T', '/assets/images/lesson_t.jpg', 'course-4'),

    -- Course 5: U-Z
    ('lesson-u', 'Huruf U', 'Belajar huruf U', 'Konten huruf U', '/assets/images/lesson_u.jpg', 'course-5'),
    ('lesson-v', 'Huruf V', 'Belajar huruf V', 'Konten huruf V', '/assets/images/lesson_v.jpg', 'course-5'),
    ('lesson-w', 'Huruf W', 'Belajar huruf W', 'Konten huruf W', '/assets/images/lesson_w.jpg', 'course-5'),
    ('lesson-x', 'Huruf X', 'Belajar huruf X', 'Konten huruf X', '/assets/images/lesson_x.jpg', 'course-5'),
    ('lesson-y', 'Huruf Y', 'Belajar huruf Y', 'Konten huruf Y', '/assets/images/lesson_y.jpg', 'course-5'),
    ('lesson-z', 'Huruf Z', 'Belajar huruf Z', 'Konten huruf Z', '/assets/images/lesson_z.jpg', 'course-5');
  `);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.sql(`DELETE FROM lessons WHERE lesson_id LIKE 'lesson-%';`);
  pgm.sql(`DELETE FROM courses WHERE course_id LIKE 'course-%';`);
};
