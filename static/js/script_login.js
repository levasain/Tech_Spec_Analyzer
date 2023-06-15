function showLogin() {
    var loginContainer = document.getElementById('loginContainer');
    loginContainer.style.display = 'block';
    setTimeout(function() {
        loginContainer.classList.add('show');
    }, 10);
}

function closeLogin() {
    var loginContainer = document.getElementById('loginContainer');
    loginContainer.classList.remove('show');
    setTimeout(function() {
        loginContainer.style.display = 'none';
    }, 300);
}

function sendLogin() {
    var loginInput = document.getElementById('login');
    var passwordInput = document.getElementById('password');
    var loginContainer = document.getElementById('loginContainer');

    if (loginInput.value === '') {
        loginInput.style.borderColor = 'red';
    } else {
        loginInput.style.borderColor = '';
    }

    if (passwordInput.value === '') {
        passwordInput.style.borderColor = 'red';
    } else {
        passwordInput.style.borderColor = '';
    }

    if (loginInput.value === '' || passwordInput.value === '') {
        loginContainer.style.display = 'block';
        return false;
    }

    // Виконуємо додаткові дії після успішного входу
    alert('Успішний вхід!');

    // Одержуємо посилання на форму
    var loginForm = document.getElementById('loginForm');

    // Відправляємо форму, тільки якщо всі поля заповнені
    if (loginForm && loginForm.checkValidity()) {
        loginForm.submit();
    }

    loginContainer.style.display = 'none';
    return false;
}

document.addEventListener('DOMContentLoaded', function() {
    var loginContainer = document.getElementById('loginContainer');
    loginContainer.style.display = 'none';

    var loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', function(event) {
        var loginInput = document.getElementById('login');
        var passwordInput = document.getElementById('password');

        if (loginInput.value === '' || passwordInput.value === '') {
            event.preventDefault();
            loginContainer.style.display = 'block';
        }
    });

    var loginButton = document.getElementById('loginButton');
    loginButton.addEventListener('click', function(event) {
        var loginInput = document.getElementById('login');
        var passwordInput = document.getElementById('password');

        if (loginInput.value === '' || passwordInput.value === '') {
            event.preventDefault();
            loginContainer.style.display = 'block';
        }
    });
});
