import { useState } from "react";
import API from "../../services/api";

function AIChat({ datasetInfo }) {

    const [question, setQuestion] = useState("");

    const [answer, setAnswer] = useState("");

    const askAI = async () => {

        if(question==="") return;

        const response = await API.post("/ask-ai",{

            question,

            dataset_summary: datasetInfo.ai_summary

        });

        setAnswer(response.data.answer);

    };

    return(

        <div className="bg-white shadow-lg rounded-2xl p-6 mt-8">

            <h2 className="text-2xl font-bold mb-4">

                💬 Ask AI About Dataset

            </h2>

            <input

                className="border w-full rounded-xl p-3"

                placeholder="Ask something..."

                value={question}

                onChange={(e)=>setQuestion(e.target.value)}

            />

            <button

                onClick={askAI}

                className="bg-blue-600 text-white px-6 py-3 rounded-xl mt-4"

            >

                Ask AI

            </button>

            {answer && (

                <div className="bg-gray-100 p-5 rounded-xl mt-6">

                    <h3 className="font-bold">

                        AI Answer

                    </h3>

                    <p className="whitespace-pre-wrap mt-2">

                        {answer}

                    </p>

                </div>

            )}

        </div>

    );

}

export default AIChat;