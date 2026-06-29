from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer
)

from reportlab.lib.styles import getSampleStyleSheet

def generate_report(filename,data):

    doc = SimpleDocTemplate(filename)

    styles = getSampleStyleSheet()

    elements = []

    elements.append(
        Paragraph(
            "AI Data Analyst Report",
            styles["Title"]
        )
    )

    elements.append(
        Spacer(1,12)
    )

    for k,v in data.items():

        elements.append(
            Paragraph(
                f"<b>{k}</b>: {v}",
                styles["Normal"]
            )
        )

        elements.append(
            Spacer(1,6)
        )

    doc.build(elements)

    return filename