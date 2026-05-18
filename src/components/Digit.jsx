import { useState, useEffect, useContext } from 'react';
import { GlobalContext } from "./GlobalContext";

const AnimatedCard = (props) => {
  return(
    <div className={`flipCard ${props.animation}`} onClick={props.onClick} style={{backgroundColor: props.style.color, borderColor:props.style.borderColor, width:"100%"}}>
      <span style={{color:"black", fontSize: props.fontSize}}>{props.digit}</span>
    </div>
  )
};

// function component
const StaticCard = (props) => (
  <div style={{borderColor:props.borderColor, width:"100%"}} className={props.position}>
    <span style={{color:"black", fontSize: props.fontSize}}>{props.digit}</span>
  </div>
);

const Digit = (props) => {	
    const [shuffle, setShuffle] = useState(false);
    const {appSettings } = useContext(GlobalContext);
    let max = props.max; 
        if(props.name==='month1' &&  props.digit0=== 1) max = 2
        else if(props.name==='day1' && props.digit0=== 3) max = 1
        else max=props.max;
    
    const handleIncrement = () => {
        if(props.checking) return;
        props.digitOnClick();

        if(props.name==='month1' &&  props.digit0=== 1) max = 2
        else if(props.name==='day1' && props.digit0=== 3) max = 1
        else max=props.max;
        setTimeout(() => {
            props.setDigit(prev => (prev + 1) > max ? 0 : prev + 1);
            setShuffle(prev => !prev);
        }, 100); 
    };

    let previousDigit ;
    previousDigit= props.digit===0 ? max : props.digit - 1;
    
    useEffect(() => {
      if(props.digit === 0 || !props.isReset) return;
      incrementDigit();
      props.digitOnClick();
    }, [props.isReset]);

    const incrementDigit = () => {
      setTimeout(() => {
          props.setDigit(0);
          setShuffle(prev => !prev);
      }, 100);
    }

    useEffect(() => {
      if (props.name === 'month1' && props.digit0 === 1 && props.digit > 2) {
        setTimeout(() => {
          setShuffle(prev => !prev); // activa animación
            props.setDigit(0);
          }, 200); 
      }else if(props.name==='day1' && props.digit0=== 3 && props.digit>1){
          handleIncrement();
      }
      
    }, [props.digit0]);


    // shuffle digits
    const digit1 = shuffle ? previousDigit : props.digit;
    const digit2 = !shuffle ? previousDigit : props.digit;

    // shuffle animations
    const animation1 = shuffle ? 'fold' : 'unfold';
    const animation2 = !shuffle ? 'fold' : 'unfold';
    

  return (
    <div className="flipClock" onClick={handleIncrement} >
        <div className={'flipUnitContainer'} style={{width: props.width*appSettings.digitWidth+'px', height: props.height*appSettings.digitHeight+'px', backgroundColor: props.style.color, borderColor: props.style.borderColor}}>
        <StaticCard position={'upperCard'} digit={props.digit} borderColor={props.style.borderColor} style={props.style} fontSize={props.height*appSettings.digitFontSize+"px"}/>
        <StaticCard position={'lowerCard'} digit={previousDigit} borderColor={props.style.borderColor} style={props.style} fontSize={props.height*appSettings.digitFontSize+"px"}/>
        <AnimatedCard digit={digit1} animation={animation1}  style={props.style} fontSize={props.height*appSettings.digitFontSize+"px"}/>
        <AnimatedCard digit={digit2} animation={animation2} style={props.style} fontSize={props.height*appSettings.digitFontSize+"px"}/>
        </div>
    </div>
  );
};

export default Digit;