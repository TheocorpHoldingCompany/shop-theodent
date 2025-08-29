// app/components/cart/CartDetails.jsx

"use client";

import { Link } from 'react-router';
import {CartForm, useCart} from '@shopify/hydrogen';
import {Money} from '@shopify/hydrogen-react';

import {CartEmpty} from './CartEmpty';
import {CartLineItem} from './CartLineItem';

export function CartDetails({layout, onClose}) {
  const {lines, cart} = useCart();

  if (lines.length === 0) {
    return <CartEmpty onClose={onClose} />;
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
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

      {/* Line Items */}
      <div className="flex-grow py-6 overflow-y-auto">
        <ul className="grid gap-8">
          {lines.map((line) => (
            <CartLineItem key={line.id} />
          ))}
        </ul>
      </div>

      {/* Summary, Discounts, & Checkout */}
      <div className="flex-shrink-0 border-t border-[#CC8A52]">
        <OrderSummary cost={cart.cost} />
        <CartDiscounts discountCodes={cart.discountCodes} />
        <CartCheckoutActions checkoutUrl={cart.checkoutUrl} />
      </div>
    </div>
  );
}

// --- Sub-components for the Cart Details ---

function CartCheckoutActions({checkoutUrl}) {
  if (!checkoutUrl) return null;
  return (
    <div className="p-4">
      <Link to={checkoutUrl} prefetch={false} target="_self" className="block w-full no-underline">
        <button className="w-full theo-btn bg-[#2A1B16] text-[#fefcf3]">
          Continue to Checkout
        </button>
      </Link>
    </div>
  );
}

function OrderSummary({cost}) {
  return (
    <dl className="p-4 space-y-2">
      <div className="flex items-center justify-between">
        <p className="font-semibold theo-h2">Subtotal</p>
        <p className="font-semibold theo-h2">
          {cost?.subtotalAmount?.amount ? (
            <Money data={cost.subtotalAmount} />
          ) : ('-')}
        </p>
      </div>
    </dl>
  );
}

function CartDiscounts({discountCodes}) {
  const codes = discountCodes?.filter((discount) => discount.applicable).map(({code}) => code) || [];

  return (
    <div className="px-4">
      {/* Existing discount codes */}
      {codes.length > 0 && (
        <div className="flex items-center justify-between">
          <p className="text-sm">Discount(s)</p>
          <div className="flex items-center gap-2">
            <code>{codes.join(', ')}</code>
            <CartForm
              route="/cart"
              action={CartForm.ACTIONS.DiscountCodesUpdate}
              inputs={{discountCodes: []}}
            >
              <button className="text-xs underline">Remove</button>
            </CartForm>
          </div>
        </div>
      )}

      {/* Discount code input */}
      <CartForm
        route="/cart"
        action={CartForm.ACTIONS.DiscountCodesUpdate}
        inputs={{discountCodes: codes}}
        className="flex gap-2 mt-2"
      >
        <input
          type="text"
          name="discountCode"
          placeholder="Discount code"
          className="flex-grow px-3 py-1 text-sm border rounded"
        />
        <button type="submit" className="px-4 py-1 text-sm text-white bg-gray-700 rounded">
          Apply
        </button>
      </CartForm>
    </div>
  );
}