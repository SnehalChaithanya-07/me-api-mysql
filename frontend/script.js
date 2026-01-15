const BASE_URL = "https://me-api-mysql.onrender.com";

function loadProfile() {
  fetch(`${BASE_URL}/profile`)
    .then(res => res.json())
    .then(data => {
      document.getElementById("profile").innerHTML = `
        <p><b>Name:</b> ${data.name}</p>
        <p><b>Email:</b> ${data.email}</p>
        <p><b>Education:</b> ${data.education}</p>
        <p><b>Work:</b> ${data.work}</p>
        <p><b>Skills:</b> ${data.skills}</p>
        <p><b>GitHub:</b> <a href="${data.github}" target="_blank">${data.github}</a></p>
        <p><b>LinkedIn:</b> <a href="${data.linkedin}" target="_blank">${data.linkedin}</a></p>
      `;
    })
    .catch(err => {
      document.getElementById("profile").innerText = "Error loading profile";
      console.error(err);
    });
}

function searchSkill() {
  const skill = document.getElementById("skillInput").value;

  fetch(`${BASE_URL}/profile/search?skill=${skill}`)
    .then(res => res.json())
    .then(data => {
      document.getElementById("searchResult").textContent =
        JSON.stringify(data, null, 2);
    })
    .catch(err => console.error(err));
}
