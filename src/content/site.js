// The main profile content lives here so the first screen and the About section
// can be updated without touching the layout components.
export const site = {
  name: 'Fangda Dai',
  initials: 'FD',
  edition: 'Personal system / rev. 02',
  role: 'Software & systems',
  profileImage: `${import.meta.env.BASE_URL}fangda-2026.jpg`,
  intro: 'Computer science at Waterloo. Projects, photographs, and notes.',
  profileRows: [
    { label: 'Work', value: 'Software · UI/UX · experiments' },
    { label: 'Beyond', value: 'Cooking · travel · track' },
    { label: 'Archive', value: 'Projects and field notes, 2022—2026' },
  ],
  aboutTitle: 'A little about me.',
  aboutParagraphs: [
    'I’m Fangda, with a background in computer science at the University of Waterloo. I like turning ideas into working software, especially when engineering and thoughtful product design meet.',
    'This site is also a record of the person outside the code: meals I have made, places I have visited, photographs I kept, and a track medal that still means a lot to me.',
  ],
  interests: ['Software engineering', 'Product thinking', 'UI/UX', 'Cooking', 'Travel', 'Track & field'],
  email: 'fangdadai9@gmail.com',
  resume: `${import.meta.env.BASE_URL}Fangda_Resume.pdf`,
  socials: [
    { label: 'GitHub', href: 'https://github.com/fangdadai' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/fangdadai/' },
  ],
  sections: { projects: true, about: true, journal: true },
  sampleBio: false,
};
