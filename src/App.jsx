import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { RestaurantProvider } from "./contexts/RestaurantContext";
import { UIProvider } from "./contexts/UIContext";
import Splash from "./pages/Splash";
import Login from "./pages/Login";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  const [stage, setStage] = useState("splash");

  useEffect(() => {
    if (stage === "splash") {
      const t = setTimeout(() => setStage("login"), 1900);
      return () => clearTimeout(t);
    }
  }, [stage]);

  return (
    <AnimatePresence mode="wait">
      {stage === "splash" && (
        <motion.div key="splash" exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
          <Splash />
        </motion.div>
      )}
      {stage === "login" && (
        <motion.div key="login" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
          <Login onLogin={() => setStage("app")} />
        </motion.div>
      )}
      {stage === "app" && (
        <motion.div key="app" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
          <UIProvider>
            <RestaurantProvider>
              <BrowserRouter>
                <AppRoutes />
              </BrowserRouter>
            </RestaurantProvider>
          </UIProvider>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default App;
