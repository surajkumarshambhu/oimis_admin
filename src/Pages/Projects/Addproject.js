import React from 'react'
import './project.css'
import { IconContext } from 'react-icons/lib';

function Addproject() {
    return (
        <>
        <IconContext.Provider value={{ color: '#fff',size: '20px' }}>
            <div className='project-list-wrapper'>
                <div className='flex flex-gap10 aling-item-unset add-project-wrapper'>
                    <div className='cardboxshadows'>
                        <h4>Add Project</h4>
                        <form >
                            <div>
                                <div className='form-group-col'>
                                    <label>Name *</label>
                                    <input type="text" className="form-control" placeholder="Enter product name" />
                                </div>
                                <div className='form-group-col'>
                                    <label>Brand Name *</label>
                                    <input type="text" className="form-control" placeholder="Enter brand name" />
                                </div>
                            </div>
                            <div className='flex flex-direction-row flex-gap-10'>
                                <button type="submit" className="btn-primary-style">
                                    Add Product
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
