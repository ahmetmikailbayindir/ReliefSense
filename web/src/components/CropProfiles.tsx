import React, { useState, useEffect } from 'react';
import { Leaf, Clock, Target, Users, AlertTriangle, CheckCircle } from 'lucide-react';
import { apiClient } from '../services/api';
import { CropProfile, CropListResponse } from '../types/api';
import CreateDeploymentModal from './CreateDeploymentModal';
import { useLanguage } from '../contexts/LanguageContext';

interface CropProfilesProps {
  onStartGrowing?: (cropId: string) => void;
}

const CropProfiles: React.FC<CropProfilesProps> = ({ onStartGrowing }) => {
  const { t, isRTL } = useLanguage();
  const [crops, setCrops] = useState<CropProfile[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState<CropProfile | null>(null);

  useEffect(() => {
    fetchCropProfiles();
  }, []);

  const fetchCropProfiles = async () => {
    try {
      setError(null);

      // Mock data based on temperate region config
      const mockCrops: CropProfile[] = [
        {
          id: 'lettuce_01',
          name: 'Lettuce (Butterhead)',
          category: 'leafy_greens',
          total_growing_days: 45,
          growth_stages: [
            {
              stage: 'seedling',
              duration_days: 10,
              temperature: { optimal_min: 18, optimal_max: 22, critical_min: 10, critical_max: 30, unit: '°C' },
              humidity: { optimal_min: 60, optimal_max: 70, critical_min: 40, critical_max: 85, unit: '%' },
              water_level: null,
              light_hours: 14,
              notes: 'Keep soil consistently moist'
            },
            {
              stage: 'vegetative',
              duration_days: 25,
              temperature: { optimal_min: 16, optimal_max: 20, critical_min: 10, critical_max: 25, unit: '°C' },
              humidity: { optimal_min: 55, optimal_max: 65, critical_min: 40, critical_max: 80, unit: '%' },
              water_level: null,
              light_hours: 16,
              notes: 'Monitor for pests'
            },
            {
              stage: 'harvest',
              duration_days: 10,
              temperature: { optimal_min: 15, optimal_max: 18, critical_min: 10, critical_max: 22, unit: '°C' },
              humidity: { optimal_min: 50, optimal_max: 60, critical_min: 35, critical_max: 75, unit: '%' },
              water_level: null,
              light_hours: 14,
              notes: 'Harvest outer leaves first'
            }
          ],
          nutritional_value: { 'Vitamin A': 148, 'Vitamin K': 126, 'Folate': 38 },
          yield_per_sqm: 2.5,
          difficulty: 'easy',
          humanitarian_priority: 8,
          seasonal_info: { best_seasons: 'spring, fall', challenges: 'heat sensitive' }
        },
        {
          id: 'kale_01',
          name: 'Kale (Winter Hardy)',
          category: 'leafy_greens',
          total_growing_days: 60,
          growth_stages: [
            {
              stage: 'seedling',
              duration_days: 15,
              temperature: { optimal_min: 15, optimal_max: 20, critical_min: 5, critical_max: 25, unit: '°C' },
              humidity: { optimal_min: 60, optimal_max: 75, critical_min: 45, critical_max: 85, unit: '%' },
              water_level: null,
              light_hours: 12,
              notes: 'Cold tolerant variety'
            },
            {
              stage: 'vegetative',
              duration_days: 35,
              temperature: { optimal_min: 12, optimal_max: 18, critical_min: 0, critical_max: 22, unit: '°C' },
              humidity: { optimal_min: 55, optimal_max: 70, critical_min: 40, critical_max: 80, unit: '%' },
              water_level: null,
              light_hours: 14,
              notes: 'Frost improves flavor'
            },
            {
              stage: 'harvest',
              duration_days: 10,
              temperature: { optimal_min: 10, optimal_max: 16, critical_min: -5, critical_max: 20, unit: '°C' },
              humidity: { optimal_min: 50, optimal_max: 65, critical_min: 35, critical_max: 75, unit: '%' },
              water_level: null,
              light_hours: 12,
              notes: 'Continuous harvest possible'
            }
          ],
          nutritional_value: { 'Vitamin A': 206, 'Vitamin C': 120, 'Vitamin K': 817, 'Calcium': 150 },
          yield_per_sqm: 3.0,
          difficulty: 'easy',
          humanitarian_priority: 9,
          seasonal_info: { best_seasons: 'fall, winter', challenges: 'heat intolerant' }
        },
        {
          id: 'microgreens_01',
          name: 'Microgreens Mix',
          category: 'microgreens',
          total_growing_days: 14,
          growth_stages: [
            {
              stage: 'germination',
              duration_days: 3,
              temperature: { optimal_min: 18, optimal_max: 24, critical_min: 15, critical_max: 28, unit: '°C' },
              humidity: { optimal_min: 80, optimal_max: 95, critical_min: 70, critical_max: 98, unit: '%' },
              water_level: null,
              light_hours: 0,
              notes: 'Keep in dark until germination'
            },
            {
              stage: 'growing',
              duration_days: 8,
              temperature: { optimal_min: 16, optimal_max: 22, critical_min: 12, critical_max: 26, unit: '°C' },
              humidity: { optimal_min: 60, optimal_max: 75, critical_min: 50, critical_max: 85, unit: '%' },
              water_level: null,
              light_hours: 16,
              notes: 'High light intensity required'
            },
            {
              stage: 'harvest',
              duration_days: 3,
              temperature: { optimal_min: 14, optimal_max: 20, critical_min: 10, critical_max: 24, unit: '°C' },
              humidity: { optimal_min: 55, optimal_max: 70, critical_min: 45, critical_max: 80, unit: '%' },
              water_level: null,
              light_hours: 14,
              notes: 'Harvest when first true leaves appear'
            }
          ],
          nutritional_value: { 'Vitamin C': 200, 'Vitamin E': 15, 'Beta-carotene': 180 },
          yield_per_sqm: 1.0,
          difficulty: 'easy',
          humanitarian_priority: 10,
          seasonal_info: { best_seasons: 'year_round', challenges: 'none' }
        },
        {
          id: 'herbs_01',
          name: 'Mixed Herbs (Basil, Parsley)',
          category: 'herbs',
          total_growing_days: 50,
          growth_stages: [
            {
              stage: 'seedling',
              duration_days: 12,
              temperature: { optimal_min: 20, optimal_max: 25, critical_min: 15, critical_max: 30, unit: '°C' },
              humidity: { optimal_min: 65, optimal_max: 75, critical_min: 50, critical_max: 85, unit: '%' },
              water_level: null,
              light_hours: 14,
              notes: 'Warm loving herbs'
            },
            {
              stage: 'vegetative',
              duration_days: 28,
              temperature: { optimal_min: 18, optimal_max: 24, critical_min: 12, critical_max: 28, unit: '°C' },
              humidity: { optimal_min: 60, optimal_max: 70, critical_min: 45, critical_max: 80, unit: '%' },
              water_level: null,
              light_hours: 16,
              notes: 'Pinch flowers to promote leaf growth'
            },
            {
              stage: 'harvest',
              duration_days: 10,
              temperature: { optimal_min: 16, optimal_max: 22, critical_min: 10, critical_max: 26, unit: '°C' },
              humidity: { optimal_min: 55, optimal_max: 65, critical_min: 40, critical_max: 75, unit: '%' },
              water_level: null,
              light_hours: 14,
              notes: 'Regular harvesting encourages growth'
            }
          ],
          nutritional_value: { 'Vitamin A': 264, 'Vitamin C': 18, 'Iron': 3.2 },
          yield_per_sqm: 1.5,
          difficulty: 'medium',
          humanitarian_priority: 7,
          seasonal_info: { best_seasons: 'spring, summer', challenges: 'cold sensitive' }
        }
      ];

      const categories = ['leafy_greens', 'microgreens', 'herbs'];

      setCrops(mockCrops);
      setCategories(['all', ...categories]);
    } catch (err) {
      console.error('Failed to fetch crop profiles:', err);
      setError(t.crops.errors.loadFailed);
    } finally {
      setLoading(false);
    }
  };

  const filteredCrops = selectedCategory === 'all'
    ? crops
    : crops.filter(crop => crop.category === selectedCategory);

  const getPriorityIcon = (priority: number) => {
    if (priority >= 9) return { icon: <AlertTriangle className="h-4 w-4 text-red-500" />, label: t.crops.priority.critical };
    if (priority >= 7) return { icon: <Target className="h-4 w-4 text-orange-500" />, label: t.crops.priority.high };
    if (priority >= 5) return { icon: <CheckCircle className="h-4 w-4 text-yellow-500" />, label: t.crops.priority.medium };
    return { icon: <CheckCircle className="h-4 w-4 text-green-500" />, label: t.crops.priority.standard };
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStartGrowing = (crop: CropProfile) => {
    setSelectedCrop(crop);
    setIsModalOpen(true);
  };

  const handleCreateDeployment = async (deploymentData: {
    cropId: string;
    deploymentName: string;
    assignedSensors: Record<string, string>;
    plantingDate: string;
    notes: string;
  }) => {
    try {
      console.log('Creating deployment:', deploymentData);

      // For now, create a mock deployment since API doesn't exist yet
      const newDeployment = {
        id: `deploy_${Date.now()}`,
        crop_profile_id: deploymentData.cropId,
        deployment_name: deploymentData.deploymentName,
        planted_date: new Date(deploymentData.plantingDate).toISOString(),
        current_stage: 'seedling',
        expected_harvest_date: new Date(
          new Date(deploymentData.plantingDate).getTime() +
          (selectedCrop?.total_growing_days || 45) * 24 * 60 * 60 * 1000
        ).toISOString(),
        assigned_sensors: deploymentData.assignedSensors,
        is_active: true,
        notes: deploymentData.notes ? [deploymentData.notes] : [],
        harvest_data: null
      };

      // Store in localStorage to persist between tabs
      const existingDeployments = JSON.parse(localStorage.getItem('mockDeployments') || '[]');
      existingDeployments.push(newDeployment);
      localStorage.setItem('mockDeployments', JSON.stringify(existingDeployments));

      // Dispatch custom event to notify other components
      window.dispatchEvent(new CustomEvent('deploymentCreated', { detail: newDeployment }));

      alert(`✅ ${t.crops.deploymentCreated.replace('{name}', deploymentData.deploymentName)}\n\n${t.crops.deploymentInActiveTab}`);
      setIsModalOpen(false);
      setSelectedCrop(null);
    } catch (error) {
      console.error('Failed to create deployment:', error);
      alert(`❌ ${t.crops.errors.deploymentFailed}`);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-humanitarian-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <p className="text-red-700">{error}</p>
        <button
          onClick={fetchCropProfiles}
          className="mt-2 bg-red-100 px-3 py-2 rounded-md text-sm font-medium text-red-800 hover:bg-red-200"
        >
          {t.common.retry}
        </button>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${isRTL ? 'text-right' : ''}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-humanitarian-900">{t.nav.cropSelection}</h2>
          <p className="text-humanitarian-600">{t.crops.chooseOptimized}</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-humanitarian-600">{t.crops.availableCrops}</div>
          <div className="text-lg font-semibold text-humanitarian-900">{filteredCrops.length}</div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category
                ? 'bg-humanitarian-600 text-white'
                : 'bg-humanitarian-100 text-humanitarian-700 hover:bg-humanitarian-200'
            }`}
          >
            {category === 'all' ? t.crops.allCategories : t.crops.categories[category as keyof typeof t.crops.categories] || category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Crop Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCrops.map((crop) => {
          const priority = getPriorityIcon(crop.humanitarian_priority);

          return (
            <div key={crop.id} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <Leaf className="h-6 w-6 text-humanitarian-600 mr-2" />
                    <div>
                      <h3 className="font-semibold text-gray-900">{crop.name}</h3>
                      <p className="text-sm text-gray-600 capitalize">{t.crops.categories[crop.category as keyof typeof t.crops.categories] || crop.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {priority.icon}
                    <span className="text-xs text-gray-600 ml-1">{priority.label}</span>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{crop.total_growing_days} {t.crops.daysToHarvest}</span>
                  </div>

                  <div className="flex items-center text-sm text-gray-600">
                    <Target className="h-4 w-4 mr-2" />
                    <span>{t.crops.priority.label}: {crop.humanitarian_priority}/10</span>
                  </div>

                  {crop.yield_per_sqm && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="h-4 w-4 mr-2" />
                      <span>{crop.yield_per_sqm}kg/m² {t.crops.yield}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between mb-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(crop.difficulty)}`}>
                    {t.crops.difficulties[crop.difficulty as keyof typeof t.crops.difficulties] || crop.difficulty} {t.crops.difficulty}
                  </span>
                  <span className="text-xs text-gray-600">
                    {crop.growth_stages.length} {t.crops.growthStages}
                  </span>
                </div>

                {/* Nutritional highlights */}
                {Object.keys(crop.nutritional_value).length > 0 && (
                  <div className="mb-4">
                    <div className="text-xs text-gray-600 mb-1">{t.crops.richIn}:</div>
                    <div className="flex flex-wrap gap-1">
                      {Object.entries(crop.nutritional_value).slice(0, 3).map(([nutrient, _]) => (
                        <span key={nutrient} className="px-2 py-1 bg-humanitarian-50 text-humanitarian-700 rounded text-xs">
                          {t.crops.nutrients[nutrient] || nutrient}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <button
                  onClick={() => handleStartGrowing(crop)}
                  className="w-full bg-humanitarian-600 text-white py-2 px-4 rounded-md font-medium hover:bg-humanitarian-700 transition-colors"
                >
                  {t.crops.startGrowing}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredCrops.length === 0 && (
        <div className="text-center py-12">
          <Leaf className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">{t.crops.noCropsFound}</h3>
          <p className="text-gray-600">{t.crops.tryDifferentCategory}</p>
        </div>
      )}

      <CreateDeploymentModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedCrop(null);
        }}
        crop={selectedCrop}
        onCreateDeployment={handleCreateDeployment}
      />
    </div>
  );
};

export default CropProfiles;