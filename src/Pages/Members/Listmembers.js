import  React, {useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import './members.css'
import UserIcon from '../../Images/user_icon.png'
import { IconContext } from 'react-icons/lib';
import {Table, TableBody, TableCell ,TableContainer,
    TableHead, TableRow, Paper, TablePagination, Dialog, DialogActions,DialogContent,DialogContentText,DialogTitle
    , Button} from '@mui/material';
import * as AiIcons from 'react-icons/ai';
import { BallTriangle } from  'react-loader-spinner'
import { ApiHelper } from '../../Helper/APIHelper';
import * as CONSTANT from '../../Helper/Constant';


function Listmembers() {

    const history = useNavigate();
    const [loader, setLoader] = useState(true)
    const [projectListArray, setProductListArray] = useState([]);
    const [formData,setFormData] = useState()
    const [totalRecord, setTotalRecord] = useState(0);
    const [page, setPage] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    const [toDeleteCode, setDeleteCode] = React.useState("");
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    function navigate(){
        history('/add-members')
    }

    const handleChangeRowsPerPage = (event) => {
       
    };

    useEffect(() => {
        setLoader(true)
        const requestBody = {request: {no_of_records:CONSTANT.NUMBEROFITEMS,page_number:page + 1,query:formData}}
        console.log(requestBody);
        let url = "admin/get-staffs";
        ApiHelper(url,requestBody,'POST')
        .then(resposnse => {
            setProductListArray(resposnse.data.staff_list.staff_list)
            setTotalRecord(resposnse.data.staff_list.total_records);
            setLoader(false)
        })
    }, [page]);

    // function handle(e){
    //     setFormData(e.target.value)
    //     console.log(formData)
    // }

    // function submit(){
    //     setLoader(true)
    //     const requestBody = {request: {no_of_records:CONSTANT.NUMBEROFITEMS,page_number:page + 1,query:formData}}
    //     console.log(requestBody);
    //     let url = "admin/get-staffs";
    //     ApiHelper(url,requestBody,'POST')
    //     .then(resposnse => {
    //         setProductListArray(resposnse.data.staff_list.staff_list)
    //         setTotalRecord(resposnse.data.staff_list.total_records);
    //         setLoader(false)
    //     })
    //     setLoader(false)
    // }

    const handleClose = () => {
        setOpen(false);
        setDeleteCode('')
    };

    const handleAgreeClose = () => {
        const requestBody = {request: {id:toDeleteCode}}
        let url = "admin/delete-project";
        ApiHelper(url,requestBody,'POST')
        .then(resposnse => {
            setPage(0)
        })
        setOpen(false);
    };

    // const handleClickOpen = (e,data) => {
    //     setOpen(true);
    //     setDeleteCode(data)
    // };

    return (
        <>
        <IconContext.Provider value={{ color: '#fff',size: '20px' }}>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">
                {"Are you sure you want to delete this product?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure you want to delete this product? This operation will lead to permanent deletion of the selected product.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Disagree</Button>
                <Button onClick={handleAgreeClose} autoFocus>
                    Agree
                </Button>
            </DialogActions>
            </Dialog>
            <div className='project-list-wrapper'>
                <div className='flex flex-direction-row justify-content-space-between'>
                    <div>
                            <h4>Officers & Supervisors.</h4>
                            <p>All our hardworking Artisan Staff with contact numbers and email ids.</p>
                    </div>
                    <div className='flex flex-direction-row flex-gap10'>
                        <button className='btn' onClick={()=>navigate()}>
                            <AiIcons.AiOutlinePlus></AiIcons.AiOutlinePlus>
                            <span>Add Members</span>
                        </button>
                        <div>
                           <input type="text" className="form-control unset-margin" placeholder="Search" />
                        </div>
                        <button className='btn' >
                            <AiIcons.AiOutlineSearch></AiIcons.AiOutlineSearch>
                            <span>Search</span>
                        </button>
                    </div>
                </div>
                <div className='project-table-wrapper'>
                    <TableContainer component={Paper} sx={{ maxHeight:550 }} >
                        { loader ? <div className='loader-class'><BallTriangle className='loader-class' color="#32BDEA" height={100} width={100}/></div> : 
                        <Table sx={{ minWidth: 900 }} stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Contact Number</TableCell>
                                    <TableCell>Email ID</TableCell>
                                    <TableCell>Designation</TableCell>
                                    <TableCell align="center">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {projectListArray.map((row,key) => ( 
                                <TableRow key={key} >
                                    <TableCell>
                                        <div className='flex profile-wrapper'>
                                            <img src={row.file_path === null ? UserIcon : CONSTANT.URL+row.file_path} alt='user-icon'></img>
                                            <span>{row.first_name + row.last_name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>{row.phone_number}</TableCell>
                                    <TableCell>{row.email}</TableCell>
                                    <TableCell>{row.designation}</TableCell>
                                    <TableCell>
                                        <div className='flex flex-direction-row flex-gap-10'>
                                            <button className='cardsBoxShadow btn'>
                                                <AiIcons.AiOutlineEye></AiIcons.AiOutlineEye>
                                            </button>
                                            <button className='cardsBoxShadow btn'>
                                                <AiIcons.AiOutlineDelete></AiIcons.AiOutlineDelete>
                                            </button>
                                        </div>    
                                    </TableCell> 
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    }
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[]}
                        component="div"
                        count={totalRecord}
                        rowsPerPage={10}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </div>
            </div>
        </IconContext.Provider>
        </>
    )
}

export default Listmembers
