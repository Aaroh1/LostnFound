import './App.css';
import { BrowserRouter,Routes,Route,} from "react-router-dom";
import LandingPage from './Components/LandingPage';
import LS from './Components/LS';
import Register from './Components/Register';
import User from './Components/User';
import FileUpload from './Components/FileUpload';
import MainPage from './Components/MainPage';
function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage/>}  />
        <Route path="/login" element={<LS/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/User" element={<User/>} />
        <Route path="/Upload" element={<FileUpload/>} />
        <Route path="/Home" element={<MainPage/>} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}
export default App;
