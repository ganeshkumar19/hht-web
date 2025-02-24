import axios from 'axios';

export const registerUser = async (phoneNumberOrEmail, loginType) => {
    const payload = {
        user_name: phoneNumberOrEmail,
        login_type: loginType,
    };
    const response = await axios.post(`${import.meta.env.VITE_BASE_API_URL}/identity/users/register`, payload);
    return response.data;
};