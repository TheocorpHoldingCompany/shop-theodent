// app/components/product/ProductGrid.jsx

"use client";

import {useState, useRef, useEffect, useCallback} from 'react';
import { Link } from 'react-router';
import {flattenConnection} from '@shopify/hydrogen-react';

import {Button} from '~/components/elements/Button'; // Assuming you create a Button component
import {ProductCard} from '~/components/cards/ProductCard';
import {getImageLoadingPriority} from '~/lib/const';

export function ProductGrid({url, collection, all}) {
  const nextButtonRef = useRef(null);
  const initialProducts = collection?.products?.nodes || [];
  const {hasNextPage, endCursor} = collection?.products?.pageInfo ?? {};

  const [products, setProducts] = useState(initialProducts);
  const [cursor, setCursor] = useState(endCursor ?? '');
  const [nextPage, setNextPage] = useState(hasNextPage);
  const [isPending, setIsPending] = useState(false);

  const haveProducts = initialProducts.length > 0;

  // This function fetches the next page of products from the server.
  const fetchProducts = useCallback(async () => {
    setIsPending(true);
    const postUrl = new URL(window.location.origin + url);
    postUrl.searchParams.set('cursor', cursor);

    const response = await fetch(postUrl, {
      method: 'POST',
    });
    const {data} = await response.json();

    const newProducts = flattenConnection(
      data?.collection?.products || data?.products || [],
    );
    const pageInfo = data?.collection?.products?.pageInfo ||
      data?.products?.pageInfo || {endCursor: '', hasNextPage: false};

    setProducts([...products, ...newProducts]);
    setCursor(pageInfo.endCursor);
    setNextPage(pageInfo.hasNextPage);
    setIsPending(false);
  }, [cursor, url, products]);

  // This effect sets up an IntersectionObserver to watch for when the
  // "Load More" button becomes visible on the screen, triggering the next fetch.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            fetchProducts();
          }
        });
      },
      {
        rootMargin: '120%', // Pre-load products before the user reaches the exact bottom
      },
    );

    const nextButton = nextButtonRef.current;

    if (nextButton) {
      observer.observe(nextButton);
    }

    return () => {
      if (nextButton) {
        observer.unobserve(nextButton);
      }
    };
  }, [nextButtonRef, cursor, fetchProducts]);

  if (!haveProducts) {
    return (
      <>
        <p>No products found in this collection.</p>
        <Link to="/products" className="underline">
          Browse All Products
        </Link>
      </>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-y-10 gap-x-6 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product, i) => (
          <ProductCard
            key={product.id}
            product={product}
            loading={getImageLoadingPriority(i)}
            all={all}
          />
        ))}
      </div>

      {nextPage && (
        <div className="flex items-center justify-center mt-10">
          <Button
            ref={nextButtonRef}
            disabled={isPending}
            onClick={fetchProducts}
            variant="secondary"
          >
            {isPending ? 'Loading...' : 'Load More Products'}
          </Button>
        </div>
      )}
    </>
  );
}