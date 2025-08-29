// app/components/sections/StoreLocator.jsx

"use client";

import {useState, useEffect} from 'react';

export function StoreLocator() {
  const [show, setShow] = useState(false);

  // Delay showing to ensure third-party script has loaded
  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container py-8">
      <h1 className="mb-2 text-3xl font-bold">STORE LOCATOR</h1>
      <div className="w-full h-0.5 bg-accent" />
      <div className="flex items-start justify-center w-full h-[600px] mt-8">
        {show && <div id="progus-store-locator" className="w-full h-full"></div>}
      </div>
    </div>
  );
}