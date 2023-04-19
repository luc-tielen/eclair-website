import type React from "react";

interface LinkProps {
  href: string;
  children: string | React.ReactElement;
}

const Link = ({ href, children }: LinkProps) => (
  <a
    className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
    href={href}
  >
    {children}
  </a>
);

export default Link;
