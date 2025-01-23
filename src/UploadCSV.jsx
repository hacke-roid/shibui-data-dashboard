import React from "react";
import Papa from "papaparse";
import "./UploadCSV.css";

const UploadCSV = ({ onFileUpload }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
          onFileUpload(results.data); // Pass parsed CSV data to the parent component
        },
      });
    }
  };

  return (
    <div className="upload-csv">
      <h2>Upload CSV File</h2>
      <input type="file" accept=".csv" onChange={handleFileChange} />
    </div>
  );
};

export default UploadCSV;
