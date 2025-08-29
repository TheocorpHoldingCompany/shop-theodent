// app/routes/$.jsx

import { Link } from 'react-router';

export function meta() {
  return [{title: 'Page Not Found | Theodent'}];
}

export default function CatchAll() {
  return (
    <div className="relative w-full h-[calc(100vh-120px)]">
      <img
        className="object-cover w-full h-full"
        alt="Scenic background image for 404 not found page"
        src="/imgs/404.webp"
      />
      <div className="absolute text-center -translate-x-1/2 left-1/2 bottom-16">
        <p className="text-lg text-white theo-h3 drop-shadow-md">
          Unfortunately, the page you are looking for does not exist.
          <br /> Fortunately, you have landed on the web’s most elegant 404 page.
        </p>
        <Link
          to="/"
          className="inline-block px-8 py-3 mt-4 font-semibold text-white transition bg-gray-800 bg-opacity-50 border border-white rounded-full hover:bg-opacity-75"
        >
          RETURN TO HOME PAGE
        </Link>
      </div>
    </div>
  );
}