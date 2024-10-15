import React, { useState, useEffect } from "react";
import UploadCSV from "./UploadCSV";
import DataTable from "./DataTable";
import ChartContainer from "./ChartContainer";
import FilterPanel from "./FilterPanel";
import ExportForm from "./ExportForm";
import { useUser } from './UserContext'; // Use useUser instead of UserContext
import './Dashboard.css'

function Dashboard() {
  const { user } = useUser(); // Get user from context
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [chartConfig, setChartConfig] = useState({
    type: "bar",
    xAxisLabel: "Sales",
    yAxisLabel: "Profit",
  });
  const [filters, setFilters] = useState({});

  useEffect(() => {
    const loadUserConfig = async () => {
      if (!user) return; // Don't fetch config if user is not logged in

      try {
        console.log(`Fetching user configuration from: http://localhost:3002/load-configuration/${user.id}`);
        const response = await fetch(`http://localhost:3002/load-configuration/${user.id}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const config = await response.json();
        setFilters(config.filters || {});
        setChartConfig(config.chartConfig || chartConfig);
      } catch (error) {
        console.error("Failed to load user configuration:", error);
      }
    };

    loadUserConfig();
  }, [user]);

  const handleFileUpload = (csvData) => {
    setData(csvData);
    setFilteredData(csvData);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    const filtered = data.filter((row) =>
      Object.entries(newFilters).every(([key, value]) => value === "" || row[key] === value)
    );
    setFilteredData(filtered);
  };

  return (
    <div className="Dashboard">
      <h1>Data Dashboard</h1>
      <UploadCSV onFileUpload={handleFileUpload} />
      <div className="filter-pannel">
      <FilterPanel filters={filters} onFilterChange={handleFilterChange} />
      </div>
      <div className="data-table">
      <DataTable data={filteredData} />
      </div>
      <div className="chart-container">
      <ChartContainer data={filteredData} chartConfig={chartConfig} />
      </div>
      <div className="export-form">
      <ExportForm filteredData={filteredData} />
      </div>
    </div>
  );
}

export default Dashboard;
