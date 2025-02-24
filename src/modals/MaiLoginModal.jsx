import React, { useState } from 'react';
import { Modal, Form } from 'react-bootstrap';
import '../assets/styles/mailmodalstyles.css';
import { FaGoogle, FaArrowRight } from 'react-icons/fa';

const MailLoginModal = ({ show, onHide }) => {
    const [showRecover, setShowRecover] = useState(false);
    const [showMember, setShowMember] = useState(false);

    const handleRecoverClick = () => {
        setShowRecover(true);
        setShowMember(false);
    };

    const handleBackToLoginClick = () => {
        setShowRecover(false);
        setShowMember(false);
    };

    const handleNotAMemberClick = () => {
        setShowMember(true);
        setShowRecover(false);
    };

    return (
        <Modal show={show} onHide={onHide} centered className='mailModalContainer p-3' size="lg">
            <Modal.Header closeButton></Modal.Header>
            {!showRecover && !showMember ? (
                <>
                    <div className='mailTextContainer text-center'>
                        <h4>Sign In</h4>
                        <p>Welcome back! Please sign in to your account. You can log in using Google or your standard user credentials.</p>
                    </div>
                    <div className='gIconContainer'>
                        <div className='googleIcon'>
                            <FaGoogle /> 
                        </div>
                    </div>
                    <div className='orContainer'>
                        <p>OR</p>
                    </div>
                    <div className='credentialsContainer'>
                        <Form style={{ width: '80%' }}>
                            <Form.Group controlId="formEmailOrUsername" className="mb-3">
                                <Form.Control type="text" placeholder="Email or username" className='inputField' />
                            </Form.Group>
                            <Form.Group controlId="formPassword" className="mb-3">
                                <Form.Control type="password" placeholder="Password" className='inputField' />
                            </Form.Group>
                        </Form>
                        <button className='signInButton'>Sign In</button>
                    </div>
                    <div className='memberContainer mt-3 text-center'>
                        <a href='#' onClick={handleRecoverClick} className='memeberContainerText my-1 d-block'>Recover your password <FaArrowRight className='faArrowicon' /></a>
                        <a href='#' onClick={handleNotAMemberClick} className='memeberContainerText my-1 d-block'>Not a member yet <FaArrowRight className='faArrowicon' /></a>
                    </div>
                </>
            ) : showRecover ? (
                <div className='recoverContainer'>
                    <div className='recoverTextContainer text-center'>
                        <h4>Recover Password</h4>
                        <p>Enter the username or email associated with your account</p>
                    </div>
                    <div className='credentialsContainer'>
                        <Form style={{ width: '80%' }}>
                            <Form.Group controlId="formEmailOrUsername" className="mb-3">
                                <Form.Control type="text" placeholder="Email" className='inputField' />
                            </Form.Group>
                        </Form>
                        <button className='signInButton'>Submit Reset</button>
                        <p onClick={handleBackToLoginClick} style={{ alignSelf: 'center', marginTop: '10px', cursor: 'pointer' }}>Cancel and go back to login page</p>
                    </div>
                </div>
            ) : (
                <div className='memberContainer'>
                    <div className='memberTextContainer text-center'>
                        <h4>REGISTER</h4>
                        <p>Create a new account. You can sign up with your facebook or twitter accunt. Or your regular user login.</p>
                    </div>
                    <div className='credentialsContainer'>
                        <Form style={{ width: '80%' }}>
                            <Form.Group controlId="formEmailOrUsername" className="mb-3">
                                <Form.Control type="text" placeholder="Username / Email Address" className='inputField' />
                            </Form.Group>
                            <Form.Group controlId="formPassword" className="mb-3">
                                <Form.Control type="password" placeholder="Password" className='inputField' />
                            </Form.Group>
                            <Form.Group controlId="formPassword" className="mb-3">
                                <Form.Control type="password" placeholder="Repeat Password" className='inputField' />
                            </Form.Group>
                        </Form>
                        <button className='signInButton my-2'>Sign Up</button>
                        <button className='signInButton my-2' onClick={handleBackToLoginClick}>Back to Login</button>           
                    </div>
                </div>
            )}
            <Modal.Footer></Modal.Footer>
        </Modal>
    );
};

export default MailLoginModal;
