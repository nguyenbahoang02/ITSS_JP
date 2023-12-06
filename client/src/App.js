import { Routes, Route, BrowserRouter } from 'react-router-dom';
import HomeAdmin from '../src/Features/Admin/index';
import UpdateWord from 'Features/Words/pages/UpdateWord/UpdateWord';
import UpdateLesson from 'Features/Lessons/pages/UpdateLesson/UpdateLesson';
import Auth from 'Features/Auth/Auth';
import RequireAuth from 'Features/Auth/Components/RequireAuth';
import CreateRequest from 'Features/Requests/pages/CreateRequest/CreateRequest';
import UpdateUser from 'Features/Admin/Components/UpdateUser/UpdateUser';
import SearchHistoryById from 'Features/Admin/Components/SearchHistory/SearchHistoryById/SearchHistoryById';
import LearnLesson from 'Features/Admin/Components/Lesson/LearnLesson/LearnLesson';
import HomeUser from 'Features/User';
import GetLessonPage from 'Features/User/Pages/GetLesson/GetLesson';
import GetWordUser from 'Features/User/Components/GetWord/GetWordUser';
import LearnLessonUser from 'Features/User/Components/GetLesson/LearnLessonUser';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/auth" element={<Auth />} />
                <Route element={<RequireAuth />}>
                    <Route path="admin">
                        <Route index element={<HomeAdmin />} />
                        <Route path="updateWord/:id" element={<UpdateWord />} />
                        <Route path="updateUser/:id" element={<UpdateUser />} />
                        <Route path="searchHistory/:id" element={<SearchHistoryById />} />
                        <Route path="lesson/:id" element={<LearnLesson />} />
                        <Route path="updateLesson/:id" element={<UpdateLesson />} />
                    </Route>
                    <Route path="createRequest" element={<CreateRequest />} />
                    <Route path="/" element={<HomeUser />} />
                    <Route path="getLesson" element={<GetLessonPage />} />
                    <Route path="user/word/:id" element={<GetWordUser />} />
                    <Route path="user/lesson/:id" element={<LearnLessonUser />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
