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

@app.route('/api/sensors/readings')
def get_sensor_readings():
    """Mock sensor readings"""
    return jsonify({
        'timestamp': datetime.now().isoformat(),
        'readings': [
            {
                'sensor_id': 'temp_01',
                'type': 'temperature',
                'value': round(20 + random.uniform(-2, 2), 1),
                'unit': '°C',
                'status': 'normal'
            },
            {
                'sensor_id': 'humid_01',
                'type': 'humidity',
                'value': round(65 + random.uniform(-5, 5), 1),
                'unit': '%',
                'status': 'normal'
            },
            {
                'sensor_id': 'co2_01',
                'type': 'co2',
                'value': round(800 + random.uniform(-50, 50)),
                'unit': 'ppm',
                'status': 'normal'
            },
            {
                'sensor_id': 'light_01',
                'type': 'light',
                'value': round(25000 + random.uniform(-2000, 2000)),
                'unit': 'lux',
                'status': 'normal'
            }
        ]
    })

@app.route('/api/sensors/status')
def get_sensor_status():
    """Mock sensor status"""
    return jsonify({
        'online': 4,
        'offline': 0,
        'warning': 0,
        'total': 4,
        'last_update': datetime.now().isoformat()
    })

@app.route('/api/agriculture/analysis')
def get_agriculture_analysis():
    """Mock agriculture analysis"""
    return jsonify({
        'soil_health': round(random.uniform(75, 95), 1),
        'water_efficiency': round(random.uniform(80, 95), 1),
        'crop_health': round(random.uniform(70, 90), 1),
        'recommendations': [
            'Optimal growing conditions',
            'Monitor water levels',
            'Harvest window approaching'
        ]
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
