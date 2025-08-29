// app/components/product/ProductGallery.jsx

"use client";

import {useState} from 'react';
import {Image} from '@shopify/hydrogen';
import {useWindowSize} from 'react-use';
import {BsX, BsChevronRight, BsChevronLeft} from 'react-icons/bs';

/**
 * A client component that defines a media gallery for a product.
 * It shows a main image, a grid of thumbnails, and a full-screen modal.
 * @param {Array} media - An array of media objects from the Storefront API.
 */
export function ProductGallery({media}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!media.length) {
    return null;
  }

  const selectedMedia = media[selectedIndex];
  const thumbnails = media.filter((_, index) => index !== selectedIndex);

  function handleNext() {
    const nextIndex = (selectedIndex + 1) % media.length;
    setSelectedIndex(nextIndex);
  }

  function handlePrev() {
    const prevIndex = (selectedIndex - 1 + media.length) % media.length;
    setSelectedIndex(prevIndex);
  }

  return (
    <>
      {/* Main Image & Thumbnails */}
      <div className="grid gap-4">
        <div
          className="overflow-hidden bg-white border rounded-lg shadow-sm cursor-pointer aspect-square"
          onClick={() => setModalOpen(true)}
        >
          <Image
            data={selectedMedia.image}
            alt={selectedMedia.image.altText || 'Product image'}
            className="object-cover object-center w-full h-full"
            sizes="(max-width: 48em) 100vw, 50vw"
          />
        </div>
        <div className="grid grid-cols-4 gap-4">
          {thumbnails.map((mediaItem, index) => {
            // Find the original index to set it as selected
            const originalIndex = media.findIndex((m) => m.id === mediaItem.id);
            return (
              <button
                key={mediaItem.id}
                className="overflow-hidden border rounded-lg aspect-square"
                onClick={() => setSelectedIndex(originalIndex)}
              >
                <Image
                  data={mediaItem.image}
                  alt={mediaItem.image.altText || 'Product thumbnail'}
                  className="object-cover object-center w-full h-full"
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Full-screen Modal */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-200 ${
          modalOpen ? 'bg-opacity-80 opacity-100' : 'bg-opacity-0 opacity-0 pointer-events-none'
        }`}
      >
        {modalOpen && (
          <Image
            data={selectedMedia.image}
            className="object-contain w-auto h-full max-h-[90vh]"
            alt={selectedMedia.image.altText || 'Product image in modal'}
          />
        )}
        <button
          className="absolute text-white transition top-5 right-5 hover:opacity-80"
          onClick={() => setModalOpen(false)}
        >
          <BsX size={32} />
        </button>
        <button
          className="absolute text-white transition -translate-y-1/2 left-5 top-1/2 hover:opacity-80"
          onClick={handlePrev}
        >
          <BsChevronLeft size={28} />
        </button>
        <button
          className="absolute text-white transition -translate-y-1/2 right-5 top-1/2 hover:opacity-80"
          onClick={handleNext}
        >
          <BsChevronRight size={28} />
        </button>
      </div>
    </>
  );
}