import React, { useEffect, useState } from 'react'
import '../../assets/styles/careerformstyles.css'
import PDforms from '../../components/PDforms'
import { Container, Row, Col, Spinner} from 'react-bootstrap'
import { motion } from "framer-motion";
import { InView } from 'react-intersection-observer';
import HeaderCard from '../../components/HeaderCard'
import FileUploadBox from '../../components/FileUploadBox'
import { useLocation } from 'react-router-dom';
import SubmitForm from '../../components/SubmitForm'
import { toast } from 'react-toastify';
import axios from 'axios';
import { formatDateWithCurrentTime } from '../../functions/dateUtils';
import { uploadFile } from '../../functions/uploadFile';
import fetchProfile from '../../apifunctions/fetchProfile';
import { useApi } from '../../hooks/useApi';



const CareerForms = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const employmentType = location.state.employmentType;
  const userProfileId = localStorage.getItem('userId');
  const [view, setView] = useState('form');
  const [errors, setErrors] = useState({});  // 'form' or 'submit'
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    DOB: '',
    contactNumber: '',
    email: '',
    address: '',
    Desc: '',
    resumeFile: null,
    uploadedFileURL: '',
    submitted: false, // Store the file object directly
  });

  const allFieldsFilled = () => {
    const requiredFields = ['firstName', 'lastName', 'DOB', 'contactNumber', 'email', 'address', 'Desc', 'resumeFile'];
    return requiredFields.every(field => formData[field]);
  };  

  const validateInput = (name, value) => {
    let error = '';
    switch (name) {
      case 'contactNumber':
        if (!/^\d{10}$/.test(value)) {  // Regex for validating 10 digit numbers
          error = 'Please enter a valid 10-digit contact number.';
        }
        break;
      case 'email':
        if (!/\S+@\S+\.\S+/.test(value)) {  // Simple regex for email validation
          error = 'Please enter a valid email address.';
        }
        break;
      default:
        break;
    }
    setErrors(prevErrors => ({ ...prevErrors, [name]: error }));
  };


  useEffect(() => {
    fetchProfile(userProfileId, setFormData, setView, setLoading);
  }, [userProfileId]);


  const handleSubmit = async () => {
    const userId = localStorage.getItem('userId');
    const sendRequest = useApi();
    const body = {
      contact_number: formData.contactNumber,
      dob: formatDateWithCurrentTime(formData.DOB),
      description: formData.Desc,
      email: formData.email,
      first_name: formData.firstName,
      address: formData.address,
      last_name: formData.lastName,
      job_type: employmentType,
      resume_url: formData.uploadedFileURL,
      user_id: userId,
    };
  
    const { data, error } = await sendRequest({
      url: `${import.meta.env.VITE_BASE_API_URL}/fanfam/career/profile`,
      method: 'post',
      body,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
    });
  
    if (error) {
      console.error('Submission failed', error);
      toast.error('Failed to upload resume. Please Try After Some Time');
    } else {
      toast.success('Resume uploaded successfully!');
      setFormData(prevState => ({
        ...prevState,
        profileId: data.data.ID,
        submitted: true
      }));
      window.scrollTo(0, 0);
    }
  };


  const containerVariants = {
    hidden: {
      opacity: 0,
      x: -85
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.2,
        duration: 0.5,
      }
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => {
      const newState = { ...prevState, [name]: value };
      validateInput(name, value);
      return newState;
    });
  };

  const handleFileUpload = async (file) => {
    setFormData(prevState => ({
      ...prevState,
      resumeFile: file
    }));
    try {
      const uploadedUrl = await uploadFile(file)
      setFormData(prevState => ({
        ...prevState,
        resumeFile: file,
        uploadedFileURL: uploadedUrl
      }));
    } catch (error) {
      // Error handling can be more specific based on what uploadFile throws
    }
  };
  
  const handleProceed = () => {
    const errorFields = Object.keys(formData).reduce((acc, key) => {
      validateInput(key, formData[key]);
      if (errors[key]) {
        acc.push(key);
      }
      return acc;
    }, []);

    if (allFieldsFilled()) {
      if (errorFields.length > 0) {
        toast.error('Please correct the errors before proceeding.');
        return;
      }
      window.scrollTo(0, 0);
      setView('submit');
    } else {
      toast.error('Please fill all the forms to continue.');
    }
  };

const handleDelete = async () => {
  try {
    await axios.delete(`${import.meta.env.VITE_BASE_API_URL}/fanfam/career/profile/${formData.profileId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
    });
    toast.success('Profile deleted successfully!');
    setFormData({
      firstName: '',
      lastName: '',
      DOB: '',
      contactNumber: '',
      email: '',
      address: '',
      Desc: '',
      resumeFile: null,
      uploadedFileURL: '',
      submitted: false, 
    });
    setView('form'); 
  } catch (error) {
    console.error('Delete failed:', error.response ? error.response.data : error);
    toast.error('Failed to delete profile.');
  }
};

  
  const handleEdit = () => {
    setView('form');
  };

  if (loading) {
    return (
      <div className="loader-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#57A5BB'}}>
        <Spinner animation="border" role="status" color='white'></Spinner>
      </div>
    );
  }
  return (
    <Container fluid className='careerformContainer'>
    <HeaderCard backgroundColor={"#3EA66B"} color={"#F4E003"} name="Careers"/>
    <Row>
    <Col xs={12} className='mt-3'>
        {view === 'form' ? (
          <>
            <h3 className='machicareerText text-center'>Machi Got Skills?</h3>
            <p className='machicareerInfo text-center pt-2'>We’re Ready If You Are – Join Us!</p>
          </>
        ) : (
          <div className='machiReviewInfoContainer mx-auto'>
            {formData.submitted ? (
              <p className='machiReviewInfo text-center pt-2 mx-2'>Resume uploaded successfully! We'll get back to you as soon as possibile</p>
            ) : (
              <p className='machiReviewInfo text-center pt-2 mx-2'>Just a quick heads-up: please give your info another look to make sure all is in order before you submit. 
                <br /><span className='machicareerInfo'>Thanks a bunch!</span>
              </p>
            )}
          </div>
        )}
      </Col>
    </Row>
    {view === 'form' ? (
    <>
    <InView threshold={0.2} triggerOnce={true}>
    {({ ref, inView }) => (
    <motion.div style={{width: '100%'}} ref={ref}  
    initial='hidden' 
    animate={inView ? 'visible' : 'hidden'} 
    variants={containerVariants}>
    <PDforms employmentType={employmentType} formData={formData} handleChange={handleChange} errors={errors}/>
    </motion.div>
         )}
    </InView>
    <FileUploadBox onFileUpload={handleFileUpload} file={formData.resumeFile}  setFormData={setFormData}/>
    {allFieldsFilled() && (
                <div className='d-flex justify-content-center align-items-center my-3'>
                  <button className='submitformButton' onClick={handleProceed}>Proceed</button>
                </div>
    )}
    </>
    ) : (
      <>
   
      <SubmitForm formData={formData} onEdit={handleEdit} handleDelete={handleDelete}/>
      {!formData.submitted && (
      <>
      <div className='d-flex justify-content-center align-items-center my-3'>
      <button className='submitformButton' onClick={handleSubmit}>Submit</button>
    </div>
    </>
    )}
      </>
    )}
  </Container>
  )
}

export default CareerForms