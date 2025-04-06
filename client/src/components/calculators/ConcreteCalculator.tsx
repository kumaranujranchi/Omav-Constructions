import { useState } from 'react';
import { Link } from 'wouter';

// Types for concrete calculator
type ConcreteFormType = {
  shape: string;
  length: string;
  width: string;
  height: string;
  diameter: string;
  thickness: string;
  radius: string;
  wastage: string;
  psi: string;
};

type ConcreteResultType = {
  volume: number;
  volumeWithWastage: number;
  cement: number;
  sand: number;
  aggregate: number;
  water: number;
  mixBags: number;
  readyMixTrucks: number;
  estimatedCost: number;
};

const ConcreteCalculator = ({ onClose }: { onClose: () => void }) => {
  const [formValues, setFormValues] = useState<ConcreteFormType>({
    shape: 'rectangular',
    length: '',
    width: '',
    height: '',
    diameter: '',
    thickness: '',
    radius: '',
    wastage: '10',
    psi: '3000'
  });

  const [results, setResults] = useState<ConcreteResultType | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  const calculateConcrete = (e: React.FormEvent) => {
    e.preventDefault();
    
    let volume = 0; // in cubic feet
    const wastagePercent = parseFloat(formValues.wastage) || 10;
    
    // Calculate volume based on shape
    if (formValues.shape === 'rectangular') {
      const length = parseFloat(formValues.length) || 0;
      const width = parseFloat(formValues.width) || 0;
      const height = parseFloat(formValues.height) || 0;
      
      volume = length * width * height / 27; // Convert cubic feet to cubic yards
    } 
    else if (formValues.shape === 'circular') {
      const radius = parseFloat(formValues.radius) || 0;
      const height = parseFloat(formValues.height) || 0;
      
      volume = Math.PI * Math.pow(radius, 2) * height / 27; // Convert cubic feet to cubic yards
    }
    else if (formValues.shape === 'slab') {
      const length = parseFloat(formValues.length) || 0;
      const width = parseFloat(formValues.width) || 0;
      const thickness = parseFloat(formValues.thickness) || 0;
      
      volume = length * width * (thickness / 12) / 27; // Convert inches to feet, then to cubic yards
    }
    else if (formValues.shape === 'cylindrical') {
      const diameter = parseFloat(formValues.diameter) || 0;
      const height = parseFloat(formValues.height) || 0;
      
      const radius = diameter / 2;
      volume = Math.PI * Math.pow(radius, 2) * height / 27; // Convert cubic feet to cubic yards
    }
    
    // Add wastage
    const volumeWithWastage = volume * (1 + wastagePercent / 100);
    
    // Calculate material quantities based on mix ratio
    // For 3000 PSI concrete, a common mix ratio is 1:2:3 (cement:sand:aggregate) with a water-cement ratio of 0.5
    // Different PSI values can have different ratios
    let cementRatio = 1;
    let sandRatio = 2;
    let aggregateRatio = 3;
    let waterCementRatio = 0.5;
    
    // Adjust ratios based on PSI value (simplified)
    const psi = parseInt(formValues.psi);
    if (psi >= 4000) {
      cementRatio = 1;
      sandRatio = 1.5;
      aggregateRatio = 3;
      waterCementRatio = 0.45;
    } else if (psi >= 3500) {
      cementRatio = 1;
      sandRatio = 2;
      aggregateRatio = 3;
      waterCementRatio = 0.48;
    }
    
    const totalParts = cementRatio + sandRatio + aggregateRatio;
    
    // Calculate materials (in cubic yards)
    const cement = volumeWithWastage * (cementRatio / totalParts);
    const sand = volumeWithWastage * (sandRatio / totalParts);
    const aggregate = volumeWithWastage * (aggregateRatio / totalParts);
    
    // Calculate water (in gallons)
    // Water is typically calculated based on the cement volume with water-cement ratio
    // A bag of cement is approximately 1 cubic foot
    const cementCubicFeet = cement * 27; // Convert back to cubic feet
    const waterCubicFeet = cementCubicFeet * waterCementRatio;
    const water = waterCubicFeet * 7.48; // Convert cubic feet to gallons
    
    // Estimate the number of 94lb cement bags needed (1 bag ≈ 1 cubic foot)
    const cementBags = Math.ceil(cementCubicFeet);
    
    // Estimate number of ready-mix trucks needed (assuming a standard truck carries 10 cubic yards)
    const readyMixTrucks = Math.ceil(volumeWithWastage / 10);
    
    // Estimate cost (in ₹)
    // Rough estimates: ₹6000 per cubic yard for ready-mix or ₹1500 per bag for individual components
    const estimatedCost = volumeWithWastage * 6000;
    
    setResults({
      volume,
      volumeWithWastage,
      cement,
      sand,
      aggregate,
      water,
      mixBags: cementBags,
      readyMixTrucks,
      estimatedCost
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-heading text-2xl font-bold text-primary">Concrete Calculator</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>
        
        <p className="text-secondary mb-6">
          Calculate the volume of concrete needed and the material quantities required for your construction project.
        </p>
        
        <form onSubmit={calculateConcrete} className="space-y-4">
          <div>
            <label className="block text-secondary-dark mb-2">Shape*</label>
            <select
              name="shape"
              value={formValues.shape}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray rounded focus:outline-none focus:ring-2 focus:ring-primary"
              required
            >
              <option value="rectangular">Rectangular (Foundation, Wall, Column)</option>
              <option value="slab">Slab or Pavement</option>
              <option value="cylindrical">Cylindrical (Round Column)</option>
              <option value="circular">Circular (Round Slab or Footing)</option>
            </select>
          </div>
          
          {(formValues.shape === 'rectangular' || formValues.shape === 'slab') && (
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
                  min="0.1"
                  step="0.01"
                  placeholder="e.g., 10"
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
                  min="0.1"
                  step="0.01"
                  placeholder="e.g., 10"
                />
              </div>
            </div>
          )}
          
          {formValues.shape === 'slab' && (
            <div>
              <label className="block text-secondary-dark mb-2">Thickness (inches)*</label>
              <input 
                type="number" 
                name="thickness"
                value={formValues.thickness}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray rounded focus:outline-none focus:ring-2 focus:ring-primary" 
                required
                min="0.1"
                step="0.1"
                placeholder="e.g., 4"
              />
            </div>
          )}
          
          {(formValues.shape === 'rectangular' || formValues.shape === 'cylindrical') && (
            <div>
              <label className="block text-secondary-dark mb-2">Height (feet)*</label>
              <input 
                type="number" 
                name="height"
                value={formValues.height}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray rounded focus:outline-none focus:ring-2 focus:ring-primary" 
                required
                min="0.1"
                step="0.01"
                placeholder="e.g., 8"
              />
            </div>
          )}
          
          {formValues.shape === 'cylindrical' && (
            <div>
              <label className="block text-secondary-dark mb-2">Diameter (feet)*</label>
              <input 
                type="number" 
                name="diameter"
                value={formValues.diameter}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray rounded focus:outline-none focus:ring-2 focus:ring-primary" 
                required
                min="0.1"
                step="0.01"
                placeholder="e.g., 2"
              />
            </div>
          )}
          
          {formValues.shape === 'circular' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-secondary-dark mb-2">Radius (feet)*</label>
                <input 
                  type="number" 
                  name="radius"
                  value={formValues.radius}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray rounded focus:outline-none focus:ring-2 focus:ring-primary" 
                  required
                  min="0.1"
                  step="0.01"
                  placeholder="e.g., 5"
                />
              </div>
              
              <div>
                <label className="block text-secondary-dark mb-2">Height (feet)*</label>
                <input 
                  type="number" 
                  name="height"
                  value={formValues.height}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray rounded focus:outline-none focus:ring-2 focus:ring-primary" 
                  required
                  min="0.1"
                  step="0.01"
                  placeholder="e.g., 0.5"
                />
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-secondary-dark mb-2">Wastage (%)</label>
              <input 
                type="number" 
                name="wastage"
                value={formValues.wastage}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray rounded focus:outline-none focus:ring-2 focus:ring-primary" 
                min="0"
                max="25"
                step="1"
                placeholder="e.g., 10"
              />
            </div>
            
            <div>
              <label className="block text-secondary-dark mb-2">Concrete Strength (PSI)</label>
              <select
                name="psi"
                value={formValues.psi}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray rounded focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="3000">3000 PSI (Standard)</option>
                <option value="3500">3500 PSI (Medium)</option>
                <option value="4000">4000 PSI (High)</option>
                <option value="4500">4500 PSI (Very High)</option>
              </select>
            </div>
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-accent hover:bg-amber-600 text-white font-medium py-3 px-6 rounded transition duration-200"
          >
            Calculate Concrete Requirements
          </button>
        </form>
        
        {results && (
          <div className="mt-8 p-6 bg-gray-light rounded-lg">
            <h4 className="font-heading text-xl font-bold text-primary mb-4">Concrete Requirements</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center border-b border-gray pb-2">
                <span className="text-secondary-dark font-medium">Concrete Volume:</span>
                <span className="font-bold text-primary">{results.volume.toFixed(2)} cubic yards</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray pb-2">
                <span className="text-secondary-dark font-medium">Volume with Wastage:</span>
                <span className="font-bold text-primary">{results.volumeWithWastage.toFixed(2)} cubic yards</span>
              </div>
              
              <div className="pt-2 pb-1">
                <span className="font-medium text-primary">Materials Required:</span>
              </div>
              
              <div className="flex justify-between items-center pl-4 border-b border-gray pb-2">
                <span className="text-secondary-dark">Cement:</span>
                <span className="font-medium">{results.cement.toFixed(2)} cubic yards ({results.mixBags} bags)</span>
              </div>
              <div className="flex justify-between items-center pl-4 border-b border-gray pb-2">
                <span className="text-secondary-dark">Sand:</span>
                <span className="font-medium">{results.sand.toFixed(2)} cubic yards</span>
              </div>
              <div className="flex justify-between items-center pl-4 border-b border-gray pb-2">
                <span className="text-secondary-dark">Aggregate:</span>
                <span className="font-medium">{results.aggregate.toFixed(2)} cubic yards</span>
              </div>
              <div className="flex justify-between items-center pl-4 border-b border-gray pb-2">
                <span className="text-secondary-dark">Water:</span>
                <span className="font-medium">{results.water.toFixed(2)} gallons</span>
              </div>
              
              <div className="pt-2 border-b border-gray pb-2">
                <div className="flex justify-between items-center">
                  <span className="text-secondary-dark font-medium">Ready-mix Trucks Needed:</span>
                  <span className="font-medium">{results.readyMixTrucks} truck{results.readyMixTrucks > 1 ? 's' : ''}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center pt-2">
                <span className="text-primary font-bold">Estimated Cost:</span>
                <span className="text-primary font-bold">₹{results.estimatedCost.toLocaleString()}</span>
              </div>
            </div>
            <div className="mt-6 text-sm text-secondary">
              <p><strong>Note:</strong> These calculations provide an estimate based on standard concrete mix ratios. Actual material requirements may vary based on site conditions, material quality, and specific project requirements. For a detailed quote, please <Link href="/contact"><span className="text-accent hover:underline cursor-pointer">contact our team</span></Link>.</p>
            </div>
            <div className="mt-6">
              <Link href="/contact">
                <div className="block w-full bg-primary hover:bg-primary-light text-white font-medium py-3 px-6 rounded text-center transition duration-200 cursor-pointer">
                  Get Professional Assistance
                </div>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConcreteCalculator;