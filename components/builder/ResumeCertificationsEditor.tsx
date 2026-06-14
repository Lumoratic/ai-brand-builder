"use client";

import { Plus, Trash2 } from "lucide-react";
import {
  builderHelperClassName,
  builderInputClassName,
  builderLabelClassName,
  builderSectionClassName,
} from "@/components/builder/builder-styles";
import { Button } from "@/components/ui/button";
import type { ResumeCertification } from "@/lib/assets/resume-data";
import {
  useAddResumeCertification,
  useRemoveResumeCertification,
  useResumeData,
  useUpdateResumeCertification,
} from "@/lib/stores/resumeStore";

type CertificationField = keyof Omit<ResumeCertification, "id">;

type CertificationEntryProps = {
  entry: ResumeCertification;
  onUpdate: (
    id: string,
    field: CertificationField,
    value: ResumeCertification[CertificationField]
  ) => void;
  onRemove: (id: string) => void;
};

function CertificationEntry({ entry, onUpdate, onRemove }: CertificationEntryProps) {
  const label = entry.name.trim() || "Certification entry";

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
          <label
            htmlFor={`certification-name-${entry.id}`}
            className={builderLabelClassName}
          >
            Certificate Name
          </label>
          <input
            id={`certification-name-${entry.id}`}
            type="text"
            value={entry.name}
            onChange={(event) => onUpdate(entry.id, "name", event.target.value)}
            placeholder="AWS Certified Solutions Architect"
            className={builderInputClassName}
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor={`certification-issuer-${entry.id}`}
            className={builderLabelClassName}
          >
            Issuer
          </label>
          <input
            id={`certification-issuer-${entry.id}`}
            type="text"
            value={entry.issuer}
            onChange={(event) => onUpdate(entry.id, "issuer", event.target.value)}
            placeholder="Amazon Web Services"
            className={builderInputClassName}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor={`certification-date-${entry.id}`} className={builderLabelClassName}>
            Date
          </label>
          <input
            id={`certification-date-${entry.id}`}
            type="text"
            value={entry.date}
            onChange={(event) => onUpdate(entry.id, "date", event.target.value)}
            placeholder="Mar 2024"
            className={builderInputClassName}
          />
        </div>
      </div>
    </li>
  );
}

export function ResumeCertificationsEditor() {
  const data = useResumeData();
  const addCertification = useAddResumeCertification();
  const updateCertification = useUpdateResumeCertification();
  const removeCertification = useRemoveResumeCertification();

  return (
    <section
      className={builderSectionClassName}
      aria-labelledby="certifications-heading"
    >
      <div className="flex items-center justify-between gap-3">
        <h2 id="certifications-heading" className={builderLabelClassName}>
          Certifications
        </h2>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addCertification}
          className="gap-1.5 border-white/10 bg-transparent text-zinc-300 hover:bg-white/5"
        >
          <Plus className="size-3.5" aria-hidden />
          Add Certification
        </Button>
      </div>

      {data.certifications.length === 0 ? (
        <p className={`mt-5 ${builderHelperClassName}`}>
          No certifications added yet.
        </p>
      ) : (
        <ul className="mt-5 space-y-4">
          {data.certifications.map((entry) => (
            <CertificationEntry
              key={entry.id}
              entry={entry}
              onUpdate={updateCertification}
              onRemove={removeCertification}
            />
          ))}
        </ul>
      )}
    </section>
  );
}
