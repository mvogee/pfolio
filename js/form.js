import {names, emails, messages} from "./blists/list.js";

const form = document.querySelector("#contact-form");
const messageStatus = document.querySelector(".messageStatus");

const checkName = (formName) => {
    let approved = true;
    names.forEach((name) => {
        if (formName.toLowerCase() === name.toLowerCase()) {
            approved = false;
        }
    });
    return (approved);
};

const checkEmail = (formEmail) => {
    let approved = true;
    emails.forEach((email) => {
        if (formEmail.toLowerCase() === email.toLowerCase()) {
            approved = false;
        }
    });
    return (approved);
};

const checkMessage = (formMessage) => {
    let approved = true;
    messages.forEach((message) => {
        if (formMessage.toLowerCase() === message.toLowerCase()) {
            return (false);
        }
    });
    return (approved);
};

const formCheck = (form) => {
    if (!checkName(form.name)) {
        return (false);
    }
    if (!checkEmail) {
        return (false);
    }
    if (!checkMessage) {
        return (false);
    }
    else {
        return (true);
    }
};

form.addEventListener("submit", (e) => {
    messageStatus.textContent = "submitting...";
    e.preventDefault();
    const formData = new FormData(form);
    let object = {};
    formData.forEach((value, key) => {
        object[key] = value;
    });
    let json = JSON.stringify(object);
    if (formCheck(object)) {
        fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: json,
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status === 200) {
                messageStatus.textContent = json.message;
            }
            else {
                messageStatus.textContent = json.message;
            }
        })
        .catch((error) => {
            console.log(error);
            messageStatus.textContent = "uh oh! An error ocurred. Please try again.";
        })
        .then(() => {
            form.reset();
            setTimeout(() => {
                messageStatus.textContent = "Thank you for sending me a message!\nI will send a reply as soon as possible.";
            }, 5000);
        });
    }
    else {
        messageStatus.textContent = "Form submission canceled. Invalid form.";
        form.reset();
        setTimeout(() => {
            messageStatus.textContent = "";
        }, 3000);
    }
});
