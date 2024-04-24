import { useState, useEffect } from "react";
import axios from "axios";

const useFlip = (initialFlipState = true) => {
    const [isFlipped, setFlipped] = useState(initialFlipState);

    const flipCard = () => {
        setFlipped(isUp => !isUp);
    };

    return [isFlipped, flipCard];
}

const useAxios = (keyInLS, baseUrl) => {
    const [responses, setResponses] = useLocalStorage(keyInLS);

    const addResponseData = async (formatter = data => data, restofUrl = "") => {
        const response = await axios.get(`${baseUrl}${restofUrl}`);
        setResponses(data => [...data, formatter(response.data)]);
    };

    const clearResponses = () => setResponses([]);

    return [responses, addResponseData, clearResponses];
}

const useLocalStorage = (key, initalValue = []) => {
    if (localStorage.getItem(key)) {
        initalValue = JSON.parse(localStorage.getItem(key));
    }
    const [value, setValue] = useState(initalValue);

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [value, key]);

    return [value, setValue];
}

export default useLocalStorage;

export { useFlip, useAxios, useLocalStorage };