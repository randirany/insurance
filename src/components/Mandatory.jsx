import React from 'react'
import { DataGrid } from '@mui/x-data-grid';

import { Link, Links, NavLink } from 'react-router-dom'

function Mandatory() {
    const rows = [
        { id: 1, name: 'رند', },
        { id: 2, name: 'شهد', },
        { id: 3, name: 'رؤى', },
    ];

    const columns = [
        { field: 'name', headerName: '  اسم الشركة', width: 150 },
        {
            field: 'تعديل',
            headerName: 'تعديل',
            editable: false,
            width: 120,
            renderCell: (params) => {
                return (
                    <div className='action' style={{ gap: '20px', display: 'flex' }}>
                        <Link
                            to={``}
                            state={{ rowData: params.row }}
                            className='edit'
                        >
                            <i className="fa-solid fa-pen-to-square editIcon"></i>
                        </Link>

                    </div>
                );
            },
        }, {
            field: 'حذف',
            headerName: 'حذف',
            editable: false,
            width: 120,
            renderCell: (params) => {
                return (
                    <div className='action' style={{ gap: '20px', display: 'flex' }}>
                        <Link className='Delete' onClick={() => handleDelete(params.row._id)}>
                            <i className="fa-solid fa-trash-can DeleteIcon"></i>
                        </Link>
                    </div>
                );
            },
        }

    ];

    return (
        <div>

            <div className='my-3'>
                <h1 className='text-2xl py-2'>ادارة الزامي</h1>
                <div className='text-xs text-gray-500 mb-9'>
                    <NavLink to="/home"> الصفحة الرئيسية </NavLink>  /
                    <span > الشركات و الوكلاء </span>  /
                    <NavLink to="/AddInsurance">  الشركات الالزامية</NavLink>
                </div>
                <div>
                    <Link data-bs-toggle="modal" data-bs-target="#exampleModal"
                        className="bg-blue-500 text-white px-4 py-2 rounded mb-3 hover:bg-blue-700">
                        اضافة
                    </Link>

                    <div className='max-w-[450px] my-10 bg-white'>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            checkboxSelection
                            disableDensitySelector
                            disableColumnSelector
                        />
                    </div>
                </div>

            </div>
            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header flex justify-between ">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">اضافة شركة </h1>
                            <button type="button" className="btn-close m-0" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form action="">
                                <div className='text-right mb-3  mr-2'>
                                    <label for="exampleFormControlInput1" className="form-label text-xs">  اسم الشركة</label>
                                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="" />
                                </div>
                                <div className='flex justify-between'> <button className="btn bg-blue-700 text-white border border-gray-500 hover:bg-blue-700">إغلاق</button>

                                    <input type="submit" className="btn bg-blue-700 text-white border border-gray-500 hover:bg-blue-700" value='اضافة' />
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Mandatory