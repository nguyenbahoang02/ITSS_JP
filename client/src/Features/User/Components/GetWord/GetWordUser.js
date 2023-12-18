// GetWordUser.jsx

import React from 'react';
import 'Features/Admin/index.scss';
import './GetWordUser.scss';
import { useGetWordQuery } from 'app/api/wordService';
import { useParams } from 'react-router-dom';

function GetWordUser() {
    const params = useParams();
    const { data, isError, isLoading } = useGetWordQuery(params.id);

    if (isError) {
        return <h1>Something went wrong!</h1>;
    } else if (isLoading) {
        return <h1>Loading ... </h1>;
    }

    const { word, listMeanings } = data;

    return (
        <div className="update-word">
            <div className="admin-selected-feature">
                <div className="word-section">
                    <div className="section-title">Word:</div>
                    <div className="word">{word.word}</div>
                    <div className="section-title">Furigana:</div>
                    <div className="furigana">{word.furigana}</div>
                </div>
                <div className="meanings-section">
                    {listMeanings?.map((current, index) => (
                        <div className="meaning-div" key={index}>
                            <div className="section-title">Meaning:</div>
                            <div className="meaning">{current.meaning}</div>
                            <div className="section-title">Description:</div>
                            <div className="meaning-description">{current.description}</div>
                            {current?.Examples && current.Examples.length > 0 && (
                                <>
                                    <div className="section-title">Examples:</div>
                                    {current.Examples.map((curr, exampleIndex) => (
                                        <div className="example-div" key={exampleIndex}>
                                            <div className="section-title">Example</div>
                                            <div className="example">{curr.example}</div>
                                            <div className="section-title">Example Meaning</div>
                                            <div className="example-meaning">{curr.meaning}</div>
                                        </div>
                                    ))}
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default GetWordUser;
