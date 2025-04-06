import { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

type RenovationProject = {
  id: string;
  name: string;
  cost: number;
  valueAdded: number;
  roi: number;
};

type RenovationFormType = {
  propertyType: string;
  propertyValue: string;
  propertyLocation: string;
  renovationBudget: string;
  selectedProjects: string[];
  customProject: string;
  customCost: string;
};

type RenovationResultType = {
  currentPropertyValue: number;
  totalRenovationCost: number;
  estimatedValueAfterRenovation: number;
  netValueGain: number;
  overallRoi: number;
  breakdownByProject: RenovationProject[];
  recommendedAlternatives: {
    name: string;
    roi: number;
    cost: number;
    valueAdded: number;
  }[];
};

interface RenovationRoiCalculatorProps {
  onClose: () => void;
}

const RenovationRoiCalculator = ({ onClose }: RenovationRoiCalculatorProps) => {
  const [formData, setFormData] = useState<RenovationFormType>({
    propertyType: '',
    propertyValue: '',
    propertyLocation: '',
    renovationBudget: '',
    selectedProjects: [],
    customProject: '',
    customCost: '',
  });

  const [customProjects, setCustomProjects] = useState<RenovationProject[]>([]);
  const [results, setResults] = useState<RenovationResultType | null>(null);
  const [showResults, setShowResults] = useState(false);

  // Common renovation projects with typical ROI data
  const renovationProjects = [
    { id: 'kitchen', name: 'Kitchen Remodel', defaultCost: 25000, defaultRoi: 0.75 },
    { id: 'bathroom', name: 'Bathroom Remodel', defaultCost: 10000, defaultRoi: 0.70 },
    { id: 'roofing', name: 'Roof Replacement', defaultCost: 8000, defaultRoi: 0.68 },
    { id: 'windows', name: 'Window Replacement', defaultCost: 10000, defaultRoi: 0.72 },
    { id: 'siding', name: 'Exterior Siding', defaultCost: 15000, defaultRoi: 0.80 },
    { id: 'flooring', name: 'Flooring Upgrade', defaultCost: 6000, defaultRoi: 0.65 },
    { id: 'painting', name: 'Interior Painting', defaultCost: 4000, defaultRoi: 0.60 },
    { id: 'landscaping', name: 'Landscaping', defaultCost: 5000, defaultRoi: 0.83 },
    { id: 'deck', name: 'Deck Addition', defaultCost: 12000, defaultRoi: 0.76 },
    { id: 'hvac', name: 'HVAC Upgrade', defaultCost: 8000, defaultRoi: 0.85 }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        selectedProjects: [...prev.selectedProjects, value],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        selectedProjects: prev.selectedProjects.filter(project => project !== value),
      }));
    }
  };

  const addCustomProject = () => {
    if (formData.customProject.trim() && formData.customCost.trim()) {
      const cost = parseFloat(formData.customCost);
      
      if (isNaN(cost) || cost <= 0) return;
      
      const newProject: RenovationProject = {
        id: uuidv4(),
        name: formData.customProject.trim(),
        cost: cost,
        valueAdded: cost * 0.6, // Default ROI of 60% for custom projects
        roi: 0.6
      };
      
      setCustomProjects((prev) => [...prev, newProject]);
      setFormData((prev) => ({
        ...prev,
        customProject: '',
        customCost: ''
      }));
    }
  };

  const removeCustomProject = (id: string) => {
    setCustomProjects((prev) => prev.filter(project => project.id !== id));
  };

  const calculateRenovationRoi = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Parse input values
    const propertyValue = parseFloat(formData.propertyValue);
    const renovationBudget = parseFloat(formData.renovationBudget);
    
    // Property location factors (adjust value gain based on location)
    const locationFactors: Record<string, number> = {
      urban: 1.2,
      suburban: 1.0,
      rural: 0.8
    };
    
    // Property type factors
    const propertyTypeFactors: Record<string, number> = {
      residential: 1.0,
      commercial: 1.1,
      multifamily: 1.2
    };
    
    const locationFactor = locationFactors[formData.propertyLocation as keyof typeof locationFactors];
    const propertyTypeFactor = propertyTypeFactors[formData.propertyType as keyof typeof propertyTypeFactors];
    
    // Calculate for selected projects
    const projectBreakdown: RenovationProject[] = [];
    let totalCost = 0;
    let totalValueAdded = 0;
    
    // Process standard selected projects
    formData.selectedProjects.forEach(projectId => {
      const project = renovationProjects.find(p => p.id === projectId);
      if (project) {
        const cost = project.defaultCost;
        const baseValueAdded = cost * project.defaultRoi;
        
        // Adjust value based on location and property type
        const valueAdded = baseValueAdded * locationFactor * propertyTypeFactor;
        const roi = valueAdded / cost;
        
        projectBreakdown.push({
          id: project.id,
          name: project.name,
          cost: cost,
          valueAdded: parseFloat(valueAdded.toFixed(2)),
          roi: parseFloat(roi.toFixed(2))
        });
        
        totalCost += cost;
        totalValueAdded += valueAdded;
      }
    });
    
    // Add custom projects
    customProjects.forEach(project => {
      const baseValueAdded = project.cost * project.roi;
      const valueAdded = baseValueAdded * locationFactor * propertyTypeFactor;
      const roi = valueAdded / project.cost;
      
      projectBreakdown.push({
        id: project.id,
        name: project.name,
        cost: project.cost,
        valueAdded: parseFloat(valueAdded.toFixed(2)),
        roi: parseFloat(roi.toFixed(2))
      });
      
      totalCost += project.cost;
      totalValueAdded += valueAdded;
    });
    
    // Calculate overall metrics
    const estimatedValueAfterRenovation = propertyValue + totalValueAdded;
    const netValueGain = totalValueAdded - totalCost;
    const overallRoi = totalCost > 0 ? (netValueGain / totalCost) : 0;
    
    // Sort projects by ROI for easier reading
    projectBreakdown.sort((a, b) => b.roi - a.roi);
    
    // Generate alternative recommendations
    // Find projects NOT already selected that have good ROI
    const selectedProjectIds = [...formData.selectedProjects, ...customProjects.map(p => p.id)];
    const recommendedAlternatives = renovationProjects
      .filter(p => !selectedProjectIds.includes(p.id))
      .map(p => {
        const baseValueAdded = p.defaultCost * p.defaultRoi;
        const valueAdded = baseValueAdded * locationFactor * propertyTypeFactor;
        const roi = valueAdded / p.defaultCost;
        
        return {
          name: p.name,
          cost: p.defaultCost,
          valueAdded: parseFloat(valueAdded.toFixed(2)),
          roi: parseFloat(roi.toFixed(2))
        };
      })
      .sort((a, b) => b.roi - a.roi)
      .slice(0, 3); // Top 3 alternatives
    
    const results: RenovationResultType = {
      currentPropertyValue: propertyValue,
      totalRenovationCost: parseFloat(totalCost.toFixed(2)),
      estimatedValueAfterRenovation: parseFloat(estimatedValueAfterRenovation.toFixed(2)),
      netValueGain: parseFloat(netValueGain.toFixed(2)),
      overallRoi: parseFloat((overallRoi * 100).toFixed(1)),
      breakdownByProject: projectBreakdown,
      recommendedAlternatives
    };
    
    setResults(results);
    setShowResults(true);
  };

  const resetCalculator = () => {
    setFormData({
      propertyType: '',
      propertyValue: '',
      propertyLocation: '',
      renovationBudget: '',
      selectedProjects: [],
      customProject: '',
      customCost: '',
    });
    setCustomProjects([]);
    setResults(null);
    setShowResults(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-heading text-2xl font-bold text-primary">Renovation ROI Calculator</h3>
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
              Estimate the potential return on investment for your renovation projects. This calculator helps you understand which improvements might add the most value to your property.
            </p>
            
            <form onSubmit={calculateRenovationRoi} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-secondary-dark mb-2">Property Type</label>
                  <select
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  >
                    <option value="">Select Property Type</option>
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                    <option value="multifamily">Multi-Family</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-secondary-dark mb-2">Current Property Value (₹)</label>
                  <input
                    type="number"
                    name="propertyValue"
                    value={formData.propertyValue}
                    onChange={handleChange}
                    placeholder="e.g., 5000000"
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                    min="100000"
                  />
                </div>
                
                <div>
                  <label className="block text-secondary-dark mb-2">Property Location</label>
                  <select
                    name="propertyLocation"
                    value={formData.propertyLocation}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  >
                    <option value="">Select Location</option>
                    <option value="urban">Urban Area</option>
                    <option value="suburban">Suburban Area</option>
                    <option value="rural">Rural Area</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-secondary-dark mb-2">Renovation Budget (₹)</label>
                  <input
                    type="number"
                    name="renovationBudget"
                    value={formData.renovationBudget}
                    onChange={handleChange}
                    placeholder="e.g., 500000"
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                    min="10000"
                  />
                </div>
              </div>
              
              <div>
                <h4 className="font-heading text-lg font-semibold text-primary mb-3">Select Renovation Projects</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {renovationProjects.map((project) => (
                    <div key={project.id} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`project-${project.id}`}
                        name="selectedProjects"
                        value={project.id}
                        checked={formData.selectedProjects.includes(project.id)}
                        onChange={handleCheckboxChange}
                        className="mr-2 h-4 w-4 text-primary"
                      />
                      <label htmlFor={`project-${project.id}`} className="text-secondary-dark">
                        {project.name} (Est. ₹{project.defaultCost.toLocaleString()})
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-heading text-lg font-semibold text-primary mb-3">Add Custom Project</h4>
                <div className="flex items-end gap-3">
                  <div className="flex-1">
                    <label className="block text-secondary-dark mb-2">Project Name</label>
                    <input
                      type="text"
                      name="customProject"
                      value={formData.customProject}
                      onChange={handleChange}
                      placeholder="e.g., Garage Conversion"
                      className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-secondary-dark mb-2">Estimated Cost (₹)</label>
                    <input
                      type="number"
                      name="customCost"
                      value={formData.customCost}
                      onChange={handleChange}
                      placeholder="e.g., 200000"
                      className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                      min="1000"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={addCustomProject}
                    className="p-3 bg-accent text-white rounded-md hover:bg-accent-dark transition duration-200"
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                </div>
                
                {customProjects.length > 0 && (
                  <div className="mt-3">
                    <h5 className="text-secondary-dark font-medium mb-2">Custom Projects:</h5>
                    <ul className="space-y-2">
                      {customProjects.map((project) => (
                        <li key={project.id} className="flex justify-between items-center p-2 bg-gray-100 rounded">
                          <span>{project.name} (₹{project.cost.toLocaleString()})</span>
                          <button
                            type="button"
                            onClick={() => removeCustomProject(project.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
              <div className="flex justify-center space-x-4">
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
                  Calculate ROI
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            <div className="bg-primary-light/10 rounded-lg p-4 mb-6">
              <h4 className="font-heading text-xl font-bold text-primary mb-2">Renovation ROI Summary</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-secondary-dark">Current Property Value:</p>
                  <p className="text-primary text-xl font-bold">₹{results?.currentPropertyValue.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-secondary-dark">Total Renovation Cost:</p>
                  <p className="text-primary text-xl font-bold">₹{results?.totalRenovationCost.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-secondary-dark">Estimated Value After Renovation:</p>
                  <p className="text-primary text-xl font-bold">₹{results?.estimatedValueAfterRenovation.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-secondary-dark">Net Value Gain:</p>
                  <p className={`text-xl font-bold ${results && results.netValueGain >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ₹{results?.netValueGain.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="mt-4 text-center">
                <p className="text-secondary-dark">Overall Return on Investment:</p>
                <p className={`text-2xl font-bold ${results && results.overallRoi >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {results?.overallRoi}%
                </p>
              </div>
            </div>
            
            <div className="mb-6">
              <h4 className="font-heading text-lg font-bold text-primary mb-3">Project ROI Breakdown</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="py-2 px-4 border-b text-left">Project</th>
                      <th className="py-2 px-4 border-b text-right">Cost</th>
                      <th className="py-2 px-4 border-b text-right">Value Added</th>
                      <th className="py-2 px-4 border-b text-right">ROI</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results?.breakdownByProject.map((project) => (
                      <tr key={project.id} className="border-b hover:bg-gray-50">
                        <td className="py-2 px-4">{project.name}</td>
                        <td className="py-2 px-4 text-right">₹{project.cost.toLocaleString()}</td>
                        <td className="py-2 px-4 text-right">₹{project.valueAdded.toLocaleString()}</td>
                        <td className={`py-2 px-4 text-right font-medium ${project.roi >= 1 ? 'text-green-600' : project.roi >= 0.7 ? 'text-amber-600' : 'text-red-600'}`}>
                          {(project.roi * 100).toFixed(1)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            {results && results.recommendedAlternatives.length > 0 && (
              <div className="bg-accent/10 rounded-lg p-4 mb-6">
                <h4 className="font-heading text-lg font-bold text-primary mb-2">Recommended Alternatives</h4>
                <p className="text-secondary-dark mb-3">Consider these high-ROI projects for your property:</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {results.recommendedAlternatives.map((alt, index) => (
                    <div key={index} className="border border-gray-200 rounded p-3 bg-white">
                      <p className="font-medium text-primary">{alt.name}</p>
                      <div className="flex justify-between text-sm mt-1">
                        <span className="text-secondary-dark">Cost:</span>
                        <span>₹{alt.cost.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-secondary-dark">Value Added:</span>
                        <span>₹{alt.valueAdded.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between font-medium mt-1">
                        <span className="text-secondary-dark">ROI:</span>
                        <span className="text-green-600">{(alt.roi * 100).toFixed(1)}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="text-center text-secondary-dark italic mb-6">
              <p>Note: These calculations are estimates based on general industry data. Actual returns may vary based on specific project details, quality of work, and market conditions.</p>
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

export default RenovationRoiCalculator;