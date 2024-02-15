// CONSTANTS

const BASE_URL =
  "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2401-FTB-ET-WEB-FT";

// STATE

// const state = {
//   parties: []
// }

let parties = [{}, {}, {}];

// RENDER

const form = document.getElementById("addParties");
form.addEventListener("submit", addParty);

async function render() {
  parties = await getParties();

  const partiesUl = document.getElementById("parties");
  const partyLis = parties.map((party) => {
    const date = new Date(Date.parse(party.date));
    console.log("date.toString()", date);

    const partyLi = document.createElement("li");
    partyLi.innerHTML = `
      <h2>${party.name}<h2>
      <h3>Time: ${date}<h3>
      <h3>Location: ${party.location}<h3>
      <p>${party.description}<p>
    `;
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.addEventListener("click", () => deleteParty(party.id));
    partyLi.appendChild(deleteButton);

    return partyLi;
  });
  partiesUl.replaceChildren(...partyLis);
}
render();

// FETCH

async function getParties() {
  try {
    const response = await fetch(BASE_URL + "/events");
    const json = await response.json();
    return json.data;
  } catch (err) {
    console.error(err);
  }
}

async function deleteParty(partyId) {
  try {
    await fetch(BASE_URL + "/events/" + partyId, {
      method: "DELETE",
    });
  } catch (err) {
    console.error(err);
  }
}

async function addParty(event) {
  event.prevenetDefault();
  const name = form.name.value;
  const date = new Date(form.date.value).toISOString;
  const location = form.location.value;
  const description = from.description.value;

  try {
    await fetch(BASE_URL + "/events", {
      method: "POST",
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: name,
        description: description,
        date: date,
        location: location,
      }),
    });

    render()

  } catch (err) {
    console.error(err);
  }
}