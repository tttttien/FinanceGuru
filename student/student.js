function fetchStudentsAndUpdateTable() {
    return fetch('http://localhost:2001/students') // Replace with your actual API endpoint
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(students => {
            console.log('Students fetched successfully');
            updateTable(students);
        })
        .catch(error => {
            console.error('Error fetching student data:', error);
        });
}

function updateTable(students) {
    const tableBody = document.getElementById('student-table-body');

    if (tableBody) {
        // Clear the table body
        tableBody.innerHTML = '';

        // Loop through the fetched students and create table rows
        students.forEach(student => {
            const tableRow = createTableRow(student);
            tableBody.appendChild(tableRow);
        });
    } else {
        console.error('Error: #student-table-body element not found in the DOM');
    }
}

function createTableRow(student) {
    const row = document.createElement('tr');

    // Create cells for each data point and add them to the row
    const idCell = document.createElement('td');
    idCell.textContent = student.StudentID;
    row.appendChild(idCell);

    const nameCell = document.createElement('td');
    nameCell.textContent = student.FullName; // Assuming a 'fullName' property
    row.appendChild(nameCell);

    const phoneCell = document.createElement('td');
    phoneCell.textContent = student.StudentPhone; // Assuming a 'phone' property
    row.appendChild(phoneCell);

    const addressCell = document.createElement('td');
    addressCell.textContent = student.Course; // Assuming an 'course' property
    row.appendChild(addressCell);

    // Add a cell for "View Details" button
    const viewDetailsCell = document.createElement('td');
    const viewDetailsButton = document.createElement('button');
    viewDetailsButton.textContent = "View Details";
    viewDetailsButton.addEventListener('click', () => {
        showStudentDetails(student); // Call function to populate popup
    });
    viewDetailsCell.appendChild(viewDetailsButton);
    row.appendChild(viewDetailsCell);

    return row;
}

function showStudentDetails(student) {
    const popup = document.getElementById('popup');
    const studentId = document.getElementById('student-id');
    const fullName = document.getElementById('full-name');
    const email = document.getElementById('email'); // Assuming an 'email' property
    const phoneNumber = document.getElementById('phone-number');
    const birthDate = document.getElementById('birth-date'); // Assuming a 'birthDate' property
    const gender = document.getElementById('gender'); // Assuming a 'gender' property
    const address = document.getElementById('address');
    const course = document.getElementById('course'); // Assuming a 'course' property

    // Update popup content with student data
    studentId.textContent = student.StudentID;
    fullName.textContent = student.FullName;
    email.textContent = student.email; // Assuming 'email' property exists
    phoneNumber.textContent = student.StudentPhone;
    birthDate.textContent = student.StudentDOB; // Assuming 'birthDate' property exists
    gender.textContent = student.Gender; // Assuming 'gender' property exists
    address.textContent = student.StudentAddress;
    course.textContent = student.course; // Assuming 'course' property exists

    // You can add logic here to open the popup (consider a toggle functionality)
    popup.classList.add('open-popup'); // Assuming a class 'open-popup' for visibility
}

// Call the fetchStudentsAndUpdateTable function on page load or when needed
fetchStudentsAndUpdateTable();
