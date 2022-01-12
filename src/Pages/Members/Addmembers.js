import React from 'react'
import './members.css'
import UserIcon from '../../Images/user_icon.png';

function Addmembers() {
    return (
        <>
            <div className='project-list-wrapper'>
                <div className='member-card-wrapper'>
                    <div className='cardboxshadows'>
                        <h4>Add Members</h4>
                        <form >
                            <div>
                                <div className='form-group-col'>
                                    <label>First Name *</label>
                                    <input type="text" className="form-control" placeholder="Enter your first name" />
                                </div>
                                <div className='form-group-col'>
                                    <label>Last Name *</label>
                                    <input type="text" className="form-control" placeholder="Enter your last name" />
                                </div>
                                <div className='form-group-col'>
                                    <label>Email ID</label>
                                    <input type="email" className="form-control" placeholder="Enter your email address" />
                                </div>
                                <div className='form-group-col'>
                                    <label>Phone Number *</label>
                                    <input type="phone" className="form-control" placeholder="Enter your phone number" />
                                </div>
                            </div>
                            <div className='flex flex-direction-row flex-gap-10 form-action' >
                                <button type="submit" className="btn-primary-style">
                                    Add Member
                                </button>
                                <button type="reset" className="btn-primary-style">Reset</button>
                            </div>
                        </form>
                    </div>
                    <div className='cardboxshadows'>
                        <h4>Upload Photo</h4>
                        <form >
                            <div className='upload-photo-wrapper'>
                                <img src={UserIcon}></img>
                                <div className='form-group-col'>
                                    <input type="file" className="form-control upload-photo" placeholder="Enter your first name" />
                                    <button type="submit" className="btn-primary-style">
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
