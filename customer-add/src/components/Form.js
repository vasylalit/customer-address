import React, { useEffect, useState } from "react";
import axios from "axios"
import SynchroniseButton from "./SynchroniseButton"

function Form() {

  const [firstname, setFirstname] = useState("")
  const [firstmobile, setFirstmobile] = useState("")
  const [firstemail, setFirstemail] = useState("")

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const url = "http://192.168.175.18:6060/user"
  const [data, setData] = useState({
    name : "",
    mobile : "",
    email : ""
  })
  
  
  // useEffect(()=>{
  //   window.scrollTo(0, 0);
  //   fetch(url).then((response)=>{
  //     response.json().then((data)=>{
  //       console.warn(data);
  //       setData(data)
  //       localStorage.setItem("user", JSON.stringify(data))
  //     })
  //   }).catch(err=>{
  //     let collection = localStorage.getItem("user");
  //     setData(JSON.parse(collection))
  //   })
  // }, [])



  const handleSubmit = async (e) => {
    e.preventDefault()
    const post = { data: data }
    try {
      // const res = await axios.post(url, post)
      var response = "";
    
      await axios.post(url, post , {
        headers: {
          Accept: '*',
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
  

  function handle(e){
    const newdata = { ...data}
    setFirstname(newdata.name)
    setFirstmobile(newdata.mobile)
    setFirstemail(newdata.email)

    newdata[e.target.id] = e.target.value
    setData(newdata)
    console.log(newdata)
  }
  return (
    <div >
      <form onSubmit={handleSubmit}>
        <input onChange={(e) => handle(e)} id="name" value = {data.name} placeholder="name" type="text"></input>
        <input onChange={(e) => handle(e)} id="mobile" value = {data.mobile} placeholder="mobile no." type="number"></input>
        <input onChange={(e) => handle(e)} id="email" value = {data.email} placeholder="email" type="text"></input>
        <button type="submit">Submit</button>
        <SynchroniseButton />
      </form>
    </div>
  )
  // return (
  //   <>
  //     <div className=" contactUsPage">
     
  //       <div id="contact-us">
  //         <div className="container py-4">
           
  //           <div className="row mt-2 mt-sm-5">
            

  //             <div className="col-lg-6 d-flex">
  //               <div
  //                 role="form"
  //                 className="wpcf7"
  //                 id="wpcf7-f90-o1"
  //                 lang="en-US"
  //                 dir="ltr"
  //               >
  //                 <div className="screen-reader-response" aria-live="polite"></div>
  //                 <form className="wpcf7-form">
  //                 <div className="mb-2">
  //                   <label for="contactName" className="form-label">Your Name</label>
  //                   <input
  //                           onChange={(e) => handle(e)}
  //                           value={data.contactUsName}
  //                           type="text"
  //                           id="contactUsName"
  //                           name="your-name"
  //                           size="40"
  //                           className="wpcf7-form-control form-control wpcf7-text wpcf7-validates-as-required"
  //                           aria-required="true"
  //                           aria-invalid="false"
  //                           placeholder="Full Name"
  //                         />
  //                 </div>

  //                 <div className="mb-2">
  //                   <label for="contactMobile" className="form-label">Mobile</label>
  //                   <input
  //                           onChange={(e)=> handle(e)}
  //                           value = {data.contactMobile}
  //                           type="text"
  //                           id="contactMobile"
  //                           name="your-mobile"
  //                           size="40"
  //                           className="wpcf7-form-control form-control wpcf7-text wpcf7-validates-as-required"
  //                           aria-required="true"
  //                           aria-invalid="false"
  //                           placeholder="6532789654"
  //                         />
  //                 </div>
  //                 <div className="mb-2">
  //                   <label for="contactUsEmail" className="form-label">Email</label>
  //                   <input
  //                           onChange={(e)=> handle(e)}
  //                           value = {data.contactUsEmail}
  //                           type="email"
  //                           id="contactUsEmail"
  //                           aria-describedby="emailHelp"
  //                           name="your-email"
  //                           size="40"
  //                           className="wpcf7-form-control form-control wpcf7-text wpcf7-email wpcf7-validates-as-required wpcf7-validates-as-email"
  //                           aria-required="true"
  //                           aria-invalid="false"
  //                           placeholder="example@gmail.com"
  //                         />
  //                 </div>
                   
  //           {/* <div className="mb-2">
  //                 <label for="cityName" className="form-label">City</label>
  //                 <input
  //                         type="text"
  //                         id="cityName"
  //                         name="Your City"
  //                         size="40"
  //                         className="wpcf7-form-control form-control wpcf7-text wpcf7-validates-as-required"
  //                         aria-required="true"
  //                         aria-invalid="false"
  //                         placeholder="Your CityS"
  //                       />
  //                 </div>
  //                 <div className="mb-2">  
  //               <label for="stateName" className="form-label">State</label>
  //               <input
  //                       type="text"
  //                       id="stateName"
  //                       name="your-name"
  //                       size="40"
  //                       className="wpcf7-form-control form-control wpcf7-text wpcf7-validates-as-required"
  //                       aria-required="true"
  //                       aria-invalid="false"
  //                       placeholder="Your State"
  //                     />
  //                 </div>
  //                 <div className="mb-2">
  //             <label for="countryName" className="form-label">Country</label>
  //             <input
  //                     type="text"
  //                     id="countryName"
  //                     name="your-name"
  //                     size="40"
  //                     className="wpcf7-form-control form-control wpcf7-text wpcf7-validates-as-required"
  //                     aria-required="true"
  //                     aria-invalid="false"
  //                     placeholder="Your Country"
  //                   />
  // </div> */}
                 

  //                   <p>
  //                     <a onSubmit={(e)=>submit(e)} type="button" className="btn commonButton btn-sm bg-primary text-white" href="/shop">Submit</a>
  //                     <span className="ajax-loader"></span>
  //                   </p>
  //                 </form>
  //               </div>
  //             </div>
              
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </>
  // );
}

export default Form;