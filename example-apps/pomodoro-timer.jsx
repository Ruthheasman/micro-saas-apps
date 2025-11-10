// Pomodoro Timer - Example Micro-SaaS App
// Price: $1.00 | Category: Productivity

function PomodoroTimer() {
  const [minutes, setMinutes] = React.useState(25);
  const [seconds, setSeconds] = React.useState(0);
  const [isActive, setIsActive] = React.useState(false);
  const [mode, setMode] = React.useState('work'); // work, break, longBreak
  const [completedPomodoros, setCompletedPomodoros] = React.useState(0);

  React.useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            handleTimerComplete();
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, minutes, seconds]);

  const handleTimerComplete = () => {
    setIsActive(false);
    if (mode === 'work') {
      const newCount = completedPomodoros + 1;
      setCompletedPomodoros(newCount);
      if (newCount % 4 === 0) {
        switchMode('longBreak');
      } else {
        switchMode('break');
      }
    } else {
      switchMode('work');
    }
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setIsActive(false);
    if (newMode === 'work') {
      setMinutes(25);
    } else if (newMode === 'break') {
      setMinutes(5);
    } else {
      setMinutes(15);
    }
    setSeconds(0);
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setSeconds(0);
    if (mode === 'work') {
      setMinutes(25);
    } else if (mode === 'break') {
      setMinutes(5);
    } else {
      setMinutes(15);
    }
  };

  const getModeColor = () => {
    if (mode === 'work') return 'from-red-500 to-orange-500';
    if (mode === 'break') return 'from-green-500 to-emerald-500';
    return 'from-blue-500 to-indigo-500';
  };

  const getModeText = () => {
    if (mode === 'work') return 'Focus Time';
    if (mode === 'break') return 'Short Break';
    return 'Long Break';
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getModeColor()} p-8 transition-all duration-500`}>
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Pomodoro Timer</h1>
          <p className="text-white text-opacity-90">Stay focused and productive</p>
        </div>

        <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="inline-block bg-white bg-opacity-20 px-6 py-2 rounded-full">
              <span className="text-white font-semibold text-lg" data-testid="text-mode">
                {getModeText()}
              </span>
            </div>
          </div>

          <div className="text-center mb-8">
            <div className="text-8xl font-bold text-white mb-4" data-testid="text-timer">
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </div>
          </div>

          <div className="flex gap-4 mb-8">
            <button
              onClick={toggleTimer}
              className="flex-1 bg-white text-gray-800 py-4 rounded-xl font-bold text-lg hover:bg-opacity-90 transition-all"
              data-testid="button-toggle"
            >
              {isActive ? 'Pause' : 'Start'}
            </button>
            <button
              onClick={resetTimer}
              className="flex-1 bg-white bg-opacity-20 text-white py-4 rounded-xl font-bold text-lg hover:bg-opacity-30 transition-all"
              data-testid="button-reset"
            >
              Reset
            </button>
          </div>

          <div className="flex justify-center gap-4 mb-6">
            <button
              onClick={() => switchMode('work')}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                mode === 'work'
                  ? 'bg-white text-gray-800'
                  : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'
              }`}
              data-testid="button-mode-work"
            >
              Work
            </button>
            <button
              onClick={() => switchMode('break')}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                mode === 'break'
                  ? 'bg-white text-gray-800'
                  : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'
              }`}
              data-testid="button-mode-break"
            >
              Break
            </button>
            <button
              onClick={() => switchMode('longBreak')}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                mode === 'longBreak'
                  ? 'bg-white text-gray-800'
                  : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'
              }`}
              data-testid="button-mode-long"
            >
              Long Break
            </button>
          </div>

          <div className="text-center">
            <div className="text-white text-opacity-75 mb-2">Completed Pomodoros</div>
            <div className="flex justify-center gap-2">
              {Array(completedPomodoros % 4 || (completedPomodoros > 0 ? 4 : 0))
                .fill(null)
                .map((_, i) => (
                  <div
                    key={i}
                    className="w-3 h-3 bg-white rounded-full"
                    data-testid={`pomodoro-${i}`}
                  />
                ))}
            </div>
            <div className="text-white text-2xl font-bold mt-2" data-testid="text-count">
              {completedPomodoros}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
