// Color Palette Generator - Example Micro-SaaS App
// Price: $0.50 | Category: Creative

function ColorPaletteGenerator() {
  const [palettes, setPalettes] = React.useState([]);
  const [generating, setGenerating] = React.useState(false);

  const generateRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const generatePalette = () => {
    setGenerating(true);
    setTimeout(() => {
      const newPalette = {
        id: Date.now(),
        colors: Array(5).fill(null).map(() => generateRandomColor()),
        name: `Palette ${palettes.length + 1}`
      };
      setPalettes([newPalette, ...palettes]);
      setGenerating(false);
    }, 300);
  };

  const copyToClipboard = (color) => {
    navigator.clipboard.writeText(color);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Color Palette Generator</h1>
          <p className="text-gray-600">Generate beautiful color palettes instantly</p>
        </div>

        <div className="text-center mb-8">
          <button
            onClick={generatePalette}
            disabled={generating}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            data-testid="button-generate-palette"
          >
            {generating ? 'Generating...' : 'Generate New Palette'}
          </button>
        </div>

        <div className="space-y-6">
          {palettes.map((palette) => (
            <div key={palette.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <h3 className="font-semibold text-gray-800">{palette.name}</h3>
              </div>
              <div className="flex">
                {palette.colors.map((color, idx) => (
                  <div
                    key={idx}
                    className="flex-1 h-32 relative group cursor-pointer"
                    style={{ backgroundColor: color }}
                    onClick={() => copyToClipboard(color)}
                    data-testid={`color-${idx}`}
                  >
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center">
                      <span className="text-white opacity-0 group-hover:opacity-100 font-mono font-semibold">
                        {color}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {palettes.length === 0 && (
          <div className="text-center text-gray-400 py-12">
            <p>Click the button above to generate your first palette</p>
          </div>
        )}
      </div>
    </div>
  );
}
