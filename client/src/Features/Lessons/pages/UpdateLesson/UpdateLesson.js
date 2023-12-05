import Sidebar from 'Features/Admin/Components/Sidebar/Sidebar';
import React from 'react';
import 'Features/Admin/index.scss';
import './UpdateLesson.scss';
import { useParams } from 'react-router-dom';
import { useGetWordsQuery } from 'app/api/wordService';
import { useGetLessonQuery, useDeleteWordFromLessonMutation, useAddWordToLessonMutation } from 'app/api/lessonService';
import { Table, Button, message, Popconfirm, Modal } from 'antd';

const WordTable = ({ lessonId }) => {
    const { data: words, isError, isLoading } = useGetWordsQuery();
    const [addWordToLesson] = useAddWordToLessonMutation();
    if (isError) {
        return <h1>Something went wrong!</h1>;
    } else if (isLoading) {
        return <h1>Loading ... </h1>;
    }
    const cancel = (e) => {
        message.error('Cancelled');
    };
    const confirm = (wordId) => {
        console.log({
            lessonId,
            wordId,
            headers: {
                accessToken: JSON.parse(localStorage.getItem('user')).token,
            },
        });
        addWordToLesson({
            lessonId,
            wordId,
            headers: {
                accessToken: JSON.parse(localStorage.getItem('user')).token,
            },
        }).then((response) => {
            if (response?.data === 'SUCCESS!') {
                message.success('Added successfully');
            } else if (response?.data?.name === 'SequelizeUniqueConstraintError') {
                message.error('Word already exists');
            } else {
                message.error('Something went wrong');
            }
        });
    };
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
            title: 'Actions',
            dataIndex: '',
            key: 'x',
            render: (_, record) => (
                <div>
                    <Popconfirm
                        title="Add this word to this lesson"
                        description="Are you sure to add this word?"
                        onCancel={cancel}
                        onConfirm={() => confirm(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="primary">Add</Button>
                    </Popconfirm>
                </div>
            ),
        },
    ];
    const tableData = words.map((current, index) => {
        return { ...current, key: current.id, index: index + 1 };
    });
    return (
        <div className="word-table">
            <Table pagination={{ pageSize: 8 }} columns={columns} dataSource={tableData} size="medium" />
        </div>
    );
};

const UpdateLesson = () => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const params = useParams();
    const [removeWord] = useDeleteWordFromLessonMutation();
    const { data, isError, isLoading } = useGetLessonQuery(params.id);
    if (isError) {
        return <h1>Something went wrong!</h1>;
    } else if (isLoading) {
        return <h1>Loading ... </h1>;
    }
    const cancel = (e) => {
        message.error('Cancelled');
    };
    const confirm = (wordId) => {
        removeWord({
            id: params.id,
            headers: { accessToken: JSON.parse(localStorage.getItem('user')).token },
            wordId,
        }).then((response) => {
            if (response.data.error !== undefined) {
                message.error(response.data.error.message);
            } else message.success('Remove successfully');
            console.log(response);
        });
    };
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
            title: 'Actions',
            dataIndex: '',
            key: 'x',
            render: (_, record) => (
                <div>
                    <Popconfirm
                        title="Remove the word"
                        description="Are you sure to remove this word from this lesson?"
                        onConfirm={() => confirm(record.id)}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="primary" danger>
                            Remove
                        </Button>
                    </Popconfirm>
                </div>
            ),
        },
    ];
    const tableData = data[0]?.Words?.map((current, index) => {
        return { ...current, key: current.id, index: index + 1 };
    });
    return (
        <div className="update-lesson">
            <div className="home-admin">
                <Sidebar />
                <div className="admin-selected-feature">
                    <div className="lesson-name-div">
                        <div className="lesson-name">{data[0].name}</div>
                    </div>
                    <div className="lesson-words-div">
                        <Table pagination={{ pageSize: 8 }} columns={columns} dataSource={tableData} size="large" />
                        <Button type="primary" onClick={showModal}>
                            Add word to lesson
                        </Button>
                        <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                            <WordTable lessonId={params.id} />
                        </Modal>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateLesson;
