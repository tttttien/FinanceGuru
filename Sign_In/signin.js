document.addEventListener('DOMContentLoaded', function () {
    const signInForm = document.querySelector('.login-form');
    const errorMessage = document.getElementById('error-message');

    signInForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const email = document.getElementById('exampleInputEmail1').value;
        const password = document.getElementById('exampleInputPassword1').value;

        try {
            const response = await fetch('http://localhost:2001/employees/Login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('user', JSON.stringify(data)); // Use localStorage
                localStorage.setItem('fullName', data.fullName); // Store fullName from response (lowercase f)
                window.location.href = '../index.html';
            } else {
                const errorData = await response.json();
                showPopup("Invalid email or password"); // Assuming the server sends an error message
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
    alert(message);
}