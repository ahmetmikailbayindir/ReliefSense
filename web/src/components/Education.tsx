/**
 * Copyright (c) 2025 ReliefSense & Ahmet Mikail Bayindir
 * SPDX-License-Identifier: MIT
 */

import { BookOpen, Video, FileText, Award, Users, Clock, CheckCircle, PlayCircle, Download } from 'lucide-react'
import { useState } from 'react'

interface Course {
  id: string
  title: string
  category: string
  level: 'beginner' | 'intermediate' | 'advanced'
  duration: string
  progress: number
  enrolled: number
  modules: number
  description: string
  instructor: string
}

interface Module {
  id: string
  title: string
  type: 'video' | 'reading' | 'quiz' | 'practical'
  duration: string
  completed: boolean
}

export default function Education() {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null)

  const courses: Course[] = [
    {
      id: 'iot-basics',
      title: 'IoT Fundamentals for Agriculture',
      category: 'Technology',
      level: 'beginner',
      duration: '4 weeks',
      progress: 65,
      enrolled: 234,
      modules: 12,
      description: 'Learn the basics of IoT sensors, data collection, and smart agriculture systems',
      instructor: 'Dr. Sarah Ahmed'
    },
    {
      id: 'sustainable-farming',
      title: 'Sustainable Farming Practices',
      category: 'Agriculture',
      level: 'intermediate',
      duration: '6 weeks',
      progress: 40,
      enrolled: 456,
      modules: 18,
      description: 'Master water conservation, soil health, crop rotation, and organic farming methods',
      instructor: 'Prof. Hassan Ibrahim'
    },
    {
      id: 'hydroponics',
      title: 'Hydroponic Systems Setup',
      category: 'Technology',
      level: 'advanced',
      duration: '8 weeks',
      progress: 0,
      enrolled: 189,
      modules: 24,
      description: 'Build and maintain hydroponic growing systems for refugee camps and urban gardens',
      instructor: 'Eng. Fatima Al-Mansour'
    },
    {
      id: 'crop-management',
      title: 'Crop Planning & Management',
      category: 'Agriculture',
      level: 'beginner',
      duration: '5 weeks',
      progress: 100,
      enrolled: 567,
      modules: 15,
      description: 'Plan seasonal crops, manage planting cycles, and optimize yields in challenging environments',
      instructor: 'Dr. Mohammed Khalil'
    },
    {
      id: 'data-analysis',
      title: 'Agricultural Data Analysis',
      category: 'Technology',
      level: 'advanced',
      duration: '6 weeks',
      progress: 25,
      enrolled: 123,
      modules: 20,
      description: 'Analyze sensor data, create reports, and make data-driven farming decisions',
      instructor: 'Dr. Amira Hassan'
    },
    {
      id: 'community-leadership',
      title: 'Community Agriculture Leadership',
      category: 'Management',
      level: 'intermediate',
      duration: '4 weeks',
      progress: 0,
      enrolled: 345,
      modules: 10,
      description: 'Lead community gardens, train volunteers, and coordinate humanitarian agriculture projects',
      instructor: 'Layla Rashid'
    }
  ]

  const sampleModules: Module[] = [
    { id: 'm1', title: 'Introduction to IoT Sensors', type: 'video', duration: '25 min', completed: true },
    { id: 'm2', title: 'Types of Agricultural Sensors', type: 'reading', duration: '15 min', completed: true },
    { id: 'm3', title: 'Sensor Placement Best Practices', type: 'video', duration: '30 min', completed: true },
    { id: 'm4', title: 'Knowledge Check: Sensor Basics', type: 'quiz', duration: '10 min', completed: true },
    { id: 'm5', title: 'Hands-on: Install Temperature Sensor', type: 'practical', duration: '45 min', completed: true },
    { id: 'm6', title: 'Data Collection Methods', type: 'video', duration: '20 min', completed: true },
    { id: 'm7', title: 'Understanding MQTT Protocol', type: 'reading', duration: '25 min', completed: true },
    { id: 'm8', title: 'Setting Up Your First Gateway', type: 'video', duration: '35 min', completed: false },
    { id: 'm9', title: 'Troubleshooting Common Issues', type: 'reading', duration: '20 min', completed: false },
    { id: 'm10', title: 'Practical Project: Build Monitoring System', type: 'practical', duration: '90 min', completed: false },
  ]

  const getLevelColor = (level: string) => {
    switch(level) {
      case 'beginner': return 'bg-green-100 text-green-700'
      case 'intermediate': return 'bg-blue-100 text-blue-700'
      case 'advanced': return 'bg-purple-100 text-purple-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'video': return <Video className="w-4 h-4" />
      case 'reading': return <FileText className="w-4 h-4" />
      case 'quiz': return <CheckCircle className="w-4 h-4" />
      case 'practical': return <Award className="w-4 h-4" />
      default: return <BookOpen className="w-4 h-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Education & Training Hub</h2>
            <p className="text-blue-100">
              Empowering humanitarian workers with agricultural technology skills
            </p>
          </div>
          <BookOpen className="w-16 h-16 text-blue-200" />
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Courses</p>
              <p className="text-3xl font-bold text-gray-800">{courses.length}</p>
            </div>
            <BookOpen className="w-10 h-10 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Students</p>
              <p className="text-3xl font-bold text-gray-800">1.9k+</p>
            </div>
            <Users className="w-10 h-10 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-3xl font-bold text-gray-800">3</p>
            </div>
            <Award className="w-10 h-10 text-yellow-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">In Progress</p>
              <p className="text-3xl font-bold text-gray-800">3</p>
            </div>
            <Clock className="w-10 h-10 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Course Catalog */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Available Courses</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="border-2 border-gray-200 rounded-lg p-5 hover:border-blue-500 transition-all cursor-pointer"
              onClick={() => setSelectedCourse(course.id)}
            >
              <div className="flex items-start justify-between mb-3">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getLevelColor(course.level)}`}>
                  {course.level.toUpperCase()}
                </span>
                <span className="text-xs text-gray-500">{course.category}</span>
              </div>

              <h4 className="font-bold text-gray-800 mb-2">{course.title}</h4>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{course.description}</p>

              <div className="space-y-2 mb-3">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Progress</span>
                  <span className="font-semibold">{course.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                <span className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {course.enrolled} enrolled
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {course.duration}
                </span>
              </div>

              <div className="border-t pt-3">
                <p className="text-xs text-gray-600">
                  👤 <span className="font-semibold">{course.instructor}</span>
                </p>
                <p className="text-xs text-gray-500 mt-1">{course.modules} modules</p>
              </div>

              <button className="w-full mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
                {course.progress > 0 ? (
                  <>
                    <PlayCircle className="w-4 h-4" />
                    Continue Learning
                  </>
                ) : (
                  <>
                    <BookOpen className="w-4 h-4" />
                    Start Course
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Course Details (Sample) */}
      {selectedCourse && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800">
              {courses.find(c => c.id === selectedCourse)?.title} - Course Modules
            </h3>
            <button
              onClick={() => setSelectedCourse(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕ Close
            </button>
          </div>

          <div className="space-y-3">
            {sampleModules.map((module, index) => (
              <div
                key={module.id}
                className={`flex items-center justify-between p-4 rounded-lg border-2 ${
                  module.completed
                    ? 'bg-green-50 border-green-200'
                    : 'bg-gray-50 border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    module.completed ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-600'
                  }`}>
                    {module.completed ? '✓' : index + 1}
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-gray-600">
                      {getTypeIcon(module.type)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{module.title}</p>
                      <p className="text-xs text-gray-500 capitalize">{module.type} • {module.duration}</p>
                    </div>
                  </div>
                </div>

                {module.completed ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-all">
                    Start
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Resources Section */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Download className="w-6 h-6" />
          Downloadable Resources
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="border-2 border-gray-200 rounded-lg p-4 hover:border-blue-400 transition-all">
            <FileText className="w-8 h-8 text-blue-600 mb-2" />
            <h4 className="font-semibold text-gray-800 mb-1">Sensor Installation Guide</h4>
            <p className="text-xs text-gray-600 mb-3">PDF • 2.4 MB • 24 pages</p>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-semibold">Download →</button>
          </div>

          <div className="border-2 border-gray-200 rounded-lg p-4 hover:border-blue-400 transition-all">
            <FileText className="w-8 h-8 text-green-600 mb-2" />
            <h4 className="font-semibold text-gray-800 mb-1">Crop Planning Template</h4>
            <p className="text-xs text-gray-600 mb-3">Excel • 156 KB • Editable</p>
            <button className="text-sm text-green-600 hover:text-green-700 font-semibold">Download →</button>
          </div>

          <div className="border-2 border-gray-200 rounded-lg p-4 hover:border-blue-400 transition-all">
            <FileText className="w-8 h-8 text-purple-600 mb-2" />
            <h4 className="font-semibold text-gray-800 mb-1">System Troubleshooting</h4>
            <p className="text-xs text-gray-600 mb-3">PDF • 1.8 MB • 18 pages</p>
            <button className="text-sm text-purple-600 hover:text-purple-700 font-semibold">Download →</button>
          </div>
        </div>
      </div>

      {/* Certifications */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <Award className="w-12 h-12 text-yellow-600" />
          <div>
            <h4 className="font-bold text-gray-800 mb-2">Earn Certificates</h4>
            <p className="text-sm text-gray-700 mb-3">
              Complete courses and assessments to earn verified certificates recognized by humanitarian organizations.
            </p>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-yellow-200 text-yellow-800 text-xs font-semibold rounded-full">3 Earned</span>
              <span className="px-3 py-1 bg-gray-200 text-gray-700 text-xs font-semibold rounded-full">3 In Progress</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
