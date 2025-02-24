import axios from 'axios';
import { formatDate, formatDateWithCurrentTime } from '../functions/dateUtils';

const fetchProfile = async (userProfileId, setFormData, setView, setLoading) => {
  setLoading(true);
  try {
    const response = await axios.get(`${import.meta.env.VITE_BASE_API_URL}/fanfam/career/profile/user/${userProfileId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
      }
    });

    if (response.data && Object.keys(response.data.data).length > 0 && response.data.data.ID) {
      const profileData = response.data.data;
      setFormData({
        firstName: profileData.first_name,
        lastName: profileData.last_name,
        DOB:  formatDate(profileData.dob),
        contactNumber: profileData.contact_number,
        email: profileData.email,
        address: profileData.address,
        Desc: profileData.description,
        resumeFile: null,
        uploadedFileURL: profileData.resume_url,
        submitted: true,
        profileId: profileData.ID,
      });
      setView('submit');
    } else {
      setView('form');
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      setView('form');
    } else {
      console.error('Error fetching profile data:', error);
      setView('form');
    }
  } finally {
    setLoading(false);
  }
};

export default fetchProfile;