import { Routes, Route, BrowserRouter } from 'react-router-dom';
import HomeAdmin from '../src/Features/Admin/index';
import UpdateWord from 'Features/Words/pages/UpdateWord/UpdateWord';
import Auth from 'Features/Auth/Auth';
import RequireAuth from 'Features/Auth/Components/RequireAuth';
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/auth" element={<Auth />} />
                <Route element={<RequireAuth />}>
                    <Route path="admin">
                        <Route index element={<HomeAdmin />} />
                        <Route path="updateWord/:id" element={<UpdateWord />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
