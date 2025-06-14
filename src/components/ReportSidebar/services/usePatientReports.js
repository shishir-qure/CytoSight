import { useState, useCallback } from 'react';

const usePatientReports = () => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;
    const fetchReports = useCallback(async (patientId) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${NEXT_PUBLIC_API_URL}/patients/${patientId}/ai-report`);

            const contentType = response.headers.get("content-type");

            if (response.ok && contentType?.includes("application/json")) {
                const result = await response.json();
                setData(result.data);
            } else {
                const text = await response.text();
                console.error("Expected JSON but received:", text);
                setData(null);
            }
        } catch (error) {
            console.error('Error fetching reports:', error);
            setData(null);
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        data,
        isLoading,
        fetchReports
    };
};

export default usePatientReports;
