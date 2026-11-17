/* S Packery Inc. magazine issues. Newest first.
   To add an issue: put its page images in /public/magazine/<slug>/ (page-N.jpg + page-N-thumb.jpg, plus the PDF)
   and add an entry at the top of this list. */

export type MagazinePage = { src: string; thumb: string; title: string };
export type MagazineIssue = {
  slug: string;
  number: string;
  date: string;
  title: string;
  summary: string;
  topics: string[];
  pages: MagazinePage[];
  pdf: string;
};

const page = (slug: string, n: number, title: string): MagazinePage => ({
  src: `/magazine/${slug}/page-${n}.jpg`,
  thumb: `/magazine/${slug}/page-${n}-thumb.jpg`,
  title,
});

export const issues: MagazineIssue[] = [
  {
    slug: "issue-09",
    number: "09",
    date: "November 2026",
    title: "The Accounting Equation: A = OE + L",
    summary:
      "Why the accounting equation is the foundation of sound financial reporting, and how assets, owner's equity and liabilities work together in your business.",
    topics: [
      "The importance of A = OE + L",
      "Assets: the value behind the numbers",
      "Owner's equity: the value that belongs to you",
      "Liabilities: know what you owe",
    ],
    pages: [
      page("issue-09", 1, "Cover: The Accounting Equation"),
      page("issue-09", 2, "Assets: the value behind the numbers"),
      page("issue-09", 3, "Owner's equity: the value that belongs to you"),
      page("issue-09", 4, "Liabilities: know what you owe"),
    ],
    pdf: "/magazine/issue-09/S-Packery-Magazine-Issue-09-November-2026.pdf",
  },
];

export const latestIssue = issues[0];
