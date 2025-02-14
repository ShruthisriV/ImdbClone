//Understanding the working of Context API

import React, { useContext, useEffect, useState, createContext } from 'react'
const nearByGroceryStore = createContext(); //creates our store

function Context() {
    console.log("Context is rendered");
    const data = {
        name: "bhanu",
        msg: "hello bhaa",
    }
    const [user, setUser] = useState(data);
    const setUserData = ({name, msg}) =>{
        setUser({name, msg});
    }

  return (
    <>
        <h3>Context</h3>
        <div>⬇️</div>
        
        <nearByGroceryStore.Provider value={data}> 
            {/* <Grandparent user={user} setUserData={setUserData}></Grandparent> */}
            <Grandparent></Grandparent> {/*who ever present in the grandparent tag they can use the grocery */}
        </nearByGroceryStore.Provider>
        
    </>
  )
}

function Grandparent(/*{user, setUserData}*/ ) {
    console.log("Grandparent is rendered");
    return (
      <>
        <h3>Grandparent</h3>
        <div>⬇️</div>
        {/* <Parent user={user} setUserData={setUserData}></Parent> */}
        <Parent></Parent>
      </>
    );
}

function Parent(/*{user, setUserData}*/) {
    console.log("Parent is rendered");
    return (
        <>
            <h3>Parent</h3>
            <div>⬇️</div>
            {/* <Child user={user} setUserData={setUserData}></Child> */}
            <Child></Child>
        </>
    );
}

function Child(/*{user, setUserData}*/) {
    console.log("Child is rendered");
    const user = useContext(nearByGroceryStore);
    // console.log(user);
    // useEffect(() => {
    //     setTimeout(() => {
    //         setUserData({name:"shruthi", msg:"bye"})
    //     }, 3000);
    // },[]);

    return (
        <>
            <p>Child</p>
            <div>⬇️</div>
            <p>{user.name}</p>
            <p>{user.msg}</p>
        </>
    );
}

export default Context