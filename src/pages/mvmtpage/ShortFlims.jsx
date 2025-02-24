import React from 'react';
import { Container, Image, Row, Col } from 'react-bootstrap';
import '../../assets/styles/shortflimstyles.css'
import 'react-lazy-load-image-component/src/effects/blur.css';
import { motion } from "framer-motion";
import CSM from '../../assets/images/csm.png'
import FAV from '../../assets/images/hhtlogo.png'
import HeaderCard from '../../components/HeaderCard';
import ShortFlimCard from '../../components/ShortFlimCard';
import { useShortFlims } from '../../contexts/ShortFlimsContext';

const ShortFlims = () => {

  const {shortFlims} = useShortFlims()

    const MotionContainer = motion(Container);

    const textVariants = {
        hidden: {
            opacity: 0,
            x: -100
        },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: 'spring',
                stiffness: 110,
                damping: 4,
                delay: 0.3,
                duration: 1,
            }
        }
    };

  return (
    <Container fluid className='shortFlimContainer'>
    <HeaderCard backgroundColor={"#F5BE49"} color={"#57A5BB"} name={"ஆவணப் படங்கள்"}/>
    <MotionContainer fluid className='my-3 ms-1'>
        <Row>
          {shortFlims.length > 0 ? (
            <Col xs={12}>
              <p className='shortflimText'>Short Flims</p>
              <ShortFlimCard flims={shortFlims} />
            </Col>
          ) : (
          <motion.div variants={textVariants} initial='hidden' animate='visible' className='cmSoonContainer d-flex justify-content-center align-items-center my-3'>
            <Image fluid src={CSM} className='csmImage'/>
           </motion.div>
          )}
        </Row>
      </MotionContainer>
    </Container>
  );
};

export default ShortFlims;

