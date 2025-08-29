// app/components/cards/OrderCard.jsx

"use client";

import { Link } from 'react-router';
import {Image, flattenConnection} from '@shopify/hydrogen-react';

// NOTE: You will need to migrate these local components and utilities.
import {Heading, Text} from '~/components/elements';
import {statusMessage} from '~/lib/utils';

export function OrderCard({order}) {
  if (!order?.id) return null;

  // The GID is formatted as `gid://shopify/Order/123456789?key=...`
  // We need to extract the raw ID `123456789` for the URL.
  const legacyOrderId = order.id.split('/').pop().split('?')[0];
  const lineItems = flattenConnection(order?.lineItems);

  if (!lineItems?.length) return null;

  const {image, title} = lineItems[0];

  return (
    <li className="grid text-center border rounded">
      <Link
        className="grid items-center gap-4 p-4 md:gap-6 md:p-6 md:grid-cols-2"
        to={`/account/orders/${legacyOrderId}`}
        prefetch="intent"
      >
        {image && (
          <div className="card-image aspect-square bg-primary/5">
            <Image
              width={168}
              height={168}
              data={image}
              alt={image.altText ?? 'Product image'}
              className="w-full fadeIn cover"
              loaderOptions={{scale: 2, crop: 'center'}}
            />
          </div>
        )}
        <div
          className={`flex-col justify-center text-left ${
            !image && 'md:col-span-2'
          }`}
        >
          <Heading as="h3" format size="copy">
            {lineItems.length > 1
              ? `${title} +${lineItems.length - 1} more`
              : title}
          </Heading>
          <dl className="grid grid-gap-1">
            <dt className="sr-only">Order ID</dt>
            <dd>
              <Text size="fine" color="subtle">
                Order No. {order.orderNumber}
              </Text>
            </dd>
            <dt className="sr-only">Order Date</dt>
            <dd>
              <Text size="fine" color="subtle">
                {new Date(order.processedAt).toDateString()}
              </Text>
            </dd>
            <dt className="sr-only">Fulfillment Status</dt>
            <dd className="mt-2">
              <span
                className={`px-3 py-1 text-xs font-medium rounded-full ${
                  order.fulfillmentStatus === 'FULFILLED'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-primary/5 text-primary/50'
                }`}
              >
                <Text size="fine">
                  {statusMessage(order.fulfillmentStatus)}
                </Text>
              </span>
            </dd>
          </dl>
        </div>
      </Link>
      <div className="self-end border-t">
        <Link
          className="block w-full p-2 text-center"
          to={`/account/orders/${legacyOrderId}`}
          prefetch="intent"
        >
          <Text color="subtle" className="ml-3">
            View Details
          </Text>
        </Link>
      </div>
    </li>
  );
}