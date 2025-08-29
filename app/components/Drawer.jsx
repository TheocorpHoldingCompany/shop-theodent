// app/components/Drawer.jsx

"use client";

import {Fragment, useState} from 'react';
import {Dialog, Transition} from '@headlessui/react';
import {useWindowSize} from 'react-use';

// NOTE: You will need to migrate your 'IconClose' component for the close button to appear.
import {IconClose} from '~/components/elements/IconClose';

/**
 * A client component that defines a slide-out drawer panel.
 * @param open - boolean state to control if the drawer is open.
 * @param onClose - function to set the open state to false.
 * @param openFrom - 'right' or 'left'.
 * @param children - React children to be rendered inside the drawer.
 * @param alert - boolean to account for the height of an alert banner.
 */
export function Drawer({open, onClose, openFrom = 'right', children, alert = false}) {
  const {width} = useWindowSize();
  const alertSizing = width < 992 ? 165 : 165;
  const sizing = alert
    ? {height: `calc(100vh - ${alertSizing}px)`, top: alertSizing}
    : {height: 'calc(100vh - 120px)', top: 120};

  const offScreen = {
    right: 'translate-x-full',
    left: '-translate-x-full',
  };

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        {/* Drawer Panel */}
        <div className="fixed inset-0">
          <div className="absolute inset-0 overflow-hidden">
            <div
              style={{zIndex: 101, ...sizing}}
              className={`fixed flex max-w-full ${
                openFrom === 'right' ? 'right-0' : 'left-0'
              }`}
            >
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-300"
                enterFrom={offScreen[openFrom]}
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-300"
                leaveFrom="translate-x-0"
                leaveTo={offScreen[openFrom]}
              >
                <Dialog.Panel className="w-screen max-w-lg text-left align-middle transition-all transform bg-[#fefcf3] shadow-xl overflow-y-auto">
                  <div className="relative flex flex-col h-full">
                    <header className="sticky top-0 flex items-center justify-between px-6 py-4 border-b">
                      {/* You can pass a `heading` prop to display a title here if needed */}
                      <div className="flex-1"></div>
                      <button
                        type="button"
                        className="p-2 transition -m-2 hover:opacity-80"
                        onClick={onClose}
                      >
                        <IconClose aria-label="Close panel" />
                      </button>
                    </header>
                    <div className="flex-1 px-6 py-8">
                      {children}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

// A utility hook to easily manage the drawer's open/close state
export function useDrawer(openDefault = false) {
  const [isOpen, setIsOpen] = useState(openDefault);

  function openDrawer() {
    setIsOpen(true);
  }

  function closeDrawer() {
    setIsOpen(false);
  }

  return {
    isOpen,
    openDrawer,
    closeDrawer,
  };
}