import { createContext, useContext, useState, ReactNode } from "react";

interface TestAppContextType {
  testAppCode: string;
  testAppName: string;
  setTestApp: (code: string, name: string) => void;
  clearTestApp: () => void;
}

const TestAppContext = createContext<TestAppContextType | undefined>(undefined);

export function TestAppProvider({ children }: { children: ReactNode }) {
  const [testAppCode, setTestAppCode] = useState("");
  const [testAppName, setTestAppName] = useState("");

  const setTestApp = (code: string, name: string) => {
    setTestAppCode(code);
    setTestAppName(name);
  };

  const clearTestApp = () => {
    setTestAppCode("");
    setTestAppName("");
  };

  return (
    <TestAppContext.Provider value={{ testAppCode, testAppName, setTestApp, clearTestApp }}>
      {children}
    </TestAppContext.Provider>
  );
}

export function useTestApp() {
  const context = useContext(TestAppContext);
  if (!context) {
    throw new Error("useTestApp must be used within TestAppProvider");
  }
  return context;
}
