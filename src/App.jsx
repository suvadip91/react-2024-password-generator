import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);
  
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let string = "ABCDEFGHIJKLMNOPQRSTWXYZabcdefghijklmnopqrstuvwxyz";
    if(numberAllowed){
      string += "1234567890";
    }
    if(charAllowed){
      string += "!@#$%^&*()~";
    }

    for(let i=1; i<=length; i++){
      let index = Math.floor(Math.random()*string.length+1);
      pass += string.charAt(index);
    }

    setPassword(pass);

  },[length, numberAllowed, charAllowed, setPassword])

  const copyPassword = useCallback(() =>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  },[password])

  useEffect(() => {
    passwordGenerator();
  },[length, charAllowed, numberAllowed, passwordGenerator])

  return (
    <>
      <div className='w-full max-w-md mx-auto my-3 text-orange-300 bg-gray-700 rounded-lg'>
        <h1 className='text-center text-white'>Password Generator</h1>
        <div className='flex shadow rounded-lg py-3 px-3'>
          <input 
          type='text'
          value={password}
          className='w-full py-1 px-3 '
          placeholder='passowrd'
          ref={passwordRef}
          readOnly
          ></input>
          <button 
            className='text-white bg-blue-600 rounded-md'
            onClick={copyPassword}
            >Copy</button>
        </div>
        <div className='flex text-sm gap-x-2 px-3'>
          <div className='flex items-center gap-x-1'>
            <input 
            type="range" 
            min={6}
            max={15}
            value={length}
            onChange={(e) => {setLength(e.target.value)}} 
            />
            <label>Length:{length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input 
              type="checkbox" 
              id="numberCheck"
              defaultChecked={numberAllowed}
              onChange={() => {setNumberAllowed((prev)=>!prev)}} />
              <label>Number</label>
              <input 
              type="checkbox" 
              id="charCheck"
              defaultChecked={charAllowed}
              onChange={() => {setCharAllowed((prev)=>!prev)}} />
              <label>Character</label>
          </div>

        </div>
      </div>
    </>
  )
}

export default App
