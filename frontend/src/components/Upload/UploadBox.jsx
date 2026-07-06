import { Upload } from "lucide-react";
import { useRef, useState } from "react";
import API from "../../services/api";

function UploadBox({
    setDatasetInfo,
    setChartData,
    setFilteredData
})  {
  const fileInputRef = useRef(null);

  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (!file) return;

    setFileName(file.name);

    const formData = new FormData();
    formData.append("file", file);

    try {
    setLoading(true);

    // Upload dataset information
    const uploadResponse = await API.post("/upload", formData);

    console.log("Upload Response:", uploadResponse.data);

    setDatasetInfo(uploadResponse.data);
    setFilteredData(uploadResponse.data.data);

    // Create a new FormData because the previous request consumes the file
    const chartFormData = new FormData();
    chartFormData.append("file", file);

    // Fetch chart data
    const chartResponse = await API.post("/chart-data", chartFormData);

    console.log("Chart Data:", chartResponse.data);

    setChartData(chartResponse.data);

    } catch (error) {
    console.error(error);
    alert("Upload Failed");
    } finally {
    loading(false);
    }
    };

  return (
    <div className="w-full flex flex-col items-center justify-center text-center">

      <h2 className="text-base font-semibold text-zinc-200 tracking-tight mb-5 w-full">
        Upload Dataset
      </h2>

      <div className="w-full bg-zinc-950/40 border-2 border-dashed border-zinc-800 rounded-xl h-72 flex flex-col items-center justify-center p-6 transition-all duration-300 hover:bg-zinc-900/40 hover:border-zinc-700 group">

        <Upload size={44} className="text-zinc-500 group-hover:text-zinc-300 transition-colors duration-300" />

        <h3 className="text-xl font-bold tracking-tight text-zinc-200 mt-4">
          Drag & Drop CSV / Excel
        </h3>

        <p className="text-xs font-medium text-zinc-500 tracking-wide mt-1">
          Upload your business dataset
        </p>

        <button
          onClick={handleClick}
          disabled={loading}
          className="mt-6 bg-zinc-100 hover:bg-zinc-200 text-zinc-950 px-6 py-2.5 rounded-xl text-sm font-semibold tracking-wide transition-all duration-200 shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Uploading..." : "Choose File"}
        </button>

        <input
          type="file"
          accept=".csv,.xlsx,.xls"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />

        {fileName && (
          <p className="mt-4 text-xs font-semibold tracking-wide text-emerald-400">
            ✓ {fileName}
          </p>
        )}

      </div>

    </div>
  );
}

export default UploadBox;