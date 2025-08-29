// app/components/sections/IconBar.jsx

import {Image} from '@shopify/hydrogen';

const icons = [
  {src: '/imgs/icon1.webp', alt: 'Icon 1'},
  {src: '/imgs/icon2.webp', alt: 'Icon 2'},
  {src: '/imgs/icon3.webp', alt: 'Icon 3'},
  {src: '/imgs/icon4.webp', alt: 'Icon 4'},
  {src: '/imgs/icon5.webp', alt: 'Icon 5'},
];

export function IconBar({border = true}) {
  return (
    <div className="container py-12 md:py-20">
      {border && <div className="w-full h-[1.5px] bg-accent" />}
      <div className="flex flex-wrap items-center justify-center gap-6 pt-10 md:gap-12 md:pt-16">
        {icons.map((icon) => (
          <Image
            key={icon.src}
            src={icon.src}
            alt={icon.alt}
            width={100}
            height={100}
            className="w-20 h-20 md:w-24 md:h-24"
          />
        ))}
      </div>
    </div>
  );
}