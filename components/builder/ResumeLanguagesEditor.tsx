"use client";

import { Plus, Trash2 } from "lucide-react";
import {
  builderHelperClassName,
  builderInputClassName,
  builderLabelClassName,
  builderSectionClassName,
} from "@/components/builder/builder-styles";
import { Button } from "@/components/ui/button";
import type { ResumeLanguage } from "@/lib/assets/resume-data";
import {
  useAddResumeLanguage,
  useRemoveResumeLanguage,
  useResumeData,
  useUpdateResumeLanguage,
} from "@/lib/stores/resumeStore";

type LanguageField = keyof Omit<ResumeLanguage, "id">;

type LanguageEntryProps = {
  entry: ResumeLanguage;
  onUpdate: (
    id: string,
    field: LanguageField,
    value: ResumeLanguage[LanguageField]
  ) => void;
  onRemove: (id: string) => void;
};

function LanguageEntry({ entry, onUpdate, onRemove }: LanguageEntryProps) {
  const label = entry.name.trim() || "Language entry";

  return (
    <li className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5">
      <div className="mb-4 flex items-start justify-between gap-3">
        <p className="text-sm font-medium text-zinc-200">
          {entry.name.trim() && entry.level.trim()
            ? `${entry.name.trim()} — ${entry.level.trim()}`
            : label}
        </p>
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
          <label htmlFor={`language-name-${entry.id}`} className={builderLabelClassName}>
            Language Name
          </label>
          <input
            id={`language-name-${entry.id}`}
            type="text"
            value={entry.name}
            onChange={(event) => onUpdate(entry.id, "name", event.target.value)}
            placeholder="German"
            className={builderInputClassName}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor={`language-level-${entry.id}`} className={builderLabelClassName}>
            Level
          </label>
          <input
            id={`language-level-${entry.id}`}
            type="text"
            value={entry.level}
            onChange={(event) => onUpdate(entry.id, "level", event.target.value)}
            placeholder="B1"
            className={builderInputClassName}
          />
        </div>
      </div>
    </li>
  );
}

export function ResumeLanguagesEditor() {
  const data = useResumeData();
  const addLanguage = useAddResumeLanguage();
  const updateLanguage = useUpdateResumeLanguage();
  const removeLanguage = useRemoveResumeLanguage();

  return (
    <section
      className={builderSectionClassName}
      aria-labelledby="languages-heading"
    >
      <div className="flex items-center justify-between gap-3">
        <h2 id="languages-heading" className={builderLabelClassName}>
          Languages
        </h2>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addLanguage}
          className="gap-1.5 border-white/10 bg-transparent text-zinc-300 hover:bg-white/5"
        >
          <Plus className="size-3.5" aria-hidden />
          Add Language
        </Button>
      </div>

      {data.languages.length === 0 ? (
        <p className={`mt-5 ${builderHelperClassName}`}>
          No languages added yet.
        </p>
      ) : (
        <ul className="mt-5 space-y-4">
          {data.languages.map((entry) => (
            <LanguageEntry
              key={entry.id}
              entry={entry}
              onUpdate={updateLanguage}
              onRemove={removeLanguage}
            />
          ))}
        </ul>
      )}
    </section>
  );
}
