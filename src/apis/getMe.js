import baseApi from "./baseApi";
import { getAxiosConfig } from "./config";

export default function getMe() {
    return baseApi.get("getMe", getAxiosConfig());
}