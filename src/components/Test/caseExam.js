import React from 'react';
import {QuizList} from './quizList';
import {useState, useEffect} from 'react';
import {Toggle} from './toggle';
import api from '../../api/api';

export const CaseExam = () => {
    const [quizView, setQuizView] = useState();
    const [questionCatalogue, setQuestionCatalogue] = useState('');
    const [quizDuration,setQuizDuration] = useState();
    useEffect(() => {getQustionsData()},[questionCatalogue])

    let questions = [];
    const typeMap = {single: '单选题', multi: '多选题', tof: '判断题', text: '简答题'};

    async function getQustionsData() {
        for (let [type, arr] of Object.entries(questionCatalogue)) {
            for (let id of arr) {
                //console.log(type+" "+id)
                const response = await api.getQuestion(type, id);
                //这个地方接口返回不一致
                //后面应该统一成data hs改完再说
                const question =  type==="single"?response.data.question : response.data.data;
                question['question_type'] = typeMap[type];
                questions.push(question);
            }
        }
        console.log(questions)
    }

    return (
      <div>
          {quizView == true?
           <Toggle
              questions = {questions}
              setQuizView={setQuizView}
              duration = {quizDuration}/>
           :  
           <QuizList 
              setQuizView={setQuizView} 
              setQuestionCatalogue={setQuestionCatalogue}
              setQuizDuration = {setQuizDuration}/>}
        </div>
    )

}