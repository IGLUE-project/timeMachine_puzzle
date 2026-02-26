import { useState, useEffect, useContext } from 'react';
import { GlobalContext } from "./GlobalContext";
import './../assets/scss/main.scss';
import Digit from './Digit.jsx';
import Electricity from './Electricity.jsx';
import Ray from './Ray.jsx';

const MainScreen = (props) => {
  const { escapp, appSettings, Utils, I18n } = useContext(GlobalContext);
  const [processingSolution, setProcessingSolution] = useState(false);
  const [isReset, setIsReset] = useState(false);

  const [showTimeMachine, setShowTimeMachine] = useState(true);
  const [backgroundImg, setBackgroundImg] = useState(appSettings.background);
  const [actualPeriod, setActualPeriod] = useState(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const [lightWidth, setLightWidth] = useState(0);
  const [lightHeight, setLightHeight] = useState(0);

  const mapRange = (value, min1, max1, min2, max2) => {
    return min2 + ((value - min1) * (max2 - min2)) / (max1 - min1);
  };
  const [frequency, setFrequency] = useState(0);
  const [wavelength, setWavelength] = useState(0);
  const [amplitude, setAmplitude] = useState(0);
  const frequencyMapped = mapRange(frequency / 3, 0, 119, appSettings.minFrequency, appSettings.maxFrequency); // Frecuencia entre 0.6 y 4.2
  const wavelengthMapped = mapRange(wavelength / 3, 0, 119, appSettings.minWavelength, appSettings.maxWavelength); // Wavelength entre 10 y 80
  const amplitudeMapped = mapRange(amplitude / 3, 0, 119, appSettings.minAmplitude, appSettings.maxAmplitude); // Amplitud entre 25 y 80

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

  function handleResize() {
    if ((props.appHeight === 0) || (props.appWidth === 0)) {
      return;
    }

    let aspectRatio = 4 / 3;

    let _lockWidth = Math.min(props.appHeight * 1.15, props.appWidth);
    let _lockHeight = _lockWidth / aspectRatio;

    let _containerWidth = _lockWidth * 0.9;
    let _containerHeight = _lockHeight * 0.9;

    let _lightWidth = _lockWidth * 0.11;
    let _lightHeight = _lockHeight * 0.11;

    setContainerWidth(_containerWidth);
    setContainerHeight(_containerHeight);

    setLightWidth(_lightWidth);
    setLightHeight(_lightHeight);
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
      checkPeriods();
    }, 4000);

    // Después de 8 segundos, termina el efecto
    setTimeout(() => {
      setWormholeActive(false);
    }, 8000);
  };

  const dateToIndex = (era, year, month, day, hour, minute, second) => {
    let y = parseInt(year, 10) || 0;
    let m = parseInt(month, 10) || 0;
    let d = parseInt(day, 10) || 0;
    let h = parseInt(hour, 10) || 0;
    let min = parseInt(minute, 10) || 0;
    let s = parseInt(second, 10) || 0;
    let yearPart = (era === "AC" && y !== 0 ? -y : y) * 10000000000;

    return yearPart + m * 100000000 + d * 1000000 + h * 10000 + min * 100 + s;
  };

  const checkPeriods = () => {
    if (!appSettings.periods || appSettings.periods.length === 0) return;

    let era = textPosition === 0 ? "AC" : "DC";
    let year = [year0, year1, year2, year3, year4].join('');
    let month = [month0, month1].join('');
    let day = [day0, day1].join('');
    let hour = [hour0, hour1].join('');
    let minute = [minute0, minute1].join('');
    let second = [second0, second1].join('');

    let currentTarget = dateToIndex(era, year, month, day, hour, minute, second);

    let foundPeriod = null;
    for (let period of appSettings.periods) {
      if (!period.from) continue; // Saltamos periodos sin `from` configurado

      let fEra = period.from.era || "DC";
      let fYear = parseInt(period.from.year, 10) || 0;
      let fMonth = parseInt(period.from.month, 10) || 0;
      let fDay = parseInt(period.from.day, 10) || 0;
      let fHour = parseInt(period.from.hour, 10) || 0;
      let fMinute = parseInt(period.from.minute, 10) || 0;
      let fSecond = parseInt(period.from.second, 10) || 0;

      let fromTarget = dateToIndex(fEra, fYear, fMonth, fDay, fHour, fMinute, fSecond);
      let toTarget;

      if (period.to) {
        toTarget = dateToIndex(
          period.to.era || fEra,
          period.to.year || 0,
          period.to.month || 0,
          period.to.day || 0,
          period.to.hour || 0,
          period.to.minute || 0,
          period.to.second || 0
        );
      } else {
        // Generar límite superior dinámicamente según la especificidad
        let tMonth = fMonth;
        let tDay = fDay;
        let tHour = fHour;
        let tMinute = fMinute;
        let tSecond = fSecond;

        if (fMonth === 0) {
          tMonth = 99; tDay = 99; tHour = 99; tMinute = 99; tSecond = 99;
        } else if (fDay === 0) {
          tDay = 99; tHour = 99; tMinute = 99; tSecond = 99;
        } else if (fHour === 0) {
          tHour = 99; tMinute = 99; tSecond = 99;
        } else if (fMinute === 0) {
          tMinute = 99; tSecond = 99;
        } else if (fSecond === 0) {
          tSecond = 99;
        }

        toTarget = dateToIndex(fEra, fYear, tMonth, tDay, tHour, tMinute, tSecond);
      }

      // Comprobamos si la fecha configurada entra dentro del periodo
      if (currentTarget >= fromTarget && currentTarget <= toTarget) {
        foundPeriod = period;
        break;
      }
    }

    if (foundPeriod) {
      if (foundPeriod.background) {
        setBackgroundImg(foundPeriod.background);
        setActualPeriod(foundPeriod);
        setShowTimeMachine(foundPeriod.showTimeMachine);
        checkSolution(foundPeriod.name);
      }
    } else {
      // Si no hay periodo configurado o válido, volvemos a la imagen de fondo normal
      setBackgroundImg(appSettings.background);
      setActualPeriod(null);
      setShowTimeMachine(true);
    }
  };
  const checkSolution = (periodName) => {
    if (processingSolution) {
      return;
    }
    let audio = document.getElementById("audio_switch");
    audio.currentTime = 0;
    audio.play();

    setProcessingSolution(true);
    escapp.checkNextPuzzle(periodName, {}, (success, erState) => {
      Utils.log("Check solution Escapp response", success, erState);
      if (success) {
        try {
          setTimeout(() => {
            props.onKeypadSolved(periodName);
          }, 700);
        } catch (e) {
          Utils.log("Error in checkNextPuzzle", e);
        }
      } else {
        reset();
      }
    });
  }

  const reset = () => {
    setIsReset(true);
    setTimeout(() => {
      setIsReset(false);
      setProcessingSolution(false);
    }, 3000);
  }

  const yearStyle = {
    top: ("0%"),
    color: ("#d0c8c8"),
    borderColor: (""),
    boxHeight: containerHeight * 0.07 + "px",
    boxWidth: containerWidth * 0.035 + "px",
    fontSize: containerHeight * 0.08 + "px"
  }
  const monthStyle = {
    top: ("0%"),
    color: ("#487a53"),
    borderColor: ("#37553e"),
    boxHeight: containerHeight * 0.07 + "px",
    boxWidth: containerWidth * 0.035 + "px",
    fontSize: containerHeight * 0.08 + "px"
  }
  const dayStyle = {
    top: ("-175%"),
    color: ("#d4a274"),
    borderColor: ("#c7762a"),
    boxHeight: containerHeight * 0.07 + "px",
    boxWidth: containerWidth * 0.035 + "px",
    fontSize: containerHeight * 0.08 + "px"
  }
  const hourStyle = {
    top: ("-90%"),
    color: ("#ae6a68"),
    borderColor: ("#893330"),
    boxHeight: containerHeight * 0.07 + "px",
    boxWidth: containerWidth * 0.035 + "px",
    fontSize: containerHeight * 0.08 + "px"
  }
  const minuteStyle = {
    top: ("-90%"),
    color: ("#6eb0a9"),
    borderColor: ("#3d7975"),
    boxHeight: containerHeight * 0.07 + "px",
    boxWidth: containerWidth * 0.035 + "px",
    fontSize: containerHeight * 0.08 + "px"
  }
  const secondStyle = {
    top: ("-90%"),
    color: ("#bb50d3"),
    borderColor: ("#5d2b68"),
    boxHeight: containerHeight * 0.07 + "px",
    boxWidth: containerWidth * 0.035 + "px",
    fontSize: containerHeight * 0.08 + "px"
  }

  const digitOnClick = () => {
    let audio = document.getElementById("audio_flip");
    audio.currentTime = 0; // Reinicia el audio
    audio.play();
  };

  return (
    <div id="screen_main" className={"screen_content"} style={{ backgroundImage: 'url("' + backgroundImg + '")' }}>
      <div className={`wormhole ${wormholeActive ? 'active' : ''}`} />
      <div className={`timeMachineContainer ${wormholeActive ? 'active' : ''} ${!showTimeMachine ? 'hidden' : ''}`}
        style={{
          zIndex: 2,
          backgroundImage: appSettings.fullTimeMachine ? 'url(' + appSettings.backgroundTimeMachineFull + ')' : 'url(' + appSettings.backgroundTimeMachine + ')',
          width: containerWidth,
          height: containerHeight,
          position: "relative",
          transition: "transform 1.5s cubic-bezier(0.68, -0.55, 0.27, 1.55), opacity 1.5s ease",
          transformOrigin: "50% 50%"
        }}>
        {/*Year*/}
        <div style={{ zIndex: 3, position: "absolute", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", width: containerWidth * 0.2, height: containerHeight * 0.1, top: containerHeight * 0.2, left: containerWidth * 0.24, gap: containerWidth * 0.006 + "px" }}>
          <Digit name={"year0"} checking={processingSolution} style={yearStyle} digit={year0} setDigit={setYear0} max={9} digitOnClick={digitOnClick} isReset={isReset} />
          <Digit name={"year1"} checking={processingSolution} style={yearStyle} digit={year1} setDigit={setYear1} max={9} digitOnClick={digitOnClick} isReset={isReset} />
          <Digit name={"year2"} checking={processingSolution} style={yearStyle} digit={year2} setDigit={setYear2} max={9} digitOnClick={digitOnClick} isReset={isReset} />
          <Digit name={"year3"} checking={processingSolution} style={yearStyle} digit={year3} setDigit={setYear3} max={9} digitOnClick={digitOnClick} isReset={isReset} />
          <Digit name={"year4"} checking={processingSolution} style={yearStyle} digit={year4} setDigit={setYear4} max={9} digitOnClick={digitOnClick} isReset={isReset} />
        </div>
        <p className="tittle-text" style={{ position: "absolute", left: "33.2%", top: "13.2%", color: "black", fontSize: containerHeight * 0.03 + "px", textAlign: "center", transform: "translateX(-50%)" }}>{I18n.getTrans("i.year")}</p>
        {/*Month*/}
        <div style={{ zIndex: 3, position: "absolute", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", width: containerWidth * 0.1, height: containerHeight * 0.1, top: containerHeight * 0.2, left: containerWidth * 0.525, gap: containerWidth * 0.006 + "px" }}>
          <Digit name={"month0"} checking={processingSolution} style={monthStyle} digit={month0} setDigit={setMonth0} max={1} digitOnClick={digitOnClick} isReset={isReset} />
          <Digit name={"month1"} digit0={month0} checking={processingSolution} style={monthStyle} digit={month1} setDigit={setMonth1} max={9} digitOnClick={digitOnClick} isReset={isReset} />
        </div>
        <p className="tittle-text" style={{ position: "absolute", left: "57.5%", top: "13.2%", color: "black", fontSize: containerHeight * 0.03 + "px", textAlign: "center", transform: "translateX(-50%)" }}>{I18n.getTrans("i.month")}</p>
        {/*Day*/}
        <div style={{ zIndex: 3, position: "absolute", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", width: containerWidth * 0.1, height: containerHeight * 0.1, top: containerHeight * 0.2, left: containerWidth * 0.678, gap: containerWidth * 0.006 + "px" }}>
          <Digit name={"day0"} checking={processingSolution} style={dayStyle} digit={day0} setDigit={setDay0} max={3} digitOnClick={digitOnClick} isReset={isReset} />
          <Digit name={"day1"} digit0={day0} checking={processingSolution} style={dayStyle} digit={day1} setDigit={setDay1} max={9} digitOnClick={digitOnClick} isReset={isReset} />
        </div>
        <p className="tittle-text" style={{ position: "absolute", left: "72.5%", top: "13.2%", color: "black", fontSize: containerHeight * 0.03 + "px", textAlign: "center", transform: "translateX(-50%)" }}>{I18n.getTrans("i.day")}</p>
        {/*Hour*/}
        <div className='lockContainer' style={{ zIndex: 2, position: "absolute", backgroundImage: `url(${appSettings.backgroundHour})`, width: containerWidth * 0.15, height: containerHeight * 0.15, top: "31.9%", left: "34.9%" }} />
        <div style={{ zIndex: 3, position: "absolute", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", width: containerWidth * 0.1, height: containerHeight * 0.1, top: containerHeight * 0.3275, left: containerWidth * 0.375, gap: containerWidth * 0.006 + "px" }}>
          <Digit name={"hour0"} checking={processingSolution} style={hourStyle} digit={hour0} setDigit={setHour0} max={5} digitOnClick={digitOnClick} isReset={isReset} />
          <Digit name={"hour1"} checking={processingSolution} style={hourStyle} digit={hour1} setDigit={setHour1} max={9} digitOnClick={digitOnClick} isReset={isReset} />
        </div>
        <p className="tittle-text" style={{ zIndex: 3, position: "absolute", left: "42.4%", top: "39.7%", color: "black", fontSize: containerHeight * 0.03 + "px", textAlign: "center", transform: "translateX(-50%)" }}>{I18n.getTrans("i.hour")}</p>
        {/*Minute*/}
        <div className='lockContainer' style={{ zIndex: 2, position: "absolute", backgroundImage: `url(${appSettings.backgroundMinute})`, width: containerWidth * 0.15, height: containerHeight * 0.15, top: "32%", left: "50%" }} />
        <div style={{ zIndex: 3, position: "absolute", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", width: containerWidth * 0.1, height: containerHeight * 0.1, top: containerHeight * 0.3275, left: containerWidth * 0.525, gap: containerWidth * 0.006 + "px" }}>
          <Digit name={"minute0"} checking={processingSolution} style={minuteStyle} digit={minute0} setDigit={setMinute0} max={5} digitOnClick={digitOnClick} isReset={isReset} />
          <Digit name={"minute1"} checking={processingSolution} style={minuteStyle} digit={minute1} setDigit={setMinute1} max={9} digitOnClick={digitOnClick} isReset={isReset} />
        </div>
        <p className="tittle-text" style={{ zIndex: 3, position: "absolute", left: "57.4%", top: "39.7%", color: "black", fontSize: containerHeight * 0.03 + "px", textAlign: "center", transform: "translateX(-50%)" }}>{I18n.getTrans("i.minute")}</p>
        {/*Second*/}
        <div className='lockContainer' style={{ zIndex: 2, position: "absolute", backgroundImage: `url(${appSettings.backgroundSecond})`, width: containerWidth * 0.15, height: containerHeight * 0.15, top: "32.1%", left: "64.9%" }} />
        <div style={{ zIndex: 3, position: "absolute", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", width: containerWidth * 0.1, height: containerHeight * 0.1, top: containerHeight * 0.3275, left: containerWidth * 0.675, gap: containerWidth * 0.006 + "px" }}>
          <Digit name={"second0"} checking={processingSolution} style={secondStyle} digit={second0} setDigit={setSecond0} max={5} digitOnClick={digitOnClick} isReset={isReset} />
          <Digit name={"second1"} checking={processingSolution} style={secondStyle} digit={second1} setDigit={setSecond1} max={9} digitOnClick={digitOnClick} isReset={isReset} />
        </div>
        <p className="tittle-text" style={{ zIndex: 3, position: "absolute", left: "72.4%", top: "39.5%", color: "black", fontSize: containerHeight * 0.03 + "px", textAlign: "center", transform: "translateX(-50%)" }}>{I18n.getTrans("i.second")}</p>

        <div className='switchContainer' onClick={changeBackground} style={{ zIndex: 5, position: "absolute", backgroundImage: `url(${appSettings.switchImage})`, width: lightWidth, height: lightHeight, top: "63%", left: "43.9%", cursor: "pointer" }} />

        {/* AC BC */}
        <div style={{ zIndex: 2, position: "absolute", width: containerWidth * 0.09, height: containerHeight * 0.045, top: "33.9%", left: "22.9%", backgroundColor: "#f0d0a2" }}>
          <div className="text-carousel">
            <div className={`text-container ${textPosition === 0 ? 'show-first' : 'show-second'}`}>
              <div className="text-item" style={{ fontSize: containerHeight * 0.05 + "px", paddingTop: "60%" }}>a.c</div>
              <div className="text-item" style={{ fontSize: containerHeight * 0.05 + "px", paddingTop: "62%" }}>b.c</div>
            </div>
          </div>
        </div>
        {/* Botones AC BC */}
        <div className='lockContainer' style={{ zIndex: 2, position: "absolute", backgroundImage: `url(${appSettings.acbcBackground})`, width: containerWidth * 0.15, height: containerHeight * 0.15, top: "31.5%", left: "20.4%" }} />
        <div className={`buttonContainer ${textPosition === 0 && 'disabled'}`} onClick={textPosition === 0 ? null : moveTextUp} style={{ display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2, position: "absolute", backgroundImage: `url(${appSettings.buttonBackground})`, width: containerWidth * 0.05, height: containerHeight * 0.05, top: "39.7%", left: "22.8%" }}>
          <svg xmlns="http://www.w3.org/2000/svg" height="5vmin" viewBox="0 -960 960 960" width="5vmin" fill="#FFFFFF"><path d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z" /></svg>
        </div>
        <div className={`buttonContainer ${textPosition === 100 && 'disabled'}`} onClick={textPosition === 100 ? null : moveTextDown} style={{ display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2, position: "absolute", backgroundImage: `url(${appSettings.buttonBackground})`, width: containerWidth * 0.05, height: containerHeight * 0.05, top: "39.7%", left: "27.6%" }}>
          <svg xmlns="http://www.w3.org/2000/svg" height="5vmin" viewBox="0 -960 960 960" width="5vmin" fill="#FFFFFF"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" /></svg>
        </div>

        <div style={{ zIndex: 3, position: "absolute", left: containerWidth * 0.208, top: containerHeight * 0.545, width: containerWidth * 0.17, height: containerHeight * 0.14 }}>
          <Ray boxHeight={containerHeight * 0.45} boxWidth={containerWidth * 0.255} checking={processingSolution} waveType={"sine"}
            frequency={frequencyMapped} amplitude={amplitudeMapped} wavelength={wavelengthMapped} />
        </div>


        <div style={{ zIndex: 1, position: "absolute", left: containerWidth * 0.35, top: containerHeight * 0.51 }}>
          <Electricity width={containerWidth * 0.15} height={containerHeight * 0.2}
            startPoint={{ x: (containerWidth * 0.15) / 2, y: containerHeight * 0.01 }}
            endPoint={{ x: (containerWidth * 0.15) / 2, y: containerHeight * 0.1 }}
            animationSpeed={100} branches={2} maxBranches={8} branchLength={0.1}
            multipleRays={true} rayCount={2} color="#ff0080" strokeWidth={1.2} segments={15}
            glowEffect={true} animated={true} flickerIntensity={0.8} intensity={0.9} />
        </div>
        <div style={{ zIndex: 1, position: "absolute", left: containerWidth * 0.425, top: containerHeight * 0.51 }}>
          <Electricity width={containerWidth * 0.15} height={containerHeight * 0.2}
            startPoint={{ x: (containerWidth * 0.15) / 2, y: containerHeight * 0.01 }}
            endPoint={{ x: (containerWidth * 0.15) / 2, y: containerHeight * 0.1 }}
            animationSpeed={100} branches={2} maxBranches={8} branchLength={0.1}
            multipleRays={true} rayCount={2} color="#00e600ff" strokeWidth={1.2}
            segments={15} glowEffect={true} animated={true} flickerIntensity={0.8} intensity={0.9} />
        </div>
        <div style={{ zIndex: 1, position: "absolute", left: containerWidth * 0.50, top: containerHeight * 0.51 }}>
          <Electricity width={containerWidth * 0.15} height={containerHeight * 0.2}
            startPoint={{ x: (containerWidth * 0.15) / 2, y: containerHeight * 0.01 }}
            endPoint={{ x: (containerWidth * 0.15) / 2, y: containerHeight * 0.1 }}
            animationSpeed={100} branches={2} maxBranches={8} branchLength={0.1}
            multipleRays={true} rayCount={2} color="#ffdc9cff" strokeWidth={1.2}
            segments={15} glowEffect={true} animated={true} flickerIntensity={0.8} intensity={0.9} />
        </div>
        <div style={{ zIndex: 1, position: "absolute", left: containerWidth * 0.585, top: containerHeight * 0.51 }}>
          <Electricity width={containerWidth * 0.15} height={containerHeight * 0.2}
            startPoint={{ x: (containerWidth * 0.15) / 2, y: containerHeight * 0.01 }}
            endPoint={{ x: (containerWidth * 0.15) / 2, y: containerHeight * 0.1 }}
            animationSpeed={100} branches={2} maxBranches={8} branchLength={0.1}
            multipleRays={true} rayCount={2} color="#078fffff" strokeWidth={1.2}
            segments={15} glowEffect={true} animated={true} flickerIntensity={0.8} intensity={0.9} />
        </div>
      </div>

      <audio id="audio_flip" src={appSettings.soundFlip} autostart="false" preload="auto" />
      <audio id="audio_failure" src={appSettings.soundNok} autostart="false" preload="auto" />
      <audio id="audio_success" src={appSettings.soundOk} autostart="false" preload="auto" />
      <audio id="audio_switch" src={appSettings.soundSwitch} autostart="false" preload="auto" />
    </div>);
};

export default MainScreen;