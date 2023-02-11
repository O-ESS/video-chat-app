import './App.css';
import {selectIsConnectedToRoom, useHMSStore, useHMSActions} from '@100mslive/react-sdk'
import JoinRoom from './components/JoinRoom';
import Conference from './components/Conference';
import { useEffect } from 'react';


function App() {
  const isConnected = useHMSStore(selectIsConnectedToRoom)
  const hmsActions = useHMSActions()

  useEffect(() =>{
    window.onunload = () => {
      if(isConnected) hmsActions.leave()
    }
  }, [hmsActions, isConnected])
  
  return (
    <div className="App">
      {
        isConnected ? <Conference /> : <JoinRoom />
      }
    </div>
  );
}

export default App;
