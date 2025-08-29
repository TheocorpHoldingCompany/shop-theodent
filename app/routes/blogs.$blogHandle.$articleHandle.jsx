// app/routes/blogs.$blogHandle.$articleHandle.jsx

import {json} from '@shopify/remix-oxygen';
import { useLoaderData, Link } from 'react-router';
import {Image} from '@shopify/hydrogen';
// Removed gql import

// import {IconBar} from '~/components/sections/IconBar';

export async function loader({params, context}) {
  const {blogHandle, articleHandle} = params;
  const {storefront} = context;

  const {blog} = await storefront.query(SINGLE_ARTICLE_QUERY, {
    variables: {
      blogHandle,
      articleHandle,
      language: storefront.i18n.language,
    },
  });

  if (!blog?.articleByHandle) {
    throw new Response(null, {status: 404});
  }

  const article = blog.articleByHandle;
  return json({article});
}

export function meta({data}) {
  const {article} = data;
  return [
    {title: article?.seo?.title ?? article?.title},
    {description: article?.seo?.description ?? article?.excerpt},
  ];
}

export default function Article() {
  const {article} = useLoaderData();
  const {title, image, contentHtml, publishedAt, author, excerpt} = article;

  const publishedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(publishedAt));

  return (
    <>
      {image && (
        <Image
          data={image}
          className="object-cover w-full h-96"
          sizes="100vw"
          alt={title}
        />
      )}
      <div className="container py-8 md:py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl font-bold">{title}</h1>
            <p className="mt-2 text-sm text-gray-500">
              {publishedDate} &middot; {author.name}
            </p>
          </div>

          {excerpt && <p className="mt-8 text-xl italic">{excerpt}</p>}

          <div
            dangerouslySetInnerHTML={{__html: contentHtml}}
            className="py-8 prose max-w-none"
          />

          <div className="py-8 border-t border-b">
            <h2 className="mb-3 text-2xl font-bold">
              Ready to boost your health now?
            </h2>
            <Link to="/products" className="theo-btn">
              SHOP FOR THEODENT
            </Link>
          </div>
          {/* <IconBar border={false} /> */}
        </div>
      </div>
    </>
  );
}

// Converted from gql template to template literal
const SINGLE_ARTICLE_QUERY = `#graphql
  query Article(
    $language: LanguageCode
    $blogHandle: String!
    $articleHandle: String!
  ) @inContext(language: $language) {
    blog(handle: $blogHandle) {
      articleByHandle(handle: $articleHandle) {
        id
        title
        contentHtml
        excerpt
        publishedAt
        author: authorV2 {
          name
        }
        image {
          id
          altText
          url
          width
          height
        }
        seo {
          description
          title
        }
      }
    }
  }
`;