"use client";

import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectThumbnailUpload } from "@/components/builder/ProjectThumbnailUpload";
import {
  builderInputClassName,
  builderLabelClassName,
} from "@/components/builder/builder-styles";
import {
  MAX_FEATURED_PROJECTS,
  useAddProject,
  useBuilderProjects,
  useRemoveProject,
  useUpdateProject,
} from "@/lib/stores/builderStore";
import { cn } from "@/lib/utils";

const fieldLabel = "text-[11px] font-medium uppercase tracking-wider text-zinc-600";

export function ProjectsEditor() {
  const projects = useBuilderProjects();
  const addProject = useAddProject();
  const updateProject = useUpdateProject();
  const removeProject = useRemoveProject();

  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className={builderLabelClassName}>Featured projects</span>
          <p className="mt-2 max-w-sm text-xs leading-relaxed text-zinc-600">
            Share work you&apos;d walk a client through — title, context, outcome,
            and a visual if you have one.
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={projects.length >= MAX_FEATURED_PROJECTS}
          className="shrink-0 gap-1.5 border-white/10 bg-transparent text-zinc-300 hover:bg-white/5 hover:text-white disabled:opacity-40"
          onClick={addProject}
        >
          <Plus className="size-3.5" />
          Add
        </Button>
      </div>

      {projects.length === 0 ? (
        <div className="rounded-xl border border-dashed border-white/[0.08] bg-white/[0.015] px-5 py-10">
          <p className="text-sm text-zinc-500">Nothing here yet</p>
          <p className="mt-2 text-xs leading-relaxed text-zinc-600">
            When you&apos;re ready, add a project you&apos;d proudly share in a
            client conversation.
          </p>
        </div>
      ) : (
        <ul className="space-y-5">
          {projects.map((project, index) => (
            <li
              key={project.id}
              className="overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.02]"
            >
              <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
                <span className="text-xs font-medium text-zinc-500">
                  Project {index + 1}
                </span>
                <button
                  type="button"
                  onClick={() => removeProject(project.id)}
                  className="flex size-7 items-center justify-center rounded-lg text-zinc-600 transition-colors hover:bg-white/5 hover:text-red-400/90"
                  aria-label={`Remove project ${index + 1}`}
                >
                  <Trash2 className="size-3.5" />
                </button>
              </div>

              <div className="space-y-5 p-4">
                <ProjectThumbnailUpload
                  thumbnailUrl={project.thumbnailUrl}
                  projectTitle={project.title}
                  onChange={(url) =>
                    updateProject(project.id, "thumbnailUrl", url)
                  }
                />

                <div className="space-y-2">
                  <label className={fieldLabel} htmlFor={`title-${project.id}`}>
                    Title
                  </label>
                  <input
                    id={`title-${project.id}`}
                    type="text"
                    value={project.title}
                    onChange={(e) =>
                      updateProject(project.id, "title", e.target.value)
                    }
                    placeholder="Brand refresh for a fintech startup"
                    className={builderInputClassName}
                  />
                </div>

                <div className="space-y-2">
                  <label className={fieldLabel} htmlFor={`desc-${project.id}`}>
                    Description
                  </label>
                  <textarea
                    id={`desc-${project.id}`}
                    value={project.description}
                    onChange={(e) =>
                      updateProject(project.id, "description", e.target.value)
                    }
                    placeholder="What you built, your role, and the problem you solved."
                    rows={3}
                    className={cn(builderInputClassName, "resize-none leading-relaxed")}
                  />
                </div>

                <div className="space-y-2">
                  <label className={fieldLabel} htmlFor={`outcome-${project.id}`}>
                    Outcome
                  </label>
                  <input
                    id={`outcome-${project.id}`}
                    type="text"
                    value={project.outcome}
                    onChange={(e) =>
                      updateProject(project.id, "outcome", e.target.value)
                    }
                    placeholder="Increased sign-ups 40% · Shipped in 6 weeks"
                    className={builderInputClassName}
                  />
                  <p className="text-[11px] text-zinc-700">
                    Optional — a result, metric, or takeaway
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className={fieldLabel} htmlFor={`stack-${project.id}`}>
                      Tech stack
                    </label>
                    <input
                      id={`stack-${project.id}`}
                      type="text"
                      value={project.techStack}
                      onChange={(e) =>
                        updateProject(project.id, "techStack", e.target.value)
                      }
                      placeholder="Figma, React, Next.js"
                      className={builderInputClassName}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className={fieldLabel} htmlFor={`link-${project.id}`}>
                      Link
                    </label>
                    <input
                      id={`link-${project.id}`}
                      type="url"
                      value={project.link}
                      onChange={(e) =>
                        updateProject(project.id, "link", e.target.value)
                      }
                      placeholder="https://…"
                      className={builderInputClassName}
                    />
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
