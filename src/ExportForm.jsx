import React from "react";
import { CSVLink } from "react-csv";

const ExportForm = ({ filteredData }) => {
  const headers = filteredData.length ? Object.keys(filteredData[0]) : [];

  return (
    <div className="export-form">
      <h2>Export Data</h2>
      {filteredData.length ? (
        <CSVLink
          data={filteredData}
          headers={headers}
          filename={`exported_data_${Date.now()}.csv`}
          className="btn btn-primary"
          target="_blank"
        >
          Download CSV
        </CSVLink>
      ) : (
        <p>No data to export</p>
      )}
    </div>
  );
};

export default ExportForm;
