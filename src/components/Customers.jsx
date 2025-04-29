import { DataGrid } from '@mui/x-data-grid';
import  { useState } from 'react';
import {  NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import AddCustomer from './AddCustomer';
// Import MUI components for the action menu
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert'; // Import the three dots icon

function Customers() {
    const { t, i18n: { language } } = useTranslation();
    const [isAddCustomerOpen, setAddCustomerOpen] = useState(false);
    const navigate = useNavigate();

    // --- State for the Action Menu ---
    const [anchorEl, setAnchorEl] = useState(null); // Anchor element for the menu
    const [selectedRowId, setSelectedRowId] = useState(null); // ID of the row whose menu is open
    const isMenuOpen = Boolean(anchorEl);

    // --- Dummy Data (Keep your actual data fetching logic if you have one) ---
    const rows = [
        { id: 1, name: 'Islam Tubasi', Mobile: '0566008007', address: 'Ramallah', Identity: 402696017, join_date: '1/1/2025' },
        { id: 2, name: 'Islam Tubasi', Mobile: '0566008007', address: 'Ramallah', Identity: 402696017, join_date: '1/1/2025' },
        { id: 3, name: 'Islam Tubasi', Mobile: '0566008007', address: 'Ramallah', Identity: 402696017, join_date: '1/1/2025' },
        { id: 4, name: 'Islam Tubasi', Mobile: '0566008007', address: 'Ramallah', Identity: 402696017, join_date: '1/1/2025' },
    ];

    // --- Menu Handlers ---
    const handleMenuOpen = (event, id) => {
        setAnchorEl(event.currentTarget);
        setSelectedRowId(id);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedRowId(null);
    };

    const handleEdit = () => {
        console.log(`Edit clicked for row id: ${selectedRowId}`);
        // Add your Edit logic here (e.g., open an edit modal, navigate to edit page)
        handleMenuClose(); // Close the menu after clicking
    };

    const handleDelete = () => {
        console.log(`Delete clicked for row id: ${selectedRowId}`);
        // Add your Delete logic here (e.g., show confirmation, call API to delete)
        // You might need to update the 'rows' state after deletion
        handleMenuClose(); // Close the menu after clicking
    };

    // --- Columns Definition ---
    const columns = [
        { field: 'name', headerName: t('customers.columns.name', 'NAME'), flex: 1 }, // Example using t() for headers
        { field: 'Mobile', headerName: t('customers.columns.mobile', 'MOBILE'), flex: 1 },
        { field: 'address', headerName: t('customers.columns.address', 'ADDRESS'), flex: 1 },
        { field: 'Identity', headerName: t('customers.columns.identity', 'IDENTITY'), flex: 1, sortable: false }, // Identity might not be sortable
        { field: 'join_date', headerName: t('customers.columns.joinDate', 'JOIN DATE'), flex: 1 },
        {
            field: 'actions',
            headerName: t('customers.columns.action', 'ACTION'), // Use t() for Action header
            flex: 0.5, // Adjust flex/width as needed
            sortable: false,
            disableColumnMenu: true,
            renderCell: (params) => {
                return (
                    <IconButton
                        aria-label="actions"
                        aria-controls={`actions-menu-${params.row.id}`}
                        aria-haspopup="true"
                        onClick={(event) => handleMenuOpen(event, params.row.id)}
                    >
                        <MoreVertIcon />
                    </IconButton>
                );
            },
        },
    ];

    return (
        <div className='navblayout'>
            {/* --- Top Bar --- */}
            <div className='bg-white flex p-[22px] rounded-md justify-between items-center'>
                <div className='flex gap-[14px] items-center'> {/* Added items-center */}
                    <NavLink to="/home" className="text-gray-600 hover:text-blue-600"> {/* Added styling */}
                        {t("customers.firstTitle")}
                    </NavLink>
                    <svg width="16" height="16" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg"> {/* Adjusted size */}
                        <path fillRule="evenodd" clipRule="evenodd" d="M11.9392 4.55806C12.1833 4.31398 12.579 4.31398 12.8231 4.55806L17.8231 9.55806C18.0672 9.80214 18.0672 10.1979 17.8231 10.4419L12.8231 15.4419C12.579 15.686 12.1833 15.686 11.9392 15.4419C11.6952 15.1979 11.6952 14.8021 11.9392 14.5581L15.8723 10.625H4.04785C3.70267 10.625 3.42285 10.3452 3.42285 10C3.42285 9.65482 3.70267 9.375 4.04785 9.375H15.8723L11.9392 5.44194C11.6952 5.19786 11.6952 4.80214 11.9392 4.55806Z" fill="#6B7280" />
                    </svg>
                    {/* Make the second NavLink look like plain text if it's the current page representation */}
                    <span className="text-gray-800 font-medium">{t("customers.secondeTitle")}</span>
                    {/* Or if it's a link to a specific user page:
                       <NavLink to="/user" className="text-gray-600 hover:text-blue-600">{t("customers.buttonAdd")}</NavLink>
                    */}
                </div>

                <button
                    className='bg-[#5750F1] hover:bg-[#4a44d1] py-[6px] px-[14px] rounded-md text-white text-[13px] font-medium transition duration-150 ease-in-out' // Added hover effect and adjusted padding/font size
                    onClick={() => setAddCustomerOpen(true)}
                >
                    {t("customers.buttonAdd")}
                </button>
            </div>

            {/* --- DataGrid Section --- */}
            <div className='w-full my-10 bg-white py-4 shadow-md rounded-lg'> {/* Added shadow and rounded */}
                {/* --- Search Bar --- */}
                <div className="px-4 pb-4"> {/* Added padding */}
                   <form className="sticky top-0 z-10 bg-white dark:bg-gray-dark "> {/* Adjusted z-index */}
                       <div className="relative">
                           <input
                               className="w-full max-w-xs rounded-[7px] bg-[#F3F4F6] border border-gray-300 py-2.5 pl-10 pr-4 text-sm text-gray-700 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary" // Adjusted styling
                               placeholder={t('customers.searchPlaceholder', 'Search...')} // Use t() for placeholder
                               type="text"
                           />
                           {/* Search Icon inside input */}
                            <span className="absolute left-3 top-1/2 -translate-y-1/2">
                               <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                   <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                               </svg>
                            </span>
                           {/* Removed the button as icon is inside */}
                       </div>
                   </form>
                </div>

                {/* --- DataGrid Component --- */}
                <div style={{ height: 400, width: '100%' }}> {/* Ensure DataGrid has height */}
                    <DataGrid
                        className='px-2 text-[#6B7280] text-[14px] border-0' // Removed default border
                        rows={rows}
                        columns={columns}
                        pageSize={5} // Example page size
                        rowsPerPageOptions={[5, 10, 20]} // Example options
                        disableSelectionOnClick // Often desired with action menus
                        disableDensitySelector
                        disableColumnSelector
                        // Add other props like loading, error handling etc.
                        sx={{ // Optional: Further styling via sx prop
                            '& .MuiDataGrid-columnHeaders': {
                                backgroundColor: '#F9FAFB', // Light gray header
                                borderBottom: '1px solid #E5E7EB',
                            },
                            '& .MuiDataGrid-cell': {
                                borderBottom: '1px solid #E5E7EB', // Cell borders
                            },
                            '& .MuiDataGrid-footerContainer': {
                                borderTop: '1px solid #E5E7EB',
                            },
                            '& .MuiDataGrid-root': { // Remove outer border
                                border: 'none',
                            }
                        }}
                    />
                </div>
            </div>

            {/* --- Action Menu Component --- */}
            <Menu
                id="actions-menu"
                anchorEl={anchorEl}
                open={isMenuOpen}
                onClose={handleMenuClose}
                MenuListProps={{
                    'aria-labelledby': 'actions-button', // More generic ID if needed
                }}
                // Optional: style the menu paper
                PaperProps={{
                    style: {
                       boxShadow: '0px 2px 8px rgba(0,0,0,0.15)', // Softer shadow
                    background:"#EFEFEF"},
                }}
            >
                <MenuItem onClick={handleEdit}>
                    {t('customers.actions.edit', 'Edit')} {/* Use t() */}
                </MenuItem>
                <MenuItem onClick={handleDelete} sx={{ color: '#5750F1' }}> {/* Optional: style delete */}
                    {t('customers.actions.delete', 'Delete')} {/* Use t() */}
                </MenuItem>
            </Menu>

            {/* --- Add Customer Modal --- */}
            <AddCustomer isOpen={isAddCustomerOpen} onClose={() => setAddCustomerOpen(false)} />

        </div>
    );
}

export default Customers;