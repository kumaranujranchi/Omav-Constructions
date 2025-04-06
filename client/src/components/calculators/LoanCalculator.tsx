import { useState } from 'react';
import { X } from 'lucide-react';

type LoanFormType = {
  projectCost: string;
  downPayment: string;
  loanTerm: string;
  interestRate: string;
  constructionPeriod: string;
  loanType: string;
  drawSchedule: string;
};

type DrawScheduleType = 'equal' | 'frontend' | 'backend' | 'custom';

type LoanResultType = {
  loanAmount: number;
  constructionPhase: {
    monthlyInterestPayment: number;
    totalInterestDuringConstruction: number;
    drawSchedule: {
      month: number;
      amount: number;
      interest: number;
    }[];
  };
  permanentPhase: {
    monthlyPayment: number;
    totalInterestPaid: number;
    totalAmountPaid: number;
    amortizationSchedule: {
      year: number;
      principalPaid: number;
      interestPaid: number;
      balance: number;
    }[];
  };
};

interface LoanCalculatorProps {
  onClose: () => void;
}

const LoanCalculator = ({ onClose }: LoanCalculatorProps) => {
  const [formData, setFormData] = useState<LoanFormType>({
    projectCost: '',
    downPayment: '',
    loanTerm: '',
    interestRate: '',
    constructionPeriod: '',
    loanType: 'construction-permanent',
    drawSchedule: 'equal'
  });
  
  const [results, setResults] = useState<LoanResultType | null>(null);
  const [showResults, setShowResults] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const calculateLoanDetails = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Parse form data
    const projectCost = parseFloat(formData.projectCost);
    const downPayment = parseFloat(formData.downPayment);
    const loanTerm = parseInt(formData.loanTerm); // in years
    const interestRate = parseFloat(formData.interestRate) / 100; // convert percentage to decimal
    const constructionPeriod = parseInt(formData.constructionPeriod); // in months
    const scheduleType = formData.drawSchedule as DrawScheduleType;
    
    // Calculate loan amount
    const loanAmount = projectCost - downPayment;
    
    // Calculate draw schedule based on selection
    const drawSchedule = [];
    let totalDrawn = 0;
    
    if (scheduleType === 'equal') {
      // Equal monthly draws
      const monthlyDraw = loanAmount / constructionPeriod;
      for (let month = 1; month <= constructionPeriod; month++) {
        drawSchedule.push({
          month,
          amount: monthlyDraw,
          interest: (totalDrawn * interestRate) / 12
        });
        totalDrawn += monthlyDraw;
      }
    } else if (scheduleType === 'frontend') {
      // Frontend loaded (higher draws in beginning)
      for (let month = 1; month <= constructionPeriod; month++) {
        const weight = (constructionPeriod - month + 1) / ((constructionPeriod * (constructionPeriod + 1)) / 2);
        const monthlyDraw = loanAmount * weight;
        drawSchedule.push({
          month,
          amount: monthlyDraw,
          interest: (totalDrawn * interestRate) / 12
        });
        totalDrawn += monthlyDraw;
      }
    } else if (scheduleType === 'backend') {
      // Backend loaded (higher draws near end)
      for (let month = 1; month <= constructionPeriod; month++) {
        const weight = month / ((constructionPeriod * (constructionPeriod + 1)) / 2);
        const monthlyDraw = loanAmount * weight;
        drawSchedule.push({
          month,
          amount: monthlyDraw,
          interest: (totalDrawn * interestRate) / 12
        });
        totalDrawn += monthlyDraw;
      }
    } else {
      // Custom (simplified with a reasonable distribution)
      const distributions = [0.2, 0.15, 0.15, 0.25, 0.25]; // Example distribution
      const monthsPerPeriod = Math.ceil(constructionPeriod / distributions.length);
      
      let currentPeriod = 0;
      let remainingAmount = loanAmount;
      
      for (let month = 1; month <= constructionPeriod; month++) {
        if (month > currentPeriod * monthsPerPeriod + monthsPerPeriod) {
          currentPeriod++;
        }
        
        const periodDistribution = distributions[Math.min(currentPeriod, distributions.length - 1)];
        const monthlyDraw = (month === constructionPeriod) 
          ? remainingAmount 
          : (loanAmount * periodDistribution) / monthsPerPeriod;
        
        drawSchedule.push({
          month,
          amount: monthlyDraw,
          interest: (totalDrawn * interestRate) / 12
        });
        
        totalDrawn += monthlyDraw;
        remainingAmount -= monthlyDraw;
      }
    }
    
    // Calculate interest during construction
    let totalInterestDuringConstruction = 0;
    drawSchedule.forEach(draw => {
      totalInterestDuringConstruction += draw.interest;
    });
    
    // Calculate average monthly interest during construction
    const monthlyInterestPayment = totalInterestDuringConstruction / constructionPeriod;
    
    // Calculate permanent loan phase (amortized loan)
    const monthlyRate = interestRate / 12;
    const numPayments = loanTerm * 12;
    const monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                           (Math.pow(1 + monthlyRate, numPayments) - 1);
    
    const totalAmountPaid = monthlyPayment * numPayments;
    const totalInterestPaid = totalAmountPaid - loanAmount;
    
    // Generate a yearly amortization schedule
    const amortizationSchedule = [];
    let remainingBalance = loanAmount;
    let yearlyPrincipalPaid = 0;
    let yearlyInterestPaid = 0;
    
    for (let month = 1; month <= numPayments; month++) {
      const interestPayment = remainingBalance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      
      yearlyPrincipalPaid += principalPayment;
      yearlyInterestPaid += interestPayment;
      remainingBalance -= principalPayment;
      
      if (month % 12 === 0 || month === numPayments) {
        amortizationSchedule.push({
          year: Math.ceil(month / 12),
          principalPaid: yearlyPrincipalPaid,
          interestPaid: yearlyInterestPaid,
          balance: remainingBalance
        });
        
        yearlyPrincipalPaid = 0;
        yearlyInterestPaid = 0;
      }
    }
    
    // Create result object
    const result: LoanResultType = {
      loanAmount,
      constructionPhase: {
        monthlyInterestPayment,
        totalInterestDuringConstruction,
        drawSchedule: drawSchedule.map(d => ({
          month: d.month,
          amount: parseFloat(d.amount.toFixed(2)),
          interest: parseFloat(d.interest.toFixed(2))
        }))
      },
      permanentPhase: {
        monthlyPayment: parseFloat(monthlyPayment.toFixed(2)),
        totalInterestPaid: parseFloat(totalInterestPaid.toFixed(2)),
        totalAmountPaid: parseFloat(totalAmountPaid.toFixed(2)),
        amortizationSchedule: amortizationSchedule.map(a => ({
          year: a.year,
          principalPaid: parseFloat(a.principalPaid.toFixed(2)),
          interestPaid: parseFloat(a.interestPaid.toFixed(2)),
          balance: parseFloat(a.balance.toFixed(2))
        }))
      }
    };
    
    setResults(result);
    setShowResults(true);
  };

  const resetCalculator = () => {
    setFormData({
      projectCost: '',
      downPayment: '',
      loanTerm: '',
      interestRate: '',
      constructionPeriod: '',
      loanType: 'construction-permanent',
      drawSchedule: 'equal'
    });
    setResults(null);
    setShowResults(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-heading text-2xl font-bold text-primary">Construction Loan Calculator</h3>
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
              Estimate your construction loan payments including both the construction phase and permanent mortgage phase. This calculator helps you understand the financial implications of your building project.
            </p>
            
            <form onSubmit={calculateLoanDetails} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-secondary-dark mb-2">Total Project Cost (₹)</label>
                  <input
                    type="number"
                    name="projectCost"
                    value={formData.projectCost}
                    onChange={handleChange}
                    placeholder="e.g., 5000000"
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                    min="100000"
                  />
                </div>
                
                <div>
                  <label className="block text-secondary-dark mb-2">Down Payment (₹)</label>
                  <input
                    type="number"
                    name="downPayment"
                    value={formData.downPayment}
                    onChange={handleChange}
                    placeholder="e.g., 1000000"
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                    min="0"
                  />
                </div>
                
                <div>
                  <label className="block text-secondary-dark mb-2">Loan Term (Years)</label>
                  <select
                    name="loanTerm"
                    value={formData.loanTerm}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  >
                    <option value="">Select Term</option>
                    <option value="10">10 Years</option>
                    <option value="15">15 Years</option>
                    <option value="20">20 Years</option>
                    <option value="25">25 Years</option>
                    <option value="30">30 Years</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-secondary-dark mb-2">Interest Rate (%)</label>
                  <input
                    type="number"
                    name="interestRate"
                    value={formData.interestRate}
                    onChange={handleChange}
                    placeholder="e.g., 8.5"
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                    min="0.1"
                    max="30"
                    step="0.1"
                  />
                </div>
                
                <div>
                  <label className="block text-secondary-dark mb-2">Construction Period (Months)</label>
                  <select
                    name="constructionPeriod"
                    value={formData.constructionPeriod}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  >
                    <option value="">Select Period</option>
                    <option value="6">6 Months</option>
                    <option value="9">9 Months</option>
                    <option value="12">12 Months</option>
                    <option value="18">18 Months</option>
                    <option value="24">24 Months</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-secondary-dark mb-2">Loan Type</label>
                  <select
                    name="loanType"
                    value={formData.loanType}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  >
                    <option value="construction-permanent">Construction-to-Permanent</option>
                    <option value="construction-only">Construction Only</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-secondary-dark mb-2">Draw Schedule</label>
                  <select
                    name="drawSchedule"
                    value={formData.drawSchedule}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  >
                    <option value="equal">Equal Monthly Draws</option>
                    <option value="frontend">Frontend Loaded</option>
                    <option value="backend">Backend Loaded</option>
                    <option value="custom">Custom Schedule</option>
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
              <h4 className="font-heading text-xl font-bold text-primary mb-2">Loan Summary</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-secondary-dark">Loan Amount:</p>
                  <p className="text-primary text-xl font-bold">₹{results?.loanAmount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-secondary-dark">Interest Rate:</p>
                  <p className="text-primary text-xl font-bold">{formData.interestRate}%</p>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4 mb-6">
              <h4 className="font-heading text-lg font-bold text-primary mb-3">Construction Phase ({formData.constructionPeriod} months)</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-secondary-dark">Monthly Interest Payment (avg):</p>
                  <p className="font-medium">₹{results?.constructionPhase.monthlyInterestPayment.toLocaleString(undefined, {maximumFractionDigits: 2})}</p>
                </div>
                <div>
                  <p className="text-secondary-dark">Total Interest During Construction:</p>
                  <p className="font-medium">₹{results?.constructionPhase.totalInterestDuringConstruction.toLocaleString(undefined, {maximumFractionDigits: 2})}</p>
                </div>
              </div>
              
              <h5 className="font-medium text-primary mb-2">Draw Schedule</h5>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="py-2 px-3 border text-left">Month</th>
                      <th className="py-2 px-3 border text-right">Draw Amount</th>
                      <th className="py-2 px-3 border text-right">Interest Payment</th>
                      <th className="py-2 px-3 border text-right">Total Drawn</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results?.constructionPhase.drawSchedule.map((draw, index) => {
                      const totalDrawn = results.constructionPhase.drawSchedule
                        .slice(0, index + 1)
                        .reduce((sum, d) => sum + d.amount, 0);
                      
                      return (
                        <tr key={draw.month} className="border-b hover:bg-gray-50">
                          <td className="py-2 px-3 border">{draw.month}</td>
                          <td className="py-2 px-3 border text-right">₹{draw.amount.toLocaleString(undefined, {maximumFractionDigits: 2})}</td>
                          <td className="py-2 px-3 border text-right">₹{draw.interest.toLocaleString(undefined, {maximumFractionDigits: 2})}</td>
                          <td className="py-2 px-3 border text-right">₹{totalDrawn.toLocaleString(undefined, {maximumFractionDigits: 2})}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4 mb-6">
              <h4 className="font-heading text-lg font-bold text-primary mb-3">Permanent Mortgage Phase ({formData.loanTerm} years)</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-secondary-dark">Monthly Payment:</p>
                  <p className="text-primary text-xl font-bold">₹{results?.permanentPhase.monthlyPayment.toLocaleString(undefined, {maximumFractionDigits: 2})}</p>
                </div>
                <div>
                  <p className="text-secondary-dark">Total Payments Over Loan Term:</p>
                  <p className="font-medium">₹{results?.permanentPhase.totalAmountPaid.toLocaleString(undefined, {maximumFractionDigits: 2})}</p>
                </div>
                <div>
                  <p className="text-secondary-dark">Total Interest Paid:</p>
                  <p className="font-medium">₹{results?.permanentPhase.totalInterestPaid.toLocaleString(undefined, {maximumFractionDigits: 2})}</p>
                </div>
                <div>
                  <p className="text-secondary-dark">Principal Paid:</p>
                  <p className="font-medium">₹{results?.loanAmount.toLocaleString()}</p>
                </div>
              </div>
              
              <h5 className="font-medium text-primary mb-2">Yearly Amortization Schedule</h5>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="py-2 px-3 border text-left">Year</th>
                      <th className="py-2 px-3 border text-right">Principal Paid</th>
                      <th className="py-2 px-3 border text-right">Interest Paid</th>
                      <th className="py-2 px-3 border text-right">Remaining Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results?.permanentPhase.amortizationSchedule.map((year) => (
                      <tr key={year.year} className="border-b hover:bg-gray-50">
                        <td className="py-2 px-3 border">{year.year}</td>
                        <td className="py-2 px-3 border text-right">₹{year.principalPaid.toLocaleString(undefined, {maximumFractionDigits: 2})}</td>
                        <td className="py-2 px-3 border text-right">₹{year.interestPaid.toLocaleString(undefined, {maximumFractionDigits: 2})}</td>
                        <td className="py-2 px-3 border text-right">₹{year.balance.toLocaleString(undefined, {maximumFractionDigits: 2})}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="text-center text-secondary-dark italic mb-6">
              <p>Note: This calculator provides estimates based on the information provided. Actual loan terms may vary. For precise figures, please consult with a mortgage professional.</p>
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

export default LoanCalculator;