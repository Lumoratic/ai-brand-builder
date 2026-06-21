import type { ResumeAssetData } from "@/lib/assets/resume-data";
import { ResumePdfBody } from "@/components/resume/ResumePdfBody";
import { getPdfTemplateStyles } from "@/lib/resume/pdf-template-styles";
import { resolveResumeRenderSettings } from "@/lib/resume/resume-templates";

type ResumePdfDocumentProps = {
  data: ResumeAssetData;
};

export function ResumePdfDocument({ data }: ResumePdfDocumentProps) {
  const { templateId, density } = resolveResumeRenderSettings(
    data.templateId,
    data.density
  );
  const styles = getPdfTemplateStyles(templateId, density);

  return <ResumePdfBody data={data} styles={styles} />;
}
