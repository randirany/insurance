'use client';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { X } from 'lucide-react';
import AddCustomer from './AddCustomer'; // تأكد من وجود كومبوننت لإضافة العميل.

import Add_vehicle from './Add_vehicle';
import { useNavigate } from 'react-router-dom';

export default function Customers() {
    const navigate = useNavigate();

    const [customers, setCustomers] = useState([]);
    const [anchorEls, setAnchorEls] = useState({});
    const [formData, setFormData] = useState({});
    const [showForm, setShowForm] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [selectedInsuredId, setSelectedInsuredId] = useState(null); // لتخزين الـ insuredId

    const handleMenuOpen = (event, rowId) => {
        setAnchorEls((prev) => ({ ...prev, [rowId]: event.currentTarget }));
    };

    const handleMenuClose = () => {
        setAnchorEls({});
    };

    const fetchCustomers = async () => {
        try {
            const token = `islam__${localStorage.getItem("token")}`;
            const res = await axios.get(`http://localhost:3002/api/v1/insured/allInsured`, {
                headers: { token }
            });

            const formattedData = res.data.insuredList.map(item => ({
                id: item._id,
                first_name: item.first_name,
                last_name: item.last_name,
                id_Number: item.id_Number,
                phone_number: item.phone_number,
                joining_date: item.joining_date ? item.joining_date.slice(0, 10) : '',
                notes: item.notes,
                city: item.city,
                birth_date: item.birth_date ? item.birth_date.slice(0, 10) : '',
                name: `${item.first_name} ${item.last_name}`,
                Mobile: item.phone_number,
                address: item.city,
                Identity: item.id_Number,
                email: item.email,
                agent: item.agentsName,
            }));

            setCustomers(formattedData);
        } catch (err) {
            console.error('Error fetching customers:', err);
        }
    };

    const handleEdit = (customer) => {
        setSelectedCustomer(customer.id);
        setFormData({
            first_name: customer.first_name,
            last_name: customer.last_name,
            id_Number: customer.id_Number,
            phone_number: customer.phone_number,
            joining_date: customer.joining_date,
            notes: customer.notes,
            city: customer.city,
            birth_date: customer.birth_date,
        });
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        const token = `islam__${localStorage.getItem("token")}`;
        try {
            await axios.delete(`http://localhost:3002/api/v1/insured/deleteInsured/${id}`, {
                headers: { token }
            });
            fetchCustomers();
            handleMenuClose();
        } catch (err) {
            console.error("Error deleting customer:", err);
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = `islam__${localStorage.getItem("token")}`;

        try {
            await axios.patch(`http://localhost:3002/api/v1/insured/updateInsured/${selectedCustomer}`, formData, {
                headers: { token }
            });

            fetchCustomers();
            setShowForm(false);
            setFormData({});
            setSelectedCustomer(null);
        } catch (err) {
            console.error('Error updating customer:', err);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    const columns = [
        { field: 'name', headerName: 'Name', flex: 1 },
        { field: 'Mobile', headerName: 'Mobile', flex: 1 },
        { field: 'address', headerName: 'Address', flex: 1 },
        { field: 'Identity', headerName: 'Identity', flex: 1 },
        { field: 'email', headerName: 'Email', flex: 1 },
        { field: 'agent', headerName: 'Agent', flex: 1 },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 0.5,
            sortable: false,
            disableColumnMenu: true,
            renderCell: (params) => (
                <>
                    <IconButton
                        onClick={(event) => handleMenuOpen(event, params.row.id)}
                    >
                        <MoreVertIcon />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEls[params.row.id]}
                        open={Boolean(anchorEls[params.row.id])}
                        onClose={handleMenuClose}
                    >
                        <MenuItem onClick={() => handleEdit(params.row)}>
                            <EditIcon className="mr-2" /> Edit
                        </MenuItem>
                        <MenuItem onClick={() => handleDelete(params.row.id)}>
                            🗑️ Delete
                        </MenuItem>
                       
       <MenuItem onClick={async () => {
                        await Add_vehicle(params.row.id);
                          await  setSelectedInsuredId(params.row.id);
                           await handleMenuClose();
                           //await navigate('/profile', { state: { insuredId: params.row.id } });
                        }}>
                            🚗 Add Vehicle
                        </MenuItem>
                    </Menu>
                </>
            ),
        }
    ];
    return (
        <div className="p-4" style={{ minHeight: '100vh' }}
        >
            {/* Header with Add Customer button */}
            <div className="flex justify-between items-center mb-4" >
                <h1 className="text-2xl font-bold">Customers</h1>
                <button
                    onClick={() => setShowAddForm(true)}
                    className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 "
                >
                    Add Customer +
                </button>
            </div>

            {/* DataGrid */}
            <DataGrid
                rows={customers}
                columns={columns}
                autoHeight
                pageSize={10}
                rowsPerPageOptions={[10, 20, 50]}
                disableSelectionOnClick
                getRowId={(row) => row.id}

            />

            {/* Edit Customer Form */}
            {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="2md:w-75 w-full max-w-[800px] bg-white rounded-lg shadow-lg p-6">
                        <div className="flex items-center justify-between pb-1 p-2 rounded-md">
                            <h2 className="text-2xl font-semibold rounded-md">Edit Customer</h2>
                            <button onClick={() => setShowForm(false)} className="p-1 rounded-full hover:bg-gray-100">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="mt-2 space-y-4 border border-gray-300 rounded-md">
                            <div className="grid grid-cols-2 gap-3 px-4 py-4">
                                <div>
                                    <label className="block text-sm font-medium">First Name</label>
                                    <input type="text" name="first_name" className="w-full p-2 border rounded-md" value={formData.first_name} onChange={handleInputChange} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Last Name</label>
                                    <input type="text" name="last_name" className="w-full p-2 border rounded-md" value={formData.last_name} onChange={handleInputChange} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">ID Number</label>
                                    <input type="text" name="id_Number" className="w-full p-2 border rounded-md" value={formData.id_Number} onChange={handleInputChange} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Phone Number</label>
                                    <input type="text" name="phone_number" className="w-full p-2 border rounded-md" value={formData.phone_number} onChange={handleInputChange} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Joining Date</label>
                                    <input type="date" name="joining_date" className="w-full p-2 border rounded-md" value={formData.joining_date} onChange={handleInputChange} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Birth Date</label>
                                    <input type="date" name="birth_date" className="w-full p-2 border rounded-md" value={formData.birth_date} onChange={handleInputChange} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">City</label>
                                    <input type="text" name="city" className="w-full p-2 border rounded-md" value={formData.city} onChange={handleInputChange} />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium">Notes</label>
                                    <textarea name="notes" rows="2" className="w-full p-2 border rounded-md" value={formData.notes} onChange={handleInputChange} />
                                </div>
                            </div>

                            <div className="flex justify-end px-4 pb-4">
                                <button type="submit" className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-500">
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Add Customer Form (if open) */}
            {showAddForm && (
                <AddCustomer
                    isOpen={showAddForm}
                    onClose={(closed) => {
                        setShowAddForm(closed);
                        fetchCustomers();
                    }}
                />
            )}

            {/* Add Vehicle Form (if open) */}
            {selectedInsuredId && (
                
                <Add_vehicle
                    isOpen={true}
                    insuredId={selectedInsuredId}
                    onClose={() => setSelectedInsuredId(null)}
                />
            )}
        </div>
    );
}
