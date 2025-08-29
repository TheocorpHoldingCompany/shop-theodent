// app/components/cards/ArticleCard.jsx

import { Link } from 'react-router';
import {Image} from '@shopify/hydrogen';

export function ArticleCard({blogHandle, article, loading}) {
  // Format the date for a cleaner look, e.g., "August 29, 2025"
  const publishedDate = new Date(article.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div key={article.id}>
      <Link
        to={`/${blogHandle}/${article.handle}`}
        className="grid gap-2 no-underline group"
      >
        {article.image && (
          <div className="overflow-hidden rounded-lg aspect-[3/2]">
            <Image
              alt={article.image.altText || article.title}
              data={article.image}
              loading={loading}
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-105"
              loaderOptions={{
                scale: 2,
                crop: 'center',
              }}
            />
          </div>
        )}
        <h3 className="text-2xl font-light leading-tight text-[#2A1B16] theo-h2">
          {article.title}
        </h3>
        <div className="flex flex-col">
          <span className="font-semibold uppercase text-[#2A1B16]">
            {publishedDate}
          </span>
          {article.readtime?.value && (
            <span className="font-semibold uppercase text-[#C9AA77]">
              {article.readtime.value}
            </span>
          )}
        </div>
      </Link>
    </div>
  );
}