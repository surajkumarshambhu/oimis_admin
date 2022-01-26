import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './project.css'
import { IconContext } from 'react-icons/lib';
import { Audio } from  'react-loader-spinner'
import MuiAlert from '@mui/material/Alert';
import {Snackbar} from '@mui/material';
import { ApiHelper } from '../../Helper/APIHelper';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Addproject() {
    const history = useNavigate();
    const [formData,setFormData] = useState({
        project_name:'',
        project_description:''
    })
    const [loader, setLoader] = useState(false)
    const [alertData,setAlertData] = useState({
        message:"",
        type:""
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
                project_name: formData.project_name,
                project_description: formData.project_description,
            }
        }

        let url = "admin/add-project";
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
                history('/project-list')
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
        <IconContext.Provider value={{ color: '#fff',size: '20px' }}>
            <div className='project-list-wrapper'>
                <div className='flex flex-gap10 aling-item-unset add-project-wrapper'>
                    <div className='cardboxshadows'>
                        <h4>Add Project</h4>
                        <form onSubmit={(e) => submit(e)}>
                            <div>
                                <div className='form-group-col'>
                                    <label>Project Name *</label>
                                    <input type="text" className="form-control" placeholder="Enter Project Name" required="required" onChange={(e) => handle(e)} id = 'project_name' value={formData.project_name}/>
                                </div>
                                <div className='form-group-col'>
                                    <label>Project Description *</label>
                                    <input type="text" className="form-control" placeholder="Enter Project Description" required="required" onChange={(e) => handle(e)} id = 'project_description' value={formData.project_description}/>
                                </div>
                            </div>
                            <div className='flex flex-direction-row flex-gap-10'>
                                <button type="submit" className="btn-primary-style" disabled={loader === true ? true : false}>
                                    {
                                        loader === true ? <Audio type="Circles" color="#ff" height={20} width={20}  /> : ""
                                    }
                                    {
                                        (loader) === true ? "Adding" : "Add Project"
                                    }
                                </button>
                                <button type="reset" className="btn-primary-style">Reset</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </IconContext.Provider>
        </>
    )
}

export default Addproject
