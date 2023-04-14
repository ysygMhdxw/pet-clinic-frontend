import { QuestionText } from "./questionText";
import { QuestionHeader } from "./questionHeader";
import { AnswerList } from "./answerList";
import { AnswerText } from "./answerText";
import React,{useState,useEffect} from 'react';
import { Divider } from 'antd';
import propTypes from 'prop-types'
import { AnswerListMutiple } from "./answerListMutiple";
import { ExamHeader } from "./examHeader";
export const Question = ( props ) => {

    console.log(props.questionDetail);
    //question is an object includes all details
    let answers = [];
    const [question,setQuestion] = useState(props.questionDetail);
    const [checkView,setCheckView] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [isCorrect,setIsCorrect] = useState(true);
    useEffect(()=>{setQuestion(props.questionDetail)},[props.questionDetail])
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
            //console.log(answers);

    }
    
    let multipleAns = [];
    if (questionType == '多选题')
        {
            for (let [key, value] of Object.entries(question)){
            if(key.toString().indexOf("answer") != -1)
                multipleAns.push(value)
        }
        //console.log(multipleAns);
    }
   

    return (
        <div>
            {props.examView == true ?
             < ExamHeader
             setCurIndex = {props.setCurIndex}
             setCheckView={setCheckView} 
             score={question.score}
             curIndex = {props.curIndex}
             totalIndex = {props.totalIndex}
             isCorrect = {isCorrect}
             setUserScore = {props.setUserScore}
             userScore = {props.userScore}
             duration = {props.duration}/>
             :
             < QuestionHeader 
             setCardView={props.setCardView}
             setCheckView={setCheckView} 
             score={question.score}/>
             }
            
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
                < AnswerListMutiple
                    answers = {answers}
                    multipleAns = {multipleAns}
                    checkView={checkView}
                    setIsCorrect = {setIsCorrect}/> :
                < AnswerList 
                    answers = {answers}
                    checkView={checkView}
                    correct_ind={questionType =='单选题'?question.answer-1:question.answer}
                    setIsCorrect = {setIsCorrect}/>    
            )}
           
        </div>
    )
}
Question.propTypes = {
    setCardView: propTypes.func,
    questionDetail: propTypes.object,
    setCurIndex: propTypes.func,
    examView: propTypes.bool,
    curIndex: propTypes.number,
    totalIndex : propTypes.number,
    setUserScore : propTypes.func,
    userScore : propTypes.number,
    duration :propTypes.number
    
}

