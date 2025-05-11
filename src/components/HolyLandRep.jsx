
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Menu, MenuItem, CircularProgress, Box, Button } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from 'react';
import axios from 'axios';
import InsuranceHoliRep from './InsuranceHoliRep';

function HolyLandRep() {
    const [holiReports, setHoliReports] = useState([]);
    const [anchorEls, setAnchorEls] = useState({});
    const [showAddReportForm, setShowAddReportForm] = useState(false);
    const [loading, setLoading] = useState(true);

    const handleMenuOpen = (event, rowId) => {
        setAnchorEls((prev) => ({ ...prev, [rowId]: event.currentTarget }));
    };

    const handleMenuClose = () => {
        setAnchorEls({});
    };

    const fetchHoliReports = async () => {
        setLoading(true);
        try {
            const token = `islam__${localStorage.getItem("token")}`;
            const res = await axios.get(`https://backendinstursed.onrender.com/api/v1/HolyLand/all`, { // استبدل بالمسار الصحيح
                headers: { token }
            });

            const reports = res.data.findAll || res.data.data || res.data;
            if (!Array.isArray(reports)) {
                console.error("Fetched Holi reports data is not an array:", reports);
                setHoliReports([]);
                setLoading(false);
                return;
            }

            const formattedData = reports.map(report => ({
                id: report._id,
                reportIdDisplay: report._id.slice(-6).toUpperCase(),
                policyNumber: report.insuranceDetails?.policyNumber || 'N/A',
                accidentDate: report.accidentDetails?.accidentDate ? new Date(report.accidentDetails.accidentDate).toLocaleDateString() : 'N/A',
                accidentLocation: report.accidentDetails?.accidentLocation || 'N/A',
                insuredName: report.insuredId?.first_name ? `${report.insuredId.first_name} ${report.insuredId.last_name}` : (report.ownerAndDriverDetails?.ownerName || 'N/A'),
                driverName: report.ownerAndDriverDetails?.driverName || 'N/A',
                vehiclePlateNumber: report.vehicleDetails?.plateNumber || 'N/A',
            }));
            setHoliReports(formattedData);
        } catch (err) {
            console.error('Error fetching Holi reports:', err);
            setHoliReports([]);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this report?')) return;
        const token = `islam__${localStorage.getItem("token")}`;
        try {

            await axios.delete(`https://backendinstursed.onrender.com/api/v1/HolyLand/delete/${id}`, { // استبدل بالمسار الصحيح
                headers: { token }
            });
            fetchHoliReports();
            handleMenuClose();
        } catch (err) {
            console.error("Error deleting Holi report:", err);
            alert('Failed to delete report. See console for details.');
        }
    };
    useEffect(() => {
        fetchHoliReports();
    }, []);

    const columns = [
        { field: 'reportIdDisplay', headerName:"Report Id", flex: 0.8 },
        { field: 'policyNumber', headerName: "Policy No.", flex: 1 },
        { field: 'accidentDate', headerName: "Accident Date", flex: 1 },
        { field: 'accidentLocation', headerName: 'location', flex: 1.5 },
        { field: 'insuredName', headerName: 'insured Name', flex: 1.5 },
        { field: 'driverName', headerName: "Driver Name", flex: 1.5 },
        { field: 'vehiclePlateNumber', headerName: "Vehicle Plate No.", flex: 1 },
        {
            field: 'actions',
            headerName: "Actions",
            flex: 0.5,
            sortable: false,
            disableColumnMenu: true,
            renderCell: (params) => (
                <>
                    <IconButton
                        aria-label="actions"
                        onClick={(event) => handleMenuOpen(event, params.row.id)}
                    >
                        <MoreVertIcon />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEls[params.row.id]}
                        open={Boolean(anchorEls[params.row.id])}
                        onClose={handleMenuClose}
                    >
                        <MenuItem onClick={() => handleDelete(params.row.id)}>
                            <DeleteIcon sx={{ mr: 1 }} />Delete
                        </MenuItem>
                    </Menu>
                </>
            ),
        },
    ];

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" sx={{ minHeight: '80vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <div className="p-4" style={{ minHeight: '100vh' }}>

            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">HolyLand Accident Reports</h1>
                <button
                    onClick={() => {

                        setShowAddReportForm(true);
                    }}
                    className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                >
                    <AddIcon sx={{ mr: 0.5 }} />                   Add HolyLand Report

                </button>
            </div>
            <Box sx={{ width: '100%' }}>
                <DataGrid
                    rows={holiReports}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { pageSize: 10, page: 0 },
                        },
                    }}
                    pageSizeOptions={[5, 10, 25, 50]}
                    disableRowSelectionOnClick
                    getRowId={(row) => row.id}
                    sx={{
                        '& .MuiDataGrid-columnHeaders': {
                            backgroundColor: '#f0f0f0',
                            fontWeight: 'bold',
                            fontSize: '0.875rem',
                        },
                        '& .MuiDataGrid-cell': {
                            fontSize: '0.875rem',
                        },
                        '& .MuiDataGrid-footerContainer': {
                            backgroundColor: '#f0f0f0',
                        }
                    }}
                />
            </Box>

            {showAddReportForm && (
                <InsuranceHoliRep
                    isOpen={showAddReportForm}
                    onClose={() => {
                        setShowAddReportForm(false);
                        fetchHoliReports();

                    }}
                />
            )}
        </div>
    );
}

export default HolyLandRep