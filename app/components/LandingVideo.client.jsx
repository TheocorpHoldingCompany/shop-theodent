// app/components/sections/VideoSection.jsx

"use client";

import {useState, useRef, useEffect} from 'react';

// A custom hook to detect when an element is visible in the viewport
function useInViewport(ref) {
  const [inViewport, setInViewport] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInViewport(true);
          observer.disconnect(); // Disconnect after it's visible once
        }
      },
      {threshold: 0.1}, // Trigger when 10% of the video is visible
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref]);

  return inViewport;
}

export function VideoSection() {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);
  const [showUnmute, setShowUnmute] = useState(false);
  const inViewport = useInViewport(videoRef);

  useEffect(() => {
    if (inViewport && videoRef.current) {
      videoRef.current.play();
      setShowUnmute(true);
      // Hide the "unmute" button after 5 seconds
      const timer = setTimeout(() => setShowUnmute(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [inViewport]);

  return (
    <div className="relative w-full landing-video">
      <video
        ref={videoRef}
        src="/newVideo.mp4" // Make sure this video is in your `public` folder
        muted={muted}
        playsInline
        loop
        controls={false} // Hide default controls for a cleaner look
        className="w-full"
      />
      {muted && (
        <div
          className={`absolute bottom-5 right-5 transition-transform duration-300 ease-in-out ${
            showUnmute ? 'translate-x-0' : 'translate-x-[200%]'
          }`}
        >
          <button
            onClick={() => setMuted(false)}
            className="px-6 py-2 text-white bg-primary shadow-lg rounded-full theo-btn"
          >
            Click to Unmute
          </button>
        </div>
      )}
    </div>
  );
}