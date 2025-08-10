import axiosInstance from './axionInstance';
export const getAllSlides = async () => {
    const { data } = await axiosInstance.get("/sliders/");

    return data.results;
};