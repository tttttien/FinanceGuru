// Fetch pending students data from the API
function fetchStudentsAndUpdateTable() {
    return fetch('http://localhost:2001/students/pending') // Replace with your actual API endpoint
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(students => {
            console.log('Students fetched successfully');
            updateStudentTable(students);
        })
        .catch(error => {
            console.error('Error fetching student data:', error);
        });
}

function updateStudentTable(students) {
    const tableBody = document.getElementById('studentTableBody'); // Assuming the table body ID is 'student-table-body'

    if (tableBody) {
        // Clear the table body
        tableBody.innerHTML = '';

        // Loop through the fetched students and create table rows
        students.forEach(student => {
            const tableRow = createStudentTableRow(student);
            tableBody.appendChild(tableRow);
        });
    } else {
        console.error('Error: #student-table-body element not found in the DOM');
    }
}

function createStudentTableRow(student) {
    const row = document.createElement('tr');

    // Create cells for each student data point (adapt property names as needed)
    const idCell = document.createElement('td');
    idCell.textContent = student.Num; // Assuming 'ID' property exists
    row.appendChild(idCell);

    const nameCell = document.createElement('td');
    nameCell.textContent = student.FullName; // Assuming 'FullName' property exists
    row.appendChild(nameCell);

    const dobCell = document.createElement('td');
    dobCell.textContent = student.StudentDOB; // Assuming 'DateOfBirth' property exists
    row.appendChild(dobCell);

    const genderCell = document.createElement('td');
    genderCell.textContent = student.Gender; // Assuming 'Gender' property exists
    row.appendChild(genderCell);

    const phoneCell = document.createElement('td');
    phoneCell.textContent = student.StudentPhone; // Assuming 'Phone' property exists
    row.appendChild(phoneCell);

    const addressCell = document.createElement('td');
    addressCell.textContent = student.StudentAddress; // Assuming 'Email' property exists
    row.appendChild(addressCell);

    const emailCell = document.createElement('td');
    emailCell.textContent = student.Email; // Assuming 'Email' property exists
    row.appendChild(emailCell);

    const courseCell = document.createElement('td');
    courseCell.textContent = student.Course; // Assuming 'CourseName' property exists
    row.appendChild(courseCell);

    const statusCell = document.createElement('td');

    const approveButton = document.createElement('button');
    approveButton.type = 'button'; // Set button type
    approveButton.classList.add('btn', 'btn-success', 'btn-approve', 'me-2'); // Add classes for styling
    approveButton.innerHTML = '<i class="fas fa-check"></i>'; // Use innerHTML to set button content

    const disapproveButton = document.createElement('button');
    disapproveButton.type = 'button';
    disapproveButton.classList.add('btn', 'btn-danger', 'btn-disapprove');
    disapproveButton.innerHTML = '<i class="fas fa-times"></i>';

    // Add event listeners for buttons (replace with your functionality)
    approveButton.addEventListener('click', () => approveStudent(student.Num));

    disapproveButton.addEventListener('click', () => rejectStudent(student.Num));

    statusCell.appendChild(approveButton);
    statusCell.appendChild(disapproveButton);
    row.appendChild(statusCell);

    return row;
}


function approveStudent(studentId) {
    // Log current student ID
    console.log('Current student ID:', studentId);

    // Code to update the student registration status to "Accepted" on the server
    fetch(`http://localhost:2001/students/pending/${studentId}`, {
        method: 'PUT', // Use PUT for updating resources
        headers: {
            'Content-Type': 'application/json'
        },

    })
        .then(response => {
            if (response.ok) {
                console.log('Student registration accepted');
                fetchStudentsAndUpdateTable();

            } else {
                console.error('Error approving student registration');
            }
        })
        .catch(error => {
            console.error('Error updating student registration status:', error);
        });
}

async function rejectStudent(studentId) {
    fetch(`http://localhost:2001/students/pending/delete/${studentId}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (response.ok) {
                console.log('Student removed successfully');
                // Optionally, you can call fetchNotesAndUpdateHTML() here to refresh the UI
                fetchStudentsAndUpdateTable();
            } else {
                console.error('Error removing student');
            }
        })
        .catch(error => {
            console.error('Error removing student:', error);
        });

}
fetchStudentsAndUpdateTable();