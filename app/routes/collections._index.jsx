// app/routes/collections._index.jsx

import {json} from '@shopify/remix-oxygen';
import { useLoaderData } from 'react-router';
import {gql} from '@shopify/hydrogen';

// Import the CollectionCard component we already migrated
import {CollectionCard} from '~/components/cards/CollectionCard';
import {getImageLoadingPriority} from '~/lib/const';

// This is the server-side function that fetches the data.
export async function loader({context}) {
  const {storefront} = context;
  const {collections} = await storefront.query(COLLECTIONS_QUERY, {
    variables: {
      country: storefront.i18n.country,
      language: storefront.i18n.language,
    },
  });

  return json({collections});
}

// This function sets the SEO meta tags for the page.
export function meta() {
  return [
    {title: 'Collections'},
    {description: 'Browse all of our product collections.'},
  ];
}

export default function Collections() {
  const {collections} = useLoaderData();

  return (
    <div className="container py-8 md:py-12">
      <h1 className="mb-8 text-4xl font-bold text-center">Collections</h1>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {collections.nodes.map((collection, i) => (
          <CollectionCard
            key={collection.id}
            collection={collection}
            loading={getImageLoadingPriority(i, 3)}
          />
        ))}
      </div>
    </div>
  );
}

// The GraphQL query to fetch all collections.
const COLLECTIONS_QUERY = gql`
  query Collections(
    $country: CountryCode
    $language: LanguageCode
    $pageBy: Int = 20
  ) @inContext(country: $country, language: $language) {
    collections(first: $pageBy) {
      nodes {
        id
        title
        description
        handle
        image {
          id
          url
          width
          height
          altText
        }
      }
    }
  }
`;