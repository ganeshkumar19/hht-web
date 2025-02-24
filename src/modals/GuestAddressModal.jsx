import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import { useUserDetails } from '../contexts/UserContext';
import { toast } from 'react-toastify';
import IndiaStatesAndCities from '../data/indiaStatesAndCites.json';
import '../assets/styles/guestaddressmodalstyles.css'


const customSelectStyles = {
  control: (provided) => ({
    ...provided,
    borderRadius: '0', // Set border-radius to 0
    fontFamily: '"Neuebold", sans-serif', // Font family
    fontSize: '13px', // Font size
    fontWeight: 700, // Font weight
    color: '#000', // Text color
    backgroundColor: '#DDDBC6',
    minHeight: '34px', // Ensure it matches the height of other inputs
  }),
  menuList: (provided) => ({
    ...provided,
    maxHeight: '80px',
    overflowY: 'auto', // Enable vertical scrolling
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
};



    const GuestAddressModal = ({ show, onHide, selectedId, addresses, handleAddressChange, setSelectedAddress }) => {
    const [loadingAdd, setLoadingAdd] = useState(false);
    const [newAddress, setNewAddress] = useState({
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
    category: 'Home',
    });

    const [selectedState, setSelectedState] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const [cityOptions, setCityOptions] = useState([]);
    const { addAddress } = useUserDetails();
    const [errors, setErrors] = useState({});

    // Populate state options from local data
    const stateOptions = Object.keys(IndiaStatesAndCities).map(state => ({
    value: state,
    label: state
    }));

    const handleStateChange = (selectedOption) => {
    setSelectedState(selectedOption);
    setNewAddress(prevState => ({
    ...prevState,
    state: selectedOption.value,
    }));

// Fetch cities based on selected state from the imported JSON data
    const cities = IndiaStatesAndCities[selectedOption.value];

    // Populate city options based on selected state
    setCityOptions(cities.map(city => ({
    value: city,
    label: city
    })));
    setSelectedCity(null); // Reset city selection
    };

    const handleCityChange = (selectedOption) => {
    setSelectedCity(selectedOption);
    setNewAddress(prevState => ({
    ...prevState,
    city: selectedOption.value
    }));
    };


const formFields = [
{ label: "Receiver's Name", type: 'text', placeholder: 'Enter name', value: newAddress.name, errorKey: 'name', field: 'name' },
{ label: 'Contact Number', type: 'tel', placeholder: 'Enter contact number', value: newAddress.contact_no, errorKey: 'contact_no', field: 'contact_no' },
{ label: 'Email', type: 'email', placeholder: 'Enter email', value: newAddress.email, errorKey: 'email', field: 'email' },
{ label: 'House/Flat/Block No', type: 'text', placeholder: 'Enter address line 1', value: newAddress.line1, errorKey: 'line1', field: 'line1' },
{ label: 'Apartment/Road/Area', type: 'text', placeholder: 'Enter address line 2', value: newAddress.line2, errorKey: 'line2', field: 'line2' },
{ label: 'Landmark (Optional)', type: 'text', placeholder: 'Enter landmark', value: newAddress.landmark, field: 'landmark' },
{ label: 'Country', type: 'text', value: 'India', field: 'country', disabled: true },
];

// Handle input changes dynamically
const handleInputChange = (field, value) => {
setNewAddress((prevState) => ({
...prevState,
[field]: value,
}));
};

const validatePhoneNumber = (number) => {
const phoneNumberPattern = /^[6-9]\d{9}$/; // Assumes 10 digits, starts with 6-9 (India format)
return phoneNumberPattern.test(number);
};

// Validate email format
const validateEmail = (email) => {
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex pattern
return emailPattern.test(email);
};

// Validate form inputs
const validateForm = () => {
let newErrors = {};
if (!newAddress.name) newErrors.name = 'Receiver\'s Name is required';
if (!newAddress.contact_no) newErrors.contact_no = 'Contact Number is required';
else if (!validatePhoneNumber(newAddress.contact_no)) newErrors.contact_no = 'Enter a valid 10-digit mobile number';
if (!newAddress.email) newErrors.email = 'Email is required';
else if (!validateEmail(newAddress.email)) newErrors.email = 'Enter a valid email address';
if (!newAddress.line1) newErrors.line1 = 'House/Flat/Block No is required';
if (!newAddress.line2) newErrors.line2 = 'Apartment/Road/Area is required';
if (!newAddress.state) newErrors.state = 'State is required';
if (!newAddress.city) newErrors.city = 'City is required';
if (!newAddress.pincode) newErrors.pincode = 'Pincode is required';

setErrors(newErrors);
return Object.keys(newErrors).length === 0;
};

const handleSaveAddress = async () => {
if (validateForm()) {
setLoadingAdd(true);

try {
const success = await addAddress(newAddress);
if (success) {
setSelectedAddress(newAddress);
handleAddressChange(newAddress);
toast.success('Address added successfully!');
onHide();
} else {
toast.error('Failed to add address. Please try again.');
}
} catch (error) {
console.error("Error adding address:", error);
toast.error('An error occurred while adding the address.');
} finally {
setLoadingAdd(false);
}
}
};

return (
    <Modal show={show} onHide={onHide} className='guestAddressModal' centered>
    <Modal.Header closeButton>
    <Modal.Title className='anaText'>Add New Address</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <Form className='guestmodalForm'>
    {formFields.map(({ label, type, placeholder, value, errorKey, field, disabled }) => (
    <Form.Group as={Row} controlId={`form-${field}`} className="mb-3" key={field}>
    <Form.Label column sm="4" className='guestlabel'>{label}</Form.Label>
    <Col sm="8">
    <Form.Control
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={(e) => handleInputChange(field, e.target.value)}
    isInvalid={!!errors[errorKey]}
    disabled={disabled}
    className='guestAddressInput'
    style={{backgroundColor: '#DDDBC6'}}
    />
    {errors[errorKey] && (
    <Form.Control.Feedback type="invalid">{errors[errorKey]}</Form.Control.Feedback>
    )}
    </Col>
    </Form.Group>
    ))}

    {/* State Dropdown */}
    <Form.Group as={Row} controlId="formState" className="mb-3">
    <Form.Label column sm="4" className='guestlabel'>State</Form.Label>
    <Col sm="8">
    <Select
    options={stateOptions}
    value={selectedState}
    onChange={handleStateChange}
    styles={customSelectStyles}
    placeholder="Select State"
    />
    {errors.state && <div className="error-text">{errors.state}</div>}
    </Col>
    </Form.Group>

    {/* City Dropdown */}
    <Form.Group as={Row} controlId="formCity" className="mb-3">
    <Form.Label column sm="4" className='guestlabel'>City</Form.Label>
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
    <Form.Label column sm="4" className='guestlabel'>Pincode</Form.Label>
    <Col sm="8">
    <Form.Control
    type="text"
    placeholder="Enter pincode"
    className='guestAddressInput'
    value={newAddress.pincode}
    onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
    isInvalid={!!errors.pincode}
    />
    <Form.Control.Feedback type="invalid">{errors.pincode}</Form.Control.Feedback>
    </Col>
    </Form.Group>
    </Form>
    </Modal.Body>
    <Modal.Footer className='d-flex justify-content-center align-items-center'>
    <button className= 'guestnewaddressButton' onClick={handleSaveAddress} disabled={loadingAdd}>
    {loadingAdd ? 'Saving...' : 'Add Address'}
    </button>
    </Modal.Footer>
    </Modal>
    );
};

export default GuestAddressModal;

