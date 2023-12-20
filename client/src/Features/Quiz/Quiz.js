import React, { useState } from 'react';

import { useGetQuizQuery, useGetQuestionsOfQuizQuery } from 'app/api/quizService';
import NavBar from 'Features/User/Components/NavBar/NavBar';
import Question from './Components/Question/Question';
import './Quiz.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { message } from 'antd';

function Quiz() {
    const navigate = useNavigate();
    const [position, setPosition] = useState(0);
    const [score, setScore] = useState(0);
    const [lifes, setLifes] = useState(3);
    const params = useParams();
    const { data: Quiz, isError: quizError, isLoading: quizLoading } = useGetQuizQuery(params.id);
    const {
        data: questions,
        isError: questionError,
        isLoading: questionLoading,
    } = useGetQuestionsOfQuizQuery(Quiz?.id);

    if (quizError) {
        return <h1>Something went wrong!</h1>;
    } else if (quizLoading) {
        return <h1>Loading ... </h1>;
    }

    if (questionError) {
        return <h1>Something went wrong!</h1>;
    } else if (questionLoading) {
        return <h1>Loading ... </h1>;
    }

    const handleAnswer = (answer) => {
        if (answer === questions[position].correctAnswer) {
            setScore((prev) => (prev += questions[position].score));
            message.success('correct!');
        } else {
            message.error('incorrect!');
            if (lifes === 1) {
                message.success(`You finished the quiz with score: ${score}`);
                navigate('/user/lesson/' + params.id);
            } else setLifes((prev) => (prev -= 1));
        }

        if (position < questions.length - 1) {
            setPosition((prev) => (prev += 1));
        } else {
            message.success(
                `You finished the quiz with score: ${
                    score + (answer === questions[position].correctAnswer ? questions[position].score : 0)
                }`,
            );
            navigate('/user/lesson/' + params.id);
        }
    };

    return (
        <div>
            <NavBar></NavBar>
            <div className="quiz">
                <Question
                    key={questions[position].id}
                    question={questions[position]}
                    totalScore={score}
                    lifes={lifes}
                    handleAnswer={handleAnswer}
                ></Question>
            </div>
        </div>
    );
}

export default Quiz;
