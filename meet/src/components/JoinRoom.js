import React, { useState } from 'react';
import {
    useHMSActions,
    } from "@100mslive/react-sdk";
import GetToken from '../utils/Tokens';
import '../App.css';
import { Button, Input, Typography } from 'antd';

const { Title , Text} = Typography;

export default function JoinRoom() {
    const hmsActions = useHMSActions()

    const [name, setName] = useState("Name")
    const [joinStatus, setJoinStatus] = useState("");
    const [role] = useState('guest');

   
    const handleInputChange = (e) =>{

       setName(e.target.value)

    }

    const handleSubmit = () =>{
        setJoinStatus("Please wait! Meeting is preparing") 
        GetToken(role)
        .then(token =>{
            console.log(token, "token")
            return hmsActions.join({
                userName: name,
                authToken: token
            })
            
        })
        .catch(err => console.log("token error", err))
        
    }
       

    return (
    <div className='app' style={{ display:"flex", flexDirection: "column", alignItems: "center", justifyContent:"center",marginTop:"10%"}}>
        <div className='login'>
        <Title level={2}  style = {{color:"#82aaf1"}}> Join Meeting Room </Title>
        <Input.Group compact>
            <Input
              style={{ width: "60%"}}
              type="text" placeholder="name"  
              value={name}
              onChange={handleInputChange}
              name="name"
              required
            />
            <Button type='primary' onClick={handleSubmit}> Join</Button>
        </Input.Group>
        </div>
            <div className='status-div'>
            <Text className='status'>{joinStatus}</Text>
        </div>

    </div>
  )
}
