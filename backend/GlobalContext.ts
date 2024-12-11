class GlobalContext {
  commandLine: {
    data: string;
    record: string;
    leaguePath: string;
    experimentalConnector: boolean;
    debug: boolean;
  } = {
      data: '',
      record: '',
      leaguePath: 'D:/Games/Riot Games/League of Legends',
      experimentalConnector: false,
      debug: false,
    };
}

export default new GlobalContext();
