import { useState } from 'react';
import { Link } from 'wouter';

// Types for roof calculator
type RoofFormType = {
  roofLength: string;
  roofWidth: string;
  roofPitch: string;
  roofType: string;
  roofMaterial: string;
  wastage: string;
  price: string;
};

type RoofResultType = {
  roofArea: number;
  roofAreaWithWastage: number;
  slopeFactor: number;
  materialsNeeded: {
    unit: string;
    quantity: number;
    coverage: number;
  };
  materialCost: number;
  laborCost: number;
  totalCost: number;
};

const RoofCalculator = ({ onClose }: { onClose: () => void }) => {
  const [formValues, setFormValues] = useState<RoofFormType>({
    roofLength: '',
    roofWidth: '',
    roofPitch: '6',
    roofType: 'gable',
    roofMaterial: 'asphalt',
    wastage: '15',
    price: ''
  });

  const [results, setResults] = useState<RoofResultType | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  // Helper function to get material unit based on roof material
  const getMaterialUnit = (material: string) => {
    switch (material) {
      case 'asphalt':
        return 'shingles (bundles)';
      case 'metal':
        return 'panels';
      case 'tile':
        return 'tiles';
      case 'slate':
        return 'slates';
      case 'wood':
        return 'shakes (bundles)';
      default:
        return 'units';
    }
  };
  
  // Helper function to get material coverage based on roof material
  const getMaterialCoverage = (material: string) => {
    switch (material) {
      case 'asphalt':
        return 33.3; // One bundle covers 33.3 sq ft
      case 'metal':
        return 100; // One panel covers 100 sq ft
      case 'tile':
        return 15; // One tile covers approximately 15 sq ft
      case 'slate':
        return 25; // One square of slate covers 25 sq ft
      case 'wood':
        return 33.3; // One bundle of shakes covers 33.3 sq ft
      default:
        return 100;
    }
  };
  
  // Helper function to get labor cost per sq ft based on roof material
  const getLaborCost = (material: string) => {
    switch (material) {
      case 'asphalt':
        return 150; // ₹150 per sq ft
      case 'metal':
        return 200; // ₹200 per sq ft
      case 'tile':
        return 250; // ₹250 per sq ft
      case 'slate':
        return 350; // ₹350 per sq ft
      case 'wood':
        return 250; // ₹250 per sq ft
      default:
        return 200;
    }
  };

  const calculateRoof = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Get dimensions
    const roofLength = parseFloat(formValues.roofLength) || 0;
    const roofWidth = parseFloat(formValues.roofWidth) || 0;
    const pitch = parseFloat(formValues.roofPitch) || 0;
    
    // Calculate slope factor based on pitch
    // Pitch is the rise in inches per 12 inches of run
    // Convert pitch to slope factor using the formula: √(1 + (pitch/12)²)
    const slopeFactor = Math.sqrt(1 + Math.pow(pitch/12, 2));
    
    // Calculate roof area based on roof type
    let flatArea = roofLength * roofWidth;
    let roofArea = 0;
    
    switch (formValues.roofType) {
      case 'gable':
        // For a gable roof, multiply flat area by slope factor
        roofArea = flatArea * slopeFactor;
        break;
      case 'hip':
        // Hip roof has 4 triangular planes
        // Simplified formula with 15-20% more area than gable
        roofArea = flatArea * slopeFactor * 1.2;
        break;
      case 'flat':
        // For flat roofs, no slope factor
        roofArea = flatArea;
        break;
      case 'mansard':
        // Mansard has steep upper slope, approximating with higher factor
        roofArea = flatArea * 1.4;
        break;
      case 'gambrel':
        // Gambrel has two slopes on each side, approximating with higher factor
        roofArea = flatArea * 1.3;
        break;
      default:
        roofArea = flatArea * slopeFactor;
    }
    
    // Add wastage
    const wastage = parseFloat(formValues.wastage) || 15;
    const roofAreaWithWastage = roofArea * (1 + wastage / 100);
    
    // Calculate materials needed
    const materialCoverage = getMaterialCoverage(formValues.roofMaterial);
    const materialsQuantity = Math.ceil(roofAreaWithWastage / materialCoverage);
    
    // Calculate costs
    const materialPrice = parseFloat(formValues.price) || 0;
    const materialCost = materialsQuantity * materialPrice;
    
    // Labor cost
    const laborCostPerSqFt = getLaborCost(formValues.roofMaterial);
    const laborCost = (roofArea / 100) * laborCostPerSqFt; // Per 100 sq ft
    
    // Total cost
    const totalCost = materialCost + laborCost;
    
    setResults({
      roofArea,
      roofAreaWithWastage,
      slopeFactor,
      materialsNeeded: {
        unit: getMaterialUnit(formValues.roofMaterial),
        quantity: materialsQuantity,
        coverage: materialCoverage
      },
      materialCost,
      laborCost,
      totalCost
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-heading text-2xl font-bold text-primary">Roof Calculator</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>
        
        <p className="text-secondary mb-6">
          Calculate the amount of roofing materials needed based on roof dimensions, pitch, and material type.
        </p>
        
        <form onSubmit={calculateRoof} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-secondary-dark mb-2">Roof Length (feet)*</label>
              <input 
                type="number" 
                name="roofLength"
                value={formValues.roofLength}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray rounded focus:outline-none focus:ring-2 focus:ring-primary" 
                required
                min="1"
                step="0.1"
                placeholder="e.g., 30"
              />
            </div>
            
            <div>
              <label className="block text-secondary-dark mb-2">Roof Width (feet)*</label>
              <input 
                type="number" 
                name="roofWidth"
                value={formValues.roofWidth}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray rounded focus:outline-none focus:ring-2 focus:ring-primary" 
                required
                min="1"
                step="0.1"
                placeholder="e.g., 40"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-secondary-dark mb-2">Roof Type*</label>
              <select
                name="roofType"
                value={formValues.roofType}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray rounded focus:outline-none focus:ring-2 focus:ring-primary"
                required
              >
                <option value="gable">Gable Roof</option>
                <option value="hip">Hip Roof</option>
                <option value="flat">Flat Roof</option>
                <option value="mansard">Mansard Roof</option>
                <option value="gambrel">Gambrel Roof</option>
              </select>
            </div>
            
            <div>
              <label className="block text-secondary-dark mb-2">Roof Pitch (inches per foot)*</label>
              <select
                name="roofPitch"
                value={formValues.roofPitch}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray rounded focus:outline-none focus:ring-2 focus:ring-primary"
                required
              >
                {formValues.roofType === 'flat' ? (
                  <option value="0">Flat (0/12)</option>
                ) : (
                  <>
                    <option value="1">1/12 (4.8° slope)</option>
                    <option value="2">2/12 (9.5° slope)</option>
                    <option value="3">3/12 (14.0° slope)</option>
                    <option value="4">4/12 (18.4° slope)</option>
                    <option value="5">5/12 (22.6° slope)</option>
                    <option value="6">6/12 (26.6° slope)</option>
                    <option value="7">7/12 (30.3° slope)</option>
                    <option value="8">8/12 (33.7° slope)</option>
                    <option value="9">9/12 (36.9° slope)</option>
                    <option value="10">10/12 (39.8° slope)</option>
                    <option value="12">12/12 (45.0° slope)</option>
                  </>
                )}
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-secondary-dark mb-2">Roofing Material*</label>
            <select
              name="roofMaterial"
              value={formValues.roofMaterial}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray rounded focus:outline-none focus:ring-2 focus:ring-primary"
              required
            >
              <option value="asphalt">Asphalt Shingles</option>
              <option value="metal">Metal Roofing</option>
              <option value="tile">Clay/Concrete Tiles</option>
              <option value="slate">Slate</option>
              <option value="wood">Wood Shakes/Shingles</option>
            </select>
          </div>
          
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
                max="30"
                step="1"
                placeholder="e.g., 15"
              />
              <p className="text-xs text-secondary mt-1">
                Add extra for cuts, waste, and overhangs (usually 10-20%).
              </p>
            </div>
            
            <div>
              <label className="block text-secondary-dark mb-2">
                Material Price (₹/
                {formValues.roofMaterial === 'asphalt' ? 'bundle' : 
                 formValues.roofMaterial === 'metal' ? 'panel' : 
                 formValues.roofMaterial === 'tile' ? 'square' : 
                 formValues.roofMaterial === 'slate' ? 'square' :
                 formValues.roofMaterial === 'wood' ? 'bundle' : 'unit'})
              </label>
              <input 
                type="number" 
                name="price"
                value={formValues.price}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray rounded focus:outline-none focus:ring-2 focus:ring-primary" 
                min="0"
                step="1"
                placeholder="e.g., 5000"
              />
            </div>
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-accent hover:bg-amber-600 text-white font-medium py-3 px-6 rounded transition duration-200"
          >
            Calculate Roofing Requirements
          </button>
        </form>
        
        {results && (
          <div className="mt-8 p-6 bg-gray-light rounded-lg">
            <h4 className="font-heading text-xl font-bold text-primary mb-4">Roofing Requirements</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center border-b border-gray pb-2">
                <span className="text-secondary-dark font-medium">Roof Surface Area:</span>
                <span className="font-bold text-primary">{results.roofArea.toFixed(2)} square feet</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray pb-2">
                <span className="text-secondary-dark font-medium">Slope Factor:</span>
                <span className="font-bold text-primary">{results.slopeFactor.toFixed(3)}</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray pb-2">
                <span className="text-secondary-dark font-medium">Total Area with Wastage:</span>
                <span className="font-bold text-primary">{results.roofAreaWithWastage.toFixed(2)} square feet</span>
              </div>
              
              <div className="flex justify-between items-center border-b border-gray pb-2">
                <span className="text-secondary-dark font-medium">
                  {results.materialsNeeded.unit} Needed:
                </span>
                <span className="font-bold text-primary">
                  {results.materialsNeeded.quantity} 
                  {results.materialsNeeded.unit === 'panels' ? ' panels' : 
                   results.materialsNeeded.unit === 'tiles' ? ' squares' : 
                   results.materialsNeeded.unit === 'slates' ? ' squares' : 
                   ' bundles'}
                </span>
              </div>
              
              <div className="pt-2 pb-1">
                <span className="font-medium text-primary">Cost Breakdown:</span>
              </div>
              
              <div className="flex justify-between items-center pl-4 border-b border-gray pb-2">
                <span className="text-secondary-dark">Material Cost:</span>
                <span className="font-medium">₹{results.materialCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center pl-4 border-b border-gray pb-2">
                <span className="text-secondary-dark">Labor Cost (estimated):</span>
                <span className="font-medium">₹{results.laborCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-primary font-bold">Total Estimated Cost:</span>
                <span className="text-primary font-bold">₹{results.totalCost.toLocaleString()}</span>
              </div>
            </div>
            <div className="mt-6 text-sm text-secondary">
              <p><strong>Note:</strong> This is an estimate based on standard roofing parameters. Actual material requirements and costs may vary based on roof complexity, accessibility, additional elements (valleys, ridges, chimneys), and other factors. For a precise quote, please <Link href="/contact"><span className="text-accent hover:underline cursor-pointer">contact our team</span></Link>.</p>
            </div>
            <div className="mt-6">
              <Link href="/contact">
                <div className="block w-full bg-primary hover:bg-primary-light text-white font-medium py-3 px-6 rounded text-center transition duration-200 cursor-pointer">
                  Get Professional Roofing Quote
                </div>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoofCalculator;