document.getElementById("login").addEventListener("click", () => {
    const email = document.getElementById("login_email").value;
    const password = document.getElementById("login_password").value;

    if (!email || !password) { 
        alert("Please enter email and password"); 
        return; 
    }

    signInWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            console.log("Logged in user:", userCredential.user);
            alert("Login Successful: " + userCredential.user.email);

            // ✅ Redirect after successful login
            window.location.href = "index.html"; // adjust path to your main page
        })
        .catch(error => {
            console.error(error);
            alert(error.message);
        });
});
