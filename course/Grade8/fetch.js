fetch("data.json")
    .then(function (response) {
        return response.json();
    })
    .then(function (datas) {
        let placeholder = document.querySelector("#data-output");
        let out = "";
        for (let data of datas) {
            out += `
                <tr>
                    <td>${data.StudentID}</td>
                    <td>${data.FullName}</td>
                    <td>${data.Gender}</td>
                    <td>${data.StudentDOB}</td>
                    <td>${data.StudentAddress}</td>
                    <td>${data.StudentPhone}</td>
                    <td>${data.RegDate}</td>
                <tr>
        `;
        }
        placeholder.innerHTML = out;
    })