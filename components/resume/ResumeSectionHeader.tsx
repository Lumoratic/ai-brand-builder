import { Text, View } from "@react-pdf/renderer";
import type { ResumePdfTemplateStyles } from "@/lib/resume/pdf-template-styles";
import type { ResumePreviewTemplateClasses } from "@/lib/resume/preview-template-styles";
import { ModernPdfIcon } from "@/components/resume/ModernPdfIcon";
import {
  RESUME_SECTION_HEADER_ICON_COLOR,
  RESUME_SECTION_HEADER_ICON_SIZE_PT,
  resumeSectionShowsPdfIcon,
} from "@/lib/resume/resume-section-header";
import {
  RESUME_MODERN_SECTION_ICONS,
  type ResumeModernSectionId,
} from "@/lib/resume/resume-modern-icons";

type ResumeSectionHeaderBaseProps = {
  sectionId: ResumeModernSectionId;
  title: string;
};

type ResumeSectionHeaderPreviewProps = ResumeSectionHeaderBaseProps & {
  mode: "preview";
  classes: ResumePreviewTemplateClasses;
};

type ResumeSectionHeaderPdfProps = ResumeSectionHeaderBaseProps & {
  mode: "pdf";
  styles: ResumePdfTemplateStyles;
};

export type ResumeSectionHeaderProps =
  | ResumeSectionHeaderPreviewProps
  | ResumeSectionHeaderPdfProps;

export function ResumeSectionHeader(props: ResumeSectionHeaderProps) {
  const { sectionId, title } = props;

  if (props.mode === "preview") {
    const { classes } = props;

    if (classes.layout !== "modern") {
      return <h2 className={classes.sectionTitle}>{title}</h2>;
    }

    const SectionIcon = RESUME_MODERN_SECTION_ICONS[sectionId];

    return (
      <div className={classes.sectionTitleRow}>
        <SectionIcon className={classes.sectionIcon} aria-hidden />
        <h2 className={classes.sectionTitle}>{title}</h2>
      </div>
    );
  }

  const { styles } = props;

  if (styles.layout !== "modern" || !resumeSectionShowsPdfIcon(sectionId)) {
    return <Text style={styles.sectionTitle}>{title}</Text>;
  }

  return (
    <View style={styles.sectionTitleRow}>
      <View style={styles.sectionIcon}>
        <ModernPdfIcon
          id={sectionId}
          size={RESUME_SECTION_HEADER_ICON_SIZE_PT}
          color={RESUME_SECTION_HEADER_ICON_COLOR}
        />
      </View>
      <Text style={[styles.sectionTitle, styles.sectionTitlePlain]}>
        {title}
      </Text>
    </View>
  );
}
