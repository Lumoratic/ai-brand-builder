"use client";

import { Plus, Trash2 } from "lucide-react";
import { ResumeCertificationsEditor } from "@/components/builder/ResumeCertificationsEditor";
import { ResumeEducationEditor } from "@/components/builder/ResumeEducationEditor";
import { ResumeExperienceEditor } from "@/components/builder/ResumeExperienceEditor";
import { ResumeLanguagesEditor } from "@/components/builder/ResumeLanguagesEditor";
import { ResumeLinksEditor } from "@/components/builder/ResumeLinksEditor";
import {
  builderHelperClassName,
  builderInputClassName,
  builderLabelClassName,
  builderSectionClassName,
} from "@/components/builder/builder-styles";
import { Button } from "@/components/ui/button";
import {
  useAddResumeSkill,
  useRemoveResumeSkill,
  useResumeAssetTitle,
  useResumeData,
  useSetResumePersonalField,
  useSetResumeSummary,
  useUpdateResumeSkill,
} from "@/lib/stores/resumeStore";
import { cn } from "@/lib/utils";

const personalFields = [
  { id: "fullName" as const, label: "Full Name", placeholder: "Alex Morgan" },
  {
    id: "professionalTitle" as const,
    label: "Professional Title",
    placeholder: "Senior Product Designer",
  },
  { id: "email" as const, label: "Email", placeholder: "alex@example.com" },
  { id: "phone" as const, label: "Phone", placeholder: "+1 (555) 123-4567" },
  { id: "location" as const, label: "Location", placeholder: "San Francisco, CA" },
  {
    id: "linkedin" as const,
    label: "LinkedIn",
    placeholder: "https://linkedin.com/in/yourprofile",
  },
  {
    id: "website" as const,
    label: "Website",
    placeholder: "https://yourwebsite.com",
  },
] as const;

export function ResumeEditor() {
  const data = useResumeData();
  const assetTitle = useResumeAssetTitle();
  const setPersonalField = useSetResumePersonalField();
  const setSummary = useSetResumeSummary();
  const addSkill = useAddResumeSkill();
  const updateSkill = useUpdateResumeSkill();
  const removeSkill = useRemoveResumeSkill();

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col">
      <div className="border-b border-white/[0.06] px-6 py-7 sm:px-8 sm:py-8">
        <h1 className="text-xl font-semibold tracking-tight text-white">
          {assetTitle.trim() || "Edit resume"}
        </h1>
        <p className={cn("mt-2", builderHelperClassName)}>
          Changes save to this workspace asset automatically as you type.
        </p>
      </div>

      <form
        className="flex flex-col gap-6 px-6 py-7 sm:gap-7 sm:px-8 sm:py-8"
        onSubmit={(event) => event.preventDefault()}
        aria-label="Resume builder form"
      >
        <section
          className={builderSectionClassName}
          aria-labelledby="personal-heading"
        >
          <h2 id="personal-heading" className={builderLabelClassName}>
            Personal Information
          </h2>
          <div className="mt-5 space-y-5">
            {personalFields.map(({ id, label, placeholder }) => (
              <div key={id} className="space-y-2">
                <label htmlFor={`resume-${id}`} className={builderLabelClassName}>
                  {label}
                </label>
                <input
                  id={`resume-${id}`}
                  type="text"
                  value={data.personal[id]}
                  onChange={(event) => setPersonalField(id, event.target.value)}
                  placeholder={placeholder}
                  className={builderInputClassName}
                />
              </div>
            ))}
          </div>
        </section>

        <section
          className={builderSectionClassName}
          aria-labelledby="summary-heading"
        >
          <h2 id="summary-heading" className={builderLabelClassName}>
            Professional Summary
          </h2>
          <div className="mt-5 space-y-2">
            <label htmlFor="resume-summary" className={builderLabelClassName}>
              Summary
            </label>
            <textarea
              id="resume-summary"
              value={data.summary}
              onChange={(event) => setSummary(event.target.value)}
              placeholder="Brief overview of your experience, strengths, and career focus."
              rows={5}
              className={cn(builderInputClassName, "min-h-[120px] resize-y")}
            />
          </div>
        </section>

        <ResumeExperienceEditor />

        <ResumeEducationEditor />

        <section
          className={builderSectionClassName}
          aria-labelledby="skills-heading"
        >
          <div className="flex items-center justify-between gap-3">
            <h2 id="skills-heading" className={builderLabelClassName}>
              Skills
            </h2>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addSkill}
              className="gap-1.5 border-white/10 bg-transparent text-zinc-300 hover:bg-white/5"
            >
              <Plus className="size-3.5" aria-hidden />
              Add skill
            </Button>
          </div>

          {data.skills.length === 0 ? (
            <p className={cn("mt-5", builderHelperClassName)}>
              No skills yet. Add your first skill to get started.
            </p>
          ) : (
            <ul className="mt-5 space-y-3">
              {data.skills.map((skill) => (
                <li key={skill.id} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={skill.name}
                    onChange={(event) => updateSkill(skill.id, event.target.value)}
                    placeholder="e.g. TypeScript"
                    aria-label="Skill name"
                    className={builderInputClassName}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    aria-label="Remove skill"
                    onClick={() => removeSkill(skill.id)}
                    className="shrink-0 text-zinc-500 hover:bg-red-500/10 hover:text-red-300"
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </section>

        <ResumeLanguagesEditor />

        <ResumeCertificationsEditor />

        <ResumeLinksEditor />
      </form>
    </div>
  );
}
