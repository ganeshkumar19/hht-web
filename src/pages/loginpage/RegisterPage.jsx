import React, { useState, useRef, useEffect} from 'react'
import axios from 'axios';
import { Col, Container, Row, Image , Form, Spinner} from 'react-bootstrap'
import '../../assets/styles/registerstyles.css'
import { FaPencilAlt } from 'react-icons/fa';
import RPERSON from '../../assets/images/rperson.png'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../contexts/AuthContext';
import { useUserDetails } from '../../contexts/UserContext';
import { useCart } from '../../contexts/CartContext';



const RegisterPage = () => {
  const { fetchUserData } = useUserDetails();
  const {setNewAccessToken} = useCart()
  const { setIsAuthenticated } = useAuth(); 
  const location = useLocation();
  const navigate = useNavigate();
  const method = location.state?.method;
  const userNameFromPreviousScreen = location.state?.user_name;
  const access_token= location.state?.access_token;
  const [name, setName] = useState('');
  const [email, setEmail] = useState(method === 'email' ? userNameFromPreviousScreen : '');
  const [mobile, setMobile] = useState(method === 'phone' ? userNameFromPreviousScreen : '');
  const [pincode, setPincode] = useState('');
  const [zone, setZone] = useState('');
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const [imageSrc, setImageSrc] = useState(RPERSON);
  const imageInputRef = useRef(null);
  const [loading, setLoading] = useState(false);


  const handleIconClick = () => {
    imageInputRef.current.click(); // Simulate click on the hidden file input
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file && (file.type === "image/png" || file.type === "image/jpeg")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result); // Update the UI with the selected image
      };
      reader.readAsDataURL(file);

      // Prepare to upload
      const formData = new FormData();
      formData.append('file', file); // 'file' is the key expected by the backend

      try {
        const response = await axios.post('https://dhya.one/hht/identity/users/Upload', formData, {
          headers: {
            'Authorization': `Bearer ${access_token}`, // Include the access token in the Authorization header
            'Content-Type': 'multipart/form-data' // Ensure the content type is set correctly for file upload
          }
        });
        if (response.data && response.data.data) {
          setUploadedImageUrl(response.data.data); // Set the state with the new image URL
        }
        toast.success('Image uploaded successfully!');
      } catch (error) {
        toast.error('Failed to upload image.');
      }
    } else {
      toast.error("Please upload an image in PNG or JPEG format.");
    }
  };

  const handleRegister = async () => {

    if (!name.trim() || !email.trim() || !pincode.trim() || !zone.trim() || !mobile.trim()) {
      toast.error('Please update all the fields and continue.');
      return;
    }
    const userId = location.state?.user_id; 
    const userName = method === 'phone' ? mobile : email;
  
    const payload = {
      id: userId,
      user_name: userName, 
      login_type: method, 
      display_name: name,
      image_url: uploadedImageUrl,
      zone: zone,
      pincode: pincode,
      status: location.state?.status,
      contacts: [
        {contact: method === 'phone' ? email : mobile, contact_type: method === 'phone' ? 'email' : 'phone'}
      ]
    };
  
    try {
      setLoading(true); 
      const response = await axios.put('https://dhya.one/hht/identity/users/', payload, {
        headers: {
          'Authorization': `Bearer ${access_token}`, // Authorization header
        }
      });
  
       if (response.data && response.data.status === "Success") {
    
          // Store user data
          localStorage.setItem('userid', response.data.data.id); // Serialize the user object to store as a string
          sessionStorage.setItem('firstTimeLogin', 'true');
          setIsAuthenticated(true);
          setNewAccessToken(access_token)
          await fetchUserData(response.data.data.id);
          toast.success('Registration successful!', {
            autoClose: 3000,
            onClose: () => navigate('/')
          });
        } else {
        throw new Error('Registration update failed with status: ' + response.data.status);
      }
    } catch (error) { 
      toast.error('Registration update failed. Please try again.');
    } finally {
      setLoading(false);  
    }
  };
  
  
  
  

  return (
    <Container fluid className='d-flex flex-column justify-content-start align-items-center pt-5 registerPageContainer'>
        <Row>
            <Col xs={12} className='registrationContainer p-4'>
             <h4 className='registrationName my-2 text-center'>Registration</h4>
             <div className='rImageContainer my-2' onClick={handleIconClick}>
                <Image src={imageSrc} alt='registerperson' className={imageSrc === RPERSON ? 'repersonImage' : 'uploadedregisterImage'} />
                <FaPencilAlt className="editIcon" />
            </div>
            <input
                type="file"
                ref={imageInputRef}
                style={{ display: 'none' }}
                accept="image/*"
                onChange={handleImageChange}
            />
             <Form className='regFormConatiner my-4'>
             <Form.Group className="mb-3">
                  <Form.Control type="text" placeholder="Enter your name here" value={name} onChange={e => setName(e.target.value)} className='regFormInput'/>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control type="email" placeholder="Enter your email here" value={email} onChange={e => setEmail(e.target.value)} className='regFormInput' readOnly={method === 'email'}/>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control type="tel" placeholder="Enter your mobile number here" value={mobile} onChange={e => setMobile(e.target.value)} className='regFormInput' readOnly={method === 'phone'}/>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control type="text" placeholder="Enter your pin code here" value={pincode} onChange={e => setPincode(e.target.value)} className='regFormInput'/>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control type="text" placeholder="Enter your city" value={zone} onChange={e => setZone(e.target.value)} className='regFormInput'/>
                </Form.Group>

          </Form>
          <div className='rgButtonContainer d-flex justify-content-center align-items-center py-2'>
            <button onClick={handleRegister} className='rgbutton' disabled={loading}>{loading ? (
                <Spinner animation="border" size="sm" />  // Show spinner during loading
              ) : (
                'Register'
              )}</button>
            </div>
            </Col>
            
        </Row>
    </Container>
  )
}

export default RegisterPage