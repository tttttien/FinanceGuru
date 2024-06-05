function fetchEmployeesAndUpdateTable() {
  return fetch('http://localhost:2001/employees') // Replace with your actual API endpoint
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(employees => {
      console.log('Employees fetched successfully');
      updateTable(employees);
    })
    .catch(error => {
      console.error('Error fetching employee data:', error);
    });
}

function updateTable(employees) {
  const tableBody = document.getElementById('employee-table-body');

  if (tableBody) {
    // Clear the table body
    tableBody.innerHTML = '';

    // Loop through the fetched employees and create table rows
    employees.forEach(employee => {
      const tableRow = createTableRow(employee);
      tableBody.appendChild(tableRow);
    });
  } else {
    console.error('Error: #employee-table-body element not found in the DOM');
  }
}

function createTableRow(employee) {
  const row = document.createElement('tr');

  // Create cells for each data point and add them to the row
  const idCell = document.createElement('td');
  idCell.textContent = employee.ID; // Assuming an 'id' property
  row.appendChild(idCell);

  const nameCell = document.createElement('td');
  nameCell.textContent = employee.FullName; // Assuming a 'fullName' property
  row.appendChild(nameCell);

  const phoneCell = document.createElement('td');
  phoneCell.textContent = employee.EmployeePhone; // Assuming a 'phone' property
  row.appendChild(phoneCell);

  const positionCell = document.createElement('td');
  positionCell.textContent = employee.Position; // Assuming an 'address' property
  row.appendChild(positionCell);

  // Add a cell for "View Details" button
  const viewDetailsCell = document.createElement('td');
  const viewDetailsButton = document.createElement('button');
  viewDetailsButton.textContent = "View Details";
  viewDetailsButton.addEventListener('click', () => {
    showEmployeeDetails(employee); // Call function to populate popup with ID
  });
  viewDetailsCell.appendChild(viewDetailsButton);
  row.appendChild(viewDetailsCell);

  return row;
}


function showEmployeeDetails(employee) {
  if (!employee) {
    console.error('Error: Employee data is not available');
    return; // Exit the function if employee is undefined
  }
  const popup = document.getElementById('popup');
  const employeeId = document.getElementById('detailId');
  const fullName = document.getElementById('detailFullName');
  const email = document.getElementById('detailEmail');
  const phoneNumber = document.getElementById('detailPhoneNumber');
  const birthDate = document.getElementById('detailBirthdate');
  const gender = document.getElementById('detailGender');
  const address = document.getElementById('detailAddress');
  const position = document.getElementById('detailPosition');

  // Update popup content with employee data
  employeeId.textContent = employee.ID;
  fullName.textContent = employee.FullName;
  email.textContent = employee.EmployeeEmail; // Access and display email
  phoneNumber.textContent = employee.EmployeePhone;
  birthDate.textContent = employee.EmployeeDOB;
  gender.textContent = employee.Gender;
  address.textContent = employee.EmployeeAddress;
  position.textContent = employee.Position; // Access and display course
  // You can add logic here to open the popup (consider a toggle functionality)
  popup.classList.add('open-popup'); // Assuming a class 'open-popup' for visibility
}

// Call the fetchEmployeesAndUpdateTable function on page load or when needed
fetchEmployeesAndUpdateTable();