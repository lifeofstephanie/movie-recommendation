// import { useState } from "react";
// import {useParams } from "react-router-dom";
// import background from '../assets/hero-bg.jpg'

const Hero = () => {
  return (
    <section className="bg-[#000] text-[#fff] py-20 poster">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Discover Your Next Favorite Movie
        </h1>
        <p className="text-xl mb-8">
          Get personalized movie recommendations based on your taste
        </p>
        <div className="flex max-w-md mx-auto">
          <input
            type="search"
            placeholder="Search for movies..."
            className="flex-grow mr-2 h-[50px] rounded-md px-2 text-black"
          />
          <button type="submit">Search</button>
        </div>
      </div>
    </section>
  );
};
export default Hero;
