import React, { useEffect, useRef, useState } from 'react';
import { FaUpload } from 'react-icons/fa';
import '../assets/styles/fileuploadstyles.css'
import { FaTimes } from "react-icons/fa"; // Importing upload icon from react-icons
import { toast } from 'react-toastify';

const FileUploadBox = ({ onFileUpload, file, setFormData }) => {
  const [uploadedFile, setUploadedFile] = useState(file);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setUploadedFile(file); 
  }, [file]);


  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      // Check if the file is a PDF or DOCX
      const fileExtension = selectedFile.name.split('.').pop().toLowerCase();
      if (fileExtension === "pdf" || fileExtension === "docx") {
        setUploadedFile(selectedFile);
        onFileUpload(selectedFile);
      } else {
        toast.error("Please upload the file in required format (PDF or DOCX).");
        event.target.value = null;  
      }
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setFormData(prevState => ({
      ...prevState,
      resumeFile: null,
      uploadedFileURL: '' 
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';  // Reset the input element
    }
  };

  return (
    <div className="w-100 d-flex justify-content-center my-4">
      <div className="file-upload-container">
        <div className='fuiContainer'>
          <div className='file-upload-textContainer'>
            <p className='m-0 p-0 fileUploadText'>ATTACH FILE (RESUME)</p>
          </div>
          <span className="upIcon" style={{ pointerEvents: file ? 'none' : 'auto', opacity: file ? 0.4 : 1 }}>
            <input
              ref={fileInputRef}
              id="file-upload-input"
              type="file"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            <label htmlFor="file-upload-input" className="file-upload-icon">
              <FaUpload size={16} />
            </label>
          </span>
        </div>
        {uploadedFile && (
          <div className='fileNameContainer mt-2'>
            <p className="uploaded-file-name p-0 m-0 me-4">
              {uploadedFile.name}
            </p>
            <FaTimes size={12} onClick={handleRemoveFile} />
          </div>
        )}
      </div>
    </div>
  );
};


export default FileUploadBox;
