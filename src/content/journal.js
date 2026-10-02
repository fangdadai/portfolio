import eggPancake from '../assets/eggPancake.jpg';
import fundy from '../assets/fundy.jpg';
import halifax from '../assets/halifax.jpg';
import lunenburg from '../assets/lunenburg.jpg';
import nb from '../assets/nb.jpg';
import oden from '../assets/oden.jpg';
import potatoCB from '../assets/potatoCB.jpg';
import soBa from '../assets/soBa.jpg';
import quebec from '../assets/quebec.jpg';
import yinan from '../assets/yinan.jpg';

// The complete photo archive from the original portfolio. Descriptions and
// dates are preserved, with spelling and formatting lightly cleaned up.
export const journal = [
  {
    id: 'egg-pancake-2024', title: 'Egg Pancake', category: 'Food', date: '2024-01-01', image: eggPancake,
    imageAlt: 'A homemade egg pancake', excerpt: 'Eggs, flour, onions, potatoes, and salt.',
    body: ['Essential ingredients:\n• eggs\n• flour\n• onions\n• potatoes\n• salt', 'Cooked on January 1, 2024.'], visible: true, archival: true,
  },
  {
    id: 'fundy-2023', title: 'Fundy', category: 'Travel', date: '2023-05-31', image: fundy,
    imageAlt: 'A rocky coastal landscape at Fundy National Park in New Brunswick', excerpt: 'Fundy National Park, New Brunswick.',
    body: ['Fundy National Park, New Brunswick.', 'Photo taken on May 31, 2023.'], visible: true, archival: true,
  },
  {
    id: 'halifax-2022', title: 'Halifax', category: 'Travel', date: '2022-07-08', image: halifax,
    imageAlt: 'Halifax Harbour in Nova Scotia at night', excerpt: 'Halifax Harbour, Nova Scotia, at night.',
    body: ['Halifax Harbour, Nova Scotia, at night.', 'Photo taken on July 8, 2022.'], visible: true, archival: true,
  },
  {
    id: 'lunenburg-2022', title: 'Lunenburg', category: 'Travel', date: '2022-07-08', image: lunenburg,
    imageAlt: 'The seaside town of Lunenburg, Nova Scotia', excerpt: 'A lovely seaside town in Nova Scotia.',
    body: ['A lovely seaside town in Nova Scotia.', 'Photo taken on July 8, 2022.'], visible: true, archival: true,
  },
  {
    id: 'track-field-2022', title: 'Track & Field', category: 'Life', date: '2022-06-04', image: nb,
    imageAlt: 'The 2022 New Brunswick Track and Field Provincials relay champions', excerpt: '2022 New Brunswick Track & Field Provincials champion — 4 × 400 relay gold.',
    body: ['2022 New Brunswick Track & Field Provincials champion.', '4 × 400 relay gold medal recipient. Photo taken on June 4, 2022.'], visible: true, archival: true,
  },
  {
    id: 'oden-2023', title: 'Oden', category: 'Food', date: '2023-12-28', image: oden,
    imageAlt: 'A homemade bowl of oden', excerpt: 'Oden broth, konjac, white radish, and anything else you like.',
    body: ['Essential ingredients:\n• oden broth\n• water\n• salt\n• konjac\n• white radish\n• anything else you like', 'Cooked on December 28, 2023.'], visible: true, archival: true,
  },
  {
    id: 'chicken-platter-2023', title: 'Chicken Platter', category: 'Food', date: '2023-01-04', image: potatoCB,
    imageAlt: 'A homemade chicken platter with potatoes and broccoli', excerpt: 'Smashed potatoes, grilled chicken breast, and broccoli.',
    body: ['Essential ingredients:\n• smashed potatoes\n• salt\n• grilled chicken breast\n• broccoli', 'Cooked on January 4, 2023.'], visible: true, archival: true,
  },
  {
    id: 'soba-noodles-2024', title: 'Soba Noodles', category: 'Food', date: '2024-01-01', image: soBa,
    imageAlt: 'A homemade bowl of soba noodles', excerpt: 'Soba noodles, green onions, soy sauce, and water.',
    body: ['Essential ingredients:\n• soba noodles\n• green onions\n• soy sauce\n• water', 'Cooked on January 1, 2024.'], visible: true, archival: true,
  },
  {
    id: 'quebec-city-2023', title: 'Quebec City', category: 'Travel', date: '2023-07-13', image: quebec,
    imageAlt: 'A street scene in Quebec City', excerpt: 'It is a 3D poem…',
    body: ['It is a 3D poem…', 'Photo taken on July 13, 2023.'], visible: true, archival: true,
  },
  {
    id: 'yinan-temple-2023', title: 'Yinan Temple', category: 'Travel', date: '2023-08-29', image: yinan,
    imageAlt: 'A temple in Yinan, Shandong, China', excerpt: 'A temple in my hometown: Yinan, Shandong, China.',
    body: ['A temple in my hometown: Yinan, Shandong, China.', 'Photo taken on August 29, 2023.'], visible: true, archival: true,
  },
];
