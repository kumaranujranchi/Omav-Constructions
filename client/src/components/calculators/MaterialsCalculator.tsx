import { useState } from 'react';
import { Link } from 'wouter';

// Types for materials calculator
type MaterialInputs = {
  wallLength: string;
  wallHeight: string;
  wallThickness: string;
  openingsArea: string;
  mortar: string;
  brickType: string;
};

type MaterialResults = {
  bricksRequired: number;
  cement: number;
  sand: number;
  waterLiters: number;
};

const MaterialsCalculator = ({ onClose }: { onClose: () => void }) => {
  const [inputs, setInputs] = useState<MaterialInputs>({
    wallLength: '',
    wallHeight: '',
    wallThickness: '',
    openingsArea: '',
    mortar: '1:6',
    brickType: 'standard'
  });

  const [results, setResults] = useState<MaterialResults | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: value }));
  };

  const calculateMaterials = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Get input values
    const wallLength = parseFloat(inputs.wallLength) || 0;
    const wallHeight = parseFloat(inputs.wallHeight) || 0;
    const wallThickness = parseFloat(inputs.wallThickness) || 0;
    const openingsArea = parseFloat(inputs.openingsArea) || 0;
    
    // Calculate wall volume in cubic feet
    const wallArea = (wallLength * wallHeight) - openingsArea;
    const wallVolume = wallArea * (wallThickness / 12); // Convert thickness to feet
    
    // Brick standard sizes and calculations
    const brickSizes = {
      standard: { length: 9, width: 4.5, height: 3 }, // inches
      modular: { length: 7.625, width: 3.625, height: 2.25 }
    };
    
    const selectedBrick = inputs.brickType === 'standard' ? brickSizes.standard : brickSizes.modular;
    
    // Calculate brick volume in cubic inches
    const brickVolume = (selectedBrick.length * selectedBrick.width * selectedBrick.height) / 1728; // Convert to cubic feet
    
    // Add 10% waste factor
    const bricksNeeded = Math.ceil((wallVolume / brickVolume) * 1.10);
    
    // Calculate mortar requirements
    // Mortar ratio - 1:6 means 1 part cement to 6 parts sand
    const mortarRatio = inputs.mortar === '1:4' ? 4 : inputs.mortar === '1:5' ? 5 : 6;
    
    // Mortar volume is approximately 20% of wall volume for standard bricks
    const mortarVolume = wallVolume * 0.2;
    
    // Calculate cement in bags (1 bag = 1.25 cubic feet)
    const cementVolume = mortarVolume / (1 + mortarRatio);
    const cementBags = Math.ceil(cementVolume / 1.25);
    
    // Calculate sand in cubic feet
    const sandCubicFeet = Math.ceil(mortarVolume * (mortarRatio / (1 + mortarRatio)));
    
    // Water requirement (approximately 80 liters per bag of cement)
    const waterLiters = Math.ceil(cementBags * 80);
    
    setResults({
      bricksRequired: bricksNeeded,
      cement: cementBags,
      sand: sandCubicFeet,
      waterLiters: waterLiters
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-heading text-2xl font-bold text-primary">Building Materials Calculator</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>
        
        <p className="text-secondary mb-6">
          Estimate the quantity of bricks, cement, and sand required for your wall construction project. This calculator provides approximate values based on standard measurements and practices.
        </p>
        
        <form onSubmit={calculateMaterials} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-secondary-dark mb-2">Wall Length (feet)*</label>
              <input 
                type="number" 
                name="wallLength"
                value={inputs.wallLength}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray rounded focus:outline-none focus:ring-2 focus:ring-primary" 
                required
                min="1"
                step="0.01"
                placeholder="e.g., 10"
              />
            </div>
            
            <div>
              <label className="block text-secondary-dark mb-2">Wall Height (feet)*</label>
              <input 
                type="number" 
                name="wallHeight"
                value={inputs.wallHeight}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray rounded focus:outline-none focus:ring-2 focus:ring-primary" 
                required
                min="1"
                step="0.01"
                placeholder="e.g., 10"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-secondary-dark mb-2">Wall Thickness (inches)*</label>
              <select
                name="wallThickness"
                value={inputs.wallThickness}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray rounded focus:outline-none focus:ring-2 focus:ring-primary"
                required
              >
                <option value="">Select Thickness</option>
                <option value="4.5">4.5" (Single Brick)</option>
                <option value="9">9" (Brick and Half)</option>
                <option value="13.5">13.5" (Double Brick)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-secondary-dark mb-2">Openings Area (sq ft)</label>
              <input 
                type="number" 
                name="openingsArea"
                value={inputs.openingsArea}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray rounded focus:outline-none focus:ring-2 focus:ring-primary" 
                min="0"
                step="0.01"
                placeholder="e.g., doors, windows area"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-secondary-dark mb-2">Mortar Mix Ratio*</label>
              <select
                name="mortar"
                value={inputs.mortar}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray rounded focus:outline-none focus:ring-2 focus:ring-primary"
                required
              >
                <option value="1:4">1:4 (Stronger Mix)</option>
                <option value="1:5">1:5 (Standard Mix)</option>
                <option value="1:6">1:6 (Economy Mix)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-secondary-dark mb-2">Brick Type*</label>
              <select
                name="brickType"
                value={inputs.brickType}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray rounded focus:outline-none focus:ring-2 focus:ring-primary"
                required
              >
                <option value="standard">Standard Brick (9" × 4.5" × 3")</option>
                <option value="modular">Modular Brick (7.625" × 3.625" × 2.25")</option>
              </select>
            </div>
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-accent hover:bg-amber-600 text-white font-medium py-3 px-6 rounded transition duration-200"
          >
            Calculate Materials
          </button>
        </form>
        
        {results && (
          <div className="mt-8 p-6 bg-gray-light rounded-lg">
            <h4 className="font-heading text-xl font-bold text-primary mb-4">Material Requirements</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center border-b border-gray pb-2">
                <span className="text-secondary-dark font-medium">Bricks Required:</span>
                <span className="font-bold text-primary">{results.bricksRequired.toLocaleString()} pieces</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray pb-2">
                <span className="text-secondary-dark font-medium">Cement Required:</span>
                <span className="font-bold text-primary">{results.cement} bags (50kg each)</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray pb-2">
                <span className="text-secondary-dark font-medium">Sand Required:</span>
                <span className="font-bold text-primary">{results.sand} cubic feet</span>
              </div>
              <div className="flex justify-between items-center pb-2">
                <span className="text-secondary-dark font-medium">Water Required:</span>
                <span className="font-bold text-primary">{results.waterLiters} liters</span>
              </div>
            </div>
            <div className="mt-6 text-sm text-secondary">
              <p><strong>Note:</strong> These calculations include a 10% wastage factor. Actual requirements may vary based on site conditions, quality of materials, and construction techniques. For a more accurate estimate, please <Link href="/contact"><span className="text-accent hover:underline cursor-pointer">contact our team</span></Link>.</p>
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

export default MaterialsCalculator;