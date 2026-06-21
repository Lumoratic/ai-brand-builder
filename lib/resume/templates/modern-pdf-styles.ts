import { StyleSheet } from "@react-pdf/renderer";
import type { ResumePdfLayout } from "@/lib/resume/templates/pdf-types";

const ACCENT = "#2563eb";
const ZINC_200 = "#e4e4e7";
const ZINC_100 = "#f4f4f5";
const ZINC_600 = "#52525b";
const ZINC_500 = "#71717a";
const ZINC_700 = "#3f3f46";
const ZINC_900 = "#18181b";
const ENTRY_DOT = "#18181b";

function withLayout<T extends Record<string, unknown>>(
  layout: ResumePdfLayout,
  styles: T
) {
  return { layout, ...styles } as T & { layout: ResumePdfLayout };
}

const modernShared = {
  sectionTitleRow: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
  },
  sectionTitlePlain: {
    borderBottomWidth: 0,
    paddingBottom: 0,
    marginBottom: 0,
  },
  sectionIcon: {},
  contactLineRow: {},
  contactItem: {},
  contactIcon: {},
  contactText: {},
  entryTitleRow: {
    flexDirection: "row" as const,
    alignItems: "flex-start" as const,
  },
  entryDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: ENTRY_DOT,
    marginTop: 3,
    marginRight: 8,
  },
  entryTitleInRow: {
    flex: 1,
  },
};

export function createModernProfessionalDensityPdfStyles() {
  return withLayout(
    "modern",
    StyleSheet.create({
      page: {
        paddingTop: 40,
        paddingBottom: 40,
        paddingHorizontal: 48,
        fontFamily: "Helvetica",
        fontSize: 10.5,
        color: ZINC_700,
        lineHeight: 1.55,
      },
      header: {
        borderBottomWidth: 1,
        borderBottomColor: ZINC_200,
        paddingBottom: 18,
        marginBottom: 10,
      },
      name: {
        fontSize: 28,
        fontFamily: "Helvetica-Bold",
        color: ACCENT,
        lineHeight: 1.05,
      },
      title: {
        marginTop: 8,
        fontSize: 13,
        color: ZINC_600,
      },
      contactLine: {
        marginTop: 12,
        fontSize: 10,
        color: ZINC_600,
        lineHeight: 1.45,
      },
      ...modernShared,
      section: {
        marginTop: 18,
      },
      sectionTitleRow: {
        ...modernShared.sectionTitleRow,
        borderBottomWidth: 1,
        borderBottomColor: ZINC_200,
        paddingBottom: 4,
        marginBottom: 8,
      },
      sectionTitle: {
        fontSize: 13,
        fontFamily: "Helvetica-Bold",
        color: ACCENT,
        letterSpacing: 1,
        textTransform: "uppercase",
        borderBottomWidth: 1,
        borderBottomColor: ZINC_200,
        paddingBottom: 4,
        marginBottom: 8,
      },
      bodyText: {
        fontSize: 10.5,
        color: ZINC_700,
        lineHeight: 1.65,
      },
      entry: {
        marginBottom: 20,
        paddingBottom: 18,
        borderBottomWidth: 1,
        borderBottomColor: ZINC_100,
      },
      entryLast: {
        marginBottom: 0,
        paddingBottom: 0,
        borderBottomWidth: 0,
      },
      entryTitle: {
        fontSize: 11.5,
        fontFamily: "Helvetica-Bold",
        color: ZINC_900,
        lineHeight: 1.3,
      },
      entrySubtitle: {
        marginTop: 5,
        fontSize: 10.5,
        color: ZINC_600,
      },
      metaLine: {
        marginTop: 6,
        fontSize: 8.5,
        color: ZINC_500,
      },
      description: {
        marginTop: 8,
        fontSize: 10.5,
        color: ZINC_700,
        lineHeight: 1.65,
      },
      skillsRow: {
        flexDirection: "row",
        flexWrap: "wrap",
      },
      skillChip: {
        borderWidth: 1,
        borderColor: ZINC_200,
        backgroundColor: "#fafafa",
        borderRadius: 3,
        paddingVertical: 3,
        paddingHorizontal: 7,
        marginRight: 6,
        marginBottom: 6,
      },
      skillText: {
        fontSize: 9.5,
        color: ZINC_600,
      },
      listItem: {
        marginBottom: 5,
        fontSize: 10.5,
        color: ZINC_700,
        lineHeight: 1.55,
      },
      listItemLast: {
        marginBottom: 0,
      },
      linkItem: {
        marginBottom: 0,
        paddingTop: 4,
        paddingBottom: 4,
      },
      linkItemLast: {
        marginBottom: 0,
      },
      linkLabel: {
        fontFamily: "Helvetica-Bold",
        color: ZINC_900,
      },
      linkMuted: {
        color: "#a1a1aa",
      },
      linkUrl: {
        color: ACCENT,
      },
    })
  );
}

export function createModernCompactDensityPdfStyles() {
  return withLayout(
    "modern",
    StyleSheet.create({
      page: {
        paddingTop: 28,
        paddingBottom: 28,
        paddingHorizontal: 36,
        fontFamily: "Helvetica",
        fontSize: 9.5,
        color: ZINC_700,
        lineHeight: 1.45,
      },
      header: {
        borderBottomWidth: 1,
        borderBottomColor: ZINC_200,
        paddingBottom: 12,
        marginBottom: 8,
      },
      name: {
        fontSize: 22,
        fontFamily: "Helvetica-Bold",
        color: ACCENT,
        lineHeight: 1.05,
      },
      title: {
        marginTop: 5,
        fontSize: 11,
        color: ZINC_600,
      },
      contactLine: {
        marginTop: 8,
        fontSize: 9,
        color: ZINC_600,
        lineHeight: 1.4,
      },
      ...modernShared,
      section: {
        marginTop: 12,
      },
      sectionTitleRow: {
        ...modernShared.sectionTitleRow,
        borderBottomWidth: 1,
        borderBottomColor: ZINC_200,
        paddingBottom: 3,
        marginBottom: 6,
      },
      sectionTitle: {
        fontSize: 12,
        fontFamily: "Helvetica-Bold",
        color: ACCENT,
        letterSpacing: 0.85,
        textTransform: "uppercase",
        borderBottomWidth: 1,
        borderBottomColor: ZINC_200,
        paddingBottom: 3,
        marginBottom: 6,
      },
      bodyText: {
        fontSize: 9.5,
        color: ZINC_700,
        lineHeight: 1.5,
      },
      entry: {
        marginBottom: 16,
        paddingBottom: 14,
        borderBottomWidth: 1,
        borderBottomColor: ZINC_100,
      },
      entryLast: {
        marginBottom: 0,
        paddingBottom: 0,
        borderBottomWidth: 0,
      },
      entryTitle: {
        fontSize: 10.5,
        fontFamily: "Helvetica-Bold",
        color: ZINC_900,
        lineHeight: 1.25,
      },
      entrySubtitle: {
        marginTop: 4,
        fontSize: 9.5,
        color: ZINC_600,
      },
      metaLine: {
        marginTop: 4,
        fontSize: 8,
        color: ZINC_500,
      },
      description: {
        marginTop: 6,
        fontSize: 9.5,
        color: ZINC_700,
        lineHeight: 1.5,
      },
      skillsRow: {
        flexDirection: "row",
        flexWrap: "wrap",
      },
      skillChip: {
        borderWidth: 1,
        borderColor: ZINC_200,
        backgroundColor: "#fafafa",
        borderRadius: 2,
        paddingVertical: 2,
        paddingHorizontal: 6,
        marginRight: 5,
        marginBottom: 5,
      },
      skillText: {
        fontSize: 8.5,
        color: ZINC_600,
      },
      listItem: {
        marginBottom: 3,
        fontSize: 9.5,
        color: ZINC_700,
        lineHeight: 1.45,
      },
      listItemLast: {
        marginBottom: 0,
      },
      linkItem: {
        marginBottom: 0,
        paddingTop: 3,
        paddingBottom: 3,
      },
      linkItemLast: {
        marginBottom: 0,
      },
      linkLabel: {
        fontFamily: "Helvetica-Bold",
        color: ZINC_900,
      },
      linkMuted: {
        color: "#a1a1aa",
      },
      linkUrl: {
        color: ACCENT,
      },
    })
  );
}
