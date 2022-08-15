import React from 'react';

function NameFilter({ orgData, value, set }) {
  const handleChange = (event) => {
    set(event.target.value);
  };

  return (
    <div className="filter-row">
      <label htmlFor="name-filter">Name:</label>
      <input id="name-filter" type="text" value={value} onChange={handleChange} />
    </div>
  );
}

export default NameFilter;
