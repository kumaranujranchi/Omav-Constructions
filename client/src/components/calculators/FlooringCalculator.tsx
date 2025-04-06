import { useState } from 'react';
import { Link } from 'wouter';

// Types for flooring calculator
type FlooringFormType = {
  roomLength: string;
  roomWidth: string;
  flooringType: string;
  tileLength: string;
  tileWidth: string;
  plankLength: string;
  plankWidth: string;
  wastage: string;
  pattern: string;
  price: string;
};

type FlooringResultType = {
  roomArea: number;
  roomAreaWithWastage: number;
  tilesNeeded: number;
  boxesNeeded: number;
  estimatedCost: number;
  laborCost: number;
  totalCost: number;
};

const FlooringCalculator = ({ onClose }: { onClose: () => void }) => {
  const [formValues, setFormValues] = useState<FlooringFormType>({
    roomLength: '',
    roomWidth: '',
    flooringType: 'tile',
    tileLength: '12',
    tileWidth: '12',
    plankLength: '48',
    plankWidth: '6',
    wastage: '10',
    pattern: 'straight',
    price: ''
  });

  const [results, setResults] = useState<FlooringResultType | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  // Helper function to get material unit based on flooring type
  const getMaterialUnit = (flooringType: string) => {
    switch (flooringType) {
      case 'tile':
        return 'tiles';
      case 'hardwood':
      case 'laminate':
      case 'vinyl':
        return 'planks';
      case 'carpet':
        return 'square feet';
      default:
        return 'units';
    }
  };
  
  // Helper function to get standard box coverage based on flooring type
  const getBoxCoverage = (flooringType: string) => {
    switch (flooringType) {
      case 'tile':
        return 10; // Typically 10 sq ft per box
      case 'hardwood':
        return 20; // Typically 20 sq ft per box
      case 'laminate':
        return 25; // Typically 25 sq ft per box
      case 'vinyl':
        return 30; // Typically 30 sq ft per box
      case 'carpet':
        return 100; // Typically 100 sq ft per roll
      default:
        return 20;
    }
  };
  
  // Helper function to get labor cost per sq ft based on flooring type
  const getLaborCost = (flooringType: string) => {
    switch (flooringType) {
      case 'tile':
        return 6; // ₹6 per sq ft
      case 'hardwood':
        return 8; // ₹8 per sq ft
      case 'laminate':
        return 5; // ₹5 per sq ft
      case 'vinyl':
        return 4; // ₹4 per sq ft
      case 'carpet':
        return 3; // ₹3 per sq ft
      default:
        return 5;
    }
  };

  const calculateFlooring = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Calculate room area
    const roomLength = parseFloat(formValues.roomLength) || 0;
    const roomWidth = parseFloat(formValues.roomWidth) || 0;
    const roomArea = roomLength * roomWidth;
    
    // Add wastage
    const wastage = parseFloat(formValues.wastage) || 10;
    const roomAreaWithWastage = roomArea * (1 + wastage / 100);
    
    // Calculate number of tiles/planks needed
    let tilesNeeded = 0;
    
    if (formValues.flooringType === 'tile') {
      // Convert tile dimensions from inches to feet
      const tileLength = parseFloat(formValues.tileLength) || 12;
      const tileWidth = parseFloat(formValues.tileWidth) || 12;
      const tileArea = (tileLength * tileWidth) / 144; // Area in sq ft (convert from sq inches)
      
      // Adjust for pattern
      let patternMultiplier = 1;
      if (formValues.pattern === 'diagonal') {
        patternMultiplier = 1.15; // Add 15% for diagonal pattern
      } else if (formValues.pattern === 'herringbone') {
        patternMultiplier = 1.2; // Add 20% for herringbone pattern
      }
      
      tilesNeeded = Math.ceil((roomAreaWithWastage * patternMultiplier) / tileArea);
    } else if (['hardwood', 'laminate', 'vinyl'].includes(formValues.flooringType)) {
      // Convert plank dimensions from inches to feet
      const plankLength = parseFloat(formValues.plankLength) || 48;
      const plankWidth = parseFloat(formValues.plankWidth) || 6;
      const plankArea = (plankLength * plankWidth) / 144; // Area in sq ft (convert from sq inches)
      
      tilesNeeded = Math.ceil(roomAreaWithWastage / plankArea);
    } else {
      // For carpet and other materials, just use the area
      tilesNeeded = roomAreaWithWastage;
    }
    
    // Calculate number of boxes needed
    const boxCoverage = getBoxCoverage(formValues.flooringType);
    const boxesNeeded = Math.ceil(roomAreaWithWastage / boxCoverage);
    
    // Calculate costs
    const materialPrice = parseFloat(formValues.price) || 0;
    let estimatedCost = 0;
    
    if (['carpet', 'other'].includes(formValues.flooringType)) {
      // For carpet and other, price is usually per sq ft
      estimatedCost = roomAreaWithWastage * materialPrice;
    } else {
      // For tile, hardwood, etc. price is usually per box
      estimatedCost = boxesNeeded * materialPrice;
    }
    
    // Calculate labor cost
    const laborCostPerSqFt = getLaborCost(formValues.flooringType);
    const laborCost = roomArea * laborCostPerSqFt;
    
    // Calculate total cost
    const totalCost = estimatedCost + laborCost;
    
    setResults({
      roomArea,
      roomAreaWithWastage,
      tilesNeeded,
      boxesNeeded,
      estimatedCost,
      laborCost,
      totalCost
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-heading text-2xl font-bold text-primary">Flooring Calculator</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>
        
        <p className="text-secondary mb-6">
          Calculate the amount of flooring material needed for your project, including tiles, hardwood, laminate, vinyl, or carpet.
        </p>
        
        <form onSubmit={calculateFlooring} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-secondary-dark mb-2">Room Length (feet)*</label>
              <input 
                type="number" 
                name="roomLength"
                value={formValues.roomLength}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray rounded focus:outline-none focus:ring-2 focus:ring-primary" 
                required
                min="0.1"
                step="0.01"
                placeholder="e.g., 10"
              />
            </div>
            
            <div>
              <label className="block text-secondary-dark mb-2">Room Width (feet)*</label>
              <input 
                type="number" 
                name="roomWidth"
                value={formValues.roomWidth}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray rounded focus:outline-none focus:ring-2 focus:ring-primary" 
                required
                min="0.1"
                step="0.01"
                placeholder="e.g., 12"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-secondary-dark mb-2">Flooring Type*</label>
            <select
              name="flooringType"
              value={formValues.flooringType}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray rounded focus:outline-none focus:ring-2 focus:ring-primary"
              required
            >
              <option value="tile">Ceramic/Porcelain Tile</option>
              <option value="hardwood">Hardwood</option>
              <option value="laminate">Laminate</option>
              <option value="vinyl">Vinyl Planks</option>
              <option value="carpet">Carpet</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          {formValues.flooringType === 'tile' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-secondary-dark mb-2">Tile Length (inches)</label>
                <input 
                  type="number" 
                  name="tileLength"
                  value={formValues.tileLength}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray rounded focus:outline-none focus:ring-2 focus:ring-primary" 
                  min="1"
                  step="0.1"
                  placeholder="e.g., 12"
                />
              </div>
              
              <div>
                <label className="block text-secondary-dark mb-2">Tile Width (inches)</label>
                <input 
                  type="number" 
                  name="tileWidth"
                  value={formValues.tileWidth}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray rounded focus:outline-none focus:ring-2 focus:ring-primary" 
                  min="1"
                  step="0.1"
                  placeholder="e.g., 12"
                />
              </div>
            </div>
          )}
          
          {['hardwood', 'laminate', 'vinyl'].includes(formValues.flooringType) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-secondary-dark mb-2">Plank Length (inches)</label>
                <input 
                  type="number" 
                  name="plankLength"
                  value={formValues.plankLength}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray rounded focus:outline-none focus:ring-2 focus:ring-primary" 
                  min="1"
                  step="0.1"
                  placeholder="e.g., 48"
                />
              </div>
              
              <div>
                <label className="block text-secondary-dark mb-2">Plank Width (inches)</label>
                <input 
                  type="number" 
                  name="plankWidth"
                  value={formValues.plankWidth}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray rounded focus:outline-none focus:ring-2 focus:ring-primary" 
                  min="1"
                  step="0.1"
                  placeholder="e.g., 6"
                />
              </div>
            </div>
          )}
          
          {formValues.flooringType === 'tile' && (
            <div>
              <label className="block text-secondary-dark mb-2">Installation Pattern</label>
              <select
                name="pattern"
                value={formValues.pattern}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray rounded focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="straight">Straight/Grid</option>
                <option value="diagonal">Diagonal</option>
                <option value="herringbone">Herringbone</option>
              </select>
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
              <p className="text-xs text-secondary mt-1">
                Add extra for cuts, waste, and future repairs (usually 5-15%).
              </p>
            </div>
            
            <div>
              <label className="block text-secondary-dark mb-2">
                {['carpet', 'other'].includes(formValues.flooringType) 
                  ? 'Material Price (₹/sq ft)' 
                  : 'Material Price (₹/box)'}
              </label>
              <input 
                type="number" 
                name="price"
                value={formValues.price}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray rounded focus:outline-none focus:ring-2 focus:ring-primary" 
                min="0"
                step="1"
                placeholder={['carpet', 'other'].includes(formValues.flooringType) 
                  ? 'e.g., 50' 
                  : 'e.g., 1200'}
              />
            </div>
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-accent hover:bg-amber-600 text-white font-medium py-3 px-6 rounded transition duration-200"
          >
            Calculate Flooring Requirements
          </button>
        </form>
        
        {results && (
          <div className="mt-8 p-6 bg-gray-light rounded-lg">
            <h4 className="font-heading text-xl font-bold text-primary mb-4">Flooring Requirements</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center border-b border-gray pb-2">
                <span className="text-secondary-dark font-medium">Room Area:</span>
                <span className="font-bold text-primary">{results.roomArea.toFixed(2)} square feet</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray pb-2">
                <span className="text-secondary-dark font-medium">Area with Wastage:</span>
                <span className="font-bold text-primary">{results.roomAreaWithWastage.toFixed(2)} square feet</span>
              </div>
              
              <div className="flex justify-between items-center border-b border-gray pb-2">
                <span className="text-secondary-dark font-medium">
                  {getMaterialUnit(formValues.flooringType)} Needed:
                </span>
                <span className="font-bold text-primary">
                  {formValues.flooringType === 'carpet' || formValues.flooringType === 'other'
                    ? `${results.roomAreaWithWastage.toFixed(2)} square feet`
                    : `${results.tilesNeeded} ${getMaterialUnit(formValues.flooringType)}`}
                </span>
              </div>
              
              <div className="flex justify-between items-center border-b border-gray pb-2">
                <span className="text-secondary-dark font-medium">
                  {formValues.flooringType === 'carpet' ? 'Rolls' : 'Boxes'} Needed:
                </span>
                <span className="font-bold text-primary">{results.boxesNeeded}</span>
              </div>
              
              <div className="pt-2 pb-1">
                <span className="font-medium text-primary">Cost Breakdown:</span>
              </div>
              
              <div className="flex justify-between items-center pl-4 border-b border-gray pb-2">
                <span className="text-secondary-dark">Materials:</span>
                <span className="font-medium">₹{results.estimatedCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center pl-4 border-b border-gray pb-2">
                <span className="text-secondary-dark">Labor (estimated):</span>
                <span className="font-medium">₹{results.laborCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-primary font-bold">Total Estimated Cost:</span>
                <span className="text-primary font-bold">₹{results.totalCost.toLocaleString()}</span>
              </div>
            </div>
            <div className="mt-6 text-sm text-secondary">
              <p><strong>Note:</strong> This calculation provides an estimate based on standard flooring dimensions and installation practices. Actual material requirements may vary based on the exact room dimensions, layout complexity, and specific products used. For a precise quote, please <Link href="/contact"><span className="text-accent hover:underline cursor-pointer">contact our team</span></Link>.</p>
            </div>
            <div className="mt-6">
              <Link href="/contact">
                <div className="block w-full bg-primary hover:bg-primary-light text-white font-medium py-3 px-6 rounded text-center transition duration-200 cursor-pointer">
                  Get Professional Installation Quote
                </div>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlooringCalculator;