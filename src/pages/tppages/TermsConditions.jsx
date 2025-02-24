import React from 'react'
import HeaderCard from '../../components/HeaderCard'
import { Container, Row, Col } from 'react-bootstrap'
import '../../assets/styles/termsstyles.css'


const TermsConditions = () => {

    
  return (
    <Container fluid className='termsPageContainer'>
       <HeaderCard backgroundColor={"#3EA66B"} color={"#F4E003"} name="Terms and Conditions" />    
       <Row className='p-3'>
        <Col xs={12}>
        <h3 className='termTitleText'>Introduction</h3>
        <p className='ps-4 termDescText'>Welcome to Hiphop Tamizha. These Terms and Conditions (“Terms”) govern your use of our website, Android app, and iOS app (collectively, the “Services”). By accessing or using our Services, you agree to be bound by these Terms. If you do not agree with these Terms, please do not use our Services.</p>
        </Col>
        <Col xs={12}>
        <h3 className='termTitleText'>Definitions</h3>
        <ul className='ps-4'>
            <li style={{color: 'black'}}><p className='termDescText m-0 p-0 py-1'><span className='termspanText'>Hiphop Tamizha,” “we,” “us,” or “our”</span> refers to Hiphop Tamizha and its subsidiaries and affiliates.</p></li>
            <li style={{color: 'black'}}><p className='termDescText m-0 p-0 py-1'><span className='termspanText'>“User,” “you,” or “your”</span> refers to any person who accesses or uses our Services.</p></li>
            <li style={{color: 'black'}}><p className='termDescText m-0 p-0 py-1'><span className='termspanText'>“Content” </span>refers to any text, images, videos, graphics, or other materials uploaded, downloaded, or appearing on our Services.</p></li>
        </ul>
        </Col>
        <Col xs={12}>
        <h3 className='termTitleText'>Use of Services</h3>
         <h6 className='termheadingText'>Eligibility</h6>
         <p className='ps-4 termDescText'>You must be at least 18 years old to use our Services. By using our Services, you represent and warrant that you meet this age requirement.</p>
         <h6 className='termheadingText'>Account Registration</h6>
         <p className='ps-4 termDescText'>To access certain features of our Services, you may need to register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete. You are responsible for safeguarding your password and any activities or actions under your account.</p>
         <h6 className='termheadingText'>User Conduct</h6>
         <p className='ps-4 termDescText'>You agree not to use our Services for any unlawful purpose or in any way that might harm, disrupt, or otherwise interfere with the operation of the Services or the use and enjoyment of the Services by others. Specifically, you agree not to:</p>
         <ul className='ps-4'>
            <li style={{color: 'black'}}><p className='termDescText m-0 p-0 py-1'>Violate any applicable laws or regulations.</p></li>
            <li style={{color: 'black'}}><p className='termDescText m-0 p-0 py-1'>Infringe on the rights of any third party, including intellectual property, privacy, and publicity rights.</p></li>
            <li style={{color: 'black'}}><p className='termDescText m-0 p-0 py-1'>Upload or distribute any harmful, obscene, or otherwise objectionable content.</p></li>
            <li style={{color: 'black'}}><p className='termDescText m-0 p-0 py-1'>Use our Services to transmit any unsolicited commercial communications (spam).</p></li>
            <li style={{color: 'black'}}><p className='termDescText m-0 p-0 py-1'>Engage in any activity that could harm the reputation or interests of Hiphop Tamizha.</p></li>
        </ul>
        </Col>
        <Col xs={12}>
        <h3 className='termTitleText'>Intellectual Property</h3>
        <p className='ps-4 termDescText'>All intellectual property rights in and to the Services and the Content are owned by Hiphop Tamizha or its licensors. You agree not to copy, modify, distribute, sell, or lease any part of our Services or Content without our prior written consent.</p>
        </Col>
        <Col xs={12}>
        <h3 className='termTitleText'>User-Generated Content</h3>
         <h6 className='termheadingText'>License</h6>
         <p className='ps-4 termDescText'>By submitting, posting, or displaying Content on or through our Services, you grant Hiphop Tamizha a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, translate, distribute, and display such Content in any media or distribution method.</p>
         <h6 className='termheadingText'>Responsibility</h6>
         <p className='ps-4 termDescText'>You are solely responsible for the Content you upload, post, or otherwise make available through our Services. You represent and warrant that you have all rights necessary to grant us the rights granted herein and that such Content does not infringe on any third-party rights.</p>
        </Col>
        <Col xs={12}>
        <h3 className='termTitleText'>Privacy</h3>
        <p className='ps-4 termDescText'>Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your information when you use our Services. By using our Services, you consent to the collection and use of your information as outlined in our Privacy Policy.</p>
        </Col>
        <Col xs={12}>
        <h3 className='termTitleText'>Third-Party Links and Services</h3>
        <p className='ps-4 termDescText'>Our Services may contain links to third-party websites or services that are not owned or controlled by Hiphop Tamizha. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services. You acknowledge and agree that Hiphop Tamizha shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods, or services available on or through any such websites or services.</p>
        </Col>
        <Col xs={12}>
        <h3 className='termTitleText'>Disclaimers and Limitation of Liability</h3>
         <h6 className='termheadingText'>Disclaimers</h6>
         <p className='ps-4 termDescText'>Your use of our Services is at your sole risk. The Services are provided on an “as is” and “as available” basis. Hiphop Tamizha expressly disclaims all warranties of any kind, whether express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, and non-infringement.</p>
         <h3 className='termheadingText'>Limitation of Liability</h3>
         <p className='ps-4 termDescText'>Hiphop Tamizha shall not be liable for any direct, indirect, incidental, special, consequential, or exemplary damages, including but not limited to damages for loss of profits, goodwill, use, data, or other intangible losses (even if Hiphop Tamizha has been advised of the possibility of such damages), resulting from:</p>
        <ul className='ps-4'>
            <li style={{color: 'black'}}><p className='termDescText m-0 p-0 py-1'>The use or inability to use our Services.</p></li>
            <li style={{color: 'black'}}><p className='termDescText m-0 p-0 py-1'>Any unauthorized access to or alteration of your transmissions or data.</p></li>
            <li style={{color: 'black'}}><p className='termDescText m-0 p-0 py-1'>Any statements or conduct of any third party on our Services.</p></li>
            <li style={{color: 'black'}}><p className='termDescText m-0 p-0 py-1'>Any other matter relating to our Services.</p></li>
        </ul>
        </Col>
        <Col xs={12}>
        <h3 className='termTitleText'>Indemnification</h3>
        <p className='ps-4 termDescText'>You agree to indemnify, defend, and hold harmless Hiphop Tamizha and its affiliates, officers, agents, employees, partners, and licensors from and against any claims, liabilities, damages, losses, and expenses, including but not limited to reasonable legal and accounting fees, arising out of or in any way connected with your access to or use of our Services, or your violation of these Terms.</p>
        </Col>
        <Col xs={12}>
        <h3 className='termTitleText'>Termination</h3>
        <p className='ps-4 termDescText'>Hiphop Tamizha may terminate or suspend your account and access to our Services immediately, without prior notice or liability, if you breach these Terms or for any other reason. Upon termination, your right to use the Services will immediately cease.</p>
        </Col>
        <Col xs={12}>
        <h3 className='termTitleText'>Governing Law</h3>
        <p className='ps-4 termDescText'>These Terms shall be governed and construed in accordance with the laws of [Your Country/State], without regard to its conflict of law provisions. Any legal action or proceeding arising under these Terms will be brought exclusively in the federal or state courts located in [Your Jurisdiction], and the parties hereby irrevocably consent to the personal jurisdiction and venue therein.</p>
        </Col>
        <Col xs={12}>
        <h3 className='termTitleText'>Changes to Terms</h3>
        <p className='ps-4 termDescText'>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days’ notice prior to any new terms taking effect. By continuing to access or use our Services after those revisions become effective, you agree to be bound by the revised Terms.</p>
        </Col>
        <Col xs={12}>
        <h3 className='termTitleText'>Contact Us</h3>
        <p className='ps-4 termDescText'>If you have any questions about these Terms, please contact us at:</p>
        <ul className='ps-4'>
            <li style={{color: 'black'}}><p className='termDescText m-0 p-0 py-1'><span className='termspanText'>Email:</span> customercare@hiphoptamizha.in</p></li>
        </ul>
        </Col>
        </Row>  
    </Container>
  )
}

export default TermsConditions