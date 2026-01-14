const BASE_URL = "http://localhost:3000";

 
function loadProfile() {
  fetch("http://localhost:3000/profile")
    .then(res => res.json())
    .then(data => {
      document.getElementById("profile").innerHTML = `
Name: ${data.name}
Email: ${data.email}
Education: ${data.education}
Work: ${data.work}
Skills: ${data.skills}

GitHub: <a href="${data.github}" target="_blank">${data.github}</a>
LinkedIn: <a href="${data.linkedin}" target="_blank">${data.linkedin}</a>
      `;
    });
}


 
function searchSkill() {
  const skill = document.getElementById("skillInput").value;

  fetch(`${BASE_URL}/profile/search?skill=${skill}`)
    .then(res => res.json())
    .then(data => {
      document.getElementById("searchResult").textContent =
        JSON.stringify(data, null, 2);
    });
}
