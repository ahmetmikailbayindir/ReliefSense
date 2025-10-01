/**
 * Copyright (c) 2025 ReliefSense & Ahmet Mikail Bayindir
 * SPDX-License-Identifier: MIT
 *
 * ReliefSense - Humanitarian Agriculture Platform
 * https://github.com/ahmetmikailbayindir/ReliefSense
 */

import React, { useState, useEffect } from 'react'
import { Activity, Droplets, Wind, Sun, TrendingUp, AlertCircle, Server, Network, Database, Cpu, HardDrive, Wifi, Shield, Terminal, Home, Sprout, Image, BookOpen, Users, Coins } from 'lucide-react'
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import NetworkMonitor from './components/NetworkMonitor'
import DatabaseManager from './components/DatabaseManager'
import SystemLogs from './components/SystemLogs'
import { CropManager } from './components/CropManager'
import LanguageSelector from './components/LanguageSelector'
import Screenshots from './components/Screenshots'
import Education from './components/Education'
import Collaboration from './components/Collaboration'
import Blockchain from './components/Blockchain'

interface SensorReading {
  sensor_id: string
  type: string
  value: number
  unit: string
  status: string
}

interface SystemMetrics {
  cpu: number
  memory: number
  disk: number
  network_in: number
  network_out: number
}

interface NetworkDevice {
  hostname: string
  ip: string
  status: 'online' | 'offline'
  latency: number
}

function App() {
  const [sensors, setSensors] = useState<SensorReading[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'dashboard' | 'network' | 'database' | 'logs' | 'crops' | 'screenshots' | 'education' | 'collaboration' | 'blockchain'>('dashboard')
  const [systemMetrics, setSystemMetrics] = useState<SystemMetrics>({ cpu: 0, memory: 0, disk: 0, network_in: 0, network_out: 0 })
  const [networkDevices] = useState<NetworkDevice[]>([
    { hostname: 'gateway-01', ip: '192.168.1.1', status: 'online', latency: 2 },
    { hostname: 'db-server', ip: '192.168.1.10', status: 'online', latency: 5 },
    { hostname: 'web-server', ip: '192.168.1.20', status: 'online', latency: 3 },
    { hostname: 'backup-nas', ip: '192.168.1.30', status: 'offline', latency: 0 },
  ])
  const [cpuHistory, setCpuHistory] = useState<Array<{time: string, value: number}>>([])

  useEffect(() => {
    const fetchSensors = async () => {
      try {
        // For GitHub Pages demo, use mock data
        const useMockData = import.meta.env.VITE_USE_MOCK_DATA !== 'false'

        if (useMockData) {
          // Generate mock sensor data
          const mockData = {
            readings: [
              {
                sensor_id: 'temp_01',
                type: 'temperature',
                value: Math.round((20 + Math.random() * 4 - 2) * 10) / 10,
                unit: '°C',
                status: 'normal'
              },
              {
                sensor_id: 'humid_01',
                type: 'humidity',
                value: Math.round((65 + Math.random() * 10 - 5) * 10) / 10,
                unit: '%',
                status: 'normal'
              },
              {
                sensor_id: 'co2_01',
                type: 'co2',
                value: Math.round(800 + Math.random() * 100 - 50),
                unit: 'ppm',
                status: 'normal'
              },
              {
                sensor_id: 'light_01',
                type: 'light',
                value: Math.round(25000 + Math.random() * 4000 - 2000),
                unit: 'lux',
                status: 'normal'
              }
            ]
          }
          setSensors(mockData.readings)
          setLoading(false)
        } else {
          // Use real API
          const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8001'
          const response = await fetch(`${apiUrl}/api/sensors/readings`)
          const data = await response.json()
          setSensors(data.readings)
          setLoading(false)
        }
      } catch (error) {
        console.error('Failed to fetch sensors:', error)
        setLoading(false)
      }
    }

    fetchSensors()
    const interval = setInterval(fetchSensors, 5000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const updateMetrics = () => {
      const now = new Date().toLocaleTimeString()
      const newCpu = Math.floor(Math.random() * 40) + 30
      const newMetrics = {
        cpu: newCpu,
        memory: Math.floor(Math.random() * 30) + 50,
        disk: 67,
        network_in: Math.floor(Math.random() * 500) + 100,
        network_out: Math.floor(Math.random() * 200) + 50
      }
      setSystemMetrics(newMetrics)

      setCpuHistory(prev => {
        const updated = [...prev, { time: now, value: newCpu }]
        return updated.slice(-20)
      })
    }

    updateMetrics()
    const interval = setInterval(updateMetrics, 3000)
    return () => clearInterval(interval)
  }, [])

  const getSensorIcon = (type: string) => {
    switch (type) {
      case 'temperature': return <Activity className="w-6 h-6" />
      case 'humidity': return <Droplets className="w-6 h-6" />
      case 'co2': return <Wind className="w-6 h-6" />
      case 'light': return <Sun className="w-6 h-6" />
      default: return <TrendingUp className="w-6 h-6" />
    }
  }

  const getSensorColor = (type: string) => {
    switch (type) {
      case 'temperature': return 'bg-red-500'
      case 'humidity': return 'bg-blue-500'
      case 'co2': return 'bg-green-500'
      case 'light': return 'bg-yellow-500'
      default: return 'bg-gray-500'
    }
  }

  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444']

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 shadow-xl">
        <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-4xl font-bold flex items-center gap-2 sm:gap-3 text-white">
                <Droplets className="w-6 h-6 sm:w-10 sm:h-10" />
                ReliefSense
              </h1>
              <p className="text-green-100 mt-1 sm:mt-2 text-sm sm:text-lg">Empowering Humanitarian Agriculture Through Technology</p>
              <p className="text-green-200 text-xs sm:text-sm mt-1">🌍 Refugee Camps • 🌱 Community Gardens • 💧 Smart Irrigation</p>
            </div>
            <div className="flex items-center gap-2 sm:gap-4 self-end sm:self-auto">
              <LanguageSelector />
              <div className="text-right hidden md:block">
                <p className="text-sm text-green-100">Ahmet Mikail Bayindir</p>
                <p className="text-xs text-green-200">Computer Systems Technician | Algonquin College</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white shadow-md border-b-2 border-gray-200 overflow-x-auto">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="flex gap-1 min-w-max">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-3 sm:py-4 font-semibold transition-all whitespace-nowrap text-sm sm:text-base ${
                activeTab === 'dashboard'
                  ? 'text-green-600 border-b-4 border-green-600 bg-green-50'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              <Home className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Dashboard</span>
            </button>
            <button
              onClick={() => setActiveTab('network')}
              className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-3 sm:py-4 font-semibold transition-all whitespace-nowrap text-sm sm:text-base ${
                activeTab === 'network'
                  ? 'text-blue-600 border-b-4 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              <Network className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Network Monitor</span>
            </button>
            <button
              onClick={() => setActiveTab('database')}
              className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-3 sm:py-4 font-semibold transition-all whitespace-nowrap text-sm sm:text-base ${
                activeTab === 'database'
                  ? 'text-purple-600 border-b-4 border-purple-600 bg-purple-50'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              <Database className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Database</span>
            </button>
            <button
              onClick={() => setActiveTab('crops')}
              className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-3 sm:py-4 font-semibold transition-all whitespace-nowrap text-sm sm:text-base ${
                activeTab === 'crops'
                  ? 'text-emerald-600 border-b-4 border-emerald-600 bg-emerald-50'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              <Sprout className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Crop Manager</span>
            </button>
            <button
              onClick={() => setActiveTab('logs')}
              className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-3 sm:py-4 font-semibold transition-all whitespace-nowrap text-sm sm:text-base ${
                activeTab === 'logs'
                  ? 'text-orange-600 border-b-4 border-orange-600 bg-orange-50'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              <Terminal className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">System Logs</span>
            </button>
            <button
              onClick={() => setActiveTab('screenshots')}
              className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-3 sm:py-4 font-semibold transition-all whitespace-nowrap text-sm sm:text-base ${
                activeTab === 'screenshots'
                  ? 'text-pink-600 border-b-4 border-pink-600 bg-pink-50'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              <Image className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Screenshots</span>
            </button>
            <button
              onClick={() => setActiveTab('education')}
              className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-3 sm:py-4 font-semibold transition-all whitespace-nowrap text-sm sm:text-base ${
                activeTab === 'education'
                  ? 'text-blue-600 border-b-4 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Education</span>
            </button>
            <button
              onClick={() => setActiveTab('collaboration')}
              className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-3 sm:py-4 font-semibold transition-all whitespace-nowrap text-sm sm:text-base ${
                activeTab === 'collaboration'
                  ? 'text-purple-600 border-b-4 border-purple-600 bg-purple-50'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              <Users className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Collaboration</span>
            </button>
            <button
              onClick={() => setActiveTab('blockchain')}
              className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-3 sm:py-4 font-semibold transition-all whitespace-nowrap text-sm sm:text-base ${
                activeTab === 'blockchain'
                  ? 'text-indigo-600 border-b-4 border-indigo-600 bg-indigo-50'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              <Coins className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Blockchain</span>
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-6">
        {/* Tab Content */}
        {activeTab === 'dashboard' && (
          <>
        {/* Mission Statement */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border-l-4 border-green-500">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">Our Mission</h2>
              <p className="text-gray-700 leading-relaxed">
                ReliefSense transforms humanitarian agriculture by providing <strong>accessible, offline-first technology</strong> that empowers
                refugee communities and displaced populations to grow food sustainably. Using IoT sensors and smart automation,
                we help communities achieve food security in challenging environments.
              </p>
            </div>
          </div>
        </div>

        {/* Impact Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-green-500">
            <div className="flex items-center justify-between mb-2">
              <Sun className="w-10 h-10 text-green-600" />
              <span className="text-3xl font-bold text-gray-800">3</span>
            </div>
            <h3 className="text-gray-600 text-sm font-semibold">Active Growing Sites</h3>
            <p className="text-xs text-gray-500 mt-1">Gaza, Lebanon, Jordan</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-500">
            <div className="flex items-center justify-between mb-2">
              <Droplets className="w-10 h-10 text-blue-600" />
              <span className="text-3xl font-bold text-gray-800">47%</span>
            </div>
            <h3 className="text-gray-600 text-sm font-semibold">Water Savings</h3>
            <p className="text-xs text-gray-500 mt-1">vs Traditional Methods</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-emerald-500">
            <div className="flex items-center justify-between mb-2">
              <Activity className="w-10 h-10 text-emerald-600" />
              <span className="text-3xl font-bold text-gray-800">24</span>
            </div>
            <h3 className="text-gray-600 text-sm font-semibold">Active Sensors</h3>
            <p className="text-xs text-gray-500 mt-1">Real-time Monitoring</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-orange-500">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-10 h-10 text-orange-600" />
              <span className="text-3xl font-bold text-gray-800">2.3x</span>
            </div>
            <h3 className="text-gray-600 text-sm font-semibold">Yield Increase</h3>
            <p className="text-xs text-gray-500 mt-1">Compared to Baseline</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Environmental Conditions Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-800">
              <Activity className="w-5 h-5 text-green-600" />
              Growing Conditions Trend
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={cpuHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="time" stroke="#6b7280" tick={{fontSize: 12}} />
                <YAxis stroke="#6b7280" tick={{fontSize: 12}} />
                <Tooltip contentStyle={{backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px'}} />
                <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={3} dot={{fill: '#10b981', r: 4}} name="Optimal Score %" />
              </LineChart>
            </ResponsiveContainer>
            <p className="text-sm text-gray-600 mt-4">
              Tracks environmental conditions optimality based on temperature, humidity, light, and CO2 levels.
            </p>
          </div>

          {/* Current Crops Growing */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-800">
              <Sun className="w-5 h-5 text-orange-600" />
              Active Crops
            </h2>
            <div className="space-y-4">
              <div className="border-l-4 border-green-500 pl-4 py-2">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold text-gray-800">🥬 Lettuce (Green Leaf)</p>
                  <span className="text-xs font-semibold px-2 py-1 rounded bg-green-100 text-green-700">
                    Day 34/45
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{width: '76%'}}></div>
                </div>
                <p className="text-sm text-gray-600">Health: Excellent • Water: Optimal • Harvest: 11 days</p>
              </div>

              <div className="border-l-4 border-blue-500 pl-4 py-2">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold text-gray-800">🥕 Carrots</p>
                  <span className="text-xs font-semibold px-2 py-1 rounded bg-blue-100 text-blue-700">
                    Day 18/70
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{width: '26%'}}></div>
                </div>
                <p className="text-sm text-gray-600">Health: Good • Water: Optimal • Harvest: 52 days</p>
              </div>

              <div className="border-l-4 border-yellow-500 pl-4 py-2">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold text-gray-800">🍅 Tomatoes (Cherry)</p>
                  <span className="text-xs font-semibold px-2 py-1 rounded bg-yellow-100 text-yellow-700">
                    Day 62/80
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{width: '78%'}}></div>
                </div>
                <p className="text-sm text-gray-600">Health: Excellent • Water: Monitor • Harvest: 18 days</p>
              </div>
            </div>
          </div>
        </div>

        {/* IoT Sensor Grid */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-800">
            <Wifi className="w-5 h-5 text-green-600" />
            Environmental Sensors (Real-time)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {loading ? (
              <div className="col-span-4 text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                <p className="mt-4 text-gray-600">Loading sensor data...</p>
              </div>
            ) : (
              sensors.map((sensor) => (
                <div key={sensor.sensor_id} className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-5 border-2 border-green-200 hover:border-green-400 transition-all hover:shadow-md">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`${getSensorColor(sensor.type)} text-white p-2.5 rounded-lg shadow-md`}>
                      {getSensorIcon(sensor.type)}
                    </div>
                    <span className="text-xs font-semibold text-green-700 bg-green-200 px-2 py-1 rounded">
                      {sensor.status}
                    </span>
                  </div>
                  <h3 className="text-sm text-gray-600 mb-1 capitalize font-medium">{sensor.type}</h3>
                  <p className="text-3xl font-bold text-gray-800">
                    {sensor.value}
                    <span className="text-base text-gray-500 ml-1">{sensor.unit}</span>
                  </p>
                  <p className="text-xs text-gray-500 mt-2">Sensor: {sensor.sensor_id}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Technical Skills & Features */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-6 text-gray-800">Platform Features & Technical Implementation</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-semibold text-lg mb-2 flex items-center gap-2 text-gray-800">
                <Wifi className="w-5 h-5 text-green-600" />
                IoT & Hardware Integration
              </h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Real-time sensor data collection (temp, humidity, CO2, light)</li>
                <li>• RESTful API architecture for IoT devices</li>
                <li>• Offline-first data synchronization</li>
                <li>• Network device monitoring & health checks</li>
              </ul>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-lg mb-2 flex items-center gap-2 text-gray-800">
                <Database className="w-5 h-5 text-blue-600" />
                Full-Stack Development
              </h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• React + TypeScript responsive frontend</li>
                <li>• Python Flask REST API backend</li>
                <li>• SQLite database management</li>
                <li>• Real-time data visualization (Recharts)</li>
              </ul>
            </div>
            <div className="border-l-4 border-orange-500 pl-4">
              <h3 className="font-semibold text-lg mb-2 flex items-center gap-2 text-gray-800">
                <Shield className="w-5 h-5 text-orange-600" />
                System Administration
              </h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Linux/Windows server deployment</li>
                <li>• Docker containerization ready</li>
                <li>• Network configuration & troubleshooting</li>
                <li>• Multi-language support (i18n)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Use Cases */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl shadow-lg p-8 mb-6 text-white">
          <h2 className="text-2xl font-bold mb-6">Real-World Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">🏕️ Refugee Camps</h3>
              <p className="text-green-100 text-sm">
                Provides food security through smart agriculture in resource-limited environments.
                Offline-first design ensures functionality without reliable internet.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">🌍 Community Gardens</h3>
              <p className="text-green-100 text-sm">
                Empowers local communities with data-driven insights for sustainable food production.
                Multi-language support ensures accessibility across diverse populations.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">💧 Water Conservation</h3>
              <p className="text-green-100 text-sm">
                Smart irrigation reduces water usage by 47% while improving crop yields.
                Critical for areas facing water scarcity and drought conditions.
              </p>
            </div>
          </div>
        </div>

          </>
        )}

        {activeTab === 'network' && <NetworkMonitor />}
        {activeTab === 'database' && <DatabaseManager />}
        {activeTab === 'crops' && <CropManager sensorData={{}} />}
        {activeTab === 'logs' && <SystemLogs />}
        {activeTab === 'screenshots' && <Screenshots />}
        {activeTab === 'education' && <Education />}
        {activeTab === 'collaboration' && <Collaboration />}
        {activeTab === 'blockchain' && <Blockchain />}

        {/* Footer */}
        <div className="mt-8 text-center pb-6">
          <p className="mb-3 text-gray-600">Built with React, TypeScript, Python Flask, SQLite, Tailwind CSS, and Recharts</p>
          <div className="flex items-center justify-center gap-4 mb-4">
            <a href="https://github.com/ahmetmikailbayindir/ReliefSense" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700 font-semibold">
              📂 GitHub Repository
            </a>
            <span className="text-gray-400">•</span>
            <a href="mailto:ahmetmikailbayindir@protonmail.com" className="text-green-600 hover:text-green-700 font-semibold">
              ✉️ Contact
            </a>
          </div>
          <p className="text-sm text-gray-500">
            💚 Built with passion for humanitarian impact | Computer Systems Technician - Networking @ Algonquin College
          </p>
        </div>
      </div>
    </div>
  )
}

export default App