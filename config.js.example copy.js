//Copy this file to config.js and specify your own settings

export let ESCAPP_APP_SETTINGS = {
  //background: "NONE", //background can be "NONE" or a URL.
  actionAfterSolve: "SHOW_MESSAGE", //actionAfterSolve can be "NONE" or "SHOW_MESSAGE".
  //message: "Custom message",
  periods: [
    {
      name: "Segunda Guerra Mundial",//will be the solution
      from: { era: "BC", year: 1939, month: 9, day: 1, hour: 0, minute: 0, second: 0 },// start date
      to: { era: "BC", year: 1945, month: 9, day: 2, hour: 23, minute: 59, second: 59 },// end date
      background: "/images/ww2_bg.png", // image showed
      showTimeMachine: true //can hide the machine to see the backgroun but you can't come back
    },
    {
      name: "Antiguo Imperio Romano",
      from: { era: "AC", year: 27, month: 1, day: 1, hour: 0, minute: 0, second: 0 },
      to: { era: "BC", year: 476, month: 12, day: 31, hour: 23, minute: 59, second: 59 },
      background: "/images/roma_bg.png",
      showTimeMachine: true
    },
    {
      name: "Descubrimiento de America",
      from: { era: "BC", year: 1492, month: 10, day: 12, hour: 0, minute: 0, second: 0 },// It can be just a date; the period can be assumed from the date specification. For example, if only the year is given, it can be any date within that year.
      background: "/images/america_bg.png",
      showTimeMachine: false
    }
  ],
  //Settings that will be automatically specified by the Escapp server
  locale: "es",

  escappClientSettings: {
    endpoint: "https://escapp.es/api/escapeRooms/id",
    linkedPuzzleIds: [1],
    rtc: false,
  },
};