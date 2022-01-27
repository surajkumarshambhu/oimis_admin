import React, { useState } from 'react'
import './members.css'
import * as CONSTANT from '../../Helper/Constant';
import axios from 'axios'
import UserIcon from '../../Images/user_icon.png'
import { Audio } from  'react-loader-spinner'
import MuiAlert from '@mui/material/Alert';
import {Snackbar} from '@mui/material';
import { ApiHelper } from '../../Helper/APIHelper';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Addmembers() {
    const [profileImage, setProfileImage] = useState({
        file: UserIcon
    })
    const [formData,setFormData] = useState({
        id:'',
        first_name:'',
        last_name:'',
        email:'',
        phone_number:'',
        designation:'',
        profile_image_id:0
    })

    const documentFormData = useState({
        doc_type :'profile_photo',
        document_category :'staff_document'
    })

    const [loader, setLoader] = useState(false)
    const [alertData,setAlertData] = useState({
        message:"",
        type:""
    })
    const [fileData,setFileData] = useState({
        file: '',
        id: '0'
    })
    const [open, setOpen] = useState(false);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    function handle(e){
        e.preventDefault()
        const newData = {...formData}
        newData[e.target.id] = e.target.value
        setFormData(newData)
    }

    function submit(e){
        setLoader(true)
        e.preventDefault()
        const postData = 
        {
            request: {
                first_name: formData.first_name,
                last_name: formData.last_name,
                email: formData.email,
                phone_number: formData.phone_number,
                designation: formData.designation,
                profile_image_id: formData.profile_image_id
            }
        }
        let url = "admin/add-staff";
        ApiHelper(url,postData,'POST')
        .then(resposnse => {
            if (resposnse.success === false){
                setLoader(false)
                setAlertData({
                    message: resposnse.message,
                    type:"error"
                })
                setOpen(true);
            }
            else{
                setFormData({
                    first_name: formData.first_name,
                    last_name: formData.last_name,
                    email: formData.email,
                    phone_number: formData.phone_number,
                    designation: formData.designation,
                    profile_image_id: formData.profile_image_id,
                    id: resposnse.data.staff_id,
                })
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
        fd.append("request[doc_type]",documentFormData.doc_type)
        fd.append("request[document_category]",documentFormData.document_category)
        fd.append("request[flag]",false)
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
                handleClose()
                const postData = 
                {
                    request: {
                        id:formData.id,
                        profile_image_id: res.data.data.document_id
                    }
                }
                let url = "admin/add-staff";
                ApiHelper(url,postData,'POST')
                .then(resposnse => {
                    if (resposnse.success === false){
                        setLoader(false)
                        setAlertData({
                            message: resposnse.message,
                            type:"error"
                        })
                        setOpen(true);
                    }
                    else{
                        setLoader(false)
                    }
                })
            }
            else{
                setLoader(false)
            }
        })
    }

    return (
        <>
            <Snackbar open={open} 
                autoHideDuration={1500} 
                anchorOrigin={ {
                vertical: 'bottom',
                horizontal: 'right',
                }} onClose={handleClose}
            >
                <Alert onClose={handleClose} severity={alertData.type} sx={{ width: '100%' }}>
                    {alertData.message}
                </Alert>
            </Snackbar>
            <div className='project-list-wrapper'>
                <div className='member-card-wrapper'>
                    <div className='cardboxshadows'>
                        <h4>Add Officers & Supervisors</h4>
                        <form onSubmit={(e) => submit(e)}>
                            <div>
                                <div className='form-group-col'>
                                    <label>First Name *</label>
                                    <input type="text" className="form-control" placeholder="Enter first name" required="required" onChange={(e) => handle(e)} id = 'first_name' value={formData.first_name}/>
                                </div>
                                <div className='form-group-col'>
                                    <label>Last Name *</label>
                                    <input type="text" className="form-control" placeholder="Enter last name" required="required" onChange={(e) => handle(e)} id = 'last_name' value={formData.last_name}/>
                                </div>
                                <div className='form-group-col'>
                                    <label>Email ID</label>
                                    <input type="email" className="form-control" placeholder="Enter email address" required="required" onChange={(e) => handle(e)} id = 'email' value={formData.email}/>
                                </div>
                                <div className='form-group-col'>
                                    <label>Phone Number *</label>
                                    <input type="phone" className="form-control" placeholder="Enter phone number" required="required" onChange={(e) => handle(e)} id = 'phone_number' value={formData.phone_number}/>
                                </div>
                                <div className='form-group-col'>
                                    <label>Designation *</label>
                                    <input type="phone" className="form-control" placeholder="Enter designation " required="required" onChange={(e) => handle(e)} id = 'designation' value={formData.designation}/>
                                </div>
                            </div>
                            <div className='flex flex-direction-row flex-gap-10 form-action' >
                                <button type="submit" className="btn-primary-style" disabled={formData.id === '' ? false : true}>
                                    {
                                        loader === true ? <Audio type="Circles" color="#ff" height={20} width={20}  /> : ""
                                    }
                                    {
                                        (loader) === true ? "Adding" : "Add Member"
                                    }
                                </button>
                                <button type="reset" className="btn-primary-style">Reset</button>
                            </div>
                        </form>
                    </div>
                    <div className='cardboxshadows'>
                        <h4>Upload Photo</h4>
                        <form onSubmit={(e) => fileUploadHandler(e)}>
                            <div className='upload-photo-wrapper'>
                                <img src={profileImage.file} alt='user-icon'></img>
                                <div className='form-group-col'>
                                    <input type="file" className="form-control upload-photo" accept="image/*" onChange={(e) => fileSelectHandler(e)} id = 'file'/>
                                    <button type="submit" className="btn-primary-style" disabled={formData.id === '' ? true : false}>
                                        Upload Photo
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Addmembers
