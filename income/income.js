document.addEventListener("DOMContentLoaded", function () {
    // Fetch data from API and populate the select box
    fetch("http://localhost:2001/courses")
        .then(response => response.json())
        .then(data => {
            populateSelectBox(data);
        })
        .catch(error => {
            console.error("Error fetching courses:", error);
        });

    function populateSelectBox(courses) {
        const selectBox = document.querySelector('#course');
        selectBox.innerHTML = '<option hidden>Choose course</option>';
        courses.forEach(course => {
            const option = document.createElement('option');
            option.value = course.Name;
            option.textContent = course.Name;
            selectBox.appendChild(option);
        });
    }

    const createStudentForm = document.getElementById("createStudent");
    if (createStudentForm) {
        function onFormSubmit(event) {
            event.preventDefault(); // Prevent default form submission

            // Get form data with error handling
            try {
                const fullNameInput = document.getElementById("fullName");
                const emailInput = document.getElementById("email");
                const phoneNumberInput = document.getElementById("StudentPhone");
                const birthdateInput = document.getElementById("birthDate");
                const genderSelect = document.getElementById("gender"); // Assuming a select element for gender
                const addressInput = document.getElementById("address");
                const courseSelect = document.getElementById("course"); // Assuming a select element for course

                // Basic validation (optional, improve based on your needs)
                if (!fullNameInput.value.trim() || !emailInput.value.trim() || !phoneNumberInput.value.trim() ||
                    !birthdateInput.value || !genderSelect.value || !addressInput.value.trim() || !courseSelect.value) {
                    alert('Please fill out all required fields.');
                    return;
                }

                // Email validation
                const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
                if (!emailPattern.test(emailInput.value.trim())) {
                    alert('Please enter a valid email address ending with @gmail.com.');
                    return;
                }

                // Phone number validation
                const phonePattern = /^0\d{9}$/;
                if (!phonePattern.test(phoneNumberInput.value.trim())) {
                    alert('Please enter a valid phone number with 10 digits starting with 0.');
                    return;
                }

                // Prepare data for sending to server
                const studentData = {
                    FullName: fullNameInput.value.trim(),
                    Email: emailInput.value.trim(),
                    StudentPhone: phoneNumberInput.value.trim(),
                    StudentDOB: birthdateInput.value, // Might need conversion depending on backend logic
                    Gender: genderSelect.value,
                    StudentAddress: addressInput.value.trim(),
                    Course: courseSelect.value, // Include course data
                    Status: "Pending",
                };

                // Send data to server using fetch API (replace with your actual endpoint URL)
                fetch('http://localhost:2001/students', { // Replace with your student creation endpoint URL
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(studentData)
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log('Student data saved successfully:', data); // Log the response data if needed
                        // Display a more user-friendly success message for the user (e.g., alert, toast notification)
                        alert('Student created successfully!');
                        // Optionally, clear the form or redirect to a confirmation page
                        createStudentForm.reset();
                    })
                    .catch(error => {
                        console.error('Error submitting student data:', error);
                        // Handle network or other errors
                        alert('An error occurred while creating the student. Please try again.');
                    });
            } catch (error) {
                console.error('Error retrieving form data:', error);
                // Handle errors in accessing form elements (optional)
                alert('An error occurred while processing the form. Please try again.');
            }
            //window.location.href = 'FinaaceGuru/view2_courses/course.html';
        }

        // Add event listener to the submit button (assuming it exists)
        const submitButton = document.getElementById("submit");
        if (submitButton) {
            submitButton.addEventListener('click', onFormSubmit);
        } else {
            console.warn("Submit button with ID 'submit' not found.");
        }
    } else {
        console.warn("Form element with ID 'createStudent' not found.");
    }
});
