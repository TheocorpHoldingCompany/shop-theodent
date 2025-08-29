// app/components/sections/Hero.jsx

import { Link } from 'react-router';
import {Image} from '@shopify/hydrogen';

export function Hero() {
  return (
    <section>
      {/* Mobile Hero */}
      <div className="lg:hidden">
        <Image
          src="/imgs/blackFridayBanner2Sm.webp"
          alt="Theodent hero banner"
          width={750}
          height={900}
          className="w-full h-auto"
        />
        <div className="p-8 text-center bg-gray-100">
          <h1 className="text-3xl font-bold theo-h1">
            Fluoride-free Toothpaste Powered by Cacao
          </h1>
          <p className="mt-3 mb-4 text-lg leading-relaxed theo-h3">
            Clinically proven to be safer and more effective than fluoride
          </p>
          <Link to="/products" className="inline-block theo-btn hero-btn">
            SHOP THEODENT
          </Link>
        </div>
      </div>

      {/* Desktop Hero */}
      <div
        className="hidden lg:flex h-[70vh] min-h-[600px] max-h-[800px] items-center bg-cover bg-center bg-no-repeat"
        style={{backgroundImage: `url('/imgs/blackFridayBanner2.webp')`}}
      >
        <div className="container">
          <div className="max-w-md p-8 text-white rounded-lg bg-black/30 backdrop-blur-sm">
            <h1 className="text-4xl font-bold theo-h1">
              Fluoride-free Toothpaste Powered by Cacao
            </h1>
            <p className="mt-3 mb-4 text-xl leading-relaxed theo-h3">
              Clinically proven to be safer and more effective than fluoride
            </p>
            <Link
              to="/products"
              className="inline-block border-2 border-white theo-btn"
            >
              SHOP THEODENT
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}