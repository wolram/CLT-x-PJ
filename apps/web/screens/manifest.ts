export type Screen = {
  slug: string;
  title: string;
  description: string;
  fileName: string;
};

export const screens: Screen[] = [
  {
    slug: "blog-article-v1",
    title: "Blog Article V1",
    description: "Primeira versão de artigo do blog.",
    fileName: "blog-article-v1.html"
  },
  {
    slug: "blog-article-v2",
    title: "Blog Article V2",
    description: "Segunda versão de artigo do blog.",
    fileName: "blog-article-v2.html"
  },
  {
    slug: "comparison-dashboard-v1",
    title: "Comparison Dashboard V1",
    description: "Primeira versão de dashboard comparativo.",
    fileName: "comparison-dashboard-v1.html"
  },
  {
    slug: "comparison-dashboard-v2",
    title: "Comparison Dashboard V2",
    description: "Segunda versão de dashboard comparativo.",
    fileName: "comparison-dashboard-v2.html"
  },
  {
    slug: "landing-page-fixed",
    title: "Landing Page Fixed",
    description: "Landing page corrigida.",
    fileName: "landing-page-fixed.html"
  },
  {
    slug: "landing-page-nav-v1",
    title: "Landing Page Nav V1",
    description: "Landing page com navegação, versão 1.",
    fileName: "landing-page-nav-v1.html"
  },
  {
    slug: "landing-page-nav-v2",
    title: "Landing Page Nav V2",
    description: "Landing page com navegação, versão 2.",
    fileName: "landing-page-nav-v2.html"
  },
  {
    slug: "careers-opportunities",
    title: "Careers Opportunities",
    description: "Tela de oportunidades de carreira.",
    fileName: "careers-opportunities.html"
  }
];

export const screenBySlug = new Map(screens.map((screen) => [screen.slug, screen]));
