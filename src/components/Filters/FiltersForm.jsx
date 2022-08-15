import React from 'react';
import DepartmentFilter from './DepartmentFilter';
import NameFilter from './NameFilter';
import './Filters.css';

function FiltersForm({ orgData, departmentFilter, nameFilter }) {
  return (
    <section className="form-section">
      <h3 className="filters-title">Filters:</h3>
      <form>
        <DepartmentFilter {...departmentFilter} orgData={orgData} />
        <NameFilter {...nameFilter} />
      </form>
    </section>
  );
}

export default FiltersForm;
