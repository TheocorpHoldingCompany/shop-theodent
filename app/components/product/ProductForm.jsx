// app/components/product/ProductForm.jsx

"use client";

import {useState} from 'react';
import {CartForm, useCart} from '@shopify/hydrogen';
import {useVariantUrl} from '~/lib/variants';
import {Money} from '@shopify/hydrogen-react';

import {ProductOptions} from './ProductOptions';

export function ProductForm({product}) {
  const [quantity, setQuantity] = useState(1);
  const {selectedVariant} = product;
  const isOutOfStock = !selectedVariant?.availableForSale;

  const variantId = selectedVariant?.id;

  const lines = [
    {
      merchandiseId: variantId,
      quantity: quantity,
    },
  ];

  return (
    <div className="grid gap-6">
      <ProductOptions options={product.options} />
      <div className="flex items-center gap-4">
        {/* Quantity Stepper */}
        <div className="flex border border-[#2A1B16]">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={quantity <= 1}
            className="w-10 h-9 transition disabled:opacity-50 hover:bg-gray-100"
          >
            &#8722;
          </button>
          <div className="w-16 text-center">{quantity}</div>
          <button
            onClick={() => setQuantity(Math.min(99, quantity + 1))}
            className="w-10 h-9 transition hover:bg-gray-100"
          >
            &#43;
          </button>
        </div>
        {/* Price Display */}
        {selectedVariant?.price && (
          <Money
            data={selectedVariant.price}
            className="text-2xl font-semibold"
            withoutTrailingZeros
          />
        )}
      </div>

      {/* Add to Cart Button */}
      <CartForm route="/cart" inputs={{lines}} action={CartForm.ACTIONS.LinesAdd}>
        {(fetcher) => (
          <>
            <button
              type="submit"
              disabled={isOutOfStock ?? fetcher.state !== 'idle'}
              className="w-full theo-btn"
            >
              {isOutOfStock ? 'Sold Out' : `Add to Cart`}
            </button>
            {fetcher.state === 'submitting' && (
              <p className="mt-2 text-sm text-center">Adding to cart...</p>
            )}
          </>
        )}
      </CartForm>
    </div>
  );
}