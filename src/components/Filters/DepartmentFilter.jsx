import React from 'react';

function DepartmentFilter({ orgData, value, set }) {
  const data = Object.keys(orgData.departments).map((depId) => (
    <option key={depId} value={depId}>
      {orgData.departments[depId].name}
    </option>
  ));
  data.unshift(
    <option key={'0'} value={'0'}>
      All
    </option>
  );

  const handleChange = (event) => {
    set(event.target.value);
  };

  return (
    <div className="filter-row">
      <label htmlFor="department-filter">Department:</label>
      <select id="department-filter" value={value} onChange={handleChange} name="department">
        {data}
      </select>
    </div>
  );
}

export default DepartmentFilter;
