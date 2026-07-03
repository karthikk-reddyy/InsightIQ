import { useDataset } from "../../context/DatasetContext";

function AISettings() {

    const {

        aiResponse,
        setAIResponse

    } = useDataset();

    return (

        <div className="bg-white rounded-2xl shadow-lg p-6">

            <h2 className="text-2xl font-bold mb-6">

                🤖 AI Settings

            </h2>

            <div className="grid md:grid-cols-2 gap-6">

                <div>

                    <label className="block font-semibold mb-2">

                        AI Model

                    </label>

                    <input

                        type="text"

                        value="Gemini 2.5 Flash"

                        disabled

                        className="w-full border rounded-xl p-3 bg-gray-100"

                    />

                </div>

                <div>

                    <label className="block font-semibold mb-2">

                        AI Response Length

                    </label>

                    <select

                        value={aiResponse}

                        onChange={(e)=>setAIResponse(e.target.value)}

                        className="w-full border rounded-xl p-3"

                    >

                        <option value="Short">Short</option>

                        <option value="Medium">Medium</option>

                        <option value="Detailed">Detailed</option>

                    </select>

                </div>

            </div>

        </div>

    );

}

export default AISettings;