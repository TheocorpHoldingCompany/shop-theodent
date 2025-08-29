// app/routes/account.logout.jsx

import {redirect} from '@shopify/remix-oxygen';
import {gql} from '@shopify/hydrogen';

// This server action logs the user out and redirects them.
export async function action({context}) {
  context.session.unset('customerAccessToken');
  return redirect('/', {
    headers: {
      'Set-Cookie': await context.session.commit(),
    },
  });
}

// If a user navigates to this URL directly, redirect them.
export async function loader() {
  return redirect('/');
}