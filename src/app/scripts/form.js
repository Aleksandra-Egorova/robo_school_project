const form = document.querySelector("#form"); 
const nameInput = document.querySelector("#name");
const phoneInput = document.querySelector("#phone");
const emailInput = document.querySelector("#mail");

const regexName = new RegExp(/[A-Za-zА-Яа-яЁё]{2,}$/i);
const regexPhone = new RegExp(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/gm);
const regexEmail = new RegExp(/[A-Z0-9._%+-]+@[A-Z0-9-]+\.[A-Z]/igm);

let formData = {
    name: {
        value: "",
        isValid: false,
    },
    phone: {
        value: "",
        isValid: false,
    },
    email: {
        value: "",
        isValid: false,
    },
};

function handleNameValueChange(event) {
    formData.name.value = event.target.value;
    formData.name.isValid = true;
    nameInput.classList.remove("input--invalid"); 
    nameInput.setCustomValidity(""); 
}
nameInput.addEventListener("keydown", handleNameValueChange);
nameInput.addEventListener("paste", handleNameValueChange);
nameInput.addEventListener("input", handleNameValueChange);

function handlePhoneValueChange(event) {
    formData.phone.value = event.target.value;
    formData.phone.isValid = true;
    phoneInput.classList.remove("input--invalid"); 
    phoneInput.setCustomValidity("");
}
phoneInput.addEventListener("keydown", handlePhoneValueChange);
phoneInput.addEventListener("paste", handlePhoneValueChange);
phoneInput.addEventListener("input", handlePhoneValueChange);

function handleEmailValueChange(event) {
    formData.email.value = event.target.value;
    formData.email.isValid = true;
    emailInput.classList.remove("input--invalid"); 
}
emailInput.addEventListener("keydown", handleEmailValueChange);
emailInput.addEventListener("paste", handleEmailValueChange);
emailInput.addEventListener("input", handleEmailValueChange);


function checkNameValidity() {
    const isValidValue = formData.name.value.match(regexName); 
    formData.name.isValid = isValidValue; 

    if (!isValidValue) { 
        nameInput.classList.add("input--invalid"); 
        nameInput.setCustomValidity("Имя должно содержать только буквы русского или латинского алфавита");

        return; 
    };
    nameInput.classList.remove("input--invalid");
};

function checkPhoneValidity() {
    const isValidValue = formData.phone.value.match(regexPhone);
    formData.phone.isValid = isValidValue;

    if (!isValidValue) {
        phoneInput.classList.add("input--invalid");
        phoneInput.setCustomValidity("Номер телефона должен состоять из цифр и/или символов (), +, -");

        return;
    };
    phoneInput.classList.remove("input--invalid");
};

function checkEmailValidity() {
    const isValidValue = formData.email.value.match(regexEmail);
    formData.email.isValid = isValidValue;

    if (!isValidValue) {
        emailInput.classList.add("input--invalid");
        
        return;
    };
    emailInput.classList.remove("input--invalid");
};

function clearInputs() {
    formData = {
        name: {
            value: "",
            isValid: false,
        },
        phone: {
            value: "",
            isValid: false,
        },
        email: {
            value: "",
            isValid: false,
        },
    };
    nameInput.value = "";
    phoneInput.value = "";
    emailInput.value = "";
};

function checkFormValidity() {
    checkNameValidity();
    checkPhoneValidity();
    checkEmailValidity();

    const formNativeValidity = form.checkValidity();
    const isAllInputsValid = Object.values(formData).filter(
        (value) => !value.isValid 
    ).length;

    if (formNativeValidity && Boolean(!isAllInputsValid)) {  
        console.log({
            name: formData.name.value,
            phone: formData.phone.value,
            email: formData.email.value,
        });

        clearInputs();
    };
};

form.addEventListener("submit", (event) => {
    event.preventDefault(); 
    checkFormValidity();
});