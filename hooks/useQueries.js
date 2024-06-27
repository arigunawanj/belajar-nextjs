import { useCallback, useEffect, useState } from "react";

export const useQueries = ({ prefixUrl = "" } = {}) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const fetchingData = useCallback(
        async ({ url = "", method = "GET" } = {}) => {
            try {
                const response = await fetch(url, { method });
                const result = await response.json();
                setData(result);
                setIsLoading(false);
            } catch (error) {
                setIsError(true);
                setIsLoading(false);
            }
        }, []);

    useEffect(() => {
        if (prefixUrl) {
            fetchingData({ url: prefixUrl });
        }
    }, [prefixUrl, fetchingData]);

    return { data, isLoading, isError };
};