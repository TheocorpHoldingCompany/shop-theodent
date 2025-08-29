// app/routes/account.activate.$id.$token.jsx

import {json, redirect} from '@shopify/remix-oxygen';
import { Form, useActionData } from 'react-router';
import gql from 'graphql-tag';

export async function action({request, params, context}) {
  const {id, token} = params;
  const {storefront, session} = context;
  const form = await request.formData();
  const password = String(form.get('password'));
  const passwordConfirm = String(form.get('passwordConfirm'));

  if (password !== passwordConfirm) {
    return json({error: 'Passwords do not match.'}, {status: 400});
  }

  try {
    const {customerActivate} = await storefront.mutate(
      CUSTOMER_ACTIVATE_MUTATION,
      {
        variables: {
          id: `gid://shopify/Customer/${id}`,
          input: {activationToken: token, password},
        },
      },
    );

    if (customerActivate?.customerAccessToken?.accessToken) {
      session.set(
        'customerAccessToken',
        customerActivate.customerAccessToken,
      );
      return redirect('/account', {
        headers: {'Set-Cookie': await session.commit()},
      });
    } else {
      throw new Error(customerActivate?.customerUserErrors[0].message);
    }
  } catch (error) {
    return json({error: error.message}, {status: 400});
  }
}

export function meta() {
  return [{title: 'Activate Account'}];
}

export default function Activate() {
  const actionData = useActionData();
  const error = actionData?.error;

  return (
    <div className="container flex justify-center py-12 md:py-24">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold text-center">Activate Account.</h1>
        <p className="mt-4 text-center text-gray-600">
          Create your password to activate your account.
        </p>
        <Form method="POST" className="mt-8">
          <div className="space-y-4">
            <input
              className="w-full px-3 py-2 border rounded"
              name="password"
              type="password"
              placeholder="Password"
              aria-label="Password"
              minLength={8}
              required
            />
            <input
              className="w-full px-3 py-2 border rounded"
              name="passwordConfirm"
              type="password"
              placeholder="Confirm password"
              aria-label="Confirm password"
              minLength={8}
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
            Activate Account
          </button>
        </Form>
      </div>
    </div>
  );
}

const CUSTOMER_ACTIVATE_MUTATION = gql`
  mutation customerActivate($id: ID!, $input: CustomerActivateInput!) {
    customerActivate(id: $id, input: $input) {
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;