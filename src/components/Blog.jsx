import React, { useState } from "react";
import { blogs } from "../Data";
import { blogBtns } from "../Data";

const Blog = () => {
  const [expandedContent, setExpandedContent] = useState({});
  const [filteredBlogs, setFilteredBlogs] = useState(blogs);

  const toggleContent = (blogId) => {
    setExpandedContent((prev) => ({
      ...prev,
      [blogId]: !prev[blogId],
    }));
  };

  const handleClick = (e) => {
    let btnType = e.target.value;
    const newFilteredBlogs = blogs.filter(
      (blog) => btnType === "all" || blog.value === btnType
    );
    setFilteredBlogs(newFilteredBlogs);
  };

  return (
    <div className="section" id="blog">
      <div className="mb-8">
        <h2 className="text-[1.5rem] font-bold">My Blog</h2>
        <div className="w-14 h-[3px] rounded-sm bg-blue"></div>
      </div>
      <div className="mt-4 flex flex-wrap gap-8">
        {blogBtns.map((blogBtn) => (
          <button key={blogBtn.id} value={blogBtn.type} onClick={handleClick}>
            {blogBtn.name}
          </button>
        ))}
      </div>
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 mt-12">
        {filteredBlogs.map((blog) => {
          const isExpanded = expandedContent[blog.id] || false;
          const contentLines = blog.content.split('\n');

          return (
            <div key={blog.id} className="shadow-md hover:shadow-none p-2">
              <img loading="lazy" src={blog.image} alt="" />
              <div className="mt-3">
                <div className="text-xl font-bold">{blog.title}</div>
                <p className="text-[0.9rem] mt-2 opacity-80">
                  {isExpanded
                    ? contentLines.map((line, index) => (
                        <React.Fragment key={index}>
                          {line}
                          <br />
                        </React.Fragment>
                      ))
                    : ""}
                </p>
                {contentLines.length > 1 && (
                  <button
                    onClick={() => toggleContent(blog.id)}
                    className="text-[0.9rem] mt-2 text-blue"
                  >
                    {isExpanded ? "Read Less" : "Read More"}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Blog;
