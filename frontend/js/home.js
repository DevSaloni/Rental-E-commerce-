document.addEventListener("DOMContentLoaded", async () => {
    const container = document.getElementById("product-list");
  
    try {
      const res = await fetch("http://localhost:2007/api/products/all");
      const products = await res.json();
     
      const backendURL = "http://localhost:2007";

      products.forEach(product => {
        const card = document.createElement("div");
        card.classList.add("product-card");
  
        card.innerHTML = `
          <img src="${backendURL}/uploads/${product.product_image}" alt="${product.product_name}" />
        <h3>${product.product_name}</h3>
        <p>${product.description}</p>
        <p class="price">$${product.price}/day</p>
          <button class="view-more" data-id="${product._id}">View More</button>
        `;
  
        container.appendChild(card);
      });
  
      // Event Delegation for View More
      container.addEventListener("click", (e) => {
        if (e.target.classList.contains("view-more")) {
          const id = e.target.getAttribute("data-id");
          window.location.href = `pages/product-details.html?id=${id}`;
        }
      });
    } catch (err) {
      console.error("Failed to load products:", err);
    }
  });
  