// app/routes/blogs.$blogHandle._index.jsx

import {json} from '@shopify/remix-oxygen';
import { useLoaderData } from 'react-router';
import {ARTICLE_FRAGMENT} from '~/lib/fragments';
import {gql} from '@shopify/hydrogen';

import {ArticleCard} from '~/components/cards/ArticleCard';
import {getImageLoadingPriority} from '~/lib/const';
// import {IconBar} from '~/components/sections/IconBar';
// import {PageHeader} from '~/components/sections/PageHeader';

export async function loader({params, context}) {
  const {blogHandle} = params;
  const {storefront} = context;

  const {blog} = await storefront.query(BLOG_ARTICLES_QUERY, {
    variables: {
      blogHandle,
      pageBy: 20, // You can adjust the number of articles per page
      country: storefront.i18n.country,
      language: storefront.i18n.language,
    },
  });

  if (!blog?.articles) {
    throw new Response(null, {status: 404});
  }

  return json({blog});
}

export function meta({data}) {
  const {blog} = data;
  return [
    {title: blog?.title ?? 'Blog'},
    {description: blog?.seo?.description},
  ];
}

export default function Blog() {
  const {blog} = useLoaderData();
  const {articles} = blog;

  return (
    <>
      {/* <PageHeader title={blog.title} /> */}
      <h1 className="text-4xl font-bold text-center my-8">{blog.title}</h1>
      <div className="container py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articles.nodes.map((article, i) => (
            <ArticleCard
              key={article.id}
              blogHandle={blog.handle}
              article={article}
              loading={getImageLoadingPriority(i, 3)}
            />
          ))}
        </div>
      </div>
      {/* <IconBar /> */}
    </>
  );
}

const BLOG_ARTICLES_QUERY = gql`
  ${ARTICLE_FRAGMENT}
  query BlogArticlesQuery(
    $language: LanguageCode
    $blogHandle: String!
    $pageBy: Int!
    $cursor: String
  ) @inContext(language: $language) {
    blog(handle: $blogHandle) {
      title
      handle
      seo {
        title
        description
      }
      articles(first: $pageBy, after: $cursor) {
        nodes {
          ...Article
        }
      }
    }
  }
`;