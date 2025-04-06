import { useState } from 'react';
import { Link } from 'wouter';

// Types for staircase calculator
type StaircaseFormType = {
  floorHeight: string;
  spaceLength: string;
  spaceWidth: string;
  staircaseType: string;
  riserHeight: string;
  treadDepth: string;
  stairWidth: string;
  material: string;
  handrailType: string;
};

type StaircaseResultType = {
  totalRise: number;
  numberOfSteps: number;
  totalRun: number;
  stairAngle: number;
  stepsDetails: {
    riserHeight: number;
    treadDepth: number;
    stairWidth: number;
  };
  dimensions: {
    totalStairwayLength: number;
    stairwayWidth: number;
    headroom: number;
  };
  materials: {
    treadVolume: number;
    riserVolume: number;
    stringerVolume: number;
    handrailLength: number;
    balustersCount: number;
  };
  estimatedCost: number;
  isCodeCompliant: boolean;
  notes: string[];
};

// Custom range check function
const isInRange = (value: number, min: number, max: number): boolean => {
  return value >= min && value <= max;
};

const StaircaseCalculator = ({ onClose }: { onClose: () => void }) => {
  const [formValues, setFormValues] = useState<StaircaseFormType>({
    floorHeight: '',
    spaceLength: '',
    spaceWidth: '',
    staircaseType: 'straight',
    riserHeight: '7',
    treadDepth: '11',
    stairWidth: '36',
    material: 'wood',
    handrailType: 'simple'
  });

  const [results, setResults] = useState<StaircaseResultType | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  // Helper function to get material cost per cubic foot
  const getMaterialCost = (material: string): number => {
    switch (material) {
      case 'wood':
        return 2500; // ₹2,500 per cubic foot
      case 'concrete':
        return 1000; // ₹1,000 per cubic foot
      case 'metal':
        return 4000; // ₹4,000 per cubic foot
      default:
        return 2000;
    }
  };
  
  // Helper function to get handrail cost per linear foot
  const getHandrailCost = (type: string): number => {
    switch (type) {
      case 'simple':
        return 1200; // ₹1,200 per foot
      case 'ornamental':
        return 2500; // ₹2,500 per foot
      case 'glass':
        return 3500; // ₹3,500 per foot
      default:
        return 1200;
    }
  };

  const calculateStaircase = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Parse input values
    const floorHeight = parseFloat(formValues.floorHeight) || 0; // inches
    const spaceLength = parseFloat(formValues.spaceLength) || 0; // inches
    const spaceWidth = parseFloat(formValues.spaceWidth) || 0; // inches
    const preferredRiser = parseFloat(formValues.riserHeight) || 7; // inches
    const preferredTread = parseFloat(formValues.treadDepth) || 11; // inches
    const stairWidth = parseFloat(formValues.stairWidth) || 36; // inches
    
    // Calculate the ideal number of steps
    const idealSteps = Math.round(floorHeight / preferredRiser);
    const actualRiserHeight = floorHeight / idealSteps;
    
    // Calculate total run (horizontal distance)
    let totalRun = idealSteps * preferredTread;
    
    // Adjust if stair type is not straight
    let adjustedRun = totalRun;
    let staircaseLength = totalRun;
    let staircaseWidth = stairWidth;
    let adjustmentNote = '';
    
    if (formValues.staircaseType === 'l-shaped') {
      // L-shaped stairs typically have a landing and turn 90 degrees
      // Assuming the landing is square with width = stair width
      const stepsBeforeTurn = Math.ceil(idealSteps / 2);
      const runBeforeTurn = stepsBeforeTurn * preferredTread;
      const remainingSteps = idealSteps - stepsBeforeTurn;
      const runAfterTurn = remainingSteps * preferredTread;
      
      adjustedRun = Math.max(runBeforeTurn, runAfterTurn);
      staircaseLength = runBeforeTurn + stairWidth; // Landing width = stair width
      staircaseWidth = stairWidth + runAfterTurn;
      adjustmentNote = `L-shaped staircase with ${stepsBeforeTurn} steps before the landing and ${remainingSteps} steps after the landing.`;
    } else if (formValues.staircaseType === 'u-shaped') {
      // U-shaped stairs have a landing and turn 180 degrees
      const stepsPerFlight = Math.ceil(idealSteps / 2);
      const runPerFlight = stepsPerFlight * preferredTread;
      
      adjustedRun = runPerFlight;
      staircaseLength = runPerFlight;
      staircaseWidth = 2 * stairWidth + 4; // Two flights plus minimal gap
      adjustmentNote = `U-shaped staircase with ${stepsPerFlight} steps per flight and a landing between.`;
    } else if (formValues.staircaseType === 'spiral') {
      // Spiral stairs have a central column with wedge-shaped treads
      const centerDiameter = 12; // inches, central column diameter
      const outerDiameter = centerDiameter + (2 * preferredTread);
      
      adjustedRun = outerDiameter / 2; // Radius of the spiral staircase
      staircaseLength = outerDiameter;
      staircaseWidth = outerDiameter;
      adjustmentNote = `Spiral staircase with ${idealSteps} wedge-shaped steps around a central column.`;
    }
    
    // Check if the staircase fits in the available space
    const doesFit = staircaseLength <= spaceLength && staircaseWidth <= spaceWidth;
    
    // Calculate stair angle
    const stairAngle = Math.atan(floorHeight / totalRun) * (180 / Math.PI);
    
    // Calculate headroom (assuming 80 inches minimum required)
    const headroom = 80 + 12 * Math.cos(stairAngle * (Math.PI / 180));
    
    // Calculate material volumes
    // For treads: width * depth * thickness (assume 1 inch thick)
    const treadVolume = stairWidth * preferredTread * 1 * idealSteps / 1728; // cubic feet
    
    // For risers: width * height * thickness (assume 0.75 inch thick)
    const riserVolume = stairWidth * actualRiserHeight * 0.75 * idealSteps / 1728; // cubic feet
    
    // For stringers: assume 2 stringers, 12 inches wide, length based on diagonal
    const stringerLength = Math.sqrt(Math.pow(floorHeight, 2) + Math.pow(totalRun, 2));
    const stringerVolume = 2 * 12 * stringerLength * 1.5 / 1728; // cubic feet
    
    // For handrail: length depends on stair type
    let handrailLength = 0;
    if (formValues.staircaseType === 'straight') {
      handrailLength = Math.sqrt(Math.pow(floorHeight, 2) + Math.pow(totalRun, 2)) / 12; // feet
    } else if (formValues.staircaseType === 'l-shaped') {
      const diagonalBeforeTurn = Math.sqrt(Math.pow(floorHeight / 2, 2) + Math.pow(adjustedRun, 2));
      const diagonalAfterTurn = Math.sqrt(Math.pow(floorHeight / 2, 2) + Math.pow(adjustedRun, 2));
      handrailLength = (diagonalBeforeTurn + diagonalAfterTurn + stairWidth) / 12; // feet
    } else if (formValues.staircaseType === 'u-shaped') {
      const diagonalPerFlight = Math.sqrt(Math.pow(floorHeight / 2, 2) + Math.pow(adjustedRun, 2));
      handrailLength = (2 * diagonalPerFlight + stairWidth) / 12; // feet
    } else if (formValues.staircaseType === 'spiral') {
      // Spiral staircase handrail follows a helical path
      const centerDiameter = 12; // inches, central column diameter
      const circumference = Math.PI * (centerDiameter + preferredTread);
      handrailLength = (idealSteps * circumference / 12) / 12; // feet
    }
    
    // Estimate number of balusters (assuming 4 inch spacing)
    const balustersCount = Math.ceil(handrailLength * 3); // approximately 3 balusters per foot
    
    // Calculate material costs
    const materialCost = getMaterialCost(formValues.material);
    const handrailCost = getHandrailCost(formValues.handrailType);
    
    const treadCost = treadVolume * materialCost;
    const riserCost = riserVolume * materialCost;
    const stringerCost = stringerVolume * materialCost;
    const handrailTotalCost = handrailLength * handrailCost;
    const balustersCost = balustersCount * 500; // ₹500 per baluster
    
    const estimatedCost = treadCost + riserCost + stringerCost + handrailTotalCost + balustersCost;
    
    // Check if staircase meets building code requirements
    const isRiserInRange = isInRange(actualRiserHeight, 4, 7.75);
    const isTreadInRange = isInRange(preferredTread, 10, 14);
    const isAngleInRange = isInRange(stairAngle, 20, 45);
    const isWidthSufficient = stairWidth >= 36;
    
    const isCodeCompliant = isRiserInRange && isTreadInRange && isAngleInRange && isWidthSufficient;
    
    // Generate notes
    const notes = [];
    
    if (adjustmentNote) notes.push(adjustmentNote);
    
    if (!doesFit) {
      notes.push(`Warning: The calculated staircase dimensions exceed the available space. Consider a different staircase type or adjust the dimensions.`);
    }
    
    if (!isRiserInRange) {
      notes.push(`Warning: The riser height (${actualRiserHeight.toFixed(2)}") is outside the recommended range (4"-7.75"). Consider adjusting the number of steps.`);
    }
    
    if (!isTreadInRange) {
      notes.push(`Warning: The tread depth (${preferredTread}") is outside the recommended range (10"-14").`);
    }
    
    if (!isAngleInRange) {
      notes.push(`Warning: The staircase angle (${stairAngle.toFixed(2)}°) is outside the recommended range (20°-45°).`);
    }
    
    if (!isWidthSufficient) {
      notes.push(`Warning: The staircase width (${stairWidth}") is less than the minimum recommended width (36").`);
    }
    
    // Add formula reminder
    notes.push(`Remember: A well-designed staircase typically follows the "2R + T = 24-25" formula, where R is the riser height and T is the tread depth.`);
    
    setResults({
      totalRise: floorHeight,
      numberOfSteps: idealSteps,
      totalRun,
      stairAngle,
      stepsDetails: {
        riserHeight: actualRiserHeight,
        treadDepth: preferredTread,
        stairWidth
      },
      dimensions: {
        totalStairwayLength: staircaseLength,
        stairwayWidth: staircaseWidth,
        headroom
      },
      materials: {
        treadVolume,
        riserVolume,
        stringerVolume,
        handrailLength,
        balustersCount
      },
      estimatedCost,
      isCodeCompliant,
      notes
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-heading text-2xl font-bold text-primary">Staircase Calculator</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>
        
        <p className="text-secondary mb-6">
          Calculate dimensions for stairs including rise, run, and number of steps, plus material requirements.
        </p>
        
        <form onSubmit={calculateStaircase} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-secondary-dark mb-2">Floor-to-Floor Height (inches)*</label>
              <input 
                type="number" 
                name="floorHeight"
                value={formValues.floorHeight}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray rounded focus:outline-none focus:ring-2 focus:ring-primary" 
                required
                min="24"
                max="200"
                step="0.5"
                placeholder="e.g., 108 (9 feet)"
              />
            </div>
            
            <div>
              <label className="block text-secondary-dark mb-2">Available Length (inches)*</label>
              <input 
                type="number" 
                name="spaceLength"
                value={formValues.spaceLength}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray rounded focus:outline-none focus:ring-2 focus:ring-primary" 
                required
                min="24"
                step="0.5"
                placeholder="e.g., 144 (12 feet)"
              />
            </div>
            
            <div>
              <label className="block text-secondary-dark mb-2">Available Width (inches)*</label>
              <input 
                type="number" 
                name="spaceWidth"
                value={formValues.spaceWidth}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray rounded focus:outline-none focus:ring-2 focus:ring-primary" 
                required
                min="24"
                step="0.5"
                placeholder="e.g., 48 (4 feet)"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-secondary-dark mb-2">Staircase Type*</label>
              <select
                name="staircaseType"
                value={formValues.staircaseType}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray rounded focus:outline-none focus:ring-2 focus:ring-primary"
                required
              >
                <option value="straight">Straight</option>
                <option value="l-shaped">L-shaped (quarter turn)</option>
                <option value="u-shaped">U-shaped (half turn)</option>
                <option value="spiral">Spiral</option>
              </select>
            </div>
            
            <div>
              <label className="block text-secondary-dark mb-2">Stair Width (inches)*</label>
              <input 
                type="number" 
                name="stairWidth"
                value={formValues.stairWidth}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray rounded focus:outline-none focus:ring-2 focus:ring-primary" 
                required
                min="24"
                max="72"
                step="0.5"
                placeholder="e.g., 36"
              />
              <p className="text-xs text-secondary mt-1">
                Minimum recommended: 36" (residential), 44" (commercial)
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-secondary-dark mb-2">Riser Height (inches)</label>
              <input 
                type="number" 
                name="riserHeight"
                value={formValues.riserHeight}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray rounded focus:outline-none focus:ring-2 focus:ring-primary" 
                min="4"
                max="8"
                step="0.25"
                placeholder="e.g., 7"
              />
              <p className="text-xs text-secondary mt-1">
                Preferred range: 4"-7.75", will adjust based on total height
              </p>
            </div>
            
            <div>
              <label className="block text-secondary-dark mb-2">Tread Depth (inches)</label>
              <input 
                type="number" 
                name="treadDepth"
                value={formValues.treadDepth}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray rounded focus:outline-none focus:ring-2 focus:ring-primary" 
                min="9"
                max="14"
                step="0.25"
                placeholder="e.g., 11"
              />
              <p className="text-xs text-secondary mt-1">
                Preferred range: 10"-14"
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-secondary-dark mb-2">Material*</label>
              <select
                name="material"
                value={formValues.material}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray rounded focus:outline-none focus:ring-2 focus:ring-primary"
                required
              >
                <option value="wood">Wood</option>
                <option value="concrete">Concrete</option>
                <option value="metal">Metal</option>
              </select>
            </div>
            
            <div>
              <label className="block text-secondary-dark mb-2">Handrail Type*</label>
              <select
                name="handrailType"
                value={formValues.handrailType}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray rounded focus:outline-none focus:ring-2 focus:ring-primary"
                required
              >
                <option value="simple">Simple (Wood/Metal)</option>
                <option value="ornamental">Ornamental</option>
                <option value="glass">Glass</option>
              </select>
            </div>
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-accent hover:bg-amber-600 text-white font-medium py-3 px-6 rounded transition duration-200"
          >
            Calculate Staircase
          </button>
        </form>
        
        {results && (
          <div className="mt-8 p-6 bg-gray-light rounded-lg">
            <h4 className="font-heading text-xl font-bold text-primary mb-4">Staircase Calculations</h4>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center border-b border-gray pb-2">
                <span className="text-secondary-dark font-medium">Total Rise (floor height):</span>
                <span className="font-bold text-primary">{results.totalRise.toFixed(2)} inches ({(results.totalRise / 12).toFixed(2)} feet)</span>
              </div>
              
              <div className="flex justify-between items-center border-b border-gray pb-2">
                <span className="text-secondary-dark font-medium">Number of Steps:</span>
                <span className="font-bold text-primary">{results.numberOfSteps} risers, {results.numberOfSteps - 1} treads</span>
              </div>
              
              <div className="flex justify-between items-center border-b border-gray pb-2">
                <span className="text-secondary-dark font-medium">Total Run (horizontal length):</span>
                <span className="font-bold text-primary">{results.totalRun.toFixed(2)} inches ({(results.totalRun / 12).toFixed(2)} feet)</span>
              </div>
              
              <div className="flex justify-between items-center border-b border-gray pb-2">
                <span className="text-secondary-dark font-medium">Staircase Angle:</span>
                <span className="font-bold text-primary">{results.stairAngle.toFixed(2)}°</span>
              </div>
              
              <div className="pt-4 pb-2">
                <span className="font-medium text-primary">Step Dimensions:</span>
              </div>
              
              <div className="flex justify-between items-center pl-4 border-b border-gray pb-2">
                <span className="text-secondary-dark">Riser Height:</span>
                <span className="font-medium">{results.stepsDetails.riserHeight.toFixed(2)} inches</span>
              </div>
              <div className="flex justify-between items-center pl-4 border-b border-gray pb-2">
                <span className="text-secondary-dark">Tread Depth:</span>
                <span className="font-medium">{results.stepsDetails.treadDepth} inches</span>
              </div>
              <div className="flex justify-between items-center pl-4 border-b border-gray pb-2">
                <span className="text-secondary-dark">Stair Width:</span>
                <span className="font-medium">{results.stepsDetails.stairWidth} inches</span>
              </div>
              
              <div className="pt-4 pb-2">
                <span className="font-medium text-primary">Stairway Dimensions:</span>
              </div>
              
              <div className="flex justify-between items-center pl-4 border-b border-gray pb-2">
                <span className="text-secondary-dark">Total Stairway Length:</span>
                <span className="font-medium">{results.dimensions.totalStairwayLength.toFixed(2)} inches ({(results.dimensions.totalStairwayLength / 12).toFixed(2)} feet)</span>
              </div>
              <div className="flex justify-between items-center pl-4 border-b border-gray pb-2">
                <span className="text-secondary-dark">Stairway Width:</span>
                <span className="font-medium">{results.dimensions.stairwayWidth.toFixed(2)} inches ({(results.dimensions.stairwayWidth / 12).toFixed(2)} feet)</span>
              </div>
              <div className="flex justify-between items-center pl-4 border-b border-gray pb-2">
                <span className="text-secondary-dark">Required Headroom:</span>
                <span className="font-medium">{results.dimensions.headroom.toFixed(2)} inches ({(results.dimensions.headroom / 12).toFixed(2)} feet)</span>
              </div>
              
              <div className="pt-4 pb-2">
                <span className="font-medium text-primary">Material Requirements:</span>
              </div>
              
              <div className="flex justify-between items-center pl-4 border-b border-gray pb-2">
                <span className="text-secondary-dark">Handrail Length:</span>
                <span className="font-medium">{results.materials.handrailLength.toFixed(2)} feet</span>
              </div>
              <div className="flex justify-between items-center pl-4 border-b border-gray pb-2">
                <span className="text-secondary-dark">Balusters (estimated):</span>
                <span className="font-medium">{results.materials.balustersCount} pieces</span>
              </div>
              <div className="flex justify-between items-center pl-4 border-b border-gray pb-2">
                <span className="text-secondary-dark">Material Volumes:</span>
                <span className="font-medium">
                  Treads: {results.materials.treadVolume.toFixed(2)} cu.ft., 
                  Risers: {results.materials.riserVolume.toFixed(2)} cu.ft.,
                  Stringers: {results.materials.stringerVolume.toFixed(2)} cu.ft.
                </span>
              </div>
              
              <div className="pt-4 pb-2 flex justify-between items-center">
                <span className="text-primary font-bold">
                  Code Compliance:
                </span>
                <span className={`font-bold ${results.isCodeCompliant ? 'text-green-600' : 'text-red-500'}`}>
                  {results.isCodeCompliant ? 'Compliant' : 'Non-Compliant'}
                </span>
              </div>
              
              <div className="flex justify-between items-center pt-2">
                <span className="text-primary font-bold">Estimated Cost:</span>
                <span className="text-primary font-bold">₹{results.estimatedCost.toLocaleString()}</span>
              </div>
            </div>
            
            {results.notes.length > 0 && (
              <div className="mt-4">
                <h5 className="font-heading text-lg font-semibold text-primary mb-2">Notes:</h5>
                <ul className="list-disc pl-5 space-y-1 text-secondary">
                  {results.notes.map((note, index) => (
                    <li key={index}>{note}</li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="mt-6 text-sm text-secondary">
              <p><strong>Note:</strong> These calculations provide a guideline for staircase design. For safety and building code compliance, please consult with a professional architect or engineer before construction. For a detailed staircase design, please <Link href="/contact"><span className="text-accent hover:underline cursor-pointer">contact our design team</span></Link>.</p>
            </div>
            <div className="mt-6">
              <Link href="/contact">
                <div className="block w-full bg-primary hover:bg-primary-light text-white font-medium py-3 px-6 rounded text-center transition duration-200 cursor-pointer">
                  Get Professional Staircase Design
                </div>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StaircaseCalculator;