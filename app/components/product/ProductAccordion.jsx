// app/components/product/ProductAccordion.jsx

"use client";

import {useState} from 'react';
import {Disclosure} from '@headlessui/react';
import {BsX} from 'react-icons/bs';
import {Text} from '~/components/elements/Text'; // Assuming Text component exists

/**
 * A collapsible accordion component for displaying product details.
 */
export function ProductAccordion({title, content}) {
  return (
    <Disclosure as="div" className="w-full grid">
      {({open}) => (
        <>
          <Disclosure.Button className="text-left">
            <div className="flex justify-between py-4 border-t-2 border-[#CC8A51]">
              <Text as="h4" size="lead" className="text-[#2A1B16]">
                {title}
              </Text>
              <BsX
                size={24}
                className={`text-[#2A1B16] transform-gpu transition-transform duration-200 ${
                  open ? '' : 'rotate-45'
                }`}
              />
            </div>
          </Disclosure.Button>

          <Disclosure.Panel className="pb-4 text-[#2A1B16]">
            {content}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

/**
 * A custom accordion list, primarily used for the mobile navigation menu.
 */
export function MobileMenuAccordion({items}) {
  const [openId, setOpenId] = useState(null);

  const handleClick = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="mt-4">
      {items.map(({id, buttonText, panelText}) => {
        const isOpen = openId === id;
        return (
          <div key={id}>
            <div className="w-full h-px bg-[#CC8A51]" />
            <button
              className="flex items-center justify-between w-full h-16"
              onClick={() => handleClick(id)}
              aria-expanded={isOpen}
            >
              <Text as="h4" size="lead" className="text-[#2A1B16]">
                {buttonText}
              </Text>
              <BsX
                size={24}
                className={`text-[#2A1B16] transform-gpu transition-transform duration-200 ${
                  isOpen ? '' : 'rotate-45'
                }`}
              />
            </button>
            {isOpen && (
              <div className="px-4 pt-2 pb-4 text-sm text-gray-700">
                {panelText}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}