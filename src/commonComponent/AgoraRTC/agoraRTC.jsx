import React, { useEffect, useState } from "react";
import Controls from "./controls";
import Video from "./video";
import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";
import { localStorageKeys, promiseWrapper } from "../../utility/common";
import { connect } from "react-redux";
import exadoActions from "../../redux/exado/action";
import { bindActionCreators } from "redux";
import Sidebar from "./sidebar";
import { toast } from "react-toastify";
import exadoDocActions from "../../redux/exadoDoc/action";
import { useHistory, useParams } from "react-router";

const AgoraRTC = (props) => {
  const params = useParams();
  const history = useHistory();

  const { appointmentGuid } = params;
  const appId = "27061949497c4a599bdcc3bf4d5a66de";
  const channelName = appointmentGuid;
  const userGuid = localStorage.getItem(localStorageKeys.userId);

  const [showSidebar, setShowSidebar] = useState(false);
  const [token, setToken] = useState("");

  const config = { mode: "rtc", codec: "vp8" };
  const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
  const useClient = createClient(config);
  const client = useClient();

  const [users, setUsers] = useState([]);
  const [start, setStart] = useState(false);
  const { ready, tracks } = useMicrophoneAndCameraTracks();

  useEffect(() => {
    return () => {
      if (tracks) {
        tracks[0].close();
        tracks[1].close();
      }
    };
  }, []);

  useEffect(() => {
    if (start) getRTCToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start]);

  useEffect(() => {
    if (token && channelName && start) {
      initiateClient();
      return async () => {
        await client.leave();
        await client.removeAllListeners();
        await tracks[0].close();
        await tracks[1].close();
      };
    } else console.log(token, channelName, start, "something is not there");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, ready, tracks]);

  const initiateClient = () => {
    if (ready && tracks) {
      try {
        initAgora(channelName);
      } catch (err) {
        console.log(err);
      }
    } else toast.error("Please give permission to use camera and microphone");
  };

  const initAgora = async () => {
    client.on("user-published", async (user, mediaType) => {
      await client.subscribe(user, mediaType);
      if (mediaType === "video")
        setUsers((prevUsers) => {
          const newUsers = prevUsers.map((newUser) => newUser);
          newUsers.push(user);
          return newUsers;
        });
      else if (mediaType === "audio") user.audioTrack.play();
    });

    client.on("user-unpublished", (user, mediaType) => {
      if (mediaType === "video")
        setUsers((prevUsers) =>
          prevUsers.filter((User) => User.uid !== user.uid)
        );
      if (user.audioTrack) user.audioTrack.stop();
    });

    client.on("user-left", (user) => {
      setUsers((prevUsers) =>
        prevUsers.filter((User) => User.uid !== user.uid)
      );
      if (user.audioTrack) user.audioTrack.stop();
    });

    try {
      await client.join(appId, channelName, token, userGuid);
    } catch (err) {
      console.log(err);
    }
    if (tracks) await client.publish([tracks[0], tracks[1]]);
  };

  const getRTCToken = () => {
    promiseWrapper(props.comactions.getAuthToken, {
      modal: {
        channel: channelName,
        uid: userGuid,
      },
    })
      .then((data) => {
        setToken(data.data.data.token);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Sidebar
        setShowSidebar={setShowSidebar}
        showSidebar={showSidebar}
        appointmentGuid={appointmentGuid}
      />
      <div className="video-section">
        {ready && tracks && (
          <>
            <Video users={users} tracks={tracks} start={start} />
            <Controls
              client={client}
              tracks={tracks}
              setStart={setStart}
              start={start}
              // initiateClient={initiateClient}
              showSidebar={showSidebar}
              setShowSidebar={setShowSidebar}
              appointmentGuid={appointmentGuid}
              push={history.push}
              docactions={props.docactions}
            />
          </>
        )}
      </div>
    </>
  );
};

function mapStoreToprops(state, props) {
  return {};
}

function mapDispatchToProps(dispatch) {
  const comactions = bindActionCreators(exadoActions, dispatch);
  const docactions = bindActionCreators(exadoDocActions, dispatch);
  return { comactions, docactions };
}

export default connect(mapStoreToprops, mapDispatchToProps)(AgoraRTC);
