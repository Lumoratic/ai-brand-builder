import type { LucideIcon } from "lucide-react";
import {
  Award,
  Briefcase,
  FileText,
  GraduationCap,
  Languages,
  Link2,
  Mail,
  MapPin,
  Phone,
  Wrench,
} from "lucide-react";

export const RESUME_MODERN_ACCENT = "#2563eb";
export const RESUME_MODERN_NEUTRAL_ICON = "#52525b";
export const RESUME_MODERN_ENTRY_DOT = "#18181b";

/** Preview uses 18px icons; PDF uses the same numeric size in points for parity. */
export const RESUME_MODERN_SECTION_ICON_PREVIEW_PX = 18;

export type ResumeModernSectionId =
  | "summary"
  | "experience"
  | "education"
  | "skills"
  | "languages"
  | "certifications"
  | "links";

export type ResumeModernContactIconId = "email" | "phone" | "location";

export type ResumeModernIconId =
  | ResumeModernSectionId
  | ResumeModernContactIconId;

type IconNodePath = ["path", { d: string }];
type IconNodeRect = [
  "rect",
  { x: string; y: string; width: string; height: string; rx?: string },
];
type IconNodeCircle = ["circle", { cx: string; cy: string; r: string }];
type IconNodeLine = [
  "line",
  { x1: string; x2: string; y1: string; y2: string },
];

export type ResumeModernIconNode =
  | IconNodePath
  | IconNodeRect
  | IconNodeCircle
  | IconNodeLine;

export const RESUME_MODERN_SECTION_ICONS: Record<
  ResumeModernSectionId,
  LucideIcon
> = {
  summary: FileText,
  experience: Briefcase,
  education: GraduationCap,
  skills: Wrench,
  languages: Languages,
  certifications: Award,
  links: Link2,
};

export const RESUME_MODERN_CONTACT_ICONS: Record<
  ResumeModernContactIconId,
  LucideIcon
> = {
  email: Mail,
  phone: Phone,
  location: MapPin,
};

/** Lucide stroke paths for PDF rendering (24×24 viewBox). */
export const RESUME_MODERN_ICON_NODES: Record<
  ResumeModernIconId,
  ResumeModernIconNode[]
> = {
  summary: [
    [
      "path",
      {
        d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
      },
    ],
    ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5" }],
    ["path", { d: "M10 9H8" }],
    ["path", { d: "M16 13H8" }],
    ["path", { d: "M16 17H8" }],
  ],
  experience: [
    ["path", { d: "M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" }],
    ["rect", { x: "2", y: "6", width: "20", height: "14", rx: "2" }],
  ],
  education: [
    [
      "path",
      {
        d: "M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z",
      },
    ],
    ["path", { d: "M22 10v6" }],
    ["path", { d: "M6 12.5V16a6 3 0 0 0 12 0v-3.5" }],
  ],
  skills: [
    [
      "path",
      {
        d: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z",
      },
    ],
  ],
  languages: [
    ["path", { d: "m5 8 6 6" }],
    ["path", { d: "m4 14 6-6 2-3" }],
    ["path", { d: "M2 5h12" }],
    ["path", { d: "M7 2h1" }],
    ["path", { d: "m22 22-5-10-5 10" }],
    ["path", { d: "M14 18h6" }],
  ],
  certifications: [
    [
      "path",
      {
        d: "m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",
      },
    ],
    ["circle", { cx: "12", cy: "8", r: "6" }],
  ],
  links: [
    ["path", { d: "M9 17H7A5 5 0 0 1 7 7h2" }],
    ["path", { d: "M15 7h2a5 5 0 1 1 0 10h-2" }],
    ["line", { x1: "8", x2: "16", y1: "12", y2: "12" }],
  ],
  email: [
    ["path", { d: "m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" }],
    ["rect", { x: "2", y: "4", width: "20", height: "16", rx: "2" }],
  ],
  phone: [
    [
      "path",
      {
        d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
      },
    ],
  ],
  location: [
    [
      "path",
      {
        d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
      },
    ],
    ["circle", { cx: "12", cy: "10", r: "3" }],
  ],
};

export function isResumeModernContactIconId(
  key: string
): key is ResumeModernContactIconId {
  return key === "email" || key === "phone" || key === "location";
}
