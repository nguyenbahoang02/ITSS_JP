import { Routes, Route, BrowserRouter } from 'react-router-dom';
import HomeAdmin from '../src/Features/Admin/index';
import UpdateWord from 'Features/Words/pages/UpdateWord/UpdateWord';
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="admin">
                    <Route index element={<HomeAdmin />} />
                    <Route path="updateWord/:id" element={<UpdateWord />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
