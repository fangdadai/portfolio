import RaiinetDemo from '../assets/RaiinetDemo.mp4';
import DigAviDemo from '../assets/DigAviDemo.mp4';

// Project details are limited to facts available in the original portfolio.
// Add the stack, your role, and longer case-study notes when ready.
export const projects = [
  {
    id: 'hello-asl', title: 'HelloASL', category: 'Product', year: '2026',
    summary: 'A 2026 project demo for HelloASL, presented as a complete product walkthrough.',
    body: [
      'HelloASL is part of my current project archive. The embedded demo starts at the five-second mark and shows the project in use.',
    ],
    tags: ['HelloASL', 'Product demo', '2026'], featured: true, sample: false, visible: true,
    image: null, imageAlt: '', video: null, youtubeId: 'rP3z5ErjmKo', youtubeStart: 5,
    links: [{ label: 'Watch on YouTube', href: 'https://www.youtube.com/watch?v=rP3z5ErjmKo&t=5s' }],
  },
  {
    id: 'raiinet', title: 'Raiinet', category: 'Game', year: '2023',
    summary: 'A game project demo from my original 2023 portfolio, preserved here in motion.',
    body: [
      'Raiinet appeared in the game section of my original portfolio. This 2023 recording preserves the playable project and its interaction as I presented it then.',
    ],
    tags: ['Game', 'Video demo', '2023'], featured: false, sample: false, visible: true,
    image: null, imageAlt: '', video: RaiinetDemo, youtubeId: null, links: [],
  },
  {
    id: 'digavi', title: 'DigAvi', category: 'UI/UX', year: '2023',
    summary: 'A UI/UX project demo from my original 2023 portfolio, now presented as part of the project archive.',
    body: [
      'DigAvi appeared in the UI/UX section of my original portfolio. This 2023 demo keeps the original interface work visible and easy to explore.',
    ],
    tags: ['UI/UX', 'Video demo', '2023'], featured: false, sample: false, visible: true,
    image: null, imageAlt: '', video: DigAviDemo, youtubeId: null, links: [],
  },
];
