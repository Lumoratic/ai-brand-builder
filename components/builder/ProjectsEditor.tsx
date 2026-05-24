"use client";

import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
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

export function ProjectsEditor() {
  const projects = useBuilderProjects();
  const addProject = useAddProject();
  const updateProject = useUpdateProject();
  const removeProject = useRemoveProject();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <span className={builderLabelClassName}>Featured projects</span>
          <p className="mt-1.5 text-xs text-zinc-600">
            Up to {MAX_FEATURED_PROJECTS} real projects for your portfolio.
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
        <div className="rounded-xl border border-dashed border-white/[0.08] bg-white/[0.02] px-4 py-8 text-center">
          <p className="text-sm text-zinc-500">No projects yet</p>
          <p className="mt-1 text-xs text-zinc-600">
            Add work you&apos;re proud to showcase.
          </p>
        </div>
      ) : (
        <ul className="space-y-4">
          {projects.map((project, index) => (
            <li
              key={project.id}
              className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="text-xs font-medium text-zinc-500">
                  Project {index + 1}
                </span>
                <button
                  type="button"
                  onClick={() => removeProject(project.id)}
                  className="flex size-7 items-center justify-center rounded-lg text-zinc-600 transition-colors hover:bg-white/5 hover:text-red-400"
                  aria-label={`Remove project ${index + 1}`}
                >
                  <Trash2 className="size-3.5" />
                </button>
              </div>
              <div className="space-y-3">
                <input
                  type="text"
                  value={project.title}
                  onChange={(e) =>
                    updateProject(project.id, "title", e.target.value)
                  }
                  placeholder="Project title"
                  className={builderInputClassName}
                />
                <textarea
                  value={project.description}
                  onChange={(e) =>
                    updateProject(project.id, "description", e.target.value)
                  }
                  placeholder="Short description of the project and your role"
                  rows={3}
                  className={cn(builderInputClassName, "resize-none leading-relaxed")}
                />
                <input
                  type="url"
                  value={project.link}
                  onChange={(e) =>
                    updateProject(project.id, "link", e.target.value)
                  }
                  placeholder="https://project-link.com (optional)"
                  className={builderInputClassName}
                />
                <input
                  type="text"
                  value={project.techStack}
                  onChange={(e) =>
                    updateProject(project.id, "techStack", e.target.value)
                  }
                  placeholder="React, Figma, Node.js (optional)"
                  className={builderInputClassName}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
