// app/routes/account.login.jsx

import {json, redirect} from '@shopify/remix-oxygen';
import { Form, useActionData } from 'react-router';
import {useState} from 'react';
import {gql} from '@shopify/hydrogen';

// This server-side function runs when the page is loaded.
// If the user is already logged in, we redirect them to their account page.
export async function loader({context}) {
  const customerAccessToken = await context.session.get('customerAccessToken');
  if (customerAccessToken) {
    return redirect('/account');
  }
  return json({});
}

// This server-side function runs when the form is submitted.
export async function action({request, context}) {
  const {session, storefront} = context;
  const form = await request.formData();
  const email = form.has('email') ? String(form.get('email')) : null;
  const password = form.has('password') ? String(form.get('password')) : null;

  if (!email || !password) {
    return json({error: 'Please enter both an email and a password.'}, {status: 400});
  }

  try {
    const {customerAccessTokenCreate} = await storefront.mutate(
      LOGIN_MUTATION,
      {variables: {input: {email, password}}},
    );

    if (!customerAccessTokenCreate?.customerAccessToken?.accessToken) {
      throw new Error(
        customerAccessTokenCreate?.customerUserErrors[0].message,
      );
    }

    const {customerAccessToken} = customerAccessTokenCreate;
    session.set('customerAccessToken', customerAccessToken);

    return redirect('/account', {
      headers: {
        'Set-Cookie': await session.commit(),
      },
    });
  } catch (error) {
    return json({error: error.message}, {status: 400});
  }
}

export function meta() {
  return [{title: 'Login'}];
}

export default function Login() {
  const actionData = useActionData();
  const error = actionData?.error || null;

  return (
    <div className="container flex justify-center py-12 md:py-24">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold text-center">Sign In.</h1>
        <Form method="POST" className="mt-8">
          <div className="space-y-4">
            <input
              className="w-full px-3 py-2 border rounded"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="Email address"
              aria-label="Email address"
            />
            <input
              className="w-full px-3 py-2 border rounded"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="Password"
              aria-label="Password"
              required
            />
          </div>
          {error && (
            <p className="p-2 mt-4 text-sm text-red-600 bg-red-100 rounded">
              {error}
            </p>
          )}
          <button
            className="w-full mt-6 text-white bg-black rounded theo-btn"
            type="submit"
          >
            Sign in
          </button>
        </Form>
      </div>
    </div>
  );
}

const LOGIN_MUTATION = gql`
  mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerUserErrors {
        code
        field
        message
      }
      customerAccessToken {
        accessToken
        expiresAt
      }
    }
  }
`;