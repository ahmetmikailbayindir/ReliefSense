import React, { useState, useEffect } from 'react';
import {
  Sprout, Calendar, Target, Droplets, Sun, Thermometer,
  Plus, Edit, Trash2, CheckCircle, Clock, AlertTriangle
} from 'lucide-react';

interface CropCycle {
  id: string;
  cropName: string;
  variety: string;
  plantDate: string;
  expectedHarvest: string;
  actualHarvest?: string;
  status: 'planning' | 'planted' | 'growing' | 'ready' | 'harvested' | 'failed';
  location: string;
  notes: string;
  growthStage: 'seed' | 'seedling' | 'vegetative' | 'flowering' | 'fruiting' | 'harvest';
  yieldExpected: number;
  yieldActual?: number;
  environmentalConditions: {
    optimalTemp: { min: number; max: number };
    optimalHumidity: { min: number; max: number };
    lightHours: number;
    wateringFrequency: string;
  };
}

interface CropManagerProps {
  sensorData?: any;
}

// Common humanitarian crops with their requirements
const CROP_TEMPLATES = {
  'lettuce': {
    name: 'Lettuce',
    varieties: ['Butterhead', 'Romaine', 'Leaf Lettuce'],
    growthDays: 45,
    optimalTemp: { min: 15, max: 25 },
    optimalHumidity: { min: 60, max: 80 },
    lightHours: 12,
    wateringFrequency: 'daily',
    yieldPerPlant: 0.3 // kg
  },
  'spinach': {
    name: 'Spinach',
    varieties: ['Space', 'Bloomsdale', 'Giant Winter'],
    growthDays: 40,
    optimalTemp: { min: 10, max: 20 },
    optimalHumidity: { min: 50, max: 70 },
    lightHours: 10,
    wateringFrequency: 'daily',
    yieldPerPlant: 0.2
  },
  'kale': {
    name: 'Kale',
    varieties: ['Curly Kale', 'Lacinato', 'Red Russian'],
    growthDays: 55,
    optimalTemp: { min: 15, max: 25 },
    optimalHumidity: { min: 50, max: 70 },
    lightHours: 14,
    wateringFrequency: 'daily',
    yieldPerPlant: 0.5
  },
  'microgreens': {
    name: 'Microgreens',
    varieties: ['Radish', 'Pea', 'Sunflower'],
    growthDays: 14,
    optimalTemp: { min: 18, max: 24 },
    optimalHumidity: { min: 60, max: 80 },
    lightHours: 12,
    wateringFrequency: 'twice daily',
    yieldPerPlant: 0.05
  }
};

const GROWTH_STAGES = [
  { key: 'seed', name: 'Seed', icon: '🌱', description: 'Planning and preparation' },
  { key: 'seedling', name: 'Seedling', icon: '🌿', description: 'First leaves emerging' },
  { key: 'vegetative', name: 'Growing', icon: '🍃', description: 'Rapid leaf growth' },
  { key: 'flowering', name: 'Flowering', icon: '🌸', description: 'Flower development' },
  { key: 'fruiting', name: 'Fruiting', icon: '🍅', description: 'Fruit/seed development' },
  { key: 'harvest', name: 'Ready', icon: '🥬', description: 'Ready for harvest' }
];

export const CropManager: React.FC<CropManagerProps> = ({ sensorData }) => {
  const [crops, setCrops] = useState<CropCycle[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState<CropCycle | null>(null);
  const [activeTab, setActiveTab] = useState<'active' | 'completed' | 'all'>('active');

  // Load crops from localStorage on mount
  useEffect(() => {
    const savedCrops = localStorage.getItem('opensense-crops');
    if (savedCrops) {
      setCrops(JSON.parse(savedCrops));
    } else {
      // Create sample crop for demo
      const sampleCrop: CropCycle = {
        id: '1',
        cropName: 'lettuce',
        variety: 'Butterhead',
        plantDate: new Date().toISOString().split('T')[0],
        expectedHarvest: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        status: 'growing',
        location: 'Main Growing Area',
        notes: 'Community staple crop for nutrition program',
        growthStage: 'vegetative',
        yieldExpected: 15,
        environmentalConditions: {
          optimalTemp: { min: 15, max: 25 },
          optimalHumidity: { min: 60, max: 80 },
          lightHours: 12,
          wateringFrequency: 'daily'
        }
      };
      setCrops([sampleCrop]);
    }
  }, []);

  // Save crops to localStorage
  useEffect(() => {
    localStorage.setItem('opensense-crops', JSON.stringify(crops));
  }, [crops]);

  const addNewCrop = (cropData: Partial<CropCycle>) => {
    const template = CROP_TEMPLATES[cropData.cropName as keyof typeof CROP_TEMPLATES];
    const plantDate = new Date(cropData.plantDate || Date.now());
    const expectedHarvest = new Date(plantDate.getTime() + template.growthDays * 24 * 60 * 60 * 1000);

    const newCrop: CropCycle = {
      id: Date.now().toString(),
      cropName: cropData.cropName || 'lettuce',
      variety: cropData.variety || template.varieties[0],
      plantDate: plantDate.toISOString().split('T')[0],
      expectedHarvest: expectedHarvest.toISOString().split('T')[0],
      status: 'planted',
      location: cropData.location || 'Growing Area 1',
      notes: cropData.notes || '',
      growthStage: 'seed',
      yieldExpected: template.yieldPerPlant * (cropData.yieldExpected || 50),
      environmentalConditions: {
        optimalTemp: template.optimalTemp,
        optimalHumidity: template.optimalHumidity,
        lightHours: template.lightHours,
        wateringFrequency: template.wateringFrequency
      }
    };

    setCrops(prev => [...prev, newCrop]);
    setShowAddForm(false);
  };

  const updateCropStage = (cropId: string, newStage: CropCycle['growthStage']) => {
    setCrops(prev => prev.map(crop =>
      crop.id === cropId ? { ...crop, growthStage: newStage } : crop
    ));
  };

  const recordHarvest = (cropId: string, actualYield: number) => {
    setCrops(prev => prev.map(crop =>
      crop.id === cropId ? {
        ...crop,
        status: 'harvested',
        actualHarvest: new Date().toISOString().split('T')[0],
        yieldActual: actualYield
      } : crop
    ));
  };

  const getCropStatus = (crop: CropCycle) => {
    const today = new Date();
    const plantDate = new Date(crop.plantDate);
    const expectedHarvest = new Date(crop.expectedHarvest);
    const daysGrowing = Math.floor((today.getTime() - plantDate.getTime()) / (1000 * 60 * 60 * 24));
    const daysToHarvest = Math.floor((expectedHarvest.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    return { daysGrowing, daysToHarvest };
  };

  const checkEnvironmentalMatch = (crop: CropCycle) => {
    if (!sensorData?.sensors?.scd41) return 'unknown';

    const temp = sensorData.sensors.scd41.temperature;
    const humidity = sensorData.sensors.scd41.humidity;

    const tempOk = temp >= crop.environmentalConditions.optimalTemp.min &&
                   temp <= crop.environmentalConditions.optimalTemp.max;
    const humidityOk = humidity >= crop.environmentalConditions.optimalHumidity.min &&
                       humidity <= crop.environmentalConditions.optimalHumidity.max;

    if (tempOk && humidityOk) return 'optimal';
    if (tempOk || humidityOk) return 'good';
    return 'poor';
  };

  const filteredCrops = crops.filter(crop => {
    if (activeTab === 'active') return crop.status !== 'harvested' && crop.status !== 'failed';
    if (activeTab === 'completed') return crop.status === 'harvested' || crop.status === 'failed';
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Crop Management</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          <Plus className="w-5 h-5" />
          <span>New Crop</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { key: 'active', label: 'Active Crops', count: crops.filter(c => c.status !== 'harvested').length },
            { key: 'completed', label: 'Completed', count: crops.filter(c => c.status === 'harvested').length },
            { key: 'all', label: 'All Crops', count: crops.length }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.key
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </nav>
      </div>

      {/* Crop Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCrops.map(crop => {
          const { daysGrowing, daysToHarvest } = getCropStatus(crop);
          const environmentalMatch = checkEnvironmentalMatch(crop);
          const template = CROP_TEMPLATES[crop.cropName as keyof typeof CROP_TEMPLATES];
          const currentStage = GROWTH_STAGES.find(s => s.key === crop.growthStage);

          return (
            <div key={crop.id} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {template.name} - {crop.variety}
                  </h3>
                  <p className="text-sm text-gray-600">{crop.location}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  crop.status === 'harvested' ? 'bg-green-100 text-green-800' :
                  crop.status === 'growing' ? 'bg-blue-100 text-blue-800' :
                  crop.status === 'ready' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {crop.status}
                </span>
              </div>

              {/* Growth Stage */}
              <div className="mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-lg">{currentStage?.icon}</span>
                  <span className="font-medium">{currentStage?.name}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{
                      width: `${Math.min(100, (daysGrowing / template.growthDays) * 100)}%`
                    }}
                  ></div>
                </div>
                <p className="text-xs text-gray-600 mt-1">{currentStage?.description}</p>
              </div>

              {/* Timeline */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="flex items-center space-x-1 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>Growing: {daysGrowing} days</span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center space-x-1 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>
                      {daysToHarvest > 0 ? `${daysToHarvest} days left` : 'Ready to harvest!'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Environmental Status */}
              <div className="mb-4">
                <div className={`flex items-center space-x-2 text-sm ${
                  environmentalMatch === 'optimal' ? 'text-green-600' :
                  environmentalMatch === 'good' ? 'text-yellow-600' :
                  environmentalMatch === 'poor' ? 'text-red-600' :
                  'text-gray-600'
                }`}>
                  {environmentalMatch === 'optimal' ? <CheckCircle className="w-4 h-4" /> :
                   environmentalMatch === 'poor' ? <AlertTriangle className="w-4 h-4" /> :
                   <Clock className="w-4 h-4" />}
                  <span>
                    Environment: {environmentalMatch === 'unknown' ? 'No data' :
                                 environmentalMatch.charAt(0).toUpperCase() + environmentalMatch.slice(1)}
                  </span>
                </div>
              </div>

              {/* Yield Information */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Expected yield:</span>
                  <span className="font-medium">{crop.yieldExpected} kg</span>
                </div>
                {crop.yieldActual && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Actual yield:</span>
                    <span className="font-medium text-green-600">{crop.yieldActual} kg</span>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                {crop.status !== 'harvested' && daysToHarvest <= 0 && (
                  <button
                    onClick={() => {
                      const yield_amount = prompt('Enter actual yield (kg):');
                      if (yield_amount) {
                        recordHarvest(crop.id, parseFloat(yield_amount));
                      }
                    }}
                    className="flex-1 px-3 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                  >
                    Record Harvest
                  </button>
                )}
                <button
                  onClick={() => setSelectedCrop(crop)}
                  className="px-3 py-2 border border-gray-300 text-gray-700 text-sm rounded hover:bg-gray-50"
                >
                  View Details
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Crop Form */}
      {showAddForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Add New Crop</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target as HTMLFormElement);
              addNewCrop({
                cropName: formData.get('cropName') as string,
                variety: formData.get('variety') as string,
                location: formData.get('location') as string,
                notes: formData.get('notes') as string,
                yieldExpected: parseInt(formData.get('plants') as string) || 50
              });
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Crop Type
                  </label>
                  <select name="cropName" required className="w-full p-2 border border-gray-300 rounded">
                    {Object.entries(CROP_TEMPLATES).map(([key, template]) => (
                      <option key={key} value={key}>{template.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Variety
                  </label>
                  <input
                    type="text"
                    name="variety"
                    placeholder="e.g., Butterhead"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    placeholder="e.g., Growing Area 1"
                    required
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Plants
                  </label>
                  <input
                    type="number"
                    name="plants"
                    placeholder="50"
                    min="1"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notes
                  </label>
                  <textarea
                    name="notes"
                    placeholder="Additional notes..."
                    rows={3}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Add Crop
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};