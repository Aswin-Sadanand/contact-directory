import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ContactList from "./components/ContactList";
import ContactForm from "./components/ContactForm";

function App() {
  return (
    <Router>
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<ContactList />} />
          <Route path="/contactform/:id?" element={<ContactForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
