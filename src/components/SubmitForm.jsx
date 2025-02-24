import { Container, Row, Col, Table } from "react-bootstrap";
import '../assets/styles/submitformstyles.css'
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import DeleteModal from "../modals/DeleteModal";
import { useState } from "react";

const SubmitForm = ({  formData, onEdit, handleDelete}) => {
  const [showLogoutModal, setShowLogOutModal] = useState(false);

  const extractFileName = (url) => {
    const careerIndex = url.indexOf('career/') + 'career/'.length; 
    return url.substring(careerIndex);  
  };

  const formFields = [
    { label: "Name", value: `${formData.firstName} ${formData.lastName}` },
    { label: "DOB", value: formData.DOB },
    { label: "Contact Number", value: formData.contactNumber },
    { label: "Email", value: formData.email },
    { label: "Address", value: formData.address },
    { label: "Description", value: formData.Desc },
    { label: "Resume", value: formData.uploadedFileURL ? extractFileName(formData.uploadedFileURL) : 'No file uploaded' },
  ];


  const toggleShowLogoutModal = () => {
    setShowLogOutModal(!showLogoutModal);
  }
  return (
    <Container fluid className='submitFormContainer p-3'>
      <Row className="justify-content-end mb-3"> {/* This will align the items to the end (right) */}
        <Col xs="auto"> {/* Use "auto" to shrink the column to its content size */}
        {formData.submitted ? (
            <span className="submitEditIcon" onClick={toggleShowLogoutModal}>
              <FaTrash size={15} />
            </span>
          ) : (
            <span className="submitEditIcon">
              <FaEdit size={15} onClick={onEdit} />
            </span>
          )}
        </Col>
      </Row>
      <Table bordered hover responsive className="sbTable">
        <tbody className="sbBody">
          {formFields.map((field, index) => (
            <tr key={index} className="sbRow">
              <td className="sbTableLabel">{field.label}:</td>
              <td className="sbValue">{field.value}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <DeleteModal showModal={showLogoutModal} handleClose={toggleShowLogoutModal} handleDelete={handleDelete}/> 
    </Container>
  );
};

export default SubmitForm;
  