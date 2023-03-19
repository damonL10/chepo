window.onload = () => {
    getClaimId();
    uploadFile();
};

async function getClaimId() {
   const resp = await fetch("/claims/");
   const myClaims = await resp.json();
//    console.log(myClaims[0]);  
   document.querySelector("#claim_id_span").innerHTML = `${myClaims[0].claim_id}`;
}

function uploadFile() {
    document.querySelector("#form_claim_now").addEventListener("submit", async (event) => {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData();
        const my_claim_id = parseInt(document.querySelector("#claim_id_span").textContent);
        formData.append("claim_id", my_claim_id);
        formData.append("image", form.car_image.files[0]);
        console.log(formData);
        const respon = await fetch("/claims/image_classifier", {
            method: "POST",
            body: formData,
        });
    
        console.log(respon.status);
        if (respon.status == 201) {
            form.reset();
            console.log("from frontend: register success!!");
            // document.querySelector("#upload_status").innerHTML = "You have successfully uploaded the image !!";
            window.location = "./claimcompleted.html";

        } else {
            const data = await respon.json();
            console.log(data.message);
        }
    });
};
    