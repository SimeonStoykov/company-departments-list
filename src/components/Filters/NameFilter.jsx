import React from 'react';

function NameFilter({ value, set }) {
  const handleChange = (event) => {
    set(event.target.value);
  };

  return (
    <div className="filter-row">
      <label htmlFor="name-filter">Name:</label>
      <input id="name-filter" type="text" value={value} onChange={handleChange} name="name" />
    </div>
  );
}

export default NameFilter;
