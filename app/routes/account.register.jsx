// app/routes/account.register.jsx

import {json, redirect} from '@shopify/remix-oxygen';
import { Form, useActionData } from 'react-router';

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
  const password = String(form.get('password'));

  try {
    const {customerCreate} = await storefront.mutate(CUSTOMER_CREATE_MUTATION, {
      variables: {
        input: {email, password},
      },
    });

    if (customerCreate?.customerUserErrors?.length) {
      throw new Error(customerCreate.customerUserErrors[0].message);
    }

    return json({
      success: 'Account created successfully! Please log in.',
    });
  } catch (error) {
    return json({error: error.message}, {status: 400});
  }
}

export function meta() {
  return [{title: 'Register'}];
}

export default function Register() {
  const actionData = useActionData();
  const error = actionData?.error;
  const success = actionData?.success;

  return (
    <div className="container flex justify-center py-12 md:py-24">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold text-center">Register.</h1>
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
              placeholder="Password"
              aria-label="Password"
              minLength={8}
              required
            />
          </div>
          {error && (
            <p className="p-2 mt-4 text-sm text-red-600 bg-red-100 rounded">
              {error}
            </p>
          )}
          {success && (
            <p className="p-2 mt-4 text-sm text-green-600 bg-green-100 rounded">
              {success}
            </p>
          )}
          <button
            className="w-full mt-6 text-white bg-black rounded theo-btn"
            type="submit"
          >
            Create Account
          </button>
        </Form>
      </div>
    </div>
  );
}

const CUSTOMER_CREATE_MUTATION = gql`
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        id
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;