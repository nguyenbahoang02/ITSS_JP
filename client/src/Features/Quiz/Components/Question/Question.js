import React, { useEffect } from 'react';

import { HeartFilled } from '@ant-design/icons';
import './Question.scss';

function Question({ question, totalScore, lifes, handleAnswer }) {
    useEffect(() => {
        var count = 0;
        const interval = setInterval(() => {
            if (count === 14) {
                handleAnswer('incorrect answer');
            }
            count++;
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    return (
        <div className="question">
            <div className="header">
                <div className="life">
                    <HeartFilled></HeartFilled>
                    {lifes >= 2 && <HeartFilled></HeartFilled>}
                    {lifes === 3 && <HeartFilled></HeartFilled>}
                </div>
                <div className="progress">
                    <div className="time"></div>
                </div>
                <div className="score">{'正しい： ' + totalScore}</div>
            </div>

            <div className="body">
                <h2>{question?.question}</h2>
                <div className="answers">
                    <div className="answer" onClick={() => handleAnswer(1)}>
                        {question?.answer1}
                    </div>
                    <div className="answer" onClick={() => handleAnswer(2)}>
                        {question?.answer2}
                    </div>
                    <div className="answer" onClick={() => handleAnswer(3)}>
                        {question?.answer3}
                    </div>
                    <div className="answer" onClick={() => handleAnswer(4)}>
                        {question?.answer4}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Question;
