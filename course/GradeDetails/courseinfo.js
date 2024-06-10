document.addEventListener('DOMContentLoaded', () => {
    const filteredData = JSON.parse(localStorage.getItem('courseInfo'));
    console.log(filteredData[0].Course)
    updateTable(filteredData);

    const searchInput = document.getElementById('dt-search-0');
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.trim().toLowerCase();
        const filteredStudents = filterStudents(filteredData, searchTerm);
        updateTable(filteredStudents);
    });
});

async function updateCourseInfo(course) {
    try {
        const response = await fetch('http://localhost:2001/students/accepted/course');
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Server error');
        }

        const allStudents = await response.json();

        // Filter students by the provided course
        const filteredStudents = allStudents.filter(student => student.Course === course);
        var studentCount = 0
        filteredStudents.forEach(student => {
            studentCount++
        })


    } catch (error) {
        console.error('Error fetching student data:', error);
        // Handle error here (e.g., display error message on the UI)
    }
}


function updateTable(studentData) {
    const tableBody = document.getElementById('data-output');
    tableBody.innerHTML = ''; // Clear previous content

    studentData.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.Num}</td>
            <td>${student.FullName}</td>
            <td>${student.Gender}</td>
            <td>${student.StudentDOB}</td>
            <td>${student.StudentAddress}</td>
            <td>${student.StudentPhone}</td>
        `;
        tableBody.appendChild(row);
    });
}

function filterStudents(studentData, searchTerm) {
    if (!searchTerm) {
        return studentData;
    }

    return studentData.filter(student => {
        return (
            student.FullName.toLowerCase().includes(searchTerm) ||
            student.StudentAddress.toLowerCase().includes(searchTerm) ||
            student.StudentPhone.includes(searchTerm)
        );
    });
}
