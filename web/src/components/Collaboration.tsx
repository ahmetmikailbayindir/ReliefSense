/**
 * Copyright (c) 2025 ReliefSense & Ahmet Mikail Bayindir
 * SPDX-License-Identifier: MIT
 */

import { Users, MessageSquare, FolderKanban, Calendar, Bell, CheckSquare, TrendingUp, MapPin } from 'lucide-react'
import { useState } from 'react'

interface Project {
  id: string
  name: string
  location: string
  status: 'planning' | 'active' | 'completed'
  team: number
  progress: number
  deadline: string
  priority: 'low' | 'medium' | 'high'
}

interface Task {
  id: string
  title: string
  assignee: string
  status: 'todo' | 'in-progress' | 'done'
  priority: 'low' | 'medium' | 'high'
  dueDate: string
}

interface Message {
  id: string
  user: string
  message: string
  timestamp: string
  avatar: string
}

export default function Collaboration() {
  const [activeView, setActiveView] = useState<'projects' | 'tasks' | 'chat'>('projects')

  const projects: Project[] = [
    {
      id: 'p1',
      name: 'Zaatari Camp Expansion',
      location: 'Zaatari, Jordan',
      status: 'active',
      team: 12,
      progress: 67,
      deadline: '2025-11-15',
      priority: 'high'
    },
    {
      id: 'p2',
      name: 'Bekaa Valley Training Center',
      location: 'Bekaa, Lebanon',
      status: 'planning',
      team: 8,
      progress: 23,
      deadline: '2025-12-01',
      priority: 'medium'
    },
    {
      id: 'p3',
      name: 'Azraq Hydroponic Setup',
      location: 'Azraq, Jordan',
      status: 'active',
      team: 15,
      progress: 89,
      deadline: '2025-10-20',
      priority: 'high'
    },
    {
      id: 'p4',
      name: 'Community Garden Network',
      location: 'Multiple Locations',
      status: 'completed',
      team: 25,
      progress: 100,
      deadline: '2025-09-10',
      priority: 'medium'
    }
  ]

  const tasks: Task[] = [
    { id: 't1', title: 'Install 15 new temperature sensors', assignee: 'Ahmad K.', status: 'in-progress', priority: 'high', dueDate: '2025-10-05' },
    { id: 't2', title: 'Configure MQTT broker for Zone B', assignee: 'Sarah M.', status: 'todo', priority: 'high', dueDate: '2025-10-08' },
    { id: 't3', title: 'Train 20 volunteers on system usage', assignee: 'Hassan I.', status: 'in-progress', priority: 'medium', dueDate: '2025-10-12' },
    { id: 't4', title: 'Set up backup water tanks', assignee: 'Fatima A.', status: 'done', priority: 'high', dueDate: '2025-09-28' },
    { id: 't5', title: 'Review quarterly harvest reports', assignee: 'Mohammed K.', status: 'todo', priority: 'low', dueDate: '2025-10-15' },
    { id: 't6', title: 'Update crop rotation schedule', assignee: 'Layla R.', status: 'done', priority: 'medium', dueDate: '2025-09-25' },
  ]

  const messages: Message[] = [
    { id: 'm1', user: 'Ahmad K.', message: 'Sensor installation in Zone A completed. All readings normal.', timestamp: '10:23 AM', avatar: '👨‍🔧' },
    { id: 'm2', user: 'Sarah M.', message: 'MQTT broker configured. Testing connection now.', timestamp: '10:45 AM', avatar: '👩‍💻' },
    { id: 'm3', user: 'Hassan I.', message: 'Training session went great! 18/20 volunteers certified.', timestamp: '11:12 AM', avatar: '👨‍🏫' },
    { id: 'm4', user: 'Fatima A.', message: 'Water tanks installed and operational. Capacity: 2000L', timestamp: '11:34 AM', avatar: '👩‍🔧' },
    { id: 'm5', user: 'Mohammed K.', message: 'Tomato harvest exceeded expectations by 23%!', timestamp: '12:05 PM', avatar: '👨‍🌾' },
  ]

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-700'
      case 'planning': return 'bg-blue-100 text-blue-700'
      case 'completed': return 'bg-gray-100 text-gray-700'
      case 'todo': return 'bg-yellow-100 text-yellow-700'
      case 'in-progress': return 'bg-blue-100 text-blue-700'
      case 'done': return 'bg-green-100 text-green-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'high': return 'bg-red-100 text-red-700'
      case 'medium': return 'bg-orange-100 text-orange-700'
      case 'low': return 'bg-blue-100 text-blue-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl shadow-lg p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Project Collaboration</h2>
            <p className="text-purple-100">
              Coordinate teams, manage tasks, and track progress across humanitarian agriculture projects
            </p>
          </div>
          <Users className="w-16 h-16 text-purple-200" />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Projects</p>
              <p className="text-3xl font-bold text-gray-800">
                {projects.filter(p => p.status === 'active').length}
              </p>
            </div>
            <FolderKanban className="w-10 h-10 text-purple-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Team Members</p>
              <p className="text-3xl font-bold text-gray-800">60</p>
            </div>
            <Users className="w-10 h-10 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Tasks Completed</p>
              <p className="text-3xl font-bold text-gray-800">
                {tasks.filter(t => t.status === 'done').length}/{tasks.length}
              </p>
            </div>
            <CheckSquare className="w-10 h-10 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg. Progress</p>
              <p className="text-3xl font-bold text-gray-800">
                {Math.round(projects.reduce((acc, p) => acc + p.progress, 0) / projects.length)}%
              </p>
            </div>
            <TrendingUp className="w-10 h-10 text-orange-600" />
          </div>
        </div>
      </div>

      {/* View Tabs */}
      <div className="bg-white rounded-xl shadow-lg">
        <div className="border-b border-gray-200">
          <div className="flex">
            <button
              onClick={() => setActiveView('projects')}
              className={`flex items-center gap-2 px-6 py-4 font-semibold transition-all ${
                activeView === 'projects'
                  ? 'text-purple-600 border-b-4 border-purple-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <FolderKanban className="w-5 h-5" />
              Projects
            </button>
            <button
              onClick={() => setActiveView('tasks')}
              className={`flex items-center gap-2 px-6 py-4 font-semibold transition-all ${
                activeView === 'tasks'
                  ? 'text-purple-600 border-b-4 border-purple-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <CheckSquare className="w-5 h-5" />
              Tasks
            </button>
            <button
              onClick={() => setActiveView('chat')}
              className={`flex items-center gap-2 px-6 py-4 font-semibold transition-all ${
                activeView === 'chat'
                  ? 'text-purple-600 border-b-4 border-purple-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <MessageSquare className="w-5 h-5" />
              Team Chat
              <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">3</span>
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Projects View */}
          {activeView === 'projects' && (
            <div className="space-y-4">
              {projects.map((project) => (
                <div key={project.id} className="border-2 border-gray-200 rounded-lg p-6 hover:border-purple-400 transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-lg font-bold text-gray-800">{project.name}</h4>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(project.status)}`}>
                          {project.status.toUpperCase()}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(project.priority)}`}>
                          {project.priority.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {project.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {project.team} team members
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Due: {project.deadline}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-semibold text-gray-800">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-purple-600 h-3 rounded-full transition-all"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tasks View */}
          {activeView === 'tasks' && (
            <div className="space-y-3">
              <div className="flex gap-4 mb-4">
                <button className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg font-semibold">
                  To Do ({tasks.filter(t => t.status === 'todo').length})
                </button>
                <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-semibold">
                  In Progress ({tasks.filter(t => t.status === 'in-progress').length})
                </button>
                <button className="px-4 py-2 bg-green-100 text-green-700 rounded-lg font-semibold">
                  Done ({tasks.filter(t => t.status === 'done').length})
                </button>
              </div>

              {tasks.map((task) => (
                <div
                  key={task.id}
                  className={`flex items-center justify-between p-4 rounded-lg border-2 ${
                    task.status === 'done'
                      ? 'bg-green-50 border-green-200'
                      : 'bg-white border-gray-200 hover:border-purple-300'
                  }`}
                >
                  <div className="flex items-center gap-4 flex-1">
                    <input
                      type="checkbox"
                      checked={task.status === 'done'}
                      className="w-5 h-5 text-purple-600"
                      readOnly
                    />
                    <div className="flex-1">
                      <p className={`font-semibold ${task.status === 'done' ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                        {task.title}
                      </p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-gray-600">👤 {task.assignee}</span>
                        <span className="text-xs text-gray-500">📅 {task.dueDate}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(task.status)}`}>
                      {task.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Chat View */}
          {activeView === 'chat' && (
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto space-y-3">
                {messages.map((msg) => (
                  <div key={msg.id} className="bg-white rounded-lg p-4 shadow">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{msg.avatar}</span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-gray-800">{msg.user}</span>
                          <span className="text-xs text-gray-500">{msg.timestamp}</span>
                        </div>
                        <p className="text-sm text-gray-700">{msg.message}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                />
                <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all">
                  Send
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Bell className="w-5 h-5" />
          Recent Activity
        </h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3 text-sm">
            <span className="text-green-600">✓</span>
            <p className="text-gray-700"><strong>Fatima A.</strong> completed "Set up backup water tanks"</p>
            <span className="text-xs text-gray-500 ml-auto">2h ago</span>
          </div>
          <div className="flex items-start gap-3 text-sm">
            <span className="text-blue-600">→</span>
            <p className="text-gray-700"><strong>Ahmad K.</strong> started working on "Install 15 new temperature sensors"</p>
            <span className="text-xs text-gray-500 ml-auto">4h ago</span>
          </div>
          <div className="flex items-start gap-3 text-sm">
            <span className="text-purple-600">★</span>
            <p className="text-gray-700">New project <strong>"Azraq Hydroponic Setup"</strong> is 89% complete</p>
            <span className="text-xs text-gray-500 ml-auto">6h ago</span>
          </div>
        </div>
      </div>
    </div>
  )
}
