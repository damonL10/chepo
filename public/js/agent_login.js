window.onload = () => {
  LoginForm();
};

function LoginForm(){
  document.querySelector("#form-login").addEventListener("submit", async (e) => {
      e.preventDefault();
      const form = e.target;
      const formBody = {
      username: form.username.value,
      password: form.password.value
      }
      const res = await fetch('/agents/login', {
          method: "POST",
          headers: {
              'Content-Type': 'application/json; charset=utf-8',
          },
          body: JSON.stringify(formBody),
      })

       if (res.status == '200') {
          const { message } = await res.json()
          console.log(message)
          window.location = "/agent/main.html"
      }
      // error
      else {
          const da = await res.json();
          alert(da.message)
      }
  })
}