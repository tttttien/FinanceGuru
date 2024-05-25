let employees = {
    1: {
        id: 1,
        fullName: "Nguyen Thanh Quynh Tien",
        position: "Mathematic Lecturer",
        email: "quynhtien@gmail.com",
        phoneNumber: "0123456789",
        birthdate: "2003-10-19",
        gender: "Female",
        address: "1387 Huynh Tan Phat, Phu Thuan Ward, District 7"
    }
};

let employeeIdCounter = 2;

function onFormSubmit() {
    let formData = readFormData();
    formData.id = employeeIdCounter++;
    employees[formData.id] = formData;
    insertNewRecord(formData);
    closeCreateEmployee();
}

function readFormData() {
    return {
        fullName: document.getElementById("fullName").value,
        position: document.getElementById("position").value,
        email: document.getElementById("email").value,
        phoneNumber: document.getElementById("phoneNumber").value,
        birthdate: document.getElementById("birthdate").value,
        gender: document.getElementById("gender").value,
        address: document.getElementById("address").value
    };
}

function insertNewRecord(data) {
    let table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
    let newRow = table.insertRow();
    newRow.insertCell(0).innerText = data.id;
    newRow.insertCell(1).innerText = data.fullName;
    newRow.insertCell(2).innerText = data.phoneNumber;
    newRow.insertCell(3).innerText = data.address;
    newRow.insertCell(4).innerHTML = `<a href="#" class="button" onclick="openPopup(${data.id})"><u>View</u></a>
                                        <a class="button" onclick="onDelete(this)">Delete</a>`;
}

function openPopup(id) {
    let employee = employees[id];
    document.getElementById("detailId").innerText = employee.id;
    document.getElementById("detailFullName").innerText = employee.fullName;
    document.getElementById("detailPosition").innerText = employee.position;
    document.getElementById("detailEmail").innerText = employee.email;
    document.getElementById("detailPhoneNumber").innerText = employee.phoneNumber;
    document.getElementById("detailBirthdate").innerText = employee.birthdate;
    document.getElementById("detailGender").innerText = employee.gender;
    document.getElementById("detailAddress").innerText = employee.address;

    popup.classList.add("open-popup");
}

let popup = document.getElementById("popup")
  
function openPopup(id)
{
  let employee = employees[id];
  document.getElementById("detailId").innerText = employee.id;
  document.getElementById("detailFullName").innerText = employee.fullName;
  document.getElementById("detailPosition").innerText = employee.position;
  document.getElementById("detailEmail").innerText = employee.email;
  document.getElementById("detailPhoneNumber").innerText = employee.phoneNumber;
  document.getElementById("detailBirthdate").innerText = employee.birthdate;
  document.getElementById("detailGender").innerText = employee.gender;
  document.getElementById("detailAddress").innerText = employee.address;

  popup.classList.add("open-popup");
}

function onDelete(td)
{
    if (confirm('Are you sure to delete this employee?'))
    {
    row=td.parentElement.parentElement;
    document.getElementById("employeeList").deleteRow(row.rowIndex)
    }
}

function closePopup()
{
  popup.classList.remove("open-popup");
}

let createEmployee = document.getElementById("createEmployee");
function openCreateEmployee()
{
  createEmployee.classList.add("open-createEmployee");
}

function closeCreateEmployee()
{
  createEmployee.classList.remove("open-createEmployee");
}