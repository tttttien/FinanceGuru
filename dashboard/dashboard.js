document.addEventListener("DOMContentLoaded", async function () {
    try {
        await fetchData();
        await updateTotalStudents();
        await updateTotalIncomes();
        await updateTotalExpenses();
    } catch (error) {
        console.error('Error:', error);
        // Handle errors appropriately
    }
});

async function fetchData() {
    try {
        const response = await fetch('http://localhost:2001/students/accepted/desc');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // Lặp qua dữ liệu và thêm vào bảng
        data.forEach(student => {
            var row = document.createElement("tr");
            var cell = document.createElement("td");
            cell.innerHTML = "<h4>" + student.FullName + "<br><span>" + student.StudentPhone + "</span></h4>";
            console.log(student.FullName, student.StudentPhone);
            row.appendChild(cell);
            document.getElementById("tableData").appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

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

async function updateTotalIncomes() {
    try {
        const response = await fetch('http://localhost:2001/incomes/total');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        document.getElementById("totalIncomes").textContent = data.totalIncome;
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
        document.getElementById("totalExpenses").textContent = data.totalExpense;
    } catch (error) {
        console.error('Error fetching total expenses:', error);
        throw error;
    }
}
