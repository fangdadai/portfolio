import React, { useEffect, useState } from "react";
import { btns } from "../Data";
import { projects } from "../Data";
import { motion, AnimatePresence } from "framer-motion";

const Projects = () => {
  const [filterMedia, setFilterMedia] = useState(null);

  useEffect(() => {
    setFilterMedia(projects);
  }, []);

  const handleClick = (e) => {
    let btnType = e.target.value;
    const newFilterMedia = projects.filter(
      (media) => btnType === "all" || media.value === btnType
    );
    setFilterMedia(newFilterMedia);
  };

  return (
    <div className="section" id="projects">
      <div className="mb-8">
        <h2 className="text-[1.5rem] font-bold">My Projects</h2>
        <div className="w-14 h-[3px] rounded-sm bg-blue"></div>
      </div>
      <div className="mt-4 flex flex-wrap gap-8">
        {btns.map((btn) => (
          <button key={btn.id} value={btn.value} onClick={handleClick}>
            {btn.name}
          </button>
        ))}
      </div>
      <AnimatePresence>
        <motion.div className="grid sm:grid-cols-2 md:grid-cols-3 mt-12 gap-3">
          {filterMedia &&
            filterMedia.map((media) => (
              <motion.div
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.3 } }}
                key={media.id}
              >
                {media.mediaType === "video" ? (
                  <motion.video controls>
                    <source loading="lazy" src={media.video} type="video/mp4" />
                  </motion.video>
                ) : (
                  <motion.img loading="lazy" src={media.image} alt="" />
                )}
              </motion.div>
            ))}
        </motion.div>
      </AnimatePresence>
      
    </div>
  );
};

export default Projects;
