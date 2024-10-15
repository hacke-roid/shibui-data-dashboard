import React from "react";

const DataTable = ({ data }) => {
  if (!data.length) return <p>No data available</p>;

  const headers = Object.keys(data[0]);

  return (
    <div className="data-table">
      <h2>Data Table</h2>
      <table>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {headers.map((header) => (
                <td key={header}>{row[header]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
