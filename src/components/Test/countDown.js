import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types'

export const CountDown = ( props ) => {

    // eslint-disable-next-line no-unused-vars
    const [timerID, setTimerID] = useState(null);
    const [counter, setCounter] = useState(props.duration);
  
    useEffect(() => {
  
      if(counter > 0){
        let timer = setTimeout(() => {
          setCounter(counter-1)
        }, 1000);
        setTimerID(timer)
      }else{
        props.setCurIndex(props.totalIndex);
      }
      
      return () => {
        setTimerID(null)
      }
    },[counter]);
    
      

 return (
    <>
     <div>
        剩余时间：{counter} 秒
    </div>
    </>
 )
};

CountDown.propTypes = {
    duration : propTypes.number,
    setCurIndex: propTypes.func,
    totalIndex : propTypes.number,

}