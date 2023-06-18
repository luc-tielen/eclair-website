import { type CollectionEntry, getCollection } from "astro:content";

type Docs = CollectionEntry<"docs">;
type DocPage = Docs["data"] & { slug: Docs["slug"] };
type DocSection = DocPage["section"];

export const sectionOrder = (section: DocSection) => {
  switch (section) {
    case "Getting started":
      return 0;
    case "Language":
      return 1;
    case "Runtime":
      return 2;
  }
};

const docPages: DocPage[] = (await getCollection("docs")).map((docPage) => ({
  ...docPage.data,
  slug: docPage.slug,
}));

const startMap: Map<DocSection, DocPage[]> = new Map();

export const docPagesGroupedBySection: [DocSection, DocPage[]][] = [
  ...docPages
    .reduce((acc, docPage) => {
      const pages = acc.get(docPage.section) ?? [];
      return acc.set(docPage.section, pages.concat(docPage));
    }, startMap)
    .entries(),
]
  .sort(
    ([section1], [section2]) =>
      sectionOrder(section1 as DocSection) -
      sectionOrder(section2 as DocSection)
  )
  .map(([section, pages]) => {
    const sortedPages = pages
      .concat()
      .sort((page1, page2) => page1.order - page2.order);
    return [section, sortedPages];
  });

const orderedDocs = docPagesGroupedBySection.flatMap(([, pages]) => pages);

export const getPreviousDoc = (section: DocSection, order: number) => {
  const index = orderedDocs.findIndex(
    (docPage) => docPage.section === section && docPage.order === order
  );
  if (index === 0) {
    return null;
  }

  const docPage = orderedDocs[index - 1]!;
  return { title: docPage.title, link: `/docs/${docPage.slug}` };
};

export const getNextDoc = (section: DocSection, order: number) => {
  const index = orderedDocs.findIndex(
    (docPage) => docPage.section === section && docPage.order === order
  );
  if (index === orderedDocs.length - 1) {
    return null;
  }

  const docPage = orderedDocs[index + 1]!;
  return { title: docPage.title, link: `/docs/${docPage.slug}` };
};
