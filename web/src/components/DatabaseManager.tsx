import { Database, Table, Search, Download } from 'lucide-react'
import { useState } from 'react'

export default function DatabaseManager() {
  const [selectedTable, setSelectedTable] = useState('sensor_readings')

  const tables = [
    { name: 'sensor_readings', rows: 45238, size: '12.5 MB' },
    { name: 'crop_cycles', rows: 156, size: '84 KB' },
    { name: 'alert_history', rows: 1893, size: '542 KB' },
    { name: 'system_logs', rows: 8421, size: '2.1 MB' },
    { name: 'user_actions', rows: 3291, size: '892 KB' },
  ]

  const sampleData = selectedTable === 'sensor_readings' ? [
    { id: 45238, timestamp: '2025-09-30 12:45:33', sensor_id: 'temp_01', value: 21.3, unit: '°C', status: 'normal' },
    { id: 45237, timestamp: '2025-09-30 12:45:28', sensor_id: 'humid_01', value: 67.2, unit: '%', status: 'normal' },
    { id: 45236, timestamp: '2025-09-30 12:45:23', sensor_id: 'co2_01', value: 823, unit: 'ppm', status: 'normal' },
    { id: 45235, timestamp: '2025-09-30 12:45:18', sensor_id: 'light_01', value: 24500, unit: 'lux', status: 'normal' },
    { id: 45234, timestamp: '2025-09-30 12:45:13', sensor_id: 'temp_01', value: 21.4, unit: '°C', status: 'normal' },
  ] : [
    { id: 156, crop_name: 'Lettuce', variety: 'Green Leaf', plant_date: '2025-08-25', status: 'growing' },
    { id: 155, crop_name: 'Tomatoes', variety: 'Cherry', plant_date: '2025-07-28', status: 'harvesting' },
    { id: 154, crop_name: 'Carrots', variety: 'Nantes', plant_date: '2025-09-12', status: 'growing' },
  ]

  return (
    <div className="space-y-6">
      {/* Database Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Tables</p>
              <p className="text-3xl font-bold text-gray-800">{tables.length}</p>
            </div>
            <Table className="w-10 h-10 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Records</p>
              <p className="text-3xl font-bold text-gray-800">59k+</p>
            </div>
            <Database className="w-10 h-10 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Database Size</p>
              <p className="text-3xl font-bold text-gray-800">16 MB</p>
            </div>
            <Download className="w-10 h-10 text-purple-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Last Backup</p>
              <p className="text-lg font-bold text-gray-800">2h ago</p>
            </div>
            <Database className="w-10 h-10 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Table Browser */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Table List */}
        <div className="lg:col-span-1 bg-white rounded-xl shadow-lg p-6">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Table className="w-5 h-5" />
            Tables
          </h3>
          <div className="space-y-2">
            {tables.map((table) => (
              <button
                key={table.name}
                onClick={() => setSelectedTable(table.name)}
                className={`w-full text-left p-3 rounded-lg transition-all ${
                  selectedTable === table.name
                    ? 'bg-blue-50 border-2 border-blue-500 text-blue-700'
                    : 'bg-gray-50 border-2 border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                <p className="font-semibold text-sm">{table.name}</p>
                <p className="text-xs text-gray-500">{table.rows.toLocaleString()} rows • {table.size}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Table Data */}
        <div className="lg:col-span-3 bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <Search className="w-5 h-5" />
              {selectedTable}
            </h3>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  {Object.keys(sampleData[0]).map((key) => (
                    <th key={key} className="text-left py-3 px-4 text-sm font-semibold text-gray-700 uppercase">
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sampleData.map((row, idx) => (
                  <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                    {Object.values(row).map((value, vidx) => (
                      <td key={vidx} className="py-3 px-4 text-sm text-gray-700">
                        {String(value)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
            <p>Showing 5 of {tables.find(t => t.name === selectedTable)?.rows.toLocaleString()} records</p>
            <div className="flex gap-2">
              <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">Previous</button>
              <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">Next</button>
            </div>
          </div>
        </div>
      </div>

      {/* SQL Query Interface */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="font-bold text-gray-800 mb-4">SQL Query Interface</h3>
        <textarea
          className="w-full h-32 p-4 border-2 border-gray-300 rounded-lg font-mono text-sm focus:border-blue-500 focus:outline-none"
          placeholder="SELECT * FROM sensor_readings WHERE timestamp > '2025-09-30' ORDER BY timestamp DESC LIMIT 10;"
          defaultValue="SELECT * FROM sensor_readings WHERE timestamp > '2025-09-30' ORDER BY timestamp DESC LIMIT 10;"
        />
        <div className="flex gap-2 mt-4">
          <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all">
            Execute Query
          </button>
          <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all">
            Clear
          </button>
        </div>
      </div>
    </div>
  )
}
