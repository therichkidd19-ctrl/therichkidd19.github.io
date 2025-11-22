document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('loginForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita el envío real del formulario

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Validación simple
        if (username.trim() !== '' && password.trim() !== '') {
            alert('Inicio de sesión exitoso (Simulado).\nUsuario: ' + username);
            // Aquí iría la lógica de envío al servidor
        } else {
            alert('Por favor, ingresa tu usuario y contraseña.');
        }
    });

    // Pequeño script para manejar el estado visual de los inputs
    document.querySelectorAll('.input-glow-group input').forEach(input => {
        // La animación de la etiqueta se maneja principalmente con el pseudo-selector :valid en CSS
    });
});