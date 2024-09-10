import React, { useState } from 'react';

export const Navbar = () => {

  return (
    <nav className='flex justify-between bg-violet-800 text-white py-4 px-10 shadow-lg'>
      <div className='logo'>
        <span className='font-bold text-2xl'>iTask</span>
      </div>
      <ul className="flex gap-10 text-lg">
        <li
          className={`cursor-pointer hover:text-cyan-400 transition-all `}
          
        >
          Home
        </li>
        <li
          className={`cursor-pointer hover:text-cyan-400 transition-all `}
          
        >
          Your Task
        </li>
      </ul>
    </nav>
  );
};
