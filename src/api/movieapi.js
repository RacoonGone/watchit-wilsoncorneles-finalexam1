import axios from "axios";
export const API_URL = import.meta.env.VITE_API_URL;

export const getMovies = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export const createMovie = async (data) => {
    try {
        const response = await axios.post(API_URL, data);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const updateMovie = async (id, data) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, data);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const deleteMovie = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}