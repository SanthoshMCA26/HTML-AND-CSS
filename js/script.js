document.getElementById("loginForm").addEventListener("submit", function(event) {
      event.preventDefault(); // stop form from refreshing

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const message = document.getElementById("message");

      // Example check (replace with your real validation logic)
      if (email === "admin@gmail.com" && password === "1234") {
        message.style.color = "green";
        message.textContent = "Login successful! Redirecting...";
        setTimeout(() => {
          window.location.href = "Dashboard.html"; // go to dashboard page
        }, 1500);
      } else {
        message.style.color = "red";
        message.textContent = "Invalid username or password!";
        }
    });

    //for sign submit button

    document.getElementById("registerForm").addEventListener("submit", function(event) {
      event.preventDefault(); // prevent refresh

      // ✅ After signup, redirect to login page
      window.location.href = "login.html";
    });


