async function fetchData() {
    try {
        const response = await fetch('http://localhost:2001/students'); // Replace with your actual data URL
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json(); // Parse the JSON response

        const tableBody = document.getElementById('tableData');
        tableBody.innerHTML = ''; // Clear any existing content (including default rows)

        const tableHTML = `
      <thead>
        <tr>
          <th>Name</th>
          <th>Phone</th>
        </tr>
      </thead>
      <tbody>
        ${data.map(student => `
          <tr>
            <td>${student.FullName || 'Name'}</td>
            <td>${student.StudentPhone || 'ID'}</td>
          </tr>
        `).join('')}
      </tbody>
    `;

        tableBody.innerHTML = tableHTML;
    } catch (error) {
        console.error('Error fetching data:', error);
        // Handle errors appropriately
    }
}

fetchData();