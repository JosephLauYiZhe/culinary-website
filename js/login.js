        // Toggle between login and sign-up forms
        function toggleForms() {
            const loginPanel = document.getElementById("loginPanel");
            const signupPanel = document.getElementById("signupPanel");
            loginPanel.classList.toggle("hidden");
            signupPanel.classList.toggle("hidden");

            // Add visible class for animations
            loginPanel.classList.toggle("visible");
            signupPanel.classList.toggle("visible");
        }

        // Show error message
        function showError(elementId, message) {
            const errorElement = document.getElementById(elementId);
            errorElement.textContent = message;
            errorElement.classList.add("visible");
        }
        

        // Sign-up functionality
        function signUpUser(e) {
            e.preventDefault();
            const username = document.getElementById("signupUsername").value;
            const email = document.getElementById("signupEmail").value;
            const password = document.getElementById("signupPassword").value;

            if (username && email && password) {
                if (typeof (Storage) !== "undefined") {
                    localStorage.setItem("username", username);
                    localStorage.setItem("userEmail", email);
                    localStorage.setItem("userPassword", password);
                    alert("Sign-Up successful! You can now log in.");
                    toggleForms();
                } else {
                    alert("Sorry, your browser does not support Web Storage.");
                }
            } else {
                showError("signupError", "Please fill in all fields correctly.");
            }
        }

        // Login functionality
        function loginUser(e) {
            e.preventDefault();
            const email = document.getElementById("loginEmail").value;
            const password = document.getElementById("loginPassword").value;

            if (typeof (Storage) !== "undefined") {
                const storedEmail = localStorage.getItem("userEmail");
                const storedPassword = localStorage.getItem("userPassword");
                const storedUsername = localStorage.getItem("username");

                if (email === storedEmail && password === storedPassword) {
                    alert("Login successful! Welcome " + storedUsername + ".");
                    sessionStorage.setItem("IsLoggedIn", "true");
                    sessionStorage.setItem("username", storedUsername);
                    // Redirect to index.html
                    window.location.href = "index.html";
                } else {
                    showError("loginError", "Invalid email or password.");
                }
            } else {
                alert("Sorry, your browser does not support Web Storage.");
            }
        }