import { useDataset } from "../../context/DatasetContext";

function ProfileSettings() {

    const {

        username,
        setUsername,

        company,
        setCompany

    } = useDataset();

    return (

        <div className="bg-white rounded-2xl shadow-lg p-6">

            <h2 className="text-2xl font-bold mb-6">

                👤 Profile Settings

            </h2>

            <div className="grid md:grid-cols-2 gap-6">

                <div>

                    <label className="block font-semibold mb-2">

                        Username

                    </label>

                    <input

                        type="text"

                        value={username}

                        onChange={(e)=>setUsername(e.target.value)}

                        placeholder="Enter your name"

                        className="w-full border rounded-xl p-3"

                    />

                </div>

                <div>

                    <label className="block font-semibold mb-2">

                        Company

                    </label>

                    <input

                        type="text"

                        value={company}

                        onChange={(e)=>setCompany(e.target.value)}

                        placeholder="Company Name"

                        className="w-full border rounded-xl p-3"

                    />

                </div>

            </div>

        </div>

    );

}

export default ProfileSettings;