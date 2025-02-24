import React from 'react'
import HeaderCard from '../../components/HeaderCard'
import { Container, Row, Col } from 'react-bootstrap'
import '../../assets/styles/termsstyles.css'


const ReturnPolicy = () => {

    
  return (
    <Container fluid className='termsPageContainer'>
       <HeaderCard backgroundColor={"#3EA66B"} color={"#F4E003"} name="Return Policy" />    
       <Row className='p-3'>
        <Col xs={12}>
        <h3 className='termTitleText'>Introduction</h3>
        <p className='ps-4 termDescText'>We appreciate your purchase and value your trust in our products. While we are committed to ensuring a great customer experience, please be aware that we operate under a strict no-refund policy. However, we are happy to offer exchanges within a specified time frame under the following conditions:</p>
        </Col>
        <Col xs={12}>
        <h3 className='termTitleText'>Refund Policy:</h3>
          <ul className='ps-4'>
              <li style={{color: 'black'}}>
                  <p className='termDescText m-0 p-0 py-1'>
                      We strive to ensure customer satisfaction with every purchase. If you are not fully satisfied with your order, a refund may be available under certain conditions. Refund requests must be made within 7 working days from the date of purchase. 
                  </p>
              </li>
              <li style={{color: 'black'}}>
                  <p className='termDescText m-0 p-0 py-1'>
                      Please note, all refund requests will be reviewed on a case-by-case basis, and the product must be returned in its original condition. Refunds will be processed within 7 working days after approval.
                  </p>
              </li>
          </ul>
        </Col>
        <Col xs={12}>
        <h3 className='termTitleText'>Eligibility for Exchanges:</h3>
         <ul className='ps-4'>
            <li style={{color: 'black'}}><p className='termDescText m-0 p-0 py-1'>Customers may request an exchange within 3 days of receiving their order</p></li>
            <li style={{color: 'black'}}><p className='termDescText m-0 p-0 py-1'>To be eligible for an exchange, the item must be unused, unwashed, and in the same condition as received, with the original packaging intact</p></li>
            <li style={{color: 'black'}}><p className='termDescText m-0 p-0 py-1'>Only items meeting these conditions are eligible for exchange.</p></li>
        </ul>
        </Col>
        <Col xs={12}>
        <h3 className='termTitleText'>Process for Exchanges:</h3>
        <ul className='ps-4'>
            <li style={{color: 'black'}}><p className='termDescText m-0 p-0 py-1'>To initiate an exchange, please contact our support team at [shop@hiphoptamizha.com] within 3 days of receiving your item.</p></li>
            <li style={{color: 'black'}}><p className='termDescText m-0 p-0 py-1'>Once your item is received and inspected, we will notify you of the approval or rejection of your exchange.</p></li>
            <li style={{color: 'black'}}><p className='termDescText m-0 p-0 py-1'>If approved, we will exchange the product for the same item or another item of equal value, depending on availability.</p></li>
            <li style={{color: 'black'}}><p className='termDescText m-0 p-0 py-1'>The customer is responsible for shipping costs related to both returning the original item and receiving the exchanged item.</p></li>
        </ul>
        </Col>
        <Col xs={12}>
        <h3 className='termTitleText'>Non-Exchangeable Items:</h3>
        <ul className='ps-4'>
            <li style={{color: 'black'}}><p className='termDescText m-0 p-0 py-1'>Items purchased during sales, promotions, or special discounts are not eligible for exchanges.</p></li>
            <li style={{color: 'black'}}><p className='termDescText m-0 p-0 py-1'>Items damaged due to improper use, care, or shipping will not be accepted for exchange.</p></li>
            <li style={{color: 'black'}}><p className='termDescText m-0 p-0 py-1'>For further inquiries or assistance, please contact us at [shop@hiphoptamizha.com].</p></li>
        </ul>
        </Col>
        </Row>  
    </Container>
  )
}

export default ReturnPolicy