import { StyleSheet } from "@react-pdf/renderer";
import type { ResumePdfLayout } from "@/lib/resume/templates/pdf-types";

function withLayout<T extends Record<string, unknown>>(
  layout: ResumePdfLayout,
  styles: T
) {
  return { layout, ...styles } as T & { layout: ResumePdfLayout };
}

export function createClassicProfessionalDensityPdfStyles() {
  return withLayout(
    "classic",
    StyleSheet.create({
      page: {
        paddingTop: 32,
        paddingBottom: 32,
        paddingHorizontal: 40,
        fontFamily: "Helvetica",
        fontSize: 10,
        color: "#3f3f46",
        lineHeight: 1.45,
      },
      header: {
        borderBottomWidth: 1,
        borderBottomColor: "#e4e4e7",
        paddingBottom: 12,
        marginBottom: 14,
      },
      name: {
        fontSize: 22,
        fontFamily: "Helvetica-Bold",
        color: "#18181b",
        lineHeight: 1.2,
      },
      title: {
        marginTop: 4,
        fontSize: 11,
        color: "#52525b",
      },
      contactLine: {
        marginTop: 8,
        fontSize: 9.5,
        color: "#52525b",
        lineHeight: 1.4,
      },
      contactLineRow: {},
      contactItem: {},
      contactIcon: {},
      contactText: {},
      section: {
        marginTop: 12,
      },
      sectionTitleRow: {},
      sectionIcon: {},
      sectionTitle: {
        fontSize: 8,
        fontFamily: "Helvetica-Bold",
        color: "#3f3f46",
        letterSpacing: 1.2,
        textTransform: "uppercase",
        borderBottomWidth: 1,
        borderBottomColor: "#d4d4d8",
        paddingBottom: 3,
        marginBottom: 6,
      },
      bodyText: {
        fontSize: 10,
        color: "#3f3f46",
        lineHeight: 1.5,
      },
      entry: {
        marginBottom: 10,
      },
      entryLast: {
        marginBottom: 0,
      },
      entryTitleRow: {},
      entryDot: {},
      entryTitleInRow: {},
      entryTitle: {
        fontSize: 11,
        fontFamily: "Helvetica-Bold",
        color: "#18181b",
        lineHeight: 1.3,
      },
      entrySubtitle: {
        marginTop: 2,
        fontSize: 10,
        fontFamily: "Helvetica-Bold",
        color: "#27272a",
      },
      metaLine: {
        marginTop: 2,
        fontSize: 8.5,
        color: "#71717a",
      },
      description: {
        marginTop: 4,
        fontSize: 10,
        color: "#3f3f46",
        lineHeight: 1.5,
      },
      skillsRow: {
        flexDirection: "row",
        flexWrap: "wrap",
      },
      skillChip: {
        borderWidth: 1,
        borderColor: "#e4e4e7",
        backgroundColor: "#fafafa",
        borderRadius: 4,
        paddingVertical: 2,
        paddingHorizontal: 7,
        marginRight: 5,
        marginBottom: 5,
      },
      skillText: {
        fontSize: 9.5,
        color: "#3f3f46",
      },
      listItem: {
        marginBottom: 3,
        fontSize: 10,
        color: "#3f3f46",
      },
      listItemLast: {
        marginBottom: 0,
      },
      linkItem: {
        marginBottom: 4,
      },
      linkItemLast: {
        marginBottom: 0,
      },
      linkLabel: {
        fontFamily: "Helvetica-Bold",
        color: "#27272a",
      },
      linkMuted: {
        color: "#a1a1aa",
      },
      linkUrl: {
        color: "#52525b",
      },
    })
  );
}

export function createClassicCompactDensityPdfStyles() {
  return withLayout(
    "classic",
    StyleSheet.create({
      page: {
        paddingTop: 24,
        paddingBottom: 24,
        paddingHorizontal: 32,
        fontFamily: "Helvetica",
        fontSize: 9,
        color: "#3f3f46",
        lineHeight: 1.35,
      },
      header: {
        borderBottomWidth: 1,
        borderBottomColor: "#e4e4e7",
        paddingBottom: 8,
        marginBottom: 10,
      },
      name: {
        fontSize: 18,
        fontFamily: "Helvetica-Bold",
        color: "#18181b",
        lineHeight: 1.15,
      },
      title: {
        marginTop: 2,
        fontSize: 10,
        color: "#52525b",
      },
      contactLine: {
        marginTop: 5,
        fontSize: 8.5,
        color: "#52525b",
        lineHeight: 1.35,
      },
      contactLineRow: {},
      contactItem: {},
      contactIcon: {},
      contactText: {},
      section: {
        marginTop: 8,
      },
      sectionTitleRow: {},
      sectionIcon: {},
      sectionTitle: {
        fontSize: 7,
        fontFamily: "Helvetica-Bold",
        color: "#3f3f46",
        letterSpacing: 1,
        textTransform: "uppercase",
        borderBottomWidth: 1,
        borderBottomColor: "#d4d4d8",
        paddingBottom: 2,
        marginBottom: 4,
      },
      bodyText: {
        fontSize: 9,
        color: "#3f3f46",
        lineHeight: 1.4,
      },
      entry: {
        marginBottom: 6,
      },
      entryLast: {
        marginBottom: 0,
      },
      entryTitleRow: {},
      entryDot: {},
      entryTitleInRow: {},
      entryTitle: {
        fontSize: 10,
        fontFamily: "Helvetica-Bold",
        color: "#18181b",
        lineHeight: 1.25,
      },
      entrySubtitle: {
        marginTop: 1,
        fontSize: 9,
        fontFamily: "Helvetica-Bold",
        color: "#27272a",
      },
      metaLine: {
        marginTop: 1,
        fontSize: 8,
        color: "#71717a",
      },
      description: {
        marginTop: 3,
        fontSize: 9,
        color: "#3f3f46",
        lineHeight: 1.4,
      },
      skillsRow: {
        flexDirection: "row",
        flexWrap: "wrap",
      },
      skillChip: {
        borderWidth: 1,
        borderColor: "#e4e4e7",
        backgroundColor: "#fafafa",
        borderRadius: 3,
        paddingVertical: 1,
        paddingHorizontal: 5,
        marginRight: 4,
        marginBottom: 4,
      },
      skillText: {
        fontSize: 8.5,
        color: "#3f3f46",
      },
      listItem: {
        marginBottom: 2,
        fontSize: 9,
        color: "#3f3f46",
      },
      listItemLast: {
        marginBottom: 0,
      },
      linkItem: {
        marginBottom: 3,
      },
      linkItemLast: {
        marginBottom: 0,
      },
      linkLabel: {
        fontFamily: "Helvetica-Bold",
        color: "#27272a",
      },
      linkMuted: {
        color: "#a1a1aa",
      },
      linkUrl: {
        color: "#52525b",
      },
    })
  );
}
