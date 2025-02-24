import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import '../assets/styles/editaddressmodalstyles.css'
import Select from 'react-select';
import IndiaStatesAndCities from '../data/indiaStatesAndCites.json';




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


const EditAddressModal = ({ show, onHide, address, saveAddress }) => {
  const [editedAddress, setEditedAddress] = useState({ ...address });
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [stateOptions, setStateOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);

  useEffect(() => {
    setEditedAddress({ ...address });
    loadStates();

  }, [address]);

  // Function to load states based on the country (India is default)
  const loadStates = () => {
    const states = Object.keys(IndiaStatesAndCities).map(state => ({
      value: state,
      label: state,
    }));
    setStateOptions(states);

    // Pre-select state and load cities if state exists in the address
    const stateOption = states.find(option => option.label === address.state);
    if (stateOption) {
      setSelectedState(stateOption);
      loadCities(stateOption.value, address.city);
    }
  };

  // Function to load cities based on the selected state from the JSON data
  const loadCities = (stateName, preselectCity = null) => {
    const cities = IndiaStatesAndCities[stateName] || [];

    const cityOptions = cities.map(city => ({
      value: city,
      label: city,
    }));
    setCityOptions(cityOptions);

    if (preselectCity) {
      const cityOption = cityOptions.find(city => city.label === preselectCity);
      setSelectedCity(cityOption || null);
    }
  };

  // Handle state change and load corresponding cities
  const handleStateChange = (selectedOption) => {
    setSelectedState(selectedOption);
    setEditedAddress(prevState => ({
      ...prevState,
      state: selectedOption.label,
      city: '', // Reset city when state changes
    }));
    loadCities(selectedOption.value);
    setSelectedCity(null); 
  };

  const handleCityChange = (selectedOption) => {
    setSelectedCity(selectedOption);
    setEditedAddress(prevState => ({
      ...prevState,
      city: selectedOption.label,
    }));
  };



  const handleChange = (e) => {
    setEditedAddress({ ...editedAddress, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    const updatedFields = Object.keys(editedAddress).reduce((acc, key) => {
      if (editedAddress[key] !== address[key]) {
        acc[key] = editedAddress[key];
      }
      return acc;
    }, {});

    saveAddress(editedAddress.ID, updatedFields); // Pass only updated fields
    onHide(); // Close the modal after saving
  };
  return (
    <Modal show={show} onHide={onHide} centered className='editModal'>
      <div className="editModalContainer p-4">
        <h4 className="mb-4 text-center edaText">Edit Address</h4>
        <Form className='editmodalForm'>
          <Form.Group as={Row} className="mb-3" controlId="formReceiverName">
            <Form.Label column sm="4" className='editLabel'>Receiver's name</Form.Label>
            <Col sm="8">
              <Form.Control
                type="text"
                name="name"
                value={editedAddress?.name}
                onChange={handleChange}
                className='editadressinput'
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formContactNumber">
            <Form.Label className='editLabel' column sm="4">Receiver's Contact Number</Form.Label>
            <Col sm="8">
              <Form.Control
                type="text"
                name="contact_no"
                value={editedAddress?.contact_no}
                onChange={handleChange}
                className='editadressinput'
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formContactNumber">
            <Form.Label className='editLabel' column sm="4">Email</Form.Label>
            <Col sm="8">
              <Form.Control
                type="text"
                name="email"
                value={editedAddress?.email}
                onChange={handleChange}
                className='editadressinput'
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formHouseNo">
            <Form.Label className='editLabel' column sm="4">House/Flat/Block No</Form.Label>
            <Col sm="8">
              <Form.Control
                type="text"
                name="line1"
                value={editedAddress?.line1}
                onChange={handleChange}
                className='editadressinput'
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formAddress">
            <Form.Label className='editLabel' column sm="4">Apartment/Road/Area</Form.Label>
            <Col sm="8">
              <Form.Control
                type="text"
                name="line2"
                value={editedAddress?.line2}
                onChange={handleChange}
                className='editadressinput'
              />
            </Col>
          </Form.Group>

          {editedAddress.landmark && (
            <Form.Group as={Row} className="mb-3" controlId="formLandmark">
              <Form.Label className='editLabel' column sm="4">Landmark</Form.Label>
              <Col sm="8">
                <Form.Control
                  type="text"
                  name="landmark"
                  value={editedAddress?.landmark}
                  onChange={handleChange}
                  className='editadressinput'
                />
              </Col>
            </Form.Group>
          )}

          <Form.Group as={Row} className="mb-3" controlId="formCountry">
            <Form.Label className="editLabel" column sm="4">Country</Form.Label>
            <Col sm="8">
              <Form.Control 
                type="text" 
                value="India" 
                disabled 
                className="editadressinput"
                style={{backgroundColor: '#DDDBC6'}}
              />
            </Col>
          </Form.Group>

           {/* State Dropdown */}
           <Form.Group as={Row} className="mb-3" controlId="formState">
            <Form.Label className='editLabel' column sm="4">State</Form.Label>
            <Col sm="8">
              <Select
                options={stateOptions}
                value={selectedState}
                onChange={handleStateChange}
                placeholder="Select State"
                styles={customSelectStyles}
                className='editadressinput'
              />
            </Col>
          </Form.Group>

          {/* City Dropdown */}
          <Form.Group as={Row} className="mb-3" controlId="formCity">
            <Form.Label className='editLabel' column sm="4">City</Form.Label>
            <Col sm="8">
              <Select
                options={cityOptions}
                value={selectedCity}
                onChange={handleCityChange}
                placeholder="Select City"
                styles={customSelectStyles}
                isDisabled={!selectedState}
                className='editadressinput' // Disable if no state is selected
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formPincode">
            <Form.Label className='editLabel' column sm="4">Pin Code</Form.Label>
            <Col sm="8">
              <Form.Control
                type="text"
                name="pincode"
                value={editedAddress?.pincode}
                onChange={handleChange}
                className='editadressinput'
              />
            </Col>
          </Form.Group>
        </Form>

        <div className="d-flex justify-content-around mt-4">
          <button className='ecButton' onClick={onHide}>Cancel</button>
          <button  className='ecButton esButton' onClick={handleSave}>Save</button>
        </div>
      </div>
    </Modal>
  );
};

export default EditAddressModal;