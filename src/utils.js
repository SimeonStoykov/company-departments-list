import _ from 'lodash';
const noDepartmentLabel = 'No Department';

export const areAllItemsSelected = (items, itemId, currSelected) => {
  let allItemsSelected = true;

  for (const key in items) {
    const item = items[key];
    if ((key === itemId && !currSelected) || (key !== itemId && !item.selected)) {
      allItemsSelected = false;
      break;
    }
  }

  return allItemsSelected;
};

export const getDepartmentsData = (originalOrgData) => {
  const departmentsData = originalOrgData.departments.reduce(
    (prevValue, currDepartment) => ({
      ...prevValue,
      [currDepartment.id]: {
        name: currDepartment.name,
        selected: false,
        employees: originalOrgData.employees
          .filter((e) => e.department === currDepartment.id)
          .reduce(
            (prevEmployeesValue, currEmployeesValue) => ({
              ...prevEmployeesValue,
              [currEmployeesValue.name]: { avatar: currEmployeesValue.avatar, selected: false }
            }),
            {}
          )
      }
    }),
    {}
  );

  const employeesWithoutDepartment = originalOrgData.employees.filter((e) => !e.department);
  if (employeesWithoutDepartment.length > 0) {
    departmentsData[originalOrgData.departments.length + 1] = {
      name: noDepartmentLabel,
      selected: false,
      employees: employeesWithoutDepartment.reduce(
        (prevEmployeesValue, currEmployeesValue) => ({
          ...prevEmployeesValue,
          [currEmployeesValue.name]: { avatar: currEmployeesValue.avatar, selected: false }
        }),
        {}
      )
    };
  }

  return departmentsData;
};

export const getFilteredOrgData = (orgData, depFilterValue, nameFilterValue) => {
  const visibleOrgData = _.cloneDeep(orgData);

  if (depFilterValue === '0') {
    visibleOrgData.departments = _.cloneDeep(orgData.departments);
  } else {
    visibleOrgData.departments = { [depFilterValue]: visibleOrgData.departments[depFilterValue] };
  }

  if (nameFilterValue) {
    for (const depId in visibleOrgData.departments) {
      const filteredDepEmployees = Object.keys(visibleOrgData.departments[depId].employees)
        .filter((empName) => empName.toLowerCase().includes(nameFilterValue.toLowerCase()))
        .reduce((obj, key) => {
          obj[key] = visibleOrgData.departments[depId].employees[key];
          return obj;
        }, {});

      if (Object.keys(filteredDepEmployees).length === 0) {
        delete visibleOrgData.departments[depId];
      } else {
        visibleOrgData.departments[depId].employees = filteredDepEmployees;
      }
    }
  }

  return visibleOrgData;
};
