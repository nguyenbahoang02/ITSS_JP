import { useGetLessonQuery } from 'app/api/lessonService';
import { Button, Table } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import './LearnLessonUser.scss';
import 'Features/Admin/index.scss';
import NavBar from '../NavBar/NavBar';
const LearnLessonUser = () => {
    const navivate = useNavigate();
    const params = useParams();
    const { data, isError, isLoading } = useGetLessonQuery(params.id);

    if (isError) {
        return <h1>Something went wrong!</h1>;
    } else if (isLoading) {
        return <h1>Loading ... </h1>;
    }
    const columns = [
        {
            title: 'Order',
            dataIndex: 'index',
            key: 'index',
        },
        {
            title: 'Word',
            dataIndex: 'word',
            key: 'word',
        },
        {
            title: 'Furigana',
            dataIndex: 'furigana',
            key: 'furigana',
        },
    ];
    const tableData = data[0]?.Words?.map((current, index) => {
        return { ...current, key: current.id, index: index + 1 };
    });

    return (
        <div>
            <NavBar />
            <div className="learn-lesson">
                {/* <div className="learn-lesson">
                    <div className="home-user">
                        <div className="admin-selected-features">
                            <div className="title">
                                <h1>LEARNING</h1>
                            </div>
                            <div className="lesson-title">
                                <h1>{userData[0].name}</h1>
                            </div>
                            <div className="learn-lesson-table">
                                <Table columns={columns} dataSource={tableData} pagination={{ pageSize: 5 }} />
                            </div>
                        </div>
                    </div>
                </div> */}
                <div className="lesson-name-div">
                    <div className="lesson-name">{data[0].name}</div>
                    <div className="btn">
                        <Button onClick={() => navivate('/')}>クイズ</Button>
                        <Button onClick={() => navivate('/')}>フラッシュカード</Button>
                    </div>
                </div>
                <div className="lesson-words-div">
                    <Table pagination={{ pageSize: 8 }} columns={columns} dataSource={tableData} size="large" />
                </div>
            </div>
        </div>
    );
};

export default LearnLessonUser;
