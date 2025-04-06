import { useState } from 'react';
import { X } from 'lucide-react';

type HvacFormType = {
  buildingType: string;
  floorArea: string;
  ceilingHeight: string;
  location: string;
  insulation: string;
  windows: string;
  occupants: string;
  appliances: string;
};

type HvacResultType = {
  btus: number;
  tonnage: number;
  recommendedSystem: string;
  ducting: {
    supplyTrunkSize: number;
    returnTrunkSize: number;
    branchDuctSize: number;
    numberOfVents: number;
  };
  energyConsumption: {
    monthlyKwh: number;
    monthlyCost: number;
  };
  estimatedCost: {
    equipmentCost: number;
    installationCost: number;
    ductworkCost: number;
    totalCost: number;
  };
  maintenanceTips: string[];
};

interface HvacCalculatorProps {
  onClose: () => void;
}

const HvacCalculator = ({ onClose }: HvacCalculatorProps) => {
  const [formData, setFormData] = useState<HvacFormType>({
    buildingType: '',
    floorArea: '',
    ceilingHeight: '',
    location: '',
    insulation: '',
    windows: '',
    occupants: '',
    appliances: '',
  });

  const [results, setResults] = useState<HvacResultType | null>(null);
  const [showResults, setShowResults] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const calculateHvacRequirements = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Convert inputs to numbers
    const area = parseFloat(formData.floorArea);
    const ceilingHeight = parseFloat(formData.ceilingHeight);
    const occupants = parseInt(formData.occupants);
    
    // Base BTU calculation (simplified model)
    let baseBtus = area * 30; // Base 30 BTUs per square foot
    
    // Building type adjustments
    const buildingFactors: Record<string, number> = {
      residential: 1.0,
      commercial: 1.2,
      industrial: 1.4,
      office: 1.1,
    };
    
    // Climate/location factors
    const locationFactors: Record<string, number> = {
      mild: 0.9,
      moderate: 1.0,
      hot: 1.2,
      extreme: 1.4,
    };
    
    // Insulation quality factors
    const insulationFactors: Record<string, number> = {
      poor: 1.3,
      average: 1.0,
      good: 0.8,
      excellent: 0.6,
    };
    
    // Window coverage factors
    const windowFactors: Record<string, number> = {
      minimal: 0.9,
      average: 1.0,
      extensive: 1.2,
      full: 1.4,
    };
    
    // Apply adjustments
    let adjustedBtus = baseBtus * 
      buildingFactors[formData.buildingType as keyof typeof buildingFactors] * 
      locationFactors[formData.location as keyof typeof locationFactors] * 
      insulationFactors[formData.insulation as keyof typeof insulationFactors] * 
      windowFactors[formData.windows as keyof typeof windowFactors];
    
    // Add for ceiling height
    adjustedBtus *= (ceilingHeight / 8); // Normalized for 8ft ceiling
    
    // Add for occupants (400 BTU per person)
    adjustedBtus += (occupants * 400);
    
    // Add for appliances
    const applianceFactors: Record<string, number> = {
      minimal: 1000,
      average: 3000,
      high: 6000,
    };
    
    adjustedBtus += applianceFactors[formData.appliances as keyof typeof applianceFactors];
    
    // Tonnage calculation (12,000 BTU = 1 ton)
    const tonnage = adjustedBtus / 12000;
    
    // Recommendation based on tonnage
    let recommendedSystem = '';
    if (tonnage < 2) {
      recommendedSystem = 'Mini-Split System';
    } else if (tonnage < 4) {
      recommendedSystem = 'Split System';
    } else if (tonnage < 10) {
      recommendedSystem = 'Split System or Packaged Unit';
    } else {
      recommendedSystem = 'Commercial Packaged Unit or Multiple Systems';
    }
    
    // Ducting calculations (simplified)
    const supplyTrunkSize = Math.ceil(tonnage * 1.5) + 10; // in square inches
    const returnTrunkSize = Math.ceil(supplyTrunkSize * 1.2); // return is larger
    const branchDuctSize = 6; // standard size in inches diameter
    const numberOfVents = Math.ceil(area / 150); // approx. one vent per 150 sq ft
    
    // Energy calculations (simplified)
    const efficiencyRating = 14; // SEER rating
    const averageHoursPerDay = 8;
    const daysPerMonth = 30;
    const electricityRate = 0.14; // per kWh
    
    const monthlyKwh = (adjustedBtus / efficiencyRating) * averageHoursPerDay * daysPerMonth / 1000;
    const monthlyCost = monthlyKwh * electricityRate;
    
    // Cost estimations (simplified)
    const equipmentCost = tonnage * 1500; // $1500 per ton
    const installationCost = equipmentCost * 0.7; // Installation typically 70% of equipment
    const ductworkCost = numberOfVents * 250; // $250 per vent including ductwork
    const totalCost = equipmentCost + installationCost + ductworkCost;
    
    // Maintenance tips
    const maintenanceTips = [
      'Replace air filters every 1-3 months',
      'Schedule professional tune-ups annually',
      'Keep outdoor unit clear of debris',
      'Clean air vents and registers regularly',
      'Consider a programmable thermostat for efficiency',
    ];
    
    const result: HvacResultType = {
      btus: Math.round(adjustedBtus),
      tonnage: parseFloat(tonnage.toFixed(2)),
      recommendedSystem,
      ducting: {
        supplyTrunkSize,
        returnTrunkSize,
        branchDuctSize,
        numberOfVents,
      },
      energyConsumption: {
        monthlyKwh: Math.round(monthlyKwh),
        monthlyCost: parseFloat(monthlyCost.toFixed(2)),
      },
      estimatedCost: {
        equipmentCost: Math.round(equipmentCost),
        installationCost: Math.round(installationCost),
        ductworkCost: Math.round(ductworkCost),
        totalCost: Math.round(totalCost),
      },
      maintenanceTips,
    };
    
    setResults(result);
    setShowResults(true);
  };

  const resetCalculator = () => {
    setFormData({
      buildingType: '',
      floorArea: '',
      ceilingHeight: '',
      location: '',
      insulation: '',
      windows: '',
      occupants: '',
      appliances: '',
    });
    setResults(null);
    setShowResults(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-heading text-2xl font-bold text-primary">HVAC Sizing Calculator</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        {!showResults ? (
          <>
            <p className="text-secondary mb-6">
              Estimate the appropriate HVAC system size based on your space dimensions and characteristics. This calculator provides a general guideline - for precise sizing, we recommend a professional assessment.
            </p>
            
            <form onSubmit={calculateHvacRequirements} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-secondary-dark mb-2">Building Type</label>
                  <select
                    name="buildingType"
                    value={formData.buildingType}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  >
                    <option value="">Select Building Type</option>
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                    <option value="office">Office Space</option>
                    <option value="industrial">Industrial</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-secondary-dark mb-2">Floor Area (sq. ft.)</label>
                  <input
                    type="number"
                    name="floorArea"
                    value={formData.floorArea}
                    onChange={handleChange}
                    placeholder="e.g., 1500"
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                    min="100"
                  />
                </div>
                
                <div>
                  <label className="block text-secondary-dark mb-2">Ceiling Height (ft.)</label>
                  <input
                    type="number"
                    name="ceilingHeight"
                    value={formData.ceilingHeight}
                    onChange={handleChange}
                    placeholder="e.g., 8"
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                    min="7"
                    max="20"
                    step="0.5"
                  />
                </div>
                
                <div>
                  <label className="block text-secondary-dark mb-2">Climate/Location</label>
                  <select
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  >
                    <option value="">Select Climate</option>
                    <option value="mild">Mild</option>
                    <option value="moderate">Moderate</option>
                    <option value="hot">Hot</option>
                    <option value="extreme">Extreme Hot/Cold</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-secondary-dark mb-2">Insulation Quality</label>
                  <select
                    name="insulation"
                    value={formData.insulation}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  >
                    <option value="">Select Insulation</option>
                    <option value="poor">Poor</option>
                    <option value="average">Average</option>
                    <option value="good">Good</option>
                    <option value="excellent">Excellent</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-secondary-dark mb-2">Window Coverage</label>
                  <select
                    name="windows"
                    value={formData.windows}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  >
                    <option value="">Select Window Coverage</option>
                    <option value="minimal">Minimal (Few Windows)</option>
                    <option value="average">Average</option>
                    <option value="extensive">Extensive</option>
                    <option value="full">Full (Glass Walls)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-secondary-dark mb-2">Number of Occupants</label>
                  <input
                    type="number"
                    name="occupants"
                    value={formData.occupants}
                    onChange={handleChange}
                    placeholder="e.g., 4"
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                    min="1"
                  />
                </div>
                
                <div>
                  <label className="block text-secondary-dark mb-2">Heat-Generating Appliances</label>
                  <select
                    name="appliances"
                    value={formData.appliances}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  >
                    <option value="">Select Appliance Load</option>
                    <option value="minimal">Minimal (Few appliances)</option>
                    <option value="average">Average (Standard appliances)</option>
                    <option value="high">High (Many appliances/equipment)</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-center mt-6 space-x-4">
                <button
                  type="button"
                  onClick={resetCalculator}
                  className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md transition duration-200"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-primary hover:bg-primary-dark text-white rounded-md transition duration-200"
                >
                  Calculate
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            <div className="bg-primary-light/10 rounded-lg p-4 mb-6">
              <h4 className="font-heading text-xl font-bold text-primary mb-2">HVAC System Requirements</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-secondary-dark font-medium">Cooling Capacity:</p>
                  <p className="text-primary text-xl font-bold">{results?.btus.toLocaleString()} BTUs</p>
                  <p className="text-secondary">{results?.tonnage} Tons</p>
                </div>
                <div>
                  <p className="text-secondary-dark font-medium">Recommended System:</p>
                  <p className="text-primary text-xl font-bold">{results?.recommendedSystem}</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-heading text-lg font-bold text-primary mb-2">Ducting Requirements</h4>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span className="text-secondary-dark">Supply Trunk Size:</span>
                    <span className="font-medium">{results?.ducting.supplyTrunkSize} sq. in.</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-secondary-dark">Return Trunk Size:</span>
                    <span className="font-medium">{results?.ducting.returnTrunkSize} sq. in.</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-secondary-dark">Branch Duct Size:</span>
                    <span className="font-medium">{results?.ducting.branchDuctSize}" diameter</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-secondary-dark">Number of Vents:</span>
                    <span className="font-medium">{results?.ducting.numberOfVents}</span>
                  </li>
                </ul>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-heading text-lg font-bold text-primary mb-2">Energy Consumption</h4>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span className="text-secondary-dark">Monthly Usage:</span>
                    <span className="font-medium">{results?.energyConsumption.monthlyKwh} kWh</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-secondary-dark">Monthly Cost:</span>
                    <span className="font-medium">₹{results?.energyConsumption.monthlyCost.toLocaleString()}</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4 mb-6">
              <h4 className="font-heading text-lg font-bold text-primary mb-2">Estimated Costs</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-secondary-dark">Equipment:</p>
                  <p className="font-medium">₹{results?.estimatedCost.equipmentCost.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-secondary-dark">Installation:</p>
                  <p className="font-medium">₹{results?.estimatedCost.installationCost.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-secondary-dark">Ductwork:</p>
                  <p className="font-medium">₹{results?.estimatedCost.ductworkCost.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-secondary-dark font-bold">Total Cost:</p>
                  <p className="text-primary font-bold">₹{results?.estimatedCost.totalCost.toLocaleString()}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-accent/10 rounded-lg p-4 mb-6">
              <h4 className="font-heading text-lg font-bold text-primary mb-2">Maintenance Tips</h4>
              <ul className="list-disc pl-5 space-y-1">
                {results?.maintenanceTips.map((tip, index) => (
                  <li key={index} className="text-secondary-dark">{tip}</li>
                ))}
              </ul>
            </div>
            
            <div className="text-center text-secondary-dark italic mb-6">
              <p>Note: This calculation provides an estimate based on general guidelines. For precise sizing, we recommend a professional assessment that considers additional factors specific to your building.</p>
            </div>
            
            <div className="flex justify-center space-x-4">
              <button
                onClick={resetCalculator}
                className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md transition duration-200"
              >
                Calculate Again
              </button>
              <button
                onClick={onClose}
                className="px-6 py-2 bg-primary hover:bg-primary-dark text-white rounded-md transition duration-200"
              >
                Close
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HvacCalculator;