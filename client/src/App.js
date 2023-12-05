import { Routes, Route, BrowserRouter } from 'react-router-dom';
import HomeAdmin from '../src/Features/Admin/index';
import UpdateWord from 'Features/Words/pages/UpdateWord/UpdateWord';
import UpdateLesson from 'Features/Lessons/pages/UpdateLesson/UpdateLesson';
import Auth from 'Features/Auth/Auth';
import RequireAuth from 'Features/Auth/Components/RequireAuth';
import CreateRequest from 'Features/Requests/pages/CreateRequest/CreateRequest';
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/auth" element={<Auth />} />
                <Route element={<RequireAuth />}>
                    <Route path="admin">
                        <Route index element={<HomeAdmin />} />
                        <Route path="updateWord/:id" element={<UpdateWord />} />
                        <Route path="updateLesson/:id" element={<UpdateLesson />} />
                    </Route>
                    <Route path="createRequest" element={<CreateRequest />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
