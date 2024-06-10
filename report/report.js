document.addEventListener("DOMContentLoaded", async function () {
    try {

        await updateTotalIncomes();
        await updateTotalExpenses();
        await fetchActivity();
    } catch (error) {
        console.error('Error:', error);
        // Handle errors appropriately
    }
});


async function updateTotalIncomes() {
    try {
        const response = await fetch('http://localhost:2001/incomes/total');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        document.getElementById("totalRevenue").textContent = data.totalIncome;
    } catch (error) {
        console.error('Error fetching total incomes:', error);
        throw error;
    }
}

async function updateTotalExpenses() {
    try {
        const response = await fetch('http://localhost:2001/expenses/total');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        document.getElementById("totalExpenditure").textContent = data.totalExpense;
    } catch (error) {
        console.error('Error fetching total expenses:', error);
        throw error;
    }
}
async function fetchActivity() {
    try {
        const response = await fetch("http://localhost:2001/incomes"); // Replace with your actual endpoint
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const activityList = document.getElementById("activityList"); // Get the element by id
        activityList.innerHTML = ""; // Clear existing content

        data.forEach(function (student) {
            const activityItem = document.createElement("div");
            activityItem.classList.add("activity-item", "d-flex");
            activityItem.innerHTML = `
          <div class="activity-content">
          ${student.Description} chuyển tiền ${student.Amount} VND
          </div>
        `;
            activityList.appendChild(activityItem);
        });
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}