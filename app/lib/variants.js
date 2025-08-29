// app/lib/variants.js

import { useLocation, useSearchParams } from 'react-router';
import {useMemo} from 'react';

/**
 * A utility function to find the selected variant from a product's variants based on URL search params.
 * @param {Product['variants']} variants - The variants for a product.
 * @param {URLSearchParams} searchParams - The search params from the URL.
 * @returns {ProductVariant | undefined} The selected variant or the first available variant.
 */
export function findSelectedVariant(variants, searchParams) {
  // Find the variant where all selected options match the search params.
  const selected = variants.nodes.find((variant) =>
    variant.selectedOptions.every((option) => {
      const valueInParams = searchParams.get(option.name.toLowerCase());
      return valueInParams === option.value.toLowerCase();
    }),
  );

  // If no variant matches, return the first available variant.
  return selected || variants.nodes.find((variant) => variant.availableForSale);
}

/**
 * A client-side hook that reads the URL and returns the selected variant.
 * @param {Product['variants']} variants
 * @returns {{
 * selectedVariant: ProductVariant | undefined;
 * getVariantUrl: (name: string, value: string) => string;
 * }}
 */
export function useVariantUrl(productHandle, variants) {
  const {pathname} = useLocation();
  const [searchParams] = useSearchParams();

  const selectedVariant = useMemo(
    () => findSelectedVariant(variants, searchParams),
    [variants, searchParams],
  );

  const getVariantUrl = (name, value) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(name.toLowerCase(), value.toLowerCase());
    return `${pathname}?${newParams.toString()}`;
  };

  return {selectedVariant, getVariantUrl};
}