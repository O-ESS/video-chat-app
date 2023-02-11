import React, {useState} from 'react'
import {useHMSStore, selectBroadcastMessages, useHMSActions} from '@100mslive/react-sdk'
import { Typography, Button, Input } from 'antd';
const { Text, Title } = Typography;

export default function Message() {

  const [chatContent, setChatContent] = useState("")
  const hmsActions = useHMSActions()

    const handleChat = (e) =>{
        setChatContent(e.target.value)
    }
    const handleChatSubmit = () =>{
        hmsActions.sendBroadcastMessage(chatContent)

        setChatContent("")
    }

    const broadcastMessages = useHMSStore(selectBroadcastMessages)

    return (
      <div className="message-container">
        <Title level={3} style={{textAlign: 'left', color: 'black', marginTop: '-1rem'}}>Live chat</Title >
        <div className="chat-area" style={{outline: "1px solid black", boxShadow: "0 2px 0 0 rgba(0,0,0,.2)", borderRadius: "15px"}}>

        {broadcastMessages.map(msg =>{
          const {message, senderName} = msg

               return( msg.read ?
                <div key={msg.id}>
                    <Text style={{color: '#00b300'}}> <span style={{fontStyle: 'italic'}}>{senderName }:</span> {message}</Text>
                </div>
                :
                <div key={msg.id}>
                <Text style={{color: 'blue'}}> <span style={{fontStyle: 'italic'}}>{senderName }:</span> {message}</Text>
                </div>)
              
              
          })}

      
      <div className="chat" >
      <Input.Group compact>
            <Input
              placeholder='write chat here' 
              value={chatContent}
              onChange={handleChat}
              style={{ width: "70%", border:'none' }}      
            />
            <Button type='primary'  onClick={handleChatSubmit}> send</Button>
        </Input.Group>
      </div>
    </div>
    </div>
  )
}