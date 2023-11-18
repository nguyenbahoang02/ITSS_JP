import { Routes, Route, Switch, BrowserRouter } from 'react-router-dom';
import HomeAdmin from '../src/Features/Admin/index';
function App() {
    return (
        <BrowserRouter>
          <Routes>
              <Route path="/admin" element={<HomeAdmin />} />
          </Routes>
        </BrowserRouter>
    );
}

export default App;
