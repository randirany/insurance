import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { DataGrid } from '@mui/x-data-grid';
import { useLocation, NavLink } from 'react-router-dom';
import axios from 'axios';
import car from "../assets/car.png";
import carLisence from "../assets/car_lisence.png";
import logo from "../assets/logoo.png";
import FileUploadModal from "./FileUploadModel";
import Add_vehicle from "./Add_vehicle";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

function CustomerInfo() {
  const location = useLocation();
  const { insuredId } = location.state || {};
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [vehicles, setVehicles] = useState([]);
  const [customerData, setCustomerData] = useState({});
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isAddVehicleOpen, setAddVehicleOpen] = useState(false);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const token = `islam__${localStorage.getItem("token")}`;
        const response = await axios.get(`http://localhost:3002/api/v1/insured/allVec/${insuredId}`, {
          headers: {
            token
          }
        });
        setVehicles(response.data.vehicles);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    };

    const fetchCustomer = async () => {
      try {
   
        const token = `islam__${localStorage.getItem("token")}`;
        const response = await axios.get(`http://localhost:3002/api/v1/insured/findInsured/${insuredId}`, {
          headers: {
            token
          }
        });
      
        setCustomerData(response.data);
    console.log(customerData)
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    };

 
      fetchVehicles();
      fetchCustomer();
    
  }, [insuredId]);

  const handleOpenUploadModal = () => {
    setIsUploadModalOpen(true);
  };

  const handleCloseUploadModal = () => {
    setIsUploadModalOpen(false);
  };

  const rows = [
    { id: 1, Payment_Method: 'Islam Tubasi', paid_mount: '1000', payment_date: '1/1/2025' },
    { id: 2, Payment_Method: 'Islam Tubasi', paid_mount: '1000', payment_date: '1/1/2025' },
    { id: 3, Payment_Method: 'Islam Tubasi', paid_mount: '1000', payment_date: '1/1/2025' },
    { id: 4, Payment_Method: 'Islam Tubasi', paid_mount: '1000', payment_date: '1/1/2025' },
    { id: 5, Payment_Method: 'Islam Tubasi', paid_mount: '1000', payment_date: '1/1/2025' },
    { id: 6, Payment_Method: 'Islam Tubasi', paid_mount: '1000', payment_date: '1/1/2025' },
  ];

  const columns = [
    { field: 'Payment_Method', headerName: 'Payment Method', flex: 1 },
    { field: 'paid_mount', headerName: 'Paid Amount', flex: 1 },
    { field: 'payment_date', headerName: 'Payment Date', flex: 1 },
  ];


  return (
    <div className="navblayout">
      <div className="bg-white flex p-[22px] rounded-md justify-between items-center">
        <div className="flex gap-[14px]">
          <NavLink to="/home">Home</NavLink>
          <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M11.9392 4.55806C12.1833 4.31398 12.579 4.31398 12.8231 4.55806L17.8231 9.55806C18.0672 9.80214 18.0672 10.1979 17.8231 10.4419L12.8231 15.4419C12.579 15.686 12.1833 15.686 11.9392 15.4419C11.6952 15.1979 11.6952 14.8021 11.9392 14.5581L15.8723 10.625H4.04785C3.70267 10.625 3.42285 10.3452 3.42285 10C3.42285 9.65482 3.70267 9.375 4.04785 9.375H15.8723L11.9392 5.44194C11.6952 5.19786 11.6952 4.80214 11.9392 4.55806Z" fill="#6B7280" />
          </svg>
          <NavLink to="/user">Customers</NavLink>
          <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M11.9392 4.55806C12.1833 4.31398 12.579 4.31398 12.8231 4.55806L17.8231 9.55806C18.0672 9.80214 18.0672 10.1979 17.8231 10.4419L12.8231 15.4419C12.579 15.686 12.1833 15.686 11.9392 15.4419C11.6952 15.1979 11.6952 14.8021 11.9392 14.5581L15.8723 10.625H4.04785C3.70267 10.625 3.42285 10.3452 3.42285 10C3.42285 9.65482 3.70267 9.375 4.04785 9.375H15.8723L11.9392 5.44194C11.6952 5.19786 11.6952 4.80214 11.9392 4.55806Z" fill="#6B7280" />
          </svg>
          <p>1</p>
        </div>
      </div>

      <div className="block gap-3 py-4 flex-row md:flex">
        <div className="w-full md:w-64 rounded-lg bg-white shadow-sm">
          <div className="p-6">
            <h2 className="mb-4 text-[30px] font-semibold text-gray-900">Customer Info</h2>
            <div className="space-y-4 grid grid-cols-1 md:grid-cols-none 3sm:grid-cols-2">
              <div><label className="text-sm text-gray-500">firstName</label><p className="text-gray-900">{customerData.insured.first_name}</p></div>
                 <div><label className="text-sm text-gray-500">lastName</label><p className="text-gray-900">{customerData.insured.last_name}</p></div>
              <div><label className="text-sm text-gray-500">Mobile</label><p className="text-gray-900">{customerData.insured.phone_number}</p></div>
              <div><label className="text-sm text-gray-500">Identity</label><p className="text-gray-900">{customerData.insured.id_Number}</p></div>
              <div><label className="text-sm text-gray-500">Age</label><p className="text-gray-900">{customerData.insured.birth_date}</p></div>
              <div><label className="text-sm text-gray-500">Join Date</label><p className="text-gray-900">{customerData.insured.joining_date}</p></div>
              <div><label className="text-sm text-gray-500">Customer Source</label><p className="text-gray-900">{customerData.insured.city}</p></div>
              <div><label className="text-sm text-gray-500">Notes</label><p className="text-gray-500">{customerData.insured.notes}</p></div>
            </div>
          </div>
        </div>

        <div className="md:max-w-[calc(100%-17rem)] w-full my-3">
          <div className="mb-3 rounded-lg bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-[24px] font-semibold text-gray-900">Attachments</h2>
                           <button
                onClick={handleOpenUploadModal}
                className="rounded-md border-2 border-gray-500 px-4 py-2 text-sm text-gray-900"
              >
                Upload Files
              </button>
            </div>
            <div className="flex justify-between gap-3 mb-3">
              <div className="w-1/2 p-4 border border-gray-300 rounded-md">
                <img src={carLisence} alt="Car License" className="w-full h-full object-cover rounded-md" />
                <div className="text-center text-sm mt-2">Car License</div>
              </div>
              <div className="w-1/2 p-4 border border-gray-300 rounded-md">
                <img src={car} alt="Car Image" className="w-full h-full object-cover rounded-md" />
                <div className="text-center text-sm mt-2">Car Image</div>
              </div>
            </div>
          </div>

          <div className="mb-3 rounded-lg bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-[24px] font-semibold text-gray-900">Vehicles</h2>
       
            </div>
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              spaceBetween={10}
              onInit={(swiper) => {
                swiper.params.navigation.prevEl = prevRef.current
                swiper.params.navigation.nextEl = nextRef.current
                swiper.navigation.init()
                swiper.navigation.update()
              }}
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              breakpoints={{
                0: { slidesPerView: 1 },
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1200: { slidesPerView: 4 },
              }}
              className="attachments-swiper"
            >
              {vehicles.map((vehicle, index) => (
                <SwiperSlide key={index}>
                  <div className="max-w-full">
                    <div className="p-2 border-2 border-[#C3CEF6] rounded-[8px] h-[100%]">
                      <img src={vehicle.image} alt={`Vehicle ${vehicle.plateNumber}`} />
                      <div className="relative w-full">
                        <img src={carLisence} alt="Car License" />
                        <p className="absolute top-[-5px] left-5 lg:text-[27px] md:text-[23px] text-[24px]">{vehicle.plateNumber}</p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="flex justify-between mt-4">
              <button ref={prevRef} className="p-2 rounded-full bg-gray-300">
                <ChevronLeft size={24} />
              </button>
              <button ref={nextRef} className="p-2 rounded-full bg-gray-300">
                <ChevronRight size={24} />
              </button>
            </div>
          </div>

          <div className="mb-3 rounded-lg bg-white p-6 shadow-sm">
            <div className="mb-4">
              <h2 className="text-[24px] font-semibold text-gray-900">Payment History</h2>
            </div>
            <div style={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
              />
            </div>
          </div>
        </div>
      </div>

      <FileUploadModal isOpen={isUploadModalOpen} onClose={handleCloseUploadModal} />
      <Add_vehicle isOpen={isAddVehicleOpen} onClose={() => setAddVehicleOpen(false)} />
    </div>
  );
}

export default CustomerInfo;

