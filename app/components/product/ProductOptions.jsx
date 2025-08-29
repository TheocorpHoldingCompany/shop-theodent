// app/components/product/ProductOptions.jsx

import { Link, useSearchParams } from 'react-router';

export function ProductOptions({options, getVariantUrl}) {
  const [searchParams] = useSearchParams();

  return (
    <div className="grid gap-4">
      {options.map((option) => {
        if (!option.values.length) {
          return null;
        }

        const currentOptionVal = searchParams.get(option.name.toLowerCase());

        return (
          <div key={option.name} className="flex flex-col flex-wrap gap-y-2">
            <h3 className="font-semibold">{option.name}</h3>
            <div className="flex flex-wrap items-center gap-4">
              {option.values.map((value) => {
                const isSelected = currentOptionVal === value.toLowerCase();

                // Use the helper function to generate the correct URL
                const to = getVariantUrl(option.name, value);

                return (
                  <Link
                    key={value}
                    to={to}
                    preventScrollReset
                    replace
                    className={`px-4 py-2 border rounded-full transition-colors duration-200 ${
                      isSelected
                        ? 'bg-[#2A1B16] border-[#2A1B16] text-white'
                        : 'bg-white border-gray-300 text-black hover:bg-gray-100'
                    }`}
                  >
                    {value}
                  </Link>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}