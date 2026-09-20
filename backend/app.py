from flask import Flask, request, jsonify
from flask_cors import CORS
import math

app = Flask(__name__)
CORS(app)

HYDERABAD_HUBS = {
    "Hitech City": (17.4435, 78.3772),
    "Madhapur": (17.4483, 78.3915),
    "Gachibowli": (17.4401, 78.3489),
    "Kondapur": (17.4699, 78.3578),
    "Jubilee Hills": (17.4319, 78.4073),
    "Banjara Hills": (17.4156, 78.4350),
    "Begumpet": (17.4448, 78.4664),
    "Secunderabad": (17.4399, 78.4983),
    "Kukatpally": (17.4933, 78.3914),
    "Mehdipatnam": (17.3916, 78.4416),
    "Ameerpet": (17.4375, 78.4482),
    "Dilsukhnagar": (17.3688, 78.5247),
    "Uppal": (17.4056, 78.5591),
    "Charminar": (17.3616, 78.4747)
}

NGO_REGISTRY = [
    {"id": 1, "name": "Feeding Hands Foundation", "location": "Gachibowli", "lat": 17.4401, "lng": 78.3489, "capacity": 250},
    {"id": 2, "name": "Annam Sewa Trust", "location": "Madhapur", "lat": 17.4483, "lng": 78.3915, "capacity": 180},
    {"id": 3, "name": "HopeServe Foundation", "location": "Kondapur", "lat": 17.4699, "lng": 78.3578, "capacity": 150},
    {"id": 4, "name": "CareBridge Foundation", "location": "Hitech City", "lat": 17.4435, "lng": 78.3772, "capacity": 220},
    {"id": 5, "name": "Udaya Community Kitchen", "location": "Kukatpally", "lat": 17.4933, "lng": 78.3914, "capacity": 300},
    {"id": 6, "name": "Nourish Together", "location": "Jubilee Hills", "lat": 17.4319, "lng": 78.4073, "capacity": 120},
    {"id": 7, "name": "Banjara Peace Kitchen", "location": "Banjara Hills", "lat": 17.4156, "lng": 78.4350, "capacity": 110},
    {"id": 8, "name": "Charminar Hope Shelter", "location": "Charminar", "lat": 17.3616, "lng": 78.4747, "capacity": 260}
]

def haversine(coord1, coord2):
    R = 6371
    dlat = math.radians(coord2[0] - coord1[0])
    dlon = math.radians(coord2[1] - coord1[1])
    a = math.sin(dlat / 2)**2 + math.cos(math.radians(coord1[0])) * math.cos(math.radians(coord2[0])) * math.sin(dlon / 2)**2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    return round(R * c, 1)

@app.route("/")
def home():
    return jsonify({"message": "EcoPlate Proximity NGO Matching Engine Online!"})

@app.route("/api/predict", methods=["POST"])
def find_ngos():
    data = request.json or {}
    restaurant = data.get("restaurant", "Pademkodi Kitchens")
    food = data.get("food", "Paneer Biryani")
    category = data.get("category", "Veg")
    location = data.get("location", "Madhapur")
    surplus_qty = int(data.get("quantity", 35))

    donor_coords = HYDERABAD_HUBS.get(location, (17.4483, 78.3915))

    # Rank NGOs by distance that have enough capacity for this surplus
    ranked = []
    for ngo in NGO_REGISTRY:
        dist = haversine(donor_coords, (ngo["lat"], ngo["lng"]))
        has_capacity = ngo["capacity"] >= surplus_qty
        ranked.append({
            **ngo,
            "distanceKm": dist,
            "hasCapacity": has_capacity,
            "calculatedEta": max(8, round(dist * 3.5))
        })

    # Sort capacity-sufficient first, then closest distance
    ranked.sort(key=lambda x: (not x["hasCapacity"], x["distanceKm"]))

    best_match = ranked[0]

    return jsonify({
        "restaurant": restaurant,
        "food": food,
        "category": category,
        "location": location,
        "surplus": surplus_qty,
        "ngo": best_match,
        "ranked_ngos": ranked
    })

if __name__ == "__main__":
    app.run(debug=True, port=5000)