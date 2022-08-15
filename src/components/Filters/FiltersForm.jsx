import React from 'react';
import DepartmentFilter from './DepartmentFilter';
import NameFilter from './NameFilter';

function FiltersForm({ orgData, departmentFilter, nameFilter }) {
  return (
    <section>
      <p>Filters:</p>
      <form>
        <DepartmentFilter {...departmentFilter} orgData={orgData} />
        <NameFilter {...nameFilter} />
      </form>
    </section>
  );
}

export default FiltersForm;
