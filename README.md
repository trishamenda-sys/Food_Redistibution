EcoPlate — Smart Food Demand & Surplus 

Redistribution Platform
📌 Problem Statement
Commercial food establishments—such as hotels, banquet halls, restaurants, and catering services—frequently produce edible, high-quality surplus food at the close of operations. Concurrently, nearby shelters, orphanages, and community feeding centers experience regular meal deficits.

Traditional redistribution relies on ad-hoc phone calls, manual coordination, and fragmented logistics. Because cooked perishables have strict shelf-life constraints, these communication bottlenecks cause thousands of edible meals to be discarded into landfills daily, escalating urban organic waste while local hunger demands remain unaddressed.

💡 Solution
EcoPlate provides an autonomous matching and redistribution pipeline connecting commercial food donors directly with verified recipient organizations in real time.

By taking donor surplus parameters (physical location, portion count, dietary classifications) or recipient shelter demands, EcoPlate applies geospatial distance calculations (Haversine formula) alongside real-time capacity validation. This ensures surplus food is redirected to the closest organization with adequate intake capacity, verifiable handoff tokens, and simulated transit tracking.

🚀 Key Features
Two-Way Redistribution Engine:

Donor Mode ("Find NGO"): Donors select their local hub, enter surplus plate quantities, specify dietary classifications (Vegetarian, Non-Vegetarian, Egg), and obtain a ranked roster of nearby shelters capable of accepting the volume.

Shelter Mode ("NGO Ask"): Recipient organizations submit real-time requirements (e.g., target meal counts) to query and claim matching batches logged by commercial kitchens within their target radius.

Geospatial Proximity & Capacity Sorting:

Integrates exact GPS coordinates across 14+ designated urban hubs in Hyderabad (including Madhapur, Hitech City, Gachibowli, Kondapur, and Begumpet).

Computes straight-line distances using the Haversine equation and estimates transit durations while enforcing strict shelter daily intake limits.

Live GPS Redistribution & Carrier Simulation:

Interactive OpenStreetMap / Leaflet interface tracking transit routes between donor kitchens and recipient shelters.

Animated moving courier telemetry (🛵), route polylines, real-time ETA countdowns, and dynamic order dispatching.

Secure OTP Verification Pipeline:

Issues four-digit digital handoff One-Time Passwords (OTPs) upon dispatch confirmation to guarantee accountability between kitchen staff, couriers, and shelter recipients.

Impact Tracking & CSR Auditing:

Aggregates live platform statistics: cumulative surplus plates rescued, active batches logged, partner shelters online, and total food waste averted (in kg).

Generates monthly impact visualizations to monitor diversion trends over time.

Adaptive User Interface:

Built-in Light / Dark theme persistence via CSS variables and LocalStorage.

Role-based simulated authentication supporting Restaurant Donors and Verified NGO Hubs.

🛠️ Architecture & Tech StackLayerTechnologiesFrontendReact 18 (Vite), JavaScript (ES6+), Vanilla CSS3 VariablesMapping & GISLeaflet.js, OpenStreetMap Tiles, DivIcon Overlays, Polyline RoutingBackend APIPython 3, Flask, Flask-CORS, Gunicorn WSGIData Processing & MLPandas, NumPy, Scikit-learn (Demand & Capacity Modeling)Hosting & DeploymentVercel (Frontend Client), Render (Flask REST Service)📐 Algorithmic Logic1. Geospatial Distance (Haversine Formula)Distances between commercial donor kitchens $(\text{lat}_1, \text{lon}_1)$ and shelter locations $(\text{lat}_2, \text{lon}_2)$ are calculated over the Earth's radius ($R = 6371\text{ km}$):$$\Delta \text{lat} = (\text{lat}_2 - \text{lat}_1) \times \frac{\pi}{180}, \quad \Delta \text{lon} = (\text{lon}_2 - \text{lon}_1) \times \frac{\pi}{180}$$$$a = \sin^2\left(\frac{\Delta \text{lat}}{2}\right) + \cos\left(\text{lat}_1 \times \frac{\pi}{180}\right) \cos\left(\text{lat}_2 \times \frac{\pi}{180}\right) \sin^2\left(\frac{\Delta \text{lon}}{2}\right)$$$$d = 2R \cdot \text{atan2}\left(\sqrt{a}, \sqrt{1 - a}\right)$$2. Multi-Factor PrioritizationCandidate shelters are evaluated by verifying intake thresholds ($\text{Capacity}_{\text{NGO}} \ge \text{Quantity}_{\text{Surplus}}$). Matching organizations are sorted primarily by capacity eligibility and secondarily by computed distance $d$ to minimize perishability exposure.

📂 Repository File Structure
Plaintext
Food_Redistribution/
├── backend/
│   ├── app.py                 # Flask REST application endpoints
│   ├── requirements.txt       # Python dependency specifications
│   └── data/                  # Reference datasets and training models
├── frontend/
│   ├── index.html             # HTML entry point
│   ├── package.json           # Node scripts and UI dependencies
│   ├── vite.config.js         # Vite bundler configuration
│   └── src/
│       ├── App.jsx            # Core application state and screen views
│       ├── App.css            # Responsive themes and layout styling
│       ├── main.jsx           # React DOM root render
│       └── assets/            # Static vector icons and graphics
├── EcoPlate_Model.ipynb       # Machine learning training notebook
└── README.md                  # Project documentation

⚙️ Local Development Setup
1. Backend Service
Bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate

pip install -r requirements.txt
python app.py
The local API service initializes at [http://127.0.0.1:5000](http://127.0.0.1:5000).

2. Frontend Client
Bash
cd frontend
npm install
npm run dev
