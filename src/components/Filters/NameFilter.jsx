import React from 'react';

function NameFilter({ orgData, value, set }) {
  const handleChange = (event) => {
    set(event.target.value);
  };

  return (
    <label>
      Name:
      <input type="text" value={value} onChange={handleChange} />
    </label>
  );
}

export default NameFilter;
