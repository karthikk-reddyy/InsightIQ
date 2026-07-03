import { useDataset } from "../../context/DatasetContext";

function AppearanceSettings() {

    const {

        theme,
        setTheme

    } = useDataset();

    return (

        <div className="bg-white rounded-2xl shadow-lg p-6">

            <h2 className="text-2xl font-bold mb-6">

                🎨 Appearance

            </h2>

            <div className="grid md:grid-cols-2 gap-6">

                <div>

                    <label className="block font-semibold mb-3">

                        Theme

                    </label>

                    <select

                        value={theme}

                        onChange={(e)=>setTheme(e.target.value)}

                        className="w-full border rounded-xl p-3"

                    >

                        <option value="Light">

                            ☀️ Light

                        </option>

                        <option value="Dark">

                            🌙 Dark

                        </option>

                    </select>

                </div>

                <div>

                    <label className="block font-semibold mb-3">

                        Current Theme

                    </label>

                    <div className="border rounded-xl p-3 bg-gray-100">

                        {theme === "Light"

                            ? "☀️ Light Mode"

                            : "🌙 Dark Mode"}

                    </div>

                </div>

            </div>

        </div>

    );

}

export default AppearanceSettings;