// Content for the prototype. Every story links to the one sample article.
window.JD = window.JD || {};

JD.img = (n) => `assets/img/${String(n).padStart(3, '0')}.jpg`;

JD.stories = {
  pharmacist: { title: 'Toledo’s Most Singular Pharmacist', dek: 'The Ella P. Stewart Scrapbooks offer insight into the life and legacy of a pioneering Black woman who broke color barriers and helped birth the fight for civil rights.', kind: 'Series', label: 'Reveal Digital Collections', time: 10, img: 1, cat: 'Politics & History' },
  purrfect: { title: 'The Purrrrfect Political Storm', dek: 'Crazy cat ladies have come to dominate this election season. It’s hardly the first time.', kind: 'JSTOR Collection', label: 'JSTOR Collections', time: 10, img: 29, cat: 'Politics & History', tags: 'cats women’s suffrage election postcards' },
  elsalvador: { title: 'Fighting for El Salvador, from Wisconsin', dek: 'How a Midwestern solidarity movement shaped American debates over the Salvadoran civil war.', label: 'Art & Art History', time: 10, img: 79, cat: 'Arts & Culture', tags: 'el salvador civil war wisconsin' },
  artdeal: { title: 'The Art of the Deal or the Dirt?', dek: 'Will so-called Trump Tariffs ensure the United States has the minerals it needs?', label: 'Business & Economics', time: 11, img: 78, cat: 'Business & Economics' },
  lviv: { title: 'Lviv: Open to the World', dek: 'The history of the Ukrainian city of Lviv is long, complex and mirrors some of the larger conflicts of the Eastern European region.', label: 'Politics & History', time: 7, img: 21, cat: 'Politics & History' },
  stpatrick: { title: 'Will the Real St. Patrick Please Stand Up', dek: 'The “St. Patrick” celebrated on March 17 every year has never existed. He was, and is, a metaphorical, literary, and religious conceit.', label: 'Politics & History', time: 7, img: 25, cat: 'Politics & History' },
  ukraine: { title: 'Ukraine, Russia, and the West: A Background Reading List', dek: 'Research reports and scholarly articles on the history of the Ukraine–Russia conflicts of the past and possible paths for peace.', kind: 'Reading list', label: 'Reading Lists', time: 18, img: 20, cat: 'Politics & History' },
  ulmann: { title: 'The “Vanishing Types” of Doris Ulmann', dek: 'As her extensive body of work shows, Ulmann felt the loss of an imagined simpler time and tried to preserve it with her camera.', kind: 'Series', label: 'Archive Adventures', time: 6, img: 22, cat: 'Arts & Culture' },
  tsar: { title: 'Science in Defiance of the Tsar', dek: 'How Russian scientists kept research alive under imperial censorship.', label: 'Natural Science', time: 5, img: 10, cat: 'Science & Technology' },
  womenshistory: { title: 'Celebrating Women’s History Month', dek: 'Celebrate Women’s History Month with JSTOR Daily—stories for classroom or leisure reading.', kind: 'Roundup', label: 'Roundups', time: 3, img: 23, cat: 'Education & Society', tags: 'women’s suffrage history' },
  papal: { title: 'The Wild West of Papal Conclaves', dek: 'In the sixteenth and seventeenth century, the death of a pope led to all sorts of chaos, from the destruction of art to armed violence in the streets.', kind: 'JSTOR Collection', label: 'Education & Society', time: 8, img: 76, cat: 'Education & Society', tags: 'papal conclaves pope vatican' },
  greenland: { title: 'The Making and Meaning of Greenland: A Reading List', dek: 'A selection of research reports and peer-reviewed articles offers insight into the history and potential future of Greenland.', kind: 'Reading list', label: 'Politics & History', time: 18, img: 77, cat: 'Politics & History' },
  tantalus: { title: 'Tantalus, Pac-Man, and Unsated Hungers', dek: 'From Greek myth to the arcade, the story of appetites that can never be satisfied.', label: 'Politics & History', time: 6, img: 26, cat: 'Arts & Culture' },
  cabinet: { title: 'Seeking Clues in Cabinet Cards', dek: 'The poignant images in the Lynch Family Photographs Collection contain mysteries perhaps only the public can solve.', kind: 'JSTOR Collection', label: 'Politics & History', time: 2, img: 28, cat: 'Politics & History' },
  naturalhistory: { title: 'Natural History: A Reading List', kind: 'Reading list', label: 'Reading Lists', time: 12, img: 31, cat: 'Science & Technology' },
  voting: { title: 'Voting in American Politics: A Syllabus', kind: 'Syllabus', label: 'Syllabi', time: 15, img: 34, cat: 'Education & Society' },
  truecrime: { title: 'A True Crime Syllabus', kind: 'Syllabus', label: 'Syllabi', time: 14, img: 35, cat: 'Education & Society' },
  teachingai: { title: 'Teaching AI, AKA Artificial Intelligence', kind: 'Syllabus', label: 'Syllabi', time: 12, img: 36, cat: 'Science & Technology' },
  treessoil: { title: 'He Spoke for the Trees (and Also the Soil)', label: 'Plants & Animals', time: 9, img: 46, cat: 'Science & Technology' },
  treessecret: { title: 'Trees With a Secret Message', kind: 'Series', label: 'Cabinet of Curiosities', time: 4, img: 47, cat: 'Science & Technology' },
  sourdough: { title: 'The Science of Sourdough', label: 'Education & Society', time: 5, img: 48, cat: 'Science & Technology' },
  lemon: { title: 'The Lemon Gang: Citrus and the Rise of the Mafia', label: 'Politics & History', time: 3, img: 49, cat: 'Politics & History' },
};

// Teaching & Learning entries: [id, title, image]
[
  ['Pedagogical essay', 'Pedagogical Essays', [
    ['scaffolding', 'Scaffolding a Research Project with JSTOR', 51], ['scholarlyq', 'Asking Scholarly Questions with JSTOR Daily', 52],
    ['summary', 'Teaching Summary Skills with JSTOR Daily', 53], ['images', 'Exploring Images In (and Out of) Context', 54],
    ['lgbtq', 'Teaching LGBTQ+ History: Queer Women’s Experiences in Prison', 55]]],
  ['Reading list', 'Reading Lists', [
    ['t-natural', 'Natural History: A Reading List', 56], ['t-ukraine', 'Ukraine, Russia, and the West: A Background Reading List', 57],
    ['t-greenland', 'The Making and Meaning of Greenland: A Reading List', 58], ['poetry', 'The Legacy and Power of Performance Poetry: A Reading List', 59],
    ['travel', 'All Travelers are Infiltrators: An Introduction to the Study of Travel Writing', 60]]],
  ['Annotation', 'Annotations', [
    ['mccarthy', 'Joseph McCarthy in Wheeling, West Virginia: Annotated', 61], ['lynchlaw', '“Lynch Law in America”: Annotated', 62],
    ['citizens', 'Citizens United v. Federal Election Commission: Annotated', 63], ['carol', 'Annotations: A Christmas Carol by Charles Dickens', 64],
    ['paris', 'The Treaty of Paris 1783: Annotated', 65]]],
  ['Syllabus', 'Syllabi', [
    ['t-voting', 'Voting in American Politics: A Syllabus', 66], ['discussions', 'Building Classroom Discussions around JSTOR Daily Syllabi', 67],
    ['t-truecrime', 'A True Crime Syllabus', 68], ['gaza', 'Israel and Gaza: A Syllabus of Background Readings', 69],
    ['t-ai', 'Teaching AI, AKA Artificial Intelligence', 70]]],
  ['Roundup', 'Roundups', [
    ['sestinas', '10 Sestinas by Modern and Contemporary Poets', 71], ['t-women', 'Celebrating Women’s History Month', 72],
    ['presidents', 'A Presidents’ Day Roundup', 73], ['blackhistory', 'Celebrating Black History Month', 74]]],
].forEach(([kind, label, items]) => items.forEach(([id, title, img]) => {
  JD.stories[id] = { title, kind, label, img, cat: 'Education & Society', time: 0, tags: 'teaching resources' };
}));

JD.trending = ['Racist Humor: Exploratory Readings', 'Twin Curtains: Oz and the USSR', 'Why Does the Bible Forbid Tattoos?'];
JD.trendingSearches = ['Women’s suffrage', 'Greenland', 'Teaching resources', 'Papal conclaves'];
JD.searchTerms = [
  'El Salvador', 'El Salvador civil war', 'El Salvador Wisconsin', 'Women’s suffrage', 'Women’s history', 'Greenland',
  'Greenland reading list', 'Papal conclaves', 'St. Patrick', 'Ukraine', 'Lviv', 'Cats', 'Cabinet cards', 'Sourdough',
  'Mafia', 'Tariffs', 'Teaching resources', 'Reading lists', 'Syllabi', 'True crime', 'Artificial intelligence', 'Trees',
];

JD.refs = {
  florey: { title: 'Postcards and the New York Suffrage Movement', cite: 'Kenneth Florey · New York History, Vol. 98, No. 3/4 (Summer/Fall 2017), pp. 441–464 · Cornell University Press', desc: 'A study of the picture postcards produced for and against suffrage in New York, and how activists used the format to reach new audiences.' },
  cowman: { title: '“Doing Something Silly”: The Uses of Humour by the Women’s Social and Political Union, 1903–1914', cite: 'Krista Cowman · International Review of Social History, Vol. 52 (2007), pp. 259–274', desc: 'How the WSPU turned ridicule into a tactic, using humour in its own propaganda to disarm opponents.' },
  nordholt: { title: 'From Pussy Panic to a Fascination with Felines', cite: 'Larissa Schulte Nordholt · Gender and Animals in History: Yearbook of Women’s History 42, pp. 188–206', desc: 'Tracing how cats came to stand in for women in Edwardian visual culture, from mockery to self-representation.' },
};

JD.icons = {
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
  search: '<circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.2-4.2"/>',
  chevronLeft: '<path d="m15 6-6 6 6 6"/>',
  chevronRight: '<path d="m9 6 6 6-6 6"/>',
  chevronDown: '<path d="m6 9 6 6 6-6"/>',
  arrowUp: '<path d="M12 19V5M6 11l6-6 6 6"/>',
  arrowRight: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  external: '<path d="M14 5h5v5M19 5l-8 8M18 14v5H5V6h5"/>',
  clock: '<circle cx="12" cy="12" r="8"/><path d="M12 8v4l3 2"/>',
  series: '<rect x="8" y="4" width="12" height="12" rx="1"/><path d="M4 8v12h12"/>',
  book: '<path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H11v16H5.5A1.5 1.5 0 0 1 4 18.5zM20 5.5A1.5 1.5 0 0 0 18.5 4H13v16h5.5a1.5 1.5 0 0 0 1.5-1.5z"/>',
  doc: '<path d="M6 3h9l3 3v15H6z"/><path d="M9 9h6M9 13h6M9 17h4"/>',
  share: '<path d="M12 15V4M7.5 8.5 12 4l4.5 4.5M5 13v7h14v-7"/>',
  bookmark: '<path d="M7 4h10v16l-5-4-5 4z"/>',
  grid: '<rect x="4" y="4" width="7" height="7" rx="1"/><rect x="13" y="4" width="7" height="7" rx="1"/><rect x="4" y="13" width="7" height="7" rx="1"/><rect x="13" y="13" width="7" height="7" rx="1"/>',
  archive: '<rect x="3" y="4" width="18" height="5" rx="1"/><path d="M5 9v11h14V9M10 13h4"/>',
  layers: '<path d="m12 4 9 5-9 5-9-5z"/><path d="m3 14 9 5 9-5"/>',
  puzzle: '<path d="M10 4h4v3a2 2 0 1 0 4 0V4h2v6h-3a2 2 0 1 0 0 4h3v6h-6v-3a2 2 0 1 0-4 0v3H4V14h3a2 2 0 1 0 0-4H4V4z"/>',
  pencil: '<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="m13 7 4 4"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="1"/><path d="m4 6 8 7 8-7"/>',
};
