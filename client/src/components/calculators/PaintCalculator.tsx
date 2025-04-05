import { useState } from 'react';
import { Link } from 'wouter';

// Types for paint calculator
type PaintInputs = {
  roomLength: string;
  roomWidth: string;
  roomHeight: string;
  doorCount: string;
  windowCount: string;
  paintQuality: string;
  coatCount: string;
};

type PaintResults = {
  wallArea: number;
  doorWindowArea: number;
  paintableArea: number;
  paintLiters: number;
  paintCans: { size: string; count: number }[];
  estimatedCost: number;
};

const PaintCalculator = ({ onClose }: { onClose: () => void }) => {
  const [inputs, setInputs] = useState<PaintInputs>({
    roomLength: '',
    roomWidth: '',
    roomHeight: '',
    doorCount: '1',
    windowCount: '1',
    paintQuality: 'standard',
    coatCount: '2'
  });

  const [results, setResults] = useState<PaintResults | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: value }));
  };

  const calculatePaint = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Get input values
    const roomLength = parseFloat(inputs.roomLength) || 0;
    const roomWidth = parseFloat(inputs.roomWidth) || 0;
    const roomHeight = parseFloat(inputs.roomHeight) || 0;
    const doorCount = parseInt(inputs.doorCount) || 0;
    const windowCount = parseInt(inputs.windowCount) || 0;
    
    // Standard sizes (in square feet)
    const doorArea = 21; // 7 feet x 3 feet
    const windowArea = 15; // 5 feet x 3 feet
    
    // Calculate total wall area
    const wallArea = 2 * (roomLength + roomWidth) * roomHeight;
    
    // Calculate door and window area
    const totalDoorArea = doorCount * doorArea;
    const totalWindowArea = windowCount * windowArea;
    const doorWindowArea = totalDoorArea + totalWindowArea;
    
    // Calculate paintable area
    const paintableArea = wallArea - doorWindowArea;
    
    // Paint coverage depends on quality and number of coats
    // Coverage in sq ft per liter
    const coverageRates = {
      economy: 100,
      standard: 125,
      premium: 150
    };
    
    const paintQuality = inputs.paintQuality as keyof typeof coverageRates;
    const coverage = coverageRates[paintQuality] || coverageRates.standard;
    
    // Number of coats
    const coatCount = parseInt(inputs.coatCount) || 2;
    
    // Calculate paint required (in liters)
    const paintLiters = (paintableArea / coverage) * coatCount;
    
    // Calculate number of paint cans needed
    // Standard paint can sizes in liters
    const canSizes = [20, 10, 4, 1];
    const paintCans: { size: string; count: number }[] = [];
    
    let remainingPaint = paintLiters;
    
    canSizes.forEach(size => {
      if (remainingPaint >= size) {
        const cansNeeded = Math.floor(remainingPaint / size);
        paintCans.push({ size: `${size}L`, count: cansNeeded });
        remainingPaint = remainingPaint % size;
      }
    });
    
    // If there's still paint needed, add smallest can size
    if (remainingPaint > 0) {
      paintCans.push({ size: "1L", count: 1 });
    }
    
    // Estimate cost based on quality and amount
    const basePricePerLiter = {
      economy: 200,    // ₹200 per liter
      standard: 350,   // ₹350 per liter
      premium: 500     // ₹500 per liter
    };
    
    const pricePerLiter = basePricePerLiter[paintQuality] || basePricePerLiter.standard;
    const estimatedCost = paintLiters * pricePerLiter;
    
    setResults({
      wallArea,
      doorWindowArea,
      paintableArea,
      paintLiters,
      paintCans,
      estimatedCost
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-heading text-2xl font-bold text-primary">Paint Calculator</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>
        
        <p className="text-secondary mb-6">
          Estimate the amount of paint required for your room renovation. This calculator helps determine how much paint you'll need based on room dimensions and other factors.
        </p>
        
        <form onSubmit={calculatePaint} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-secondary-dark mb-2">Room Length (feet)*</label>
              <input 
                type="number" 
                name="roomLength"
                value={inputs.roomLength}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray rounded focus:outline-none focus:ring-2 focus:ring-primary" 
                required
                min="1"
                step="0.01"
                placeholder="e.g., 12"
              />
            </div>
            
            <div>
              <label className="block text-secondary-dark mb-2">Room Width (feet)*</label>
              <input 
                type="number" 
                name="roomWidth"
                value={inputs.roomWidth}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray rounded focus:outline-none focus:ring-2 focus:ring-primary" 
                required
                min="1"
                step="0.01"
                placeholder="e.g., 10"
              />
            </div>
            
            <div>
              <label className="block text-secondary-dark mb-2">Room Height (feet)*</label>
              <input 
                type="number" 
                name="roomHeight"
                value={inputs.roomHeight}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray rounded focus:outline-none focus:ring-2 focus:ring-primary" 
                required
                min="1"
                step="0.01"
                placeholder="e.g., 9"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-secondary-dark mb-2">Number of Doors</label>
              <select
                name="doorCount"
                value={inputs.doorCount}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray rounded focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            
            <div>
              <label className="block text-secondary-dark mb-2">Number of Windows</label>
              <select
                name="windowCount"
                value={inputs.windowCount}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray rounded focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-secondary-dark mb-2">Paint Quality*</label>
              <select
                name="paintQuality"
                value={inputs.paintQuality}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray rounded focus:outline-none focus:ring-2 focus:ring-primary"
                required
              >
                <option value="economy">Economy (Basic)</option>
                <option value="standard">Standard (Mid-range)</option>
                <option value="premium">Premium (High-end)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-secondary-dark mb-2">Number of Coats*</label>
              <select
                name="coatCount"
                value={inputs.coatCount}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray rounded focus:outline-none focus:ring-2 focus:ring-primary"
                required
              >
                <option value="1">1 Coat (Light refresh)</option>
                <option value="2">2 Coats (Standard)</option>
                <option value="3">3 Coats (Dark colors/Complete change)</option>
              </select>
            </div>
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-accent hover:bg-amber-600 text-white font-medium py-3 px-6 rounded transition duration-200"
          >
            Calculate Paint Requirements
          </button>
        </form>
        
        {results && (
          <div className="mt-8 p-6 bg-gray-light rounded-lg">
            <h4 className="font-heading text-xl font-bold text-primary mb-4">Paint Requirements</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center border-b border-gray pb-2">
                <span className="text-secondary-dark font-medium">Total Wall Area:</span>
                <span className="font-bold text-primary">{results.wallArea.toFixed(2)} sq ft</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray pb-2">
                <span className="text-secondary-dark font-medium">Door & Window Area:</span>
                <span className="font-bold text-primary">{results.doorWindowArea.toFixed(2)} sq ft</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray pb-2">
                <span className="text-secondary-dark font-medium">Paintable Wall Area:</span>
                <span className="font-bold text-primary">{results.paintableArea.toFixed(2)} sq ft</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray pb-2">
                <span className="text-secondary-dark font-medium">Paint Required:</span>
                <span className="font-bold text-primary">{results.paintLiters.toFixed(2)} liters</span>
              </div>
              <div className="border-b border-gray pb-2">
                <div className="flex justify-between items-center">
                  <span className="text-secondary-dark font-medium">Recommended Paint Cans:</span>
                </div>
                <div className="mt-2 pl-4">
                  {results.paintCans.map((can, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span>{can.count} x {can.size} can{can.count > 1 ? 's' : ''}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-primary font-bold">Estimated Cost:</span>
                <span className="text-primary font-bold">₹{results.estimatedCost.toFixed(2)}</span>
              </div>
            </div>
            <div className="mt-6 text-sm text-secondary">
              <p><strong>Note:</strong> These calculations are estimates based on standard coverage rates. Actual paint requirements may vary based on surface texture, porosity, color change, and application method. For professional painting services, please <Link href="/contact"><span className="text-accent hover:underline cursor-pointer">contact our team</span></Link>.</p>
            </div>
            <div className="mt-6">
              <Link href="/contact">
                <div className="block w-full bg-primary hover:bg-primary-light text-white font-medium py-3 px-6 rounded text-center transition duration-200 cursor-pointer">
                  Get Professional Painting Services
                </div>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaintCalculator;