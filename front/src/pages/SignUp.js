import React from 'react'
import RegisterForm from '../components/RegisterForm'
function SignUp() {
  const containerStyle = {
    backgroundImage: 'url("https://img.freepik.com/free-vector/gradient-black-backgrounds-with-golden-frames_23-2149150610.jpg?w=1380&t=st=1704880788~exp=1704881388~hmac=b95c8b4fac580963ed51b29fbb149a675c2e1e7babf891dcc322f2bc9b86f7f5")',
    backgroundSize: 'cover',
    minHeight: '120vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  };
  return (<div style={containerStyle}>
    <RegisterForm/>
    </div>
  )
}

export default SignUp