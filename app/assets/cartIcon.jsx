export function CartIconFill({className = '', ...props}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className || 'w-6 h-6'}
      {...props}
    >
      <rect fill="currentColor" x="1.72" y="7.88" width="20.57" height="15.27" />
      <path
        fill="currentColor"
        d="M22.28,24H1.72a.85.85,0,0,1-.85-.85V7.88A.85.85,0,0,1,1.72,7H22.28a.85.85,0,0,1,.85.85V23.15A.85.85,0,0,1,22.28,24ZM2.56,22.31H21.44V8.73H2.56Z"
      />
      <path
        fill="currentColor"
        d="M17.9,11.92H16.21v-6a4.22,4.22,0,1,0-8.43,0v6H6.09v-6a5.91,5.91,0,1,1,11.81,0Z"
      />
    </svg>
  );
}

export function CartIcon({className = '', ...props}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className || 'w-6 h-6'}
      {...props}
    >
      <path
        fill="currentColor"
        d="M22.28,24H1.72a.85.85,0,0,1-.85-.85V7.88A.85.85,0,0,1,1.72,7H22.28a.85.85,0,0,1,.85.85V23.15A.85.85,0,0,1,22.28,24ZM2.56,22.31H21.44V8.73H2.56Z"
      />
      <path
        fill="currentColor"
        d="M17.9,12.63H16.21V5.91a4.22,4.22,0,1,0-8.43,0v6.72H6.09V5.91a5.91,5.91,0,1,1,11.81,0Z"
      />
    </svg>
  );
}