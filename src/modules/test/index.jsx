import { useEffect, useState } from "react";
import Questions from "./components/questions";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import baseApi from "../../apis/baseApi";
import { errorAlert } from "../../helpers/alertMessage";
import { getAxiosConfig } from "../../apis/config";

const Test = () => {
    const { id } = useParams();
    const [test, setTest] = useState([]);
    const navigate = useNavigate();
    console.log(test)
    useEffect(() => {
        (async () => {
            try {
                const { data: response } = await baseApi.get('site/test/1', getAxiosConfig());
                setTest(response.data);
            } catch (error) {
                errorAlert("Failed to fetch test")
                navigate("/tests");
            }
        })();
    }, [id, navigate]);

    return (
        <div className="flex items-center justify-center">
            <div className="space-y-4 w-full ">
                <Questions />
                <div>

                </div>
            </div>
        </div>
    )
}

export default Test;