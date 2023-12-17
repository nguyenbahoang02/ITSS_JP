import React, { useState } from 'react';
import { Table, Button, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { setTab } from 'Features/Admin/tabSlice';
import { useDispatch } from 'react-redux';
import { useGetWordsQuery } from 'app/api/wordService';
import { useCreateSearchRecordMutation } from 'app/api/searchHistoryService';
import './GetWord.scss';

const GetWord = () => {
    const [createHistoryRecord] = useCreateSearchRecordMutation();

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState('');

    const { data: words, isError, isLoading } = useGetWordsQuery();
    if (isError) {
        return <h1>Something went wrong!</h1>;
    } else if (isLoading) {
        return <h1>Loading ... </h1>;
    }

    const filteredWords = words.filter((current) => {
        return (
            current.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
            current.furigana.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleViewWord = (record) => {
        createHistoryRecord({
            data: {
                WordId: record.id,
            },
            headers: {
                accessToken: JSON.parse(localStorage.getItem('user')).token,
            },
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        dispatch(setTab('4'));
        navigate(`/user/word/${record.id}`);
    };

    const columns = [
        {
            title: 'Order',
            dataIndex: 'id',
        },
        {
            title: 'Word',
            dataIndex: 'word',
        },
        {
            title: 'Furigana',
            dataIndex: 'furigana',
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
                            handleViewWord(record);
                        }}
                    >
                        Get Word
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div className="get-word">
            <div className="search-bar">
                <Input
                    type="text"
                    placeholder="Search by Word or Furigana"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>
            {searchTerm.trim() !== '' && (
                <div className="table">
                    <Table pagination={{ pageSize: 5 }} columns={columns} dataSource={filteredWords} size="large" />
                </div>
            )}
        </div>
    );
};

export default GetWord;
