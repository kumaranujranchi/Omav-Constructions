import { useState } from 'react';
import { Link } from 'wouter';

// Types for electrical calculator
type ElectricalLoadItem = {
  id: string;
  name: string;
  watts: number;
  quantity: number;
  hoursPerDay: number;
};

type ElectricalFormType = {
  propertyType: string;
  area: string;
  phase: string;
};

type ElectricalResultType = {
  connectedLoad: number;
  maxDemand: number;
  currentPerPhase: number;
  totalUnits: number;
  recommendedMainSwitch: string;
  recommendedSolarSize: number;
  estimatedMonthlyCost: number;
  loadItems: ElectricalLoadItem[];
};

// Default load items by property type
const defaultLoadItems: Record<string, ElectricalLoadItem[]> = {
  residential: [
    { id: '1', name: 'LED Lights', watts: 10, quantity: 12, hoursPerDay: 6 },
    { id: '2', name: 'Ceiling Fan', watts: 75, quantity: 4, hoursPerDay: 10 },
    { id: '3', name: 'Refrigerator', watts: 700, quantity: 1, hoursPerDay: 24 },
    { id: '4', name: 'Air Conditioner (1 ton)', watts: 1200, quantity: 2, hoursPerDay: 8 },
    { id: '5', name: 'Television (LED)', watts: 100, quantity: 1, hoursPerDay: 6 },
    { id: '6', name: 'Washing Machine', watts: 500, quantity: 1, hoursPerDay: 1 },
    { id: '7', name: 'Water Heater', watts: 2000, quantity: 1, hoursPerDay: 1 },
    { id: '8', name: 'Microwave Oven', watts: 1200, quantity: 1, hoursPerDay: 0.5 },
    { id: '9', name: 'Water Pump', watts: 750, quantity: 1, hoursPerDay: 2 }
  ],
  commercial: [
    { id: '1', name: 'LED Lights', watts: 10, quantity: 30, hoursPerDay: 10 },
    { id: '2', name: 'Ceiling Fan', watts: 75, quantity: 10, hoursPerDay: 10 },
    { id: '3', name: 'Air Conditioner (2 ton)', watts: 2400, quantity: 4, hoursPerDay: 10 },
    { id: '4', name: 'Desktop Computer', watts: 200, quantity: 8, hoursPerDay: 8 },
    { id: '5', name: 'Server & Networking', watts: 500, quantity: 1, hoursPerDay: 24 },
    { id: '6', name: 'Printer/Copier', watts: 1000, quantity: 2, hoursPerDay: 2 },
    { id: '7', name: 'Water Dispenser', watts: 100, quantity: 2, hoursPerDay: 10 },
    { id: '8', name: 'Commercial Refrigerator', watts: 1200, quantity: 1, hoursPerDay: 24 },
    { id: '9', name: 'Elevator', watts: 5000, quantity: 1, hoursPerDay: 4 }
  ],
  industrial: [
    { id: '1', name: 'Industrial Lighting', watts: 400, quantity: 20, hoursPerDay: 12 },
    { id: '2', name: 'HVAC System', watts: 10000, quantity: 1, hoursPerDay: 10 },
    { id: '3', name: 'Production Machines', watts: 5000, quantity: 4, hoursPerDay: 8 },
    { id: '4', name: 'Conveyor Belt', watts: 2000, quantity: 2, hoursPerDay: 8 },
    { id: '5', name: 'Air Compressor', watts: 3000, quantity: 1, hoursPerDay: 6 },
    { id: '6', name: 'Water Pump', watts: 1500, quantity: 2, hoursPerDay: 4 },
    { id: '7', name: 'Welding Machine', watts: 7000, quantity: 1, hoursPerDay: 3 },
    { id: '8', name: 'Office Equipment', watts: 3000, quantity: 1, hoursPerDay: 8 },
    { id: '9', name: 'Security System', watts: 500, quantity: 1, hoursPerDay: 24 }
  ]
};

const ElectricalCalculator = ({ onClose }: { onClose: () => void }) => {
  const [formValues, setFormValues] = useState<ElectricalFormType>({
    propertyType: 'residential',
    area: '',
    phase: 'single'
  });

  const [loadItems, setLoadItems] = useState<ElectricalLoadItem[]>(defaultLoadItems.residential);
  const [newItemName, setNewItemName] = useState('');
  const [newItemWatts, setNewItemWatts] = useState('');
  const [newItemQuantity, setNewItemQuantity] = useState('1');
  const [newItemHours, setNewItemHours] = useState('1');
  
  const [results, setResults] = useState<ElectricalResultType | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'propertyType') {
      // Update load items when property type changes
      setLoadItems(defaultLoadItems[value]);
    }
    
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  const handleAddItem = () => {
    if (newItemName && newItemWatts) {
      const newItem: ElectricalLoadItem = {
        id: `custom-${Date.now()}`,
        name: newItemName,
        watts: parseFloat(newItemWatts) || 0,
        quantity: parseInt(newItemQuantity) || 1,
        hoursPerDay: parseFloat(newItemHours) || 1
      };
      
      setLoadItems(prev => [...prev, newItem]);
      // Reset form
      setNewItemName('');
      setNewItemWatts('');
      setNewItemQuantity('1');
      setNewItemHours('1');
    }
  };
  
  const handleRemoveItem = (id: string) => {
    setLoadItems(prev => prev.filter(item => item.id !== id));
  };
  
  const handleUpdateItem = (id: string, field: keyof ElectricalLoadItem, value: string | number) => {
    setLoadItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, [field]: typeof value === 'string' ? parseFloat(value) || 0 : value } : item
      )
    );
  };

  const calculateElectricalLoad = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Calculate connected load (in watts)
    let connectedLoad = 0;
    let dailyUnitConsumption = 0;
    
    loadItems.forEach(item => {
      const itemWatts = item.watts * item.quantity;
      connectedLoad += itemWatts;
      dailyUnitConsumption += (itemWatts * item.hoursPerDay) / 1000; // kWh = watts * hours / 1000
    });
    
    // Calculate demand factors based on property type
    let demandFactor = 0.6; // Default demand factor
    
    switch (formValues.propertyType) {
      case 'residential':
        demandFactor = connectedLoad <= 10000 ? 0.7 : 0.6;
        break;
      case 'commercial':
        demandFactor = connectedLoad <= 25000 ? 0.65 : 0.55;
        break;
      case 'industrial':
        demandFactor = connectedLoad <= 50000 ? 0.75 : 0.65;
        break;
      default:
        demandFactor = 0.6;
    }
    
    // Apply demand factor to get maximum demand
    const maxDemand = connectedLoad * demandFactor;
    
    // Calculate current (in amps) based on phase
    let currentPerPhase = 0;
    
    if (formValues.phase === 'single') {
      // Single phase: I = W / (V * PF)
      // Assuming voltage = 230V and power factor = 0.8
      currentPerPhase = maxDemand / (230 * 0.8);
    } else {
      // Three phase: I = W / (√3 * V * PF)
      // Assuming voltage = 400V and power factor = 0.8
      currentPerPhase = maxDemand / (Math.sqrt(3) * 400 * 0.8);
    }
    
    // Monthly units consumption
    const monthlyUnits = dailyUnitConsumption * 30; // kWh per month
    
    // Recommended main switch size (next standard size up)
    let recommendedMainSwitch = '';
    const standardSizes = [16, 25, 32, 40, 50, 63, 80, 100, 125, 160, 200, 250, 400, 630, 800, 1000];
    
    for (const size of standardSizes) {
      if (size >= Math.ceil(currentPerPhase * 1.25)) { // 25% safety margin
        recommendedMainSwitch = `${size} Amps`;
        break;
      }
    }
    
    if (!recommendedMainSwitch) {
      recommendedMainSwitch = '1000+ Amps (Custom Solution Required)';
    }
    
    // Recommended solar system size in kW
    const recommendedSolarSize = (monthlyUnits / 30) / 4; // Assuming 4 peak sun hours per day
    
    // Estimated monthly electricity cost (Rs. 8 per unit)
    const estimatedMonthlyCost = monthlyUnits * 8;
    
    setResults({
      connectedLoad,
      maxDemand,
      currentPerPhase,
      totalUnits: monthlyUnits,
      recommendedMainSwitch,
      recommendedSolarSize,
      estimatedMonthlyCost,
      loadItems
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-heading text-2xl font-bold text-primary">Electrical Load Calculator</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>
        
        <p className="text-secondary mb-6">
          Calculate the electrical requirements for your new construction project based on appliances and devices.
        </p>
        
        <form onSubmit={calculateElectricalLoad} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-secondary-dark mb-2">Property Type*</label>
              <select
                name="propertyType"
                value={formValues.propertyType}
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
              <label className="block text-secondary-dark mb-2">Build-up Area (sq. ft.)</label>
              <input 
                type="number" 
                name="area"
                value={formValues.area}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray rounded focus:outline-none focus:ring-2 focus:ring-primary" 
                min="0"
                step="1"
                placeholder="e.g., 1500"
              />
            </div>
            
            <div>
              <label className="block text-secondary-dark mb-2">Phase*</label>
              <select
                name="phase"
                value={formValues.phase}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray rounded focus:outline-none focus:ring-2 focus:ring-primary"
                required
              >
                <option value="single">Single Phase (230V)</option>
                <option value="three">Three Phase (400V)</option>
              </select>
            </div>
          </div>
          
          <div className="mt-4">
            <h4 className="font-heading text-lg font-bold text-primary mb-4">Electrical Load Items</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray">
                <thead>
                  <tr className="bg-gray-light">
                    <th className="py-2 px-4 border-b text-left">Item</th>
                    <th className="py-2 px-4 border-b text-right">Watts</th>
                    <th className="py-2 px-4 border-b text-right">Quantity</th>
                    <th className="py-2 px-4 border-b text-right">Hours/Day</th>
                    <th className="py-2 px-4 border-b text-right">Total Watts</th>
                    <th className="py-2 px-4 border-b"></th>
                  </tr>
                </thead>
                <tbody>
                  {loadItems.map(item => (
                    <tr key={item.id} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-4">
                        <input
                          type="text"
                          value={item.name}
                          onChange={(e) => handleUpdateItem(item.id, 'name', e.target.value)}
                          className="w-full p-1 border border-gray rounded"
                        />
                      </td>
                      <td className="py-2 px-4">
                        <input
                          type="number"
                          value={item.watts}
                          onChange={(e) => handleUpdateItem(item.id, 'watts', e.target.value)}
                          className="w-full p-1 border border-gray rounded text-right"
                          min="0"
                        />
                      </td>
                      <td className="py-2 px-4">
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => handleUpdateItem(item.id, 'quantity', e.target.value)}
                          className="w-full p-1 border border-gray rounded text-right"
                          min="0"
                        />
                      </td>
                      <td className="py-2 px-4">
                        <input
                          type="number"
                          value={item.hoursPerDay}
                          onChange={(e) => handleUpdateItem(item.id, 'hoursPerDay', e.target.value)}
                          className="w-full p-1 border border-gray rounded text-right"
                          min="0"
                          max="24"
                          step="0.5"
                        />
                      </td>
                      <td className="py-2 px-4 text-right font-medium">
                        {(item.watts * item.quantity).toLocaleString()}
                      </td>
                      <td className="py-2 px-4 text-center">
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-50">
                    <td className="py-2 px-4">
                      <input
                        type="text"
                        value={newItemName}
                        onChange={(e) => setNewItemName(e.target.value)}
                        placeholder="Add new item..."
                        className="w-full p-1 border border-gray rounded"
                      />
                    </td>
                    <td className="py-2 px-4">
                      <input
                        type="number"
                        value={newItemWatts}
                        onChange={(e) => setNewItemWatts(e.target.value)}
                        placeholder="Watts"
                        className="w-full p-1 border border-gray rounded text-right"
                        min="0"
                      />
                    </td>
                    <td className="py-2 px-4">
                      <input
                        type="number"
                        value={newItemQuantity}
                        onChange={(e) => setNewItemQuantity(e.target.value)}
                        placeholder="Qty"
                        className="w-full p-1 border border-gray rounded text-right"
                        min="1"
                      />
                    </td>
                    <td className="py-2 px-4">
                      <input
                        type="number"
                        value={newItemHours}
                        onChange={(e) => setNewItemHours(e.target.value)}
                        placeholder="Hours"
                        className="w-full p-1 border border-gray rounded text-right"
                        min="0"
                        max="24"
                        step="0.5"
                      />
                    </td>
                    <td className="py-2 px-4"></td>
                    <td className="py-2 px-4 text-center">
                      <button
                        type="button"
                        onClick={handleAddItem}
                        className="text-primary hover:text-primary-dark"
                        disabled={!newItemName || !newItemWatts}
                      >
                        <i className="fas fa-plus"></i>
                      </button>
                    </td>
                  </tr>
                  <tr className="bg-primary text-white font-medium">
                    <td className="py-2 px-4" colSpan={4}>Total Connected Load</td>
                    <td className="py-2 px-4 text-right">
                      {loadItems.reduce((sum, item) => sum + (item.watts * item.quantity), 0).toLocaleString()} W
                    </td>
                    <td className="py-2 px-4"></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-accent hover:bg-amber-600 text-white font-medium py-3 px-6 rounded transition duration-200"
          >
            Calculate Electrical Requirements
          </button>
        </form>
        
        {results && (
          <div className="mt-8 p-6 bg-gray-light rounded-lg">
            <h4 className="font-heading text-xl font-bold text-primary mb-4">Electrical Requirements</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center border-b border-gray pb-2">
                <span className="text-secondary-dark font-medium">Connected Load:</span>
                <span className="font-bold text-primary">{results.connectedLoad.toLocaleString()} Watts</span>
              </div>
              
              <div className="flex justify-between items-center border-b border-gray pb-2">
                <span className="text-secondary-dark font-medium">Maximum Demand:</span>
                <span className="font-bold text-primary">{results.maxDemand.toLocaleString()} Watts</span>
              </div>
              
              <div className="flex justify-between items-center border-b border-gray pb-2">
                <span className="text-secondary-dark font-medium">Current per Phase:</span>
                <span className="font-bold text-primary">{results.currentPerPhase.toFixed(2)} Amps</span>
              </div>
              
              <div className="flex justify-between items-center border-b border-gray pb-2">
                <span className="text-secondary-dark font-medium">Recommended Main Switch Size:</span>
                <span className="font-bold text-primary">{results.recommendedMainSwitch}</span>
              </div>
              
              <div className="flex justify-between items-center border-b border-gray pb-2">
                <span className="text-secondary-dark font-medium">Estimated Monthly Consumption:</span>
                <span className="font-bold text-primary">{results.totalUnits.toFixed(2)} kWh (Units)</span>
              </div>
              
              <div className="flex justify-between items-center border-b border-gray pb-2">
                <span className="text-secondary-dark font-medium">Estimated Monthly Electricity Bill:</span>
                <span className="font-bold text-primary">₹{results.estimatedMonthlyCost.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between items-center pt-2">
                <span className="text-primary font-medium">Recommended Solar System Size:</span>
                <span className="font-medium text-primary">{results.recommendedSolarSize.toFixed(2)} kW</span>
              </div>
            </div>
            <div className="mt-6 text-sm text-secondary">
              <p><strong>Note:</strong> These calculations provide an estimate based on standard electrical parameters. Actual requirements may vary based on equipment specifications, local electrical codes, and power quality requirements. For a detailed electrical plan, please <Link href="/contact"><span className="text-accent hover:underline cursor-pointer">contact our electrical engineering team</span></Link>.</p>
            </div>
            <div className="mt-6">
              <Link href="/contact">
                <div className="block w-full bg-primary hover:bg-primary-light text-white font-medium py-3 px-6 rounded text-center transition duration-200 cursor-pointer">
                  Get Professional Electrical Design Quote
                </div>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ElectricalCalculator;