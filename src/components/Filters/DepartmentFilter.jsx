import React from 'react';

function DepartmentFilter({ orgData, value, set }) {
  const data = Object.keys(orgData.departments).map((depId, i) => (
    <option key={i} value={depId}>
      {orgData.departments[depId].name}
    </option>
  ));
  data.unshift(<option value={'0'}>All</option>);

  const handleChange = (event) => {
    set(event.target.value);
  };

  return (
    <label>
      Department:
      <select value={value} onChange={handleChange}>
        {data}
      </select>
    </label>
  );
}

export default DepartmentFilter;
