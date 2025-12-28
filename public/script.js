document.getElementById('regForm').addEventListener('submit', async function(e) {
    e.preventDefault(); // Stop the page from reloading

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const messageBox = document.getElementById('message');
    const submitBtn = document.getElementById('submitBtn');

    // UI Feedback
    submitBtn.innerText = 'Processing...';
    submitBtn.disabled = true;
    messageBox.style.color = '#666';
    messageBox.innerText = '';

    try {
        const response = await fetch('/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (data.success) {
            messageBox.style.color = 'green';
            messageBox.innerText = data.message;
            document.getElementById('regForm').reset();
        } else {
            messageBox.style.color = 'red';
            messageBox.innerText = data.message;
        }
    } catch (error) {
        messageBox.style.color = 'red';
        messageBox.innerText = 'Server error. Please try again later.';
    } finally {
        submitBtn.innerText = 'Register';
        submitBtn.disabled = false;
    }
});