// app/components/cart/CartEmpty.jsx

"use client";

import { Link } from 'react-router';

export function CartEmpty({onClose}) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-shrink-0">
        <h2 className="mt-1 text-xl font-semibold theo-h2">Shopping Bag</h2>
        <div className="w-1/2 h-px mt-1 bg-[#CC8A52]" />
        <button
          type="button"
          className="mt-3 text-base italic cursor-pointer theo-h2"
          onClick={onClose}
        >
          Continue Shopping
        </button>
      </div>

      <div className="flex flex-col items-center justify-center flex-grow w-full">
        <div className="w-3/5">
          <img
            alt="An illustration of an empty shopping bag"
            src="/imgs/emptyCart.png"
            className="w-full"
          />
        </div>
        <Link
          to="/products"
          onClick={onClose}
          className="inline-block mt-4 theo-btn"
        >
          SHOP THEODENT
        </Link>
      </div>
    </div>
  );
}