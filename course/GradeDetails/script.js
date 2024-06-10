document.addEventListener("DOMContentLoaded", async function () {
    try {

        await updateTotalStudents();
    } catch (error) {
        console.error('Error:', error);
        // Handle errors appropriately
    }
});

async function updateTotalStudents() {
    try {
        const response = await fetch('http://localhost:2001/students/accepted/count');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        document.getElementById("totalStudents").textContent = data.count;
    } catch (error) {
        console.error('Error fetching total students count:', error);
        throw error;
    }
}

