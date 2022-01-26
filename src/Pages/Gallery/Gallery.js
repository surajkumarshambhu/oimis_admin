import React from 'react'
import './gallery.css'
import axios from 'axios'
import { ApiHelper } from '../../Helper/APIHelper';
import UserIcon from '../../Images/user_icon.png';
import { useState, useEffect } from 'react'
import * as CONSTANT from '../../Helper/Constant';
import * as AiIcons from 'react-icons/ai';
import { IconContext } from 'react-icons/lib';
import Modal from '@mui/material/Modal';

function Gallery() {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [fileData,setFileData] = useState({
        file: '',
        id: '0'
    })
    const [formData,setFormData] = useState({
        image_description: '',
        doc_type: '',
        document_category: 'gallery'
    })
    const [loader, setLoader] = useState(false)
    const [galleryList, setGalleryList] = useState([]);

    useEffect(() => {
        setLoader(true)
        let url = "get-gallery";
        ApiHelper(url,{},'POST')
        .then(response => {
            setGalleryList(response.data.gallery)
            setLoader(false)
        })
    }, [open]);

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
        fd.append("request[doc_type]",formData.doc_type)
        fd.append("request[document_category]",formData.document_category)
        fd.append("request[image_description]",formData.image_description)
        axios.post(CONSTANT.BASEURL + 'admin/upload-gallery',fd,{
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
                setFormData({
                    image_description: '',
                    doc_type: '',
                    document_category: 'gallery'
                })
                setFileData({
                    file: '',
                    id: '0'
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
    }

    function handle(e){
        const newData = {...formData}
        newData[e.target.id] = e.target.value
        setFormData(newData)
        console.log(formData);
    }

    return (
        <>
        <IconContext.Provider value={{ color: '#fff',size: '20px' }}>
            <div className='project-list-wrapper'>
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
                            <img src={UserIcon}></img>
                            <div className='form-group'>
                                <div className='upload-photo-form-group-col'>
                                    <input type="text" className="upload-photo-form-control" placeholder="Image Description"  id='image_description' value={formData.image_description} onChange={(e) => handle(e)}/>
                                </div>
                                <div className='upload-photo-form-group-col'>
                                    <label>Document Category*</label>
                                    <select className="upload-photo-form-control" required="required" id = 'document_category' value={formData.document_category} onChange={(e) => handle(e)}  >
                                        <option value="gallery">Gallery</option>
                                    </select> 
                                </div>
                                <div className='upload-photo-form-group-col'>
                                    <label>Document Type*</label>
                                    <select className="upload-photo-form-control" required="required" id = 'doc_type' value={formData.doc_type} onChange={(e) => handle(e)}  >
                                        <option value="certificate">Certificate</option>
                                        <option value="moments">Moments</option>
                                    </select> 
                                </div>
                                <div className='upload-photo-form-group-col'>
                                    <input type="file" className="upload-photo-form-control upload-photo" accept="image/*" onChange={(e) => fileSelectHandler(e)} id = 'file' />
                                </div>
                                <div className='upload-photo-form-group-col'>
                                    <button type="submit" className="btn-primary-style">
                                        Upload Photo
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                </Modal>
                <div className='flex flex-direction-row justify-content-space-between'>
                    <div>
                            <h4>Online Gallery</h4>
                            <p>Some beautiful moments captured in our frames.</p>
                    </div>
                    <div className='flex flex-direction-row flex-gap10'>
                        <button className='btn' onClick={handleOpen}>
                            <AiIcons.AiOutlinePlus></AiIcons.AiOutlinePlus>
                            <span>Add Moments</span>
                        </button>
                    </div>
                </div>
                <div className="gallery-content">
                    {
                        galleryList.map((row,key) => ( 
                            <div key={key}>
                                {
                                    galleryList[key].map((row1,key1) => (
                                        <div key={key1} className='image-container'>
                                            <img src={CONSTANT.URL + row1.file_path} alt="" srcSet="" className=""></img>    
                                            <div className='image-action'>
                                                <button className='btn'>
                                                    <AiIcons.AiFillDelete></AiIcons.AiFillDelete>
                                                </button>
                                            </div> 
                                        </div>
                                    ))
                                }
                            </div>
                        ))
                    }
                </div>    
            </div>
        </IconContext.Provider>
        </>
    )
}

export default Gallery
