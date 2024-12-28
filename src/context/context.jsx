 import { createContext } from "react";
 import run from '../config/gemini';
 import {useState} from "react" ;

 
 export const Context= createContext();

 const ContextProvider = (props) => {

    const [input,setInput]=useState(""); 
    const [recentPrompt,setRecentPrompt]=useState();
    const [prevPrompts,setPrevPrompts]=useState([]); //to store all history and display on the recent tab
    const[showResult,setShowResult]=useState(false); 
    const[loading,setLoading]=useState(false);
    const[resultData, setResultData]=useState("");

    const delayPara = (index,nextWord)=>{
        setTimeout(function (){
            setResultData(prev=>prev+nextWord);
        },75*index)
    }

    const newChat=()=>{
        setLoading(false);
        setShowResult(false);

    }

    const onSent = async(prompt)=>{
        setResultData("")//prev response removed //result data is reset
        setLoading(true);
        setShowResult(true);
        let response ;
        //this "if" will work if we click on recent
        if(prompt!==undefined){
            response = await run(prompt);
            setRecentPrompt(prompt)
        }
        else{
            setPrevPrompts(prev=>[...prev,input]) //this statement will be execute when we run
            //onSent function for out input field 
            setRecentPrompt(input);
            response=await run(input);
        }
      
       // const response =await run(input) //getting data from run() and displaying it in console , need to display it in ppage
        //now response will be saved in response variable
        
        let responseArray= response.split("**");
        let newResponse="";
        for(let i=0;i<responseArray.length;i++){
            if(i===0 || i%2 !==1){ //means that number is even number
                newResponse +=responseArray[i];
            }
            else{
                newResponse +="<b>"+responseArray[i]+"</b>" ;
            }
        }

        let newResponse2 = newResponse.split("*").join("</br>")
        //whenever we get star it will be replaced with <br> tag
        let newResponseArray= newResponse2.split(" "); //used space to split the string 
        //in our response we wont get the space
        for(let i=0; i<newResponseArray.length;i++){
            const nextWord= newResponseArray[i];
            delayPara(i,nextWord + " ");
        }
       // setResultData(newResponse2);
        setLoading(false);
        setInput("");


    }

    // onSent("What is react js");

    const contextValue={

        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat

    }
        return(
            <Context.Provider value={contextValue}>
                {props.children}
            </Context.Provider>
        )
 }

 export default ContextProvider;

//CHATGPT

// import { createContext } from "react";
// import run from '../config/gemini';  // Adjust the path based on your file structure

// export const Context = createContext();

// const ContextProvider = (props) => {
//     // Define the onSent function
//     const onSent = async (prompt) => {
//         try {
//             await run(prompt);  // Now it will use the imported run function
//         } catch (error) {
//             console.error("Error running the prompt:", error);
//         }
//     };

//     // Send the initial prompt when the component is mounted
//     onSent("What is react js");

//     const contextValue = {};

//     return (
//         <Context.Provider value={contextValue}>
//             {props.children}
//         </Context.Provider>
//     );
// };

// export default ContextProvider;


// import { createContext, useEffect } from "react"; //createContext hook
// import run from '../config/gemini';  // Adjust the path based on your file structure

// export const Context = createContext();

// const ContextProvider = (props) => {
//     // Define the onSent function
//     const onSent = async (prompt) => {
//         try {
//             await run(prompt);  // Now it will use the imported run function
//         } catch (error) {
//             console.error("Error running the prompt:", error);
//         }
//     };

//     // Use useEffect to call onSent after the component mounts
//     useEffect(() => {
//         onSent("What is react js");
//     }, []);  // Empty dependency array ensures this runs once after mount

//     const contextValue = {};

//     return (
//         <Context.Provider value={contextValue}>
//             {props.children}
//         </Context.Provider>
//     );
// };

// export default ContextProvider;
