function AISummary({ summary }) {

    if (!summary) return null;

    return (

        <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">

            <h2 className="text-2xl font-bold mb-6">

                AI Business Summary

            </h2>

            <p className="leading-8 text-gray-700">

                {summary}

            </p>

        </div>

    );

}

export default AISummary;