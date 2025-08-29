// app/routes/pages.$handle.jsx

import {json} from '@shopify/remix-oxygen';
import { useLoaderData } from 'react-router';
import {useEffect} from 'react';
import {gql} from '@shopify/hydrogen';

// Import our special components
import {ClinicalForm} from '~/components/forms/ClinicalForm';
import {WholesaleForm} from '~/components/forms/WholesaleForm';
import {StoreLocator} from '~/components/sections/StoreLocator';

export async function loader({params, context}) {
  const {handle} = params;
  const {storefront} = context;

  const {page} = await storefront.query(PAGE_QUERY, {
    variables: {handle},
  });

  if (!page) {
    throw new Response(null, {status: 404});
  }

  return json({page});
}

export function meta({data}) {
  const {page} = data;
  return [
    {title: page?.seo?.title ?? page?.title ?? 'Page'},
    {description: page?.seo?.description ?? page?.bodySummary},
  ];
}

export default function Page() {
  const {page} = useLoaderData();

  // A component to render the appropriate content based on the page handle
  function PageContent({page}) {
    switch (page.handle) {
      case 'clinical-information':
        return <ClinicalForm />;
      case 'wholesale':
        return <WholesaleForm />;
      case 'store-locator':
        return <StoreLocator />;
      default:
        // For all other pages, render the content from the Shopify Admin
        return (
          <div
            dangerouslySetInnerHTML={{__html: page.body}}
            className="prose max-w-none"
          />
        );
    }
  }

  return (
    <div className="container py-8 md:py-12">
      <h1 className="mb-8 text-4xl font-bold text-center">{page.title}</h1>
      <div className="max-w-4xl mx-auto">
        <PageContent page={page} />
      </div>
    </div>
  );
}

const PAGE_QUERY = gql`
  query Page($handle: String!) {
    page(handle: $handle) {
      id
      title
      handle
      body
      bodySummary
      seo {
        description
        title
      }
    }
  }
`;