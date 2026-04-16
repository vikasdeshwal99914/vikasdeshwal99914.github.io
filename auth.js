async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

const USERS = {
  admin: {
    // Note: Ensure your hash length is exactly 64 chars for SHA-256
    passwordHash: "5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5",
    role: "admin",
    targetPage: "dashboard.html" // Page for Admin
  },
  yash: {
    passwordHash: "6415c98cd244747a5fb5b22676bfcc9c21f76e8fd8a25e4bc1278bdc192b3e88",
    role: "user",
    targetPage: "yash.html"      // Specific page for Yash
  },
  sachin: {
    passwordHash: "6415c98cd244747a5fb5b22676bfcc9c21f76e8fd8a25e4bc1278bdc192b3e88",
    role: "user",
    targetPage: "sachin.html"      // Specific page for sachin
  },

  vikas: {
    passwordHash: "857c43043be3dad3225f51e5f2ae0d99e8e663569c13e36f18c1b0898592e06d",
    role: "user",
    targetPage: "vikas.html"      // Specific page for vikas
  },

   ram: {
    passwordHash: "5b1d5dd29b0045e8d8293415b1bd94c3a4b56dfd132a4c50631713f8b686a823",
    role: "user",
    targetPage: "ram.html"      // Specific page for ram
  },

};

async function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;
  const error = document.getElementById("error");

  error.innerText = "";

  const user = USERS[username];

  if (!user) {
    error.innerText = "Invalid username or password";
    return;
  }

  const inputHash = await hashPassword(password);

  if (inputHash === user.passwordHash) {
    // Save info to session
    sessionStorage.setItem("userRole", user.role);
    sessionStorage.setItem("username", username);

    // Redirect to the specific page assigned to this user
    window.location.href = user.targetPage;
  } else {
    error.innerText = "Invalid username or password";
  }
}

function logout() {
  sessionStorage.clear();
  window.location.href = "index.html";
}