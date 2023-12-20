import { useParams } from 'react-router-dom';
import './Flashcard.scss';
import NavBar from 'Features/User/Components/NavBar/NavBar';
import { useGetAllFlashcardQuery } from 'app/api/flashcardService';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { Button } from 'antd';
import { useState } from 'react';

function Flashcard() {
    const [swiper, setSwiper] = useState(null);

    const params = useParams();

    const {
        data: flashcard,
        isError,
        isLoading,
    } = useGetAllFlashcardQuery({
        lessonId: params.id,
        headers: { accessToken: JSON.parse(localStorage.getItem('user')).token },
    });
    if (isError) {
        return <h1>Something went wrong!</h1>;
    } else if (isLoading) {
        return <h1>Loading ... </h1>;
    }

    return (
        <div>
            <NavBar />
            <div className="flashcard">
                <Swiper
                    onSwiper={setSwiper}
                    style={{
                        '--swiper-navigation-color': 'var(--primary)',
                    }}
                    navigation={true}
                    modules={[Navigation]}
                    className="mySwiper"
                >
                    {flashcard.flashCards.map((current, index) => {
                        return (
                            <SwiperSlide key={index}>
                                <div className="slide-content">{current.Word.word}</div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
                <div className="remember-btn-area">
                    <Button
                        onClick={() => {
                            console.log(swiper);
                            swiper.slideNext();
                        }}
                    >
                        覚えている
                    </Button>
                    <Button
                        onClick={() => {
                            swiper.slideNext();
                        }}
                    >
                        覚えていない
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Flashcard;
