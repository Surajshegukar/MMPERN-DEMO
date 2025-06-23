import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import { Heading1 } from "lucide-react";
import AddItem from "./pages/AddItem";
import ItemList from "./pages/ItemList";

function App() {
  return (
    <>
      <Router>
        <Header />
        <div className="home-section">
          <Routes>
            <Route path="/" element={<></>} />
            <Route path="/dashboard" element={<Dashboard />} />
         
            <Route path="/add-item" element={ 
             <AddItem />
            } />
            <Route path="/item-list" element={
              <h1 className="text-2xl font-bold text-center mt-10">
               <ItemList />
              </h1>
            } />
            <Route path="/add-sql-user" element={
              <h1 className="text-2xl font-bold text-center mt-10">
                Add User Page (MySQL)
              </h1>
            } />
            <Route path="/sql-user-list" element={
              <h1 className="text-2xl font-bold text-center mt-10">
                User List Page (MySQL)
              </h1>
            } />
            <Route path="/add-pg-user" element={
              <h1 className="text-2xl font-bold text-center mt-10">
                Add User Page (PostgreSQL)
              </h1>
            } />
            <Route path="/pg-user-list" element={
              <h1 className="text-2xl font-bold text-center mt-10">
                User List Page (PostgreSQL)
              </h1>
            } />
            <Route path="*" element={
              <h1 className="text-2xl font-bold text-center mt-10">
                Page Not Found
              </h1>
            } />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
