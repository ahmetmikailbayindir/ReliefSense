/**
 * Copyright (c) 2025 ReliefSense & Ahmet Mikail Bayindir
 * SPDX-License-Identifier: MIT
 */

import { Shield, Coins, FileCheck, Link2, TrendingUp, Award, CheckCircle, Lock } from 'lucide-react'

export default function Blockchain() {
  const deployment = {
    network: 'Ethereum Sepolia Testnet',
    chainId: 11155111,
    contracts: {
      ReliefToken: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
      HarvestTracking: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174'
    }
  }

  const tokenStats = {
    totalSupply: '1,000,000 RELIEF',
    distributed: '12,450 RELIEF',
    holders: 234,
    price: '$0.15 USD'
  }

  const recentTransactions = [
    { id: 1, type: 'Reward', farmer: 'Ahmad K.', amount: '250 RELIEF', reason: 'Tomato harvest - 180kg', txHash: '0xf4a3e6d9c8b7a1f2e5d4c3b2' },
    { id: 2, type: 'Harvest', farmer: 'Fatima A.', crop: 'Lettuce', quantity: '95kg', verified: true, txHash: '0xa9f8e7d6c5b4a3f2e1d0c9b8' },
    { id: 3, type: 'Reward', farmer: 'Hassan I.', amount: '180 RELIEF', reason: 'Training completion', txHash: '0xe5d4c3b2a1f0e9d8c7b6a5f4' },
    { id: 4, type: 'Harvest', farmer: 'Sarah M.', crop: 'Carrots', quantity: '120kg', verified: true, txHash: '0xb2a1f0e9d8c7b6a5f4e3d2c1' },
  ]

  const verifiedHarvests = [
    { location: 'Zaatari, Jordan', crop: 'Tomatoes', quantity: '1,240 kg', harvests: 23, verified: 23 },
    { location: 'Bekaa, Lebanon', crop: 'Lettuce', quantity: '890 kg', harvests: 18, verified: 18 },
    { location: 'Azraq, Jordan', crop: 'Carrots', quantity: '1,580 kg', harvests: 31, verified: 29 },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-xl shadow-lg p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Blockchain Integration</h2>
            <p className="text-indigo-100">
              Transparent, immutable tracking of harvests and incentive distribution
            </p>
          </div>
          <Shield className="w-16 h-16 text-indigo-200" />
        </div>
      </div>

      {/* Deployment Info */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Link2 className="w-6 h-6" />
          Smart Contract Deployment
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600">Network</span>
              <span className="font-semibold text-gray-800">{deployment.network}</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600">Chain ID</span>
              <span className="font-mono font-semibold text-gray-800">{deployment.chainId}</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="p-4 bg-indigo-50 rounded-lg">
              <p className="text-xs text-gray-600 mb-1">ReliefToken Contract</p>
              <div className="flex items-center gap-2">
                <code className="text-xs font-mono text-indigo-700 flex-1 truncate">
                  {deployment.contracts.ReliefToken}
                </code>
                <a
                  href={`https://sepolia.etherscan.io/address/${deployment.contracts.ReliefToken}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-700"
                >
                  <Link2 className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="p-4 bg-purple-50 rounded-lg">
              <p className="text-xs text-gray-600 mb-1">HarvestTracking Contract</p>
              <div className="flex items-center gap-2">
                <code className="text-xs font-mono text-purple-700 flex-1 truncate">
                  {deployment.contracts.HarvestTracking}
                </code>
                <a
                  href={`https://sepolia.etherscan.io/address/${deployment.contracts.HarvestTracking}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 hover:text-purple-700"
                >
                  <Link2 className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Token Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Supply</p>
              <p className="text-2xl font-bold text-gray-800">{tokenStats.totalSupply}</p>
            </div>
            <Coins className="w-10 h-10 text-yellow-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Distributed</p>
              <p className="text-2xl font-bold text-gray-800">{tokenStats.distributed}</p>
            </div>
            <TrendingUp className="w-10 h-10 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Token Holders</p>
              <p className="text-2xl font-bold text-gray-800">{tokenStats.holders}</p>
            </div>
            <Award className="w-10 h-10 text-purple-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Token Price</p>
              <p className="text-2xl font-bold text-gray-800">{tokenStats.price}</p>
            </div>
            <Coins className="w-10 h-10 text-blue-600" />
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <FileCheck className="w-6 h-6" />
          Recent Blockchain Transactions
        </h3>

        <div className="space-y-3">
          {recentTransactions.map((tx) => (
            <div key={tx.id} className="border-2 border-gray-200 rounded-lg p-4 hover:border-indigo-300 transition-all">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      tx.type === 'Reward' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                    }`}>
                      {tx.type === 'Reward' ? <Coins className="w-3 h-3 inline mr-1" /> : <FileCheck className="w-3 h-3 inline mr-1" />}
                      {tx.type}
                    </span>
                    <span className="font-semibold text-gray-800">👤 {tx.farmer}</span>
                    {'verified' in tx && tx.verified && (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    )}
                  </div>

                  {tx.type === 'Reward' ? (
                    <>
                      <p className="text-sm text-gray-700 mb-1">
                        <strong className="text-yellow-600">{tx.amount}</strong> - {tx.reason}
                      </p>
                    </>
                  ) : (
                    <p className="text-sm text-gray-700 mb-1">
                      Harvested <strong>{tx.quantity}</strong> of <strong>{tx.crop}</strong>
                    </p>
                  )}

                  <div className="flex items-center gap-2 mt-2">
                    <code className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {tx.txHash}
                    </code>
                    <a
                      href={`https://sepolia.etherscan.io/tx/${tx.txHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-700 text-xs flex items-center gap-1"
                    >
                      View on Etherscan <Link2 className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Verified Harvests */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <CheckCircle className="w-6 h-6 text-green-600" />
          Verified Harvest Records
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {verifiedHarvests.map((harvest, index) => (
            <div key={index} className="border-2 border-green-200 bg-green-50 rounded-lg p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-sm text-gray-600">{harvest.location}</p>
                  <p className="text-xl font-bold text-gray-800">{harvest.crop}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Total Quantity</span>
                  <span className="font-semibold text-green-700">{harvest.quantity}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Harvest Events</span>
                  <span className="font-semibold text-gray-800">{harvest.harvests}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Verified</span>
                  <span className="font-semibold text-green-600">{harvest.verified}/{harvest.harvests}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <Lock className="w-12 h-12 text-indigo-600" />
          <div>
            <h4 className="font-bold text-gray-800 mb-2">Blockchain Benefits for Humanitarian Agriculture</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-indigo-600 mt-1">✓</span>
                <span><strong>Transparency:</strong> All harvest data is publicly verifiable and auditable</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-600 mt-1">✓</span>
                <span><strong>Immutability:</strong> Records cannot be tampered with or deleted</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-600 mt-1">✓</span>
                <span><strong>Incentives:</strong> Tokenized rewards motivate community participation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-600 mt-1">✓</span>
                <span><strong>Trust:</strong> Verified by authorized humanitarian organizations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-600 mt-1">✓</span>
                <span><strong>Accountability:</strong> Complete audit trail for donor reporting</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
