document.getElementById("registerForm").addEventListener("submit", async function (e) {
    e.preventDefault();
  
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;
  
    try {
      const res = await fetch("http://localhost:2007/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password, phone, address })
      });
  
      const data = await res.json();
      console.log(data);
  
      if (res.ok) {
        alert("Registration successful!");
        window.location.href = "login.html";
      } else {
        alert(data.message || "Registration failed!");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong!");
    }
  });
  