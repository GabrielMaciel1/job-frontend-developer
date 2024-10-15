import  { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { detectIncognito } from "detectincognitojs";

const CheckAnonymousTab = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const checkIncognitoMode = async () => {
            const isIncognito = await detectIncognito();

            if (isIncognito.isPrivate) {
                navigate('/page-block');
            }
        };

        checkIncognitoMode();
    }, [navigate]);

    return null;
};

export default CheckAnonymousTab;
