window.onload = () => {
  inputCar();
};

function inputCar() {
  document.querySelector("#car").addEventListener("submit", async (event) => {
      event.preventDefault();
      const form = event.target;
      const my_brand = form.brand.value;
      const my_model = form.model.value;
      const my_age = form.age.value;
      const my_cc = form.cc.value;
      const my_hand = form.hand.value;
      const formBody = {
          brand: my_brand,
          model: my_model,
          age: my_age,
          cc: my_cc,
          hand: my_hand
      };
      console.log(formBody);
      const resp = await fetch("/cars/create", {
          method: "POST",
          headers: {
              "content-type": "application/json; charset=utf-8",
          },
          body: JSON.stringify(formBody),
      });
      
      const data = await resp.json();
      console.log(data)
      if (resp.status == 201) {
          console.log(data);
          window.location = "./main.html";
      }
  });
};
