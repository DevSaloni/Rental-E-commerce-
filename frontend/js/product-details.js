document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    const container = document.getElementById("details");
  
    try {
      const res = await fetch(`http://localhost:2007/api/products/${id}`);
      const product = await res.json();
  
      container.innerHTML = `
        <img src="http://localhost:2007/uploads/${product.product_image}" alt="${product.product_name}">
        <h2>${product.product_name}</h2>
        <p><strong>Category:</strong> ${product.category}</p>
        <p><strong>Price per Day:</strong> $${product.price}</p>
        <p><strong>Description:</strong> ${product.description}</p>
        <p><strong>Owner:</strong> ${product.owner_name}</p>
        <p><strong>Email:</strong> ${product.contact_email}</p>
        <p><strong>Location:</strong> ${product.location}</p>
      `;
    } catch (err) {
      console.error("Error loading product details:", err);
    }
  });
  