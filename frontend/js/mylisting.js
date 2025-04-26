document.addEventListener('DOMContentLoaded', async () => {
  const bookingList = document.getElementById('bookingList');

  try {
    const response = await fetch('http://localhost:2007/api/booking/bookings');
    const bookings = await response.json();

    if (!Array.isArray(bookings)) {
      throw new Error('Invalid bookings data');
    }

    if (bookings.length === 0) {
      bookingList.innerHTML = '<p>No bookings found.</p>';
      return;
    }

    bookings.forEach((booking) => {
      const div = document.createElement('div');
      div.classList.add('booking-card');
      div.innerHTML = `
        <h3>${booking.name}</h3>
        <p><strong>Email:</strong> ${booking.email}</p>
        <p><strong>Phone:</strong> ${booking.phone}</p>
        <p><strong>Address:</strong> ${booking.address}</p>
        <p><strong>From:</strong> ${new Date(booking.startDate).toLocaleDateString()}</p>
        <p><strong>To:</strong> ${new Date(booking.endDate).toLocaleDateString()}</p>
        <p><strong>Special Request:</strong> ${booking.specialRequest || "None"}</p>
        <hr />
      `;
      bookingList.appendChild(div);
    });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    bookingList.innerHTML = '<p>Failed to load bookings.</p>';
  }
});
