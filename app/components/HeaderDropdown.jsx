// app/components/HeaderDropdown.jsx

"use client";

import { Link } from 'react-router';

export function HeaderDropdown({show, btn}) {
  const dropdownContent = {
    shop: (
      <>
        <Link
          to="/products/theodent-classic"
          className="header-dropdown-btn flex items-center justify-center h-[52px]"
        >
          <img alt="Theodent Classic" src="/imgs/classic.png" className="h-5" />
        </Link>
        <div className="w-full h-px bg-[#CC8A52]" />
        <Link
          to="/products/theodent-kids"
          className="header-dropdown-btn flex items-center justify-center h-[52px]"
        >
          <img alt="Theodent Kids" src="/imgs/kids.png" className="h-6" />
        </Link>
        <div className="w-full h-px bg-[#CC8A52]" />
        <Link
          to="/products/theodent-300"
          className="header-dropdown-btn flex items-center justify-center h-[52px]"
        >
          <img alt="Theodent 300" src="/imgs/300.png" className="h-6" />
        </Link>
        <div className="w-full h-px bg-[#CC8A52]" />
        <Link to="/products" className="header-dropdown-btn mt-1">
          SHOP ALL
        </Link>
      </>
    ),
    learn: (
      <>
        <Link to="/pages/technology" className="header-dropdown-btn mb-2">
          THE TECHNOLOGY
        </Link>
        <div className="w-full h-px bg-[#CC8A52]" />
        <Link to="/pages/ingredients" className="header-dropdown-btn mb-2 mt-1">
          THE INGREDIENTS
        </Link>
        <div className="w-full h-px bg-[#CC8A52]" />
        <Link to="/pages/company" className="header-dropdown-btn mb-2 mt-1">
          THE COMPANY
        </Link>
        <div className="w-full h-px bg-[#CC8A52]" />
        <Link to="/blogs" className="header-dropdown-btn mb-1 mt-1">
          THE BLOG
        </Link>
      </>
    ),
    pro: (
      <>
        <Link
          to="/pages/clinical-information"
          className="header-dropdown-btn mb-1 mt-1"
        >
          CLINICAL INFORMATION
        </Link>
      </>
    ),
    contact: (
      <>
        <Link to="/pages/contact-us" className="header-dropdown-btn mb-2">
          HOW TO CONTACT
        </Link>
        <div className="w-full h-px bg-[#CC8A52]" />
        <Link to="/pages/faqs" className="header-dropdown-btn mb-2 mt-1">
          FAQ's
        </Link>
        <div className="w-full h-px bg-[#CC8A52]" />
        <a
          target="_blank"
          href="https://forms.gle/zgDvneU86ph1FEsr7"
          className="header-dropdown-btn mb-1 mt-1"
          rel="noreferrer"
        >
          FEEDBACK
        </a>
      </>
    ),
  };

  return (
    <div
      className={`absolute left-1/2 bottom-0 w-[300px] -translate-x-1/2 translate-y-full transition-opacity duration-200 ${
        show ? 'z-50 opacity-100' : '-z-10 opacity-0'
      }`}
    >
      <div className="mt-4 border border-[#CC8A52] bg-[#fefcf3] py-3 px-8 shadow-[-10px_10px_10px_rgba(200,169,119,0.25)]">
        {dropdownContent[btn]}
      </div>
    </div>
  );
}