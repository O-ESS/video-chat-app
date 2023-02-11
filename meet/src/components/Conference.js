import React from 'react';
import Video from './Video';
import Message from './Message';
import {
    useHMSStore, 
    selectPeers
    
} from "@100mslive/react-sdk"
import { Typography } from 'antd';
const { Text} = Typography;

export default function Conference() {
    const peers = useHMSStore(selectPeers)
  
  return (
    <div style={{display:"flex", flexDirection:"row"}}> 
    <div style={{display:"flex", marginTop:"5%", flexWrap:"wrap"}}>
        {peers.map((peer,index)=>(
              <div style={{width:"50%", height:"50%"}}>
                {index === 0 ? <Text  key={index+"1"} style={{color:"#00b300"}} >  {peer.name}  </Text>  :
                 <Text  key={index+"1"} style={{color:"blue"}} >  {peer.name}  </Text> 
                 }
                <Video key={index}  peer={peer} index={index} /> {console.log(peer.id)}
                </div>
            ))}
    </div>
     <div style={{marginTop:"5%"}}>
        <Message />
     </div>
     </div>
  )
}