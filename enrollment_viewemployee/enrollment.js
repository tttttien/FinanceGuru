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
    try {
        // Log current student ID
        console.log('Current student ID:', studentId);

        // Fetch student details
        fetch(`http://localhost:2001/students/pending/${studentId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch student details');
                }
                return response.json();
            })
            .then(studentData => {
                const fullName = studentData.FullName;
                console.log('Full Name:', fullName);

                // Get current date
                const currentDate = getCurrentDate();
                console.log(currentDate);

                // Prepare data for income submission
                const data = {
                    Amount: "1500000",
                    InputDate: currentDate,
                    Description: fullName,
                };

                // Send income data to server
                return fetch('http://localhost:2001/incomes', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error submitting income data');
                }
                console.log('Income data saved successfully');

                // Update student registration status to "Accepted" on the server
                return fetch(`http://localhost:2001/students/pending/${studentId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error approving student registration');
                }
                console.log('Student registration accepted');
                // Fetch and update student table (assuming this function exists)
                fetchStudentsAndUpdateTable();
            })
            .catch(error => {
                console.error('Error:', error);
                // Handle errors
                alert('An error occurred. Please try again.');
            });
    } catch (error) {
        console.error('Error:', error);
        // Handle errors
        alert('An error occurred. Please try again.');
    }
}

function getCurrentDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Month is zero-based, so we add 1
    const day = currentDate.getDate();
    // Format the date as needed (e.g., "YYYY-MM-DD")
    const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
    return formattedDate;
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