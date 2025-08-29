// app/components/cards/CollectionCard.jsx

import { Link } from 'react-router';
import {Image} from '@shopify/hydrogen';

// Note: You will need to migrate your Heading component for this to display correctly.
import {Heading} from '~/components/elements/Heading';

export function CollectionCard({collection, loading}) {
  return (
    <Link to={`/collections/${collection.handle}`} className="grid gap-4 group">
      <div className="card-image overflow-hidden rounded-lg bg-primary/5 aspect-[3/2]">
        {collection?.image && (
          <Image
            alt={`Image of ${collection.title}`}
            data={collection.image}
            sizes="(max-width: 32em) 100vw, 33vw"
            className="object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-105"
            loaderOptions={{
              scale: 2,
              crop: 'center',
            }}
          />
        )}
      </div>
      <Heading as="h3" size="copy" className="text-center">
        {collection.title}
      </Heading>
    </Link>
  );
}