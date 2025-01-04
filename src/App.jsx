import React, { useCallback, useEffect, useState,useRef } from 'react'
import './App.css'

function App() {

  // i did this

const [isNumAllowed,setNumAllowed] = useState(false);
const [isCharAllowed,setCharAllowed] = useState(false);
const [length,setLength] = useState(8);
const [password,setPassword] = useState('');
const [isCopy,setIsCopy] = useState(false);

const passwordRef = useRef(null); //used for taking the refrence to select the input field content

const passGenerator = useCallback(() => { // this function is generating the password
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let num = "1234567890";
    let char = "!@#$%^&*()_+{}:;?/.,";
    let pass = "";
  
    if(isNumAllowed) {  //checking for the number if num checkbox is checked than it will add num into string
      str += num;
    }
    if(isCharAllowed) { //checking for the number if char checkbox is checked than it will add num into string
      str += char;
    }
    
    for(let i = 0; i < length;i++){
        let ran = Math.floor(Math.random() * str.length); 
        pass += str.charAt(ran);
    }

    setPassword(pass);
  },[isNumAllowed,isCharAllowed,length,setPassword])
  
const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select(); // used for selecting the input field text
    window.navigator.clipboard.writeText(password) // used for copying the pass
    setIsCopy((prevState)=> !prevState); // it will change the prevstate 
  })

  useEffect(() => {
    passGenerator();
    setIsCopy((prevState)=> {
      if(prevState == "true"){
        !prevState;
      }
    });
  },[isCharAllowed,isNumAllowed,length,passGenerator]) // it will execute the above statement whenever any dependency will change

  return (
    <>
     <div className='bg-black text-white h-screen p-8'>
        <div className='bg-[#1F2937] text-white mx-auto p-4 rounded-xl flex flex-col items-center w-full md:w-[60vw] lg:w-[40vw]'>
          <h1 className='mb-4 md:text-2xl text-sm'>Password Generator</h1>
          <div className='flex w-[90%]'>
            <input
             value={password}
             className='w-[80%] p-2 outline-none font-semibold text-orange-500 rounded-l-lg' type="text"
             ref={passwordRef} />
            <button
             onClick={copyPasswordToClipboard}
             className='w-[20%] bg-[#1D4ED8] text-white rounded-r-lg'>
             {(isCopy)? "copied" : 'copy' }</button>
          </div>
          <div className='flex md:flex-row flex-col py-2 mt-1 w-[90%] justify-between items-center text-orange-500'>
            <input 
            min={5}
            max={50}
            onChange={(e) => {
              setLength(e.target.value);
            }}
             type="range" name="" id="" />
            <p>Length: {length}</p>
            <div className='flex gap-2 items-center text-[#F27316]'>
              <input
              defaultChecked = {isNumAllowed}
               onChange={() => {
                setNumAllowed((prev) => !prev);
               }}
               type="checkbox" name="" id="num" />
              <label htmlFor="num">Numbers</label>
            </div>
            <div className='flex gap-2 items-center text-[#F27316]'>
              <input
              defaultChecked = {isCharAllowed}
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
               type="checkbox" name="" id="char" />
              <label htmlFor="char">Character</label>
            </div>
          </div>
        </div>
     </div>
    </>
  )
}

export default App
