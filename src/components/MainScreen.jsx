import React, { useState, useEffect, useContext } from 'react';
import { GlobalContext } from "./GlobalContext";
import './../assets/scss/main.scss';
import Digit from './Digit.jsx';
import Electricity from './Electricity.jsx';
import Ray from './Ray.jsx';

const MainScreen = (props) => {
  const { escapp, appSettings, Utils, I18n } = useContext(GlobalContext);
  const [processingSolution, setProcessingSolution] = useState(false);
  const [isReset, setIsReset] = useState(false);

  const[backgroundChange, setBackgroundChange] = useState(false);

  const [light, setLight] = useState("off");
  const [containerWidth, setContainerWidth] = useState(0);//
  const [containerHeight, setContainerHeight] = useState(0);//
  const [containerMarginTop, setContainerMarginTop] = useState(0);//
  const [containerMarginLeft, setContainerMarginLeft] = useState(0);//
  const [boxWidth, setBoxWidth] = useState(0);
  const [boxHeight, setBoxHeight] = useState(0);
  const [lightWidth, setLightWidth] = useState(0); //
  const [lightHeight, setLightHeight] = useState(0); //
  const [lightLeft, setLightLeft] = useState(0);//
  const [lightTop, setLightTop] = useState(0);//

  const mapRange = (value, min1, max1, min2, max2) => {
    return min2 + ((value - min1) * (max2 - min2)) / (max1 - min1);
  };
  const [frequency, setFrequency] = useState(0);
  const [wavelength, setWavelength] = useState(0);
  const [amplitude, setAmplitude] = useState(0);
  const frequencyMapped = mapRange(frequency/3, 0, 119, appSettings.minFrequency, appSettings.maxFrequency); // Frecuencia entre 0.6 y 4.2
  const wavelengthMapped = mapRange(wavelength/3, 0, 119, appSettings.minWavelength, appSettings.maxWavelength); // Wavelength entre 10 y 80
  const amplitudeMapped = mapRange(amplitude/3, 0, 119, appSettings.minAmplitude, appSettings.maxAmplitude); // Amplitud entre 25 y 80

  const [year0, setYear0] = useState(0);
  const [year1, setYear1] = useState(0);
  const [year2, setYear2] = useState(0);
  const [year3, setYear3] = useState(0);
  const [year4, setYear4] = useState(0);
  const [month0, setMonth0] = useState(0);
  const [month1, setMonth1] = useState(0);
  const [day0, setDay0] = useState(0);
  const [day1, setDay1] = useState(0);
  const [hour0, setHour0] = useState(0);
  const [hour1, setHour1] = useState(0);
  const [minute0, setMinute0] = useState(0);
  const [minute1, setMinute1] = useState(0);
  const [second0, setSecond0] = useState(0);
  const [second1, setSecond1] = useState(0);

  // Estados para el carrusel de texto
  const [textPosition, setTextPosition] = useState(0); 
  const [isAnimating, setIsAnimating] = useState(false);

  const [wormholeActive, setWormholeActive] = useState(false);

  const rayInErrorState = light === "nok" || isReset;

  useEffect(() => {
    handleResize();
  }, [props.appWidth, props.appHeight]);

  function handleResize(){
    if((props.appHeight === 0)||(props.appWidth === 0)){
      return;
    }

    let aspectRatio = 4 / 3;
    let _keypadWidth = Math.min(props.appHeight * aspectRatio, props.appWidth);
    let _keypadHeight = _keypadWidth / aspectRatio;

    let _lockWidth = Math.min(props.appHeight * aspectRatio, props.appWidth) ;
    let _lockHeight = _lockWidth / aspectRatio;

    let _containerWidth = _lockWidth *0.9;
    let _containerHeight = _lockHeight *0.9;


    let _containerMarginLeft=0.03 * _lockWidth;
    let _containerMarginTop=0.68 * _lockHeight;

    let _boxWidth = _lockWidth * 0.7;
    let _boxHeight = _lockHeight * 0.7;



    let _lightWidth = _lockWidth * 0.11;;
    let _lightHeight = _lockHeight * 0.11;
    let _lightLeft = _lockWidth * 0.445;
    let _lightTop = _lockHeight * 0.68;



    setContainerWidth(_containerWidth);
    setContainerHeight(_containerHeight);
    setContainerMarginTop(_containerMarginTop);
    setContainerMarginLeft(_containerMarginLeft);

    setBoxWidth(_boxWidth);
    setBoxHeight(_boxHeight);

    setLightWidth(_lightWidth);
    setLightHeight(_lightHeight);
    setLightLeft(_lightLeft);
    setLightTop(_lightTop);
  }

  // Funciones para el carrusel de texto
  const moveTextUp = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTextPosition(0); // Muestra texto1
    let audio = document.getElementById("audio_button_press");
    audio.currentTime = 0; // Reinicia el audio
    audio.play();
    setTimeout(() => setIsAnimating(false), 500); // Duración de la animación
  };

  const moveTextDown = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTextPosition(1); // Muestra texto2
    let audio = document.getElementById("audio_button_press");
    audio.currentTime = 0; // Reinicia el audio
    audio.play();
    setTimeout(() => setIsAnimating(false), 500); // Duración de la animación
  };

  const changeBackground = () => {
    buildSolution();

    setWormholeActive(true); // Inicia animación
    
    // Después de 4 segundos (mitad de la animación), cambia el fondo
    setTimeout(() => {
      setBackgroundChange(true);
      let audio = document.getElementById("audio_time_passing");
      audio.currentTime = 0; // Reinicia el audio
      audio.play();
    }, 4000);
    
    // Después de 8 segundos, termina el efecto
    setTimeout(() => {
      setWormholeActive(false);
      
    }, 8000);
  };

  const buildSolution = () => {
    let solution = "";
    let year = year0*10000 + year1*1000 + year2*100 + year3*10 + year4;
    let month = month0*10 + month1;
    let day = day0*10 + day1;
    let hour = hour0*10 + hour1;
    let minute = minute0*10 + minute1;
    let second = second0*10 + second1;
    if(textPosition === 0) year=year*-1;
    solution = year + ";" + month + ";" + day ;
    if(appSettings.solutionLength >=4) solution += ";" + hour;
    if(appSettings.solutionLength >=5) solution += ";" + minute;
    if(appSettings.solutionLength >=6) solution += ";" + second;

    return solution;
    console.log("Solution: " + solution);
  }

  const checkSolution = () => {
    if (processingSolution) {return; }

    let audio = document.getElementById("audio_switch");
    audio.currentTime = 0; // Reinicia el audio
    audio.play();

    setProcessingSolution(true);
    let solution = buildSolution();
    console.log("Solution:" + solution);
    escapp.checkNextPuzzle(solution, {}, (success, erState) => {
          Utils.log("Check solution Escapp response", success, erState);
          try {
            setTimeout(() => {
              changeBoxLight(success, solution);
            }, 700);
          } catch(e){
            Utils.log("Error in checkNextPuzzle",e);
          }
        });
  }

  const changeBoxLight = (success, solution) => {
    let audio;
    let afterChangeBoxLightDelay = 2500;

    if (success) {
      audio = document.getElementById("audio_success");
      changeBackground();
      setLight("ok");
    } else {
      audio = document.getElementById("audio_failure");
      setLight("nok");
      reset(); //
    }

    setTimeout(() => {
      if(!success){
        setLight("off");
        setProcessingSolution(false);
      }else{
          props.onKeypadSolved(solution); 
      }
    }, afterChangeBoxLightDelay);
    audio.play();
  }

  const reset = () => {
    setIsReset(true);
    setTimeout(() => {
      setIsReset(false);
      setProcessingSolution(false);
    }, 3000);
  }

  const yearStyle = {
    top:("0%"),
    color:("#d0c8c8"),
    borderColor:(""),
  }
  const monthStyle = {
    top:("0%") ,
    color:("#487a53"),
    borderColor:("#37553e"),
  }
  const dayStyle = {
    top:("-175%") ,
    color:("#d4a274"),
    borderColor:("#c7762a"),
  }
  const hourStyle = {
    top:("-90%") ,
    color:("#ae6a68"),
    borderColor:("#893330"),
  }
  const minuteStyle = {
    top:("-90%") ,
    color:("#6eb0a9"),
    borderColor:("#3d7975"),
  }
  const secondStyle = {
    top:("-90%") ,
    color:("#bb50d3"),
    borderColor:("#5d2b68"),
  }

  const digitOnClick = () => {
    let audio = document.getElementById("audio_flip");
    audio.currentTime = 0; // Reinicia el audio
    audio.play();
  };

  

  //Pone la imagen del fondo
  let backgroundImage = 'url("' + appSettings.background + '")';
  if(appSettings.background && appSettings.background !== "NONE"){
    backgroundImage += ', url("' + appSettings.background + '")';
  }

  return (
    
    <div id="screen_main" className={"screen_content"} style={{ backgroundImage: backgroundChange ? 'url("' + appSettings.backgroundAfter + '")' : 'url("' + appSettings.backgroundBefore + '")' }}>   
      <div className={`wormhole ${wormholeActive ? 'active' : ''}`}/>
        <div className={`timeMachineContainer ${wormholeActive ? 'active' : ''}`} style={{zIndex:2,backgroundImage: 'url('+appSettings.backgroundTimeMachine+')' , width: containerWidth, height: containerHeight, position: "relative"}}>  
          {/*Year*/}     
           <div style={{zIndex:3,position: "absolute",display:"flex", flexDirection:"row", justifyContent:"center", alignItems:"center", width: containerWidth*0.2, height: containerHeight*0.1, top: containerHeight*0.2, left: containerWidth*0.24, gap: containerWidth*0.006 + "px"}}>            
            <Digit name={"year0"} checking={processingSolution} style={yearStyle} height={containerHeight} width={containerWidth} digit={year0} setDigit={setYear0} max={9} digitOnClick={digitOnClick} isReset={isReset} />
            <Digit name={"year1"} checking={processingSolution} style={yearStyle} height={containerHeight} width={containerWidth} digit={year1} setDigit={setYear1} max={9} digitOnClick={digitOnClick} isReset={isReset} />
            <Digit name={"year2"} checking={processingSolution} style={yearStyle} height={containerHeight} width={containerWidth} digit={year2} setDigit={setYear2} max={9} digitOnClick={digitOnClick} isReset={isReset} />
            <Digit name={"year3"} checking={processingSolution} style={yearStyle} height={containerHeight} width={containerWidth} digit={year3} setDigit={setYear3} max={9} digitOnClick={digitOnClick} isReset={isReset} />
            <Digit name={"year4"} checking={processingSolution} style={yearStyle} height={containerHeight} width={containerWidth} digit={year4} setDigit={setYear4} max={9} digitOnClick={digitOnClick} isReset={isReset} />
          </div>
          <p className="tittle-text" style={{position:"absolute", left:"33.2%", top:"13.2%", color:"black", fontSize: containerHeight*appSettings.signFontSize + "px", textAlign:"center", transform: "translateX(-50%)"}}>{I18n.getTrans("i.year")}</p>
          {/*Month*/}
          <div style={{zIndex:3,position: "absolute",display:"flex", flexDirection:"row", justifyContent:"center", alignItems:"center", width: containerWidth*0.1, height: containerHeight*0.1, top: containerHeight*0.2, left: containerWidth*0.525, gap: containerWidth*0.006 + "px"}}>            
            <Digit name={"month0"} checking={processingSolution}  style={monthStyle} height={containerHeight} width={containerWidth} digit={month0} setDigit={setMonth0} max={1} digitOnClick={digitOnClick} isReset={isReset} />
            <Digit name={"month1"} digit0={month0} checking={processingSolution} style={monthStyle} height={containerHeight} width={containerWidth} digit={month1} setDigit={setMonth1} max={9} digitOnClick={digitOnClick} isReset={isReset} />
          </div>
          <p className="tittle-text" style={{position:"absolute", left:"57.5%", top:"13.2%", color:"black", fontSize: containerHeight*appSettings.signFontSize + "px", textAlign:"center", transform: "translateX(-50%)"}}>{I18n.getTrans("i.month")}</p>
          {/*Day*/}
          <div style={{zIndex:3,position: "absolute",display:"flex", flexDirection:"row", justifyContent:"center", alignItems:"center", width: containerWidth*0.1, height: containerHeight*0.1, top: containerHeight*0.2, left: containerWidth*0.678, gap: containerWidth*0.006 + "px"}}>            
            <Digit name={"day0"} checking={processingSolution} style={dayStyle} height={containerHeight} width={containerWidth} digit={day0} setDigit={setDay0} max={3} digitOnClick={digitOnClick} isReset={isReset} />
            <Digit name={"day1"} digit0={day0}  checking={processingSolution}  style={dayStyle} height={containerHeight} width={containerWidth} digit={day1} setDigit={setDay1} max={9} digitOnClick={digitOnClick} isReset={isReset} />
          </div>
          <p className="tittle-text" style={{position:"absolute", left:"72.5%", top:"13.2%", color:"black", fontSize: containerHeight*appSettings.signFontSize + "px", textAlign:"center", transform: "translateX(-50%)"}}>{I18n.getTrans("i.day")}</p>
          {/*Hour*/}
          {appSettings.solutionLength >= 4 && <>
            <div className='lockContainer' style={{zIndex: 2, position: "absolute", backgroundImage: `url(${appSettings.backgroundHour})`, width: containerWidth*0.15, height: containerHeight*0.15, top: "31.9%", left: "34.9%"}}/>
            <div style={{zIndex:3,position: "absolute",display:"flex", flexDirection:"row", justifyContent:"center", alignItems:"center", width: containerWidth*0.1, height: containerHeight*0.1, top: containerHeight*0.3275, left: containerWidth*0.375, gap: containerWidth*0.006 + "px"}}>            
              <Digit name={"hour0"} checking={processingSolution} style={hourStyle} height={containerHeight} width={containerWidth} digit={hour0} setDigit={setHour0} max={5} digitOnClick={digitOnClick} isReset={isReset} />
              <Digit name={"hour1"} checking={processingSolution} style={hourStyle} height={containerHeight} width={containerWidth} digit={hour1} setDigit={setHour1} max={9} digitOnClick={digitOnClick} isReset={isReset} />
            </div>
            <p className="tittle-text" style={{zIndex:3,position:"absolute", left:"42.4%", top:"39.7%", color:"black", fontSize: containerHeight*appSettings.signFontSize + "px", textAlign:"center", transform: "translateX(-50%)"}}>{I18n.getTrans("i.hour")}</p>
          </>}
          {/*Minute*/}
          {appSettings.solutionLength >= 5 && <>
            <div className='lockContainer' style={{zIndex: 2, position: "absolute", backgroundImage: `url(${appSettings.backgroundMinute})`, width: containerWidth*0.15, height: containerHeight*0.15, top: "32%", left: "50%"}}/>
            <div style={{zIndex:3,position: "absolute",display:"flex", flexDirection:"row", justifyContent:"center", alignItems:"center", width: containerWidth*0.1, height: containerHeight*0.1, top: containerHeight*0.3275, left: containerWidth*0.525, gap: containerWidth*0.006 + "px"}}>            
              <Digit name={"minute0"} checking={processingSolution} style={minuteStyle} height={containerHeight} width={containerWidth} digit={minute0} setDigit={setMinute0} max={5} digitOnClick={digitOnClick} isReset={isReset}/>
              <Digit name={"minute1"} checking={processingSolution} style={minuteStyle} height={containerHeight} width={containerWidth} digit={minute1} setDigit={setMinute1} max={9} digitOnClick={digitOnClick} isReset={isReset}/>
            </div>
            <p className="tittle-text" style={{zIndex:3,position:"absolute", left:"57.4%", top:"39.7%", color:"black", fontSize: containerHeight*appSettings.signFontSize + "px", textAlign:"center", transform: "translateX(-50%)"}}>{I18n.getTrans("i.minute")}</p>
          </>}
          {/*Second*/}
          {appSettings.solutionLength === 6 && <>
            <div className='lockContainer' style={{zIndex: 2, position: "absolute", backgroundImage: `url(${appSettings.backgroundSecond})`, width: containerWidth*0.15, height: containerHeight*0.15, top: "32.1%", left: "64.9%"}}/>
            <div style={{zIndex:3,position: "absolute",display:"flex", flexDirection:"row", justifyContent:"center", alignItems:"center", width: containerWidth*0.1, height: containerHeight*0.1, top: containerHeight*0.3275, left: containerWidth*0.675, gap: containerWidth*0.006 + "px"}}>            
              <Digit name={"second0"} checking={processingSolution}  style={secondStyle} height={containerHeight} width={containerWidth} digit={second0} setDigit={setSecond0} max={5} digitOnClick={digitOnClick} isReset={isReset} />
              <Digit name={"second1"} checking={processingSolution}  style={secondStyle} height={containerHeight} width={containerWidth} digit={second1} setDigit={setSecond1} max={9} digitOnClick={digitOnClick} isReset={isReset} />
            </div>
            <p className="tittle-text" style={{zIndex:3,position:"absolute", left:"72.4%", top:"39.5%", color:"black", fontSize: containerHeight*appSettings.signFontSize + "px", textAlign:"center", transform: "translateX(-50%)"}}>{I18n.getTrans("i.second")}</p>
          </>}

          {/*Botón Comprobar*/}
          <div className='switchContainer' onClick={checkSolution} style={{zIndex:5,position: "absolute", backgroundImage: `url(${appSettings.switchImage})`, width: lightWidth, height: lightHeight, top: "63%", left:"44%", cursor: !processingSolution && "pointer", transform: processingSolution && "translateY(1.1vmin)", filter: processingSolution && "brightness(0.8)"}}/>

          {/* AC BC */}
          <div style={{zIndex: 2, position: "absolute", width: containerWidth*0.09, height: containerHeight*0.045, top:"33.9%", left: "23.35%", backgroundColor: "#f0d0a2"}}>
            <div className="text-carousel">
              <div className={`text-container ${textPosition === 0 ? 'show-first' : 'show-second'}`}>
                <div className="text-item" style={{fontSize: containerHeight*0.048 + "px", paddingTop: "65%"}}>BC</div> {/*Antes de cristo*/}
                <div className="text-item" style={{fontSize: containerHeight*0.048 + "px", paddingTop: "65%"}}>AC</div> {/*Después de cristo*/}
              </div>
            </div>
          </div>          
          {/* Botones AC BC */}
          <div className='lockContainer' style={{zIndex: 2, position: "absolute", backgroundImage: `url(${appSettings.acbcBackground})`, width: containerWidth*0.15, height: containerHeight*0.15, top: "31.5%", left: "20.4%"}}/>
          <div className={`buttonContainer ${textPosition===0 && 'disabled'}`} onClick={textPosition===0 ? null : moveTextUp} style={{display: "flex", alignItems:"center", justifyContent:"center", zIndex: 2, position: "absolute", backgroundImage: `url(${appSettings.buttonBackground})`, width: containerWidth*0.05, height: containerHeight*0.05, top: "39.7%", left: "22.8%"}}>
            <svg xmlns="http://www.w3.org/2000/svg" height="5vmin" viewBox="0 -960 960 960" width="5vmin" fill="#FFFFFF"><path d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z"/></svg>
          </div>
          <div className={`buttonContainer ${textPosition===1 && 'disabled'}`} onClick={textPosition===1 ? null : moveTextDown} style={{display: "flex", alignItems:"center", justifyContent:"center", zIndex: 2, position: "absolute", backgroundImage: `url(${appSettings.buttonBackground})`, width: containerWidth*0.05, height: containerHeight*0.05, top: "39.7%", left: "27.6%"}}>
            <svg xmlns="http://www.w3.org/2000/svg" height="5vmin" viewBox="0 -960 960 960" width="5vmin" fill="#FFFFFF"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/></svg>
          </div>
          
          <div style={{zIndex: 3, position: "absolute", left: containerWidth*0.208, top: containerHeight*0.545, width: containerWidth*0.17, height: containerHeight*0.14}}>
            <Ray boxHeight={containerHeight*0.45} boxWidth={containerWidth*0.255} checking={processingSolution} waveType={"sine"}
              frequency={frequencyMapped} amplitude={amplitudeMapped} wavelength={wavelengthMapped}
              rayOuterColor={rayInErrorState ? "rgb(255, 200, 200)" : undefined}
              rayInnerColor={rayInErrorState ? "rgb(255, 0, 0)" : undefined}
            />
          </div>
        

          <div style={{zIndex:1,position:"absolute", left:containerWidth*0.35, top:containerHeight*0.51}}>
            <Electricity width={containerWidth*0.15} height={containerHeight*0.2}
              startPoint={{ x: (containerWidth*0.15)/2, y: containerHeight*0.01 }}
              endPoint={{ x: (containerWidth*0.15)/2, y: containerHeight*0.1 }}
              animationSpeed={100}  branches={2} maxBranches={8}branchLength={0.1}
              multipleRays={true} rayCount={2} color="#ff0080"strokeWidth={1.2} segments={15}
              glowEffect={true} animated={true} flickerIntensity={0.8}intensity={0.9}/>
          </div>
          <div style={{zIndex:1,position:"absolute", left:containerWidth*0.425, top:containerHeight*0.51}}>
            <Electricity width={containerWidth*0.15} height={containerHeight*0.2}
              startPoint={{ x: (containerWidth*0.15)/2, y: containerHeight*0.01 }}
              endPoint={{ x: (containerWidth*0.15)/2, y: containerHeight*0.1 }}
              animationSpeed={100} branches={2} maxBranches={8} branchLength={0.1}
              multipleRays={true} rayCount={2} color="#00e600ff" strokeWidth={1.2}
              segments={15} glowEffect={true} animated={true} flickerIntensity={0.8} intensity={0.9} />
          </div>
          <div style={{zIndex:1,position:"absolute", left:containerWidth*0.50, top:containerHeight*0.51}}>
            <Electricity width={containerWidth*0.15} height={containerHeight*0.2}
              startPoint={{ x: (containerWidth*0.15)/2, y: containerHeight*0.01 }}
              endPoint={{ x: (containerWidth*0.15)/2, y: containerHeight*0.1 }}
              animationSpeed={100} branches={2} maxBranches={8} branchLength={0.1}
              multipleRays={true} rayCount={2} color="#ffdc9cff"strokeWidth={1.2}
              segments={15} glowEffect={true} animated={true} flickerIntensity={0.8} intensity={0.9} />         
          </div>
          <div style={{zIndex:1,position:"absolute", left:containerWidth*0.585, top:containerHeight*0.51}}>
            <Electricity width={containerWidth*0.15} height={containerHeight*0.2}
              startPoint={{ x: (containerWidth*0.15)/2, y: containerHeight*0.01 }}
              endPoint={{ x: (containerWidth*0.15)/2, y: containerHeight*0.1 }}
              animationSpeed={100} branches={2} maxBranches={8} branchLength={0.1}
              multipleRays={true} rayCount={2} color="#078fffff" strokeWidth={1.2}
              segments={15} glowEffect={true} animated={true} flickerIntensity={0.8} intensity={0.9} />         
          </div>

  
      </div>
        
        

      <audio id="audio_flip" src={appSettings.soundFlip} autostart="false" preload="auto" />
      <audio id="audio_failure" src={appSettings.soundNok} autostart="false" preload="auto" />
      <audio id="audio_success" src={appSettings.soundOk} autostart="false" preload="auto" />
      <audio id="audio_switch" src={appSettings.soundSwitch} autostart="false" preload="auto" />
      <audio id="audio_button_press" src={appSettings.soundButtonPress} autostart="false" preload="auto" />
      <audio id="audio_time_passing" src={appSettings.soundTimePassing} autostart="false" preload="auto" />
 
    </div>);
};

export default MainScreen;