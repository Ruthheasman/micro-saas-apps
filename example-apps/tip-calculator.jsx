// Tip Calculator - Example Micro-SaaS App
// Price: $0.75 | Category: Finance

function TipCalculator() {
  const [billAmount, setBillAmount] = React.useState('');
  const [tipPercent, setTipPercent] = React.useState(15);
  const [splitCount, setSplitCount] = React.useState(1);

  const calculateTip = () => {
    const bill = parseFloat(billAmount) || 0;
    return (bill * tipPercent) / 100;
  };

  const calculateTotal = () => {
    const bill = parseFloat(billAmount) || 0;
    return bill + calculateTip();
  };

  const calculatePerPerson = () => {
    return calculateTotal() / splitCount;
  };

  const tipPresets = [10, 15, 18, 20, 25];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 p-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Tip Calculator</h1>
          <p className="text-gray-600">Calculate tips and split bills easily</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Bill Amount
            </label>
            <div className="relative">
              <span className="absolute left-4 top-3 text-gray-500 text-lg">$</span>
              <input
                type="number"
                value={billAmount}
                onChange={(e) => setBillAmount(e.target.value)}
                placeholder="0.00"
                className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-lg text-lg focus:border-emerald-500 focus:outline-none"
                data-testid="input-bill-amount"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Tip Percentage: {tipPercent}%
            </label>
            <div className="flex gap-2 mb-3">
              {tipPresets.map((preset) => (
                <button
                  key={preset}
                  onClick={() => setTipPercent(preset)}
                  className={`flex-1 py-2 rounded-lg font-semibold transition-all ${
                    tipPercent === preset
                      ? 'bg-emerald-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  data-testid={`button-tip-${preset}`}
                >
                  {preset}%
                </button>
              ))}
            </div>
            <input
              type="range"
              min="0"
              max="50"
              value={tipPercent}
              onChange={(e) => setTipPercent(parseInt(e.target.value))}
              className="w-full"
              data-testid="slider-tip-percent"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Split Between
            </label>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSplitCount(Math.max(1, splitCount - 1))}
                className="w-10 h-10 bg-gray-100 rounded-lg font-bold text-gray-700 hover:bg-gray-200"
                data-testid="button-decrease-split"
              >
                -
              </button>
              <span className="flex-1 text-center text-2xl font-bold text-gray-800">
                {splitCount}
              </span>
              <button
                onClick={() => setSplitCount(splitCount + 1)}
                className="w-10 h-10 bg-gray-100 rounded-lg font-bold text-gray-700 hover:bg-gray-200"
                data-testid="button-increase-split"
              >
                +
              </button>
            </div>
          </div>

          <div className="border-t-2 border-gray-100 pt-6 space-y-3">
            <div className="flex justify-between text-lg">
              <span className="text-gray-600">Tip Amount:</span>
              <span className="font-semibold text-gray-800" data-testid="text-tip-amount">
                ${calculateTip().toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-lg">
              <span className="text-gray-600">Total:</span>
              <span className="font-semibold text-gray-800" data-testid="text-total">
                ${calculateTotal().toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-2xl font-bold bg-emerald-50 p-4 rounded-lg">
              <span className="text-emerald-700">Per Person:</span>
              <span className="text-emerald-700" data-testid="text-per-person">
                ${calculatePerPerson().toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
