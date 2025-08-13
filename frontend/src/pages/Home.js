import React, { useState } from 'react'
import { v4 as uuidV4 } from 'uuid';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");

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
    navigate(`/editor/${roomId}`, {state:{username}})
  }

  const handleInputEnter = (e)=>{
    if(e.code === 'Enter'){
      joinRoom();
    }
  }


  return (
    <div className='homePageWrapper'>
      <div className='formWrapper'>
        <img src='/main2.png' alt='code-logo' id='mainlogo'/>
        <h4 className='mainLabel'>Paste Invitation ROOM ID</h4>
        <div className='inputGroup'>
          <input type='text' className='inputBox' placeholder='ROOM ID' value={roomId} onChange={(e)=>setRoomId(e.target.value)} onKeyUp={handleInputEnter}/>

          <input type='text' className='inputBox' placeholder='USERNAME' value={username} onChange={(e)=>setUsername(e.target.value)} onKeyUp={handleInputEnter}/>

          <button className='btn joinBtn' onClick={joinRoom}>Join</button>

          <span className='createInfo'>
            If you don't have an invite then create &nbsp;
            <a href='/' className='createNewBtn' onClick={createNewRoom}>
            New Room</a>
          </span>
        </div>
      </div>
      <footer>
        <h4>Built with 💛 by <a href="https://github.com/JatinLahari">Jatin Lahari</a></h4>
      </footer>
    </div>
  )
}

export default Home