// Function to logout the user
const logout = async () => {
  try {
    const response = await fetch("/api/users/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert(response.statusText);
    }
  } catch (error) {
    console.error(error);
    alert("An error occurred during logout.");
  }
};

// Event Listener for the logout button
document.querySelector("logout")?.addEventListener("click", logout);
