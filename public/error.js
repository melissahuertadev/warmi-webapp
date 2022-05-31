//form submission
let cta = document.getElementById("cta");
let email = document.getElementById("email");
let success = document.getElementById("success");
let error = document.getElementById("error");
let signup = document.getElementById("signup");

cta.addEventListener("click", (e) => {
  e.preventDefault();

  if (this.email.value == null || this.email.value == "") {
    error.style.display = "block";
  } else {
    let fetchData = {
      method: 'POST',
      body: JSON.stringify({ email: this.email.value, js: true }),
      headers: {"Content-Type": "application/json"}
    };

   fetch('/suscribe', fetchData).then(res => {
        if(res.ok){
            signup.classList.add("fadeout");
            setTimeout(() => {
              success.classList.remove("hidden");
              success.classList.add("fadein");
              signup.style.display = "none";
            }, 1000);
        } else {
            error.style.display = "block";
        } 
    });
  }
});
