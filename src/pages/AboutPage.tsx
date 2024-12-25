import React from "react";

const AboutPage = () => {
  return (
    <div className="p-6 bg-light-background dark:bg-black min-h-screen">
      <h1 className="text-4xl font-bold mb-4">About Us</h1>
      <p className="mb-2">
        Welcome to MadDev, your number one source for all things development.
      </p>
      <p className="mb-2">
        We're dedicated to providing you the best of software solutions, with a
        focus on dependability, customer service, and uniqueness.
      </p>
      <p className="mb-2">
        Founded in 2023, MadDev has come a long way from its beginnings. When we
        first started out, our passion for development drove us to start our own
        blog website for the developer community.
      </p>
      <p className="mb-2">
        We hope you enjoy our content as much as we enjoy creating it for you.
        If you have any questions or comments, please don't hesitate to contact
        us.
      </p>
      <p className="mt-4">Sincerely,</p>
      <p className="font-semibold">The MadDev Team</p>
    </div>
  );
};

export default AboutPage;
