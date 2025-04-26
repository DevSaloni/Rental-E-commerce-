document.addEventListener("DOMContentLoaded", () => {
    const searchBtn = document.getElementById("search-btn");
    const priceFilter = document.getElementById("price-filter");
    const searchContainer = document.querySelector(".hero .products-container");
    const categoryTabs = document.querySelectorAll(".tab");
    const categoryContainer = document.querySelector(".recommended-products .products-container");

    let selectedCategory = "jewelry"; // Default category

    // Fetch all products from backend
    async function fetchAllProducts() {
        try {
            const res = await fetch("http://localhost:2007/api/products/all");
            const data = await res.json();
            return data;
        } catch (err) {
            console.error("Failed to fetch products:", err);
            return [];
        }
    }

    // Filter products by category and price
    function filterProducts(products, category, priceRange) {
        let filtered = products;

        if (category) {
            filtered = filtered.filter(p => p.category.toLowerCase() === category.toLowerCase());
        }

        if (priceRange && priceRange !== "all") {
            const [min, maxStr] = priceRange.split("-");
            const minPrice = parseInt(min);
            const maxPrice = maxStr ? parseInt(maxStr) : Infinity;

            filtered = filtered.filter(p => p.price >= minPrice && p.price <= maxPrice);
        }

        return filtered;
    }

    // Render product cards
    function renderProducts(products, container) {
        container.innerHTML = "";
        if (products.length === 0) {
            container.innerHTML = "<p>No products found.</p>";
            return;
        }

        products.forEach(p => {
            const html = `
                <div class="product-card">
                    <img src="http://localhost:2007/uploads/${p.product_image}" alt="${p.product_name}">
                    <h3>${p.product_name}</h3>
                    <p class="price">$${p.price}/day</p>
                    <button class="view-more-btn" data-id="${p._id}">View More</button>
                </div>
            `;
            container.innerHTML += html;
        });

        document.querySelectorAll('.view-more-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.dataset.id;
                window.location.href = `/pages/product-details.html?id=${id}`;
            });
        });
    }

    // Load products for a specific category
    async function loadCategoryProducts(category) {
        const allProducts = await fetchAllProducts();
        const filtered = filterProducts(allProducts, category);
        renderProducts(filtered, categoryContainer);
    }

    // Search button handler
    searchBtn.addEventListener("click", async () => {
        const allProducts = await fetchAllProducts();
        const filtered = filterProducts(allProducts, selectedCategory, priceFilter.value);
        renderProducts(filtered, searchContainer);
    });

    // Category tab switching
    categoryTabs.forEach(tab => {
        tab.addEventListener("click", async () => {
            categoryTabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");
            selectedCategory = tab.dataset.category;
            loadCategoryProducts(selectedCategory);
        });
    });

    // Initial render for default category
    loadCategoryProducts(selectedCategory);
});
