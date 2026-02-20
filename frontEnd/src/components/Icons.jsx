export default function Icon({ name, className = "", ...props }) {
  if (name === 'spinner') {
    return (
      <svg className={`animate-spin ${className}`} fill="none" viewBox="0 0 24 24" {...props}>
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
      </svg>
    );
  }
  
  if (name === 'menu') {
    return (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    );
  }

  if (name === 'close') {
    return (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    );
  }

  return null;
}
