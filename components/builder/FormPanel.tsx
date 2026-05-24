"use client";

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
] as const;

const inputClassName = cn(
  "w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3",
  "text-sm text-white placeholder:text-zinc-600",
  "outline-none transition-[border-color,box-shadow,background-color] duration-200",
  "focus:border-violet-500/40 focus:bg-white/[0.05] focus:ring-2 focus:ring-violet-500/20"
);

export function FormPanel() {
  const profile = useBuilderProfile();
  const setField = useSetField();
  const resetProfile = useResetProfile();

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
        {fields.map((field) => (
          <div key={field.id} className="space-y-2.5">
            <label
              htmlFor={field.id}
              className="block text-xs font-medium uppercase tracking-wider text-zinc-500"
            >
              {field.label}
            </label>
            <input
              id={field.id}
              type={field.type}
              value={profile[field.id]}
              onChange={(e) => setField(field.id, e.target.value)}
              placeholder={field.placeholder}
              className={inputClassName}
              autoComplete="off"
            />
          </div>
        ))}

        <div className="space-y-2.5">
          <label
            htmlFor="bio"
            className="block text-xs font-medium uppercase tracking-wider text-zinc-500"
          >
            Short Bio
          </label>
          <textarea
            id="bio"
            value={profile.bio}
            onChange={(e) => setField("bio", e.target.value)}
            placeholder="A brief introduction about your work, passions, and what you're looking for next."
            rows={5}
            className={cn(inputClassName, "resize-none leading-relaxed")}
          />
        </div>

        <div className="space-y-2.5">
          <label
            htmlFor="skills"
            className="block text-xs font-medium uppercase tracking-wider text-zinc-500"
          >
            Skills
          </label>
          <input
            id="skills"
            type="text"
            value={profile.skills}
            onChange={(e) => setField("skills", e.target.value)}
            placeholder="Figma, React, User Research, Design Systems"
            className={inputClassName}
            autoComplete="off"
          />
          <p className="text-xs text-zinc-600">Separate skills with commas</p>
        </div>

        <div className="mt-auto border-t border-white/[0.06] pt-6">
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
