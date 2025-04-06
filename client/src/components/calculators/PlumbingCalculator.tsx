import { useState } from 'react';
import { Link } from 'wouter';

// Types for plumbing calculator
type PlumbingFormType = {
  buildingType: string;
  numberOfFloors: string;
  numberOfBathrooms: string;
  numberOfKitchens: string;
  numberOfFixtures: string;
  pipeType: string;
  waterHeaterType: string;
  waterStorageRequired: string;
};

type PipeSegment = {
  name: string;
  size: string;
  length: number;
  quantity: number;
};

type PlumbingResultType = {
  waterSupplyPipes: PipeSegment[];
  drainagePipes: PipeSegment[];
  fixtures: { name: string; quantity: number }[];
  waterStorageCapacity: number;
  heaterCapacity: number;
  pumpRequirement: string;
  estimatedCost: number;
  materialBreakdown: {
    pipes: number;
    fixtures: number;
    storage: number;
    labor: number;
  };
};

const PlumbingCalculator = ({ onClose }: { onClose: () => void }) => {
  const [formValues, setFormValues] = useState<PlumbingFormType>({
    buildingType: 'residential',
    numberOfFloors: '1',
    numberOfBathrooms: '2',
    numberOfKitchens: '1',
    numberOfFixtures: '',
    pipeType: 'upvc',
    waterHeaterType: 'storage',
    waterStorageRequired: ''
  });

  const [results, setResults] = useState<PlumbingResultType | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  // Helper function to compute average pipe lengths based on building type and floor count
  const getAveragePipeLengths = (
    buildingType: string, 
    floorCount: number
  ): { mainSupply: number; branchSupply: number; mainDrainage: number; branchDrainage: number } => {
    let baseMainSupply = 0;
    let baseBranchSupply = 0;
    let baseMainDrainage = 0;
    let baseBranchDrainage = 0;
    
    switch (buildingType) {
      case 'residential':
        baseMainSupply = 30; // feet
        baseBranchSupply = 15; // feet per bathroom/kitchen
        baseMainDrainage = 40; // feet
        baseBranchDrainage = 20; // feet per bathroom/kitchen
        break;
      case 'commercial':
        baseMainSupply = 50;
        baseBranchSupply = 25;
        baseMainDrainage = 60;
        baseBranchDrainage = 30;
        break;
      case 'industrial':
        baseMainSupply = 80;
        baseBranchSupply = 40;
        baseMainDrainage = 100;
        baseBranchDrainage = 50;
        break;
      default:
        baseMainSupply = 30;
        baseBranchSupply = 15;
        baseMainDrainage = 40;
        baseBranchDrainage = 20;
    }
    
    // Add additional lengths for multi-story buildings
    const floorMultiplier = Math.max(floorCount - 1, 0);
    const mainSupply = baseMainSupply + (floorMultiplier * 15);
    const branchSupply = baseBranchSupply;
    const mainDrainage = baseMainDrainage + (floorMultiplier * 15);
    const branchDrainage = baseBranchDrainage;
    
    return {
      mainSupply,
      branchSupply,
      mainDrainage,
      branchDrainage
    };
  };
  
  // Helper function to get pipe costs per foot
  const getPipeCostPerFoot = (pipeType: string, pipeSize: string): number => {
    const costs: Record<string, Record<string, number>> = {
      upvc: {
        '0.5': 15, // ₹15 per foot for 0.5" UPVC pipe
        '0.75': 25,
        '1': 35,
        '1.5': 50,
        '2': 80,
        '3': 120,
        '4': 180
      },
      cpvc: {
        '0.5': 25,
        '0.75': 40,
        '1': 60,
        '1.5': 90,
        '2': 130,
        '3': 200,
        '4': 300
      },
      copper: {
        '0.5': 120,
        '0.75': 180,
        '1': 240,
        '1.5': 350,
        '2': 480,
        '3': 700,
        '4': 1000
      }
    };
    
    return costs[pipeType]?.[pipeSize] || 0;
  };
  
  // Helper function to estimate fixtures based on bathroom and kitchen count
  const estimateFixtures = (
    bathroomCount: number, 
    kitchenCount: number
  ): { name: string; quantity: number }[] => {
    return [
      { name: 'Toilet', quantity: bathroomCount },
      { name: 'Sink/Basin', quantity: bathroomCount + kitchenCount },
      { name: 'Shower', quantity: bathroomCount },
      { name: 'Bathtub', quantity: Math.floor(bathroomCount / 2) },
      { name: 'Kitchen Sink', quantity: kitchenCount },
      { name: 'Washing Machine Connection', quantity: 1 },
      { name: 'Water Heater Connection', quantity: 1 },
      { name: 'Floor Drain', quantity: bathroomCount + kitchenCount },
      { name: 'Main Shut-off Valve', quantity: 1 },
      { name: 'Angle Valves', quantity: bathroomCount * 3 + kitchenCount * 2 }
    ];
  };

  const calculatePlumbing = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Parse input values
    const floorCount = parseInt(formValues.numberOfFloors) || 1;
    const bathroomCount = parseInt(formValues.numberOfBathrooms) || 0;
    const kitchenCount = parseInt(formValues.numberOfKitchens) || 0;
    
    // Calculate total fixture count
    const specifiedFixtureCount = parseInt(formValues.numberOfFixtures) || 0;
    const estimatedFixtureCount = bathroomCount * 4 + kitchenCount * 2; // Rough estimate
    const totalFixtureCount = specifiedFixtureCount > 0 ? specifiedFixtureCount : estimatedFixtureCount;
    
    // Get pipe length estimates
    const pipeLengths = getAveragePipeLengths(formValues.buildingType, floorCount);
    
    // Calculate water supply pipe requirements
    const waterSupplyPipes: PipeSegment[] = [
      { name: 'Main Supply Line', size: '1', length: pipeLengths.mainSupply, quantity: 1 },
      { name: 'Branch Supply Lines', size: '0.75', length: pipeLengths.branchSupply, quantity: bathroomCount + kitchenCount },
      { name: 'Fixture Supply Lines', size: '0.5', length: 5, quantity: totalFixtureCount }
    ];
    
    // Calculate drainage pipe requirements
    const drainagePipes: PipeSegment[] = [
      { name: 'Main Drain Line', size: '4', length: pipeLengths.mainDrainage, quantity: 1 },
      { name: 'Branch Drain Lines', size: '2', length: pipeLengths.branchDrainage, quantity: bathroomCount + kitchenCount },
      { name: 'Fixture Drain Connections', size: '1.5', length: 3, quantity: totalFixtureCount },
      { name: 'Vent Pipes', size: '2', length: 15 * floorCount, quantity: 1 }
    ];
    
    // Calculate fixtures
    const fixtures = estimateFixtures(bathroomCount, kitchenCount);
    
    // Calculate water storage capacity in liters
    const waterUsagePerPerson = formValues.buildingType === 'residential' ? 200 : 
                                formValues.buildingType === 'commercial' ? 50 :
                                100; // liters per day per person
    const occupancyEstimate = formValues.buildingType === 'residential' ? bathroomCount * 2 :
                              totalFixtureCount * 2;
    
    const specifiedStorage = parseInt(formValues.waterStorageRequired) || 0;
    const calculatedStorage = occupancyEstimate * waterUsagePerPerson;
    const waterStorageCapacity = specifiedStorage > 0 ? specifiedStorage : calculatedStorage;
    
    // Calculate water heater capacity in liters
    let heaterCapacity = 0;
    if (formValues.waterHeaterType === 'storage') {
      heaterCapacity = bathroomCount * 50; // 50 liters per bathroom for storage heater
    } else if (formValues.waterHeaterType === 'instant') {
      heaterCapacity = bathroomCount * 5; // Lower capacity for instant heaters
    } else if (formValues.waterHeaterType === 'solar') {
      heaterCapacity = bathroomCount * 100; // Higher capacity for solar systems
    }
    
    // Recommend pump based on building characteristics
    let pumpRequirement = '';
    if (floorCount <= 1) {
      pumpRequirement = 'No pump required if municipal pressure is adequate';
    } else if (floorCount <= 3) {
      pumpRequirement = '0.5 HP pump recommended';
    } else if (floorCount <= 6) {
      pumpRequirement = '1 HP pump with pressure tank recommended';
    } else {
      pumpRequirement = 'Multi-stage pump system with pressure booster required';
    }
    
    // Calculate cost estimates
    let pipeCost = 0;
    waterSupplyPipes.forEach(pipe => {
      pipeCost += pipe.length * pipe.quantity * getPipeCostPerFoot(formValues.pipeType, pipe.size);
    });
    
    drainagePipes.forEach(pipe => {
      pipeCost += pipe.length * pipe.quantity * getPipeCostPerFoot('upvc', pipe.size); // Drainage is typically UPVC regardless
    });
    
    // Fixture costs (rough estimates)
    let fixtureCost = 0;
    fixtures.forEach(fixture => {
      if (fixture.name === 'Toilet') fixtureCost += fixture.quantity * 5000;
      else if (fixture.name === 'Sink/Basin') fixtureCost += fixture.quantity * 3000;
      else if (fixture.name === 'Shower') fixtureCost += fixture.quantity * 4000;
      else if (fixture.name === 'Bathtub') fixtureCost += fixture.quantity * 15000;
      else if (fixture.name === 'Kitchen Sink') fixtureCost += fixture.quantity * 5000;
      else if (fixture.name === 'Washing Machine Connection') fixtureCost += fixture.quantity * 1000;
      else if (fixture.name === 'Water Heater Connection') fixtureCost += fixture.quantity * 1000;
      else if (fixture.name === 'Floor Drain') fixtureCost += fixture.quantity * 500;
      else if (fixture.name === 'Main Shut-off Valve') fixtureCost += fixture.quantity * 1200;
      else if (fixture.name === 'Angle Valves') fixtureCost += fixture.quantity * 300;
    });
    
    // Storage costs
    const storageCost = waterStorageCapacity <= 1000 ? waterStorageCapacity * 1.5 :
                        waterStorageCapacity <= 5000 ? waterStorageCapacity * 1.2 :
                        waterStorageCapacity * 1;
    
    // Labor costs (estimated at 40% of material costs)
    const laborCost = (pipeCost + fixtureCost + storageCost) * 0.4;
    
    // Total cost
    const estimatedCost = pipeCost + fixtureCost + storageCost + laborCost;
    
    // Material breakdown
    const materialBreakdown = {
      pipes: pipeCost,
      fixtures: fixtureCost,
      storage: storageCost,
      labor: laborCost
    };
    
    setResults({
      waterSupplyPipes,
      drainagePipes,
      fixtures,
      waterStorageCapacity,
      heaterCapacity,
      pumpRequirement,
      estimatedCost,
      materialBreakdown
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-heading text-2xl font-bold text-primary">Plumbing Materials Calculator</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>
        
        <p className="text-secondary mb-6">
          Calculate the plumbing materials needed for your construction project including pipe lengths, fittings, and fixtures.
        </p>
        
        <form onSubmit={calculatePlumbing} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-secondary-dark mb-2">Building Type*</label>
              <select
                name="buildingType"
                value={formValues.buildingType}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray rounded focus:outline-none focus:ring-2 focus:ring-primary"
                required
              >
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
                <option value="industrial">Industrial</option>
              </select>
            </div>
            
            <div>
              <label className="block text-secondary-dark mb-2">Number of Floors*</label>
              <input 
                type="number" 
                name="numberOfFloors"
                value={formValues.numberOfFloors}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray rounded focus:outline-none focus:ring-2 focus:ring-primary" 
                required
                min="1"
                max="20"
                step="1"
                placeholder="e.g., 2"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-secondary-dark mb-2">Number of Bathrooms*</label>
              <input 
                type="number" 
                name="numberOfBathrooms"
                value={formValues.numberOfBathrooms}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray rounded focus:outline-none focus:ring-2 focus:ring-primary" 
                required
                min="0"
                step="1"
                placeholder="e.g., 2"
              />
            </div>
            
            <div>
              <label className="block text-secondary-dark mb-2">Number of Kitchens*</label>
              <input 
                type="number" 
                name="numberOfKitchens"
                value={formValues.numberOfKitchens}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray rounded focus:outline-none focus:ring-2 focus:ring-primary" 
                required
                min="0"
                step="1"
                placeholder="e.g., 1"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-secondary-dark mb-2">Total Number of Fixtures (optional)</label>
              <input 
                type="number" 
                name="numberOfFixtures"
                value={formValues.numberOfFixtures}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray rounded focus:outline-none focus:ring-2 focus:ring-primary" 
                min="0"
                step="1"
                placeholder="e.g., 12"
              />
              <p className="text-xs text-secondary mt-1">
                Leave empty to calculate automatically
              </p>
            </div>
            
            <div>
              <label className="block text-secondary-dark mb-2">Water Supply Pipe Type*</label>
              <select
                name="pipeType"
                value={formValues.pipeType}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray rounded focus:outline-none focus:ring-2 focus:ring-primary"
                required
              >
                <option value="upvc">UPVC (Standard)</option>
                <option value="cpvc">CPVC (Hot & Cold Water)</option>
                <option value="copper">Copper (Premium)</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-secondary-dark mb-2">Water Heater Type*</label>
              <select
                name="waterHeaterType"
                value={formValues.waterHeaterType}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray rounded focus:outline-none focus:ring-2 focus:ring-primary"
                required
              >
                <option value="storage">Storage Tank Heater</option>
                <option value="instant">Instant/Tankless Heater</option>
                <option value="solar">Solar Water Heater</option>
                <option value="none">No Water Heater</option>
              </select>
            </div>
            
            <div>
              <label className="block text-secondary-dark mb-2">Water Storage Capacity (Liters, optional)</label>
              <input 
                type="number" 
                name="waterStorageRequired"
                value={formValues.waterStorageRequired}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray rounded focus:outline-none focus:ring-2 focus:ring-primary" 
                min="0"
                step="100"
                placeholder="e.g., 1000"
              />
              <p className="text-xs text-secondary mt-1">
                Leave empty to calculate recommended capacity
              </p>
            </div>
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-accent hover:bg-amber-600 text-white font-medium py-3 px-6 rounded transition duration-200"
          >
            Calculate Plumbing Requirements
          </button>
        </form>
        
        {results && (
          <div className="mt-8 p-6 bg-gray-light rounded-lg">
            <h4 className="font-heading text-xl font-bold text-primary mb-4">Plumbing Materials Required</h4>
            
            <div className="mb-6">
              <h5 className="font-heading text-lg font-semibold text-primary mb-2">Water Supply Pipes</h5>
              <div className="overflow-x-auto">
                <table className="w-full bg-white border border-gray">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="py-2 px-4 border-b text-left">Pipe Type</th>
                      <th className="py-2 px-4 border-b text-center">Size (inch)</th>
                      <th className="py-2 px-4 border-b text-center">Length (feet)</th>
                      <th className="py-2 px-4 border-b text-center">Quantity</th>
                      <th className="py-2 px-4 border-b text-center">Total Length (feet)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.waterSupplyPipes.map((pipe, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-2 px-4">{pipe.name}</td>
                        <td className="py-2 px-4 text-center">{pipe.size}"</td>
                        <td className="py-2 px-4 text-center">{pipe.length}</td>
                        <td className="py-2 px-4 text-center">{pipe.quantity}</td>
                        <td className="py-2 px-4 text-center">{pipe.length * pipe.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="mb-6">
              <h5 className="font-heading text-lg font-semibold text-primary mb-2">Drainage Pipes</h5>
              <div className="overflow-x-auto">
                <table className="w-full bg-white border border-gray">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="py-2 px-4 border-b text-left">Pipe Type</th>
                      <th className="py-2 px-4 border-b text-center">Size (inch)</th>
                      <th className="py-2 px-4 border-b text-center">Length (feet)</th>
                      <th className="py-2 px-4 border-b text-center">Quantity</th>
                      <th className="py-2 px-4 border-b text-center">Total Length (feet)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.drainagePipes.map((pipe, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-2 px-4">{pipe.name}</td>
                        <td className="py-2 px-4 text-center">{pipe.size}"</td>
                        <td className="py-2 px-4 text-center">{pipe.length}</td>
                        <td className="py-2 px-4 text-center">{pipe.quantity}</td>
                        <td className="py-2 px-4 text-center">{pipe.length * pipe.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="mb-6">
              <h5 className="font-heading text-lg font-semibold text-primary mb-2">Fixtures Required</h5>
              <div className="overflow-x-auto">
                <table className="w-full bg-white border border-gray">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="py-2 px-4 border-b text-left">Fixture</th>
                      <th className="py-2 px-4 border-b text-center">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.fixtures.map((fixture, index) => (
                      fixture.quantity > 0 && (
                        <tr key={index} className="border-b">
                          <td className="py-2 px-4">{fixture.name}</td>
                          <td className="py-2 px-4 text-center">{fixture.quantity}</td>
                        </tr>
                      )
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center border-b border-gray pb-2">
                <span className="text-secondary-dark font-medium">Recommended Water Storage Capacity:</span>
                <span className="font-bold text-primary">{results.waterStorageCapacity.toLocaleString()} liters</span>
              </div>
              
              {results.heaterCapacity > 0 && (
                <div className="flex justify-between items-center border-b border-gray pb-2">
                  <span className="text-secondary-dark font-medium">Recommended Water Heater Capacity:</span>
                  <span className="font-bold text-primary">{results.heaterCapacity.toLocaleString()} liters</span>
                </div>
              )}
              
              <div className="flex justify-between items-center border-b border-gray pb-2">
                <span className="text-secondary-dark font-medium">Pump Recommendation:</span>
                <span className="font-bold text-primary">{results.pumpRequirement}</span>
              </div>
              
              <div className="pt-4 pb-2">
                <span className="font-medium text-primary">Cost Breakdown:</span>
              </div>
              
              <div className="flex justify-between items-center pl-4 border-b border-gray pb-2">
                <span className="text-secondary-dark">Pipes & Fittings:</span>
                <span className="font-medium">₹{results.materialBreakdown.pipes.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center pl-4 border-b border-gray pb-2">
                <span className="text-secondary-dark">Fixtures:</span>
                <span className="font-medium">₹{results.materialBreakdown.fixtures.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center pl-4 border-b border-gray pb-2">
                <span className="text-secondary-dark">Water Storage Solutions:</span>
                <span className="font-medium">₹{results.materialBreakdown.storage.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center pl-4 border-b border-gray pb-2">
                <span className="text-secondary-dark">Labor Cost (estimate):</span>
                <span className="font-medium">₹{results.materialBreakdown.labor.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-primary font-bold">Total Estimated Cost:</span>
                <span className="text-primary font-bold">₹{results.estimatedCost.toLocaleString()}</span>
              </div>
            </div>
            
            <div className="mt-6 text-sm text-secondary">
              <p><strong>Note:</strong> These calculations provide an estimate based on standard plumbing layouts. Actual requirements may vary depending on building layout, specific fixture selections, and local plumbing codes. For a detailed plumbing plan, please <Link href="/contact"><span className="text-accent hover:underline cursor-pointer">contact our plumbing specialists</span></Link>.</p>
            </div>
            <div className="mt-6">
              <Link href="/contact">
                <div className="block w-full bg-primary hover:bg-primary-light text-white font-medium py-3 px-6 rounded text-center transition duration-200 cursor-pointer">
                  Get Professional Plumbing Quote
                </div>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlumbingCalculator;