document.addEventListener('DOMContentLoaded', () => {

    fetchStudentsByCourse('Math 8');
});
async function fetchStudentsByCourse(course) {
    try {
        const response = await fetch('http://localhost:2001/students/accepted/course', JSON.stringify(course));
        console.log(JSON.stringify(course));
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Server error');
        }

        const studentData = await response.json();
        updateTable(studentData);
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
        <td>${student.Num}</td>;
        <td>${student.FullName}</td>
        <td>${student.Gender}</td>
        <td>${student.StudentDOB}</td>
        <td>${student.StudentAddress}</td>
        <td>${student.StudentPhone}</td>

    `;
        tableBody.appendChild(row);
    });
}