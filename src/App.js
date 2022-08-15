import React, { useState } from 'react';
import './App.css';
import data from './data.json';

import { getFilteredOrgData, getDepartmentsData } from './utils';
import FiltersForm from './components/Filters/FiltersForm';
import DepartmentList from './components/DepartmentList';

function App() {
  const originalOrgData = data.organization || { departments: [], employees: [], name: '' };

  const [orgData, setOrgData] = useState({
    organization: { name: originalOrgData.name, selected: false },
    departments: getDepartmentsData(originalOrgData)
  });
  const [depFilterValue, setDepFilterValue] = useState('0');
  const [nameFilterValue, setNameFilterValue] = useState('');

  const handleOrganizationSelect = () => {
    setOrgData(({ departments, organization }) => ({
      organization: { ...organization, selected: !organization.selected },
      departments: Object.keys(departments).reduce((acc, depId) => {
        acc[depId] = {
          ...departments[depId],
          selected: !organization.selected,
          employees: Object.keys(departments[depId].employees).reduce((empAcc, empName) => {
            empAcc[empName] = {
              ...departments[depId].employees[empName],
              selected: !organization.selected
            };
            return empAcc;
          }, {})
        };
        return acc;
      }, {})
    }));
  };

  const filteredOrgData = getFilteredOrgData(orgData, depFilterValue, nameFilterValue);

  return (
    <main>
      <FiltersForm
        orgData={orgData}
        departmentFilter={{ value: depFilterValue, set: setDepFilterValue }}
        nameFilter={{ value: nameFilterValue, set: setNameFilterValue }}
      />
      <section>
        <input
          type="checkbox"
          id="organization-select"
          checked={filteredOrgData.organization.selected}
          onChange={handleOrganizationSelect}
        />
        <label htmlFor="organization-select">{filteredOrgData.organization.name}</label>
      </section>
      <DepartmentList filteredOrgData={filteredOrgData} setOrgData={setOrgData} />
    </main>
  );
}

export default App;
