import React from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/context'
import { useContext } from 'react';


const Main = () => {
const {onSent, recentPrompt,showResult,loading,resultData,setInput,input}=useContext(Context);

  return (
    <>
      <div className="main">

        <div className="nav">
            <p>IntelliChat</p>
                <img src={assets.user_icon } alt=""  />
        </div>

        <div className="main-container">

            {!showResult ?
            <>
             <div className="greet">
                    <p> <span>Hello , Nisha </span></p>
                    <p>How can i help you today ?</p>
                </div>

                <div className="cards">

                    <div className="card">
                        <p>Suggest beautiful places to see on an upcoming road trip in Mandi</p>
                        <img src={assets.compass_icon} alt="" />
                    </div>

                    <div className="card">
                        <p>How to study smarter and efficiently in less time</p>
                        <img src={assets.bulb_icon} alt="" />
                    </div>

                    <div className="card">
                        <p>Steps to avoid pregnancy</p>
                        <img src={assets.message_icon} alt="" />
                    </div>

                    <div className="card">
                        <p>Explain this code</p>
                        <img src={assets.code_icon} alt="" />
                    </div>

                </div>
            </>
             : <div className="result">
                    <div className="result-title">
                            <img src={assets.user_icon} alt=""/>
                            <p>{recentPrompt}</p>
                    </div>
                    <div className="result-data">
                            <img src={assets.gemini_icon} alt="" />
                            { loading //if loading is true response is not generated yet so 
                             ?
                            <div className ='loader' >
                                <hr/>
                                <hr/>
                                <hr/>
                            </div>
                            : 
                            <p dangerouslySetInnerHTML={{__html:resultData}} ></p>
                            }
                    </div>
                 
             </div> 
             }



                <div className="main-bottom">
                    <div className="search-box">
                        <input onChange={(e)=>setInput(e.target.value)}
                         value={input}     //this input field will be converted in controlled input field
                         //when we will make any changes in the react at every changes input state will be updated
                         type="text" 
                         placeholder="Enter a prompt here"/>
                        <div>
                            <img src={assets.gallery_icon} alt="" />
                            <img  src={assets.mic_icon} alt="" />
                            {input ? <img onClick={()=>onSent()} //if input field has any content , send icon images will be provided
                            src={assets.send_icon} alt="" /> :  null} 

                        </div>
                    </div>
                    <p className="bottom-info" >
                    IntelliChat may display inaccurate info,including about about people,so double-check its responses, Your response matters to us.
                    </p>
                </div>
        </div>

      </div>
    </>
  )
}

export default Main
