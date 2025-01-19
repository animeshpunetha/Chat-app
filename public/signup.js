document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Basic form validation
    if (!email || !username || !password) {
        alert('Please fill out all fields!');
        return;
    }

    // Mock signup request (replace with actual API call to backend)
    console.log('User Registered:', { email, username, password });

    // For demo purposes, just redirect after successful signup
    // In a real scenario, handle the response from backend and show appropriate message
    alert('Signup successful! Redirecting to login...');
    window.location.href = 'login.html'; // Redirect to login page
});
