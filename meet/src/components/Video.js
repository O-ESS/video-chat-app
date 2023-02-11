import React, { useEffect, useRef, useState } from 'react'
import { 
    useHMSActions,
    useHMSStore,
    selectCameraStreamByPeerID,
    selectIsLocalAudioEnabled,
    selectIsLocalVideoEnabled,
    selectIsConnectedToRoom

} from '@100mslive/react-sdk'
import { ImPhoneHangUp } from 'react-icons/im';
import {BsFillCameraVideoOffFill, BsFillCameraVideoFill, BsMicMute, BsMic} from 'react-icons/bs';


export default function Video({peer,index}) {

    const isConnected = useHMSStore(selectIsConnectedToRoom)
    const videoRef = useRef(null)
    const hmsActions = useHMSActions();

    const videoTrack = useHMSStore(selectCameraStreamByPeerID(peer.id))
    useEffect(() =>{
        if(videoRef.current && videoTrack){
            if(videoTrack.enabled){
                hmsActions.attachVideo(videoTrack.id, videoRef.current)
            }
            else{
                hmsActions.detachVideo(videoTrack.id, videoRef.current)
            }
        }
    }, [videoTrack, hmsActions])


    const [mediaStatus, setMediaStatus] = useState(true);
    const [videoStatus, setVideoStatus] = useState(true)
    const audioEnabled = useHMSStore(selectIsLocalAudioEnabled)
    const videoEnabled = useHMSStore(selectIsLocalVideoEnabled)

    const toggleAudio = async () =>{
        setMediaStatus(!mediaStatus)
        await hmsActions.setLocalAudioEnabled(!audioEnabled)
    }
    const toggleVideo = async () =>{
        setVideoStatus(!videoStatus)
        await hmsActions.setLocalVideoEnabled(!videoEnabled)

    }

    const handleLeaveRoom = () =>{
        if(isConnected) hmsActions.leave()
    }

   
  return (
      <div className="video-div" style={{display:"flex"}}>
        <div className="video-container">
            <div className="cont">
                <video className="center-vid"
                ref={videoRef} autoPlay muted playsInline
                
                >

                </video>

            </div>
          {   index===0 ? 
             <div className="func-btn">

                <button onClick={toggleVideo}>
                    {
                        videoStatus ? <BsFillCameraVideoFill/> : <BsFillCameraVideoOffFill/>
                    }
                </button>
                <button onClick={toggleAudio}>
                    {
                        mediaStatus ? <BsMic/> : <BsMicMute/>
                    }
                </button>
                <button onClick={handleLeaveRoom}>
                <ImPhoneHangUp/>
                </button>

            </div>
            : <></>
            }
            
        </div>
      </div>
    )
}