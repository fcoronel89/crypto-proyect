import { axiosInstance } from "./axiosInstance";

export const getValuesByCriptoAndFiat = async (crypto: string, fiat: string) => {
    const { data } = await axiosInstance.get(`/${crypto}/${fiat}/1`);
    return data

}