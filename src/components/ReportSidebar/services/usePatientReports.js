import { useState, useCallback } from 'react';

const usePatientReports = () => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchReports = useCallback(async (patientId) => {
        setIsLoading(true);
        try {
            const response = await fetch(`/api/patients/${patientId}/ai-report`);
            const result = await response.json();
            setData(result);
        } catch (error) {
            console.error('Error fetching reports:', error);
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
