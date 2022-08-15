import React from 'react';
import { areAllItemsSelected } from '../utils';

function EmployeeList({ depId, department, filteredOrgData, setOrgData }) {
  const handleEmployeeSelect = (depId, name) => {
    setOrgData(({ departments, organization }) => {
      const depEmployees = departments[depId].employees;
      const employeeSelected = !depEmployees[name].selected;
      const allDepEmployeesSelected = areAllItemsSelected(depEmployees, name, employeeSelected);

      return {
        organization: {
          ...organization,
          selected: areAllItemsSelected(departments, depId, allDepEmployeesSelected)
        },
        departments: {
          ...departments,
          [depId]: {
            ...departments[depId],
            selected: allDepEmployeesSelected,
            employees: {
              ...departments[depId].employees,
              [name]: { ...departments[depId].employees[name], selected: employeeSelected }
            }
          }
        }
      };
    });
  };

  const depEmployeesNames = Object.keys(department.employees);

  if (depEmployeesNames.length > 0) {
    return (
      <ul>
        {depEmployeesNames.map((empName, index) => {
          return (
            <li key={index}>
              <input
                type="checkbox"
                id={`employee-${empName}`}
                checked={filteredOrgData.departments[depId].employees[empName].selected}
                onChange={() => handleEmployeeSelect(depId, empName)}
              />
              <label htmlFor={`employee-${empName}`}>
                <img
                  src={filteredOrgData.departments[depId].employees[empName].avatar}
                  alt="Employee Avatar"
                  className="avatar"
                />
                <span> - {empName}</span>
              </label>
            </li>
          );
        })}
      </ul>
    );
  }

  return null;
}

export default EmployeeList;
