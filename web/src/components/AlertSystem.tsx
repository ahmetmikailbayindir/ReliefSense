import React, { useState, useEffect } from 'react';
import {
  AlertTriangle,
  Thermometer,
  Droplets,
  Activity,
  Sun,
  X,
  Bell,
  BellOff
} from 'lucide-react';

interface Alert {
  id: string;
  type: 'critical' | 'warning' | 'info';
  sensor: 'temperature' | 'humidity' | 'co2' | 'light';
  message: string;
  value: number;
  threshold: number;
  timestamp: Date;
  acknowledged: boolean;
}

interface AlertSystemProps {
  sensorData: any;
  analysis: any;
}

// Alert thresholds for humanitarian agriculture
const ALERT_THRESHOLDS = {
  temperature: {
    critical: { min: 10, max: 35 },
    warning: { min: 15, max: 30 }
  },
  humidity: {
    critical: { min: 20, max: 90 },
    warning: { min: 30, max: 80 }
  },
  co2: {
    critical: { min: 250, max: 1000 },
    warning: { min: 350, max: 800 }
  },
  light: {
    critical: { min: 5000, max: 50000 },
    warning: { min: 10000, max: 40000 }
  }
};

export const AlertSystem: React.FC<AlertSystemProps> = ({ sensorData, analysis }) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showAlerts, setShowAlerts] = useState(true);

  const getAlertIcon = (sensor: string) => {
    switch (sensor) {
      case 'temperature': return <Thermometer className="w-5 h-5" />;
      case 'humidity': return <Droplets className="w-5 h-5" />;
      case 'co2': return <Activity className="w-5 h-5" />;
      case 'light': return <Sun className="w-5 h-5" />;
      default: return <AlertTriangle className="w-5 h-5" />;
    }
  };

  const checkSensorAlerts = () => {
    if (!sensorData?.sensors) return;

    const newAlerts: Alert[] = [];
    const timestamp = new Date();

    // Check temperature alerts
    const temp = sensorData.sensors.scd41?.temperature || sensorData.sensors.sht30?.temperature;
    if (temp) {
      if (temp < ALERT_THRESHOLDS.temperature.critical.min || temp > ALERT_THRESHOLDS.temperature.critical.max) {
        newAlerts.push({
          id: `temp-critical-${Date.now()}`,
          type: 'critical',
          sensor: 'temperature',
          message: `Critical Temperature: ${temp.toFixed(1)}°C - Immediate action required!`,
          value: temp,
          threshold: temp < 15 ? ALERT_THRESHOLDS.temperature.critical.min : ALERT_THRESHOLDS.temperature.critical.max,
          timestamp,
          acknowledged: false
        });
      } else if (temp < ALERT_THRESHOLDS.temperature.warning.min || temp > ALERT_THRESHOLDS.temperature.warning.max) {
        newAlerts.push({
          id: `temp-warning-${Date.now()}`,
          type: 'warning',
          sensor: 'temperature',
          message: `Temperature Warning: ${temp.toFixed(1)}°C - Monitor closely`,
          value: temp,
          threshold: temp < 20 ? ALERT_THRESHOLDS.temperature.warning.min : ALERT_THRESHOLDS.temperature.warning.max,
          timestamp,
          acknowledged: false
        });
      }
    }

    // Check humidity alerts
    const humidity = sensorData.sensors.scd41?.humidity || sensorData.sensors.sht30?.humidity;
    if (humidity) {
      if (humidity < ALERT_THRESHOLDS.humidity.critical.min || humidity > ALERT_THRESHOLDS.humidity.critical.max) {
        newAlerts.push({
          id: `humidity-critical-${Date.now()}`,
          type: 'critical',
          sensor: 'humidity',
          message: `Critical Humidity: ${humidity.toFixed(1)}% - Plants at risk!`,
          value: humidity,
          threshold: humidity < 30 ? ALERT_THRESHOLDS.humidity.critical.min : ALERT_THRESHOLDS.humidity.critical.max,
          timestamp,
          acknowledged: false
        });
      } else if (humidity < ALERT_THRESHOLDS.humidity.warning.min || humidity > ALERT_THRESHOLDS.humidity.warning.max) {
        newAlerts.push({
          id: `humidity-warning-${Date.now()}`,
          type: 'warning',
          sensor: 'humidity',
          message: `Humidity Warning: ${humidity.toFixed(1)}% - Adjust watering`,
          value: humidity,
          threshold: humidity < 40 ? ALERT_THRESHOLDS.humidity.warning.min : ALERT_THRESHOLDS.humidity.warning.max,
          timestamp,
          acknowledged: false
        });
      }
    }

    // Check CO2 alerts
    const co2 = sensorData.sensors.scd41?.co2_ppm;
    if (co2) {
      if (co2 < ALERT_THRESHOLDS.co2.critical.min || co2 > ALERT_THRESHOLDS.co2.critical.max) {
        newAlerts.push({
          id: `co2-critical-${Date.now()}`,
          type: 'critical',
          sensor: 'co2',
          message: `Critical CO2: ${co2} ppm - Check ventilation!`,
          value: co2,
          threshold: co2 < 400 ? ALERT_THRESHOLDS.co2.critical.min : ALERT_THRESHOLDS.co2.critical.max,
          timestamp,
          acknowledged: false
        });
      } else if (co2 < ALERT_THRESHOLDS.co2.warning.min || co2 > ALERT_THRESHOLDS.co2.warning.max) {
        newAlerts.push({
          id: `co2-warning-${Date.now()}`,
          type: 'warning',
          sensor: 'co2',
          message: `CO2 Warning: ${co2} ppm - Monitor air flow`,
          value: co2,
          threshold: co2 < 500 ? ALERT_THRESHOLDS.co2.warning.min : ALERT_THRESHOLDS.co2.warning.max,
          timestamp,
          acknowledged: false
        });
      }
    }

    // Check light alerts
    const light = sensorData.sensors.bh1750?.light_lux;
    if (light) {
      if (light < ALERT_THRESHOLDS.light.critical.min || light > ALERT_THRESHOLDS.light.critical.max) {
        newAlerts.push({
          id: `light-critical-${Date.now()}`,
          type: 'critical',
          sensor: 'light',
          message: `Critical Light: ${light.toFixed(0)} lux - Growth severely impacted!`,
          value: light,
          threshold: light < 10000 ? ALERT_THRESHOLDS.light.critical.min : ALERT_THRESHOLDS.light.critical.max,
          timestamp,
          acknowledged: false
        });
      } else if (light < ALERT_THRESHOLDS.light.warning.min || light > ALERT_THRESHOLDS.light.warning.max) {
        newAlerts.push({
          id: `light-warning-${Date.now()}`,
          type: 'warning',
          sensor: 'light',
          message: `Light Warning: ${light.toFixed(0)} lux - Consider supplemental lighting`,
          value: light,
          threshold: light < 15000 ? ALERT_THRESHOLDS.light.warning.min : ALERT_THRESHOLDS.light.warning.max,
          timestamp,
          acknowledged: false
        });
      }
    }

    // Add new alerts that aren't duplicates
    setAlerts(prev => {
      const existingAlertKeys = prev.map(a => `${a.sensor}-${a.type}`);
      const filtered = newAlerts.filter(alert =>
        !existingAlertKeys.includes(`${alert.sensor}-${alert.type}`)
      );
      return [...prev, ...filtered];
    });

    // Play sound for critical alerts
    if (soundEnabled && newAlerts.some(alert => alert.type === 'critical')) {
      // Browser notification sound (if available)
      try {
        const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBieR3PSva2');
        audio.play().catch(() => {});
      } catch (e) {}
    }
  };

  useEffect(() => {
    if (sensorData) {
      checkSensorAlerts();
    }
  }, [sensorData]);

  const acknowledgeAlert = (alertId: string) => {
    setAlerts(prev => prev.map(alert =>
      alert.id === alertId ? { ...alert, acknowledged: true } : alert
    ));
  };

  const clearAlert = (alertId: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
  };

  const clearAllAlerts = () => {
    setAlerts([]);
  };

  const activeAlerts = alerts.filter(alert => !alert.acknowledged);
  const criticalAlerts = activeAlerts.filter(alert => alert.type === 'critical');

  if (!showAlerts) return null;

  return (
    <div className="fixed top-4 right-4 z-50 max-w-md space-y-2">
      {/* Alert Controls */}
      <div className="flex items-center justify-end space-x-2 mb-2">
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className={`p-2 rounded-lg ${soundEnabled ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'}`}
          title={soundEnabled ? 'Disable sound' : 'Enable sound'}
        >
          {soundEnabled ? <Bell className="w-4 h-4" /> : <BellOff className="w-4 h-4" />}
        </button>
        {activeAlerts.length > 0 && (
          <button
            onClick={clearAllAlerts}
            className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-sm hover:bg-gray-200"
          >
            Clear All
          </button>
        )}
        <button
          onClick={() => setShowAlerts(false)}
          className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Critical Alerts */}
      {criticalAlerts.map(alert => (
        <div
          key={alert.id}
          className="bg-red-500 text-white p-4 rounded-lg shadow-lg border-l-4 border-red-700 animate-pulse"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-2">
              {getAlertIcon(alert.sensor)}
              <div>
                <div className="font-bold">🚨 CRITICAL ALERT</div>
                <div className="text-sm">{alert.message}</div>
                <div className="text-xs opacity-90">
                  {alert.timestamp.toLocaleTimeString()}
                </div>
              </div>
            </div>
            <button
              onClick={() => acknowledgeAlert(alert.id)}
              className="ml-2 px-2 py-1 bg-red-700 rounded text-xs hover:bg-red-800"
            >
              ACK
            </button>
          </div>
        </div>
      ))}

      {/* Warning Alerts */}
      {activeAlerts.filter(alert => alert.type === 'warning').map(alert => (
        <div
          key={alert.id}
          className="bg-yellow-500 text-white p-3 rounded-lg shadow-lg"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-2">
              {getAlertIcon(alert.sensor)}
              <div>
                <div className="font-semibold">⚠️ Warning</div>
                <div className="text-sm">{alert.message}</div>
                <div className="text-xs opacity-90">
                  {alert.timestamp.toLocaleTimeString()}
                </div>
              </div>
            </div>
            <button
              onClick={() => clearAlert(alert.id)}
              className="ml-2 p-1 text-white hover:bg-yellow-600 rounded"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>
      ))}

      {/* Info Alerts */}
      {activeAlerts.filter(alert => alert.type === 'info').map(alert => (
        <div
          key={alert.id}
          className="bg-blue-500 text-white p-3 rounded-lg shadow-lg"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-2">
              {getAlertIcon(alert.sensor)}
              <div>
                <div className="font-semibold">ℹ️ Info</div>
                <div className="text-sm">{alert.message}</div>
                <div className="text-xs opacity-90">
                  {alert.timestamp.toLocaleTimeString()}
                </div>
              </div>
            </div>
            <button
              onClick={() => clearAlert(alert.id)}
              className="ml-2 p-1 text-white hover:bg-blue-600 rounded"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};