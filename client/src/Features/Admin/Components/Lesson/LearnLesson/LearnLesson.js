// import React from "react";
import { useGetLessonQuery } from "app/api/lessonService";
import { Button, Table } from "antd";
import { useParams } from "react-router-dom";
import Sidebar from 'Features/Admin/Components/Sidebar/Sidebar';
import './LearnLesson.scss';
import 'Features/Admin/index.scss';
import { useDispatch } from "react-redux";
import { setTab } from "Features/Admin/tabSlice";
import { useNavigate } from "react-router-dom";

const LearnLesson = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const params = useParams();
    const { data: userData, isError, isLoading } = useGetLessonQuery(params.id);

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
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (_, record) => (
                <div>
                    <Button
                        type="primary"
                        onClick={() => {
                            dispatch(setTab('4'));
                            navigate(`/admin/updateWord/${record.key}`);
                        }}
                    >
                        Get Word
                    </Button>
                </div>
            ),
        }
    ];

    let orderIndex = 1; // Variable to track the order

    const tableData = userData.flatMap((record) =>
        record.Words.map((word) => ({
            key: word.id,
            index: orderIndex++, // Use orderIndex to ensure the order is incremented
            word: word.word,
            furigana: word.furigana,
        }))
    );

    return (
        <div className="learn-lesson">
            <div className="home-admin">
                <Sidebar />
                <div className="admin-selected-features">
                    <div className="title" >
                        <h1>LEARNING</h1>
                    </div>
                    <div className="lesson-title">
                        <h1>{userData[0].name}</h1>
                    </div>
                    <div className="learn-lesson-table">
                        <Table columns={columns} dataSource={tableData} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LearnLesson;
