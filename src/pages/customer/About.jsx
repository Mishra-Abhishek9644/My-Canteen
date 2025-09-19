// pages/customer/About.jsx
import React from "react";

const team = [
  {
    name: "Abhishek Mishra",
    role: "Frontend Developer",
    img: "https://via.placeholder.com/150", // replace with your photo
  },
  {
    name: "Deepraj ",
    role: "Backend Developer",
    img: "https://via.placeholder.com/150",
  },
  {
    name: "Devanshi ",
    role: "UI/UX Designer",
    img: "https://via.placeholder.com/150",
  },
  {
    name: "Suraj Chaudhary",
    role: "Project Coordinator",
    img: "https://via.placeholder.com/150",
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Project Intro */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">About Campus Canteen</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            This project, <span className="font-semibold text-orange-500">Campus Canteen</span>, 
            is built as part of our TYBCA Semester 5 curriculum at SDJ International College. 
            The aim is to create a full-fledged food ordering and management system for students and staff.
          </p>
        </div>

        {/* Team Section */}
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-8">Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-lg transition-shadow"
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-24 h-24 mx-auto rounded-full mb-4 object-cover"
              />
              <h3 className="text-lg font-bold text-gray-800">{member.name}</h3>
              <p className="text-sm text-gray-500">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
