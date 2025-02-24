import axios from 'axios';
import { toast } from 'react-toastify';

export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axios.post(`${import.meta.env.VITE_BASE_API_URL}/fanfam/career/profile/upload`, formData, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': 'multipart/form-data',
      }
    });

    toast.success('File uploaded successfully!');
    return response.data.data;
  } catch (error) {
    toast.error('Error uploading file. Please Try Again');
    console.error('Error uploading file:', error.response ? error.response.data : error);
    toast.error('Failed to upload file.');
    throw error; // Throw error to handle it in the calling component
  }
};
