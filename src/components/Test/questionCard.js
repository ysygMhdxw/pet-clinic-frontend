import { QuestionText } from "./questionText";
import { QuestionHeader } from "./questionHeader";
import { AnswerList } from "./answerList";
import { AnswerText } from "./answerText";
import React,{useState} from 'react';
import { Divider } from 'antd';
import propTypes from 'prop-types'

export const Question = ( props ) => {

    console.log(props.questionDetail);
    //question is an object includes all details
    let answers = [];
    // eslint-disable-next-line no-unused-vars
    const [question,setQuestion] = useState(props.questionDetail);
    const [checkView,setCheckView] = useState(false);
    const questionType = question.question_type;
    switch (questionType){
        case '简答题':
            break;
        case '判断题':
            answers = ['正确','错误'];
            break;
        default:
            for (let [key, value] of Object.entries(question)){
                if (key.toString().indexOf("option") != -1)
                    answers.push(value);}

    }


    return (
        <div>
            < QuestionHeader 
                setCardView={props.setCardView}
                setCheckView={setCheckView} 
                score={question.score}/>
            <Divider/>
            < QuestionText 
                title={question.name} 
                description={question.description}/>
            <Divider/>
            {questionType == '简答题' && (
                < AnswerText 
                    answer={question.answer}
                    checkView={checkView}/>)}
            {questionType != '简答题' && 
                (questionType == '多选题'?
                <></> :
                < AnswerList 
                    answers={answers}
                    checkView={checkView}
                    correct_ind={questionType =='单选题'?question.answer-1:question.answer}/>    
            )}
           
        </div>
    )
}
Question.propTypes = {
    setCardView: propTypes.func,
    questionDetail: propTypes.object
    
}

