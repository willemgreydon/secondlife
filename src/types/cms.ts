export type ImageRef = {
  _type: "image";
  asset: { _ref: string; _type: "reference" };
  alt?: string;
};

export type Link = { label: string; href: string };

export type HomeHero = {
  _type: "homeHero";
  title: string;
  eyebrow?: string;
  subtitle?: string;
  ctaPrimary?: Link;
  ctaSecondary?: Link;
  backgroundImage?: ImageRef | null;
};

export type ImpactStat = {
  _type: "impactStat";
  label: string;
  value: string; // keep string to allow “1.2M+”
  footnote?: string;
};

export type Initiative = {
  _type: "initiative";
  _id: string;
  title: string;
  excerpt?: string;
  slug?: { current: string };
  cover?: ImageRef | null;
  tags?: string[];
  order?: number;
  body?: any[]; // Portable Text
};

export type Partner = {
  _type: "partner";
  name: string;
  logo?: ImageRef | null;
  url?: string;
};

export type HomeData = {
  hero: HomeHero | null;
  stats: ImpactStat[];
  initiatives: Initiative[];
  partners: Partner[];
};

export type Campaign = {
  _type: "campaign";
  _id: string;
  title: string;
  excerpt?: string;
  slug?: { current: string };
  cover?: ImageRef | null;
  tags?: string[];
  order?: number;
};