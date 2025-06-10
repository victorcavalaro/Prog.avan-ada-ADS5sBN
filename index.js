const API_BASE_URL = "http://localhost:3001/api";

const registerForm = document.getElementById("register-form");
const loginForm = document.getElementById("login-form");
const getProfileBtn = document.getElementById("get-profile-btn");
const listUsersBtn = document.getElementById("list-users-btn");
const logoutBtn = document.getElementById("logout-btn");

const publicArea = document.getElementById("public-area");
const protectedArea = document.getElementById("protected-area");
const adminArea = document.getElementById("admin-area");
const welcomeMessage = document.getElementById("welcome-message");
const resultsDiv = document.getElementById("results");

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const body = {
    name: document.getElementById("register-name").value,
    email: document.getElementById("register-email").value,
    password: document.getElementById("register-password").value,
    role: document.getElementById("register-role").value,
  };
  try {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    showResult(data, response.ok);
  } catch (error) {
    showResult({ message: "Erro de conexão", error: error.message }, false);
  }
});

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const body = {
    email: document.getElementById("login-email").value,
    password: document.getElementById("login-password").value,
  };
  try {
    const response = await fetch(`${API_BASE_URL}/auth/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    if (response.ok && data.token) {
      localStorage.setItem("authToken", data.token); // Armazena o token
      showResult({ message: "Login bem-sucedido!", token: data.token }, true);
      updateUI();
    } else {
      showResult(data, false);
    }
  } catch (error) {
    showResult({ message: "Erro de conexão", error: error.message }, false);
  }
});

getProfileBtn.addEventListener("click", async () => {
  const token = localStorage.getItem("authToken");

  const endpoint = `${API_BASE_URL}/users/me`;

  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    showResult(data, response.ok);
  } catch (error) {
    showResult({ message: "Erro de conexão", error: error.message }, false);
  }
});

listUsersBtn.addEventListener("click", async () => {
  const token = localStorage.getItem("authToken");
  const endpoint = `${API_BASE_URL}/admin/users`;

  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    showResult(data, response.ok);
  } catch (error) {
    showResult({ message: "Erro de conexão", error: error.message }, false);
  }
});

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("authToken");
  showResult({ message: "Você foi desconectado." }, true);
  updateUI();
});

function showResult(data, isSuccess) {
  resultsDiv.innerHTML = JSON.stringify(data, null, 2);
  resultsDiv.className = isSuccess ? "success" : "error";
}

function decodeToken(token) {
  try {
    const payloadBase64 = token.split(".")[1];
    const decodedPayload = atob(payloadBase64);
    return JSON.parse(decodedPayload);
  } catch (e) {
    return null;
  }
}

function updateUI() {
  const token = localStorage.getItem("authToken");
  if (token) {
    const decoded = decodeToken(token);
    publicArea.style.display = "none";
    protectedArea.style.display = "block";
    welcomeMessage.textContent = `Bem-vindo! (Token armazenado)`;

    if (
      decoded &&
      (decoded.role === "ADMIN" || decoded.user?.role === "ADMIN")
    ) {
      adminArea.style.display = "block";
    } else {
      adminArea.style.display = "none";
    }
  } else {
    publicArea.style.display = "block";
    protectedArea.style.display = "none";
    adminArea.style.display = "none";
  }
}

document.addEventListener("DOMContentLoaded", updateUI);
