const STORAGE_KEY = 'currentAuthState';

// Initialize state management
function initializeState() {
    const currentState = sessionStorage.getItem(STORAGE_KEY) || 'login';
    setActiveForm(currentState, false); // false means no animation on initial load
}

// Set active form based on state
function setActiveForm(formType, animate = true) {
    const loginForm = document.querySelector('.login__form');
    const registerForm = document.querySelector('.register__form');
    const ball = document.querySelector('.ball');
    
    if (formType === 'register') {
        if (animate) {
            loginForm.style.transition = 'margin 1s, opacity 0.5s';
            registerForm.style.transition = 'margin 1s, opacity 0.5s';
        }
        loginForm.classList.remove('active');
        registerForm.classList.add('active');
        ball.classList.add('register');
        ball.classList.remove('login');
    } else {
        if (animate) {
            loginForm.style.transition = 'margin 1s, opacity 0.5s';
            registerForm.style.transition = 'margin 1s, opacity 0.5s';
        }
        loginForm.classList.add('active');
        registerForm.classList.remove('active');
        ball.classList.add('login');
        ball.classList.remove('register');
    }
    
    sessionStorage.setItem(STORAGE_KEY, formType);
}

// Form toggle event listeners
document.querySelector("#signUp").addEventListener('click', () => {
    setActiveForm('register', true);
});

document.querySelector("#signIn").addEventListener('click', () => {
    setActiveForm('login', true);
});

// Password visibility toggle with improved UX
function setupPasswordToggles() {
    const passwordFields = document.querySelectorAll('.auth__password');
    
    passwordFields.forEach(field => {
        const icon = field.nextElementSibling;
        
        icon.addEventListener('click', () => {
            const isPassword = field.type === 'password';
            field.type = isPassword ? 'text' : 'password';
            icon.classList.toggle('bi-eye-slash', !isPassword);
            icon.classList.toggle('bi-eye', isPassword);
        });
    });
}

// Dynamic form field management
function createDynamicField(userType, form) {
    const existingField = form.querySelector('.dynamic-field');
    if (existingField) {
        existingField.remove();
    }

    const fieldConfigs = {
        student: { label: 'Student ID', placeholder: 'Enter your student ID' },
        lecturer: { label: 'Staff ID', placeholder: 'Enter your staff ID' },
        hod: { label: 'Department Head ID', placeholder: 'Enter your HOD ID' },
        admin: { label: 'Admin ID', placeholder: 'Enter your admin ID' }
    };

    const config = fieldConfigs[userType.toLowerCase()] || fieldConfigs.student;
    
    const field = document.createElement('div');
    field.className = 'mb-2 dynamic-field fade-in';
    field.innerHTML = `
        <label class="form-label">${config.label}</label>
        <input type="text" 
               class="form-control text-indent shadow-sm bg-grey-light border-0 rounded-pill fw-lighter fs-7 p-3" 
               placeholder="${config.placeholder}"
               required>
    `;

    const userTypeSelect = form.querySelector('.user-type-select');
    userTypeSelect.parentNode.insertBefore(field, userTypeSelect.nextSibling);
}

// Initialize user type selects with improved UX
function initializeUserTypeSelects() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        if (!form.querySelector('.user-type-select')) {
            const userTypeDiv = document.createElement('div');
            userTypeDiv.className = 'mb-2 fade-in';
            userTypeDiv.innerHTML = `
                <label class="form-label">User Type</label>
                <select class="form-select bg-grey-light rounded-pill p-3 user-type-select">
                    <option value="student">Student</option>
                    <option value="lecturer">Lecturer</option>
                    <option value="hod">HOD</option>
                    <option value="admin">Admin</option>
                </select>
            `;
            
            const emailField = form.querySelector('input[type="email"]').parentNode;
            emailField.parentNode.insertBefore(userTypeDiv, emailField.nextSibling);
        }

        const select = form.querySelector('.user-type-select');
        select.addEventListener('change', (e) => {
            createDynamicField(e.target.value, form);
        });

        createDynamicField('student', form);
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeState();
    setupPasswordToggles();
    initializeUserTypeSelects();
});