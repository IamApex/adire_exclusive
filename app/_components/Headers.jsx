export function H1({ children }) {
  return (
    <h1 className="text-2xl font-secondary text-shadow-xl"> {children}</h1>
  );
}

export function H2({ children }) {
  return <h1 className="text-md font-secondary text-shadow-xl"> {children}</h1>;
}

export function H3({ children }) {
  return (
    <h3 className="uppercase tracking-wide font-primary text-pink-950 text-xs md:text-base">
      {children}
    </h3>
  );
}
