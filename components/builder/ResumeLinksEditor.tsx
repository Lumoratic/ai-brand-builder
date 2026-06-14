"use client";

import { Plus, Trash2 } from "lucide-react";
import {
  builderHelperClassName,
  builderInputClassName,
  builderLabelClassName,
  builderSectionClassName,
} from "@/components/builder/builder-styles";
import { Button } from "@/components/ui/button";
import type { ResumeLink } from "@/lib/assets/resume-data";
import {
  useAddResumeLink,
  useRemoveResumeLink,
  useResumeData,
  useUpdateResumeLink,
} from "@/lib/stores/resumeStore";

type LinkField = keyof Omit<ResumeLink, "id">;

type LinkEntryProps = {
  entry: ResumeLink;
  onUpdate: (
    id: string,
    field: LinkField,
    value: ResumeLink[LinkField]
  ) => void;
  onRemove: (id: string) => void;
};

function LinkEntry({ entry, onUpdate, onRemove }: LinkEntryProps) {
  const label = entry.label.trim() || "Link entry";

  return (
    <li className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5">
      <div className="mb-4 flex items-start justify-between gap-3">
        <p className="text-sm font-medium text-zinc-200">{label}</p>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          aria-label={`Remove ${label}`}
          onClick={() => onRemove(entry.id)}
          className="shrink-0 text-zinc-500 hover:bg-red-500/10 hover:text-red-300"
        >
          <Trash2 className="size-4" />
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor={`link-label-${entry.id}`} className={builderLabelClassName}>
            Label
          </label>
          <input
            id={`link-label-${entry.id}`}
            type="text"
            value={entry.label}
            onChange={(event) => onUpdate(entry.id, "label", event.target.value)}
            placeholder="LinkedIn"
            className={builderInputClassName}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor={`link-url-${entry.id}`} className={builderLabelClassName}>
            URL
          </label>
          <input
            id={`link-url-${entry.id}`}
            type="url"
            value={entry.url}
            onChange={(event) => onUpdate(entry.id, "url", event.target.value)}
            placeholder="https://linkedin.com/in/yourprofile"
            className={builderInputClassName}
          />
        </div>
      </div>
    </li>
  );
}

export function ResumeLinksEditor() {
  const data = useResumeData();
  const addLink = useAddResumeLink();
  const updateLink = useUpdateResumeLink();
  const removeLink = useRemoveResumeLink();

  return (
    <section
      className={builderSectionClassName}
      aria-labelledby="links-heading"
    >
      <div className="flex items-center justify-between gap-3">
        <h2 id="links-heading" className={builderLabelClassName}>
          Links
        </h2>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addLink}
          className="gap-1.5 border-white/10 bg-transparent text-zinc-300 hover:bg-white/5"
        >
          <Plus className="size-3.5" aria-hidden />
          Add Link
        </Button>
      </div>

      {data.links.length === 0 ? (
        <p className={`mt-5 ${builderHelperClassName}`}>
          No links added yet.
        </p>
      ) : (
        <ul className="mt-5 space-y-4">
          {data.links.map((entry) => (
            <LinkEntry
              key={entry.id}
              entry={entry}
              onUpdate={updateLink}
              onRemove={removeLink}
            />
          ))}
        </ul>
      )}
    </section>
  );
}
