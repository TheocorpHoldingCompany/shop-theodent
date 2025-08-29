// app/components/cart/CartDrawer.jsx

"use client";

import {Drawer} from '~/components/elements/Drawer';
import {CartDetails} from './CartDetails';

export function CartDrawer({isOpen, onClose, alert}) {
  return (
    <Drawer
      open={isOpen}
      onClose={onClose}
      alert={alert}
      openFrom="right"
    >
      {/* Background Images */}
      <img
        alt=""
        src="/imgs/cart1.png"
        className="absolute top-0 left-0 object-cover w-full -z-10"
      />
      <img
        alt=""
        src="/imgs/cart2.png"
        className="absolute bottom-0 left-0 object-cover w-full -z-10"
      />

      {/* Renders the cart's contents */}
      <CartDetails layout="drawer" onClose={onClose} />
    </Drawer>
  );
}