import { Monitor, Database, Network, FileText } from 'lucide-react'

export default function Screenshots() {
  const screenshots = [
    {
      title: 'Dashboard Overview',
      description: 'Real-time monitoring of growing conditions, active crops, and environmental sensors',
      image: '/ReliefSense/screenshots/Dashboard.png',
      icon: Monitor,
      features: ['Live sensor data', 'Crop tracking', 'Environmental trends', 'Platform features']
    },
    {
      title: 'Database Manager',
      description: 'SQLite database management with table browser and SQL query interface',
      image: '/ReliefSense/screenshots/Database.png',
      icon: Database,
      features: ['59k+ records', '5 data tables', 'SQL query tool', 'CSV export']
    },
    {
      title: 'Network Monitor',
      description: 'IoT device management and network topology visualization',
      image: '/ReliefSense/screenshots/Network-Monitor.png',
      icon: Network,
      features: ['Device status', 'Network topology', 'Health monitoring', 'Real-time alerts']
    },
    {
      title: 'System Logs',
      description: 'Comprehensive logging system for debugging and monitoring',
      image: '/ReliefSense/screenshots/System-Logs.png',
      icon: FileText,
      features: ['Multi-level logs', 'Service tracking', 'Error monitoring', 'Search & filter']
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-humanitarian-600 to-humanitarian-700 rounded-xl shadow-lg p-8 text-white">
        <h2 className="text-3xl font-bold mb-2">Platform Screenshots</h2>
        <p className="text-humanitarian-100">
          Interactive demonstration of the ReliefSense platform interface and features
        </p>
      </div>

      {/* Screenshots Grid */}
      <div className="space-y-8">
        {screenshots.map((screenshot, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Info Panel */}
              <div className="p-6 lg:p-8 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-humanitarian-100 rounded-lg">
                    <screenshot.icon className="w-6 h-6 text-humanitarian-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">{screenshot.title}</h3>
                </div>

                <p className="text-gray-600">{screenshot.description}</p>

                <div className="space-y-2">
                  <p className="text-sm font-semibold text-gray-700 uppercase">Key Features:</p>
                  <ul className="space-y-1">
                    {screenshot.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="text-humanitarian-600 mt-1">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Screenshot Image */}
              <div className="lg:col-span-2 p-4 bg-gray-50 flex items-center justify-center">
                <div className="w-full rounded-lg overflow-hidden shadow-lg border-2 border-gray-200">
                  <img
                    src={screenshot.image}
                    alt={screenshot.title}
                    className="w-full h-auto object-contain"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Technical Note */}
      <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Database className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h4 className="font-bold text-blue-900 mb-2">Technical Implementation</h4>
            <p className="text-sm text-blue-800 mb-2">
              This demo uses <strong>mock data</strong> to simulate real-world operations without requiring backend infrastructure.
              In production deployment:
            </p>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• <strong>SQLite database</strong> stores sensor readings, crop cycles, and system logs</li>
              <li>• <strong>REST API</strong> (Python Flask) provides data access and device management</li>
              <li>• <strong>MQTT broker</strong> handles real-time IoT sensor communication</li>
              <li>• <strong>React frontend</strong> with TypeScript for type-safe development</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
