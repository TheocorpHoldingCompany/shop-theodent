// app/routes/account._index.jsx

import {json, redirect} from '@shopify/remix-oxygen';
import { useLoaderData, Link } from 'react-router';
import {flattenConnection} from '@shopify/hydrogen-react';
import {gql} from '@shopify/hydrogen';

// Import the OrderCard we migrated earlier
import {OrderCard} from '~/components/cards/OrderCard';

export async function loader({context}) {
  const {session, storefront} = context;
  const customerAccessToken = await session.get('customerAccessToken');

  if (!customerAccessToken) {
    return redirect('/account/login');
  }

  const {customer} = await storefront.query(CUSTOMER_QUERY, {
    variables: {
      customerAccessToken: customerAccessToken.accessToken,
      country: storefront.i18n.country,
      language: storefront.i18n.language,
    },
    cache: storefront.CacheNone(),
  });

  if (!customer) {
    session.unset('customerAccessToken');
    return redirect('/account/login', {
      headers: {'Set-Cookie': await session.commit()},
    });
  }

  return json({customer});
}

export function meta() {
  return [{title: 'My Account'}];
}

export default function Account() {
  const {customer} = useLoaderData();
  const orders = flattenConnection(customer.orders);

  const heading = customer.firstName
    ? `Welcome, ${customer.firstName}`
    : 'Welcome to your account.';

  return (
    <div className="container py-8 md:py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">{heading}</h1>
        <Link to="/account/logout" prefetch="intent" className="underline">
          Sign out
        </Link>
      </div>
      {orders?.length > 0 ? (
        <AccountOrderHistory orders={orders} />
      ) : (
        <EmptyOrders />
      )}
      <AccountDetails customer={customer} />
    </div>
  );
}

function AccountOrderHistory({orders}) {
  return (
    <div>
      <h2 className="text-2xl font-semibold">Order History</h2>
      <ul className="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2">
        {orders.map((order) => (
          <OrderCard order={order} key={order.id} />
        ))}
      </ul>
    </div>
  );
}

function EmptyOrders() {
  return (
    <div>
      <p>You haven't placed any orders yet.</p>
      <Link to="/collections/all" className="mt-2 inline-block theo-btn">
        Start Shopping
      </Link>
    </div>
  );
}

function AccountDetails({customer}) {
  const {firstName, lastName, email, phone} = customer;
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-semibold">Account Details</h2>
      <div className="p-6 mt-6 border rounded">
        <div className="space-y-4">
          <p><strong>Name:</strong> {firstName || ''} {lastName || ''}</p>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Phone:</strong> {phone || 'Not provided'}</p>
        </div>
      </div>
    </div>
  );
}

const CUSTOMER_QUERY = gql`
  query CustomerDetails(
    $customerAccessToken: String!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    customer(customerAccessToken: $customerAccessToken) {
      id
      firstName
      lastName
      phone
      email
      orders(first: 250, sortKey: PROCESSED_AT, reverse: true) {
        nodes {
          id
          orderNumber
          processedAt
          financialStatus
          fulfillmentStatus
          totalPrice {
            amount
            currencyCode
          }
          lineItems(first: 2) {
            nodes {
              variant {
                image {
                  url
                  altText
                  height
                  width
                }
              }
              title
            }
          }
        }
      }
    }
  }
`;