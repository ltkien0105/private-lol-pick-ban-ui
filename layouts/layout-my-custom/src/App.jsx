import { useState, useEffect } from 'react';

import convertState from './utils/convertState';
import Overlay from './components/Overlay';

function App() {
  // Define global state
  const [globalState, setGlobalState] = useState({});
  // Define config state
  const [config, setConfig] = useState({
    frontend: {
      scoreEnabled: false,
      spellsEnabled: true,
      coachesEnabled: false,
      blueTeam: {
        name: "Team Blue",
        score: 0,
        coach: "",
        color: "rgb(0,151,196)"
      },
      redTeam: {
        name: "Team Red",
        score: 0,
        coach: "",
        color: "rgb(222,40,70)"
      },
      patch: ""
    }
  });
  //Define error state
  const [error, setError] = useState('');

  useEffect(() => {
    // PB Object from frontend-lib.js
    /* Format PB Object: 
    PB = {
      getQueryVariable: (queryVariable) => {}, // Get query URL
      toAbsoluteUrl: (convertUrl, baseUrl) => {},
      start: (url) => {} // Connect WebSocket to get data from backend
    }
    */

    /* newState, heartbeat are the events emitted from backend */
    Window.PB.on('newState', state => {
      // Set new global and config state
      setGlobalState(state.state);
      setConfig(state.state.config);
    });

    Window.PB.on('heartbeat', hb => {
      /**
       * Reference /Projects/Web/private-lol-ban-pick-ui/backend/config.json to get hb config format
       */
      setConfig(hb.config);
    });

    try {
      Window.PB.start(); // Connect WebSocket to get data from backend
    } catch {
      setError('error: failed to read backend url query param. make sure you set ?backend=ws://[ip]:[port] as query parameter.')
    }
  }, []);

  if (Window.PB.getQueryVariable('status') === '1') {
    const status = {
      backend: Window.PB.getQueryVariable('backend'),
      error: error,
      config: config,
      state: { ...globalState, config: undefined, blueTeam: JSON.stringify(globalState.blueTeam), redTeam: JSON.stringify(globalState.redTeam) }
    }
    // return <Error message={`status: ${JSON.stringify(status, undefined, 4)}`} isStatus />
    return <h2>{`status: ${JSON.stringify(status, undefined, 4)}`}</h2>
  }

  if (error) {
    return <h2>{error}</h2>
  }

  if (config && Object.keys(globalState).length > 0) {
    console.log(globalState);
    return (
      <div className="App">
        {/* <Overlay state={globalState} config={config}/> */}
        <Overlay state={convertState(globalState, Window.PB.backend)} config={config}/>
      </div>
    );
  } else {
    return (
      // <h2 message='Unable to load configuration' />
      <h2>Unable to load configuration</h2>
    )
  }
}

export default App;
