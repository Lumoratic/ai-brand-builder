"use client";

import type { ResumeDensityId, ResumeTemplateId } from "@/lib/assets/resume-data";
import {
  RESUME_DENSITY_OPTIONS,
  RESUME_TEMPLATE_OPTIONS,
} from "@/lib/resume/resume-templates";
import {
  useResumeData,
  useSetResumeDensity,
  useSetResumeTemplateId,
} from "@/lib/stores/resumeStore";
import { cn } from "@/lib/utils";

const selectClassName = cn(
  "h-7 rounded-md border border-white/10 bg-white/[0.03] px-2 text-[11px] text-zinc-300",
  "focus-visible:border-violet-500/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/30"
);

export function ResumeTemplateSelector() {
  const data = useResumeData();
  const setTemplateId = useSetResumeTemplateId();
  const setDensity = useSetResumeDensity();

  return (
    <div className="flex items-center gap-2">
      <div className="flex flex-col gap-1">
        <label htmlFor="resume-template" className="sr-only">
          Resume template
        </label>
        <select
          id="resume-template"
          value={data.templateId}
          onChange={(event) =>
            setTemplateId(event.target.value as ResumeTemplateId)
          }
          className={selectClassName}
          aria-label="Resume template"
        >
          {RESUME_TEMPLATE_OPTIONS.map((option) => (
            <option key={option.id} value={option.id} className="bg-zinc-900">
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="resume-density" className="sr-only">
          Resume density
        </label>
        <select
          id="resume-density"
          value={data.density}
          onChange={(event) =>
            setDensity(event.target.value as ResumeDensityId)
          }
          className={selectClassName}
          aria-label="Resume density"
        >
          {RESUME_DENSITY_OPTIONS.map((option) => (
            <option key={option.id} value={option.id} className="bg-zinc-900">
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
