import React, {useEffect, useState} from 'react';
import {QuestionList} from './questionList'
import {Question} from './questionCard'

export const CaseQuestions = () => {
    const [cardView, setCardView] = useState();
    const [questionDetail, setQuestionDetail] = useState();
    useEffect(() => {
    }, [questionDetail])

    console.log(cardView);

    return (
        <div>
            {cardView === true ?
                <Question
                    setCardView={setCardView}
                    questionDetail={questionDetail}/>
                :
                <QuestionList
                    setCardView={setCardView}
                    setQuestionDetail={setQuestionDetail}/>}
        </div>
    )

}
