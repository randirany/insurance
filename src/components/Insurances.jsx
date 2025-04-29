import React, { useContext, useRef, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Link, Links, NavLink } from 'react-router-dom'
import { UserContext } from '../context/User';
import { useFormik } from 'formik';
import axios from 'axios';

function Insurances() {
    const { setInsuranceCount, insureds, deleteInsurance } = useContext(UserContext);
    const [selectedUser, setSelectedUser] = useState()
    const modalRef = useRef(null);
    const [error, setError] = useState('');
    const [imagePreview, setImagePreview] = useState(null)
    const [loading, setLoading] = useState(false)


    // const editInsurance = async () => {
    //     try {
    //         let token = localStorage.getItem('token');
    //         const { data } = await axios.patch(
    //             `https://backendinsurance.onrender.com/api/v1/insured/update/${selectedUser._id}`,
    //             editFormik.values,
    //             {
    //                 headers: { Authorization: `islam__${token}` }
    //             }
    //         );

    //         if (data.message === 'success') {
    //             setError('');
    //             editFormik.resetForm();
    //             setInsuranceCount((prev) => prev + 1);
    //             if (modalRef.current) {
    //                 modalRef.current.click();
    //             }
    //         } else {
    //             setError(data.message);
    //         }
    //     } catch (error) {
    //         console.error('Error:', error);
    //         setError("حدث خطأ في التعديل. من فضلك حاول مرة أخرى.");
    //     }
    // }  
    const editFormik = useFormik({
        initialValues: {
            fileNumber: "",
            name: "",
            id_Number: "",
            phone_number: "",
            joining_date: "",
            notes: "",
            image: "",
        },
        onSubmit: async () => {
            try {
                let token = localStorage.getItem('token');
                const { data } = await axios.patch(
                    `https://backendinsurance.onrender.com/api/v1/insured/update/${selectedUser._id}`,
                    editFormik.values,
                    {
                        headers: { Authorization: `islam__${token}` }
                    }
                );

                if (data.message === 'success') {
                    setError('');
                    editFormik.resetForm();
                    setInsuranceCount((prev) => prev + 1);
                    if (modalRef.current) {
                        console.log('close ')
                        modalRef.current.click();
                    }
                } else {
                    setError(data.message);
                }
            } catch (error) {
                console.error('Error:', error);
                setError("حدث خطأ في التعديل. من فضلك حاول مرة أخرى.");
            }
        }
    });
    const handleImageChange = (event) => {
        const file = event.currentTarget.files[0]
        if (file) {
            editFormik.setFieldValue("image", file)
            const reader = new FileReader()
            reader.onload = () => {
                setImagePreview(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }
    const formatDate = (dateString) => {
        console.log('form', dateString);
        if (!dateString) return ""

        try {
            console.log('form', dateString);
            return new Date(dateString).toLocaleDateString("ar-EG", {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            })
        } catch (error) {
            console.error("خطأ في تنسيق التاريخ:", error)
            return dateString
        }
    }

    const columns = [
        { field: 'name', headerName: 'الاسم الرباعي', width: 100 },
        { field: 'fileNumber', headerName: 'رقم الملف', width: 80 },
        { field: 'phone_number', headerName: 'رقم الهاتف', width: 120 },
        { field: 'id_Number', headerName: 'رقم الهوية', width: 120 },
        { field: 'joining_date', headerName: 'تاريخ الانضمام', width: 120, valueFormatter: (params) => formatDate(params) },
        { field: 'notes', headerName: 'الملاحظات', width: 200 },
        {
            field: 'show', headerName: 'عرض', width: 80,
            renderCell: (params) => {
                return (
                    <div className='action' style={{ gap: '20px', display: 'flex' }}>
                        <Link to={`/detailsInsurance/${params.row._id}`}
                            state={{ rowData: params.row }}
                            className='show'>
                            <i className="material-icons">remove_red_eye    </i>

                        </Link>

                    </div>
                );
            },
        },
        {
            field: 'تعديل',
            headerName: 'تعديل',
            width: 100,
            renderCell: (params) => (
                <div>
                    <div className='action' style={{ gap: '20px', display: 'flex' }}>
                        <Link to={``} state={{ rowData: params.row }} className='edit' data-bs-toggle="modal" data-bs-target="#editInsuranceModal" onClick={() => EditInsurance(params.row)}>
                            <i className="fa-solid fa-pen-to-square editIcon"></i>
                        </Link>
                        <Link className='Delete' onClick={() => deleteInsurance(params.row._id)}>
                            <i className="fa-solid fa-trash-can DeleteIcon"></i>
                        </Link>
                    </div>
                </div>
            ),
        }
    ];

    const printTable = () => {
        const printableContent = `
            <html>
            <head>
                <title>طباعة البيانات</title>
                <style>
                    body { direction: rtl; font-family: Arial, sans-serif; }
                    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                    th, td { border: 1px solid black; padding: 8px; text-align: center; }
                    th { background-color: #f2f2f2; }
                    @media print { button { display: none; } }
                </style>
            </head>
            <body>
                <h2 style="text-align:center;">بيانات المؤمنين</h2>
                <table>
                    <thead>
                        <tr>
                            <th>الاسم الرباعي</th>
                            <th>رقم الملف</th>
                            <th>رقم الهاتف</th>
                            <th>رقم الهوية</th>
                            <th>تاريخ الانضمام</th>
                            <th>الملاحظات</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${insureds.map(row => {
            const formattedDate = new Date(row.joining_date).toLocaleDateString('ar-EG', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });

            return `
                            <tr>
                                <td>${row.name}</td>
                                <td>${row.fileNumber || ''}</td>
                                <td>${row.phone_number}</td>
                               <td>${row.id_Number}</td> 
                                     <td>${formattedDate}</td>

                                <td>${row.notes}</td>
                            </tr>
                            `;
        }).join('')}
                    </tbody>
                </table>
                <script>
                    window.onload = function() { window.print(); }
                </script>
            </body>
            </html>
        `;

        const printWindow = window.open('', '', 'width=800,height=600');
        printWindow.document.open();
        printWindow.document.write(printableContent);
        printWindow.document.close();
    };

    const EditInsurance = (userData) => {
        setSelectedUser(userData);
        editFormik.setValues({
            fileNumber: userData.fileNumber,
            name: userData.name,
            id_Number: userData.id_Number,
            phone_number: userData.phone_number,
            joining_date: userData.joining_date,
            notes: userData.notes,
            image: userData.image
        });

    };

    // const AddUser = async () => {
    //     try {
    //         let token = localStorage.getItem('token');
    //         console.log("Token from LocalStorage:", token);

    //         const { data } = await axios.post(
    //             `https://backendinsurance.onrender.com/api/v1/admin/adduser`,
    //             formik.values,
    //             {
    //                 headers: {
    //                     Authorization: `islam__${token}`
    //                 }
    //             }
    //         );

    //         console.log('Response:', data.message);
    //         if (data.message === 'sucsses') {
    //             setError('');
    //             setOpen(false);
    //             formik.resetForm();
    //             setInsuranceCount((prev) => prev + 1)
    //             console.log('userCount', userCount)

    //             if (modalRef.current) {
    //                 modalRef.current.click();
    //             }

    //         } else {
    //             setError(data.message);
    //         }

    //     } catch (error) {
    //         console.error('Error:', error);
    //         setError("حدث خطأ في الإضافة. من فضلك حاول مرة أخرى.");
    //     }
    // };

    return (
        <div className='w-full h-fit '>
            <div className='my-3 mx-3'>
                <h1 className='text-xl mb-3'>المؤمنين</h1>
                <div className='text-xs text-gray-500 mb-4'>
                    <NavLink to="/home">الصفحة الرئيسية</NavLink> /
                    <span> المؤمنين </span> /
                    <NavLink to="/AddInsurance">عرض جميع المؤمنين</NavLink>
                </div>
                <button
                    onClick={printTable}
                    className="bg-blue-500 text-white px-4 py-2 rounded mb-3 hover:bg-blue-700">
                    طباعة البيانات
                </button>
                <div className=' bg-slate-50 tableshow'>
                    <DataGrid
                        rows={insureds}
                        getRowId={(row) => row._id}
                        columns={columns}
                        disableDensitySelector
                        disableColumnSelector
                    />
                </div>
            </div>
            {/* <div className="modal fade" id="deleteInsurance" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
            </div> */}

            <div className="modal fade" id="editInsuranceModal" tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5">تعديل مستخدم</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={modalRef}></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={editFormik.handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                    <div>
                                        <label htmlFor="fileNumber" className="block text-sm font-medium text-gray-700 mb-1">
                                            رقم الملف
                                        </label>
                                        <input
                                            type="number"
                                            id="fileNumber"
                                            name="fileNumber"
                                            className={`w-full p-2 border rounded-md border-gray-300
                                                }`}
                                            onChange={editFormik.handleChange}
                                            value={editFormik.values.fileNumber}
                                        />

                                    </div>

                                    {/* الاسم */}
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                            الاسم
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            className={`w-full p-2 border rounded-md border-gray-300
                                                }`}
                                            onChange={editFormik.handleChange}
                                            value={editFormik.values.name}
                                        />

                                    </div>

                                    {/* رقم الهوية */}
                                    <div>
                                        <label htmlFor="id_Number" className="block text-sm font-medium text-gray-700 mb-1">
                                            رقم الهوية
                                        </label>
                                        <input
                                            type="number"
                                            id="id_Number"
                                            name="id_Number"
                                            className={`w-full p-2 border rounded-md border-gray-300
                                                }`}
                                            onChange={editFormik.handleChange}
                                            value={editFormik.values.id_Number}
                                        />

                                    </div>

                                    {/* رقم الهاتف */}
                                    <div>
                                        <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700 mb-1">
                                            رقم الهاتف
                                        </label>
                                        <input
                                            type="text"
                                            id="phone_number"
                                            name="phone_number"
                                            className={`w-full p-2 border rounded-md border-gray-300
                                                }`}
                                            onChange={editFormik.handleChange}
                                            value={editFormik.values.phone_number}
                                        />

                                    </div>

                                    <div>
                                        <label htmlFor="joining_date" className="block text-sm font-medium text-gray-700 mb-1">
                                            تاريخ الانضمام
                                        </label>
                                        <input
                                            type="date"
                                            id="joining_date"
                                            name="joining_date"
                                            className={`w-full p-2 border rounded-md border-gray-300
                                                }`}
                                            onChange={editFormik.handleChange}
                                            value={editFormik.values.joining_date}
                                        />

                                    </div>
                                    <div>
                                        <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                                            الصورة
                                        </label>
                                        <input
                                            type="file"
                                            id="image"
                                            name="image"
                                            accept="image/*"
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            onChange={handleImageChange}
                                        />
                                        {imagePreview && (
                                            <div className="mt-2">
                                                <img
                                                    src={imagePreview || "/placeholder.svg"}
                                                    alt="معاينة"
                                                    className="h-32 w-auto object-cover rounded-md"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                                        ملاحظات
                                    </label>
                                    <textarea
                                        id="notes"
                                        name="notes"
                                        rows="3"
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                        onChange={editFormik.handleChange}
                                        value={editFormik.values.notes}
                                    ></textarea>
                                </div>
                                {error && <div className="alert alert-danger">{error}</div>}

                                <div className="flex justify-center">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                                    >
                                        {loading ? "جاري ..." : "تعديل "}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Insurances;
