#!/usr/bin/env python3
"""
ReliefSense Demo API
Simple mock server for demonstration purposes
"""

from flask import Flask, jsonify
from flask_cors import CORS
import random
from datetime import datetime

app = Flask(__name__)
CORS(app)

@app.route('/api/sensors')
def get_sensors():
    """Mock sensor data"""
    return jsonify({
        'timestamp': datetime.now().isoformat(),
        'sensors': {
            'temperature': round(20 + random.uniform(-2, 2), 1),
            'humidity': round(65 + random.uniform(-5, 5), 1),
            'co2': round(800 + random.uniform(-50, 50)),
            'light': round(25000 + random.uniform(-2000, 2000))
        },
        'status': 'OK'
    })

@app.route('/api/crops')
def get_crops():
    """Mock crop data"""
    return jsonify({
        'crops': [
            {
                'id': 1,
                'name': 'Lettuce',
                'variety': 'Green Leaf',
                'plant_date': '2025-03-15',
                'expected_harvest': '2025-04-18',
                'status': 'growing',
                'progress': 67
            }
        ]
    })

if __name__ == '__main__':
    print("🌱 ReliefSense Demo API starting...")
    app.run(host='0.0.0.0', port=8001, debug=True)
