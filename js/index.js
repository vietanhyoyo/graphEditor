
const focusInput = (idInput) => {
    $(`#${idInput}Label`).removeClass("c-danger-label");
    $(`#${idInput}`).removeClass("c-danger-input");
}

const onSubmitForm = (e) => {
    e.preventDefault();
    let bool = true;

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const company = document.getElementById('company').value;
    const message = document.getElementById('message').value;

    if (name === '') {
        $("#nameLabel").addClass("c-danger-label");
        $("#name").addClass("c-danger-input");
        bool = false;
    }
    if (email === '') {
        $("#emailLabel").addClass("c-danger-label");
        $("#email").addClass("c-danger-input");
        bool = false;
    }
    if (phone === '') {
        $("#phoneLabel").addClass("c-danger-label");
        $("#phone").addClass("c-danger-input");
        bool = false;
    }
    if (company === '') {
        $("#companyLabel").addClass("c-danger-label");
        $("#company").addClass("c-danger-input");
        bool = false
    }
    if (message === '') {
        $("#messageLabel").addClass("c-danger-label");
        $("#message").addClass("c-danger-input");
        bool = false
    }

    var emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!emailRegex.test(email)) {
        $("#emailLabel").addClass("c-danger-label");
        $("#email").addClass("c-danger-input");
        bool = false;
    }

    var phoneRegex = /^(\+91-|\+91|0)?\d{10}$/;
    if (!phoneRegex.test(phone)) {
        $("#phoneLabel").addClass("c-danger-label");
        $("#phone").addClass("c-danger-input");
        bool = false;
    }

    if (!bool) {
        $("#alertModal").modal('show');
    } else {
        e.currentTarget.submit();
    }
    console.log(bool)
}

$('form').on('submit', onSubmitForm);