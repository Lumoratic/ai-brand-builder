"use client";

import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { AvatarUpload } from "@/components/builder/AvatarUpload";
import { ProjectsEditor } from "@/components/builder/ProjectsEditor";
import { PublishSettings } from "@/components/builder/PublishSettings";
import {
  builderFocusRing,
  builderHelperClassName,
  builderInputClassName,
  builderLabelClassName,
  builderSectionClassName,
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
      <div className="border-b border-white/[0.06] px-6 py-7 sm:px-8 sm:py-8">
        <h1 className="text-xl font-semibold tracking-tight text-white">
          Build your portfolio
        </h1>
        <p className={cn("mt-2", builderHelperClassName)}>
          Fill in your details. The preview updates instantly as you type.
        </p>
      </div>

      <form
        className="flex flex-1 flex-col gap-6 overflow-y-auto px-6 py-7 sm:gap-7 sm:px-8 sm:py-8"
        onSubmit={(e) => e.preventDefault()}
        aria-label="Portfolio builder form"
      >
        <section className={builderSectionClassName} aria-labelledby="profile-heading">
          <h2 id="profile-heading" className={builderLabelClassName}>
            Profile
          </h2>
          <div className="space-y-5">
            <AvatarUpload
              fullName={profile.fullName}
              avatarUrl={profile.avatarUrl}
            />
            {fields.map((field) => (
              <div key={field.id} className="space-y-2">
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
          </div>
        </section>

        <section className={builderSectionClassName} aria-labelledby="about-heading">
          <h2 id="about-heading" className={builderLabelClassName}>
            About
          </h2>
          <div className="space-y-2">
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
        </section>

        <section className={builderSectionClassName} aria-labelledby="projects-heading">
          <h2 id="projects-heading" className="sr-only">
            Featured projects
          </h2>
          <ProjectsEditor />
        </section>

        <section className={builderSectionClassName} aria-labelledby="skills-heading">
          <h2 id="skills-heading" className={builderLabelClassName}>
            Skills
          </h2>
          <div className="space-y-2">
            <label htmlFor="skills" className="sr-only">
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
            <p className={builderHelperClassName}>Separate skills with commas</p>
          </div>
        </section>

        <PublishSettings />

        <div className="mt-auto space-y-3 border-t border-white/[0.06] pt-6">
          <Button
            type="button"
            className={cn(
              "w-full gap-2 rounded-xl bg-white text-zinc-900 hover:bg-zinc-100",
              builderFocusRing
            )}
            onClick={() => router.push("/portfolio/demo")}
          >
            Generate Portfolio
            <ArrowRight className="size-4" aria-hidden />
          </Button>
          <Button
            type="button"
            variant="outline"
            className={cn(
              "w-full border-white/10 bg-transparent text-zinc-300 hover:bg-white/5 hover:text-white",
              builderFocusRing
            )}
            onClick={resetProfile}
          >
            Clear form
          </Button>
        </div>
      </form>
    </div>
  );
}
