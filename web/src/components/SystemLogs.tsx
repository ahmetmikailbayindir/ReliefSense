import { Terminal, AlertCircle, Info, AlertTriangle, XCircle } from 'lucide-react'
import { useState } from 'react'

export default function SystemLogs() {
  const [filter, setFilter] = useState<'all' | 'info' | 'warning' | 'error'>('all')

  const logs = [
    { time: '12:45:33', level: 'INFO', category: 'NETWORK', message: 'Sensor network health check completed - all devices responding' },
    { time: '12:45:28', level: 'INFO', category: 'DATABASE', message: 'Automatic backup completed successfully - 16.2 MB backed up' },
    { time: '12:45:15', level: 'WARNING', category: 'SENSOR', message: 'High humidity detected (78%) - irrigation system paused' },
    { time: '12:44:52', level: 'INFO', category: 'API', message: 'REST API request handled - GET /api/sensors/readings (142ms)' },
    { time: '12:44:33', level: 'ERROR', category: 'NETWORK', message: 'Connection timeout to backup-nas (192.168.1.30) - retry attempt 1/3' },
    { time: '12:44:12', level: 'INFO', category: 'SYSTEM', message: 'CPU usage: 34%, Memory: 62%, Disk: 67% - within normal parameters' },
    { time: '12:43:55', level: 'WARNING', category: 'SENSOR', message: 'sensor-hub-02 high latency detected (45ms) - investigating' },
    { time: '12:43:40', level: 'INFO', category: 'DATABASE', message: 'Query executed successfully - SELECT FROM sensor_readings (23ms)' },
    { time: '12:43:21', level: 'INFO', category: 'AUTH', message: 'User authentication successful - admin@reliefsense.org' },
    { time: '12:43:05', level: 'WARNING', category: 'STORAGE', message: 'Disk usage approaching 70% - cleanup recommended' },
    { time: '12:42:50', level: 'ERROR', category: 'SENSOR', message: 'Failed to read from sensor temp_03 - device may be offline' },
    { time: '12:42:31', level: 'INFO', category: 'SYNC', message: 'Offline queue processed - 23 actions synchronized' },
    { time: '12:42:15', level: 'INFO', category: 'NETWORK', message: 'Network scan completed - 8 devices discovered, 7 online, 1 offline' },
    { time: '12:42:00', level: 'INFO', category: 'SYSTEM', message: 'Service started - ReliefSense v1.0.0 initialized successfully' },
  ]

  const filteredLogs = filter === 'all' ? logs : logs.filter(log => log.level.toLowerCase() === filter)

  const getIcon = (level: string) => {
    switch (level) {
      case 'INFO': return <Info className="w-5 h-5 text-blue-600" />
      case 'WARNING': return <AlertTriangle className="w-5 h-5 text-yellow-600" />
      case 'ERROR': return <XCircle className="w-5 h-5 text-red-600" />
      default: return <AlertCircle className="w-5 h-5 text-gray-600" />
    }
  }

  const getColorClasses = (level: string) => {
    switch (level) {
      case 'INFO': return 'bg-blue-50 border-blue-200'
      case 'WARNING': return 'bg-yellow-50 border-yellow-200'
      case 'ERROR': return 'bg-red-50 border-red-200'
      default: return 'bg-gray-50 border-gray-200'
    }
  }

  const stats = {
    total: logs.length,
    info: logs.filter(l => l.level === 'INFO').length,
    warning: logs.filter(l => l.level === 'WARNING').length,
    error: logs.filter(l => l.level === 'ERROR').length,
  }

  return (
    <div className="space-y-6">
      {/* Log Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Logs</p>
              <p className="text-3xl font-bold text-gray-800">{stats.total}</p>
            </div>
            <Terminal className="w-10 h-10 text-gray-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Info</p>
              <p className="text-3xl font-bold text-blue-600">{stats.info}</p>
            </div>
            <Info className="w-10 h-10 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Warnings</p>
              <p className="text-3xl font-bold text-yellow-600">{stats.warning}</p>
            </div>
            <AlertTriangle className="w-10 h-10 text-yellow-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Errors</p>
              <p className="text-3xl font-bold text-red-600">{stats.error}</p>
            </div>
            <XCircle className="w-10 h-10 text-red-600" />
          </div>
        </div>
      </div>

      {/* Logs Viewer */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Terminal className="w-5 h-5 text-gray-700" />
            System Logs
          </h2>

          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg transition-all ${filter === 'all' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('info')}
              className={`px-4 py-2 rounded-lg transition-all ${filter === 'info' ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'}`}
            >
              Info
            </button>
            <button
              onClick={() => setFilter('warning')}
              className={`px-4 py-2 rounded-lg transition-all ${filter === 'warning' ? 'bg-yellow-600 text-white' : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'}`}
            >
              Warnings
            </button>
            <button
              onClick={() => setFilter('error')}
              className={`px-4 py-2 rounded-lg transition-all ${filter === 'error' ? 'bg-red-600 text-white' : 'bg-red-100 text-red-700 hover:bg-red-200'}`}
            >
              Errors
            </button>
          </div>
        </div>

        <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm max-h-[500px] overflow-y-auto">
          {filteredLogs.map((log, idx) => (
            <div key={idx} className={`mb-2 p-3 rounded border-l-4 ${getColorClasses(log.level)}`}>
              <div className="flex items-start gap-3">
                {getIcon(log.level)}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-gray-600 font-semibold">[{log.time}]</span>
                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                      log.level === 'INFO' ? 'bg-blue-200 text-blue-800' :
                      log.level === 'WARNING' ? 'bg-yellow-200 text-yellow-800' :
                      'bg-red-200 text-red-800'
                    }`}>
                      {log.level}
                    </span>
                    <span className="px-2 py-0.5 rounded text-xs font-semibold bg-gray-200 text-gray-700">
                      {log.category}
                    </span>
                  </div>
                  <p className="text-gray-700">{log.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
          <p>Showing {filteredLogs.length} of {logs.length} logs (last 15 minutes)</p>
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all">
            Load More
          </button>
        </div>
      </div>
    </div>
  )
}
