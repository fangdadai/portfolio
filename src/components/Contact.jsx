import React from "react";
import { contacts } from "../Data";
import { FaPhoneVolume } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="container mx-auto mb-7 px-6" id="contact">
      <div className="mb-8">
        <h2 className="text-[1.5rem] font-bold">Contact</h2>
        <div className="w-14 h-[3px] rounded-sm bg-blue"></div>
      </div>
      <div className="p-4 mx-auto" style={{backgroundColor: "#6495ED"}}>
        <div className="grid gap-8 sm:grid-cols-4">
          <div className="flex gap-2 items-center flex-col">
            <div className="text-black text-xl"><FaPhoneVolume/></div>
            <div className="text-[0.9rem]">506-227-0180</div>
          </div>
          {contacts.map((contact) => {
            const { id, icon, text, href} = contact;
            return (
              <div className="flex gap-2 items-center flex-col" key={id}>
                <a href={href} target="_blank" className="text-black text-xl">{icon}</a>
                <div className="text-[0.9rem]">{text}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Contact;
