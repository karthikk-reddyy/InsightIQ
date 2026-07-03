import { useEffect } from "react";
import { useDataset } from "../../context/DatasetContext";

function SaveSettings() {

    const {

        username,
        company,
        theme,
        defaultChart,
        aiResponse,

        setUsername,
        setCompany,
        setTheme,
        setDefaultChart,
        setAIResponse

    } = useDataset();

    // Load settings when page opens
    useEffect(() => {

        const settings = JSON.parse(
            localStorage.getItem("InsightIQ_Settings")
        );

        if (settings) {

            setUsername(settings.username || "");

            setCompany(settings.company || "");

            setTheme(settings.theme || "Light");

            setDefaultChart(settings.defaultChart || "Bar");

            setAIResponse(settings.aiResponse || "Medium");

        }

    }, []);

    // Save settings
    const handleSave = () => {

        const settings = {

            username,

            company,

            theme,

            defaultChart,

            aiResponse

        };

        localStorage.setItem(

            "InsightIQ_Settings",

            JSON.stringify(settings)

        );

        alert("✅ Settings Saved Successfully!");

    };

    return (

        <div className="flex justify-end">

            <button

                onClick={handleSave}

                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold"

            >

                Save Settings

            </button>

        </div>

    );

}

export default SaveSettings;