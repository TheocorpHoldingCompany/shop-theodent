// app/components/global/FDAAnnouncementPopup.jsx

"use client";

import {useState, useEffect, useRef} from 'react';
import { Link } from 'react-router';
import {BsX} from 'react-icons/bs';
import {disableBodyScroll, enableBodyScroll} from 'body-scroll-lock';

export function FDAAnnouncementPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const popupRef = useRef(null);

  // Show the popup only once per session or if it hasn't been dismissed recently.
  useEffect(() => {
    const isDismissed = sessionStorage.getItem('fda-popup-dismissed');
    if (!isDismissed) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  // Lock or unlock body scrolling when the popup appears or disappears.
  useEffect(() => {
    const popupElement = popupRef.current;
    if (popupElement) {
      if (isVisible) {
        disableBodyScroll(popupElement);
      } else {
        enableBodyScroll(popupElement);
      }
    }
    return () => {
      if (popupElement) {
        enableBodyScroll(popupElement);
      }
    };
  }, [isVisible]);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('fda-popup-dismissed', 'true');
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-primary/80 p-4"
      role="dialog"
      aria-modal="true"
      onClick={handleDismiss}
    >
      <div
        ref={popupRef}
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-contrast rounded-lg shadow-2xl border-2 border-accent"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleDismiss}
          className="absolute z-10 p-2 text-2xl transition top-2 right-2 text-primary hover:opacity-70"
          aria-label="Close announcement"
        >
          <BsX size={28} />
        </button>

        <div className="p-8 text-center">
          <h1 className="text-3xl font-bold leading-tight text-primary theo-h1 md:text-4xl">
            Historic FDA Clearance!
          </h1>

          <div className="max-w-xl mx-auto mt-4 space-y-4">
            <p className="text-lg leading-snug text-primary theo-h3">
              Theodent has officially received FDA clearance for the
              <strong> world's first fluoride-free varnish</strong>, marking
              real progress in professional dental care.
            </p>
            <p className="text-lg leading-snug text-primary theo-h3">
              This breakthrough advances our mission to provide a complete suite of
              both consumer and professional products that use{' '}
              <strong>Rennou™</strong> in place of fluoride.
            </p>
          </div>

          <div className="flex justify-center my-6">
            <img
              src="/imgs/fdaannouncement.png"
              alt="FDA Clearance for Theodent Fluoride-Free Varnish"
              className="w-full h-auto max-w-xs md:max-w-md"
              loading="lazy"
            />
          </div>

          <div className="flex flex-col items-center gap-4">
            <Link
              to="/pages/technology"
              className="w-full max-w-xs text-center no-underline theo-btn"
              onClick={handleDismiss}
            >
              Learn More About Rennou™
            </Link>
            <p className="text-xs italic text-gray-600">
              Professional varnish available through dental professionals. More details to come.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}