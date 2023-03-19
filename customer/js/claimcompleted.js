window.onload = () => {
    getClaimId();
    loadAgentName();
};

async function getClaimId() {
    const resp = await fetch("/claims/");
    const myClaims = await resp.json();
    // console.log(myClaims[0]);  
    document.querySelector("#claim_id_span").innerHTML = `${myClaims[0].claim_id}`;
 }

async function loadAgentName() {
    const resp = await fetch("/claims/processcomplete");
    const agent_name_object = await resp.json();
    const agent_name = agent_name_object[0].name;
    document.querySelector("#agent_name").innerHTML = agent_name;
};