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
                    //createStudentForm.reset();
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