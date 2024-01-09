import DigAvi from "./assets/DigAviDemo.mp4";
import Raiinet from "./assets/RaiinetDemo.mp4";

import eggPancake from "./assets/eggPancake.jpg";
import oden from "./assets/oden.jpg";
import potatoCB from "./assets/potatoCB.jpg";
import soBa from "./assets/soBa.jpg";
import quebec from "./assets/quebec.jpg";
import halifax from "./assets/halifax.jpg";
import lunenburg from "./assets/lunenburg.jpg";
import fundy from "./assets/fundy.jpg";
import nb from "./assets/nb.jpg";
import yinan from "./assets/yinan.jpg";

import { TfiEmail } from "react-icons/tfi";
import { TiSocialLinkedin } from "react-icons/ti";
import { IoLogoGithub } from "react-icons/io";


export const navLinks = [
  {
    id: 1,
    text: "Home",
    href: "home",
  },
  {
    id: 2,
    text: "Projects",
    href: "projects",
  },
  {
    id: 3,
    text: "Blog",
    href: "blog",
  },
  {
    id: 4,
    text: "Contact",
    href: "contact",
  },
];

export const btns = [
  { id: 1, name: "All", value: "all" },
  { id: 2, name: "UI/UX", value: "ui/ux" },
  { id: 3, name: "Game", value: "game" },
];

export const projects = [
  {
    id: 1,
    mediaType: "video",
    video: Raiinet,
    value: "game",
  },
  {
    id: 2,
    mediaType: "video",
    video: DigAvi,
    value: "ui/ux",
  },
];

export const blogBtns = [
  { id: 1, name: "All", type: "all"},
  { id: 2, name: "Food", type: "food"},
  { id: 3, name: "Travel", type: "travel"},
]

export const blogs = [
  // template:
    /* {
          id:,
          value: "",
          image:,
          title: "",
          content: "",
        }, */
  {
    id: 1,
    value: "food",
    image: eggPancake,
    title: "Egg Pancake",
    content: "Essential Ingredients:\n- eggs\n- flour\n- onions\n- potatoes\n- salt\n \nCooked on: January 1, 2024",
  },
  {
    id: 2,
    value: "travel",
    image: fundy,
    title: "Fundy",
    content: `Funday National Park (New Brunswick)\n  \nPhoto taken on: May 31, 2023`,
  },
  {
    id: 3,
    value: "travel",
    image: halifax,
    title: "Halifax",
    content: `Halifax Harbour (Nova Scotia) at night\n  \nPhoto taken on: July 8, 2022`,
  },
  {
    id: 4,
    value: "travel",
    image: lunenburg,
    title: "Lunenburg",
    content: `Lovely seaside town resides in Nova Scotia\n \nPhoto taken on: July 8, 2022`,
  },
  {
    id: 5,
    value: "travel",
    image: nb,
    title: "Track & Field",
    content: `2022 New Brunswick Track & Field Provincials champion!!\n 4*400 relay gold medal recipient\n  \nPhoto taken on: June 4, 2022`,
  },
  {
    id: 6,
    value: "food",
    image: oden,
    title: "Oden",
    content: `Essential Ingredients:\n- oden broth\n- water\n- salt
              - konjac\n- white raddish\n- anything else you like ;)\n \nCooked on: December 28, 2023`,
  },
  {
    id: 7,
    value: "food",
    image: potatoCB,
    title: "Chicken Platter",
    content: `Essential Ingredients:\n- smashed potatoes\n- salt\n- grilled chick breast\n- brocoli
              \n Cooked on: January 4, 2023`,
  },
  {
    id: 8,
    value: "food",
    image: soBa,
    title: "Soba Noodles",
    content: `Essential Ingredients:\n- soba noodles\n- green onions\n- soy sauce \n- water
              \n Cooked on: January 1, 2024`,
  },
  {
    id: 9,
    value: "travel",
    image: quebec,
    title: "Quebec City",
    content: `It is a 3D poem...\n \nPhoto taken on: July 13, 2023  \n`,
  },
  {
    id: 10,
    value: "travel",
    image: yinan,
    title: "Yinan Temple",
    content: `Temple at my hometown: Yinan, Shandong, China\n \n Photo taken on: August 29, 2023`,
  },
];


export const contacts = [
  {
    id: 1,
    icon: <TfiEmail />,
    text: "fdai@uwaterloo.ca",
    href: "mailto:fdai@uwaterloo.ca",
  },
  {
    id: 2,
    icon: <TiSocialLinkedin />,
    text: "LinkedIn",
    href: "https://www.linkedin.com/in/fangdadai/",
  },
  {
    id: 3,
    icon: <IoLogoGithub />,
    text: "GitHub",
    href: "https://github.com/fangdadai",
  },

];
