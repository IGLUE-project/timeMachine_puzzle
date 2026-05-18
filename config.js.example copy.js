//Copy this file to config.js and specify your own settings

export let ESCAPP_APP_SETTINGS = {
  //background: "NONE", //background can be "NONE" or a URL.
  actionAfterSolve: "NONE", //actionAfterSolve can be "NONE" or "SHOW_MESSAGE".
  //message: "Custom message",
  //Settings that will be automatically specified by the Escapp server
  solutionLength: 3,
  locale: "es",

  escappClientSettings: {
    endpoint: "https://escapp.es/api/escapeRooms/id",
    linkedPuzzleIds: [1],
    rtc: false,
  },
};