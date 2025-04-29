import React, { useContext, useEffect, useRef, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { useFormik } from 'formik'
import axios from 'axios'
import { Link, NavLink } from 'react-router-dom'
import { UserContext } from '../context/User';

function User() {

    const [open, setOpen] = useState(true);
    const [error, setError] = useState('');
    const [selectedUser, setSelectedUser] = useState()
    const { user, isLogin, setUserCount, userCount, deleteUser } = useContext(UserContext);
    const modalRef = useRef(null);
    console.log('get', user);

    const columns = [
        { field: 'name', headerName: 'اسم ', width: 100 },
        { field: 'email', headerName: 'البريد الالكتروني ', width: 100 },
        { field: 'role', headerName: 'النوع ', width: 80 },
        { field: 'address', headerName: 'العنوان ', width: 150 },
        { field: 'debt', headerName: 'debt ', width: 80 },
        { field: 'financialStatus', headerName: 'financialStatus ', width: 150 },
        { field: 'installments', headerName: 'installments ', width: 100 },
        {
            field: 'تعديل',
            headerName: 'تعديل',
            width: 100,
            renderCell: (params) => (
                <div className='action' style={{ gap: '20px', display: 'flex' }} data-bs-toggle="modal" data-bs-target="#editModal" onClick={() => handleEdit(params.row)}>
                    <Link to={``} state={{ rowData: params.row }} className='edit'>
                        <i className="fa-solid fa-pen-to-square editIcon"></i>
                    </Link>
                </div>
            ),
        },
        {
            field: 'حذف',
            headerName: 'حذف',
            width: 100,
            renderCell: (params) => (
                <div className='action' style={{ gap: '20px', display: 'flex' }}>
                    <Link className='Delete' onClick={() => deleteUser(params.row._id)}>
                        <i className="fa-solid fa-trash-can DeleteIcon"></i>
                    </Link>
                </div>
            ),
        }
    ];
    const handleEdit = (userData) => {
        setSelectedUser(userData);
        editFormik.setValues({
            name: userData.name,
            email: userData.email,
            role: userData.role,
            address: userData.address,
            financialStatus: userData.financialStatus,
            installments: userData.installments,
            debt: userData.debt
        });

    };

    const editUser = async () => {
        try {
            let token = localStorage.getItem('token');
            const { data } = await axios.patch(
                `https://backendinsurance.onrender.com/api/v1/admin/update/${selectedUser._id}`,
                editFormik.values,
                {
                    headers: { Authorization: `islam__${token}` }
                }
            );

            if (data.message === 'success') {
                setError('');
                editFormik.resetForm();
                setUserCount((prev) => prev + 1);
                if (modalRef.current) {
                    modalRef.current.click();
                }
            } else {
                setError(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            setError("حدث خطأ في التعديل. من فضلك حاول مرة أخرى.");
        }
    };

    const editFormik = useFormik({
        initialValues: {
            name: '',
            email: '',
            role: '',
            address: ''
        },
        onSubmit: editUser
    });
    const AddUser = async () => {
        try {
            let token = localStorage.getItem('token');
            console.log("Token from LocalStorage:", token);

            const { data } = await axios.post(
                `https://backendinsurance.onrender.com/api/v1/admin/adduser`,
                formik.values,
                {
                    headers: {
                        Authorization: `islam__${token}`
                    }
                }
            );

            console.log('Response:', data.message);
            if (data.message === 'sucsses') {
                setError('');
                setOpen(false);
                formik.resetForm();
                setUserCount((prev) => prev + 1)
                console.log('userCount', userCount)

                if (modalRef.current) {
                    modalRef.current.click();
                }

            } else {
                setError(data.message);
            }

        } catch (error) {
            console.error('Error:', error);
            setError("حدث خطأ في الإضافة. من فضلك حاول مرة أخرى.");
        }
    };

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            role: '',
            address: ''
        },
        onSubmit: AddUser
    });


    return (
        <div>
            <div className='my-3'>
                <h1 className='text-2xl py-2'>المستخدمين</h1>
                <div className='text-xs text-gray-500 mb-9'>
                    <NavLink to="/home"> الصفحة الرئيسية </NavLink> /
                    <NavLink to="/user"> المستخدمين</NavLink>
                </div>
                <div>
                    <Link to='/Add_user' data-bs-toggle="modal" data-bs-target="#exampleModal"
                        className="bg-blue-500 text-white px-4 py-2 rounded mb-3 hover:bg-blue-700">
                        اضافة مستخدم
                    </Link>

                    <div className='my-10 bg-white'>
                        <DataGrid
                            rows={user}
                            columns={columns}
                            getRowId={(row) => row._id}
                            disableDensitySelector
                            disableColumnSelector
                        />
                    </div>
                </div>
            </div>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header flex justify-between">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">اضافة شركة</h1>
                            <button type="button" className="btn-close m-0" data-bs-dismiss="modal" aria-label="Close" ref={modalRef}></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={formik.handleSubmit}>
                                <div className='text-right mb-3 mr-2'>
                                    <label htmlFor="name" className="form-label text-xs">الاسم</label>
                                    <input type="text" className="form-control" id="name"
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        value={formik.values.name} />
                                </div>
                                <div className='text-right mb-3 mr-2'>
                                    <label htmlFor="email" className="form-label text-xs">البريد الإلكتروني</label>
                                    <input type="email" className="form-control" id="email"
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        value={formik.values.email} />
                                </div>
                                <div className='text-right mb-3 mr-2'>
                                    <label htmlFor="password" className="form-label text-xs">كلمة المرور</label>
                                    <input type="password" className="form-control" id="password"
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        value={formik.values.password} />
                                </div>
                                <div className='text-right mb-3 mr-2'>
                                    <label htmlFor="address" className="form-label text-xs">العنوان</label>
                                    <input type="text" className="form-control" id="address"
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        value={formik.values.address} />
                                </div>
                                <select name="role" id="role" className='mb-3'
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.role} >
                                    <option value="">اختار نوع المستخدم</option>
                                    <option value="admin">ادمن</option>
                                    <option value="agents">مستخدم</option>
                                </select>
                                <br />
                                {error && (
                                    <div className="alert alert-danger m-auto my-2" style={{ width: '100%', borderRadius: '10px' }}>
                                        {error}
                                    </div>
                                )}
                                <div className='flex justify-between'>
                                    <input type="submit" className="btn bg-blue-700 text-white border border-gray-500 hover:bg-blue-700" value='اضافة' />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5">تعديل مستخدم</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={modalRef}></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={editFormik.handleSubmit}>
                                <label>الاسم</label>
                                <input type="text" name="name" className="form-control" onChange={editFormik.handleChange} value={editFormik.values.name} />
                                <label>البريد الإلكتروني</label>
                                <input type="email" name="email" className="form-control" onChange={editFormik.handleChange} value={editFormik.values.email} />
                                <label>العنوان</label>
                                <input type="text" name="address" className="form-control" onChange={editFormik.handleChange} value={editFormik.values.address} />
                                <label>نوع المستخدم</label>
                                <select name="role" className="form-control" onChange={editFormik.handleChange} value={editFormik.values.role}>
                                    <option value="">اختار نوع المستخدم</option>
                                    <option value="admin">ادمن</option>
                                    <option value="agents">مستخدم</option>
                                </select>
                                {error && <div className="alert alert-danger">{error}</div>}
                                <button type="submit" className="btn btn-primary">تعديل</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default User;
