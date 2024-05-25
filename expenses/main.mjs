// Expense class to represent individual expenses
class Expense {
    constructor(employeeName, amount, category, date, description = '') {
        this.employeeName = employeeName;
        this.amount = amount;
        this.category = category;
        this.date = date;
        this.description = description;
    }
}
// UI class for handling UI interactions
class UI {
    // Method to display all expenses in the UI
    static showAllExpenses() {
        const expenses = LocalStore.getExpensesFromStore();
        expenses.forEach(expense => UI.addExpense(expense));
    }
    // Method to add a single expense to the UI
    static addExpense(expense) {
        const table_body = document.querySelector('#expense-table-body');
        const row = document.createElement("tr");
        row.innerHTML = `
        <td class="exp-employee-name">${expense.employeeName}</td>
        <td class="exp-description">${expense.description}</td>
        <td class="exp-amount">${expense.amount}</td>
        <td class="exp-category">${expense.category}</td>
        <td class="exp-date">${expense.date}<button class="btn btn-danger float-right delete">X</button></td>
        `;
        table_body.appendChild(row);
    }
    // Method to remove an expense from the UI
    static removeExpense(e_target) {
        if (e_target.classList.contains('delete')) {
            e_target.parentElement.parentElement.remove();
        }
    }
    // Method to calculate and display total amount of expenses
    static countTotalAmount() {
        const td_amount_rows = document.querySelectorAll("td.exp-amount");
        let total = 0;
        td_amount_rows.forEach(td => {
            if (!td.parentNode.classList.contains('d-none')) {
                total += parseFloat(td.textContent);
            }
        });

        document.querySelector("#total").textContent = total;
    }
    // Method to show alerts
    static showAlert(msg, cls) {
        const div = document.createElement('div');
        div.className = `alert ${cls}`;
        div.appendChild(document.createTextNode(msg));
        const btn = document.querySelector('#expense-btn');
        const form = document.querySelector('#expense-form');
        form.insertBefore(div, btn.parentNode);

        setTimeout(() => div.remove(), 2000);
    }
     // Method to reset input fields
    static resetFields() {
        document.querySelector('#expense-form').reset();
        DatePicker.setTodayDateToInputDate();
        document.querySelector('#expense-description-container').classList.add('d-none');
        document.querySelector('#expense-teacher').classList.add('d-none');
    }
    // Method to populate teacher select dropdown
    static populateTeacherSelect(teachers) {
        const teacherSelect = document.querySelector('#expense-teacher');
        teacherSelect.innerHTML = '<option selected>Choose a teacher</option>';
        teachers.forEach(teacher => {
            const option = document.createElement('option');
            option.value = teacher.id; // Assuming each teacher has a unique ID
            option.textContent = teacher.name;
            teacherSelect.appendChild(option);
        });
    }
}
// LocalStore class for handling localStorage interactions
class LocalStore {
    // Method to get expenses from localStorage
    static getExpensesFromStore() {
        let expenses = localStorage.getItem('expenses');
        return (expenses === null) ? [] : JSON.parse(expenses);
    }
    // Method to add an expense to localStorage
    static addExpenseToStore(expense) {
        let expenses = LocalStore.getExpensesFromStore();
        expenses.push(expense);
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }
    // Method to remove an expense from localStorage
    static removeExpenseFromStore(tr) {
        let expenses = LocalStore.getExpensesFromStore();
        var row_data = [];
        Array.from(tr.children).forEach(td => row_data.push(td.textContent));
        expenses.forEach((expense, index) => {
            const { employeeName, amount, category, date } = expense;
            if (employeeName === row_data[0] && amount === row_data[1] && category === row_data[2] && date === row_data[3].slice(0, -1)) {
                expenses.splice(index, 1);
            }
            localStorage.setItem('expenses', JSON.stringify(expenses));
        });
    }
}
// DatePicker class for handling datepicker interactions
class DatePicker {
    // Method to set today's date to input date field
    static setTodayDateToInputDate() {
        const today = new Date();
        let day = today.getUTCDate();
        if (day < 10) {
            day = `0${day}`;
        }
        let month = today.getUTCMonth() + 1;
        if (month < 10) {
            month = `0${month}`;
        }
        document.querySelector("#expense-date").value = `${day}-${month}-${today.getUTCFullYear()}`;
    }
     // Method to enable datepicker
    static enableDatePicker() {
        $('#expense-date').datepicker({
            dateFormat: 'dd-mm-yy',
        });
    }
}
// ExpenseFilter class for handling expense filtering
// ExpenseFilter class for handling expense filtering
class ExpenseFilter {

//     static filterByCategory() {
//     const search_category = document.querySelector("#filter-category").value.toLowerCase().trim();
//     console.log("Search category:", search_category); // Log search category

//     if (!search_category) return; // Exit if search_category is empty

//     const expenses_category_td = document.querySelectorAll("td.exp-category");
//     expenses_category_td.forEach(td => {
//         let td_value = td.textContent.toLowerCase().trim(); // Trim whitespace
//         console.log("TD value:", td_value); // Log value of current td
//         const row = td.parentNode;
//         if (td_value.includes(search_category)) { // Compare if td_value contains search_category
//             row.classList.remove('d-none');
//         } else {
//             row.classList.add('d-none');
//         }
//     });
// }


//     static filterByMonth() {
//         const search_date = document.querySelector("#filter-month").value; // Assuming the format is YYYY-MM
//         const search_parts = search_date.split('-');
//         const search_year = search_parts[0];
//         const search_month = search_parts[1];
        
//         const expenses_date_td = document.querySelectorAll("td.exp-date");
//         expenses_date_td.forEach(td => {
//             let td_value = td.textContent.toLowerCase(); // Get the text content of the td
//             td_value = td_value.replace('x', '');
//             let expense_date = td_value.split('-'); // Split the date string by hyphen
//             let expense_year = expense_date[2]; // Get the year part
//             let expense_month = expense_date[1]; // Get the month part
            
//             // If the month or year is a single digit, prepend a '0' to match the search format
//             if (expense_month.length === 1) {
//                 expense_month = '0' + expense_month;
//             }
//             if (expense_year.length === 1) {
//                 expense_year = '0' + expense_year;
//             }
            
//             // Check if the expense month and year match the search month and year
//             if (expense_month === search_month && expense_year === search_year) {
//                 td.parentNode.classList.remove('d-none');
//             } else {
//                 td.parentNode.classList.add('d-none');
//             }
//         });
//     }
static filterExpenses() {
    const search_category = document.querySelector("#filter-category").value.toLowerCase().trim();
    const search_date = document.querySelector("#filter-month").value; // Assuming the format is YYYY-MM
    const search_parts = search_date.split('-');
    const search_year = search_parts[0];
    const search_month = search_parts[1];
    if (search_category === "select") {
            UI.showAlert("Please select a category", "alert-danger");
            return; // Dừng sự thực thi nếu search_category là "select"
        }
    
    const expenses_category_td = document.querySelectorAll("td.exp-category");
    const expenses_date_td = document.querySelectorAll("td.exp-date");

    expenses_category_td.forEach((td, index) => {
        const category_value = td.textContent.toLowerCase().trim();
        const row = td.parentNode;
        const date_value = expenses_date_td[index].textContent.trim();
        const expense_date = date_value.replace('X', '').split('-');
        const expense_year = expense_date[2];
        const expense_month = expense_date[1];
        console.log("Category:", category_value);
        console.log("Expense Date:", expense_date);
        console.log("Expense Year:", expense_year);
        console.log("Expense Month:", expense_month);
        console.log("Search Category:", search_category);
        console.log("Search Year:", search_year);
        console.log("Search Month:", search_month);

        if (search_category === category_value && expense_month === search_month && expense_year === search_year) {
            row.classList.remove('d-none');
            console.log ("Vo đaay");
        } else {
            row.classList.add('d-none');
        }
    
        
    });
}


    // Method to reset expense filters
    static resetFilter() {
        const table_body = document.querySelector('#expense-table-body').childNodes;
        table_body.forEach(row => row.classList.remove('d-none'));
        document.querySelector('#filter-form').reset();
    }
}

// Event: filter expenses
document.querySelector("#filter-btn").addEventListener('click', e => {
    e.preventDefault();

    const categoryValue = document.querySelector("#filter-category").value.trim();
    const monthValue = document.querySelector("#filter-month").value.trim();

    // Kiểm tra xem có giá trị hợp lệ cho cả hai trường hay không
    if (categoryValue && monthValue) {
        ExpenseFilter.filterExpenses();
        UI.countTotalAmount();
        bar_chart.updateChart();
    } else {
        // Hiển thị thông báo nếu người dùng chưa nhập đủ thông tin cho cả hai trường
        UI.showAlert("Please select both category and month", "alert-danger");
    }
});

// Method to fetch teachers from API
async function fetchTeachers() {
    try {
        const response = await fetch('/api/teachers'); // Assuming your API endpoint is /api/teachers
        const data = await response.json();
        UI.populateTeacherSelect(data);
    } catch (error) {
        console.error('Error fetching teachers:', error);
    }
}

// import Chart instance
import { bar_chart } from './chart.mjs';

// Event: DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    UI.showAllExpenses();
    DatePicker.setTodayDateToInputDate();
    DatePicker.enableDatePicker();
    UI.countTotalAmount();
    bar_chart.createChart();
    bar_chart.updateChart();
    fetchTeachers(); // Fetch teachers on load

    // Hide description field on page load
    const category = document.querySelector('#expense-category').value;
    const descriptionContainer = document.querySelector('#expense-description-container');
    const descriptionInput = document.querySelector('#expense-description');
    if (category === 'Select') {
        descriptionContainer.classList.add('d-none');
        descriptionInput.classList.add('d-none');
    }
    //  // Move filter calls here
    //  ExpenseFilter.filterByCategory();
    //  ExpenseFilter.filterByMonth();
});

// Event: add expense button
// Event: add expense button
document.querySelector('#expense-btn').addEventListener('click', e => {
    e.preventDefault();

    const employeeName = document.querySelector("#employee-name").value;
    const amount = document.querySelector("#expense-amount").value;
    const category = document.querySelector("#expense-category").value;
    const expense_date = document.querySelector("#expense-date").value;
    let description = '';

    if (category === 'Select') {
        UI.showAlert("Please select a category", "alert-danger");
        return;
    }

    if (category === 'Others') {
        description = document.querySelector("#expense-description").value;
        if (description === "") {
            UI.showAlert("Please enter a description", "alert-danger");
            return;
        }
    } else {
        description = document.querySelector("#expense-teacher").value;
    }

    if (employeeName === "" || amount === "") {
        UI.showAlert("Employee name or amount are empty", "alert-danger");
        return;
    }

    const expense = new Expense(employeeName, amount, category, expense_date, description);

    UI.addExpense(expense);
    UI.showAlert("Expense has been successfully added", "alert-success");
    LocalStore.addExpenseToStore(expense);
    UI.countTotalAmount();
    UI.resetFields();
    bar_chart.updateChart();
});

// Event: remove expense
document.querySelector('#expense-table-body').addEventListener('click', e => {
    if (e.target.classList.contains('delete')) {
        // If the clicked element has the class 'delete'
        UI.removeExpense(e.target);
        UI.showAlert("Expense has been removed", "alert-success");
        LocalStore.removeExpenseFromStore(e.target.parentElement.parentElement);
        UI.countTotalAmount();
        bar_chart.updateChart();
    }
});


// Event: reset filter
document.querySelector('#reset-filter-btn').addEventListener('click', e => {
    e.preventDefault();

    ExpenseFilter.resetFilter();
    UI.countTotalAmount();
    bar_chart.updateChart();
});

// Event: category change
document.querySelector('#expense-category').addEventListener('change', e => {
    const category = e.target.value;
    const descriptionContainer = document.querySelector('#expense-description-container');
    const teacherSelect = document.querySelector('#expense-teacher');
    const descriptionInput = document.querySelector('#expense-description');
    
    if (category === 'Others') {
        descriptionContainer.classList.remove('d-none');
        teacherSelect.classList.add('d-none');
        descriptionInput.classList.remove('d-none');
    } else if (category === 'Select') {
        descriptionContainer.classList.add('d-none');
        descriptionInput.classList.add('d-none');
    } else {
        descriptionContainer.classList.remove('d-none');
        teacherSelect.classList.remove('d-none');
        descriptionInput.classList.add('d-none');
    }
});