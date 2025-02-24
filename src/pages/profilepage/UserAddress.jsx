import React, { useEffect, useState } from 'react'
import { Col, Container, Image, Row, Form, Spinner } from 'react-bootstrap';
import WORK from '../../assets/images/work.png'
import TRASH from '../../assets/images/trash.png'
import HeaderCard from '../../components/HeaderCard'
import '../../assets/styles/useraddressstyles.css'
import AddressCategoryTab from '../../components/AddressCategoryTab';
import { useLocation, useNavigate } from 'react-router-dom';
import EditAddressModal from '../../modals/EditAddressModal';
import { useUserDetails } from '../../contexts/UserContext';
import IndiaStatesAndCities from '../../data/indiaStatesAndCites.json';
import Select from 'react-select'; 


const customSelectStyles = {
  control: (provided) => ({
    ...provided,
    borderRadius: '0', // Set border-radius to 0
    fontFamily: '"Neuebold", sans-serif', // Font family
    fontSize: '13px', // Font size
    fontWeight: 700, // Font weight
    color: '#000', // Text color
    borderColor: '#ced4da', // Match the border color of your other inputs
    minHeight: '38px', // Ensure it matches the height of other inputs
  }),
  menuList: (provided) => ({
    ...provided,
    maxHeight: '150px',  // Set maximum height for the dropdown
    overflowY: 'auto', 
    '::-webkit-scrollbar': {
      width: '6px',
    },
    '::-webkit-scrollbar-thumb': {
      background: '#888', // Color of the scrollbar handle
      borderRadius: '10px',
    },
    '::-webkit-scrollbar-thumb:hover': {
      background: '#555', // Color when hovered
    },
    '::-webkit-scrollbar-track': {
      background: '#f1f1f1', // Track color
    },  // Enable vertical scrolling
  }),
  menu: (provided) => ({
    ...provided,
    zIndex: 10, // Ensure dropdown menu appears above other elements
  }),
  option: (provided, state) => ({
    ...provided,
    fontFamily: '"Neuebold", sans-serif',  // Apply the font-family for the dropdown options
    fontSize: '13px',
    color: state.isSelected ? '#FFF' : '#000',  // Different text color for selected vs. unselected options
    backgroundColor: state.isSelected ? '#57A5BB' : '#FFF',  // Highlight selected option
    fontWeight: state.isSelected ? 700 : 500,
    padding: 10, // Padding inside each option
    cursor: 'pointer',
  }),
  singleValue: (provided) => ({
    ...provided,
    fontFamily: '"Neuebold", sans-serif',  // Font-family for the selected value
    fontSize: '13px',
    fontWeight: 700,
    color: '#000',
  }),
};

const UserAddress = () => {
  const { userDetails, addAddress, removeAddress, editAddress} = useUserDetails();
  const [isAddingNew, setIsAddingNew] = useState(false); 
  const [showEditModal, setShowEditModal] = useState(false);
  const [loadingAdd, setLoadingAdd] = useState(false); // state for adding address
  const [loadingRemoveId, setLoadingRemoveId] = useState(null); // ID of address being removed
  const [errors, setErrors] = useState({}); 
  const navigate = useNavigate();  // React Router hook to navigate
  const location = useLocation();
  const defaultEmail = userDetails?.contacts?.find(contact => contact.contact_type === 'email')?.contact || ''; // State to track if adding a new address
  const [newAddress, setNewAddress] = useState({
    name: '',
    contact_no: '',
    email: defaultEmail,
    line1: '',
    line2: '',
    landmark: '',
    city: '', // Ensure all fields are included
    pincode: '',
    state: '',
    country: 'India',
    category: 'Work'  // Default category set correctly
  })

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [cityOptions, setCityOptions] = useState([]);

  const stateOptions = Object.keys(IndiaStatesAndCities).map((state) => ({
    value: state,
    label: state,
  }));

  // Handle state change
  const handleStateChange = (selectedOption) => {
    setSelectedState(selectedOption);
    setNewAddress((prevState) => ({
      ...prevState,
      state: selectedOption.value,
    }));

    // Fetch cities based on selected state from the JSON data
    const cities = IndiaStatesAndCities[selectedOption.value] || [];

    // Populate city options based on selected state
    setCityOptions(
      cities.map((city) => ({
        value: city,
        label: city,
      }))
    );
    setSelectedCity(null); // Reset city selection
  };

  // Handle city change
  const handleCityChange = (selectedOption) => {
    setSelectedCity(selectedOption);
    setNewAddress((prevState) => ({
      ...prevState,
      city: selectedOption.value,
    }));
  };


  useEffect(() => {
    if (location.state?.fromModal) {
      setIsAddingNew(true);
    }
  }, [location.state]);



  const formFields = [
    { label: "Receiver's Name", name: 'name', type: 'text' },
    { label: "Receiver's Contact Number", name: 'contact_no', type: 'tel' },
    { label: 'Email', name: 'email', type: 'email' },
    { label: 'House/Flat/Block No', name: 'line1', type: 'text' },
    { label: 'Apartment/Road/Area', name: 'line2', type: 'text' },
    { label: 'Landmark (Optional)', name: 'landmark', type: 'text' },
  ];



  const categories = [
    { id: 'Home', name: 'Home' },
    { id: 'Work', name: 'Work' },
    { id: 'Others', name: 'Others' },
  ];

  const [activeCategory, setActiveCategory] = useState('Work');



  const toggleCategory = (category) => {
    setActiveCategory(category);
    setNewAddress({ ...newAddress, category: category });
  };

  const handleAddNew = ()=>{
    setIsAddingNew(true)
    window.scrollTo(0,0)
  }

  const handleEditClick = (address) => {
    setSelectedAddress(address);
    setShowEditModal(true); // Open the modal with the selected address
  };

  const handleSaveEditedAddress = async(ID, updatedFields) => {
     await editAddress(ID, updatedFields); 
  };


  const validateForm = () => {
    let newErrors = {};
  
    // Validate contact_no: must be a valid 10-digit Indian number
    if (!/^[6-9]\d{9}$/.test(newAddress.contact_no)) {
      newErrors.contact_no = 'Please enter a valid 10-digit Indian contact number.';
    }
  
    // Validate email using a regex pattern
    if (!/^\S+@\S+\.\S+$/.test(newAddress.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
  
    formFields.forEach(field => {
      if (field.name !== 'landmark' && !newAddress[field.name]) { // Landmark is optional
        newErrors[field.name] = `${field.label.replace(' (Optional)', '')} is required`;
      }
    });
  
    if (!newAddress.state) newErrors.state = 'State is required';
    if (!newAddress.city) newErrors.city = 'City is required';
    if (!newAddress.pincode) newErrors.pincode = 'Pincode is required';
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  


  const handleSaveAddress = async () => {
    if (validateForm()) {
      setLoadingAdd(true); 

    const addressToSave = { ...newAddress };
      if (!newAddress.landmark) {
        delete addressToSave.landmark;
      }
  
      // Add a flag to track if the address was successfully added
      const success = await addAddress(newAddress);
  
      setLoadingAdd(false);
  
      if (success) { // Only proceed if the address was successfully added
        // Clear the form inputs
        setNewAddress({
          name: '',
          contact_no: '',
          email: '',
          line1: '',
          line2: '',
          landmark: '',
          city: '',
          pincode: '',
          state: '',
          country: 'India',
          category: 'Work'  // Reset to default category
        });
        setSelectedState(null)
        setSelectedCity(null)
  
        // Check if the user came from the modal or another screen
        if (location.state?.fromModal) {
          navigate(-1);  // Navigate back to the previous page (where modal opened)
        } else {
          setIsAddingNew(false); // Normal behavior if not from modal
        }
  
        window.scrollTo(0, 0);
      }
    }
  };

  const handleRemoveAddress = async (id) => {
    setLoadingRemoveId(id); // Set loading for specific address
    await removeAddress(id);
    setLoadingRemoveId(null); // Stop loading after API completes
  };

  return (
    <Container fluid className='userAddressContainer'>
      <HeaderCard backgroundColor={"#57A5BB"} color={"#F5BE49"} name="Address"/>
      <Container className='mt-4 mb-3'>
      <Row className=''>
      {isAddingNew ? (
            <Col xs={12}>
              <AddressCategoryTab
                categories={categories}
                toggleCategory={toggleCategory}
                activeCategory={activeCategory}
              />
            </Col>
          ) : (
            <Col xs={12}>
              <p className="m-0 p-0 saText">Saved Addresses</p>
              {userDetails && userDetails.addresses.length === 0 && (
                <p className='text-center my-3 noadText'>No addresses saved.</p>
              )}
            </Col>
          )}
        {isAddingNew ? (
            // Form for adding a new address
            <Col xs={12} className='addressFormContainer my-2 d-flex flex-column align-items-center justify-content-center my-3 '>
              <div className='newaddressCardContainer p-3'>
                {/* Address Form */}
                <Form>
                {/* Other form fields */}
                {formFields.map((field, index) => (
                  <Form.Group key={index} as={Row} controlId={`form${field.name}`} className="mb-3">
                    <Form.Label column sm="4" className='nalabel'>{field.label}</Form.Label>
                    <Col sm="8">
                      <Form.Control
                        type={field.type}
                        placeholder={field.label}
                        value={newAddress[field.name]}
                        className='newAddressInput'
                        onChange={(e) => setNewAddress(prevState => ({
                          ...prevState,
                          [field.name]: e.target.value,
                        }))}
                        name={field.name}
                        isInvalid={!!errors[field.name]}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors[field.name]}
                      </Form.Control.Feedback>
                    </Col>
                  </Form.Group>
                ))}

                {/* Country field (pre-filled as India and disabled) */}
                <Form.Group as={Row} controlId="formCountry" className="mb-3">
                  <Form.Label className='nalabel' column sm="4">Country</Form.Label>
                  <Col sm="8">
                    <Form.Control 
                      type="text"
                      value="India" 
                      disabled 
                      className='newAddressInput' 
                    />
                  </Col>
                </Form.Group>

                {/* State Dropdown */}
                <Form.Group as={Row} controlId="formState" className="mb-3">
                  <Form.Label column sm="4" className='nalabel'>State</Form.Label>
                  <Col sm="8">
                    <Select
                      options={stateOptions}
                      value={selectedState}
                      onChange={handleStateChange}
                      placeholder="Select State"
                      styles={customSelectStyles}
                    />
                    {errors.state && <div className="error-text">{errors.state}</div>}
                  </Col>
                </Form.Group>

                {/* City Dropdown */}
                <Form.Group as={Row} controlId="formCity" className="mb-3">
                  <Form.Label column sm="4" className='nalabel'>City</Form.Label>
                  <Col sm="8">
                    <Select
                      options={cityOptions}
                      value={selectedCity}
                      onChange={handleCityChange}
                      placeholder="Select City"
                      styles={customSelectStyles}
                      isDisabled={!selectedState}
                    />
                    {errors.city && <div className="error-text">{errors.city}</div>}
                  </Col>
                </Form.Group>

                {/* Pincode */}
                <Form.Group as={Row} controlId="formPincode" className="mb-3">
                  <Form.Label column sm="4" className='nalabel'>Pin Code</Form.Label>
                  <Col sm="8">
                    <Form.Control
                      type="text"
                      placeholder="Pin Code"
                      value={newAddress.pincode}
                      className='newAddressInput'
                      onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
                      name="pincode"
                      isInvalid={!!errors.pincode}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.pincode}
                    </Form.Control.Feedback>
                  </Col>
                </Form.Group>
              </Form>

              </div>     
            </Col>
          ) : (
        <Col xs={12} className='adBoxContainer my-2 d-flex flex-column align-items-center justify-content-center'>
        {userDetails && userDetails?.addresses?.map((address) => (
          <div className='addressCardContainer p-2 my-3' key={address?.ID}>
            <div className='d-flex align-items-center justify-content-between'>
              <div className='d-flex align-items-center justify-content-center gap-2'>
                <Image src={WORK} className='workimage w-25' alt='workimage'/>
                <p className='m-0 p-0 text-dark wrkText'>{address.category}</p>
              </div>
              {loadingRemoveId === address.ID ? (
                      <Spinner animation="border" size="sm" />
                    ) : (
                      <Image
                        src={TRASH}
                        className='deleteimage'
                        alt='deleteimage'
                        onClick={() => handleRemoveAddress(address?.ID)} // Use remove function with id
                        style={{ cursor: 'pointer' }}
                      />
              )}
            </div>
            <div className='addressInfoContainer my-3 mx-2'>
              <p className='m-0 p-0'>{address?.name}</p>
              <p className='m-0 p-0'>{address?.line1}, {address?.line2}</p>
              <p className='m-0 p-0'>{address?.pincode}</p>
              <p className='m-0 p-0'>{address?.state}, {address?.country}</p>
              <p className='m-0 p-0'>{address?.contact_no}</p>
            </div>
            <div className='addressEditContainer my-3 mx-2'>
              <button className='m-0 p-0' onClick={() => handleEditClick(address)}>Edit</button>
            </div>
          </div>
           ))}
          </Col>
          )}
         {isAddingNew ? (
            <Col xs={12} className='my-4 d-flex align-items-center justify-content-center'>
              <button className='newaddressbutton' onClick={handleSaveAddress}>
                {loadingAdd ? <Spinner animation="border" size="sm" /> : 'Save New Address'}
              </button>
            </Col>
          ) : (
            <Col xs={12} className='my-4 d-flex align-items-center justify-content-center'>
              <button className='newaddressbutton' onClick={handleAddNew}>
                +Add New Address  
              </button>
            </Col>
          )}
      </Row>
      </Container>
      {selectedAddress && (
        <EditAddressModal
          show={showEditModal}
          onHide={() => setShowEditModal(false)}
          address={selectedAddress}
          saveAddress={handleSaveEditedAddress}
        />
      )}
    </Container>
  )
}

export default UserAddress