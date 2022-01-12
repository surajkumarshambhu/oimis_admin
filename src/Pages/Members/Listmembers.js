import React from 'react'
import './members.css'
import { IconContext } from 'react-icons/lib';
import UserIcon from '../../Images/user_icon.png';
import {Table, TableBody, TableCell ,TableContainer,
    TableHead, TableRow, Paper, TablePagination} from '@mui/material';
import * as AiIcons from 'react-icons/ai';

function Listmembers() {
    return (
        <>
        <IconContext.Provider value={{ color: '#fff',size: '20px' }}>
            <div className='project-list-wrapper'>
                <div className='flex flex-direction-row justify-content-space-between'>
                    <div>
                            <h4>Officers & Supervisors.</h4>
                            <p>All our hardworking Artisan Staff with contact numbers and email ids.</p>
                    </div>
                    <div className='flex flex-direction-row flex-gap10'>
                        <button className='btn'>
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
                                <TableRow >
                                    <TableCell>
                                        <div className='flex profile-wrapper'>
                                            <img src={UserIcon}></img>
                                            <span>Md. Baharul Islam</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>1st may, 2020</TableCell>
                                    <TableCell>8011991949</TableCell>
                                    <TableCell>Chief Elect. Inst.</TableCell>
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
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10,10]}
                        component="div"
                        count={10}
                        rowsPerPage={10}
                        page={1}
                        // onPageChange={handleChangePage}
                        // onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </div>
            </div>
        </IconContext.Provider>
        </>
    )
}

export default Listmembers
