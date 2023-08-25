// Getting all dom elements from html
const authButton = document.getElementById("auth-button");
const popupContainer = document.getElementById("popupContainer");
const loginTab = document.getElementById("loginTab");
const signupTab = document.getElementById("signupTab");
const tabButtons = document.querySelectorAll(".tab-button");
const navgateToSignup=document.getElementById("navgate-to-signup")
const signupForm = document.getElementById("signupForm");
const loginForm = document.getElementById("loginForm");
const signupErrorMessage = document.getElementById("signupErrorMessage");
const loginErrorMessage = document.getElementById("loginErrorMessage");
const signupPasswordInput = document.getElementById("signupPassword");
const loginPasswordInput = document.getElementById("loginPassword");
const openEyeIconSignup = document.getElementById("open-eye-signup");
const closedEyeIconSignup = document.getElementById("closed-eye-signup");
const closedEyeIconLogin = document.getElementById("open-eye-login");
const openEyeIconLogin = document.getElementById("closed-eye-login");
const goBack = document.getElementById("back-button");

// showing  login popup
authButton.addEventListener("click", () => {
    popupContainer.style.display = "flex";
    loginTab.style.display = "block";
    signupTab.style.display = "none";
    tabButtons[0].classList.add("active");
    tabButtons[1].classList.remove("active");
});

// Functionality of goback button
goBack.addEventListener("click", () => {
    loginTab.style.display = "block";
    signupTab.style.display = "none";
    tabButtons[0].classList.add("active");
    tabButtons[1].classList.remove("active");
});
navgateToSignup.addEventListener("click", ()=>{
    loginTab.style.display = "none";
            signupTab.style.display = "block";
            tabButtons[0].classList.remove("active");
            tabButtons[1].classList.add("active");

})

// Functionality of sinup-login switching viceversa
tabButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (button.dataset.tab === "login") {
            loginTab.style.display = "block";
            signupTab.style.display = "none";
            tabButtons[0].classList.add("active");
            tabButtons[1].classList.remove("active");
        } else if (button.dataset.tab === "signup") {
            loginTab.style.display = "none";
            signupTab.style.display = "block";
            tabButtons[0].classList.remove("active");
            tabButtons[1].classList.add("active");
        }
    });
});

// Toggle for password visibility icon and password
function togglePasswordVisibility(passwordInput, openEyeIcon, closedEyeIcon) {
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        openEyeIcon.style.display = "none";
        closedEyeIcon.style.display = "block";
        closedEyeIcon.style.color = "red";
    } else {
        passwordInput.type = "password";
        closedEyeIcon.style.display = "none";
        openEyeIcon.style.display = "block";
        openEyeIcon.style.color = "green";
    }
}

// Event listeners of password visibility toggling
openEyeIconSignup.addEventListener("click", () => {
    togglePasswordVisibility(signupPasswordInput, openEyeIconSignup, closedEyeIconSignup);
});

closedEyeIconSignup.addEventListener("click", () => {
    togglePasswordVisibility(signupPasswordInput, openEyeIconSignup, closedEyeIconSignup);
});

openEyeIconLogin.addEventListener("click", () => {
    togglePasswordVisibility(loginPasswordInput, openEyeIconLogin, closedEyeIconLogin);
});

closedEyeIconLogin.addEventListener("click", () => {
    togglePasswordVisibility(loginPasswordInput, openEyeIconLogin, closedEyeIconLogin);
});

// Email format validation
const validateEmail = (mail) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail);
}

// Password format validation
const validatePassword = (pass) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*]{6,16}$/.test(pass);
}

// Signup form submission even handling
signupForm.addEventListener("submit", (event) => {
    signupErrorMessage.textContent = "Please enter a password.";
    event.preventDefault();
    const fullName = signupForm.fullName.value;
    const email = signupForm.signupEmail.value;
    const password = signupForm.signupPassword.value;
    const mobile = signupForm.mobile.value;
    //making as an object to push into users array
    let user = {
        fullName,
        email,
        password,
        mobile,
    }
    //As  i disabled default validation in form so manual validation is done here
    if (!fullName && !email && !password && !mobile) {
        signupErrorMessage.textContent = "All Fields are empty";
    } else if (!fullName || fullName.length < 3) {
        signupErrorMessage.textContent = "Full name must be at least 5 characters long";
    } else if (!validateEmail(email)) {
        signupErrorMessage.textContent = "Please enter a valid email address";
    } else if (!(!isNaN(mobile) && mobile.length === 10)) {
        signupErrorMessage.textContent = "Please enter a valid mobile number";
    } else if (!validatePassword(password)) {
        signupErrorMessage.textContent = "Password must contain at least one uppercase letter, one lowercase letter, one digit, and be 6-16 characters long";
    } else {
        signupErrorMessage.textContent = "";
        //User object storing => checking sessional storage for user , if found it warns else current user pushed into array
        if (sessionStorage.getItem('users')) {
            let users = JSON.parse(sessionStorage.getItem('users'));
            let isuser = users.find((x) => x.mobile === mobile || x.email === email);
            if (!isuser) {
                users.push(user);
                sessionStorage.setItem("users", JSON.stringify(users));
                alert("User registered successfully");
                loginTab.style.display = "block";
                signupTab.style.display = "none";
                tabButtons[0].classList.add("active");
                tabButtons[1].classList.remove("active");
            } else {
                signupErrorMessage.textContent = "User Already Registered";
            }
        } else {
            let users = [user];
            sessionStorage.setItem("users", JSON.stringify(users));
            alert("User registered successfully");
        }
        //removing all content from feilds
        signupForm.fullName.value = '';
        signupForm.signupEmail.value = '';
        signupForm.signupPassword.value = '';
        signupForm.mobile.value = '';
    }
});

// Loginform submission even handling
loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const usermail = loginForm.usermail.value;
    const password = loginForm.userPassword.value;
// Reusing  email and password functions
    if (validateEmail(usermail) && validatePassword(password)) {
        if(JSON.parse(sessionStorage.getItem('users'))){
       let users = JSON.parse(sessionStorage.getItem('users'));
        //checking user is there are not
        let currentuser = users.find((x) => x.email === usermail);

        if (currentuser) {
            if (currentuser.email === usermail && currentuser.password === password) {
                loginErrorMessage.textContent = "Successfully logged in";
            } else {
                loginErrorMessage.textContent = "Incorrect Credentials";
            }
        } else {
            loginErrorMessage.textContent = "User Not Found";
        }
        loginForm.usermail.value = '';
        loginForm.userPassword.value = '';
    }else{
        loginErrorMessage.textContent = "No DataBase Found";
    }

    } else {
        loginErrorMessage.textContent = "email and password must be valid";
    }
});
