function validateForm() {
    var firstName = document.getElementById('firstName').value;
    var lastName = document.getElementById('lastName').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var verifyPassword = document.getElementById('verifyPassword').value;

    var inputs = [firstName, lastName, email, password, verifyPassword];

    var isFormValid = true;

    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i] === '') {
        isFormValid = false;
        document.getElementById('input_' + i).style.borderColor = 'red';
      } else {
        document.getElementById('input_' + i).style.borderColor = '#31a5ed';
      }
    }

    if (isFormValid) {
      // Відправити форму
      submitForm();
    }
  }

  function submitForm() {
    // Додайте ваш код для обробки відправки форми тут
    alert('Форма була успішно відправлена!');
    // Нижче ви можете додати додаткову логіку для обробки відправки форми
  }