import { Server, Wifi, Activity, AlertTriangle } from 'lucide-react'

interface NetworkDevice {
  hostname: string
  ip: string
  status: 'online' | 'offline' | 'warning'
  latency: number
  uptime?: string
  packetLoss?: number
}

export default function NetworkMonitor() {
  const devices: NetworkDevice[] = [
    { hostname: 'iot-gateway', ip: '192.168.1.1', status: 'online', latency: 2, uptime: '45d 12h', packetLoss: 0.1 },
    { hostname: 'sensor-hub-01', ip: '192.168.1.15', status: 'online', latency: 3, uptime: '45d 12h', packetLoss: 0 },
    { hostname: 'sensor-hub-02', ip: '192.168.1.16', status: 'warning', latency: 45, uptime: '12d 6h', packetLoss: 5.2 },
    { hostname: 'db-server', ip: '192.168.1.10', status: 'online', latency: 5, uptime: '90d 3h', packetLoss: 0.2 },
    { hostname: 'web-server', ip: '192.168.1.20', status: 'online', latency: 4, uptime: '90d 3h', packetLoss: 0 },
    { hostname: 'backup-nas', ip: '192.168.1.30', status: 'offline', latency: 0, uptime: '-', packetLoss: 100 },
    { hostname: 'wifi-ap-main', ip: '192.168.1.5', status: 'online', latency: 1, uptime: '120d 8h', packetLoss: 0.5 },
    { hostname: 'wifi-ap-field', ip: '192.168.1.6', status: 'online', latency: 2, uptime: '89d 22h', packetLoss: 1.2 },
  ]

  const statusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500/20 text-green-400 border-green-500'
      case 'offline': return 'bg-red-500/20 text-red-400 border-red-500'
      case 'warning': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500'
    }
  }

  const stats = {
    total: devices.length,
    online: devices.filter(d => d.status === 'online').length,
    offline: devices.filter(d => d.status === 'offline').length,
    warning: devices.filter(d => d.status === 'warning').length,
  }

  return (
    <div className="space-y-6">
      {/* Network Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Devices</p>
              <p className="text-3xl font-bold text-gray-800">{stats.total}</p>
            </div>
            <Wifi className="w-10 h-10 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Online</p>
              <p className="text-3xl font-bold text-green-600">{stats.online}</p>
            </div>
            <Server className="w-10 h-10 text-green-600" />
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
              <p className="text-sm text-gray-600">Offline</p>
              <p className="text-3xl font-bold text-red-600">{stats.offline}</p>
            </div>
            <Activity className="w-10 h-10 text-red-600" />
          </div>
        </div>
      </div>

      {/* Device List */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Server className="w-5 h-5 text-blue-600" />
          Network Devices
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {devices.map((device) => (
            <div key={device.ip} className="border-2 border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-all">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Server className={`w-6 h-6 ${device.status === 'online' ? 'text-green-600' : device.status === 'warning' ? 'text-yellow-600' : 'text-red-600'}`} />
                  <div>
                    <p className="font-semibold text-gray-800">{device.hostname}</p>
                    <p className="text-sm text-gray-500">{device.ip}</p>
                  </div>
                </div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${statusColor(device.status)}`}>
                  {device.status.toUpperCase()}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-sm">
                <div>
                  <p className="text-gray-500">Latency</p>
                  <p className={`font-semibold ${device.latency > 20 ? 'text-yellow-600' : 'text-green-600'}`}>
                    {device.latency}ms
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Uptime</p>
                  <p className="font-semibold text-gray-800">{device.uptime}</p>
                </div>
                <div>
                  <p className="text-gray-500">Packet Loss</p>
                  <p className={`font-semibold ${device.packetLoss! > 2 ? 'text-red-600' : 'text-green-600'}`}>
                    {device.packetLoss}%
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
