let toggle = document.getElementById('toggle');
let lbl_toggle = document.getElementById('lbl-toggle');
let text = document.getElementsByClassName('text-theme');
let button = document.getElementById('btnSubmit');

const toggleMode = () => {
    toggle.checked = !toggle.checked;
    updateMode(toggle.checked);
};

//Cambiar de modo al dar click
lbl_toggle.addEventListener('click', (event) => {
    event.preventDefault();
    toggleMode();
});

//Cambiar de modo al apretar enter o espacio
lbl_toggle.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggleMode();
    }
});

function updateMode(checked) {
    document.body.classList.toggle('dark-mode', checked);
    select.classList.toggle('dark-mode', checked);
    form.classList.toggle('dark-mode', checked);
    button.classList.toggle('dark-mode', checked);

    // Recorrer los inputs' y agregar o quitar la clase 'dark-mode'
    inputs.forEach((input) =>  {
        input.classList.toggle('dark-mode', checked);
    })

    // Recorrer los elementos con clase 'text-theme' y agregar o quitar la clase 'dark-mode'
    for (let i = 0; i < text.length; i++) {
        text[i].classList.toggle('dark-mode', checked);
    }
    
    lbl_toggle.innerHTML = checked ? `
        <span class="light-mode">Modo claro</span>
        <i class="fa-solid fa-sun"></i>` : `
        <span>Modo oscuro</span>
        <i class="fa-solid fa-moon"></i>`;
}

// Inicializar estado visual basado en el estado del checkbox
updateMode(toggle.checked);