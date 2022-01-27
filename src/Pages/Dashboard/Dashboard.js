import React from 'react';
import axios from 'axios'
import { Audio } from  'react-loader-spinner'
import { ApiHelper } from '../../Helper/APIHelper';
import { useState, useEffect } from 'react'
import * as CONSTANT from '../../Helper/Constant';
import './dashboard.css'
import { GoLocation } from "react-icons/go";
import { MdOutlineBrokenImage } from "react-icons/md";
import { BiBed } from "react-icons/bi";
import { MdOutlineFlipCameraAndroid } from "react-icons/md";
import UserIcon from '../../Images/user_icon.png';
import { AiOutlineMail } from "react-icons/ai";
import { BiPhone } from "react-icons/bi"
import {BiMessageSquareEdit} from "react-icons/bi"
import Modal from '@mui/material/Modal';


function Dashboard() {
    const [profileImage, setProfileImage] = useState({
        file: UserIcon
    })
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [fileData,setFileData] = useState({
        file: '',
        id: '0'
    })
    const [formData,setFormData] = useState({
        introduction:'',
        location:'',
        training_activities:'',
        features:'',
        accomodation:'',
        address:'',
        phone:'',
        email:'',
        path:'',
    })

    useEffect(() => {
        setLoader(true)
        let url = "admin/display-text";
        ApiHelper(url,{},'POST')
        .then(response => {
            setFormData({
                introduction:response.data.lookup.introduction,
                location:response.data.lookup.location,
                training_activities:response.data.lookup.training_activities,
                features: response.data.lookup.features,
                accomodation: response.data.lookup.accomodation,
                address: response.data.lookup.address,
                phone: response.data.lookup.phone,
                email: response.data.lookup.email,
                path: response.data.lookup.path,
            })
            setLoader(false)
        })
    }, []);

    const [loader, setLoader] = useState(false)

    function fileUploadHandler(e){
        e.preventDefault()
        setLoader(true)
        let bearer ='';
        if (localStorage.getItem("user") !== null) {
            let usrData = JSON.parse(localStorage.getItem('user') ?? "");
            bearer = 'Bearer '+ usrData.data.user.token ;
        }
        const fd = new FormData()
        fd.append("request[file]",fileData.file,fileData.file.name)
        fd.append("request[doc_type]",'dashboard')
        fd.append("request[document_category]",'office')
        fd.append("request[flag]",true)
        axios.post(CONSTANT.BASEURL + 'admin/upload-document',fd,{
            headers: {
                'AcceptLanguage': 'en_US',
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'clientVersion': 'WEB:1',
                'Authorization': bearer,
            }
        })
        .then(res=>{
            if (res.data.success === true){
                setLoader(false)
                handleClose()
                setFileData({
                    file: '',
                    id: '0'
                })
                const postData = 
                {
                    request: {
                        introduction:formData.introduction,
                        location:formData.location,
                        training_activities:formData.training_activities,
                        features: formData.features,
                        accomodation: formData.accomodation,
                        address: formData.address,
                        phone: formData.phone,
                        email: formData.email,
                        path: formData.path,
                    }
                }
                let url = "admin/update-display-text";
                ApiHelper(url,postData,'POST')
                .then(resposnse => {
                    if (resposnse.success === false){
                        setLoader(false)
                        setOpen(true);
                    }
                    else{
                        setFormData({
                            introduction:formData.introduction,
                            location:formData.location,
                            training_activities:formData.training_activities,
                            features: formData.features,
                            accomodation: formData.accomodation,
                            address: formData.address,
                            phone: formData.phone,
                            email: formData.email,
                            path: formData.path,
                        })
                        setLoader(false)
                    }
                })
            }
            else{
                setLoader(false)
            }
        })
    }

    function fileSelectHandler(e){
        setFileData({
            file:e.target.files[0],
            id:'0'
        })
        setProfileImage({
            file: URL.createObjectURL(e.target.files[0])
        }) 
    }
    
    function handle(e){
        const newData = {...formData}
        newData[e.target.id] = e.target.value
        setFormData(newData)
        console.log(formData);
    }

    function submit(e){
        setLoader(true)
        e.preventDefault()
        const postData = 
        {
            request: {
                introduction:formData.introduction,
                location:formData.location,
                training_activities:formData.training_activities,
                features: formData.features,
                accomodation: formData.accomodation,
                address: formData.address,
                phone: formData.phone,
                email: formData.email,
                path: formData.path,
            }
        }
        let url = "admin/update-display-text";
        ApiHelper(url,postData,'POST')
        .then(resposnse => {
            if (resposnse.success === false){
                setLoader(false)
            }
            else{
                setFormData({
                    introduction:formData.introduction,
                    location:formData.location,
                    training_activities:formData.training_activities,
                    features: formData.features,
                    accomodation: formData.accomodation,
                    address: formData.address,
                    phone: formData.phone,
                    email: formData.email,
                    path: formData.path,
                })
                setLoader(false)
            }
        })
    }


  return (
    <>
        <div id="about" className='project-list-wrapper'>
        <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
            <div className='model'>
                <h4>Upload Photo</h4>
                <form onSubmit={(e) => fileUploadHandler(e)}>
                    <div className='upload-photo-wrapper'>
                        <img src={profileImage.file} alt=''></img>
                        <div className='form-group'>
                            <div className='upload-photo-form-group-col'>
                                <input type="file" className="upload-photo-form-control upload-photo" accept="image/*" onChange={(e) => fileSelectHandler(e)} id = 'file' />
                            </div>
                            <div className='upload-photo-form-group-col'>
                                <button type="submit" className="btn-primary-style">
                                    {
                                        loader === true ? <Audio type="Circles" color="#ff" height={20} width={20}  /> : ""
                                    }
                                    {
                                        (loader) === true ? "Uploading" : "Upload Photo"
                                    }
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            </Modal>
            <div className='about-wrapper'>
                <div className="center">
                    <h4>ABOUT</h4>
                    <h2>Find Out More About Us</h2>
                </div>                    
                <div className="about-content">
                    <div>
                        <img src={CONSTANT.URL+formData.path}alt="" srcSet="" className=""></img>  
                        <BiMessageSquareEdit className='show' onClick={handleOpen}></BiMessageSquareEdit>       
                    </div>
                    <form onSubmit={(e) => submit(e)}>
                        <div>
                            <h3>Introduction</h3>
                            <textarea  className="form-control-textarea"  id='introduction' value={formData.introduction} onChange={(e) => handle(e)}/>
                            <div className="about-list">
                                <div>
                                    <div>
                                        <GoLocation></GoLocation>
                                    </div>
                                    <div>
                                        <h4>LOCATION</h4>
                                        <textarea  className="form-control-textarea"  id='location' value={formData.location} onChange={(e) => handle(e)}/>
                                    </div>
                                </div>    
                                <div>
                                    <div>
                                        <MdOutlineBrokenImage></MdOutlineBrokenImage>
                                    </div>
                                    <div>
                                        <h4>Training Activities</h4>
                                        <textarea  className="form-control-textarea"  id='training_activities' value={formData.training_activities} onChange={(e) => handle(e)}/>
                                        <p></p>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <MdOutlineFlipCameraAndroid></MdOutlineFlipCameraAndroid>
                                    </div>
                                    <div>
                                        <h4>Features</h4>
                                        <textarea  className="form-control-textarea"  id='features' value={formData.features} onChange={(e) => handle(e)}/>
                                    </div>
                                </div> 
                                <div>
                                    <div>
                                        <BiBed></BiBed>
                                    </div>
                                    <div>
                                        <h4>Accomodation</h4>
                                        <textarea  className="form-control-textarea" id='accomodation' value={formData.accomodation} onChange={(e) => handle(e)}/>
                                    </div>
                                </div>  
                                <div>
                                    <div>
                                        <BiPhone></BiPhone>
                                    </div>
                                    <div>
                                        <h4>Contact</h4>
                                        <input type="phone" className="form-control-textarea" id='phone' value={formData.phone} onChange={(e) => handle(e)}/>
                                    </div>
                                </div>  
                                <div>
                                    <div>
                                        <AiOutlineMail></AiOutlineMail>
                                    </div>
                                    <div>
                                        <h4>Email</h4>
                                        <input type="email" className="form-control-textarea"  id='email' value={formData.email} onChange={(e) => handle(e)}/>
                                    </div>
                                </div>  
                                <div>
                                    <div>
                                        <GoLocation></GoLocation>
                                    </div>
                                    <div>
                                        <h4>Address</h4>
                                        <textarea  className="form-control-textarea"  id='address' value={formData.address} onChange={(e) => handle(e)}/>
                                    </div>
                                </div>                                
                            </div>
                        </div>    
                        <button className='btn'>  
                            {
                                loader === true ? <Audio type="Circles" color="#ff" height={20} width={20}  /> : ""
                            }
                            {
                                (loader) === true ? "Updating" : "Update Dashboard Details  "
                            }
                        </button>                       
                    </form>
                </div>
            </div>                
        </div>
        
    </>
  );
}

export default Dashboard;
