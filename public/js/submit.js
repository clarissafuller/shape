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
        document.location.replace("/login");
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

document.querySelector("#submit").addEventListener("click", submitFormHandler);
