// app/routes/account.reset.$id.$token.jsx

import {json, redirect} from '@shopify/remix-oxygen';
import { Form, useActionData } from 'react-router';
import {gql} from '@shopify/hydrogen';

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
    const {customerReset} = await storefront.mutate(CUSTOMER_RESET_MUTATION, {
      variables: {
        id: `gid://shopify/Customer/${id}`,
        input: {resetToken: token, password},
      },
    });

    if (customerReset?.customerAccessToken?.accessToken) {
      session.set(
        'customerAccessToken',
        customerReset.customerAccessToken,
      );
      return redirect('/account', {
        headers: {'Set-Cookie': await session.commit()},
      });
    } else {
      throw new Error(customerReset?.customerUserErrors[0].message);
    }
  } catch (error) {
    return json({error: error.message}, {status: 400});
  }
}

export function meta() {
  return [{title: 'Reset Password'}];
}

export default function Reset() {
  const actionData = useActionData();
  const error = actionData?.error;

  return (
    <div className="container flex justify-center py-12 md:py-24">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold text-center">Reset Password.</h1>
        <Form method="POST" className="mt-8">
          <div className="space-y-4">
            <input
              className="w-full px-3 py-2 border rounded"
              name="password"
              type="password"
              placeholder="New password"
              aria-label="New password"
              minLength={8}
              required
            />
            <input
              className="w-full px-3 py-2 border rounded"
              name="passwordConfirm"
              type="password"
              placeholder="Confirm new password"
              aria-label="Confirm new password"
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
            Update Password
          </button>
        </Form>
      </div>
    </div>
  );
}

const CUSTOMER_RESET_MUTATION = gql`
  mutation customerReset($id: ID!, $input: CustomerResetInput!) {
    customerReset(id: $id, input: $input) {
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