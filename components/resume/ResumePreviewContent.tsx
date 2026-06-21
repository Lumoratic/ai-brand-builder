import type { ResumeAssetData } from "@/lib/assets/resume-data";
import { ResumePreviewBody } from "@/components/resume/ResumePreviewBody";
import { getPreviewTemplateClasses } from "@/lib/resume/preview-template-styles";
import { resolveResumeRenderSettings } from "@/lib/resume/resume-templates";

type ResumePreviewContentProps = {
  data: ResumeAssetData;
  className?: string;
};

export function ResumePreviewContent({ data, className }: ResumePreviewContentProps) {
  const { templateId, density } = resolveResumeRenderSettings(
    data.templateId,
    data.density
  );
  const classes = getPreviewTemplateClasses(templateId, density);

  return (
    <ResumePreviewBody data={data} classes={classes} className={className} />
  );
}
