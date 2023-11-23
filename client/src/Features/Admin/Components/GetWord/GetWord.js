import './GetWord.scss';
import { useState } from 'react';
import { useGetWordsQuery } from 'app/api/wordService';

const GetWord = () => {
    const [search, setSearch] = useState('');
    const { data: words, isError, isLoading } = useGetWordsQuery();
    if (isError) {
        return <h1>Something went wrong!</h1>;
    } else if (isLoading) {
        return <h1>Loading ... </h1>;
    }

    const Search = () => {
        const regex = new RegExp(search, "i");
        const matchingWords = words.filter(word => regex.test(word));
        // console.log(matchingWords);
        return (
            <div>
                {matchingWords.map((word, index) => (
                    <div key={index} className="result">
                        <div>{word.word}</div>
                        <div>{word.furigana}</div>
                        <div>{word.meaning}</div>
                        <div>{word.description}</div>
                    </div>
                ))}
            </div>
        )
    };
    return (
        <div className="getword">
            <input type="text" placeholder="Search for a word" onChange={(e) => setSearch(e.target.value)} />
            <button onClick={() => Search()}>Search</button>
        </div>
    )
}
export default GetWord;