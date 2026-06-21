import { Circle, Line, Path, Rect, Svg } from "@react-pdf/renderer";

export type ModernPdfIconName =
  | "summary"
  | "experience"
  | "education"
  | "skills"
  | "languages"
  | "links";

type ModernPdfIconProps = {
  name: ModernPdfIconName;
  size?: number;
  color?: string;
};

const DEFAULT_COLOR = "#2563eb";

function strokeProps(color: string) {
  return {
    stroke: color,
    strokeWidth: 2,
    fill: "none",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
}

function SummaryIcon({ size, color }: { size: number; color: string }) {
  const stroke = strokeProps(color);

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"
        {...stroke}
      />
      <Path d="M14 2v5a1 1 0 0 0 1 1h5" {...stroke} />
      <Path d="M10 9H8" {...stroke} />
      <Path d="M16 13H8" {...stroke} />
      <Path d="M16 17H8" {...stroke} />
    </Svg>
  );
}

function ExperienceIcon({ size, color }: { size: number; color: string }) {
  const stroke = strokeProps(color);

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" {...stroke} />
      <Rect x="2" y="6" width="20" height="14" rx="2" {...stroke} />
    </Svg>
  );
}

function EducationIcon({ size, color }: { size: number; color: string }) {
  const stroke = strokeProps(color);

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"
        {...stroke}
      />
      <Path d="M22 10v6" {...stroke} />
      <Path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" {...stroke} />
    </Svg>
  );
}

function SkillsIcon({ size, color }: { size: number; color: string }) {
  const stroke = strokeProps(color);

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z"
        {...stroke}
      />
    </Svg>
  );
}

function LanguagesIcon({ size, color }: { size: number; color: string }) {
  const stroke = strokeProps(color);

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="m5 8 6 6" {...stroke} />
      <Path d="m4 14 6-6 2-3" {...stroke} />
      <Path d="M2 5h12" {...stroke} />
      <Path d="M7 2h1" {...stroke} />
      <Path d="m22 22-5-10-5 10" {...stroke} />
      <Path d="M14 18h6" {...stroke} />
    </Svg>
  );
}

function LinksIcon({ size, color }: { size: number; color: string }) {
  const stroke = strokeProps(color);

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M9 17H7A5 5 0 0 1 7 7h2" {...stroke} />
      <Path d="M15 7h2a5 5 0 1 1 0 10h-2" {...stroke} />
      <Line x1="8" x2="16" y1="12" y2="12" {...stroke} />
    </Svg>
  );
}

export function ModernPdfIcon({
  name,
  size = 14,
  color = DEFAULT_COLOR,
}: ModernPdfIconProps) {
  switch (name) {
    case "summary":
      return <SummaryIcon size={size} color={color} />;
    case "experience":
      return <ExperienceIcon size={size} color={color} />;
    case "education":
      return <EducationIcon size={size} color={color} />;
    case "skills":
      return <SkillsIcon size={size} color={color} />;
    case "languages":
      return <LanguagesIcon size={size} color={color} />;
    case "links":
      return <LinksIcon size={size} color={color} />;
    default:
      return null;
  }
}
