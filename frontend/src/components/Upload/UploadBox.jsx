
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
    setLoading(false);
    }
    };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">

      <h2 className="text-2xl font-bold mb-6">
        Upload Dataset
      </h2>

      <div className="border-2 border-dashed border-blue-400 rounded-2xl h-72 flex flex-col items-center justify-center hover:bg-blue-50 transition-all duration-300">

        <Upload size={60} className="text-blue-500" />

        <h3 className="text-2xl font-semibold mt-5">
          Drag & Drop CSV / Excel
        </h3>

        <p className="text-gray-500 mt-2">
          Upload your business dataset
        </p>

        <button
          onClick={handleClick}
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold"
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
          <p className="mt-5 text-green-600 font-medium">
            ✔ {fileName}
          </p>
        )}

      </div>

    </div>
  );
}

export default UploadBox;

