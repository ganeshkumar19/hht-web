
import axios from "axios";
import { toast } from "react-toastify";

export const updateUserProfile = async (newImageUrl, userDetails) => {

    const updatedUserDetails = {
        ...userDetails,
        image_url: newImageUrl
    };

    try {
        const response = await axios.put(`${import.meta.env.VITE_BASE_API_URL}/identity/users/`, updatedUserDetails, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.data) {
            toast.success('Profile updated successfully!');
            // Update local context or state with new user details
        }
    } catch (error) {
        toast.error('Failed to update profile. Please try again.');
    }
};