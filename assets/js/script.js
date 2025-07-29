document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('card-form');
  const successMessage = document.getElementById('success-message');
  const formWrapper = document.getElementById('form-wrapper');
  const continueBtn = document.getElementById('continue-btn');

  const nameInput = document.getElementById('cardholder-name');
  const numberInput = document.getElementById('card-number');
  const expiryInput = document.getElementById('expiry-date');
  const cvcInput = document.getElementById('cvc');

  const nameError = document.getElementById('name-error');
  const numberError = document.getElementById('number-error');
  const expiryError = document.getElementById('expiry-error');
  const cvcError = document.getElementById('cvc-error');

  const cardNumberDisplay = document.querySelector('.card-number');
  const cardHolderDisplay = document.querySelector('.card-holder');
  const cardExpiryDisplay = document.querySelector('.card-expiry');
  const cardCvcDisplay = document.querySelector('.card-cvc');

  const showError = (input, errorEl) => {
    errorEl.style.display = 'block';
    input.classList.add('error');
  };

  const clearErrors = () => {
    document
      .querySelectorAll('.error')
      .forEach((e) => (e.style.display = 'none'));
    document
      .querySelectorAll('input')
      .forEach((input) => input.classList.remove('error'));
  };

  const formatCardNumber = (value) => {
    return value
      .replace(/\D/g, '')
      .slice(0, 16)
      .replace(/(.{4})/g, '$1 ')
      .trim();
  };

  const formatExpiry = (value) => {
    return value
      .replace(/\D/g, '')
      .slice(0, 4)
      .replace(/(\d{2})(\d{0,2})/, '$1/$2');
  };

  numberInput.addEventListener('input', (e) => {
    const formatted = formatCardNumber(e.target.value);
    e.target.value = formatted;
    cardNumberDisplay.textContent = formatted || '0000 0000 0000 0000';
  });

  nameInput.addEventListener('input', (e) => {
    cardHolderDisplay.textContent =
      e.target.value.toUpperCase() || 'NOME DO TITULAR';
  });

  expiryInput.addEventListener('input', (e) => {
    const formatted = formatExpiry(e.target.value);
    e.target.value = formatted;
    cardExpiryDisplay.textContent = formatted || 'MM/AA';
  });

  cvcInput.addEventListener('input', (e) => {
    cardCvcDisplay.textContent = e.target.value || '000';
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors();
    let valid = true;

    if (!nameInput.value.trim()) {
      showError(nameInput, nameError);
      valid = false;
    }

    const number = numberInput.value.replace(/\s/g, '');
    if (!/^\d{16}$/.test(number)) {
      showError(numberInput, numberError);
      valid = false;
    }

    const [mm, yy] = expiryInput.value.split('/');
    const now = new Date();
    if (
      !mm ||
      !yy ||
      mm < 1 ||
      mm > 12 ||
      parseInt(`20${yy}`) < now.getFullYear()
    ) {
      showError(expiryInput, expiryError);
      valid = false;
    }

    if (!/^\d{3}$/.test(cvcInput.value)) {
      showError(cvcInput, cvcError);
      valid = false;
    }

    if (valid) {
      form.style.display = 'none';
      successMessage.style.display = 'flex';
    }
  });

  continueBtn.addEventListener('click', () => {
    form.reset();
    form.style.display = 'flex';
    successMessage.style.display = 'none';
    cardNumberDisplay.textContent = '0000 0000 0000 0000';
    cardHolderDisplay.textContent = 'NOME DO TITULAR';
    cardExpiryDisplay.textContent = 'MM/AA';
    cardCvcDisplay.textContent = '000';
  });
});
