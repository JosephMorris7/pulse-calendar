import { useState } from "react";
import Calendar from "./components/Calendar";
import LandingPage from "./components/LandingPage";

function App() {
  const [showCalendar, setShowCalendar] = useState(false);

  return showCalendar
    ? <Calendar onBack={() => setShowCalendar(false)} />
    : <LandingPage onEnter={() => setShowCalendar(true)} />;
}

export default App;