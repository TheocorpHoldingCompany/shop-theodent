// app/root.jsx

import React from 'react';  // Fix: Add for JSX/components
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from 'react-router';
import tailwindStyles from './styles/tailwind.css?url';
import {Header} from '~/components/global/Header';
import {Footer} from '~/components/global/Footer';

function Layout({children}) {
  return (
    <div className="flex flex-col min-h-screen bg-[#fefcf3]">
      <Header />
      <main role="main" id="mainContent" className="flex-grow" aria-label="Main content">  // Fix: Add aria for accessibility
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Layout>
          <Outlet />
        </Layout>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function links() {
  return [{rel: 'stylesheet', href: tailwindStyles}];
}

export function ErrorBoundary() {
  const error = useRouteError();
  const isRouteError = isRouteErrorResponse(error);
  // ... ErrorBoundary code ...
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>Error</title>
        <Meta />
        <Links />
      </head>
      <body>
        <Layout>
          <div className="container py-20 text-center">
            <h1 className="text-4xl">Something went wrong</h1>
            <p className="mt-4">
              {isRouteError
                ? `${error.status} ${error.statusText}`
                : 'An unexpected error occurred.'}
            </p>
          </div>
        </Layout>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}