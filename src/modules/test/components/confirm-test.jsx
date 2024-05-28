import PropTypes from "prop-types";
import { useNavigate, useParams } from "react-router-dom";
import { updateApi } from "../../../apis/baseCrudApi";
import handleError from "../../../helpers/handleError";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const ConfirmTest = ({ setShowDialog }) => {
    const { id: testId } = useParams();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const onConfirm = async () => {
        try {
            setLoading(true);
            await updateApi(`site/submitTest/` + testId, {});
            navigate(`/test/${testId}/result`);
        } catch (error) {
            handleError(error);
        } finally {
            setLoading(false);
            setShowDialog(false);
        }
    }

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-[20px] rounded-[5px] w-[500px]">
                <div className="flex flex-col gap-2 items-center justify-center py-2">
                    <h3 className="text-xl font-semibold">Are you sure you want to submit the test?</h3>
                    <p className="font-sembiold">Make sure you have answered all questions.</p>
                </div>
                <div>
                    <div className="flex justify-center gap-2">
                        <button className="bg-red-500 text-white px-5 py-5 min-w-[200px] rounded-[20px]" onClick={() => setShowDialog(false)}>No</button>
                        <button className="bg-green-500 flex items-center justify-center gap-2 text-white px-5 py-5 min-w-[200px] rounded-[20px]" onClick={() => onConfirm(true)}>
                            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                            Yes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

ConfirmTest.propTypes = {
    setShowDialog: PropTypes.func.isRequired
}

export default ConfirmTest;