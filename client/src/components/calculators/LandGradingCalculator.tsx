import { useState } from 'react';
import { Link } from 'wouter';

// Types for land grading calculator
type LandGradingFormType = {
  length: string;
  width: string;
  currentElevation: string;
  desiredElevation: string;
  soilType: string;
  bulkingFactor: string;
  pricePerCubicYard: string;
  equipmentType: string;
};

type LandGradingResultType = {
  area: number;
  cutVolume: number;
  fillVolume: number;
  adjustedVolume: number;
  truckLoads: number;
  estimatedCost: number;
  estimatedTime: number;
};

const LandGradingCalculator = ({ onClose }: { onClose: () => void }) => {
  const [formValues, setFormValues] = useState<LandGradingFormType>({
    length: '',
    width: '',
    currentElevation: '',
    desiredElevation: '',
    soilType: 'loam',
    bulkingFactor: '20',
    pricePerCubicYard: '800',
    equipmentType: 'bulldozer'
  });

  const [results, setResults] = useState<LandGradingResultType | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  // Helper function to get bulking factor based on soil type
  const getBulkingFactor = (soilType: string) => {
    switch (soilType) {
      case 'sand':
        return 15;
      case 'loam':
        return 20;
      case 'clay':
        return 35;
      case 'rock':
        return 50;
      default:
        return 20;
    }
  };

  // Helper function to get equipment production rate (cubic yards per hour)
  const getEquipmentRate = (equipmentType: string) => {
    switch (equipmentType) {
      case 'bulldozer':
        return 150;
      case 'excavator':
        return 100;
      case 'skidsteer':
        return 40;
      case 'grader':
        return 80;
      default:
        return 80;
    }
  };

  const calculateLandGrading = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Parse input values
    const length = parseFloat(formValues.length) || 0;
    const width = parseFloat(formValues.width) || 0;
    const currentElevation = parseFloat(formValues.currentElevation) || 0;
    const desiredElevation = parseFloat(formValues.desiredElevation) || 0;
    
    // Calculate area in square feet
    const area = length * width;
    
    // Calculate cut/fill volume in cubic feet
    const heightDifference = currentElevation - desiredElevation;
    let cutVolume = 0;
    let fillVolume = 0;
    
    if (heightDifference > 0) {
      // Cutting - removing soil
      cutVolume = area * heightDifference;
    } else {
      // Filling - adding soil
      fillVolume = area * Math.abs(heightDifference);
    }
    
    // Convert from cubic feet to cubic yards (27 cubic feet = 1 cubic yard)
    const cutVolumeYards = cutVolume / 27;
    const fillVolumeYards = fillVolume / 27;
    
    // Apply bulking factor for cut soil or compaction factor for fill soil
    const bulkingFactor = parseFloat(formValues.bulkingFactor) || getBulkingFactor(formValues.soilType);
    
    // Adjusted volume with bulking/compaction factor
    let adjustedVolume = 0;
    if (cutVolume > 0) {
      // When cutting, soil expands
      adjustedVolume = cutVolumeYards * (1 + bulkingFactor / 100);
    } else {
      // When filling, soil compacts
      adjustedVolume = fillVolumeYards * (1 + 10 / 100); // Assume 10% additional material for compaction
    }
    
    // Calculate number of truck loads (assuming standard 10 cubic yard dump truck)
    const truckLoads = Math.ceil(adjustedVolume / 10);
    
    // Calculate estimated cost
    const pricePerCubicYard = parseFloat(formValues.pricePerCubicYard) || 800;
    const estimatedCost = adjustedVolume * pricePerCubicYard;
    
    // Calculate estimated time to complete (in hours)
    const equipmentRate = getEquipmentRate(formValues.equipmentType);
    const estimatedTime = adjustedVolume / equipmentRate;
    
    setResults({
      area,
      cutVolume: cutVolumeYards,
      fillVolume: fillVolumeYards,
      adjustedVolume,
      truckLoads,
      estimatedCost,
      estimatedTime
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-heading text-2xl font-bold text-primary">Land Grading Calculator</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>
        
        <p className="text-secondary mb-6">
          Calculate the amount of soil to be moved for proper drainage and a level building site.
        </p>
        
        <form onSubmit={calculateLandGrading} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-secondary-dark mb-2">Length (feet)*</label>
              <input 
                type="number" 
                name="length"
                value={formValues.length}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray rounded focus:outline-none focus:ring-2 focus:ring-primary" 
                required
                min="1"
                step="0.1"
                placeholder="e.g., 100"
              />
            </div>
            
            <div>
              <label className="block text-secondary-dark mb-2">Width (feet)*</label>
              <input 
                type="number" 
                name="width"
                value={formValues.width}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray rounded focus:outline-none focus:ring-2 focus:ring-primary" 
                required
                min="1"
                step="0.1"
                placeholder="e.g., 50"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-secondary-dark mb-2">Current Elevation (feet)*</label>
              <input 
                type="number" 
                name="currentElevation"
                value={formValues.currentElevation}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray rounded focus:outline-none focus:ring-2 focus:ring-primary" 
                required
                step="0.1"
                placeholder="e.g., 10"
              />
              <p className="text-xs text-secondary mt-1">
                The current height of the land
              </p>
            </div>
            
            <div>
              <label className="block text-secondary-dark mb-2">Target Elevation (feet)*</label>
              <input 
                type="number" 
                name="desiredElevation"
                value={formValues.desiredElevation}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray rounded focus:outline-none focus:ring-2 focus:ring-primary" 
                required
                step="0.1"
                placeholder="e.g., 8"
              />
              <p className="text-xs text-secondary mt-1">
                The desired final height of the land
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-secondary-dark mb-2">Soil Type*</label>
              <select
                name="soilType"
                value={formValues.soilType}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray rounded focus:outline-none focus:ring-2 focus:ring-primary"
                required
              >
                <option value="sand">Sand</option>
                <option value="loam">Loam (Mixed)</option>
                <option value="clay">Clay</option>
                <option value="rock">Rocky</option>
              </select>
            </div>
            
            <div>
              <label className="block text-secondary-dark mb-2">Bulking Factor (%)</label>
              <input 
                type="number" 
                name="bulkingFactor"
                value={formValues.bulkingFactor}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray rounded focus:outline-none focus:ring-2 focus:ring-primary" 
                min="0"
                max="60"
                step="1"
                placeholder="e.g., 20"
              />
              <p className="text-xs text-secondary mt-1">
                How much the soil expands when excavated (based on soil type)
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-secondary-dark mb-2">Equipment Type*</label>
              <select
                name="equipmentType"
                value={formValues.equipmentType}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray rounded focus:outline-none focus:ring-2 focus:ring-primary"
                required
              >
                <option value="bulldozer">Bulldozer</option>
                <option value="excavator">Excavator</option>
                <option value="skidsteer">Skid Steer</option>
                <option value="grader">Grader</option>
              </select>
            </div>
            
            <div>
              <label className="block text-secondary-dark mb-2">Price per Cubic Yard (₹)</label>
              <input 
                type="number" 
                name="pricePerCubicYard"
                value={formValues.pricePerCubicYard}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray rounded focus:outline-none focus:ring-2 focus:ring-primary" 
                min="0"
                step="1"
                placeholder="e.g., 800"
              />
            </div>
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-accent hover:bg-amber-600 text-white font-medium py-3 px-6 rounded transition duration-200"
          >
            Calculate Land Grading Requirements
          </button>
        </form>
        
        {results && (
          <div className="mt-8 p-6 bg-gray-light rounded-lg">
            <h4 className="font-heading text-xl font-bold text-primary mb-4">Land Grading Results</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center border-b border-gray pb-2">
                <span className="text-secondary-dark font-medium">Land Area:</span>
                <span className="font-bold text-primary">{results.area.toFixed(2)} square feet ({(results.area / 43560).toFixed(2)} acres)</span>
              </div>
              
              {results.cutVolume > 0 ? (
                <div className="flex justify-between items-center border-b border-gray pb-2">
                  <span className="text-secondary-dark font-medium">Soil to be Cut (Excavated):</span>
                  <span className="font-bold text-primary">{results.cutVolume.toFixed(2)} cubic yards</span>
                </div>
              ) : (
                <div className="flex justify-between items-center border-b border-gray pb-2">
                  <span className="text-secondary-dark font-medium">Soil to be Filled:</span>
                  <span className="font-bold text-primary">{results.fillVolume.toFixed(2)} cubic yards</span>
                </div>
              )}
              
              <div className="flex justify-between items-center border-b border-gray pb-2">
                <span className="text-secondary-dark font-medium">Adjusted Volume (with bulking):</span>
                <span className="font-bold text-primary">{results.adjustedVolume.toFixed(2)} cubic yards</span>
              </div>
              
              <div className="flex justify-between items-center border-b border-gray pb-2">
                <span className="text-secondary-dark font-medium">Truck Loads Required (10 cubic yards/truck):</span>
                <span className="font-bold text-primary">{results.truckLoads} loads</span>
              </div>
              
              <div className="flex justify-between items-center border-b border-gray pb-2">
                <span className="text-secondary-dark font-medium">Estimated Time:</span>
                <span className="font-bold text-primary">{results.estimatedTime.toFixed(1)} hours</span>
              </div>
              
              <div className="flex justify-between items-center pt-2">
                <span className="text-primary font-bold">Estimated Cost:</span>
                <span className="text-primary font-bold">₹{results.estimatedCost.toLocaleString()}</span>
              </div>
            </div>
            <div className="mt-6 text-sm text-secondary">
              <p><strong>Note:</strong> This calculation provides an estimate based on standard land grading parameters. Actual requirements may vary depending on soil conditions, accessibility, equipment efficiency, and other factors. For an accurate assessment, please <Link href="/contact"><span className="text-accent hover:underline cursor-pointer">contact our team</span></Link> for a site inspection.</p>
            </div>
            <div className="mt-6">
              <Link href="/contact">
                <div className="block w-full bg-primary hover:bg-primary-light text-white font-medium py-3 px-6 rounded text-center transition duration-200 cursor-pointer">
                  Get Professional Site Preparation Quote
                </div>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LandGradingCalculator;