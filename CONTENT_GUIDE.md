# Update the portfolio

The site content lives in three files. Vite refreshes the local preview after you save.

| File | Content |
| --- | --- |
| `src/content/site.js` | Name, opening profile, biography, interests, contact links, and visible sections |
| `src/content/projects.js` | Project dates, descriptions, local videos, YouTube demos, tags, and links |
| `src/content/journal.js` | Personal archive photos, categories, dates, descriptions, and expanded notes |

## Profile

Edit `name`, `role`, `intro`, and `profileRows` in `site.js` to change the first screen. `aboutParagraphs` controls the longer About section. The landing portrait is `public/fangda-2026.jpg`; replace that file while keeping its filename to update it.

The résumé lives at `public/Fangda_Resume.pdf`. Replace it while keeping the filename, or set `resume: null` to hide the résumé link. Check the email and social links before publishing.

Hide an optional section by changing its flag:

```js
sections: {
  projects: true,
  about: false,
  journal: true,
},
```

## Projects

The portfolio currently contains HelloASL, Raiinet, and DigAvi. Keep each `id` unique, use a four-digit `year`, and set `visible: false` to keep a draft out of the site.

For a local MP4, put the file in `src/assets`, import it at the top of `projects.js`, and assign it to `video`:

```js
import demo from '../assets/my-demo.mp4';

{
  id: 'my-project',
  title: 'My project',
  category: 'Web application',
  year: '2026',
  summary: 'A concise description for the project list.',
  body: ['The problem and audience.', 'My role, one key decision, and the outcome.'],
  tags: ['React', 'Design'],
  featured: false,
  sample: false,
  visible: true,
  image: null,
  imageAlt: '',
  video: demo,
  youtubeId: null,
  links: [{ label: 'Source code', href: 'https://github.com/...' }],
},
```

For YouTube, set `video: null`, copy the video ID into `youtubeId`, and optionally set `youtubeStart` in seconds. Use the full watch URL in `links` so visitors can open YouTube directly.

## Journal

All 10 entries from the original portfolio are restored. To append another entry, import its image and add:

```js
{
  id: 'a-new-note',
  title: 'A new note',
  category: 'Travel',
  date: '2026-10-02',
  image: myPhoto,
  imageAlt: 'A useful description of the photograph.',
  excerpt: 'A short description shown on the card.',
  body: ['The complete note.', 'A second paragraph, if needed.'],
  visible: true,
  archival: false,
},
```

Use `YYYY-MM-DD` for dates. Filters are built automatically from visible categories. Set `visible: false` to hide an entry without deleting it.

## Verify and publish

Run `npm run build` after editing. Check desktop and mobile layouts, play each project demo, and confirm external links. Publishing remains controlled by the existing GitHub Actions workflow.
