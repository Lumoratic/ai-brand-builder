"use client";

import { useEffect, useState } from "react";
import { ChevronDown, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectThumbnailUpload } from "@/components/builder/ProjectThumbnailUpload";
import { ImproveDescriptionButton } from "@/components/builder/ImproveDescriptionButton";
import {
  builderFocusRing,
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

const fieldLabel =
  "text-[11px] font-medium uppercase tracking-wider text-zinc-500";

function projectSummary(title: string): string {
  const trimmed = title.trim();
  return trimmed || "Untitled project";
}

export function ProjectsEditor() {
  const projects = useBuilderProjects();
  const addProject = useAddProject();
  const updateProject = useUpdateProject();
  const removeProject = useRemoveProject();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    if (projects.length === 0) {
      setExpandedId(null);
      return;
    }
    if (expandedId && !projects.some((p) => p.id === expandedId)) {
      setExpandedId(projects[projects.length - 1].id);
    }
  }, [projects, expandedId]);

  const activeId =
    expandedId && projects.some((p) => p.id === expandedId)
      ? expandedId
      : (projects[projects.length - 1]?.id ?? null);

  function handleAdd() {
    addProject();
  }

  function toggleProject(id: string) {
    setExpandedId((current) => (current === id ? null : id));
  }

  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className={builderLabelClassName}>Featured projects</span>
          <p className="mt-2 max-w-sm text-xs leading-relaxed text-zinc-500">
            Share work you&apos;d walk a client through — title, context, outcome,
            and a visual if you have one.
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={projects.length >= MAX_FEATURED_PROJECTS}
          className={cn(
            "shrink-0 gap-1.5 border-white/10 bg-transparent text-zinc-300 hover:bg-white/5 hover:text-white disabled:opacity-40",
            builderFocusRing
          )}
          onClick={handleAdd}
          aria-label="Add featured project"
        >
          <Plus className="size-3.5" />
          Add
        </Button>
      </div>

      {projects.length === 0 ? (
        <div className="rounded-xl border border-dashed border-white/[0.08] bg-white/[0.015] px-5 py-10">
          <p className="text-sm text-zinc-400">Nothing here yet</p>
          <p className="mt-2 text-xs leading-relaxed text-zinc-500">
            When you&apos;re ready, add a project you&apos;d proudly share in a
            client conversation.
          </p>
        </div>
      ) : (
        <ul className="space-y-2" role="list">
          {projects.map((project, index) => {
            const isExpanded = activeId === project.id;
            const panelId = `project-panel-${project.id}`;
            const headerId = `project-header-${project.id}`;

            return (
              <li
                key={project.id}
                className="overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.02]"
              >
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    id={headerId}
                    onClick={() => toggleProject(project.id)}
                    aria-expanded={isExpanded}
                    aria-controls={panelId}
                    className={cn(
                      "flex min-w-0 flex-1 items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-white/[0.02]",
                      builderFocusRing
                    )}
                  >
                    <ChevronDown
                      aria-hidden
                      className={cn(
                        "size-3.5 shrink-0 text-zinc-500 transition-transform duration-200 motion-reduce:transition-none",
                        isExpanded && "rotate-180"
                      )}
                    />
                    <span className="text-xs font-medium text-zinc-400">
                      Project {index + 1}
                    </span>
                    <span className="truncate text-xs text-zinc-500">
                      {projectSummary(project.title)}
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => removeProject(project.id)}
                    className={cn(
                      "mr-2 flex size-7 shrink-0 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-white/5 hover:text-red-400/90",
                      builderFocusRing
                    )}
                    aria-label={`Remove project ${index + 1}: ${projectSummary(project.title)}`}
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={headerId}
                  className={cn(
                    "grid transition-[grid-template-rows] duration-200 ease-out motion-reduce:transition-none",
                    isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="space-y-5 border-t border-white/[0.05] p-4">
                      <ProjectThumbnailUpload
                        thumbnailUrl={project.thumbnailUrl}
                        projectTitle={project.title}
                        onChange={(url) =>
                          updateProject(project.id, "thumbnailUrl", url)
                        }
                      />

                      <div className="space-y-2">
                        <label
                          className={fieldLabel}
                          htmlFor={`title-${project.id}`}
                        >
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
                        <div className="flex items-center justify-between gap-3">
                          <label
                            className={fieldLabel}
                            htmlFor={`desc-${project.id}`}
                          >
                            Description
                          </label>
                          <ImproveDescriptionButton
                            description={project.description}
                            onImprove={(value) =>
                              updateProject(project.id, "description", value)
                            }
                          />
                        </div>
                        <textarea
                          id={`desc-${project.id}`}
                          value={project.description}
                          onChange={(e) =>
                            updateProject(
                              project.id,
                              "description",
                              e.target.value
                            )
                          }
                          placeholder="What you built, your role, and the problem you solved."
                          rows={3}
                          className={cn(
                            builderInputClassName,
                            "resize-none leading-relaxed"
                          )}
                        />
                      </div>

                      <div className="space-y-2">
                        <label
                          className={fieldLabel}
                          htmlFor={`outcome-${project.id}`}
                        >
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
                        <p className="text-[11px] text-zinc-500">
                          Optional — a result, metric, or takeaway
                        </p>
                      </div>

                      <div className="space-y-2">
                        <label
                          className={fieldLabel}
                          htmlFor={`stack-${project.id}`}
                        >
                          Tech stack
                        </label>
                        <input
                          id={`stack-${project.id}`}
                          type="text"
                          value={project.techStack}
                          onChange={(e) =>
                            updateProject(
                              project.id,
                              "techStack",
                              e.target.value
                            )
                          }
                          placeholder="Figma, React, Next.js"
                          className={builderInputClassName}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
