// app/routes/account.recover.jsx

import {json, redirect} from '@shopify/remix-oxygen';
import { Form, useActionData } from 'react-router';
import gql from 'graphql-tag';

export async function loader({context}) {
  const customerAccessToken = await context.session.get('customerAccessToken');
  if (customerAccessToken) {
    return redirect('/account');
  }
  return json({});
}

export async function action({request, context}) {
  const {storefront} = context;
  const form = await request.formData();
  const email = String(form.get('email'));

  await storefront.mutate(CUSTOMER_RECOVER_MUTATION, {
    variables: {email},
  });

  // We always return a success message to prevent email enumeration.
  return json({
    success:
      'If that email address is in our system, you will receive an email with instructions on how to reset your password.',
  });
}

export function meta() {
  return [{title: 'Recover Password'}];
}

export default function Recover() {
  const actionData = useActionData();
  const success = actionData?.success;

  return (
    <div className="container flex justify-center py-12 md:py-24">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold text-center">Forgot Password.</h1>
        <p className="mt-4 text-center text-gray-600">
          Enter your email address to receive a password reset link.
        </p>
        {success ? (
          <p className="p-2 mt-8 text-center text-green-600 bg-green-100 rounded">
            {success}
          </p>
        ) : (
          <Form method="POST" className="mt-8">
            <input
              className="w-full px-3 py-2 border rounded"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="Email address"
              aria-label="Email address"
            />
            <button
              className="w-full mt-6 text-white bg-black rounded theo-btn"
              type="submit"
            >
              Request Reset Link
            </button>
          </Form>
        )}
      </div>
    </div>
  );
}

const CUSTOMER_RECOVER_MUTATION = gql`
  mutation customerRecover($email: String!) {
    customerRecover(email: $email) {
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;