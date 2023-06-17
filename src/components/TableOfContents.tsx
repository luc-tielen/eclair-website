import { unescape } from "html-escaper";
import { useEffect, useState } from "react";
import type { TocItem } from "../util/generate-toc";
import "./TableOfContents.css";

// Same TableOfContents components as Astro docs, but with some modifications here and there.

interface Props {
  toc: TocItem[];
  labels: {
    onThisPage: string;
  };
}

const toDepthClass = (depth: number) => {
  switch (depth) {
    case 3:
      return "pl-2";
    case 4:
      return "pl-4";
    case 5:
      return "pl-6";
    case 6:
      return "pl-8";
    default:
      return "";
  }
};

const TableOfContents = ({ toc, labels }: Props) => {
  if (!toc[0]) return null;

  const [currentHeading, setCurrentHeading] = useState({
    slug: toc[0].slug,
    text: toc[0].text,
  });
  const onThisPageID = "on-this-page-heading";

  // TODO remove
  useEffect(() => {
    const setCurrent: IntersectionObserverCallback = (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const { id, textContent } = entry.target;
          if (id === onThisPageID) continue;
          setCurrentHeading({ slug: id, text: textContent || "" });
          break;
        }
      }
    };

    const observerOptions: IntersectionObserverInit = {
      // Negative top margin accounts for `scroll-margin`.
      // Negative bottom margin means heading needs to be towards top of viewport to trigger intersection.
      rootMargin: "-100px 0% -66%",
      threshold: 1,
    };

    const headingsObserver = new IntersectionObserver(
      setCurrent,
      observerOptions
    );

    // Observe all the headings in the main page content.
    document
      .querySelectorAll("article :is(h1,h2,h3)")
      .forEach((h) => headingsObserver.observe(h));

    // Stop observing when the component is unmounted.
    return () => headingsObserver.disconnect();
  }, []);

  const TableOfContentsItem = ({ heading }: { heading: TocItem }) => {
    const { depth, slug, text, children } = heading;
    return (
      <li>
        <a
          className={`flex items-center hover:text-slate-900 ${toDepthClass(
            depth
          )} ${currentHeading.slug === slug ? "current-header-link" : ""
            }`.trim()}
          href={`#${slug}`}
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
          {unescape(text)}
        </a>
        {children.length > 0 ? (
          <ul className="flex flex-col gap-1 text-slate-700">
            {children.map((heading) => (
              <TableOfContentsItem key={heading.slug} heading={heading} />
            ))}
          </ul>
        ) : null}
      </li>
    );
  };

  return (
    <>
      <h2 className="font-medium text-sm pb-2" id={onThisPageID}>
        {labels.onThisPage}
      </h2>
      <ul className="flex flex-col text-slate-700">
        {toc.map((heading2) => (
          <TableOfContentsItem key={heading2.slug} heading={heading2} />
        ))}
      </ul>
    </>
  );
};

export default TableOfContents;
