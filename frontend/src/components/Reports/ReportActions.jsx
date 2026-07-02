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

        <div className="flex justify-end mb-6">

            <button

                onClick={downloadReport}

                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"

            >

                Download Report

            </button>

        </div>

    );

}

export default ReportActions;