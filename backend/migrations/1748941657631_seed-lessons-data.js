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
    ('course-1', 'Materi A - E', 'Belajar huruf isyarat A sampai E', '/assets/courses/course_banner1.png'),
    ('course-2', 'Materi F - J', 'Belajar huruf isyarat F sampai J', '/assets/courses/course_banner2.png'),
    ('course-3', 'Materi K - O', 'Belajar huruf isyarat K sampai O', '/assets/courses/course_banner3.png'),
    ('course-4', 'Materi P - T', 'Belajar huruf isyarat P sampai T', '/assets/courses/course_banner4.png'),
    ('course-5', 'Materi U - Z', 'Belajar huruf isyarat U sampai Z', '/assets/courses/course_banner5.png');
  `);

  // Seed lessons A-Z sesuai course_id
  pgm.sql(`
  INSERT INTO lessons (lesson_id, lesson_title, lesson_desc, lesson_content, lesson_photo, course_id) VALUES
  -- Course 1: A-E
  ('lesson-a', 'Huruf A', 'Bentuk tangan huruf isyarat A versi Bisindo', 'Konten huruf A', '/assets/handSign/hand_A.jpg', 'course-1'),
  ('lesson-b', 'Huruf B', 'Bentuk tangan huruf isyarat B versi Bisindo', 'Konten huruf B', '/assets/handSign/hand_B.jpg', 'course-1'),
  ('lesson-c', 'Huruf C', 'Bentuk tangan huruf isyarat C versi Bisindo', 'Konten huruf C', '/assets/handSign/hand_C.jpg', 'course-1'),
  ('lesson-d', 'Huruf D', 'Bentuk tangan huruf isyarat D versi Bisindo', 'Konten huruf D', '/assets/handSign/hand_D.jpg', 'course-1'),
  ('lesson-e', 'Huruf E', 'Bentuk tangan huruf isyarat E versi Bisindo', 'Konten huruf E', '/assets/handSign/hand_E.jpg', 'course-1'),

  -- Course 2: F-J
  ('lesson-f', 'Huruf F', 'Bentuk tangan huruf isyarat F versi Bisindo', 'Konten huruf F', '/assets/handSign/hand_F.jpg', 'course-2'),
  ('lesson-g', 'Huruf G', 'Bentuk tangan huruf isyarat G versi Bisindo', 'Konten huruf G', '/assets/handSign/hand_G.jpg', 'course-2'),
  ('lesson-h', 'Huruf H', 'Bentuk tangan huruf isyarat H versi Bisindo', 'Konten huruf H', '/assets/handSign/hand_H.jpg', 'course-2'),
  ('lesson-i', 'Huruf I', 'Bentuk tangan huruf isyarat I versi Bisindo', 'Konten huruf I', '/assets/handSign/hand_I.jpg', 'course-2'),
  ('lesson-j', 'Huruf J', 'Bentuk tangan huruf isyarat J versi Bisindo', 'Konten huruf J', '/assets/handSign/hand_J.jpg', 'course-2'),

  -- Course 3: K-O
  ('lesson-k', 'Huruf K', 'Bentuk tangan huruf isyarat K versi Bisindo', 'Konten huruf K', '/assets/handSign/hand_K.jpg', 'course-3'),
  ('lesson-l', 'Huruf L', 'Bentuk tangan huruf isyarat L versi Bisindo', 'Konten huruf L', '/assets/handSign/hand_L.jpg', 'course-3'),
  ('lesson-m', 'Huruf M', 'Bentuk tangan huruf isyarat M versi Bisindo', 'Konten huruf M', '/assets/handSign/hand_M.jpg', 'course-3'),
  ('lesson-n', 'Huruf N', 'Bentuk tangan huruf isyarat N versi Bisindo', 'Konten huruf N', '/assets/handSign/hand_N.jpg', 'course-3'),
  ('lesson-o', 'Huruf O', 'Bentuk tangan huruf isyarat O versi Bisindo', 'Konten huruf O', '/assets/handSign/hand_O.jpg', 'course-3'),

  -- Course 4: P-T
  ('lesson-p', 'Huruf P', 'Bentuk tangan huruf isyarat P versi Bisindo', 'Konten huruf P', '/assets/handSign/hand_P.jpg', 'course-4'),
  ('lesson-q', 'Huruf Q', 'Bentuk tangan huruf isyarat Q versi Bisindo', 'Konten huruf Q', '/assets/handSign/hand_Q.jpg', 'course-4'),
  ('lesson-r', 'Huruf R', 'Bentuk tangan huruf isyarat R versi Bisindo', 'Konten huruf R', '/assets/handSign/hand_R.jpg', 'course-4'),
  ('lesson-s', 'Huruf S', 'Bentuk tangan huruf isyarat S versi Bisindo', 'Konten huruf S', '/assets/handSign/hand_S.jpg', 'course-4'),
  ('lesson-t', 'Huruf T', 'Bentuk tangan huruf isyarat T versi Bisindo', 'Konten huruf T', '/assets/handSign/hand_T.jpg', 'course-4'),

  -- Course 5: U-Z
  ('lesson-u', 'Huruf U', 'Bentuk tangan huruf isyarat U versi Bisindo', 'Konten huruf U', '/assets/handSign/hand_U.jpg', 'course-5'),
  ('lesson-v', 'Huruf V', 'Bentuk tangan huruf isyarat V versi Bisindo', 'Konten huruf V', '/assets/handSign/hand_V.jpg', 'course-5'),
  ('lesson-w', 'Huruf W', 'Bentuk tangan huruf isyarat W versi Bisindo', 'Konten huruf W', '/assets/handSign/hand_W.jpg', 'course-5'),
  ('lesson-x', 'Huruf X', 'Bentuk tangan huruf isyarat X versi Bisindo', 'Konten huruf X', '/assets/handSign/hand_X.jpg', 'course-5'),
  ('lesson-y', 'Huruf Y', 'Bentuk tangan huruf isyarat Y versi Bisindo', 'Konten huruf Y', '/assets/handSign/hand_Y.jpg', 'course-5'),
  ('lesson-z', 'Huruf Z', 'Bentuk tangan huruf isyarat Z versi Bisindo', 'Konten huruf Z', '/assets/handSign/hand_Z.jpg', 'course-5');
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
