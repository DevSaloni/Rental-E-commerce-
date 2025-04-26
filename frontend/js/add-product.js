document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector('form');
  
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const formData = new FormData(form);
  
      try {
        const response = await fetch('http://localhost:2007/api/products/add', {
          method: 'POST',
          body: formData
        });
  
        const contentType = response.headers.get("content-type");
  
        if (contentType && contentType.includes("application/json")) {
          const result = await response.json();
  
          if (response.ok) {
            alert(result.message);
            form.reset();
          } else {
            alert(result.error || "Something went wrong");
          }
        } else {
          const text = await response.text();
          console.error("Unexpected response:", text);
          alert("Unexpected server response. Check console for details.");
        }
  
      } catch (err) {
        console.error("Error submitting product:", err);
        alert("Submission failed. Try again.");
      }
    });
  });
  