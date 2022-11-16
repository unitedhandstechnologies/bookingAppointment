import { AgoraVideoPlayer } from 'agora-rtc-react';
import React from 'react'

const Video = (props) => {
   const { users, tracks } = props;
   return (
      <>
         <AgoraVideoPlayer
            videoTrack={tracks[1]}
            className="img-fluid video-img"
         />
         <div className="v-person-img">
            {users.length > 0 ?
               <AgoraVideoPlayer key={users[0].uid}
                  videoTrack={users[0]?._videoTrack}
                  className="img-fluid"
                  style={{ width: 400, height: 400, zIndex: 3 }}
               /> :
               <img src="assets/images/Doctorimage2.png" alt="Doctorimage2.png" className="img-fluid" />
            }
         </div>
      </>
   )
}

export default Video