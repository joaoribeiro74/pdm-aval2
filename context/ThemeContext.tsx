import { createContext, useContext, useState, ReactNode } from "react";

const lightTheme = {
  backgroundColor: "#ffffff",
  textColor: "#000000",
  headerBackground: "#f6f6f6",
  borderColor: "#323232",
  boxShadow: {
    default: "4px 4px #323232",
    logoutShadow: "2px 2px #323232",
    imageShadow: "4px 4px #323232",
  }
};

const darkTheme = {
  backgroundColor: "#14242c",
  textColor: "#f6f6f6",
  headerBackground: "#0d171c",
  borderColor: "#f6f6f6",
  boxShadow: {
    default: "4px 4px #f6f6f6",
    logoutShadow: "2px 2px #f6f6f6",
    imageShadow: "4px 4px #71797E",
  }
};

type ThemeContextType = {
  theme: "light" | "dark";
  toggleTheme: () => void;
  colors: typeof lightTheme;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors: theme === "light" ? lightTheme : darkTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme deve ser usado dentro de um ThemeProvider");
  }
  return context;
}
