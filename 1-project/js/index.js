
const form = document.getElementById('formId');
const inputs = document.querySelectorAll('#formId input');
const select = document.querySelector('#formId select');


const expressions = {
	name: /^[a-zA-ZÀ-ÿ\s]{3,20}$/, // Letras y espacios, pueden llevar acentos.
	lastname: /^[a-zA-ZÀ-ÿ\s]{3,20}$/, // Letras y espacios, pueden llevar acentos.
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
}

const fields = {
    name: false,
    lastname: false,
    email:false,
    birthdate: false,
    country: false
}

const formValidated = (e) => {
    switch ( e.target.name ){
        case "name":
            fieldValidation(expressions.name, e.target, e.target.name);
        break;
        case "lastname":
            fieldValidation(expressions.lastname, e.target, e.target.name);
        break;
        case "email":
            fieldValidation(expressions.email, e.target, e.target.name);
        break;
        case "birthdate":
            dateValidation(e.target.value);
        break;
        case "country":
            countryValidation(e.target.value);
        break;
    }
}

const fieldValidation = (expression, input, field) => {
    if(expression.test(input.value)){
        document.getElementById(`group-${field}`).classList.remove('invalid-group');
        document.getElementById(`group-${field}`).classList.add('correct-group');
        document.querySelector(`#group-${field} .input-error`).classList.remove('input-error-active');
        document.querySelector(`#group-${field} i`).classList.add('fa-check-circle');
        document.querySelector(`#group-${field} i`).classList.remove('fa-times-circle');
        fields[field] = true;
    }else {
        document.getElementById(`group-${field}`).classList.add('invalid-group');
        document.getElementById(`group-${field}`).classList.remove('correct-group');
        document.querySelector(`#group-${field} .input-error`).classList.add('input-error-active');
        document.querySelector(`#group-${field} i`).classList.remove('fa-check-circle');
        document.querySelector(`#group-${field} i`).classList.add('fa-times-circle');
        fields[field] = false;
    }
}

const dateValidation = (birthdate) => {
    const errorElement = document.querySelector(`#group-birthdate .input-error`);
    const errorFuture = document.querySelector(`#group-birthdate .input-error-future`);
    const errorAge = document.querySelector(`#group-birthdate .input-error-age`);

    // Limpiar todos los mensajes de error al inicio
    errorElement.classList.remove('input-error-active');
    errorFuture.classList.remove('input-error-future-active');
    errorAge.classList.remove('input-error-age-active');

    if (!birthdate) {
        errorElement.classList.add('input-error-active');
        return;
    }

    const selectedDate = new Date(birthdate);
    const actualDate = new Date();

    if (selectedDate > actualDate) {
        errorFuture.classList.add('input-error-future-active');
        return;
    }

    const minAge = 18;
    const limitDate = new Date();
    limitDate.setFullYear(limitDate.getFullYear() - minAge);

    if (selectedDate > limitDate) {
        errorAge.classList.add('input-error-age-active');
        return;
    }

    fields.birthdate = true;
}


const countryValidation = (country) => {
    const errorElement = document.querySelector(`#group-country .input-error`);
    
    if (country === "") {
        errorElement.classList.add('input-error-active'); // Muestra el mensaje de error
        fields.country = false; // Marca el campo como no válido
    } else {
        errorElement.classList.remove('input-error-active'); // Oculta el mensaje de error
        fields.country = true; // Marca el campo como válido
    }
}

inputs.forEach((input) =>  {
    input.addEventListener('keyup', formValidated);
    input.addEventListener('blur', formValidated);
})

const countrySelect = document.getElementById('country');
countrySelect.addEventListener('change', formValidated);
countrySelect.addEventListener('blur', formValidated);
countrySelect.addEventListener('keyup', formValidated);

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if( fields.name && fields.lastname && fields.email && fields.birthdate && fields.country ){
        form.reset();

        document.getElementById('success-msg').classList.add('success-msg-active');
        setTimeout(() => {
            document.getElementById('success-msg').classList.remove('success-msg-active');
        }, 3000);

        document.querySelectorAll('.correct-group').forEach((icon) => {
            icon.classList.remove('correct-group');
        })

        document.getElementById('error-msg').classList.remove('error-msg-active');
    }else {
        document.getElementById('error-msg').classList.add('error-msg-active');
    }
});