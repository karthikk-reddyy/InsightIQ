from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer
)
from reportlab.lib.styles import getSampleStyleSheet


def generate_pdf(report_data, filename):

    doc = SimpleDocTemplate(filename)

    styles = getSampleStyleSheet()

    story = []

    # ----------------------------
    # Title
    # ----------------------------

    story.append(
        Paragraph(
            "InsightIQ Business Report",
            styles["Title"]
        )
    )

    story.append(Spacer(1, 20))

    # ----------------------------
    # Dataset
    # ----------------------------

    story.append(
        Paragraph(
            f"<b>Dataset:</b> {report_data['filename']}",
            styles["Normal"]
        )
    )

    story.append(
        Paragraph(
            f"<b>Rows:</b> {report_data['rows']}",
            styles["Normal"]
        )
    )

    story.append(
        Paragraph(
            f"<b>Columns:</b> {report_data['columns']}",
            styles["Normal"]
        )
    )

    story.append(
        Paragraph(
            f"<b>Missing Values:</b> {report_data['missing_values']}",
            styles["Normal"]
        )
    )

    story.append(
        Paragraph(
            f"<b>Duplicates:</b> {report_data['duplicates']}",
            styles["Normal"]
        )
    )

    story.append(Spacer(1, 20))

    # ----------------------------
    # KPIs
    # ----------------------------

    story.append(
        Paragraph(
            "Business KPIs",
            styles["Heading2"]
        )
    )

    kpi = report_data["kpis"]

    story.append(
        Paragraph(
            f"<b>Primary KPI:</b> {kpi['column']}",
            styles["Normal"]
        )
    )

    story.append(
        Paragraph(
            f"<b>Total:</b> {kpi['total']}",
            styles["Normal"]
        )
    )

    story.append(
        Paragraph(
            f"<b>Average:</b> {kpi['average']}",
            styles["Normal"]
        )
    )

    story.append(
        Paragraph(
            f"<b>Maximum:</b> {kpi['maximum']}",
            styles["Normal"]
        )
    )

    story.append(
        Paragraph(
            f"<b>Minimum:</b> {kpi['minimum']}",
            styles["Normal"]
        )
    )

    story.append(Spacer(1, 20))

    # ----------------------------
    # AI Summary
    # ----------------------------

    story.append(
        Paragraph(
            "AI Summary",
            styles["Heading2"]
        )
    )

    story.append(
        Paragraph(
            report_data["ai_summary"],
            styles["Normal"]
        )
    )

    doc.build(story)