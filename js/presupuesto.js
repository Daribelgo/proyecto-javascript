document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#budget-form");

  if (!form) {
    return;
  }

  const totalOutput = document.querySelector("#total");
  const discountText = document.querySelector("#discount-text");
  const status = document.querySelector("#form-status");
  const productInputs = form.querySelectorAll('input[name="producto"]');
  const extraInputs = form.querySelectorAll('input[name="extras"]');
  const plazoInput = document.querySelector("#plazo");

  const contactFields = [
    {
      id: "nombre",
      label: "El nombre debe contener solo letras y espacios y tener entre 1 y 15 caracteres."
    },
    {
      id: "apellidos",
      label: "Los apellidos deben contener solo letras y espacios y tener entre 1 y 40 caracteres."
    },
    {
      id: "telefono",
      label: "El teléfono debe contener exactamente 9 números."
    },
    {
      id: "email",
      label: "Introduce un correo electrónico válido."
    }
  ];

  const currency = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR"
  });

  function getDiscount(months) {
    if (months >= 13) return 0.15;
    if (months >= 7) return 0.10;
    if (months >= 4) return 0.05;
    return 0;
  }

  function calculateTotal() {
    const selectedProduct = form.querySelector('input[name="producto"]:checked');
    const months = Number(plazoInput.value);

    if (!selectedProduct || !Number.isFinite(months) || months < 1) {
      totalOutput.value = "0,00 €";
      totalOutput.textContent = "0,00 €";
      discountText.textContent = "Selecciona un producto y un plazo válido.";
      return;
    }

    const productPrice = Number(selectedProduct.value);
    const extrasPrice = [...extraInputs]
      .filter((input) => input.checked)
      .reduce((sum, input) => sum + Number(input.value), 0);

    const subtotal = productPrice + extrasPrice;
    const discount = getDiscount(months);
    const total = subtotal * (1 - discount);

    totalOutput.value = total.toFixed(2);
    totalOutput.textContent = currency.format(total);
    discountText.textContent = discount > 0
      ? `Descuento aplicado: ${discount * 100} %.`
      : "Sin descuento para este plazo.";
  }

  function setFieldError(input, message) {
    const error = document.querySelector(`#${input.id}-error`);

    if (message) {
      input.setAttribute("aria-invalid", "true");
      if (error) error.textContent = message;
    } else {
      input.removeAttribute("aria-invalid");
      if (error) error.textContent = "";
    }
  }

  function validateContactField(input, message) {
    const value = input.value.trim();

    if (!value) {
      setFieldError(input, "Este campo es obligatorio.");
      return false;
    }

    if (!input.checkValidity()) {
      setFieldError(input, message);
      return false;
    }

    setFieldError(input, "");
    return true;
  }

  contactFields.forEach(({ id, label }) => {
    const input = document.querySelector(`#${id}`);

    if (!input) return;

    input.addEventListener("input", () => {
      validateContactField(input, label);
    });

    input.addEventListener("blur", () => {
      validateContactField(input, label);
    });
  });

  [...productInputs, ...extraInputs].forEach((input) => {
    input.addEventListener("change", calculateTotal);
  });

  plazoInput.addEventListener("input", calculateTotal);

  form.addEventListener("reset", () => {
    window.setTimeout(() => {
      contactFields.forEach(({ id }) => {
        const input = document.querySelector(`#${id}`);
        if (input) setFieldError(input, "");
      });

      status.textContent = "";
      calculateTotal();
    }, 0);
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    let valid = true;

    contactFields.forEach(({ id, label }) => {
      const input = document.querySelector(`#${id}`);
      if (!validateContactField(input, label)) {
        valid = false;
      }
    });

    const productSelected = form.querySelector('input[name="producto"]:checked');
    if (!productSelected) {
      valid = false;
    }

    const months = Number(plazoInput.value);
    if (!Number.isInteger(months) || months < 1 || months > 36) {
      valid = false;
      plazoInput.setCustomValidity("El plazo debe estar entre 1 y 36 meses.");
    } else {
      plazoInput.setCustomValidity("");
    }

    const conditions = document.querySelector("#condiciones");
    if (!conditions.checked) {
      valid = false;
    }

    if (!valid) {
      status.textContent = "Revisa los campos marcados antes de enviar el formulario.";
      status.style.color = "var(--danger)";
      form.reportValidity();
      return;
    }

    const selectedProductName = productSelected.dataset.name;
    status.textContent = `Solicitud preparada correctamente para ${selectedProductName}.`;
    status.style.color = "var(--green-dark)";
  });

  calculateTotal();
});
