// app/components/cart/CartLineItem.jsx

"use client";

import { Link } from 'react-router';
import {Image, Money, useCartLine} from '@shopify/hydrogen-react';
import {CartForm} from '@shopify/hydrogen';

export function CartLineItem() {
  const {id: lineId, quantity, merchandise} = useCartLine();
  const {image, product, selectedOptions, price} = merchandise;

  return (
    <li key={lineId} className="flex gap-4">
      <div className="flex-shrink-0">
        <Image
          alt={image.altText || product.title}
          width={100}
          height={100}
          data={image}
          className="object-cover object-center w-24 h-24 border rounded"
          loaderOptions={{
            scale: 2,
            crop: 'center',
          }}
        />
      </div>

      <div className="flex flex-col justify-between flex-grow">
        <div>
          <h3 className="text-lg font-semibold leading-tight md:text-xl theo-h2">
            {product.title}
          </h3>
          <p className="text-sm md:text-base theo-h2">
            {product.productType}
          </p>
          {/* Optional: Display selected variant options */}
          {/* <Text size="sm">
            {selectedOptions.map((option) => (
              <span key={option.name}>
                {option.name}: {option.value}
              </span>
            ))}
          </Text> */}
        </div>
        <div className="w-full h-px bg-[#CC8A52] my-2" />
        <div className="flex items-center justify-between">
          <CartLineQuantity lineId={lineId} />
          <Money data={price} className="font-semibold" />
        </div>
      </div>
    </li>
  );
}

function CartLineQuantity({lineId}) {
  const {quantity} = useCartLine();

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center border border-[#2A1B16]">
        {/* Decrease Quantity Button */}
        <CartForm
          route="/cart"
          inputs={{
            action: CartForm.ACTIONS.LinesUpdate,
            lines: [{id: lineId, quantity: quantity - 1}],
          }}
        >
          <button
            aria-label="Decrease quantity"
            disabled={quantity <= 1}
            className="w-8 h-8 transition border-r border-[#2A1B16] disabled:opacity-50 hover:bg-gray-100"
          >
            &#8722;
          </button>
        </CartForm>

        {/* Current Quantity */}
        <div className="px-4 text-center">{quantity}</div>

        {/* Increase Quantity Button */}
        <CartForm
          route="/cart"
          inputs={{
            action: CartForm.ACTIONS.LinesUpdate,
            lines: [{id: lineId, quantity: quantity + 1}],
          }}
        >
          <button
            aria-label="Increase quantity"
            className="w-8 h-8 transition border-l border-[#2A1B16] hover:bg-gray-100"
          >
            &#43;
          </button>
        </CartForm>
      </div>

      {/* Remove Item Button */}
      <CartForm
        route="/cart"
        inputs={{
          action: CartForm.ACTIONS.LinesRemove,
          lineIds: [lineId],
        }}
      >
        <button
          type="submit"
          className="text-xs font-normal uppercase transition hover:opacity-80 theo-p"
        >
          Remove
        </button>
      </CartForm>
    </div>
  );
}