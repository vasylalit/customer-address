import React, { useEffect, useState } from "react";
import axios from "axios"

function SynchroniseButton() {

  const [data, setData] = useState("")

  const sync = async (e) => {
    e.preventDefault()
    const post = { data: "" }
    try {
      const response = "";

      await axios.post('http://192.168.175.18:6060/sync/database',  post , {
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
        }
      },
      ).then((data) => {
        response = data;
      });

      console.log(response.data)
    } catch (e) {
      alert(e)
    }
  }

  return (
   <>
   
        <i onClick={sync} class="fas fa-sync px-5"></i>
   
   </>
  )
  
}

export default SynchroniseButton;