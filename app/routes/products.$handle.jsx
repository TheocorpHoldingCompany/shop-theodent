// app/routes/products.$handle.jsx

import {defer} from '@shopify/remix-oxygen';
import { Await, useLoaderData } from 'react-router';
import {Suspense} from 'react';
// Removed gql import

import {
  Image,
  Money,
  flattenConnection,
} from '@shopify/hydrogen';
import {findSelectedVariant, useVariantUrl} from '~/lib/variants';

// Import all the product page components we've migrated
import {ProductGallery} from '~/components/product/ProductGallery';
import {ProductForm} from '~/components/product/ProductForm';
import {ProductAccordion} from '~/components/product/ProductAccordion';

/**
 * The `loader` function runs on the server to fetch the product data.
 */
export async function loader({params, request, context}) {
  const {handle} = params;
  const {storefront} = context;

  // Get the search params from the URL
  const searchParams = new URL(request.url).searchParams;

  const {product} = await storefront.query(PRODUCT_QUERY, {
    variables: {
      handle,
      country: storefront.i18n.country,
      language: storefront.i18n.language,
    },
  });

  if (!product?.id) {
    throw new Response(null, {status: 404});
  }

  // Find the selected variant based on the URL search params.
  const selectedVariant = findSelectedVariant(product.variants, searchParams);

  return defer({
    product,
    selectedVariant,
  });
}

/**
 * The `meta` function sets the SEO tags for the page.
 */
export function meta({data}) {
  const {product} = data;
  return [
    {title: product?.title ?? 'Product'},
    {description: product?.description},
    // You can add more meta tags here, like for Open Graph images
  ];
}

export default function Product() {
  const {product, selectedVariant} = useLoaderData();
  const {media, title, vendor, descriptionHtml} = product;

  // This client-side hook ensures the selected variant updates when the URL changes.
  const {selectedVariant: clientSelectedVariant} = useVariantUrl(
    product.handle,
    product.variants,
  );

  const finalSelectedVariant = clientSelectedVariant || selectedVariant;

  return (
    <div className="container py-8 md:py-12">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
        {/* Left Column: Product Gallery */}
        <div className="md:sticky top-24 h-max">
          <ProductGallery media={media.nodes} />
        </div>

        {/* Right Column: Product Details & Form */}
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold md:text-4xl">{title}</h1>
            <p className="text-lg text-gray-500">{vendor}</p>
          </div>

          <ProductForm
            product={{
              ...product,
              selectedVariant: finalSelectedVariant, // Pass the correct selected variant
            }}
          />

          <div
            className="prose"
            dangerouslySetInnerHTML={{__html: descriptionHtml}}
          />

          {/* Example of using the accordion for extra details */}
          <ProductAccordion title="Shipping & Returns" content="Details about shipping and returns go here." />
          <ProductAccordion title="Ingredients" content="Details about the ingredients go here." />
        </div>
      </div>
    </div>
  );
}

// Converted from gql template to template literal and fixed Media query
const PRODUCT_QUERY = `#graphql
  query Product(
    $country: CountryCode
    $language: LanguageCode
    $handle: String!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      id
      title
      vendor
      handle
      descriptionHtml
      options {
        name
        values
      }
      media(first: 20) {
        nodes {
          id
          mediaContentType
          ... on MediaImage {
            image {
              id
              url
              altText
              width
              height
            }
          }
        }
      }
      variants(first: 100) {
        nodes {
          id
          availableForSale
          selectedOptions {
            name
            value
          }
          price {
            amount
            currencyCode
          }
          compareAtPrice {
            amount
            currencyCode
          }
          sku
          title
          unitPrice {
            amount
            currencyCode
          }
        }
      }
      seo {
        description
        title
      }
    }
  }
`;