import { useState, useEffect, useRef } from "react";
import "./App.css";

const HYDERABAD_HUBS = {
  "Madhapur": { lat: 17.4483, lng: 78.3915 },
  "Hitech City": { lat: 17.4435, lng: 78.3772 },
  "Gachibowli": { lat: 17.4401, lng: 78.3489 },
  "Kondapur": { lat: 17.4699, lng: 78.3578 },
  "Jubilee Hills": { lat: 17.4319, lng: 78.4073 },
  "Banjara Hills": { lat: 17.4156, lng: 78.4350 },
  "Begumpet": { lat: 17.4448, lng: 78.4664 },
  "Secunderabad": { lat: 17.4399, lng: 78.4983 },
  "Kukatpally": { lat: 17.4933, lng: 78.3914 },
  "Mehdipatnam": { lat: 17.3916, lng: 78.4416 },
  "Charminar": { lat: 17.3616, lng: 78.4747 }
};

const initialNgos = [
  {
    name: "Feeding Hands Foundation",
    type: "Community Food Relief",
    location: "Gachibowli",
    lat: 17.4401,
    lng: 78.3489,
    capacity: 250,
    status: "Available",
    icon: "🤝",
    rating: "4.9 ★",
    dietPref: "All Food Types",
  },
  {
    name: "Annam Sewa Trust",
    type: "Community Kitchen",
    location: "Madhapur",
    lat: 17.4483,
    lng: 78.3915,
    capacity: 180,
    status: "Available",
    icon: "🍲",
    rating: "4.8 ★",
    dietPref: "Vegetarian Only",
  },
  {
    name: "HopeServe Foundation",
    type: "Child Nutrition",
    location: "Kondapur",
    lat: 17.4699,
    lng: 78.3578,
    capacity: 150,
    status: "Available",
    icon: "❤️",
    rating: "4.7 ★",
    dietPref: "Nutritional Meals",
  },
  {
    name: "CareBridge Foundation",
    type: "Homeless Support",
    location: "Hitech City",
    lat: 17.4435,
    lng: 78.3772,
    capacity: 220,
    status: "Available",
    icon: "🏠",
    rating: "5.0 ★",
    dietPref: "Bulk Catering",
  },
  {
    name: "Udaya Community Kitchen",
    type: "Community Meals",
    location: "Kukatpally",
    lat: 17.4933,
    lng: 78.3914,
    capacity: 300,
    status: "High Capacity",
    icon: "🍛",
    rating: "4.9 ★",
    dietPref: "All Food Types",
  },
  {
    name: "Nourish Together",
    type: "Food Redistribution",
    location: "Jubilee Hills",
    lat: 17.4319,
    lng: 78.4073,
    capacity: 120,
    status: "Available",
    icon: "🌱",
    rating: "4.8 ★",
    dietPref: "Hot Pack Meals",
  },
  {
    name: "City Food Relief",
    type: "Emergency Food Support",
    location: "Begumpet",
    lat: 17.4448,
    lng: 78.4664,
    capacity: 200,
    status: "Available",
    icon: "🥗",
    rating: "4.8 ★",
    dietPref: "All Food Types",
  },
  {
    name: "Helping Hearts Collective",
    type: "Senior Citizen Support",
    location: "Secunderabad",
    lat: 17.4399,
    lng: 78.4983,
    capacity: 100,
    status: "Limited",
    icon: "💚",
    rating: "4.7 ★",
    dietPref: "Soft & Fresh Food",
  },
];

const availableRestaurantSurplus = [
  {
    id: "RES-101",
    restaurant: "Pademkodi Kitchens",
    location: "Madhapur",
    food: "Paneer Biryani",
    category: "Veg",
    availablePlates: 38,
    distanceKm: 2.1,
    timeRemaining: "3h 15m",
  },
  {
    id: "RES-102",
    restaurant: "Aroma Grand Hotel",
    location: "Hitech City",
    food: "Butter Chicken & Naan",
    category: "Non-Veg",
    availablePlates: 35,
    distanceKm: 3.4,
    timeRemaining: "2h 45m",
  },
  {
    id: "RES-103",
    restaurant: "Green Bowl Organic",
    location: "Kondapur",
    food: "Dal Tadka & Steamed Rice",
    category: "Veg",
    availablePlates: 30,
    distanceKm: 4.8,
    timeRemaining: "3h 40m",
  },
  {
    id: "RES-104",
    restaurant: "Spice Symphony",
    location: "Banjara Hills",
    food: "Veg Pulao & Curry",
    category: "Veg",
    availablePlates: 45,
    distanceKm: 6.2,
    timeRemaining: "3h 00m",
  },
  {
    id: "RES-105",
    restaurant: "Royal Hyderabad Dine",
    location: "Mehdipatnam",
    food: "Chicken Biryani",
    category: "Non-Veg",
    availablePlates: 80,
    distanceKm: 7.5,
    timeRemaining: "2h 10m",
  },
];

const initialDonations = [
  {
    id: "ORD-901",
    restaurant: "Pademkodi Kitchens",
    restaurantLoc: "Madhapur",
    food: "Paneer Biryani",
    category: "Veg",
    quantity: 35,
    ngo: "Annam Sewa Trust",
    location: "Madhapur",
    ngoLat: 17.4483,
    ngoLng: 78.3915,
    restLat: 17.4512,
    restLng: 78.3845,
    otp: "4829",
    status: "Out for Delivery",
  },
  {
    id: "ORD-902",
    restaurant: "Aroma Grand Hotel",
    restaurantLoc: "Hitech City",
    food: "Butter Chicken",
    category: "Non-Veg",
    quantity: 25,
    ngo: "Feeding Hands Foundation",
    location: "Gachibowli",
    ngoLat: 17.4401,
    ngoLng: 78.3489,
    restLat: 17.4435,
    restLng: 78.3772,
    otp: "1190",
    status: "Ready",
  },
  {
    id: "ORD-903",
    restaurant: "Spice Garden",
    restaurantLoc: "Kondapur",
    food: "Paneer Curry",
    category: "Veg",
    quantity: 12,
    ngo: "HopeServe Foundation",
    location: "Kondapur",
    ngoLat: 17.4699,
    ngoLng: 78.3578,
    restLat: 17.4699,
    restLng: 78.3578,
    otp: "3312",
    status: "Completed",
  },
];

const initialPredictions = [
  {
    restaurant: "Pademkodi Kitchens",
    food: "Paneer Biryani",
    location: "Madhapur",
    category: "Veg",
    surplus: 35,
  },
  {
    restaurant: "Aroma Grand Hotel",
    food: "Butter Chicken",
    location: "Hitech City",
    category: "Non-Veg",
    surplus: 25,
  },
  {
    restaurant: "Spice Garden",
    food: "Paneer Curry",
    location: "Kondapur",
    category: "Veg",
    surplus: 12,
  },
];

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Number((R * c).toFixed(1));
}

/* ================= LIVE GPS MAP MODAL ================= */
function DeliveryMapModal({ order, onClose }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const riderMarkerRef = useRef(null);
  const animationFrameRef = useRef(null);
  const [liveEta, setLiveEta] = useState(12);

  useEffect(() => {
    const leafletCss = document.getElementById("leaflet-css");
    if (!leafletCss) {
      const link = document.createElement("link");
      link.id = "leaflet-css";
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }

    const initMap = () => {
      if (!window.L || !mapContainerRef.current) return;
      if (mapInstanceRef.current) return;

      const rLat = order.restLat || 17.4483;
      const rLng = order.restLng || 78.3915;
      const nLat = order.ngoLat || 17.4401;
      const nLng = order.ngoLng || 78.3489;

      const map = window.L.map(mapContainerRef.current).setView([rLat, rLng], 13);
      mapInstanceRef.current = map;

      window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(map);

      const restIcon = window.L.divIcon({
        className: "custom-map-pin rest-pin",
        html: `<div>🏬</div>`,
        iconSize: [36, 36],
      });

      const ngoIcon = window.L.divIcon({
        className: "custom-map-pin ngo-pin",
        html: `<div>🤝</div>`,
        iconSize: [36, 36],
      });

      const driverIcon = window.L.divIcon({
        className: "custom-map-pin driver-pin live-moving-rider",
        html: `<div>🛵</div>`,
        iconSize: [34, 34],
      });

      window.L.marker([rLat, rLng], { icon: restIcon })
        .addTo(map)
        .bindPopup(`<b>Donor Kitchen:</b> ${order.restaurant}`);

      window.L.marker([nLat, nLng], { icon: ngoIcon })
        .addTo(map)
        .bindPopup(`<b>Recipient NGO:</b> ${order.ngo}`);

      const riderMarker = window.L.marker([rLat, rLng], { icon: driverIcon }).addTo(map);
      riderMarkerRef.current = riderMarker;

      const routeLine = window.L.polyline(
        [
          [rLat, rLng],
          [(rLat + nLat) / 2 + 0.002, (rLng + nLng) / 2 + 0.003],
          [nLat, nLng],
        ],
        { color: "#176b45", weight: 5, dashArray: "6, 8" }
      ).addTo(map);

      map.fitBounds(routeLine.getBounds(), { padding: [40, 40] });

      let progress = 0;
      const animateRider = () => {
        progress += 0.0015;
        if (progress > 1) progress = 0;

        const curLat = rLat + (nLat - rLat) * progress;
        const curLng = rLng + (nLng - rLng) * progress;

        riderMarker.setLatLng([curLat, curLng]);
        setLiveEta(Math.max(2, Math.round(12 * (1 - progress))));

        animationFrameRef.current = requestAnimationFrame(animateRider);
      };

      animateRider();
    };

    if (window.L) {
      initMap();
    } else {
      const script = document.createElement("script");
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      script.async = true;
      script.onload = initMap;
      document.body.appendChild(script);
    }

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [order]);

  return (
    <div className="map-modal-overlay">
      <div className="map-modal-card">
        <div className="map-modal-header">
          <div>
            <span className="live-pill">● LIVE GPS REDISTRIBUTION TRACKER</span>
            <h3>Order #{order.id}</h3>
            <p>{order.food} ({order.quantity} surplus plates) ➜ {order.ngo}</p>
          </div>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="traffic-intelligence-bar">
          <div>
            <span>🚦 Route Status: <strong>Direct Transit Active</strong></span>
            <small>Direct Haversine path to nearest shelter</small>
          </div>
          <div className="live-eta-countdown">
            <span>Carrier ETA</span>
            <strong>{liveEta} MINS</strong>
          </div>
        </div>

        <div className="map-box-frame" ref={mapContainerRef}></div>

        <div className="delivery-card-footer">
          <div className="driver-info">
            <div className="driver-avatar">🛵</div>
            <div>
              <strong>Designated EcoPlate Dispatcher</strong>
              <p>Direct Logistics Transit · Insulated Thermal Crate</p>
            </div>
          </div>
          <div className="driver-actions">
            <div className="otp-badge">
              <span>Pickup OTP</span>
              <strong>{order.otp || "4829"}</strong>
            </div>
            <button
              className="call-driver-btn"
              onClick={() => alert(`Calling automated courier dispatch center...`)}
            >
              📞 Call Carrier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= AUTH MODAL (DONOR & NGO ROLES) ================= */
function AuthModal({ onClose, onLoginSuccess }) {
  const [isRegister, setIsRegister] = useState(false);
  const [role, setRole] = useState("donor");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("Madhapur");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password || (isRegister && !name)) {
      alert("Please fill in email, password and details.");
      return;
    }

    const userData = {
      name: name || email.split("@")[0].toUpperCase(),
      email,
      role,
      location,
    };

    localStorage.setItem("ecoplate_user", JSON.stringify(userData));
    localStorage.setItem("ecoplate_logged_in", "true");
    onLoginSuccess(userData);
  };

  return (
    <div className="map-modal-overlay">
      <div className="login-card" style={{ position: "relative", margin: "auto", maxWidth: 440 }}>
        <button className="close-btn" style={{ position: "absolute", top: 15, right: 15 }} onClick={onClose}>✕</button>
        <div className="brand-logo" style={{ marginBottom: 12 }}>🌱</div>
        <h2>{isRegister ? "Register Account" : "Sign In to EcoPlate"}</h2>
        <p className="login-subtitle">
          {isRegister ? "Join as a Commercial Kitchen Donor or Verified NGO Shelter" : "Sign in to manage surplus donations and food requests"}[cite: 3, 4]
        </p>

        <div className="auth-tabs" style={{ display: "flex", gap: 8, marginBottom: 15 }}>
          <button
            type="button"
            className={`tab-btn ${!isRegister ? "active" : ""}`}
            style={{ flex: 1, padding: 8, borderRadius: 8, border: "1px solid var(--border-color)", background: !isRegister ? "var(--primary)" : "transparent", color: !isRegister ? "white" : "inherit", fontWeight: "bold" }}
            onClick={() => setIsRegister(false)}
          >
            Sign In
          </button>
          <button
            type="button"
            className={`tab-btn ${isRegister ? "active" : ""}`}
            style={{ flex: 1, padding: 8, borderRadius: 8, border: "1px solid var(--border-color)", background: isRegister ? "var(--primary)" : "transparent", color: isRegister ? "white" : "inherit", fontWeight: "bold" }}
            onClick={() => setIsRegister(true)}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {isRegister && (
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: "block", fontSize: 11, fontWeight: "bold", marginBottom: 6 }}>Select Account Role</label>
              <div style={{ display: "flex", gap: 10 }}>
                <button
                  type="button"
                  style={{ flex: 1, padding: "8px 10px", borderRadius: 8, border: "1px solid var(--border-color)", background: role === "donor" ? "#edf8f1" : "transparent", color: role === "donor" ? "#176b45" : "inherit", fontWeight: "bold" }}
                  onClick={() => setRole("donor")}
                >
                  🏬 Restaurant Donor
                </button>
                <button
                  type="button"
                  style={{ flex: 1, padding: "8px 10px", borderRadius: 8, border: "1px solid var(--border-color)", background: role === "ngo" ? "#edf8f1" : "transparent", color: role === "ngo" ? "#176b45" : "inherit", fontWeight: "bold" }}
                  onClick={() => setRole("ngo")}
                >
                  🤝 NGO Shelter
                </button>
              </div>
            </div>
          )}

          {isRegister && (
            <>
              <label>{role === "donor" ? "Restaurant / Kitchen Name" : "NGO Shelter Name"}</label>
              <div className="login-input" style={{ marginBottom: 12 }}>
                <span>🏢</span>
                <input
                  type="text"
                  placeholder={role === "donor" ? "e.g. Pademkodi Kitchens" : "e.g. Annam Sewa Trust"}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <label>Location Hub</label>
              <div className="login-input" style={{ marginBottom: 12 }}>
                <span>📍</span>
                <select value={location} onChange={(e) => setLocation(e.target.value)}>
                  {Object.keys(HYDERABAD_HUBS).map((hub) => (
                    <option key={hub} value={hub}>{hub}</option>
                  ))}
                </select>
              </div>
            </>
          )}

          <label>Email Address</label>
          <div className="login-input" style={{ marginBottom: 12 }}>
            <span>✉</span>
            <input
              type="email"
              placeholder="user@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <label>Password</label>
          <div className="login-input" style={{ marginBottom: 16 }}>
            <span>🔒</span>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="login-button" type="submit">
            {isRegister ? "Create Account & Unlock ➜" : "Sign In ➜"}
          </button>
        </form>

        <div className="or-divider"><span>OR</span></div>
        <button
          className="demo-login"
          onClick={() => {
            const demoUser = {
              name: "Pademkodi Kitchens",
              email: "manager@pademkodi.com",
              role: role,
              location: "Madhapur",
            };
            localStorage.setItem("ecoplate_user", JSON.stringify(demoUser));
            localStorage.setItem("ecoplate_logged_in", "true");
            onLoginSuccess(demoUser);
          }}
        >
          ⚡ Instant Demo Sign In
        </button>
      </div>
    </div>
  );
}

/* ================= ORDER CONFIRMATION TOAST BANNER ================= */
function OrderConfirmedToast({ data, onClose }) {
  if (!data) return null;
  return (
    <div className="order-confirmed-toast">
      <div className="toast-check-icon">✓</div>
      <div className="toast-content">
        <strong>🎉 Order Confirmed! (#{data.id})</strong>
        <p>
          Surplus batch of <strong>{data.quantity} plates of {data.food}</strong> matched to <strong>{data.ngo}</strong>.
          <br />
          <span style={{ color: "#a8ffd4", fontWeight: "bold" }}>
            📲 Dispatch alert sent to shelter coordinator. Pickup OTP: {data.otp}
          </span>
        </p>
      </div>
      <button className="toast-close-btn" onClick={onClose}>✕</button>
    </div>
  );
}

function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("ecoplate_user")) || null;
    } catch {
      return null;
    }
  });

  const [activePage, setActivePage] = useState("Dashboard");
  const [portalMode, setPortalMode] = useState("donor");
  const [theme, setTheme] = useState(localStorage.getItem("ecoplate_theme") || "light");

  // App Data
  const [ngos, setNgos] = useState(initialNgos);
  const [predictions, setPredictions] = useState(initialPredictions);
  const [donations, setDonations] = useState(initialDonations);

  // Form: Restaurant Surplus Inputs
  const [restaurant, setRestaurant] = useState("");
  const [food, setFood] = useState("");
  const [category, setCategory] = useState("Veg");
  const [location, setLocation] = useState("Madhapur");
  const [surplusQuantity, setSurplusQuantity] = useState("");

  const [matchedNgosList, setMatchedNgosList] = useState(null);
  const [loading, setLoading] = useState(false);

  // NGO Request Mode Inputs
  const [ngoTargetMeals, setNgoTargetMeals] = useState("35");
  const [ngoSelectedHub, setNgoSelectedHub] = useState("Madhapur");
  const [ngoDietPreference, setNgoDietPreference] = useState("All");

  // Settings State
  const [apiUrl, setApiUrl] = useState("http://127.0.0.1:5000/api/predict");
  const [autoAlerts, setAutoAlerts] = useState(true);

  // Modals & Notifications
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [activeTrackingOrder, setActiveTrackingOrder] = useState(null);
  const [confirmedOrderToast, setConfirmedOrderToast] = useState(null);

  useEffect(() => {
    if (currentUser && !restaurant && currentUser.role === "donor") {
      setRestaurant(currentUser.name || "Pademkodi Kitchens");
    }
  }, [currentUser, restaurant]);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("ecoplate_theme", nextTheme);
  };

  const logout = () => {
    localStorage.removeItem("ecoplate_logged_in");
    localStorage.removeItem("ecoplate_user");
    setCurrentUser(null);
    setRestaurant("");
    setFood("");
    setSurplusQuantity("");
    setMatchedNgosList(null);
  };

  const handleBoxClick = (e) => {
    if (!currentUser) {
      e.preventDefault();
      e.stopPropagation();
      setShowAuthModal(true);
    }
  };

  const handleQuickPlateSelect = (amount) => {
    setSurplusQuantity(String(amount));
  };

  const handleFindNgos = (e) => {
    e.preventDefault();

    if (!currentUser) {
      setShowAuthModal(true);
      return;
    }

    if (!restaurant || !food || !surplusQuantity) {
      alert("Please enter restaurant, food item, and excess surplus quantity.");
      return;
    }

    const qty = Number(surplusQuantity);
    if (qty <= 0) {
      alert("Please enter a surplus quantity greater than 0.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const donorCoords = HYDERABAD_HUBS[location] || { lat: 17.4483, lng: 78.3915 };

      const scored = ngos
        .map((ngo) => {
          const dist = calculateDistance(donorCoords.lat, donorCoords.lng, ngo.lat, ngo.lng);
          const hasCapacity = ngo.capacity >= qty;
          return {
            ...ngo,
            distanceKm: dist,
            hasCapacity,
            calculatedEta: Math.max(8, Math.round(dist * 3.5)),
          };
        })
        .sort((a, b) => {
          if (a.hasCapacity && !b.hasCapacity) return -1;
          if (!a.hasCapacity && b.hasCapacity) return 1;
          return a.distanceKm - b.distanceKm;
        });

      setMatchedNgosList(scored);

      setPredictions([
        {
          restaurant,
          food,
          category,
          location,
          surplus: qty,
        },
        ...predictions,
      ]);

      setLoading(false);
    }, 400);
  };

  const handleDispatchToNgo = (selectedNgo) => {
    const randomOrderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const randomOtp = `${Math.floor(1000 + Math.random() * 9000)}`;
    const rCoords = HYDERABAD_HUBS[location] || { lat: 17.4483, lng: 78.3915 };

    const newDonation = {
      id: randomOrderId,
      restaurant,
      restaurantLoc: location,
      food,
      category,
      quantity: Number(surplusQuantity),
      ngo: selectedNgo.name,
      location: selectedNgo.location,
      ngoLat: selectedNgo.lat,
      ngoLng: selectedNgo.lng,
      restLat: rCoords.lat,
      restLng: rCoords.lng,
      otp: randomOtp,
      status: "Out for Delivery",
    };

    setDonations([newDonation, ...donations]);
    setConfirmedOrderToast(newDonation);
    setActiveTrackingOrder(newDonation);
  };

  const getShortlistedRestaurantsForNgo = () => {
    const target = Number(ngoTargetMeals) || 35;
    return availableRestaurantSurplus
      .filter((res) => {
        if (ngoDietPreference === "All") return true;
        return res.category === ngoDietPreference;
      })
      .map((res) => {
        const diff = Math.abs(res.availablePlates - target);
        return { ...res, diff };
      })
      .sort((a, b) => a.diff - b.diff || a.distanceKm - b.distanceKm);
  };

  const totalSurplus = predictions.reduce((acc, curr) => acc + (curr.surplus || 0), 0);

  /* ================= ABOUT / MISSION PAGE (FIRST IN ROW) ================= */
  const renderAbout = () => (
    <section className="page-section">
      <div className="welcome-card" style={{ marginBottom: 25 }}>
        <div>
          <p className="eyebrow">PRISMTECH HACKATHON · SOCIAL &amp; WELFARE STREAM[cite: 3]</p>
          <h2>
            Right Food. Right NGO. <br />
            <span>Right Place. Right Time.</span>[cite: 3]
          </h2>
          <p>
            Developed by Team CODENOVA. EcoPlate eliminates food waste by bridging commercial kitchen surplus with nearest community organizations before perishables spoil[cite: 3, 4].
          </p>
        </div>
        <div className="welcome-illustration">🌱</div>
      </div>

      <div className="about-grid">
        <div className="panel" style={{ padding: 25 }}>
          <h3 style={{ margin: "0 0 10px", color: "var(--primary)" }}>The Challenge[cite: 3]</h3>
          <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.6 }}>
            Surplus food exists in hotels, banquets, and restaurants, but manual NGO phone calls and coordination are far too slow for hot cooked food[cite: 3]. Delays cause thousands of wholesome plates to end up in landfills every week[cite: 3].
          </p>
        </div>

        <div className="panel" style={{ padding: 25 }}>
          <h3 style={{ margin: "0 0 10px", color: "var(--primary)" }}>The EcoPlate Solution[cite: 3]</h3>
          <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.6 }}>
            An autonomous matching engine that cross-references donor surplus quantity, physical location, and dietary constraints against real-time shelter capacity limits[cite: 3, 4].
          </p>
        </div>
      </div>

      <div className="panel" style={{ padding: 25, marginTop: 20 }}>
        <h3 style={{ margin: "0 0 15px" }}>Core Technology Stack[cite: 3, 4]</h3>
        <div className="tech-stack-row">
          <span className="tech-tag">⚛️ React Frontend (Vite)[cite: 2, 3]</span>
          <span className="tech-tag">🐍 Python Flask REST API[cite: 2, 3]</span>
          <span className="tech-tag">🗺️ OpenStreetMap &amp; Leaflet Live Routing[cite: 3, 4]</span>
          <span className="tech-tag">📐 Haversine Distance Algorithm[cite: 4]</span>
          <span className="tech-tag">🌱 Zero-Waste Welfare Protocol[cite: 3]</span>
        </div>
      </div>
    </section>
  );

  /* ================= NGO DEMAND DISCOVERY (REVERSE MATCHING) ================= */
  const renderNgoRequestMode = () => {
    const shortlisted = getShortlistedRestaurantsForNgo();

    return (
      <section className="page-section">
        <div className="page-heading">
          <div>
            <span className="page-eyebrow">REVERSE MATCHING ENGINE</span>
            <h2>NGO Meal Request &amp; Restaurant Shortlist</h2>
            <p>Specify the exact meal count your shelter requires. EcoPlate shortlists nearby restaurants with matching surplus[cite: 3, 4].</p>
          </div>
          <div className="page-stat">
            <strong>{shortlisted.length} Matches</strong>
            <span>Within 8 km</span>
          </div>
        </div>

        <div className="ngo-request-bar">
          <div className="req-field">
            <label>Target Meal Count Needed</label>
            <input
              type="number"
              value={ngoTargetMeals}
              onChange={(e) => setNgoTargetMeals(e.target.value)}
              placeholder="e.g. 35"
            />
          </div>

          <div className="req-field">
            <label>Shelter Location (Hyderabad Hubs)</label>
            <select
              value={ngoSelectedHub}
              onChange={(e) => setNgoSelectedHub(e.target.value)}
            >
              {Object.keys(HYDERABAD_HUBS).map((hub) => (
                <option key={hub} value={hub}>{hub}</option>
              ))}
            </select>
          </div>

          <div className="req-field">
            <label>Dietary Requirement</label>
            <select
              value={ngoDietPreference}
              onChange={(e) => setNgoDietPreference(e.target.value)}
            >
              <option value="All">All Diets (Veg &amp; Non-Veg)</option>
              <option value="Veg">Vegetarian Only 🌱</option>
              <option value="Non-Veg">Non-Vegetarian 🍗</option>
            </select>
          </div>
        </div>

        <div className="section-title" style={{ marginTop: "24px" }}>
          <div>
            <h3>Ranked Restaurant Surplus Shortlist (Target: ~{ngoTargetMeals} meals)</h3>
            <p>Sorted by count compatibility and physical proximity[cite: 3, 4]</p>
          </div>
        </div>

        <div className="shortlist-grid">
          {shortlisted.map((res, index) => (
            <div className="shortlist-card" key={res.id}>
              <div className="shortlist-badge">
                {index === 0 ? "★ BEST MATCH" : `#${index + 1} NEAR MATCH`}
              </div>
              <h4>{res.restaurant}</h4>
              <p className="shortlist-loc">📍 {res.location} · <strong>{res.distanceKm} km from {ngoSelectedHub}</strong></p>

              <div className="shortlist-food-tag">
                <span>{res.category === "Veg" ? "🌱" : "🍗"} {res.food}</span>
              </div>

              <div className="shortlist-metrics">
                <div>
                  <small>Surplus Available</small>
                  <strong>{res.availablePlates} plates</strong>
                </div>
                <div>
                  <small>Match Variance</small>
                  <strong style={{ color: res.diff === 0 ? "#176b45" : "#c27a19" }}>
                    {res.diff === 0 ? "Exact Match (0)" : `± ${res.diff} plates`}
                  </strong>
                </div>
              </div>

              <div className="shortlist-footer">
                <span className="time-badge">⏱️ {res.timeRemaining} window</span>
                <button
                  className="claim-surplus-btn"
                  onClick={() => {
                    if (!currentUser) {
                      setShowAuthModal(true);
                      return;
                    }
                    alert(`✅ Reservation Request sent to ${res.restaurant} for ${res.availablePlates} plates of ${res.food}![cite: 3, 4]`);
                  }}
                >
                  Request Batch ➜
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  };

  /* ================= DASHBOARD (FIND NGO) ================= */
  const renderDashboard = () => (
    <>
      <section className="welcome-card">
        <div>
          <p className="eyebrow">ECOPLATE DISPATCH ENGINE</p>
          <h2>
            Feed communities.
            <br />
            <span>Zero out kitchen waste.</span>
          </h2>
          <p>
            Enter your excess food count to instantly locate and dispatch to the nearest verified NGO[cite: 3, 4].
          </p>
        </div>
        <div className="welcome-illustration">🌱</div>
      </section>

      {/* Zomato-style live rescue ticker */}
      <div className="live-rescue-ticker">
        <span className="ticker-dot">● LIVE HYDERABAD RESCUE NETWORK:</span>
        <marquee behavior="scroll" direction="left" scrollamount="6">
          🍲 35 Plates Biryani matched to Annam Sewa Trust (Madhapur) &nbsp;·&nbsp;
          🍗 25 Plates Curry dispatched to Feeding Hands (Gachibowli) &nbsp;·&nbsp;
          🌱 50 Plates Rice redirected to Banjara Peace Kitchen &nbsp;·&nbsp;
          ❤️ 120 Plates Child Nutrition en route to Kondapur
        </marquee>
      </div>

      <section className="stats-grid">
        <div className="stat-card">
          <div className="stat-top">
            <span>Total Surplus Rescued</span>
            <div className="stat-icon green">↗</div>
          </div>
          <strong>{totalSurplus + 1248}</strong>
          <small>plates saved from waste</small>
        </div>

        <div className="stat-card">
          <div className="stat-top">
            <span>Active Listings</span>
            <div className="stat-icon orange">♻</div>
          </div>
          <strong>{predictions.length}</strong>
          <small>food items logged</small>
        </div>

        <div className="stat-card">
          <div className="stat-top">
            <span>Verified NGO Hubs</span>
            <div className="stat-icon blue">🤝</div>
          </div>
          <strong>{ngos.length}</strong>
          <small>shelters in Hyderabad</small>
        </div>

        <div className="stat-card">
          <div className="stat-top">
            <span>Completed Transfers</span>
            <div className="stat-icon purple">♥</div>
          </div>
          <strong>{donations.length + 24}</strong>
          <small>successful deliveries</small>
        </div>
      </section>

      <section className="dashboard-grid">
        {/* INPUT BOX PANEL */}
        <div className="panel predictor-panel">
          <div className="panel-header">
            <div>
              <h3>Find Nearest NGO</h3>
              <p>Match your surplus with hunger spots in real-time[cite: 3, 4]</p>
            </div>
            <div className="panel-icon">🤝</div>
          </div>

          {!currentUser && (
            <div className="guest-login-notice" onClick={() => setShowAuthModal(true)}>
              <span>🔒</span>
              <div>
                <strong>Sign In Required to Fill</strong>
                <p>Click here to log in or register before submitting surplus food[cite: 3, 4].</p>
              </div>
              <button className="notice-login-btn">Sign In / Register ➜</button>
            </div>
          )}

          <form className="form" onSubmit={handleFindNgos}>
            <div className="field">
              <label>Restaurant / Kitchen Name</label>
              <div
                className={`input-wrapper ${!currentUser ? "locked-input-box" : ""}`}
                onClick={handleBoxClick}
              >
                <span>⌂</span>
                <input
                  type="text"
                  placeholder={currentUser ? "e.g. Pademkodi Kitchens" : "Click to sign in & enter restaurant..."}
                  value={restaurant}
                  readOnly={!currentUser}
                  onChange={(e) => setRestaurant(e.target.value)}
                />
              </div>
            </div>

            <div className="field">
              <label>Kitchen Location (Hyderabad Hubs)</label>
              <div
                className={`input-wrapper ${!currentUser ? "locked-input-box" : ""}`}
                onClick={handleBoxClick}
              >
                <span>📍</span>
                <select
                  value={location}
                  disabled={!currentUser}
                  onChange={(e) => setLocation(e.target.value)}
                >
                  {Object.keys(HYDERABAD_HUBS).map((hub) => (
                    <option key={hub} value={hub}>{hub}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-double-col">
              <div className="field">
                <label>Food Item Description</label>
                <div
                  className={`input-wrapper ${!currentUser ? "locked-input-box" : ""}`}
                  onClick={handleBoxClick}
                >
                  <span>🍽</span>
                  <input
                    type="text"
                    placeholder={currentUser ? "e.g. Paneer Biryani" : "Click to sign in..."}
                    value={food}
                    readOnly={!currentUser}
                    onChange={(e) => setFood(e.target.value)}
                  />
                </div>
              </div>

              <div className="field">
                <label>Dietary Category</label>
                <div
                  className={`input-wrapper ${!currentUser ? "locked-input-box" : ""}`}
                  onClick={handleBoxClick}
                >
                  <span>🏷️</span>
                  <select
                    value={category}
                    disabled={!currentUser}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="Veg">🌱 Vegetarian</option>
                    <option value="Non-Veg">🍗 Non-Vegetarian</option>
                    <option value="Egg">🥚 Contains Egg</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Quick plate presets like Swiggy / Zomato */}
            <div className="field">
              <div className="qty-header-row">
                <label>Excess Surplus Quantity</label>
                <div className="quick-presets">
                  {[20, 35, 50, 100].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      className="preset-chip"
                      onClick={() => handleQuickPlateSelect(amt)}
                    >
                      {amt}
                    </button>
                  ))}
                </div>
              </div>

              <div
                className={`input-wrapper ${!currentUser ? "locked-input-box" : ""}`}
                onClick={handleBoxClick}
              >
                <span>▣</span>
                <input
                  type="number"
                  placeholder={currentUser ? "e.g. 35" : "0"}
                  value={surplusQuantity}
                  readOnly={!currentUser}
                  onChange={(e) => setSurplusQuantity(e.target.value)}
                />
                <small>plates excess</small>
              </div>
            </div>

            <div className="predict-actions">
              <button
                className="primary-button"
                type="submit"
                disabled={loading}
              >
                {loading ? "Matching Nearest NGOs..." : "Find Nearest NGOs →"}
              </button>
              <button
                type="button"
                className="clear-button"
                onClick={() => {
                  if (currentUser) {
                    setFood("");
                    setSurplusQuantity("");
                    setMatchedNgosList(null);
                  } else {
                    setShowAuthModal(true);
                  }
                }}
              >
                Clear
              </button>
            </div>
          </form>

          <div className="model-info">
            <div className="model-status">
              <span></span> Live Proximity &amp; Capacity Matching
            </div>
            <p>
              EcoPlate filters shelters with sufficient capacity and ranks them by closest distance[cite: 3, 4].
            </p>
          </div>
        </div>

        {/* REDESIGNED ZOMATO-STYLE NGO DISCOVERY HUB (EMPTY & RESULTS) */}
        <div className="panel result-panel">
          {!matchedNgosList ? (
            <div className="discovery-hub-empty">
              {/* Radar pulse animation */}
              <div className="radar-scanner-wrapper">
                <div className="radar-circle-pulse"></div>
                <div className="radar-dot"></div>
                <span className="radar-center-icon">🛰️</span>
              </div>

              <h3>Live Shelter Proximity Radar</h3>
              <p className="discovery-desc">
                Nearby shelters in <strong>{location}</strong> and adjacent hubs are active and ready to accept hot meals within a 4-hour window[cite: 3, 4].
              </p>

              {/* Zomato-style active demand ticker cards */}
              <div className="demand-spotlight-cards">
                <div className="spotlight-card">
                  <div className="spotlight-header">
                    <span className="pulse-green-dot">●</span>
                    <strong>Madhapur Hub</strong>
                  </div>
                  <p>180 meals intake space ready</p>
                  <small>Annam Sewa Trust · ~12 mins away</small>
                </div>

                <div className="spotlight-card">
                  <div className="spotlight-header">
                    <span className="pulse-green-dot">●</span>
                    <strong>Gachibowli Hub</strong>
                  </div>
                  <p>250 meals intake space ready</p>
                  <small>Feeding Hands · ~18 mins away</small>
                </div>
              </div>

              <div className="mini-step-workflow">
                <div className="workflow-item">
                  <span>1</span>
                  <small>Input Surplus</small>
                </div>
                <div className="step-arrow">➜</div>
                <div className="workflow-item">
                  <span>2</span>
                  <small>Capacity Match</small>
                </div>
                <div className="step-arrow">➜</div>
                <div className="workflow-item">
                  <span>3</span>
                  <small>1-Click Dispatch</small>
                </div>
              </div>
            </div>
          ) : (
            <div className="result-content">
              <div className="result-heading">
                <div>
                  <div className="result-label">PROXIMITY MATCHES FOUND</div>
                  <h3>Nearest NGOs for {surplusQuantity} Plates</h3>
                  <p>{restaurant} ({location}) · {food} [{category}]</p>
                </div>
                <div className="success-icon">✓</div>
              </div>

              <div className="ranked-ngo-scroll-list">
                {matchedNgosList.map((ngo, idx) => (
                  <div
                    className={`ngo-match-item ${idx === 0 ? "top-match-card" : ""}`}
                    key={ngo.name}
                  >
                    <div className="match-card-top-row">
                      <span className="match-rank-tag">
                        {idx === 0 ? "★ TOP ELIGIBLE MATCH" : `#${idx + 1} NEARBY HUB`}
                      </span>
                      <span className="ngo-rating-badge">{ngo.rating || "4.8 ★"}</span>
                    </div>

                    <div className="ngo-item-content">
                      <div className="ngo-avatar-icon">{ngo.icon}</div>
                      <div className="ngo-info-col">
                        <h4>{ngo.name}</h4>
                        <p className="ngo-loc-line">
                          📍 {ngo.location} · <strong>{ngo.distanceKm} km away</strong> (~{ngo.calculatedEta} mins transit)
                        </p>
                        <div className="ngo-badges-row">
                          <span className="capacity-badge">
                            Cap: <strong>{ngo.capacity} plates</strong> ({ngo.hasCapacity ? "Available ✓" : "Full"})
                          </span>
                          <span className="diet-pref-pill">{ngo.dietPref || "All Diets"}</span>
                        </div>
                      </div>

                      <button
                        className="dispatch-single-btn"
                        disabled={!ngo.hasCapacity}
                        onClick={() => handleDispatchToNgo(ngo)}
                      >
                        {ngo.hasCapacity ? "Dispatch ➜" : "Exceeds Space"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );

  /* ================= SURPLUS LOG ================= */
  const renderPredictions = () => (
    <section className="page-section">
      <div className="page-heading">
        <div>
          <span className="page-eyebrow">FOOD REGISTRY</span>
          <h2>Surplus Records</h2>
          <p>Logged surplus batches available for community distribution[cite: 3, 4].</p>
        </div>
        <div className="page-stat">
          <strong>{predictions.length}</strong>
          <span>Total Records</span>
        </div>
      </div>

      <div className="prediction-table">
        <div className="table-header prediction-grid">
          <span>Restaurant</span>
          <span>Food Item</span>
          <span>Location</span>
          <span>Diet</span>
          <span style={{ textAlign: "right" }}>Surplus Plates</span>
        </div>

        {predictions.map((item, index) => (
          <div className="table-row prediction-grid" key={index}>
            <span><strong>{item.restaurant}</strong></span>
            <span>{item.food}</span>
            <span>📍 {item.location || "Hyderabad"}</span>
            <span>
              <span className={`status-pill ${item.category === "Non-Veg" ? "status-nonveg" : "status-veg"}`}>
                {item.category || "Veg"}
              </span>
            </span>
            <strong className="surplus-text" style={{ textAlign: "right" }}>{item.surplus} plates</strong>
          </div>
        ))}
      </div>
    </section>
  );

  /* ================= DONATIONS ================= */
  const renderDonations = () => (
    <section className="page-section">
      <div className="page-heading">
        <div>
          <span className="page-eyebrow">FOOD REDISTRIBUTION</span>
          <h2>Donation Management</h2>
          <p>Track surplus food and live delivery routes across Hyderabad[cite: 3, 4].</p>
        </div>
        <div className="donation-summary">
          <strong>{donations.reduce((acc, curr) => acc + Number(curr.quantity), 0)}</strong>
          <span>plates available</span>
        </div>
      </div>

      <div className="donation-cards">
        <div className="donation-card green-card">
          <span>♻</span>
          <strong>{donations.reduce((acc, curr) => acc + Number(curr.quantity), 0)}</strong>
          <small>Surplus plates</small>
        </div>

        <div className="donation-card blue-card">
          <span>🤝</span>
          <strong>{donations.filter((d) => d.status === "Completed").length}</strong>
          <small>Donations completed</small>
        </div>

        <div className="donation-card orange-card">
          <span>⏳</span>
          <strong>{donations.filter((d) => d.status !== "Completed").length}</strong>
          <small>Awaiting pickup / delivery</small>
        </div>
      </div>

      <div className="section-title">
        <div>
          <h2>Active Redistribution Dispatches</h2>
          <p>Click &quot;Track Map&quot; to inspect live GPS routing with courier carrier</p>
        </div>
      </div>

      <div className="prediction-table">
        <div className="table-header donation-grid-live">
          <span>Order ID</span>
          <span>Restaurant</span>
          <span>Food</span>
          <span>Quantity</span>
          <span>NGO</span>
          <span>Status</span>
          <span style={{ textAlign: "center" }}>Live GPS</span>
        </div>

        {donations.map((item, index) => (
          <div className="table-row donation-grid-live" key={index}>
            <strong>#{item.id}</strong>
            <span>{item.restaurant}</span>
            <span>{item.food}</span>
            <strong>{item.quantity} plates</strong>
            <span>{item.ngo}</span>
            <em className="status-pill">{item.status}</em>
            <div style={{ textAlign: "center" }}>
              <button
                className="live-track-btn"
                onClick={() => setActiveTrackingOrder(item)}
              >
                🗺️ Track Map
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );

  /* ================= NGO DIRECTORY ================= */
  const renderNGOs = () => (
    <section className="page-section">
      <div className="page-heading">
        <div>
          <span className="page-eyebrow">COMMUNITY NETWORK</span>
          <h2>NGO Partners</h2>
          <p>Partner organizations available for food redistribution in Hyderabad[cite: 3, 4].</p>
        </div>
        <div className="page-stat">
          <strong>{ngos.length}</strong>
          <span>Partner organizations</span>
        </div>
      </div>

      <div className="ngo-grid">
        {ngos.map((ngo, index) => (
          <div className="ngo-card" key={index}>
            <div className="ngo-card-top">
              <div className="ngo-large-icon">{ngo.icon}</div>
              <span className={ngo.status === "Limited" ? "limited-status" : "available-status"}>
                ● {ngo.status}
              </span>
            </div>

            <h3>{ngo.name}</h3>
            <p className="ngo-type">{ngo.type}</p>

            <div className="ngo-details">
              <div>
                <span>Location</span>
                <strong>📍 {ngo.location}</strong>
              </div>
              <div>
                <span>Daily Capacity</span>
                <strong>{ngo.capacity} plates</strong>
              </div>
            </div>

            <button
              className="ngo-action"
              onClick={() => {
                setActivePage("Dashboard");
                setLocation(ngo.location);
              }}
            >
              Match This Hub ➜
            </button>
          </div>
        ))}
      </div>
    </section>
  );

  /* ================= REPORTS ================= */
  const renderReports = () => (
    <section className="page-section">
      <div className="page-heading">
        <div>
          <span className="page-eyebrow">INSIGHTS</span>
          <h2>Reports &amp; Impact</h2>
          <p>Monitor EcoPlate&apos;s food redistribution activity[cite: 3, 4].</p>
        </div>
      </div>

      <div className="impact-grid">
        <div className="impact-card">
          <span>🍽</span>
          <strong>1,248</strong>
          <small>Plates redirected</small>
        </div>
        <div className="impact-card">
          <span>♻</span>
          <strong>312 kg</strong>
          <small>Food waste avoided</small>
        </div>
        <div className="impact-card">
          <span>🤝</span>
          <strong>24</strong>
          <small>Donation transfers</small>
        </div>
        <div className="impact-card">
          <span>🌱</span>
          <strong>{ngos.length}</strong>
          <small>Community partners</small>
        </div>
      </div>

      <div className="report-panel">
        <h3>Monthly Impact Overview</h3>
        <div className="bars">
          <div><span>Jan</span><i style={{ height: "35%" }}></i></div>
          <div><span>Feb</span><i style={{ height: "50%" }}></i></div>
          <div><span>Mar</span><i style={{ height: "65%" }}></i></div>
          <div><span>Apr</span><i style={{ height: "75%" }}></i></div>
          <div><span>May</span><i style={{ height: "88%" }}></i></div>
          <div><span>Jun</span><i style={{ height: "95%" }}></i></div>
        </div>
      </div>
    </section>
  );

  /* ================= SETTINGS ================= */
  const renderSettings = () => (
    <section className="page-section">
      <div className="page-heading">
        <div>
          <span className="page-eyebrow">SYSTEM SETTINGS</span>
          <h2>Platform Configuration</h2>
          <p>Configure appearance themes, prediction microservice URLs, and alert thresholds.</p>
        </div>
      </div>

      <div className="panel" style={{ padding: 25, maxWidth: 650, marginBottom: 20 }}>
        <h3 style={{ margin: "0 0 8px" }}>Display Appearance</h3>
        <p style={{ margin: "0 0 15px", color: "var(--text-muted)", fontSize: 12 }}>
          Switch between Light and High-Contrast Dark mode.
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
          <span>Current Theme: <strong>{theme.toUpperCase()}</strong></span>
          <button className="theme-toggle-btn" onClick={toggleTheme}>
            {theme === "light" ? "🌙 Switch to Dark Theme" : "☀️ Switch to Light Theme"}
          </button>
        </div>
      </div>

      <div className="panel" style={{ padding: 25, maxWidth: 650 }}>
        <h3 style={{ margin: "0 0 8px" }}>Backend Prediction API</h3>
        <p style={{ margin: "0 0 20px", color: "var(--text-muted)", fontSize: 12 }}>
          Active endpoint for Python Flask / FastAPI demand prediction services[cite: 3, 4].
        </p>

        <div className="field">
          <label>API Endpoint URL</label>
          <div className="input-wrapper">
            <span>🌐</span>
            <input
              type="text"
              value={apiUrl}
              onChange={(e) => setApiUrl(e.target.value)}
            />
          </div>
        </div>

        <div style={{ marginTop: 20 }}>
          <label className="remember">
            <input
              type="checkbox"
              checked={autoAlerts}
              onChange={(e) => setAutoAlerts(e.target.checked)}
            />
            Automatically notify nearby NGOs when excess surplus is logged[cite: 3, 4]
          </label>
        </div>

        <button
          className="primary-button"
          style={{ marginTop: 25, maxWidth: 220 }}
          onClick={() => alert("Settings saved successfully!")}
        >
          Save Configuration
        </button>
      </div>
    </section>
  );

  /* ================= HELP & SUPPORT ================= */
  const renderSupport = () => (
    <section className="page-section">
      <div className="page-heading">
        <div>
          <span className="page-eyebrow">HELP &amp; SUPPORT</span>
          <h2>Support &amp; Helpline</h2>
          <p>Guidance for food donors and emergency pickup contact numbers.</p>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="panel" style={{ padding: 25 }}>
          <h3 style={{ margin: "0 0 10px" }}>Emergency Surplus Helpline</h3>
          <p style={{ color: "var(--text-muted)", fontSize: 12, lineHeight: 1.6 }}>
            Have a large banquet or wedding surplus exceeding 100 plates that requires immediate transportation? Contact our 24/7 central Hyderabad dispatch desk.
          </p>
          <div style={{
            background: "#edf8f1",
            color: "#176b45",
            padding: "12px 18px",
            borderRadius: 8,
            fontWeight: "bold",
            fontSize: 16,
            marginTop: 15,
            display: "inline-block"
          }}>
            📞 +91 (40) 2345-6789 (Toll Free)
          </div>
        </div>

        <div className="panel" style={{ padding: 25 }}>
          <h3 style={{ margin: "0 0 10px" }}>Frequently Asked Questions</h3>
          <div style={{ fontSize: 12, color: "var(--text-main)", lineHeight: 1.6 }}>
            <p><strong>Q: Who pays for volunteer delivery?</strong><br />
            A: EcoPlate operates as a zero-cost social welfare platform sponsored by partner CSR grants[cite: 3].</p>
            <p style={{ marginTop: 10 }}><strong>Q: How are NGOs matched?</strong><br />
            A: Verified NGOs are filtered by intake capacity and sorted by shortest physical distance[cite: 3, 4].</p>
          </div>
        </div>
      </div>
    </section>
  );

  const renderPage = () => {
    if (activePage === "About") return renderAbout();
    if (portalMode === "ngo_ask") return renderNgoRequestMode();
    if (activePage === "Dashboard") return renderDashboard();
    if (activePage === "Predictions") return renderPredictions();
    if (activePage === "Donations") return renderDonations();
    if (activePage === "NGO Partners") return renderNGOs();
    if (activePage === "Reports") return renderReports();
    if (activePage === "Settings") return renderSettings();
    if (activePage === "Support") return renderSupport();
    return renderDashboard();
  };

  return (
    <div className={`app ${theme}-theme`}>
      <aside className="sidebar">
        <div className="brand" onClick={() => setActivePage("About")} style={{ cursor: "pointer" }} title="Click to view About page">
          <div className="brand-logo">🌱</div>
          <div>
            <h2>EcoPlate</h2>
            <span>Food Intelligence</span>
          </div>
        </div>

        {/* 2-Way Switcher: Restaurant vs NGO */}
        <div className="portal-role-toggle">
          <button
            className={`role-btn ${portalMode === "donor" ? "active" : ""}`}
            onClick={() => {
              setPortalMode("donor");
              if (activePage === "About") setActivePage("Dashboard");
            }}
          >
            🏬 Find NGO
          </button>
          <button
            className={`role-btn ${portalMode === "ngo_ask" ? "active" : ""}`}
            onClick={() => setPortalMode("ngo_ask")}
          >
            🤝 NGO Ask
          </button>
        </div>

        <div className="sidebar-section">
          <p className="menu-label">MAIN MENU</p>
          {[
            ["About", "ℹ️"],
            ["Dashboard", "▦"],
            ["Predictions", "⌁"],
            ["Donations", "♻"],
            ["NGO Partners", "♧"],
            ["Reports", "▤"],
          ].map(([name, icon]) => (
            <button
              key={name}
              className={`nav-item ${activePage === name && portalMode === "donor" ? "active" : ""}`}
              onClick={() => {
                setPortalMode("donor");
                setActivePage(name);
              }}
            >
              <span>{icon}</span>
              {name === "Predictions" ? "Surplus Log" : name === "About" ? "About Platform" : name}
            </button>
          ))}
        </div>

        {/* SYSTEM MENU */}
        <div className="sidebar-section bottom-menu">
          <p className="menu-label">SYSTEM</p>
          <button
            className={`nav-item ${activePage === "Settings" ? "active" : ""}`}
            onClick={() => setActivePage("Settings")}
          >
            <span>⚙</span>
            Settings
          </button>
          <button
            className={`nav-item ${activePage === "Support" ? "active" : ""}`}
            onClick={() => setActivePage("Support")}
          >
            <span>?</span>
            Help &amp; Support
          </button>
        </div>

        <div className="sidebar-footer">
          <div className="profile-avatar">
            {currentUser ? currentUser.name[0] : "G"}
          </div>
          <div>
            <strong>{currentUser ? currentUser.name : "Guest Mode"}</strong>
            <small>{currentUser ? `${currentUser.role.toUpperCase()}` : "Click box to login"}</small>
          </div>
        </div>
      </aside>

      <div className="main-area">
        <header className="topbar">
          <div>
            <h1>{portalMode === "ngo_ask" ? "NGO Meal Demand Discovery" : activePage === "Predictions" ? "Surplus Food Log" : activePage === "About" ? "About EcoPlate" : activePage}</h1>
            <p>Right Food. Right NGO. Right Place. Right Time[cite: 3].</p>
          </div>

          <div className="topbar-right">
            <button
              className="quick-theme-btn"
              onClick={toggleTheme}
              title="Toggle Light / Dark Mode"
            >
              {theme === "light" ? "🌙 Dark" : "☀️ Light"}
            </button>

            <div className="system-status">
              <span></span>
              Engine Online
            </div>

            <div className="notification">🔔</div>

            {currentUser ? (
              <button className="logout-button" onClick={logout}>
                Sign Out
              </button>
            ) : (
              <button className="logout-button" onClick={() => setShowAuthModal(true)}>
                Sign In / Register
              </button>
            )}
          </div>
        </header>

        <main className="content">{renderPage()}</main>

        <footer className="footer">
          <div>
            <strong>🌱 EcoPlate</strong>
            <span> · Smart Food Demand &amp; Surplus Management</span>
          </div>
          <div>PRISMTECH Hackathon · Team CODENOVA</div>
        </footer>
      </div>

      <OrderConfirmedToast
        data={confirmedOrderToast}
        onClose={() => setConfirmedOrderToast(null)}
      />

      {showAuthModal && (
        <AuthModal
          onClose={() => setShowAuthModal(false)}
          onLoginSuccess={(user) => {
            setCurrentUser(user);
            setShowAuthModal(false);
          }}
        />
      )}

      {activeTrackingOrder && (
        <DeliveryMapModal
          order={activeTrackingOrder}
          onClose={() => setActiveTrackingOrder(null)}
        />
      )}
    </div>
  );
}

export default App;