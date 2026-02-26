export const DEFAULT_APP_SETTINGS = {
  skin: "STANDARD",
  actionAfterSolve: "NONE",
  message: undefined,
  background: "images/standard/background_before.png",
  backgroundBefore: "images/standard/background_before.png",
  backgroundAfter: "images/standard/background_after.png",
  backgroundTimeMachine: "images/standard/background_time_machine_new.png",
  backgroundTimeMachineFull: "images/standard/background_time_machine_full.png",
  switchImage: "images/standard/switch.png",
  buttonBackground: "images/standard/button_background.png",
  acbcBackground: "images/standard/acbc_background.png",
  backgroundHour: "images/standard/background_hour.png",
  backgroundMinute: "images/standard/background_minute.png",
  backgroundSecond: "images/standard/background_second.png",

  fullTimeMachine: false, // Para controlar si se muestra el fondo completo del Time Machine

  backgroundButton: "images/standard/button.png",
  backgroundMessage: "images/background_message.png",
  imageLightOff: "images/standard/light_off.png",
  imageLightNok: "images/standard/light_nok.png",
  imageLightOk: "images/standard/light_ok.png",

  soundFlip: "sounds/flip_sound.wav",
  soundNok: "sounds/solution_nok.mp3",
  soundOk: "sounds/solution_ok.mp3",
  soundSwitch: "sounds/switch_sound.mp3",


  rayWidth: 0.59, // Relative width of the ray compared to the box width
  rayHeight: 0.6, // Relative height of the ray compared to the box height

  buttonWidth: 0.15, // Relative width of the button compared to the box width
  buttonHeight: 0.15, // Relative height of the button compared to the box height
  buttonMarginTop: 0.85, // Margin from the top of the box to the button in percentage of box height
  buttonMarginLeft: 0.8, // Margin from the left of the box to the button in percentage of box width


  screenContainerWidth: 0.543, // Width of the screen container
  screenContainerHeight: 0.543, // Height of the screen container
  screenContainerMarginTop: -0.256, // Margin from the top of the box to the screen container in percentage of box height

  minFrequency: 0.4, // Minimum frequency for the ray
  maxFrequency: 0.5, // Maximum frequency for the ray
  minAmplitude: 20, // Minimum amplitude for the ray
  maxAmplitude: 80, // Maximum amplitude for the ray
  minWavelength: 50, // Minimum wavelength for the ray
  maxWavelength: 80, // Maximum wavelength for the ray
};

export const ESCAPP_CLIENT_SETTINGS = {
  imagesPath: "./images/",
};

export const MAIN_SCREEN = "MAIN_SCREEN";
export const MESSAGE_SCREEN = "MESSAGE_SCREEN";