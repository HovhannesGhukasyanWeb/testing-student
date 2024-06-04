import { updateApi } from "../../../apis/baseCrudApi";

export const confirmTest = async (testId) => {
    await updateApi(`site/submitTest/` + testId, {});
}