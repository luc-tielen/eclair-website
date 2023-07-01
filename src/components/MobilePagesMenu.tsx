import { useState } from "react";
import { docPagesGroupedBySection } from "../util/docs";
import logo from "../images/small_logo.png";

// Icons need to passed from astro, not importable in react
type Props = {
  showLogo: boolean;
  discordIcon?: JSX.Element;
  githubIcon?: JSX.Element;
};

const MobilePagesMenu = ({ showLogo, discordIcon, githubIcon }: Props) => {
  const [isCollapsed, setCollapsed] = useState(true);
  return (
    <>
      <div className="w-full flex lg:hidden justify-between items-center font-medium uppercase">
        <div className="flex flex-row items-center gap-2">
          {showLogo ? (
            <a href="/">
              <img
                src={logo}
                alt="Eclair logo"
                className="w-16 min-w-16 pl-2"
              />
            </a>
          ) : null}
        </div>
        <div className="flex flex-row items-center gap-2">
          <a href="https://github.com/luc-tielen/eclair-lang">{githubIcon}</a>
          <a href="https://discord.gg/mC2arUrxKg">{discordIcon}</a>
          <HamburgerMenu onClick={() => setCollapsed((prev) => !prev)} />
        </div>
      </div>
      {isCollapsed ? null : (
        <ul
          role="list"
          className="fixed top-12 bottom-0 left-0 right-0 overflow-y-auto bg-white divide-y divide-gray-100"
        >
          <li className="flex justify-between px-6 py-4 hover:underline">
            <a
              href="/docs"
              className="text-blue-600 hover:text-blue-800 visited:text-purple-600"
            >
              Docs
            </a>
          </li>
          {/* TODO
          <li className="flex justify-between py-4 hover:underline">
            <a href="/performance">Benchmarks</a>
          </li>
          */}
          {docPagesGroupedBySection.map(([section, docPages], i) => (
            <div key={`${section}-${i}`} className="pl-8 pr-6 py-4">
              <h2 className="pb-2">{section}</h2>
              <ul role="list">
                {docPages.map((docPage, j) => (
                  <li
                    className="text-sm py-2 hover:underline"
                    key={`${section}-page-${j}`}
                  >
                    <a
                      href={`/docs/${docPage.slug}`}
                      className="pl-4 text-blue-600 hover:text-blue-800 visited:text-purple-600"
                    >
                      {docPage.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </ul>
      )}
    </>
  );
};

type HamburgerMenuProps = {
  onClick: () => void;
};

const HamburgerMenu = ({ onClick }: HamburgerMenuProps) => (
  <button
    type="button"
    className="flex items-center text-black-600 p-2"
    onClick={onClick}
  >
    <svg
      className="block h-4 w-4 fill-current"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
    </svg>
    <span className="sr-only">Expand menu</span>
  </button>
);

export default MobilePagesMenu;
