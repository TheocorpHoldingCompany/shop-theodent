// app/components/global/Header.jsx

"use client";

import { Link, useLocation } from 'react-router';
import {useCart} from '@shopify/hydrogen';
import {useWindowScroll} from 'react-use';
import {Twirl as Hamburger} from 'hamburger-react';
import {useState, useEffect} from 'react';

import {CartDrawer} from '~/components/cart/CartDrawer';
import {HeaderDropdown} from './HeaderDropdown';
import {CartIcon, CartIconFill} from '~/assets/cartIcon';

export function Header() {
  const {pathname} = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsCartOpen(false);
  }, [pathname]);

  return (
    <>
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <div className="fixed top-0 left-0 z-50 w-full lg:sticky">
        <DesktopHeader
          showAlert={showAlert}
          isCartOpen={isCartOpen}
          setIsCartOpen={setIsCartOpen}
        />
        <MobileHeader
          showAlert={showAlert}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          isCartOpen={isCartOpen}
          setIsCartOpen={setIsCartOpen}
        />
      </div>
      {/* Spacer for the fixed mobile header */}
      <div className="h-[120px] lg:hidden" />
    </>
  );
}

// ... (Rest of the desktop, mobile, and sub-components for the header)

function DesktopHeader({showAlert, isCartOpen, setIsCartOpen}) {
  const [activeDropdown, setActiveDropdown] = useState('');

  return (
    <header className="hidden lg:block bg-primary text-contrast">
      {showAlert && <ShippingMessageBar />}
      <div className="container flex items-center justify-between h-[120px]">
        <nav className="flex items-center justify-start h-full">
          <Link to="/" className="mr-8">
            <img alt="Theodent logo" src="/imgs/theodent-logo.png" className="w-60" />
          </Link>
          <div
            className="header-btn relative"
            onMouseEnter={() => setActiveDropdown('shop')}
            onMouseLeave={() => setActiveDropdown('')}
          >
            <Link to="/products">SHOP</Link>
            <HeaderDropdown btn="shop" show={activeDropdown === 'shop'} />
          </div>
          {/* Add other nav links here */}
        </nav>
        <div className="flex items-center">
          <CartBtn isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
        </div>
      </div>
    </header>
  );
}

function MobileHeader({showAlert, isMenuOpen, setIsMenuOpen, isCartOpen, setIsCartOpen}) {
  return (
    <header className="block lg:hidden bg-primary text-contrast">
      {showAlert && <ShippingMessageBar />}
      <div className="container flex items-center justify-between h-[120px]">
        <Hamburger toggled={isMenuOpen} toggle={setIsMenuOpen} size={22} />
        <Link to="/">
          <img alt="Theodent logo" src="/imgs/theodent-logo.png" className="w-56" />
        </Link>
        <CartBtn isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
      </div>
    </header>
  );
}

function CartBtn({isCartOpen, setIsCartOpen}) {
  const {totalQuantity} = useCart();
  return (
    <button
      onClick={() => setIsCartOpen(!isCartOpen)}
      className="flex items-center justify-center w-12 h-12"
    >
      <div className="relative">
        {totalQuantity > 0 ? <CartIconFill /> : <CartIcon />}
        {totalQuantity > 0 && (
          <div className="absolute left-1/2 bottom-0 -translate-x-1/2 text-sm font-semibold">
            {totalQuantity}
          </div>
        )}
      </div>
    </button>
  );
}

function ShippingMessageBar() {
  const {cost} = useCart();
  // ... shipping message logic ...
  return (
    <div className="flex items-center justify-center h-[45px] w-full bg-contrast text-primary px-3 text-center text-sm">
      Free shipping on orders $100+
    </div>
  );
}