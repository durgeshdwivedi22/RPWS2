// Login form functionality and validation
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const loginBtn = document.querySelector('.login-btn');
    const googleBtn = document.querySelector('.google-btn');
    const githubBtn = document.querySelector('.github-btn');

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Form validation functions
    function validateEmail(email) {
        if (!email) return 'Email is required';
        if (!emailRegex.test(email)) return 'Please enter a valid email address';
        return '';
    }

    function validatePassword(password) {
        if (!password) return 'Password is required';
        if (password.length < 6) return 'Password must be at least 6 characters long';
        return '';
    }

    // Show error message
    function showError(input, errorElement, message) {
        errorElement.textContent = message;
        input.parentElement.classList.add('error');
        setTimeout(() => {
            input.parentElement.classList.remove('error');
        }, 500);
    }

    // Clear error message
    function clearError(errorElement, input) {
        errorElement.textContent = '';
        input.parentElement.classList.remove('error');
    }

    // Real-time validation
    emailInput.addEventListener('blur', () => {
        const msg = validateEmail(emailInput.value);
        if (msg) showError(emailInput, emailError, msg);
        else clearError(emailError, emailInput);
    });

    passwordInput.addEventListener('blur', () => {
        const msg = validatePassword(passwordInput.value);
        if (msg) showError(passwordInput, passwordError, msg);
        else clearError(passwordError, passwordInput);
    });

    // Clear errors on focus
    emailInput.addEventListener('focus', () => clearError(emailError, emailInput));
    passwordInput.addEventListener('focus', () => clearError(passwordError, passwordInput));

    // Form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        const emailErrorMsg = validateEmail(email);
        const passwordErrorMsg = validatePassword(password);

        let hasErrors = false;

        if (emailErrorMsg) { showError(emailInput, emailError, emailErrorMsg); hasErrors = true; }
        else clearError(emailError, emailInput);

        if (passwordErrorMsg) { showError(passwordInput, passwordError, passwordErrorMsg); hasErrors = true; }
        else clearError(passwordError, passwordInput);

        if (!hasErrors) performLogin(email, password);
    });

    // Simulate login process and redirect
    function performLogin(email, password) {
        loginBtn.classList.add('loading');
        loginBtn.textContent = 'Signing In...';
        loginBtn.disabled = true;

        setTimeout(() => {
            loginBtn.classList.remove('loading');
            loginBtn.textContent = 'Sign In';
            loginBtn.disabled = false;

            // Redirect to main page after successful login
            window.location.href = "public/index.html"; // <-- Replace with your main page URL

        }, 2000);
    }

    // Google login simulation
    googleBtn.addEventListener('click', function() {
        alert('Google login would be implemented here (OAuth).');
    });

    // GitHub login simulation
    githubBtn.addEventListener('click', function() {
        alert('GitHub login would be implemented here (OAuth).');
    });

    // Remember me functionality
    const rememberCheckbox = document.getElementById('remember');
    if (localStorage.getItem('rememberMe') === 'true') {
        const savedEmail = localStorage.getItem('savedEmail');
        if (savedEmail) { emailInput.value = savedEmail; rememberCheckbox.checked = true; }
    }

    rememberCheckbox.addEventListener('change', function() {
        if (this.checked) {
            localStorage.setItem('rememberMe', 'true');
            if (emailInput.value) localStorage.setItem('savedEmail', emailInput.value);
        } else {
            localStorage.removeItem('rememberMe');
            localStorage.removeItem('savedEmail');
        }
    });

    emailInput.addEventListener('input', function() {
        if (rememberCheckbox.checked) localStorage.setItem('savedEmail', this.value);
    });

    // Forgot password functionality
    const forgotPasswordLink = document.querySelector('.forgot-password');
    forgotPasswordLink.addEventListener('click', function(e) {
        e.preventDefault();
        const email = emailInput.value.trim();
        let message = 'Please enter your email address to reset your password.';
        if (email && emailRegex.test(email)) message = `Password reset instructions will be sent to:\n${email}`;
        alert(message);
    });

    // Keyboard shortcut for Enter key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            const activeElement = document.activeElement;
            if (activeElement === emailInput || activeElement === passwordInput) {
                loginForm.dispatchEvent(new Event('submit'));
            }
        }
    });

    // Button click animation
    function addClickAnimation(button) {
        button.addEventListener('mousedown', () => button.style.transform = 'translateY(1px)');
        button.addEventListener('mouseup', () => button.style.transform = 'translateY(-1px)');
        button.addEventListener('mouseleave', () => button.style.transform = 'translateY(-1px)');
    }
    addClickAnimation(googleBtn);
    addClickAnimation(githubBtn);

    console.log('Login form initialized successfully!');
});
