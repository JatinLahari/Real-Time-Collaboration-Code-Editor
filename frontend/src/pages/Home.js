import React, { useState } from 'react'
import { v4 as uuidV4 } from 'uuid';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
const Home = () => {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const createNewRoom = (e)=>{
    e.preventDefault();
    const id = uuidV4();
    setRoomId(id);
    toast.success("New Room Created")
  }

  const joinRoom = ()=>{
    if(!roomId || !username){
      toast.error("ROOM ID & Username is required");
      return;
    }

    setIsLoading(true);    
    setTimeout(() => {
      setIsLoading(false);
      navigate(`/editor/${roomId}`, {state:{username}})
    }, 5000);

  }

  const handleInputEnter = (e)=>{
    if(e.code === 'Enter'){
      joinRoom();
    }
  }


  return (
    <>
    {isLoading && <Loader message="Joining room..." />}
    <div className='homePageWrapper'>
      <div className='formWrapper'>
        <img src='/main2.png' alt='code-logo' id='mainlogo'/>
        <h4 className='mainLabel'>Paste Invitation ROOM ID</h4>
        <div className='inputGroup'>
          <input type='text' className='inputBox' placeholder='ROOM ID' value={roomId} onChange={(e)=>setRoomId(e.target.value)} onKeyUp={handleInputEnter} disabled={isLoading}/>

          <input type='text' className='inputBox' placeholder='USERNAME' value={username} onChange={(e)=>setUsername(e.target.value)} onKeyUp={handleInputEnter} disabled={isLoading}/>

          <button className='btn joinBtn' onClick={joinRoom} disabled={isLoading}>{isLoading ? "Joining" : "Join"}</button>

          <span className='createInfo'>
            If you don't have an invite then create &nbsp;
            <a href='/' className='createNewBtn' onClick={createNewRoom} style={{pointerEvents: isLoading ? 'none': 'auto'}}>
            New Room</a>
          </span>
        </div>
      </div>
      <footer>
        <h4>Built with 💛 by <a href="https://github.com/JatinLahari">Jatin Lahari</a></h4>
      </footer>
    </div>
    </>
  )
}

export default Home