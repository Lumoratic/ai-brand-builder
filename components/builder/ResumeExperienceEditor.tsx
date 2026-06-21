"use client";

import { Plus, Trash2 } from "lucide-react";
import {
  builderHelperClassName,
  builderInputClassName,
  builderLabelClassName,
  builderSectionClassName,
} from "@/components/builder/builder-styles";
import { Button } from "@/components/ui/button";
import { ImproveResumeTextButton } from "@/components/builder/ImproveResumeTextButton";
import {
  useAddResumeExperience,
  useRemoveResumeExperience,
  useResumeData,
  useUpdateResumeExperience,
} from "@/lib/stores/resumeStore";
import type { ResumeExperience } from "@/lib/assets/resume-data";
import { cn } from "@/lib/utils";

type ExperienceField = keyof Omit<ResumeExperience, "id">;

type ExperienceEntryProps = {
  entry: ResumeExperience;
  onUpdate: (
    id: string,
    field: ExperienceField,
    value: ResumeExperience[ExperienceField]
  ) => void;
  onRemove: (id: string) => void;
};

function ExperienceEntry({ entry, onUpdate, onRemove }: ExperienceEntryProps) {
  const label = entry.jobTitle.trim() || entry.company.trim() || "Experience entry";

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
          <label htmlFor={`experience-job-${entry.id}`} className={builderLabelClassName}>
            Job Title
          </label>
          <input
            id={`experience-job-${entry.id}`}
            type="text"
            value={entry.jobTitle}
            onChange={(event) => onUpdate(entry.id, "jobTitle", event.target.value)}
            placeholder="Senior Product Designer"
            className={builderInputClassName}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor={`experience-company-${entry.id}`} className={builderLabelClassName}>
            Company
          </label>
          <input
            id={`experience-company-${entry.id}`}
            type="text"
            value={entry.company}
            onChange={(event) => onUpdate(entry.id, "company", event.target.value)}
            placeholder="Acme Inc."
            className={builderInputClassName}
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor={`experience-location-${entry.id}`}
            className={builderLabelClassName}
          >
            Location
          </label>
          <input
            id={`experience-location-${entry.id}`}
            type="text"
            value={entry.location}
            onChange={(event) => onUpdate(entry.id, "location", event.target.value)}
            placeholder="San Francisco, CA"
            className={builderInputClassName}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor={`experience-start-${entry.id}`} className={builderLabelClassName}>
              Start Date
            </label>
            <input
              id={`experience-start-${entry.id}`}
              type="text"
              value={entry.startDate}
              onChange={(event) => onUpdate(entry.id, "startDate", event.target.value)}
              placeholder="Jan 2020"
              className={builderInputClassName}
            />
          </div>

          {!entry.isCurrent ? (
            <div className="space-y-2">
              <label htmlFor={`experience-end-${entry.id}`} className={builderLabelClassName}>
                End Date
              </label>
              <input
                id={`experience-end-${entry.id}`}
                type="text"
                value={entry.endDate}
                onChange={(event) => onUpdate(entry.id, "endDate", event.target.value)}
                placeholder="Dec 2023"
                className={builderInputClassName}
              />
            </div>
          ) : null}
        </div>

        <label className="flex items-center gap-2 text-sm text-zinc-300">
          <input
            type="checkbox"
            checked={entry.isCurrent}
            onChange={(event) => onUpdate(entry.id, "isCurrent", event.target.checked)}
            className="size-4 rounded border-white/20 bg-white/[0.03] text-violet-500 focus:ring-violet-500/40"
          />
          Current Position
        </label>

        <div className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <label
              htmlFor={`experience-description-${entry.id}`}
              className={builderLabelClassName}
            >
              Description
            </label>
            <ImproveResumeTextButton
              field="experience-description"
              text={entry.description}
              context={{
                jobTitle: entry.jobTitle,
                company: entry.company,
                location: entry.location,
                startDate: entry.startDate,
                endDate: entry.endDate,
                isCurrent: entry.isCurrent,
              }}
              onAccept={(value) => onUpdate(entry.id, "description", value)}
            />
          </div>
          <textarea
            id={`experience-description-${entry.id}`}
            value={entry.description}
            onChange={(event) => onUpdate(entry.id, "description", event.target.value)}
            placeholder="Describe your responsibilities, impact, and achievements."
            rows={4}
            className={cn(builderInputClassName, "min-h-[100px] resize-y")}
          />
        </div>
      </div>
    </li>
  );
}

export function ResumeExperienceEditor() {
  const data = useResumeData();
  const addExperience = useAddResumeExperience();
  const updateExperience = useUpdateResumeExperience();
  const removeExperience = useRemoveResumeExperience();

  return (
    <section
      className={builderSectionClassName}
      aria-labelledby="experience-heading"
    >
      <div className="flex items-center justify-between gap-3">
        <h2 id="experience-heading" className={builderLabelClassName}>
          Experience
        </h2>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addExperience}
          className="gap-1.5 border-white/10 bg-transparent text-zinc-300 hover:bg-white/5"
        >
          <Plus className="size-3.5" aria-hidden />
          Add Experience
        </Button>
      </div>

      {data.experience.length === 0 ? (
        <p className={cn("mt-5", builderHelperClassName)}>
          No experience added yet.
        </p>
      ) : (
        <ul className="mt-5 space-y-4">
          {data.experience.map((entry) => (
            <ExperienceEntry
              key={entry.id}
              entry={entry}
              onUpdate={updateExperience}
              onRemove={removeExperience}
            />
          ))}
        </ul>
      )}
    </section>
  );
}
