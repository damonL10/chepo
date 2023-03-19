let selectedCustomer;
let selectedClaim;

window.onload = () => {
  loadCustomers();
};

async function loadCustomers() {
  const resp = await fetch("/customers/get");
  const customers = await resp.json();
  const customerList = document.querySelector("#customers");
  customerList.innerHTML = "";
  for (const customer of customers) {
    const cusName = document.createElement("div");
    cusName.className = "customerName";
    cusName.textContent = customer.name;
    customerList.appendChild(cusName);

    cusName.addEventListener("click", function () {
      selectedCustomer = customer.id;
      document.querySelector("#claims").innerHTML = "";
      document.querySelector("#details").innerHTML = "";
      loadClaimList();
      customerList.querySelectorAll("div").forEach((element) => {
        element.style.color = "white";
      });
      this.style.color = "black";
    });
  }
}


async function loadClaimList() {
  const resp = await fetch("/claims/date");
  const claims = await resp.json();
  const claimList = document.querySelector("#claims");
  claimList.innerHTML = "<h1>Their Claims</h1>";
  for (const claim of claims) {
    if (claim.customer_id == selectedCustomer) {
      const claimName = document.createElement("div");
      claimName.className = "claimName";
      claimName.textContent = `Accident Date: ${new Date(claim.accident_date).toString("dd-MMM-yyyy")}`;
      claimList.appendChild(claimName);
      claimName.addEventListener("click", function () {
        selectedClaim = claim.id;
        console.log(selectedClaim)
        document.querySelector("#details").innerHTML = "";
        loadClaimDetail();
        claimList.querySelectorAll("div").forEach((element) => {
          element.style.color = "white";
        });
        this.style.color = "black";
      });
    }
  }
}

async function loadClaimDetail() {
  const resp = await fetch("/claims/their");
  const details = await resp.json();
  const claimDetail = document.querySelector("#details");
  claimDetail.innerHTML = "<h1>Claim Detail</h1>";
  console.log(details)
  for (const detail of details) {
    for (const claim of detail.claims){
    if (claim.id == selectedClaim){
        const detailBrand = document.createElement("div")
        detailBrand.className = "brand"
        detailBrand.textContent = "Brand: " + claim.brand
        const detailModel = document.createElement("div")
        detailModel.className = "model"
        detailModel.textContent = "Model: " + claim.model
        const detailAge = document.createElement("div")
        detailAge.className = "age"
        detailAge.textContent = "Age: " + claim.age
        const detailCc = document.createElement("div")
        detailCc.className = "cc"
        detailCc.textContent = "CC: " + claim.cc
        const detailHand = document.createElement("div")
        detailHand.className = "hand"
        detailHand.textContent = "Hand: " + claim.hand
        const detailDes = document.createElement("div")
        detailDes.className = "des"
        detailDes.textContent = "Description: " + claim.descriptions
        const detailDate = document.createElement("div")
        detailDate.className = "des"
        detailDate.textContent = "Accident Date: " + new Date(claim.accident_date).toString("dd-MMM-yyyy")
        const detailPart = document.createElement("div")
        detailPart.className = "des"
        detailPart.textContent = "Damaged Part: " + claim.part
        const detailDamage = document.createElement("div")
        detailDamage.className = "des"
        detailDamage.textContent = "Damage Level: " + claim.damage
        claimDetail.appendChild(detailBrand)
        claimDetail.appendChild(detailModel)
        claimDetail.appendChild(detailAge)
        claimDetail.appendChild(detailCc)
        claimDetail.appendChild(detailHand)
        claimDetail.appendChild(detailDes)
        claimDetail.appendChild(detailDate)
        claimDetail.appendChild(detailPart)
        claimDetail.appendChild(detailDamage)
    }
  }
}}
