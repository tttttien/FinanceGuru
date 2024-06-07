document.addEventListener('DOMContentLoaded', function () {
    const signInForm = document.querySelector('.login-form'); // Select the form using class
    const errorMessage = document.getElementById('error-message'); // Select the error message element

    signInForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const email = document.getElementById('exampleInputEmail1').value; // Select email input by ID
        const password = document.getElementById('exampleInputPassword1').value; // Select password input by ID

        try {
            const response = await fetch('http://localhost:2001/employees/Login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password }) // Include password in the request body
            });

            if (response.ok) {
                const data = await response.json();
                sessionStorage.setItem('user', JSON.stringify(data));
                window.location.href = '../index.html';
            } else {
                const errorData = await response.json();
                showPopup("Invalid email or password");
                console.error('Error logging in:', errorData.error);
                errorMessage.textContent = 'Invalid email or password';
                errorMessage.style.display = 'block';
            }
        } catch (error) {
            console.error('Error logging in:', error);
            errorMessage.textContent = 'Network error. Please try again later.';
            errorMessage.style.display = 'block';
        }
    });
});

function showPopup(message) {
    // Implement this function to show a popup with the message (e.g., alert(message))
}