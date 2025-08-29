// app/components/forms/WholesaleForm.jsx

"use client";

import {v4 as uuidv4} from 'uuid';
import {useEffect, useState} from 'react';

export function WholesaleForm() {
  const [id, setId] = useState('');

  // Generate UUID on the client to avoid server/client mismatch
  useEffect(() => {
    setId(uuidv4());
  }, []);

  if (!id) {
    return null; // Or a loading spinner
  }

  return (
    <div
      className="pipedriveWebForms relative mx-auto h-[800px] w-full max-w-md overflow-hidden"
      data-pd-webforms="https://pipedrivewebforms.com/form/cB7lHYVjIhk9Nw98t4Ix34luDEq28aOxPVQJZHCATINYYVIAByVfKemlrHT3NBLTLZ"
    >
      <iframe
        src={`https://pipedrivewebforms.com/form/cB7lHYVjIhk9Nw98t4Ix34luDEq28aOxPVQJZHCATINYYVIAByVfKemlrHT3NBLTLZ?embeded=1&uuid=${id}`}
        scrolling="no"
        seamless
        className="relative h-full w-full min-w-[320px] max-w-md overflow-hidden border-none"
      />
    </div>
  );
}