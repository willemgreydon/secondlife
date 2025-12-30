"use client";

import { useMemo, useState } from "react";

type KnowledgeType = "all" | "policyBrief" | "publication";

interface KnowledgeItem {
  _id: string;
  title: string;
  summary?: string;
  publishedAt?: string;
  type: "policyBrief" | "publication";
  pdf?: {
    asset?: {
      url: string;
    };
  };
}

interface KnowledgeTabsProps {
  title?: string;
  intro?: string;
  items: KnowledgeItem[];
}

export default function KnowledgeTabs({
  title = "Knowledge",
  intro,
  items,
}: KnowledgeTabsProps) {
  const [filter, setFilter] = useState<KnowledgeType>("all");

  const counts = useMemo(() => {
    return {
      all: items.length,
      policyBrief: items.filter(i => i.type === "policyBrief").length,
      publication: items.filter(i => i.type === "publication").length,
    };
  }, [items]);

  const visibleItems =
    filter === "all"
      ? items
      : items.filter(item => item.type === filter);

  return (
    <section className="bg-white dark:bg-black pb-24">
      <div className="mx-auto max-w-6xl px-6 py-12 space-y-12">
        {/* Intro */}
        <header className="max-w-3xl space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">
            {title}
          </h2>
          {intro && (
            <p className="text-base text-muted-foreground">
              {intro}
            </p>
          )}
        </header>

        {/* Tabs */}
        <div
          className="flex gap-6 border-b border-border"
          role="tablist"
          aria-label="Knowledge filter"
        >
          <TabButton
            active={filter === "all"}
            onClick={() => setFilter("all")}
          >
            All <Count>{counts.all}</Count>
          </TabButton>

          <TabButton
            active={filter === "policyBrief"}
            onClick={() => setFilter("policyBrief")}
          >
            Policy Briefs <Count>{counts.policyBrief}</Count>
          </TabButton>

          <TabButton
            active={filter === "publication"}
            onClick={() => setFilter("publication")}
          >
            Publications <Count>{counts.publication}</Count>
          </TabButton>
        </div>

        {/* Content */}
        {visibleItems.length === 0 ? (
          <div className="rounded-lg border border-dashed p-8 text-sm text-muted-foreground">
            No documents available for this category.
          </div>
        ) : (
          <ul className="grid gap-6 md:grid-cols-2 items-stretch">
            {visibleItems.map(item => (
              <li
                key={item._id}
                className="flex flex-col justify-between rounded-xl border border-border bg-white dark:bg-black p-6"
              >
                <div className="space-y-3">
                  {/* Meta */}
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="rounded-full border px-2 py-0.5">
                      {item.type === "policyBrief"
                        ? "Policy Brief"
                        : "Publication"}
                    </span>
                    {item.publishedAt && (
                      <span>
                        {new Date(item.publishedAt).getFullYear()}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold leading-snug">
                    {item.title}
                  </h3>

                  {/* Summary */}
                  {item.summary && (
                    <p className="text-sm text-muted-foreground">
                      {item.summary}
                    </p>
                  )}
                </div>

                {/* Action */}
                {item.pdf?.asset?.url && (
                  <div className="pt-4">
                    <a
                      href={item.pdf.asset.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-[var(--brand-primary)] hover:underline"
                    >
                      Download PDF
                    </a>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

/* ---------- Helpers ---------- */

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`relative -mb-px border-b-2 px-1 pb-3 text-sm font-medium transition-colors ${
        active
          ? "border-[var(--brand-primary)] text-[var(--brand-primary)]"
          : "border-transparent text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

function Count({ children }: { children: React.ReactNode }) {
  return (
    <span className="ml-1 text-xs opacity-60">
      {children}
    </span>
  );
}
