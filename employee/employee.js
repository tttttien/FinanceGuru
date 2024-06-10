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

  const deleteCell = document.createElement('td');
  const deleteButton = document.createElement('button');
  deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
  deleteButton.innerText = 'Delete';
  deleteButton.onclick = () => deleteEmployee(employee.ID); // Call deleteEmployee function
  deleteCell.appendChild(deleteButton);
  row.appendChild(deleteCell);

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

// Function to open the create employee form
function openCreateEmployee() {
  const createEmployeeForm = document.getElementById('createEmployee');
  createEmployeeForm.style.display = 'block'; // Simple example, adjust based on your implementation
}


// Function to close the employee details popup
function closePopup() {
  // Get the popup element
  const popup = document.getElementById('popup');

  // Hide the popup (toggle visibility or use a modal window)
  popup.style.display = 'none'; // Simple example, adjust based on your implementation
}


function closePopup() {
  popup.classList.remove("open-popup");
}



document.addEventListener('DOMContentLoaded', () => {
  // Your code that uses document elements here
  const submitButton = document.getElementById("submit");
  submitButton.addEventListener('click', onFormSubmit);
});

let createEmployee = document.getElementById("createEmployee");
function openCreateEmployee() {
  const fullName = localStorage.getItem('fullName');
  if (fullName === 'root') {
    createEmployee.classList.add("open-createEmployee");
  } else {
    alert('You do not have permission to create employees.');
  }
}

function closeCreateEmployee() {
  createEmployee.classList.remove("open-createEmployee");
}

const createEmployeeForm = document.getElementById("createEmployee");
const fullNameInput = document.getElementById("fullName");
const positionSelect = document.getElementById("position");
const emailInput = document.getElementById("email");
const phoneNumberInput = document.getElementById("phoneNumber");
const birthdateInput = document.getElementById("birthdate");
const genderSelect = document.getElementById("gender");
const addressInput = document.getElementById("address");
const passwordInput = document.getElementById("passWord");

function onFormSubmit(event) {
  // Optional: Prevent default form submission behavior
  event.preventDefault();

  // Get form data with error handling (replace element names if needed)
  try {
    const fullName = fullNameInput.value.trim();
    const position = positionSelect.value;
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const phoneNumber = phoneNumberInput.value.trim();
    const birthdate = birthdateInput.value;
    const gender = genderSelect.value;
    const address = addressInput.value.trim();

    // Basic validation (optional, improve based on your needs)
    if (!fullName || !email || !password || !phoneNumber || !birthdate || !address) {
      alert('Please fill out all required fields.');
      return;
    }

    // Prepare data for sending to server
    const data = {
      FullName: fullName,
      Position: position,
      EmployeeEmail: email,
      Password: password,
      EmployeePhone: phoneNumber,
      EmployeeDOB: birthdate, // Might need conversion depending on backend logic
      Gender: gender,
      EmployeeAddress: address,
    };

    // Send data to server using fetch API (assuming a backend server is running on http://localhost:2001/)
    fetch('http://localhost:2001/employees', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Employee data saved successfully');
        alert('Employee created successfully!');
        closeCreateEmployee(); // Clear form after successful submission
        fetchEmployeesAndUpdateTable(); // Update table after server confirmation
        fullNameInput.value = "";
        positionSelect.value = ""; // Set to default option, if any
        emailInput.value = "";
        passwordInput.value = "";
        phoneNumberInput.value = "";
        birthdateInput.value = "";
        genderSelect.value = ""; // Set to default option, if any
        addressInput.value = "";
      })
      .catch(error => {
        console.error('Error submitting employee data:', error);
        // Handle network or other errors
        alert('An error occurred while submitting employee data. Please try again.');
      });
  } catch (error) {
    console.error('Error retrieving form data:', error);
    // Handle errors in accessing form elements (optional)
    alert('An error occurred while processing the form. Please try again.');
  }
}


async function deleteEmployee(employeeId) {
  const fullName = localStorage.getItem('fullName');
  console.log(fullName);
  if (fullName === 'root') {
    fetch(`http://localhost:2001/employees/delete/${employeeId}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          console.log('Employee removed successfully');
          // Optionally, you can call fetchNotesAndUpdateHTML() here to refresh the UI
          fetchEmployeesAndUpdateTable();
        } else {
          console.error('Error removing employee');
        }
      })
      .catch(error => {
        console.error('Error removing employee:', error);
      });
  } else {
    alert('You do not have permission to delete employees.');
  }
}

fetchEmployeesAndUpdateTable();