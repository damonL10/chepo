window.onload = () => {
    initCarList();
    initNewClaim();
};

async function initCarList() {
    const resp = await fetch("/cars/get");
    const myCars = await resp.json();
    console.log(myCars);  

    let newMyCarHtmlStr = ``;
    for (const car of myCars) {
        const carOption = `<option value="${car.car_id}">${car.brand} - ${car.model}</option>`;
        newMyCarHtmlStr += `${carOption}`;
        console.log(car);
    }
    const emptyHtmlStr = "<option>Please choose your car:</option>";
    document.querySelector("#car_list").innerHTML = emptyHtmlStr + newMyCarHtmlStr;
};

function initNewClaim() {
    document.querySelector("#form_claim_now").addEventListener("submit", async (event) => {
        event.preventDefault();
        const form = event.target;
        const my_car_id = form.car_list.value;
        const my_descriptions = form.descriptions.value;
        const my_accident_date = form.accident_date.value;
        const formBody = {
            car_id: my_car_id,
            descriptions: my_descriptions,
            accident_date: my_accident_date,
        };
        console.log(formBody);
        const resp = await fetch("/claims/claimnow", {
            method: "POST",
            headers: {
                "content-type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(formBody),
        });

        const data = await resp.json();
        
        if (resp.status == 201) {
            console.log(data);
            location.href = "./uploadfile.html";
        }
    });

};

