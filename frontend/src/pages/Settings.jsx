import ProfileSettings from "../components/Settings/ProfileSettings";
import AISettings from "../components/Settings/AISettings";
import DashboardSettings from "../components/Settings/DashboardSettings";
import AppearanceSettings from "../components/Settings/AppearanceSettings";
import SaveSettings from "../components/Settings/SaveSettings";

function Settings() {

    return (

        <div className="space-y-8">

            {/* Page Header */}

            <div>

                <h1 className="text-4xl font-bold">

                    Settings

                </h1>

                <p className="text-gray-500 mt-2">

                    Configure your InsightIQ preferences

                </p>

            </div>

            {/* Profile */}

            <ProfileSettings />

            {/* AI */}

            <AISettings />

            {/* Dashboard */}

            <DashboardSettings />

            {/* Appearance */}

            <AppearanceSettings />

            {/* Save Button */}

            <SaveSettings />

        </div>

    );

}

export default Settings;