import React, { useState, useEffect } from 'react';
import './FilterPanel.css'

function FilterPanel({ filters, onFilterChange }) {
  const [filterValues, setFilterValues] = useState({
    Date: '',
    Region: '',
    Product_Type: '',
    Discount_Percent: '',
    Return_Rate: '',
    Customer_Satisfaction: '',
    Customer_Count: '',
    ...filters, 
  });

  useEffect(() => {
    setFilterValues({ ...filterValues, ...filters });
  }, [filters]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFilterValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onFilterChange(filterValues); 
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Date Filter */}
      <div>
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          name="Date"
          value={filterValues.Date}
          onChange={handleChange}
        />
      </div>

      {/* Region Filter */}
      <div>
        <label htmlFor="region">Region:</label>
        <select name="Region" value={filterValues.Region} onChange={handleChange}>
          <option value="">All</option>
          <option value="North">North</option>
          <option value="South">South</option>
          <option value="East">East</option>
          <option value="West">West</option>
        </select>
      </div>

      {/* Product Type Filter */}
      <div>
        <label htmlFor="productType">Product Type:</label>
        <select
          name="Product_Type"
          value={filterValues.Product_Type}
          onChange={handleChange}
        >
          <option value="">All</option>
          <option value="Food">Food</option>
          <option value="Clothing">Clothing</option>
          <option value="Electronics">Electronics</option>
          <option value="Furniture">Furniture</option>
        </select>
      </div>

      {/* Discount Percent Filter */}
      <div>
        <label htmlFor="discountPercent">Discount Percent:</label>
        <input
          type="number"
          name="Discount_Percent"
          value={filterValues.Discount_Percent}
          onChange={handleChange}
          min="0"
          max="100"
        />
      </div>

      {/* Return Rate Filter */}
      <div>
        <label htmlFor="returnRate">Return Rate:</label>
        <input
          type="number"
          name="Return_Rate"
          value={filterValues.Return_Rate}
          onChange={handleChange}
          min="0"
          max="100"
        />
      </div>

      {/* Customer Satisfaction Filter */}
      <div>
        <label htmlFor="customerSatisfaction">Customer Satisfaction:</label>
        <input
          type="number"
          name="Customer_Satisfaction"
          value={filterValues.Customer_Satisfaction}
          onChange={handleChange}
          min="0"
          max="10" // Assuming satisfaction is rated from 0 to 10
        />
      </div>

      {/* Customer Count Filter */}
      <div>
        <label htmlFor="customerCount">Customer Count:</label>
        <input
          type="number"
          name="Customer_Count"
          value={filterValues.Customer_Count}
          onChange={handleChange}
          min="0"
        />
      </div>

      <button type="submit">Apply Filters</button>
    </form>
  );
}

export default FilterPanel;
