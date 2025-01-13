const form = document.querySelector("#form"); 
const inputs = document.querySelectorAll("input");
const nameInput = document.querySelector("#name");//вытаскиваем все инпуты по тегу (селектору)
// console.log(inputs); //получаем массив всех инпутов
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
        nameInput.reportValidity();//тут возня с тем что у нас по факту идет пошагово сначала нативная валидация, потом императивно руками мы еще раз проверяем
        //они срабатывают не одновременно
        //ты как бы засетала туда сообщение, но чтобы его показать тебе надо дернуть либо еще раз нативную проверку, либо руками вывести сообщение

        return false; 
    };

    nameInput.classList.remove("input--invalid");
    return true;
};

function checkPhoneValidity() {
    const isValidValue = formData.phone.value.match(regexPhone);
    formData.phone.isValid = isValidValue;

    if (!isValidValue) {
        phoneInput.classList.add("input--invalid");
        phoneInput.setCustomValidity("Номер телефона должен состоять из цифр и/или символов (), +, -");
        phoneInput.reportValidity();

        return false;
    };

    phoneInput.classList.remove("input--invalid");
    return true;
};

function checkEmailValidity() {
    const isValidValue = formData.email.value.match(regexEmail);
    formData.email.isValid = isValidValue;

    if (!isValidValue) {
        emailInput.classList.add("input--invalid");
        
        return false;
    };

    emailInput.classList.remove("input--invalid");
    return true;
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

//вместо nameInput.value = ""; .....
//можно вытащить все инпуты через querySelectorAll и пробежаться по ним циклом - Можно закрыть кейс с тем, что список инпутов может поменяться
//Цикл для обнуления значений всех инпутов:
    inputs.forEach(input => {
        input.value = "";
        input.classList.remove("input--invalid");
        input.setCustomValidity("");
    });

    // nameInput.value = "";
    // phoneInput.value = "";
    // emailInput.value = "";

};



// Функция для валидации инпутов
const validateInputs = () => {
    const validators = {
        name: checkNameValidity,
        phone: checkPhoneValidity,
        email: checkEmailValidity,
    };

    const inputsArray = Array.from(inputs);
    inputsArray.map((input) => { //Метод map() создаёт новый массив с результатом вызова указанной функции для каждого элемента массива.
        return validators[input.id];
    })
    
    return inputsArray.every(Boolean);
};

// в validateInputs мы просто создаем массив из inputs, потому что NodeList !== Array и мы можем только через forEach там проитерироваться, что нам неудобно
// мапимся по результирующему массиву и на каждом вызове вместо элемента просто возвращаем результат проверки по айдишнику инпута, используя словарик validators
// Из всей функции возвращаем true если все валидны и false если хоть один невалиден




//корректировка function checkFormValidity()  по замечаниям:
// Функция-обработчик для отправки формы:
function handleFormSubmit(event) {
    event.preventDefault(); // предотвращаем стандартное поведение (перезагрузку)отправки формы

    const formNativeValidity = form.checkValidity(); 
//form.checkValidity(); - у формы есть такая встроенная функция (ее не надо нигде выше описывать - она встроенная). Она проверяет нативную валидацию (встроенную), которая у нас есть в html в инпутах (мы например задали required, minlength, maxlength) 
    const isValidForm = validateInputs();//возвращает булин тип
    console.log(isValidForm);

    if (formNativeValidity && isValidForm ) {  
        console.log({
            name: formData.name.value,
            phone: formData.phone.value,
            email: formData.email.value,
        });

        clearInputs();
    };
};

form.addEventListener("submit", handleFormSubmit);





