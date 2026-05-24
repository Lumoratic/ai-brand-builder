"use client";

import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { AvatarUpload } from "@/components/builder/AvatarUpload";
import { ProjectsEditor } from "@/components/builder/ProjectsEditor";
import {
  builderInputClassName,
  builderLabelClassName,
} from "@/components/builder/builder-styles";
import { Button } from "@/components/ui/button";
import {
  useBuilderProfile,
  useResetProfile,
  useSetField,
} from "@/lib/stores/builderStore";
import { cn } from "@/lib/utils";

const fields = [
  {
    id: "fullName" as const,
    label: "Full Name",
    placeholder: "Alex Morgan",
    type: "text",
  },
  {
    id: "jobTitle" as const,
    label: "Job Title",
    placeholder: "Senior Product Designer",
    type: "text",
  },
  {
    id: "headline" as const,
    label: "Headline / Tagline",
    placeholder: "Designing products that feel inevitable.",
    type: "text",
  },
] as const;

export function FormPanel() {
  const profile = useBuilderProfile();
  const setField = useSetField();
  const resetProfile = useResetProfile();
  const router = useRouter();

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-white/[0.06] px-6 py-8 sm:px-8">
        <h1 className="text-xl font-semibold tracking-tight text-white">
          Build your portfolio
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-zinc-500">
          Fill in your details. The preview updates instantly as you type.
        </p>
      </div>

      <form
        className="flex flex-1 flex-col gap-8 overflow-y-auto px-6 py-8 sm:px-8"
        onSubmit={(e) => e.preventDefault()}
      >
        <AvatarUpload
          fullName={profile.fullName}
          avatarUrl={profile.avatarUrl}
        />

        {fields.map((field) => (
          <div key={field.id} className="space-y-2.5">
            <label htmlFor={field.id} className={builderLabelClassName}>
              {field.label}
            </label>
            <input
              id={field.id}
              type={field.type}
              value={profile[field.id]}
              onChange={(e) => setField(field.id, e.target.value)}
              placeholder={field.placeholder}
              className={builderInputClassName}
              autoComplete="off"
            />
          </div>
        ))}

        <div className="space-y-2.5">
          <label htmlFor="bio" className={builderLabelClassName}>
            Short Bio
          </label>
          <textarea
            id="bio"
            value={profile.bio}
            onChange={(e) => setField("bio", e.target.value)}
            placeholder="A brief introduction about your work, passions, and what you're looking for next."
            rows={5}
            className={cn(builderInputClassName, "resize-none leading-relaxed")}
          />
        </div>

        <ProjectsEditor />

        <div className="space-y-2.5">
          <label htmlFor="skills" className={builderLabelClassName}>
            Skills
          </label>
          <input
            id="skills"
            type="text"
            value={profile.skills}
            onChange={(e) => setField("skills", e.target.value)}
            placeholder="Figma, React, User Research, Design Systems"
            className={builderInputClassName}
            autoComplete="off"
          />
          <p className="text-xs text-zinc-600">Separate skills with commas</p>
        </div>

        <div className="mt-auto space-y-3 border-t border-white/[0.06] pt-6">
          <Button
            type="button"
            className="w-full gap-2 rounded-xl bg-white text-zinc-900 hover:bg-zinc-100"
            onClick={() => router.push("/portfolio/demo")}
          >
            Generate Portfolio
            <ArrowRight className="size-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            className="w-full border-white/10 bg-transparent text-zinc-300 hover:bg-white/5 hover:text-white"
            onClick={resetProfile}
          >
            Clear form
          </Button>
        </div>
      </form>
    </div>
  );
}
