import TableOfContents from "./TableOfContents";
import generateToc from "../util/generate-toc";
import type { MarkdownHeading } from "astro";
import { useState } from "react";

interface ArrowIconProps {
  rotated?: boolean;
}

const ArrowIcon = ({ rotated }: ArrowIconProps) => {
  return (
    <div
      className={`w-6 h-6 flex ${rotated ? "rotate-90 mt-2 -ml-2" : "-mt-2"}`}
    >
      <svg
        width="3"
        height="24"
        viewBox="0 -9 3 24"
        className="inline-block mr-2 text-slate-400 overflow-visible group-hover:text-slate-600"
      >
        <path
          d="M0 0L3 3L0 6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        ></path>
      </svg>
    </div>
  );
};

const overview = "Overview";

interface Props {
  headings: MarkdownHeading[];
}

const MobileTableOfContents = ({ headings }: Props) => {
  const [collapsed, setCollapsed] = useState(false);
  if (!headings) {
    return null;
  }

  return (
    <div className="flex flex-col items-start lg:hidden not-prose pb-8">
      {collapsed ? (
        <button
          className="text-sm flex flex-row justify-center items-center"
          type="button"
          onClick={() => {
            setCollapsed(false);
          }}
        >
          <h2
            className="font-medium text-sm pb-2 pr-2"
            id="on-this-page-heading"
          >
            Table of contents
          </h2>
          <ArrowIcon />
        </button>
      ) : (
        <TableOfContents
          toc={generateToc(headings, overview)}
          labels={{ onThisPage: "Table of contents" }}
          customHeader={
            <button
              className="text-sm flex flex-row justify-center"
              type="button"
              onClick={() => {
                setCollapsed(true);
              }}
            >
              <h2
                className="font-medium text-sm pb-2 pr-2 whitespace-nowrap"
                id="on-this-page-heading"
              >
                Table of contents
              </h2>
              <ArrowIcon rotated />
            </button>
          }
        />
      )}
    </div>
  );
};

export default MobileTableOfContents;
