const buttons = document.querySelectorAll('.tool-button');
    buttons.forEach(button => {
    button.addEventListener('click', () => {
        buttons.forEach(btn => btn.classList.remove('checked'));
        button.classList.add('checked');
    });
});