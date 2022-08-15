import React from 'react';
import { areAllItemsSelected } from '../utils';
import EmployeeList from './EmployeeList';

function DepartmentList({ filteredOrgData, setOrgData }) {
  const handleDepartmentSelect = (depId) => {
    setOrgData(({ departments, organization }) => {
      const currDepartmentSelected = !departments[depId].selected;

      return {
        organization: {
          ...organization,
          selected: areAllItemsSelected(departments, depId, currDepartmentSelected)
        },
        departments: {
          ...departments,
          [depId]: {
            ...departments[depId],
            selected: currDepartmentSelected,
            employees: Object.keys(departments[depId].employees).reduce((empAcc, empName) => {
              empAcc[empName] = {
                ...departments[depId].employees[empName],
                selected: currDepartmentSelected
              };
              return empAcc;
            }, {})
          }
        }
      };
    });
  };

  const departmentsIds = Object.keys(filteredOrgData.departments);

  if (departmentsIds.length > 0) {
    return (
      <ul>
        {departmentsIds.map((depId, i) => {
          const department = filteredOrgData.departments[depId];

          return (
            <li key={i}>
              <div>
                <input
                  type="checkbox"
                  id={`department-${depId}`}
                  checked={filteredOrgData.departments[depId].selected}
                  onChange={() => handleDepartmentSelect(depId)}
                />
                <label htmlFor={`department-${depId}`}>{department.name}:</label>
              </div>
              <EmployeeList
                depId={depId}
                department={department}
                filteredOrgData={filteredOrgData}
                setOrgData={setOrgData}
              />
            </li>
          );
        })}
      </ul>
    );
  }

  return null;
}

export default DepartmentList;
