// Function to populate the table with student data
function populateTable(students) {
    const tableBody = document.getElementById('student-table-body');
    if (tableBody) {
        // Clear the table body
        tableBody.innerHTML = '';

        // Create a table row for each student and append it to the table body
        students.forEach((student) => {
            const row = createTableRow(student);
            tableBody.appendChild(row);
        });
    }
}

// Function to create a table row for a student
function createTableRow(student) {
    const row = document.createElement('tr');

    // Create cells for each column and append them to the row
    const idCell = document.createElement('td');
    idCell.textContent = student.id;
    row.appendChild(idCell);

    const nameCell = document.createElement('td');
    nameCell.textContent = student.fullName;
    row.appendChild(nameCell);

    const phoneCell = document.createElement('td');
    phoneCell.textContent = student.phone;
    row.appendChild(phoneCell);

    const addressCell = document.createElement('td');
    addressCell.textContent = student.address;
    row.appendChild(addressCell);

    const actionCell = document.createElement('td');
    const viewLink = document.createElement('a');
    viewLink.href = '#';
    viewLink.classList.add('button');
    viewLink.onclick = () => openStudentDetails(student);
    viewLink.innerHTML = '<u>View</u>';
    actionCell.appendChild(viewLink);
    row.appendChild(actionCell);

    return row;
}

// Function to handle the "View" button click
function openStudentDetails(student) {
    // Get the popup elements
    const popup = document.getElementById('popup');
    const idElement = document.querySelector('#popup .input-box:nth-child(1)');
    const nameElement = document.querySelector('#popup .input-box:nth-child(2)');
    const emailElement = document.querySelector('#popup .input-box:nth-child(3)');
    const phoneElement = document.querySelector('#popup .input-box:nth-child(4)');
    const birthdateElement = document.querySelector('#popup .input-box:nth-child(5)');
    const genderElement = document.querySelector('#popup .gender-box');
    const addressElement = document.querySelector('#popup .input-box.address');
    const courseElement = document.querySelector('#popup .input-box:last-child');

    // Populate the popup with the student's data
    idElement.textContent = student.id;
    nameElement.textContent = student.fullName;
    emailElement.textContent = student.email;
    phoneElement.textContent = student.phone;
    birthdateElement.textContent = student.birthDate;
    genderElement.textContent = student.gender;
    addressElement.textContent = student.address;
    courseElement.textContent = student.course;

    // Display the popup
    popup.classList.add('open-popup');
}

// Function to close the popup
function closePopup() {
    const popup = document.getElementById('popup');
    popup.classList.remove('open-popup');
}

// Fetch the student data and populate the table
function fetchStudents() {
    return fetch('http://localhost:2001/students')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error fetching student data');
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error fetching student data:', error);
            throw error;
        });
}

fetchStudents()
    .then(populateTable)
    .catch(error => {
        console.error('Error fetching student data:', error);
        // Handle the error, e.g., display an error message to the user
    });