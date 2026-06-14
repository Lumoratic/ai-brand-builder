"use client";

import { Plus, Trash2 } from "lucide-react";
import {
  builderHelperClassName,
  builderInputClassName,
  builderLabelClassName,
  builderSectionClassName,
} from "@/components/builder/builder-styles";
import { Button } from "@/components/ui/button";
import type { ResumeEducation } from "@/lib/assets/resume-data";
import {
  useAddResumeEducation,
  useRemoveResumeEducation,
  useResumeData,
  useUpdateResumeEducation,
} from "@/lib/stores/resumeStore";
import { cn } from "@/lib/utils";

type EducationField = keyof Omit<ResumeEducation, "id">;

type EducationEntryProps = {
  entry: ResumeEducation;
  onUpdate: (
    id: string,
    field: EducationField,
    value: ResumeEducation[EducationField]
  ) => void;
  onRemove: (id: string) => void;
};

function EducationEntry({ entry, onUpdate, onRemove }: EducationEntryProps) {
  const label =
    entry.degree.trim() || entry.institution.trim() || "Education entry";

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

      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor={`education-degree-${entry.id}`} className={builderLabelClassName}>
            Degree
          </label>
          <input
            id={`education-degree-${entry.id}`}
            type="text"
            value={entry.degree}
            onChange={(event) => onUpdate(entry.id, "degree", event.target.value)}
            placeholder="B.S. Computer Science"
            className={builderInputClassName}
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor={`education-institution-${entry.id}`}
            className={builderLabelClassName}
          >
            Institution
          </label>
          <input
            id={`education-institution-${entry.id}`}
            type="text"
            value={entry.institution}
            onChange={(event) => onUpdate(entry.id, "institution", event.target.value)}
            placeholder="State University"
            className={builderInputClassName}
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor={`education-location-${entry.id}`}
            className={builderLabelClassName}
          >
            Location
          </label>
          <input
            id={`education-location-${entry.id}`}
            type="text"
            value={entry.location}
            onChange={(event) => onUpdate(entry.id, "location", event.target.value)}
            placeholder="Boston, MA"
            className={builderInputClassName}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor={`education-start-${entry.id}`} className={builderLabelClassName}>
              Start Date
            </label>
            <input
              id={`education-start-${entry.id}`}
              type="text"
              value={entry.startDate}
              onChange={(event) => onUpdate(entry.id, "startDate", event.target.value)}
              placeholder="Sep 2016"
              className={builderInputClassName}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor={`education-end-${entry.id}`} className={builderLabelClassName}>
              End Date
            </label>
            <input
              id={`education-end-${entry.id}`}
              type="text"
              value={entry.endDate}
              onChange={(event) => onUpdate(entry.id, "endDate", event.target.value)}
              placeholder="May 2020"
              className={builderInputClassName}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor={`education-description-${entry.id}`}
            className={builderLabelClassName}
          >
            Description
          </label>
          <textarea
            id={`education-description-${entry.id}`}
            value={entry.description}
            onChange={(event) => onUpdate(entry.id, "description", event.target.value)}
            placeholder="Honors, relevant coursework, activities, or achievements."
            rows={4}
            className={cn(builderInputClassName, "min-h-[100px] resize-y")}
          />
        </div>
      </div>
    </li>
  );
}

export function ResumeEducationEditor() {
  const data = useResumeData();
  const addEducation = useAddResumeEducation();
  const updateEducation = useUpdateResumeEducation();
  const removeEducation = useRemoveResumeEducation();

  return (
    <section
      className={builderSectionClassName}
      aria-labelledby="education-heading"
    >
      <div className="flex items-center justify-between gap-3">
        <h2 id="education-heading" className={builderLabelClassName}>
          Education
        </h2>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addEducation}
          className="gap-1.5 border-white/10 bg-transparent text-zinc-300 hover:bg-white/5"
        >
          <Plus className="size-3.5" aria-hidden />
          Add Education
        </Button>
      </div>

      {data.education.length === 0 ? (
        <p className={cn("mt-5", builderHelperClassName)}>
          No education added yet.
        </p>
      ) : (
        <ul className="mt-5 space-y-4">
          {data.education.map((entry) => (
            <EducationEntry
              key={entry.id}
              entry={entry}
              onUpdate={updateEducation}
              onRemove={removeEducation}
            />
          ))}
        </ul>
      )}
    </section>
  );
}
