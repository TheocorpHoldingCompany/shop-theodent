// app/routes/collections.$handle.jsx

import {json, defer} from '@shopify/remix-oxygen';
import { useLoaderData } from 'react-router';
import {gql} from '@shopify/hydrogen';

import {PRODUCT_CARD_FRAGMENT} from '~/lib/fragments';
import {ProductGrid} from '~/components/product/ProductGrid';

// This is the server-side function that fetches the data for the collection.
export async function loader({params, request, context}) {
  const {handle} = params;
  const {storefront} = context;

  // The `new URL(request.url)` gets the pagination cursor from the URL search params.
  const searchParams = new URL(request.url).searchParams;
  const cursor = searchParams.get('cursor');

  const {collection} = await storefront.query(COLLECTION_QUERY, {
    variables: {
      handle,
      cursor,
      country: storefront.i18n.country,
      language: storefront.i18n.language,
    },
  });

  // Handle 404s
  if (!collection) {
    throw new Response(null, {status: 404});
  }

  // When a user scrolls and the `ProductGrid` fetches more products,
  // this loader will be called again, but as a POST request.
  // We handle that here and return only the data needed for the grid.
  if (request.method === 'POST') {
    return json({collection});
  }

  return defer({collection});
}

// This function sets the SEO meta tags for the page.
export function meta({data}) {
  const {collection} = data;
  return [
    {title: collection?.title ?? 'Collection'},
    {description: collection?.description},
  ];
}

export default function Collection() {
  const {collection} = useLoaderData();

  return (
    <div className="container py-8 md:py-12">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold">{collection.title}</h1>
        {collection.description && (
          <p className="max-w-2xl mx-auto mt-4 text-lg text-gray-600">
            {collection.description}
          </p>
        )}
      </div>
      <ProductGrid
        key={collection.id}
        collection={collection}
        url={`/collections/${collection.handle}`}
      />
    </div>
  );
}

// The GraphQL query to fetch a collection and its products.
// It includes pagination for infinite scroll.
const COLLECTION_QUERY = gql`
  ${PRODUCT_CARD_FRAGMENT}
  query CollectionDetails(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
    $pageBy: Int = 24
    $cursor: String
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      id
      title
      description
      handle
      seo {
        description
        title
      }
      image {
        id
        url
        width
        height
        altText
      }
      products(first: $pageBy, after: $cursor) {
        nodes {
          ...ProductCard
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`;