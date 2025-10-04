const salons = [
  { name: "Style Hub", price: "₹250", rating: "4.5★" },
  { name: "Urban Clippers", price: "₹300", rating: "4.7★" },
  { name: "Elite Salon", price: "₹400", rating: "4.9★" },
  { name: "Barber King", price: "₹200", rating: "4.3★" },
  { name: "Look Smart", price: "₹350", rating: "4.6★" },
];

const salonList = document.getElementById("salonList");
const popupBg = document.getElementById("popupBg");
const saveProfile = document.getElementById("saveProfile");
const themeToggle = document.getElementById("themeToggle");
const bookingPopup = document.getElementById("bookingPopup");
const confirmBooking = document.getElementById("confirmBooking");
const closeBooking = document.getElementById("closeBooking");
const mapFrame = document.getElementById("mapFrame");
const locationSelect = document.getElementById("locationSelect");
const detectLocation = document.getElementById("detectLocation");
const bookSound = document.getElementById("bookSound");

// Load Map
function updateMap(city) {
  mapFrame.src = `https://www.google.com/maps?q=${city},India&output=embed`;
}
locationSelect.addEventListener("change", e => updateMap(e.target.value));
updateMap("Delhi");

// Detect GPS Location
detectLocation.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      pos => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        mapFrame.src = `https://www.google.com/maps?q=${lat},${lon}&output=embed`;
      },
      () => alert("Unable to access location 😢")
    );
  } else {
    alert("Geolocation not supported in this browser");
  }
});

// Load salons
function displaySalons() {
  salonList.innerHTML = "";
  salons.forEach((s, i) => {
    const div = document.createElement("div");
    div.className = "salon-card";
    div.innerHTML = `
      <h3>${s.name}</h3>
      <p>Price: ${s.price}</p>
      <p>Rating: ${s.rating}</p>
      <button onclick="openBooking(${i})">Book Now</button>
    `;
    salonList.appendChild(div);
  });
}
displaySalons();

// Profile popup logic
if (!localStorage.getItem("userProfile")) {
  popupBg.style.display = "flex";
}

saveProfile.addEventListener("click", () => {
  const name = document.getElementById("name").value;
  const gender = document.getElementById("gender").value;
  const age = document.getElementById("age").value;

  if (name && gender && age) {
    localStorage.setItem("userProfile", JSON.stringify({ name, gender, age }));
    popupBg.style.display = "none";
  } else {
    alert("Please fill all fields!");
  }
});

// Dark mode toggle
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeToggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});

// Booking popup
function openBooking(i) {
  bookingPopup.style.display = "flex";
}

closeBooking.addEventListener("click", () => bookingPopup.style.display = "none");

confirmBooking.addEventListener("click", () => {
  bookSound.play();
  alert("✅ Booking confirmed!");
  bookingPopup.style.display = "none";
});
