import React from 'react';
import { Table, Button, message, Popconfirm } from 'antd';
import './ReadWord.scss';
import { useDeleteWordMutation, useGetWordsQuery } from 'app/api/wordService';
import { useNavigate } from 'react-router-dom';
import { setTab } from 'Features/Admin/tabSlice';
import { useDispatch } from 'react-redux';

const ReadWord = () => {
    const [deleteWord] = useDeleteWordMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const confirm = (id) => {
        deleteWord({
            id: id,
            headers: {
                accessToken: process.env.REACT_APP_ADMIN_TOKEN,
            },
        }).then((response) => {
            if (response.data.error !== undefined) {
                message.error(response.data.error.message);
            } else message.success('Deleted successfully');
            console.log(response);
        });
    };
    const cancel = (e) => {
        message.error('Cancelled');
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
                    <Button
                        type="primary"
                        onClick={() => {
                            dispatch(setTab('3'));
                            navigate(`/admin/updateWord/${record.id}`);
                        }}
                    >
                        Update
                    </Button>
                    <Popconfirm
                        title="Delete the task"
                        description="Are you sure to delete this task?"
                        onConfirm={() => confirm(record.id)}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="primary" danger>
                            Delete
                        </Button>
                    </Popconfirm>
                </div>
            ),
        },
    ];

    const { data: words, isError, isLoading } = useGetWordsQuery();
    if (isError) {
        return <h1>Something went wrong!</h1>;
    } else if (isLoading) {
        return <h1>Loading ... </h1>;
    }
    const tableData = words.map((current, index) => {
        return { ...current, key: current.id, index: index + 1 };
    });
    return (
        <div className="read-word">
            <Table pagination={{ pageSize: 10 }} columns={columns} dataSource={tableData} size="large" />
        </div>
    );
};
export default ReadWord;
