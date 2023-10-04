const loginFormHandler = async (event) => {
  // Stop the browser from submitting the form so we can do so with JavaScript
  event.preventDefault();

  // Gather the data from the form elements on the page
  const email = document.querySelector("#email-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  if (email && password) {
    // Send the e-mail and password to the server
    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        document.location.replace("/");
      } else {
        alert("Failed to log in");
      }
    } catch (err) {
      alert(err);
    }
  }
};

const submitFormHandler = async (event) => {
  // Stop the browser from submitting the form so we can do so with JavaScript
  event.preventDefault();

  // Gather the data from the form elements on the page
  const name = document.querySelector("#name-submit").value.trim();
  const email = document.querySelector("#email-submit").value.trim();
  const password = document.querySelector("#password-submit").value.trim();

  if (name && email && password) {
    try {
      // Send the name, e-mail and password to the server
      const response = await fetch("/api/users/sign-up", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        document.location.replace("/login?");
        alert("Your account has been created!");
      } else {
        alert("Something went wrong, try again!");
      }
    } catch (err) {
      alert(err);
    }
  } else {
    console.log("no data");
  }
};

document
  .querySelector("#login-form")
  .addEventListener("submit", loginFormHandler);

document
  .querySelector("#signUp-submit")
  .addEventListener("submit", submitFormHandler);
