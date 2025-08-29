// app/routes/_index.jsx
import {gql} from '@shopify/hydrogen';
import {defer} from '@shopify/remix-oxygen';
import {Await, useLoaderData, Link} from 'react-router'; // Changed from '@remix-run/react'
import {Suspense} from 'react';
import {Image} from '@shopify/hydrogen';
import {PRODUCT_CARD_FRAGMENT} from '~/lib/fragments';
import {ARTICLE_FRAGMENT} from '~/lib/fragments'; // We will create this fragment

// Import the components
import {ProductCard} from '~/components/cards/ProductCard';
import {Hero} from '~/components/sections/Hero';
import {VideoSection} from '~/components/sections/VideoSection';
import {Compare} from '~/components/sections/Compare';
import {FeaturedBlogs} from '~/components/sections/FeaturedBlogs';
import {IconBar} from '~/components/sections/IconBar';
import {FDAAnnouncementPopup} from '~/components/global/FDAAnnouncementPopup';

export async function loader({context}) {
  const {storefront} = context;
  const {shop} = await storefront.query(HOMEPAGE_SEO_QUERY);

  // Defer loading of the main content for faster initial page loads
  const homepage = storefront.query(HOMEPAGE_CONTENT_QUERY, {
    variables: {
      country: storefront.i18n.country,
      language: storefront.i18n.language,
      blogHandle: 'news-1', // Your blog handle
    },
  });

  return defer({
    shop,
    homepage,
  });
}

export function meta({data}) {
  return [
    {title: data.shop.name},
    {description: data.shop.description},
  ];
}

export default function Homepage() {
  const {shop, homepage} = useLoaderData();

  return (
    <>
      <Hero />
      <VideoSection />
      <Suspense>
        <Await resolve={homepage}>
          {({featuredProducts, articles}) => (
            <>
              <FeaturedProducts products={featuredProducts.nodes} />
              <HomepageInfoSections />
              <Compare />
              <FeaturedBlogs articles={articles.nodes} />
            </>
          )}
        </Await>
      </Suspense>
      <IconBar />
      <FDAAnnouncementPopup />

      {/* Structured Data (JSON-LD) for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Theodent',
            url: 'https://shoptheodent.com',
            logo: 'https://shoptheodent.com/imgs/theodent-logo.png',
          }),
        }}
      />
    </>
  );
}

function FeaturedProducts({products}) {
  return (
    <div className="py-12 px-4">
      <h2 className="text-3xl font-bold text-center mb-8">Featured Products</h2>
      <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

function HomepageInfoSections() {
  return (
    <div className="overflow-x-hidden text-[#2A1B16] py-12">
      {/* Section 1 */}
      <div className="flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2">
          <Image
            src="/imgs/greenHome1.png"
            alt="Theodent fluoride-free toothpaste with Rennou technology"
            className="object-cover w-full h-full max-h-[660px]"
            width={800}
            height={800}
          />
        </div>
        <div className="w-full md:w-1/2 p-8 flex justify-center">
          <div className="max-w-md">
            <h2 className="text-3xl font-bold theo-h1 theo-info-h1">
              What Makes Theodent the #1 Fluoride Alternative?
            </h2>
            <p className="mt-3 mb-4 theo-h3">
              Theodent is a breakthrough in fluoride-free oral care. Our patented Rennou™ technology harnesses cacao to remineralize tooth enamel safely and effectively.
            </p>
            <Link to="/pages/technology" className="theo-btn">
              Learn More About the Technology
            </Link>
          </div>
        </div>
      </div>

      {/* Section 2 */}
      <div className="flex flex-col md:flex-row-reverse items-center">
        <div className="w-full md:w-1/2">
          <Image
            src="/imgs/greenHome2.webp"
            alt="Premium ingredients in Theodent cacao-based toothpaste"
            className="object-cover w-full h-full max-h-[660px]"
            width={800}
            height={800}
          />
        </div>
        <div className="w-full md:w-1/2 p-8 flex justify-center">
          <div className="max-w-md text-left md:text-right">
            <h2 className="text-3xl font-bold theo-h1 theo-info-h1">
              Committed to Premium Ingredients
            </h2>
            <p className="mt-3 mb-4 theo-h3">
              We use only the finest ingredients in our fluoride-free formulations, ensuring safety and effectiveness for your entire family.
            </p>
            <Link to="/pages/ingredients" className="theo-btn">
              Explore Our Ingredients
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// GraphQL queries that you'll need
const HOMEPAGE_SEO_QUERY = `#graphql
  query HomePageSeoQuery {
    shop {
      name
      description
    }
  }
`;

const HOMEPAGE_CONTENT_QUERY = `#graphql
  query HomePageContentQuery($country: CountryCode, $language: LanguageCode, $blogHandle: String!) 
  @inContext(country: $country, language: $language) {
    featuredProducts: products(first: 8, query: "tag:featured") {
      nodes {
        ...ProductCard
      }
    }
    articles: blog(handle: $blogHandle) {
      articles(first: 3) {
        nodes {
          ...Article
        }
      }
    }
  }
  ${PRODUCT_CARD_FRAGMENT}
  ${ARTICLE_FRAGMENT}
`;