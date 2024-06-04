import { useEffect, useState } from "react";
import Questions from "./components/questions";
import { useNavigate, useParams } from "react-router-dom";
import baseApi from "../../apis/baseApi";
import { errorAlert } from "../../helpers/alertMessage";
import { getAxiosConfig } from "../../apis/config";
import countDuration from "../../helpers/countDuration";
import { setSelectedAnswers } from "../../store/slices/selectedAnswers";
import { useDispatch } from "react-redux";
import Timer from "./components/timer";

const Test = () => {
    const { id } = useParams();
    const [test, setTest] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        (async () => {
            try {
                const { data: response } = await baseApi.get('site/test/' + id, getAxiosConfig());
                setTest(response.data);
            } catch (error) {
                errorAlert("Failed to fetch test")
                navigate("/tests");
            }
        })();
    }, [id, navigate]);

    useEffect(() => {
        (async () => {
            try {
                const { data: response } = await baseApi.get(`site/test/question/answer`, { ...getAxiosConfig(), params: { test_id: id } });
                dispatch(setSelectedAnswers(response.data));
            } catch (error) {
                errorAlert("Failed to fetch test selected answer");
            }
        })();
    }, [id, dispatch]);

    return (
        <div>
            <Timer test={test} />
            <div className="flex items-center justify-center">
                <div className="space-y-4 w-full ">
                    <Questions />
                    {test && (
                        <div className="flex items-center gap-4 mt-2">
                            <div className="w-1/2 shadow-2xl rounded-lg h-[220px] bg-white py-2">
                                <h3 className="text-xl font-semibold p-2">Test Information</h3>
                                <div className="mt-2">
                                    <p className="p-2">Name: {test.test.name}</p>
                                    <p className="p-2">Start Date: {test.test_data_from}</p>
                                    <p className="p-2">End Date: {test.test_data_to}</p>
                                    <p className="p-2">Duration: {countDuration(test.test_data_from, test.test_data_to)}</p>
                                </div>
                            </div>
                            <div className="w-1/2 shadow-2xl rounded-lg h-[220px] bg-white py-2">
                                <h3 className="text-xl font-semibold p-2">Subject Information</h3>
                                <div className="mt-2">
                                    <p className="p-2">Name: {test.test.subject.name}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Test;