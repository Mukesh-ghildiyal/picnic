import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-semibold">
          <Link to="/">Trip Hive AI</Link>
        </div>
        <div className="space-x-4">
          <Link to="/" className="text-gray-300 hover:text-white">Home</Link>
          <Link to="/trip" className="text-gray-300 hover:text-white">Trip</Link>
          <Link to="/overview" className="text-gray-300 hover:text-white">Overview</Link>
          <Link to="/day" className="text-gray-300 hover:text-white">Day</Link>
          <Link to="/map" className="text-gray-300 hover:text-white">Map</Link>
          <Link to="/budget" className="text-gray-300 hover:text-white">Budget</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
