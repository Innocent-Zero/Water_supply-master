import React,{useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Flex,Box,HStack,Button,ButtonGroup,Modal,ModalOverlay,ModalContent,ModalHeader,ModalBody,ModalCloseButton, Center} from "@chakra-ui/react";
import './App.css'

function App()
{
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role,setRole] = useState('')
  const [ isModalOpen, setIsModalOpen ] = useState(false)
  const [ modalContent, setModalContent ] = useState({})


  const openModal = (header, body) => {
    if (header == "FAILED"){
      setModalContent({
        header: '❌'+header,
        body: body,
        border: "3px solid red"
      });
    }
    else{
      setModalContent({
        header: '✅'+header,
        body: body,
        border: "3px solid lightgreen"
      });
    }
    setIsModalOpen(true);
    // Automatically close the modal after 2 seconds
    setTimeout(() => {
      // if (header == "SUCCESS"){
      //   if (role=="Department"){
      //     window.location.href="/mapDepartment"
      //   }
      //   else if (role=="Customer"){
      //     window.location.href="/mapCustomer"
      //   }
      // }
      
      setIsModalOpen(false);
    }, 2000);
  };

  async function loginUser(event)
  {
    event.preventDefault()
    const response = await fetch('http://localhost:5000/api/login',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body: JSON.stringify({
        email,
        password
      }),
    })

    const data = await response.json()
    // console.log(data)
    if(data.data)
    {
        setRole(data.data.role)
        openModal(data.status,data.message)
    }
    else{
        openModal(data.status,data.message)
    }
    // console.log(data)
  }

  useEffect(() => {
    // Use useEffect to listen for changes in 'role'
    if (role == 'Department') {
      // Redirect to the mapDepartment page
      setTimeout(() => {
        window.location.href = '/mapDepartment';
      }, 2000);
    } else if (role == 'Customer') {
      // Redirect to the mapCustomer page
      setTimeout(() => {
        window.location.href = '/mapCustomer';
      }, 2000);
    }
    else if(role == 'Admin'){
      setTimeout(() => {
        window.location.href="/map";
      }, 2000);
    }
  }, [role]); // Run this effect whenever 'role' changes

  return(
    <form onSubmit={loginUser}>
    <div className="login-box">
      <h1 style={{color:'Aqua',textAlign:'center'}}>Login</h1>
        {/* <label style={{color:'Powderblue'}}>Username</label> */}
        <br/>
        <div className='user-box'>
        <input 
          value={email}
          onChange = {(e) => setEmail(e.target.value)}
          type='email' 
          placeholder='Email'></input>
        <br/>
        </div>
        {/* <label style={{color:'Powderblue'}}>Password</label> */}
        <br/>
        <div className='user-box'>
        <input
          value={password}
          onChange = {(e) => setPassword(e.target.value)}
          type='password' placeholder='Password'/>               {/* '/' implies </input> */}
        </div>
        <br>
        </br>
        <input type='submit' value='Login'/>
        <br/>
        <br/>
        <Link to="/requestPasswordReset" style={{marginLeft:90}}>Forgot Password?</Link>
    </div>
    <div className='modal-box'>
    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} blockScrollOnMount={false}>
        <ModalOverlay />
            <ModalContent bg="white" border={modalContent.border} borderRadius="5px" p={4} top={60} left="41%" boxSize="18%">
                <ModalHeader style={{marginLeft:60}}>{modalContent.header}</ModalHeader>
                {/* <ModalCloseButton width={10} left="50%" /> */}
                <ModalBody>
                    {modalContent.body}
                </ModalBody>
            </ModalContent>
      </Modal>
      </div>
    </form>
  )
}

export default App