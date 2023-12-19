import React from 'react';

import { useGetQuizzesQuery, useDeleteQuizMutation } from 'app/api/quizService';
import { Button, Table, message } from 'antd';

import './ReadQuiz.scss';
import { useNavigate } from 'react-router-dom';

function ReadQuiz() {
    const [deleteQuiz] = useDeleteQuizMutation();
    const { data, isError, isLoading } = useGetQuizzesQuery();
    const navigate = useNavigate();

    if (isError) {
        return <h1>Something went wrong!</h1>;
    } else if (isLoading) {
        return <h1>Loading ... </h1>;
    }

    const onDeleteQuiz = (id) => {
        deleteQuiz({
            id,
            headers: { accessToken: JSON.parse(localStorage.getItem('user')).token },
        })
            .then((res) => message.success('success!'))
            .catch((err) => {
                message.error('failed!');
            });
    };

    const columns = [
        {
            title: 'Lesson Name',
            dataIndex: 'lessonName',
            key: 'lessonName',
        },
        {
            title: 'Total Score',
            dataIndex: 'totalScore',
            key: 'totalScore',
        },
        {
            title: 'Actions',
            dataIndex: '',
            key: 'x',
            render: (_, record) => (
                <div>
                    <Button
                        className="first-btn"
                        type="primary"
                        onClick={() => navigate(`/admin/updateQuiz/${record.id}`)}
                    >
                        Update
                    </Button>
                    <Button type="primary" danger onClick={() => onDeleteQuiz(record.id)}>
                        Delete
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div className="read-quiz">
            <Table
                size="large"
                dataSource={data?.map((item) => ({
                    ...item,
                    key: item.id,
                    lessonName: item.Lesson?.name,
                }))}
                columns={columns}
            />
        </div>
    );
}

export default ReadQuiz;
