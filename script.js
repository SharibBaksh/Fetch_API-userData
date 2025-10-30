const fetchBtn = document.getElementById("fetchBtn");
const reloadBtn = document.getElementById("reloadBtn");
const userContainer = document.getElementById("userContainer");
const status = document.getElementById("status");

fetchBtn.addEventListener("click", fetchUsers);
reloadBtn.addEventListener("click", () => location.reload());

async function fetchUsers() {
  status.textContent = "Fetching data...";
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!response.ok) throw new Error("Network response error");

    const users = await response.json();
    status.textContent = "✅ Data loaded successfully!";

    userContainer.innerHTML = "";
    users.forEach(user => {
      const card = document.createElement("div");
      card.className = "userCard";
      card.innerHTML = `
        <h3>${user.name}</h3>
        <p><b>Email:</b> ${user.email}</p>
        <p><b>Address:</b> ${user.address.street}, ${user.address.city}</p>
      `;
      userContainer.appendChild(card);
    });

  } catch (error) {
    status.textContent = "❌ Failed to fetch data!";
    userContainer.innerHTML = "<p style='color:red;'>Check your internet connection</p>";
    console.error(error);
  }
}
