import React, { useState, useEffect, useContext } from 'react';
import { GlobalContext } from "./GlobalContext";
import './../assets/scss/message.scss';

const MessageScreen = (props) => {
  const { escapp, appSettings, Utils, I18n } = useContext(GlobalContext);
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  useEffect(() => {
    handleResize();
  }, [props.appWidth, props.appHeight]);

  function handleResize() {
    if ((props.appHeight === 0) || (props.appWidth === 0)) {
      return;
    }

    let aspectRatio = 4 / 3;
    let _keypadWidth = Math.min(props.appHeight * aspectRatio, props.appWidth);
    let _keypadHeight = _keypadWidth / aspectRatio;

    let _containerWidth = _keypadWidth * 0.49;
    let _containerHeight = _keypadHeight * 0.5;

    setContainerWidth(_containerWidth);
    setContainerHeight(_containerHeight);
  }

  return (
    <div id="screen_message" className="screen_content" style={{ backgroundImage: "url(" + props.actualPeriod?.background + ")" }}>

      <div id="message_text" style={{ width: containerWidth, height: containerHeight, }}>
        <pre>{appSettings.message}</pre>
        <div className="message_button" onClick={() => props.submitPuzzleSolution()}>{I18n.getTrans("i.continue")}</div>
      </div>
    </div>
  );
};

export default MessageScreen;