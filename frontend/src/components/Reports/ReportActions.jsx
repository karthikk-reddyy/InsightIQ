import axios from "axios";

function ReportActions() {

    const downloadReport = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8000/download-report",
                {
                    responseType: "blob"
                }
            );

            const url = window.URL.createObjectURL(
                new Blob([response.data])
            );

            const link = document.createElement("a");
            link.href = url;
            link.setAttribute(
                "download",
                "InsightIQ_Report.pdf"
            );

            document.body.appendChild(link);
            link.click();
            link.remove();
        }
        catch (err) {
            console.log(err);
            alert("Failed to download report.");
        }
    };

    return (
        <div className="flex justify-end mb-2">
            <button
                onClick={downloadReport}
                className="bg-zinc-100 hover:bg-zinc-200 text-zinc-950 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-md active:scale-95"
            >
                Download PDF Report
            </button>
        </div>
    );
}

export default ReportActions;