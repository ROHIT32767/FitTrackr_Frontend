import React from "react"
import { BrowserRouter as Router, Routes ,Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// Components
import Navbar from "./components/Navbar.component"
import ExerciseList from "./components/ExerciseList.component"
import EditExerciseList from "./components/EditExerciseList.component"
import CreateExercise from "./components/CreateExercise.component"
import CreateUser from "./components/CreateUser.component"

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
      <Routes>
      <Route exact path="/"  element={<ExerciseList />}  />
      <Route path="/edit/:id" element={<EditExerciseList />}  />
      <Route path="/Create" element={<CreateExercise />}  />
      <Route path="/User" element={<CreateUser />} /> 
      </Routes>  
      </div>
    </Router>
  );
}

export default App; 
