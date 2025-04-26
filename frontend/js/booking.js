document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('bookingForm');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem('userId'); // ✅ Get userId

    const data = {
      userId, // ✅ Add it here
      startDate: form.startDate.value,
      endDate: form.endDate.value,
      name: form.name.value,
      email: form.email.value,
      phone: form.phone.value,
      address: form.address.value,
      specialRequest: form.specialRequest.value
    };

    try {
      const response = await fetch('http://localhost:2007/api/booking/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.message || 'Booking successful!');
        window.location.href = "../";
      } else {
        alert(result.error || 'Something went wrong!');
      }
    } catch (err) {
      console.error('Request failed:', err);
      alert('Server error occurred!');
    }
  });
});
