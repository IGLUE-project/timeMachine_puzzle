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

    let _lockWidth = Math.min(props.appHeight *1.15 , props.appWidth);
    let _lockHeight = _lockWidth / aspectRatio;

    console.log(_lockWidth, props.appWidth, props.appHeight*aspectRatio);
    let _containerWidth = _lockWidth *0.9;
    let _containerHeight = _lockHeight *0.9;


    let _containerMarginLeft=0.03 * _lockWidth;
    let _containerMarginTop=0.68 * _lockHeight;

    let _boxWidth = _lockWidth * 0.7;
    let _boxHeight = _lockHeight * 0.7;

    //let _backgroundNokWidth = _lockWidth * 0.8;
    //let _backgroundNokHeight = _lockHeight * 0.8;

    let _lightWidth;
    let _lightHeight;
    let _lightLeft;
    let _lightTop;



    switch(appSettings.skin){
      case "RETRO":
        _containerMarginTop = 0;
        _containerHeight = _lockHeight *0.55;
        _lightWidth = _lockWidth * 0.18;
        _lightHeight = _lockHeight *0.18;
        _lightLeft = _lockWidth * 0;
        _lightTop =  _lockHeight * -0.14;
        break;
      case "FUTURISTIC":
        _containerMarginTop = 0;//_lockHeight*0;
        _containerHeight = _lockHeight *0.605;
         _lightWidth = _lockWidth*0.9;
        _lightHeight = _lockHeight*0.6;
        _boxHeight = _lockHeight * 0.9;
        _boxWidth = _lockWidth * 0.9;

        break;
      default:
        _lightWidth = _lockWidth * 0.11;
        _lightHeight = _lockHeight * 0.11;
        //_lightLeft =  _lockWidth  * 0.61;
        //_lightTop =  _lockHeight  * 0.03
    }

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
    setTimeout(() => setIsAnimating(false), 500); // Duración de la animación
  };

  const moveTextDown = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTextPosition(100); // Muestra texto2
    setTimeout(() => setIsAnimating(false), 500); // Duración de la animación
  };

  const changeBackground = () => {
    setWormholeActive(true); // Inicia animación
    
    // Después de 4 segundos (mitad de la animación), cambia el fondo
    setTimeout(() => {
      setBackgroundChange(true);
    }, 4000);
    
    // Después de 8 segundos, termina el efecto
    setTimeout(() => {
      setWormholeActive(false);
    }, 8000);
  };

  const checkSolution = () => {
    if (processingSolution) {
      return;
    }

    let audio = document.getElementById("audio_switch");
    audio.currentTime = 0; // Reinicia el audio
    audio.play();

    setProcessingSolution(true);
    let year = toString(year0) + toString(year1) + toString(year2 ) + toString(year3) + toString(year4);
    let month = toString(month0) + toString(month1);
    let day = toString(day0) + toString(day1);
    let hour = toString(hour0) + toString(hour1);
    let minute = toString(minute0) + toString(minute1);
    let second = toString(second0) + toString(second1);
    let solution = [year, month, day, hour, minute, second].join(";");
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
          props.onKeypadSolved(solution); //Cambiar          
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
    boxHeight: containerHeight*0.07 + "px",
    boxWidth: containerWidth*0.035 + "px",
    fontSize : containerHeight*0.08 + "px"
  }
  const monthStyle = {
    top:("0%") ,
    color:("#487a53"),
    borderColor:("#37553e"),
    boxHeight: containerHeight*0.07 + "px",
    boxWidth: containerWidth*0.035 + "px",
    fontSize : containerHeight*0.08 + "px"
  }
  const dayStyle = {
    top:("-175%") ,
    color:("#d4a274"),
    borderColor:("#c7762a"),
    boxHeight: containerHeight*0.07 + "px",
    boxWidth: containerWidth*0.035 + "px",
    fontSize : containerHeight*0.08 + "px"
  }
  const hourStyle = {
    top:("-90%") ,
    color:("#ae6a68"),
    borderColor:("#893330"),
    boxHeight: containerHeight*0.07 + "px",
    boxWidth: containerWidth*0.035 + "px",
    fontSize : containerHeight*0.08 + "px"
  }
  const minuteStyle = {
    top:("-90%") ,
    color:("#6eb0a9"),
    borderColor:("#3d7975"),
    boxHeight: containerHeight*0.07 + "px",
    boxWidth: containerWidth*0.035 + "px",
    fontSize : containerHeight*0.08 + "px"
  }
  const secondStyle = {
    top:("-90%") ,
    color:("#bb50d3"),
    borderColor:("#5d2b68"),
    boxHeight: containerHeight*0.07 + "px",
    boxWidth: containerWidth*0.035 + "px",
    fontSize : containerHeight*0.08 + "px"
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
        <div className={`timeMachineContainer ${wormholeActive ? 'active' : ''}`} style={{zIndex:2,backgroundImage: appSettings.fullTimeMachine ? 'url('+appSettings.backgroundTimeMachineFull+')' : 'url('+appSettings.backgroundTimeMachine+')', width: containerWidth, height: containerHeight, position: "relative"}}>  
          {/*Year*/}     
           <div style={{zIndex:3,position: "absolute",display:"flex", flexDirection:"row", justifyContent:"center", alignItems:"center", width: containerWidth*0.2, height: containerHeight*0.1, top: containerHeight*0.2, left: containerWidth*0.24, gap: containerWidth*0.006 + "px"}}>            
            <Digit name={"year0"} checking={processingSolution} style={yearStyle} digit={year0} setDigit={setYear0} max={9} digitOnClick={digitOnClick} isReset={isReset} />
            <Digit name={"year1"} checking={processingSolution} style={yearStyle} digit={year1} setDigit={setYear1} max={9} digitOnClick={digitOnClick} isReset={isReset} />
            <Digit name={"year2"} checking={processingSolution} style={yearStyle} digit={year2} setDigit={setYear2} max={9} digitOnClick={digitOnClick} isReset={isReset} />
            <Digit name={"year3"} checking={processingSolution} style={yearStyle} digit={year3} setDigit={setYear3} max={9} digitOnClick={digitOnClick} isReset={isReset} />
            <Digit name={"year4"} checking={processingSolution} style={yearStyle} digit={year4} setDigit={setYear4} max={9} digitOnClick={digitOnClick} isReset={isReset} />
          </div>
          <p className="tittle-text" style={{position:"absolute", left:"33.2%", top:"13.2%", color:"black", fontSize: containerHeight*0.03 + "px", textAlign:"center", transform: "translateX(-50%)"}}>{I18n.getTrans("i.year")}</p>
          {/*Month*/}
          <div style={{zIndex:3,position: "absolute",display:"flex", flexDirection:"row", justifyContent:"center", alignItems:"center", width: containerWidth*0.1, height: containerHeight*0.1, top: containerHeight*0.2, left: containerWidth*0.525, gap: containerWidth*0.006 + "px"}}>            
            <Digit name={"month0"} checking={processingSolution}  style={monthStyle} digit={month0} setDigit={setMonth0} max={1} digitOnClick={digitOnClick} isReset={isReset} />
            <Digit name={"month1"} digit0={month0} checking={processingSolution} style={monthStyle} digit={month1} setDigit={setMonth1} max={9} digitOnClick={digitOnClick} isReset={isReset} />
          </div>
          <p className="tittle-text" style={{position:"absolute", left:"57.5%", top:"13.2%", color:"black", fontSize: containerHeight*0.03 + "px", textAlign:"center", transform: "translateX(-50%)"}}>{I18n.getTrans("i.month")}</p>
          {/*Day*/}
          <div style={{zIndex:3,position: "absolute",display:"flex", flexDirection:"row", justifyContent:"center", alignItems:"center", width: containerWidth*0.1, height: containerHeight*0.1, top: containerHeight*0.2, left: containerWidth*0.678, gap: containerWidth*0.006 + "px"}}>            
            <Digit name={"day0"} checking={processingSolution} style={dayStyle} digit={day0} setDigit={setDay0} max={3} digitOnClick={digitOnClick} isReset={isReset} />
            <Digit name={"day1"} digit0={day0}  checking={processingSolution}  style={dayStyle} digit={day1} setDigit={setDay1} max={9} digitOnClick={digitOnClick} isReset={isReset} />
          </div>
          <p className="tittle-text" style={{position:"absolute", left:"72.5%", top:"13.2%", color:"black", fontSize: containerHeight*0.03 + "px", textAlign:"center", transform: "translateX(-50%)"}}>{I18n.getTrans("i.day")}</p>
          {/*Hour*/}
          <div className='lockContainer' style={{zIndex: 2, position: "absolute", backgroundImage: `url(${appSettings.backgroundHour})`, width: containerWidth*0.15, height: containerHeight*0.15, top: "31.9%", left: "34.9%"}}/>
          <div style={{zIndex:3,position: "absolute",display:"flex", flexDirection:"row", justifyContent:"center", alignItems:"center", width: containerWidth*0.1, height: containerHeight*0.1, top: containerHeight*0.3275, left: containerWidth*0.375, gap: containerWidth*0.006 + "px"}}>            
            <Digit name={"hour0"} checking={processingSolution} style={hourStyle} digit={hour0} setDigit={setHour0} max={5} digitOnClick={digitOnClick} isReset={isReset} />
            <Digit name={"hour1"} checking={processingSolution} style={hourStyle} digit={hour1} setDigit={setHour1} max={9} digitOnClick={digitOnClick} isReset={isReset} />
          </div>
          <p className="tittle-text" style={{zIndex:3,position:"absolute", left:"42.4%", top:"39.7%", color:"black", fontSize: containerHeight*0.03 + "px", textAlign:"center", transform: "translateX(-50%)"}}>{I18n.getTrans("i.hour")}</p>
          {/*Minute*/}
          <div className='lockContainer' style={{zIndex: 2, position: "absolute", backgroundImage: `url(${appSettings.backgroundMinute})`, width: containerWidth*0.15, height: containerHeight*0.15, top: "32%", left: "50%"}}/>
          <div style={{zIndex:3,position: "absolute",display:"flex", flexDirection:"row", justifyContent:"center", alignItems:"center", width: containerWidth*0.1, height: containerHeight*0.1, top: containerHeight*0.3275, left: containerWidth*0.525, gap: containerWidth*0.006 + "px"}}>            
            <Digit name={"minute0"} checking={processingSolution} style={minuteStyle} digit={minute0} setDigit={setMinute0} max={5} digitOnClick={digitOnClick} isReset={isReset}/>
            <Digit name={"minute1"} checking={processingSolution} style={minuteStyle} digit={minute1} setDigit={setMinute1} max={9} digitOnClick={digitOnClick} isReset={isReset}/>
          </div>
          <p className="tittle-text" style={{zIndex:3,position:"absolute", left:"57.4%", top:"39.7%", color:"black", fontSize: containerHeight*0.03 + "px", textAlign:"center", transform: "translateX(-50%)"}}>{I18n.getTrans("i.minute")}</p>
          {/*Second*/}
          <div className='lockContainer' style={{zIndex: 2, position: "absolute", backgroundImage: `url(${appSettings.backgroundSecond})`, width: containerWidth*0.15, height: containerHeight*0.15, top: "32.1%", left: "64.9%"}}/>
          <div style={{zIndex:3,position: "absolute",display:"flex", flexDirection:"row", justifyContent:"center", alignItems:"center", width: containerWidth*0.1, height: containerHeight*0.1, top: containerHeight*0.3275, left: containerWidth*0.675, gap: containerWidth*0.006 + "px"}}>            
            <Digit name={"second0"} checking={processingSolution}  style={secondStyle} digit={second0} setDigit={setSecond0} max={5} digitOnClick={digitOnClick} isReset={isReset} />
            <Digit name={"second1"} checking={processingSolution}  style={secondStyle} digit={second1} setDigit={setSecond1} max={9} digitOnClick={digitOnClick} isReset={isReset} />
          </div>
          <p className="tittle-text" style={{zIndex:3,position:"absolute", left:"72.4%", top:"39.5%", color:"black", fontSize: containerHeight*0.03 + "px", textAlign:"center", transform: "translateX(-50%)"}}>{I18n.getTrans("i.second")}</p>

          <div className='switchContainer' onClick={changeBackground} style={{zIndex:5,position: "absolute", backgroundImage: `url(${appSettings.switchImage})`, width: lightWidth, height: lightHeight, top: "63%", left:"43.9%", cursor: "pointer"}}/>
          
          {/* AC BC */}
          <div style={{zIndex: 2, position: "absolute", width: containerWidth*0.09, height: containerHeight*0.045, top:"33.9%", left: "22.9%", backgroundColor: "#f0d0a2"}}>
            <div className="text-carousel">
              <div className={`text-container ${textPosition === 0 ? 'show-first' : 'show-second'}`}>
                <div className="text-item" style={{fontSize: containerHeight*0.05 + "px", paddingTop: "60%"}}>a.c</div>
                <div className="text-item" style={{fontSize: containerHeight*0.05 + "px", paddingTop: "62%"}}>b.c</div>
              </div>
            </div>
          </div>          
          {/* Botones AC BC */}
          <div className='lockContainer' style={{zIndex: 2, position: "absolute", backgroundImage: `url(${appSettings.acbcBackground})`, width: containerWidth*0.15, height: containerHeight*0.15, top: "31.5%", left: "20.4%"}}/>
          <div className={`buttonContainer ${textPosition===0 && 'disabled'}`} onClick={textPosition===0 ? null : moveTextUp} style={{display: "flex", alignItems:"center", justifyContent:"center", zIndex: 2, position: "absolute", backgroundImage: `url(${appSettings.buttonBackground})`, width: containerWidth*0.05, height: containerHeight*0.05, top: "39.7%", left: "22.8%"}}>
            <svg xmlns="http://www.w3.org/2000/svg" height="5vmin" viewBox="0 -960 960 960" width="5vmin" fill="#FFFFFF"><path d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z"/></svg>
          </div>
          <div className={`buttonContainer ${textPosition===100 && 'disabled'}`} onClick={textPosition===100 ? null : moveTextDown} style={{display: "flex", alignItems:"center", justifyContent:"center", zIndex: 2, position: "absolute", backgroundImage: `url(${appSettings.buttonBackground})`, width: containerWidth*0.05, height: containerHeight*0.05, top: "39.7%", left: "27.6%"}}>
            <svg xmlns="http://www.w3.org/2000/svg" height="5vmin" viewBox="0 -960 960 960" width="5vmin" fill="#FFFFFF"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/></svg>
          </div>
          
          <div style={{zIndex: 3, position: "absolute", left: containerWidth*0.208, top: containerHeight*0.545, width: containerWidth*0.17, height: containerHeight*0.14}}>
            <Ray boxHeight={containerHeight*0.45} boxWidth={containerWidth*0.255} checking={processingSolution} waveType={"sine"}
              frequency={frequencyMapped} amplitude={amplitudeMapped} wavelength={wavelengthMapped}/>
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

          {/*wormholeActive &&<div style={{zIndex:6,position:"absolute", left:containerWidth*0.05, top:containerHeight*-0.05}}>
            <Electricity width={containerWidth*0.8} height={containerHeight*0.6}
              startPoint={{ x: (containerWidth*0.1), y: containerHeight*0.1 }}
              endPoint={{ x: (containerWidth*0.9), y: containerHeight*0.1 }}
              animationSpeed={120} branches={3} maxBranches={9} branchLength={0.2}
              multipleRays={true} rayCount={5} color="#fffed9ff" strokeWidth={1.3}
              segments={20} glowEffect={true} animated={true} flickerIntensity={0.9} intensity={1} />         
          </div>*/}
  
      </div>
        
        

      <audio id="audio_flip" src={appSettings.soundFlip} autostart="false" preload="auto" />
      <audio id="audio_failure" src={appSettings.soundNok} autostart="false" preload="auto" />
      <audio id="audio_success" src={appSettings.soundOk} autostart="false" preload="auto" />
      <audio id="audio_switch" src={appSettings.soundSwitch} autostart="false" preload="auto" />

 
    </div>);
};

export default MainScreen;