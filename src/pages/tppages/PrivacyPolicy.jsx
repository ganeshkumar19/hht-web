import React from 'react'
import HeaderCard from '../../components/HeaderCard'
import { Container, Row, Col } from 'react-bootstrap'
import '../../assets/styles/privacystyles.css'


const PrivacyPolicy = () => {

    
  return (
    <Container fluid className='privacyPageContainer'>
       <HeaderCard backgroundColor={"#3EA66B"} color={"#F4E003"} name="Privacy Policy" />    
       <Row className='p-3'>
        <Col xs={12}>
        <h3 className='termprivacyText'>Introduction</h3>
        <p className='ps-4 privacydescText'>This Privacy Policy details the manner in which Hiphop Tamizha (“Hiphop Tamizha,” “We,” “Us,” “Our”) collects, stores, manages, and handles the end users’ (“You,” “Your,” “User”) information made available through our website, Android app, and iOS app (collectively, the “Services”). Hiphop Tamizha values the trust You place in us. That’s why we insist upon the highest standards for secure transactions and customer information privacy. Please read the following statement to learn about our information gathering and dissemination practices.  </p>
        </Col>
        <Col xs={12}>
        <h3 className='termprivacyText'>Information Collection</h3>
        <p className='ps-4 privacydescText'>We collect information to provide better services to all our users. The types of personal information we collect include:</p>
        <h6 className='privacyheadingText'>Personal Identification Information: </h6>
        <ul className='ps-4'>
            <li style={{color: 'black'}}><p className='privacydescText m-0 p-0 py-1'>Name</p></li>
            <li style={{color: 'black'}}><p className='privacydescText m-0 p-0 py-1'>Email address</p></li>
            <li style={{color: 'black'}}><p className='privacydescText m-0 p-0 py-1'>Phone number</p></li>
            <li style={{color: 'black'}}><p className='privacydescText m-0 p-0 py-1'>Address</p></li>
        </ul>
        <h6 className='privacyheadingText'>Browsing Information:</h6>
        <ul className='ps-4'>
            <li style={{color: 'black'}}><p className='privacydescText m-0 p-0 py-1'>IP address</p></li>
            <li style={{color: 'black'}}><p className='privacydescText m-0 p-0 py-1'>Browser type</p></li>
            <li style={{color: 'black'}}><p className='privacydescText m-0 p-0 py-1'>Language</p></li>
            <li style={{color: 'black'}}><p className='privacydescText m-0 p-0 py-1'>Access times</p></li>
            <li style={{color: 'black'}}><p className='privacydescText m-0 p-0 py-1'>Referring website addresses</p></li>
            <li style={{color: 'black'}}><p className='privacydescText m-0 p-0 py-1'>Other information about your interactions with our Services </p></li>
        </ul>
        </Col>
        <Col xs={12}>
        <h3 className='termprivacyText'>How We Use Your Information </h3>
         <p className='ps-4 privacydescText'>The information we collect is used in the following ways:</p>
         <ul className='ps-4'>
            <li style={{color: 'black'}}><p className='privacydescText m-0 p-0 py-1'>To improve our Services and personalize your experience.</p></li>
            <li style={{color: 'black'}}><p className='privacydescText m-0 p-0 py-1'>To communicate with you about our services, including updates  and customer support. </p></li>
            <li style={{color: 'black'}}><p className='privacydescText m-0 p-0 py-1'>To conduct research and analysis.</p></li>
        </ul>
        </Col>
        <Col xs={12}>
        <h3 className='termprivacyText'>Sharing Your Information</h3>
        <p className='ps-4 privacydescText'>We do not sell, trade, or otherwise transfer to outside parties your Personally Identifiable Information except in the following cases: </p>
        <ul className='ps-4'>
            <li style={{color: 'black'}}><p className='privacydescText m-0 p-0 py-1'>For legal reasons, such as to comply with a subpoena or similar legal process. </p></li>
            <li style={{color: 'black'}}><p className='privacydescText m-0 p-0 py-1'>To trusted third parties who assist us in operating our Services, conducting our business, or serving our users, as long as those parties agree to keep this information confidential. </p></li>
        </ul>
        </Col>
        <Col xs={12}>
        <h3 className='termprivacyText'>Data Security</h3>
         <p className='ps-4 privacydescText'>We implement a variety of security measures to maintain the safety of your personal information. However, no method of transmission over the Internet or method of electronic storage is 100% secure, and we cannot guarantee its absolute security. </p>
        </Col>
        <Col xs={12}>
        <h3 className='termprivacyText'>Cookies and Tracking Technologies</h3>
        <p className='ps-4 privacydescText'>We may use cookies, web beacons, and other tracking technologies to enhance your experience and gather information about visitors and visits to our Services. You can choose to have your computer warn you each time a cookie is being sent, or you can choose to turn off all cookies. </p>
        </Col>
        <Col xs={12}>
        <h3 className='termprivacyText'>Third-Party Links</h3>
        <p className='ps-4 privacydescText'>Occasionally, at our discretion, we may include or offer third-party products or services on our Services. These third-party sites have separate and independent privacy policies. We, therefore, have no responsibility or liability for the content and activities of these linked sites. </p>
        </Col>
        <Col xs={12}>
        <h3 className='termprivacyText'>Your Rights</h3>
         <p className='ps-4 privacydescText'>You have the right to access, correct, or delete your personal information. If you wish to exercise these rights, please contact us at the provided contact details. </p>
        <ul className='ps-4'>
            <li style={{color: 'black'}}><p className='privacydescText m-0 p-0 py-1'>The use or inability to use our Services.</p></li>
            <li style={{color: 'black'}}><p className='privacydescText m-0 p-0 py-1'>Any unauthorized access to or alteration of your transmissions or data.</p></li>
            <li style={{color: 'black'}}><p className='privacydescText m-0 p-0 py-1'>Any statements or conduct of any third party on our Services.</p></li>
            <li style={{color: 'black'}}><p className='privacydescText m-0 p-0 py-1'>Any other matter relating to our Services.</p></li>
        </ul>
        </Col>
        <Col xs={12}>
        <h3 className='termprivacyText'>Changes to Our Privacy Policy </h3>
        <p className='ps-4 privacydescText'>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. We encourage you to review our Privacy Policy periodically for any changes. </p>
        </Col>
        <Col xs={12}>
        <h3 className='termprivacyText'>Contact Us</h3>
        <p className='ps-4 privacydescText'>If you have any questions about these Privacy Policy, please contact us at:</p>
        <ul className='ps-4'>
            <li style={{color: 'black'}}><p className='privacydescText m-0 p-0 py-1'><span className='privacyspanText'>Email:</span> customercare@hiphoptamizha.in</p></li>
            <li style={{color: 'black'}}><p className='privacydescText m-0 p-0 py-1'><span className='privacyspanText'>Address:</span> 14, Sivasakthi Colony, Ganapathy, Coimbatore -641006</p></li>
        </ul>
        </Col>
        <Col xs={12}>
        <h3 className='termprivacyText'>Collection of Personally Identifiable Information and Other Information </h3>
        <p className='ps-4 privacydescText'>When you use our Services, we collect and store your personal information provided by you from time to time. Our primary goal in doing so is to provide you with a safe, efficient, smooth, and customized experience. </p>
        <h6 className='privacyheadingText'>General Browsing</h6>
        <p className='ps-4 privacydescText'>In general, you can browse the Services without telling us who you are or revealing any personal information about yourself. Once you give us your personal information, you are not anonymous to us. </p>
        <h6 className='privacyheadingText'>Automatic Information Collection</h6>
        <p className='ps-4 privacydescText'>We automatically track certain information about you based upon your behavior on our Services. This information may include the URL that you just came from, which URL you next go to, your computer browser information, and your IP address.</p>
        </Col>
        <Col xs={12}>
        <h3 className='termprivacyText'>Cookies</h3>
        <p className='ps-4 privacydescText'>We use data collection devices such as “cookies” on certain pages of our Services to help analyze our web page flow, measure promotional effectiveness, and promote trust and safety. Cookies are small files placed on your hard drive that assist us in providing our services. </p>
        </Col>
        <Col xs={12}>
        <h3 className='termprivacyText'>Use of Demographic/Profile Data/Your Information </h3>
        <p className='ps-4 privacydescText'>We use personal information to provide the services you request. To the extent possible, we use your personal information to market to you or share information with certain other parties to market to you, we will provide you the ability to opt-out of such uses. </p>
        </Col>
        <Col xs={12}>
        <h3 className='termprivacyText'>Sharing of Personal Information</h3>
        <p className='ps-4 privacydescText'>We may share personal information with our affiliates and trusted third parties for various purposes, including to help with the detection and prevention of identity theft, fraud, and other potentially illegal acts. We may also disclose personal information if required to do so by law or in the good faith belief that such disclosure is reasonably necessary to respond to subpoenas, court orders, or other legal processes. </p>
        </Col>
        <Col xs={12}>
        <h3 className='termprivacyText'>Security Precautions</h3>
        <p className='ps-4 privacydescText'>Our Services have stringent security measures in place to protect the loss, misuse, and alteration of the information under our control. Whenever you change or access your account information, we offer the use of a secure server.  </p>
        </Col>
        <Col xs={12}>
        <h3 className='termprivacyText'>Choice/Opt-Out</h3>
        <p className='ps-4 privacydescText'>We provide all users with the opportunity to opt-out of receiving non-essential (promotional, marketing-related) communications from us on behalf of our partners, and from us in general, after setting up an account. </p>
        </Col>
        <Col xs={12}>
        <h3 className='termprivacyText'>Choice/Opt-Out</h3>
        <p className='ps-4 privacydescText'>We provide all users with the opportunity to opt-out of receiving non-essential (promotional, marketing-related) communications from us on behalf of our partners, and from us in general, after setting up an account. </p>
        </Col>
        <Col xs={12}>
        <h3 className='termprivacyText'>Account Deletion</h3>
        <p className='ps-4 privacydescText'>If you wish to delete your account from our Services, please send a request from your registered email ID to help@hiphoptamizha.in. Your account will be deleted as soon as is reasonably possible within 5-7 working days and confirmation of deletion of your account will be sent to your registered email ID. </p>
        </Col>
        <Col xs={12}>
        <h3 className='termprivacyText'>Advertisements on Our Services</h3>
        <p className='ps-4 privacydescText'>We use third-party advertising companies to serve ads when you visit our Services. These companies may use information (not including your name, address, email address, or mobile number) about your visits to our Services and other websites in order to provide advertisements about goods and services of interest to you. </p>
        </Col>
        <Col xs={12}>
        <h3 className='termprivacyText'>Your Consent</h3>
        <p className='ps-4 privacydescText'>By using our Services and/or by providing your information, you consent to the collection and use of the information you disclose on our Services in accordance with this Privacy Policy.</p>
        </Col>
        <Col xs={12}>
        <h3 className='termprivacyText'>Grievance Officer</h3>
        <p className='ps-4 privacydescText'>In accordance with the Information Technology Act 2000 and the rules made thereunder, the name and contact details of the Grievance Officer are provided below:</p>
        <ul className='ps-4'>
            <li style={{color: 'black'}}><p className='privacydescText m-0 p-0 py-1'><span className='privacyspanText'>Name:</span> Dharsan Kumar</p></li>
            <li style={{color: 'black'}}><p className='privacydescText m-0 p-0 py-1'><span className='privacyspanText'>Email:</span> enquiries@dhya.in</p></li>
            <li style={{color: 'black'}}><p className='privacydescText m-0 p-0 py-1'><span className='privacyspanText'>Address:</span> No.14, Ganapathy, Coimbatore - 641006</p></li>
        </ul>
        </Col>
        <Col xs={12}>
        <h3 className='termprivacyText'>Questions? </h3>
        <p className='ps-4 privacydescText'>Please contact us regarding any questions regarding this statement at customercare@hiphoptamizha.in. </p>
        </Col>
       
       
       
        </Row>  
    </Container>
  )
}

export default PrivacyPolicy