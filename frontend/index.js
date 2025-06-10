// --- CONFIGURAÇÃO ---
const SUPABASE_URL = "https://mvghzbgsoyiejbreykql.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im12Z2h6Ymdzb3lpZWpicmV5a3FsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk1NTk2MzQsImV4cCI6MjA2NTEzNTYzNH0.VUvr_1_JZR1hM2l88l46UtcXyFNDe0Y-zCFUWo2jS88";

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const registerForm = document.getElementById("register-form");
const loginForm = document.getElementById("login-form");
const getProfileBtn = document.getElementById("get-profile-btn");
const listUsersBtn = document.getElementById("list-users-btn");
const logoutBtn = document.getElementById("logout-btn");
const resultsDiv = document.getElementById("results");

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const { data, error } = await supabase.auth.signUp({
    email: document.getElementById("register-email").value,
    password: document.getElementById("register-password").value,
    options: {
      data: {
        name: document.getElementById("register-name").value,
        role: document.getElementById("register-role").value,
      },
    },
  });
  showResult(
    error || {
      message: "Cadastro solicitado! Verifique seu e-mail para confirmação.",
      data,
    },
    !error
  );
});

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const { data, error } = await supabase.auth.signInWithPassword({
    email: document.getElementById("login-email").value,
    password: document.getElementById("login-password").value,
  });
  showResult(error || data, !error);
  if (!error) updateUI();
});

getProfileBtn.addEventListener("click", async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    showResult({ message: "Você não está logado." }, false);
    return;
  }

  const { data, error } = await supabase
    .from("profiles")
    .select()
    .eq("id", user.id)
    .single();
  showResult(error || data, !error);
});

listUsersBtn.addEventListener("click", async () => {
  const { data, error } = await supabase.from("profiles").select("*");
  showResult(error || data, !error);
});

logoutBtn.addEventListener("click", async () => {
  const { error } = await supabase.auth.signOut();
  showResult(error || { message: "Desconectado com sucesso." }, !error);
  updateUI();
});

function showResult(data, isSuccess) {
  resultsDiv.innerHTML = JSON.stringify(data, null, 2);
  resultsDiv.className = isSuccess ? "success" : "error";
}

async function updateUI() {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const publicArea = document.getElementById("public-area");
  const protectedArea = document.getElementById("protected-area");
  const adminArea = document.getElementById("admin-area");
  const welcomeMessage = document.getElementById("welcome-message");

  if (session) {
    publicArea.style.display = "none";
    protectedArea.style.display = "block";
    welcomeMessage.textContent = `Bem-vindo, ${session.user.email}!`;

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", session.user.id)
      .single();
    if (profile && profile.role === "ADMIN") {
      adminArea.style.display = "block";
    } else {
      adminArea.style.display = "none";
    }
  } else {
    publicArea.style.display = "block";
    protectedArea.style.display = "none";
  }
}

updateUI();
supabase.auth.onAuthStateChange(updateUI);
