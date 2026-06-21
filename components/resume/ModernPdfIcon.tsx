import { Circle, Line, Path, Rect, Svg } from "@react-pdf/renderer";
import {
  RESUME_MODERN_ACCENT,
  RESUME_MODERN_ICON_NODES,
  type ResumeModernIconNode,
  type ResumeModernSectionId,
} from "@/lib/resume/resume-modern-icons";
import { RESUME_SECTION_HEADER_ICON_SIZE_PT } from "@/lib/resume/resume-section-header";

type ModernPdfIconProps = {
  id: ResumeModernSectionId;
  size?: number;
  color?: string;
};

function strokeProps(color: string) {
  return {
    stroke: color,
    strokeWidth: 2,
    fill: "none",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
}

function renderIconNode(node: ResumeModernIconNode, color: string, index: number) {
  const stroke = strokeProps(color);
  const [type, attrs] = node;

  switch (type) {
    case "path":
      return <Path key={index} d={attrs.d} {...stroke} />;
    case "rect":
      return (
        <Rect
          key={index}
          x={attrs.x}
          y={attrs.y}
          width={attrs.width}
          height={attrs.height}
          rx={attrs.rx}
          {...stroke}
        />
      );
    case "circle":
      return (
        <Circle key={index} cx={attrs.cx} cy={attrs.cy} r={attrs.r} {...stroke} />
      );
    case "line":
      return (
        <Line
          key={index}
          x1={attrs.x1}
          y1={attrs.y1}
          x2={attrs.x2}
          y2={attrs.y2}
          {...stroke}
        />
      );
  }
}

export function ModernPdfIcon({
  id,
  size = RESUME_SECTION_HEADER_ICON_SIZE_PT,
  color = RESUME_MODERN_ACCENT,
}: ModernPdfIconProps) {
  const nodes = RESUME_MODERN_ICON_NODES[id];

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      {nodes.map((node, index) => renderIconNode(node, color, index))}
    </Svg>
  );
}
