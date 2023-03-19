window.onload = () => {
    loadClaimList();
};

async function loadClaimList() {
  const resp = await fetch("/claims");
  const myClaims = await resp.json();
  console.log(myClaims);  

  let newMyClaimsHtmlStr = ``;
  let count = 0;
  for (const claim of myClaims) {
        count ++
        const accidentDate = `<div class="dates_div"><span>${count}. </span><div class="my_claims_list" data-mid="claims-${claim.claim_id}">${new Date(claim.accident_date).toString("dd-MMM-yyyy")}</div></div>`;
        newMyClaimsHtmlStr += `${accidentDate}`;
  }
  document.querySelector("#my_claims").innerHTML = newMyClaimsHtmlStr;


  document.querySelectorAll(".my_claims_list").forEach((ele) =>
    ele.addEventListener("click", async (e) => {
        const row = e.target;
        const rowId = row.dataset.mid;
        const id = rowId.split("-")[1];
        console.log(id);

        let claimDetailsHtmlStr = ``;
        for (const claim of myClaims) {
            // const accidentDate = claim.claims.accident_date;
            const claimId = claim.claim_id;
            const claimDetails =
            claimId == id ? `<div class="details-box">
            <span>Accident Date: ${new Date(claim.accident_date).toString("dd-MMM-yyyy")}</span>
            <br>
            <span>Descriptions: ${claim.descriptions}</span>
            <br>
            <span>Car Brand: ${claim.brand}</span>
            <br>
            <span>Car Model: ${claim.model}</span>
            <br>
            <span>Car Age: ${claim.age}</span>
            <br>
            <span>Car CC: ${claim.cc}</span>
            <br>
            <span>Number of Hands: ${claim.hand}</span>
            </div>` : "";
            claimDetailsHtmlStr += `${claimDetails}`;
        }
      document.querySelector("#my_claims_details").innerHTML = claimDetailsHtmlStr;   
    }
  ));
};