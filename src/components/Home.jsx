import React from "react";
import me from "../assets/me.jpg";
import { motion } from "framer-motion";
import { TypeAnimation } from 'react-type-animation';
 
const MyIntro = () => {
  return (
    <TypeAnimation
      sequence={[
        `Hello! Welcome to my website, this is Fangda.
        I'm a 4th-year CS student at the University of Waterloo. This
        website serves as a platform to document some of my projects and daily lives.
        Please feel free to reach out to me!!`
      ]}
      wrapper="span"
      cursor={true}
      speed={77}
      style={{fontSize: '0.9em'}}
    />
  );
};

const Home = () => {
  return (
    <div className="section flex justify-center items-center" id="home">
      <div className="grid md:grid-cols-2 place-items-center gap-8">
        <div className="w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] rounded-full overflow-hidden shadow-heroSadow border-[20px] border-solid border-ghostWhite">
          <img
            src={me}
            alt="me-img"
            className="w-full h-full object-cover"
          />
        </div>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-grey sm:text-[1.25rem] mb-4">Student, Programmer, Dream-Chaser</div>
          <h2 className="text-[2rem] sm:text-[3rem] font-bold mb-4">
            Fangda Dai
          </h2>
          <h3>
          {MyIntro()}
          </h3>
          <div className="flex mt-4 gap-4">
            <a className="py-2 px-4 border-[2px] border-blue border-solid text-[0.9rem] rounded-[2.2rem] shadow-md" 
               href="Fangda_Resume.pdf" download><strong>Download Resume</strong>
            </a>
            <a
              href="#contact"
              className="py-2 px-4 border-[2px] border-solid border-grey text-[0.9rem] rounded-[2.2rem] shadow-md"
            >
              Contact
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
