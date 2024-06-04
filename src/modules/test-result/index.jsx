import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import baseApi from "../../apis/baseApi";
import { getAxiosConfig } from "../../apis/config";
import handleError from "../../helpers/handleError";
import { Loader2 } from "lucide-react";

const TestResult = () => {
    const { id } = useParams();

    const [testResult, setTestResult] = useState(null);
    // const [test, setTest] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            if (id) {
                try {
                    const { data: response } = await baseApi.get(`/site/testResult/${id}`, getAxiosConfig());
                    setTestResult(response.data);
                } catch (error) {
                    handleError(error);
                    navigate("/tests");
                }
            }
        })();
    }, [id, navigate]);

    console.log(testResult)
    return (
        <div className="h-full">
            {testResult ? (
                <div>
                    <div className="py-2">
                        <button
                            onClick={() => navigate(`/tests`)}
                            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
                        >
                            Back
                        </button>
                    </div>
                    <h3 className="text-center mb-2 text-2xl">Test Result</h3>
                    <div className="mt-2">
                        <div className="flex items-center gap-2 sm:flex-row sm:w-full flex-col">
                            <div className="sm:w-1/2 w-full">
                                <div className="w-full shadow-xl rounded-lg max-h-[400px] h-[400px] p-5">
                                    <p>Test: <span>{testResult.test?.name}</span></p>
                                    <p>Subject: <span>{testResult.test?.subject?.name}</span></p>
                                </div>
                            </div>
                            <div className="sm:w-1/2 w-full">
                                <div className="w-full shadow-xl rounded-lg max-h-[400px] h-[400px] p-5">
                                    <p>Result: <span>{testResult.mark}</span></p>
                                    <p>Status: <span>{testResult.status}</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="h-full w-full flex items-center justify-center">
                    <Loader2 className="animate-spin w-8 h-8" />
                </div>
            )}
        </div>
    )
}

export default TestResult;