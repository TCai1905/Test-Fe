document.getElementById('userDataForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const data = {
        name: formData.get('name'),
        dob: formData.get('dob'),
        gender: formData.get('gender'),
        hobby: formData.get('hobby')
    };

    // Update the URL to your live Google Cloud Run URL
    fetch('https://cbrothers-210186650685.asia-southeast1.run.app/submit-user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        const messageElement = document.getElementById('responseMessage');
        if (result.success) {
            messageElement.textContent = "Data successfully submitted!";
            messageElement.style.color = "green";
        } else {
            messageElement.textContent = "Error submitting data. Check server logs.";
            messageElement.style.color = "red";
        }
    })
    .catch(error => {
        console.error('Error:', error);
        const messageElement = document.getElementById('responseMessage');
        messageElement.textContent = "Network error. Could not reach the server.";
        messageElement.style.color = "red";
    });
});