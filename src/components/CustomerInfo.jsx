import { useState, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Swiper, SwiperSlide } from "swiper/react"
import car from "../assets/car.png"
import carLisence from "../assets/car_lisence.png"
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules"
import logo from "../assets/logoo.png"
import { DataGrid } from '@mui/x-data-grid';

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/scrollbar"
import FileUploadModal from "./FileUploadModel"
import AddCustomer from "./AddCustomer"
import Add_vehicle from "./Add_vehicle"
import { NavLink } from "react-router-dom"


function CustomerInfo() {

  const prevRef = useRef(null)
  const nextRef = useRef(null)
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [isAddVehicleOpen, setAddVehicleOpen] = useState(false)
  const [isAddCustomerOpen, setAddCustomerOpen] = useState(false)

  const customerData = {
    name: "Islam Tuhasi",
    mobile: "0566008007",
    identity: "4026596017",
    age: "28",
    joinDate: "01/01/2023",
    customerSource: "Dealer - Amro",
    notes: "No Notes For this user",
  }

  const handleOpenUploadModal = () => {
    setIsUploadModalOpen(true)
  }

  const handleCloseUploadModal = () => {
    setIsUploadModalOpen(false)
  }

  const handleFileUpload = (files) => {
    // // Create object URLs for the uploaded files to display them
    // const newAttachments = files.map((file) => URL.createObjectURL(file))
    // setAttachmentFiles((prev) => [...prev, ...newAttachments])

    // // Here you would typically upload the files to your server
    // console.log("Files to upload:", files)
  }
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
    { field: 'paid_mount', headerName: 'paid amount', flex: 1 },
    { field: 'payment_date', headerName: 'payment date', flex: 1 },

  ];

  return (
    <div className="navblayout">
      <div className="bg-white flex p-[22px] rounded-md justify-between items-center">
        <div className="flex gap-[14px]">
          <NavLink to="/home">Home</NavLink>
          <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11.9392 4.55806C12.1833 4.31398 12.579 4.31398 12.8231 4.55806L17.8231 9.55806C18.0672 9.80214 18.0672 10.1979 17.8231 10.4419L12.8231 15.4419C12.579 15.686 12.1833 15.686 11.9392 15.4419C11.6952 15.1979 11.6952 14.8021 11.9392 14.5581L15.8723 10.625H4.04785C3.70267 10.625 3.42285 10.3452 3.42285 10C3.42285 9.65482 3.70267 9.375 4.04785 9.375H15.8723L11.9392 5.44194C11.6952 5.19786 11.6952 4.80214 11.9392 4.55806Z"
              fill="#6B7280"
            />
          </svg>
          <NavLink to="/user">Customers</NavLink>
          <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11.9392 4.55806C12.1833 4.31398 12.579 4.31398 12.8231 4.55806L17.8231 9.55806C18.0672 9.80214 18.0672 10.1979 17.8231 10.4419L12.8231 15.4419C12.579 15.686 12.1833 15.686 11.9392 15.4419C11.6952 15.1979 11.6952 14.8021 11.9392 14.5581L15.8723 10.625H4.04785C3.70267 10.625 3.42285 10.3452 3.42285 10C3.42285 9.65482 3.70267 9.375 4.04785 9.375H15.8723L11.9392 5.44194C11.6952 5.19786 11.6952 4.80214 11.9392 4.55806Z"
              fill="#6B7280"
            />
          </svg>
          <p>1</p>
        </div>

        {/* <button onClick={() => { setAddCustomerOpen(true); console.log('open') }} className="bg-[#5750F1] py-[3px] px-[10px] rounded-md text-white text-[12px]">
          Add New Customer
        </button> */}
      </div>

      <div className="flex gap-3 py-4 flex-row  ">
        <div className="w-64 rounded-lg   bg-white shadow-sm">
          <div className=" p-6">
            <h2 className="mb-4 text-[30px] font-semibold text-gray-900">Customer Info</h2>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-500">Name</label>
                <p className="text-gray-900">{customerData.name}</p>
              </div>

              <div>
                <label className="text-sm text-gray-500">Mobile</label>
                <p className="text-gray-900">{customerData.mobile}</p>
              </div>

              <div>
                <label className="text-sm text-gray-500">Identity</label>
                <p className="text-gray-900">{customerData.identity}</p>
              </div>

              <div>
                <label className="text-sm text-gray-500">Age</label>
                <p className="text-gray-900">{customerData.age}</p>
              </div>

              <div>
                <label className="text-sm text-gray-500">Join Date</label>
                <p className="text-gray-900">{customerData.joinDate}</p>
              </div>

              <div>
                <label className="text-sm text-gray-500">Customer Source</label>
                <p className="text-gray-900">{customerData.customerSource}</p>
              </div>

              <div>
                <label className="text-sm text-gray-500">Notes</label>
                <p className="text-gray-500">{customerData.notes}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-[calc(100%-17rem)]  ">
          {/* Attachments Section */}
          <div className="mb-3 rounded-lg bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-[24px] font-semibold text-gray-900">Attachments</h2>
              <button
                className="rounded-lg bg-[#5750F1] px-4 py-2 text-sm font-medium text-white hover:bg-[#5750F1]/90"
                onClick={handleOpenUploadModal}
              >
                Add New File
              </button>
            </div>

            <div className="relative swiper-container">
              <button
                ref={prevRef}
                className="custom-swiper-button-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white p-2 shadow-md"
              >
                <ChevronLeft className="h-5 w-5 text-gray-600" />
              </button>

              <div className="px-8 py-4">
                <Swiper
                  modules={[Navigation, Pagination, Scrollbar, A11y]}
                  spaceBetween={10}
                  slidesPerView={4}
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
                  className="attachments-swiper"
                >
                  {[...Array(7)].map((_, index) => (
                    <SwiperSlide key={index}>
                      <div className="h-[150px] w-[200px] overflow-hidden rounded-lg border border-gray-200">
                        <img
                          src={logo}
                          alt={`Vehicle `}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              <button
                ref={nextRef}
                className="custom-swiper-button-next absolute right-0 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white p-2 shadow-md"
              >
                <ChevronRight className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Vehicles Section */}
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-[24px] font-semibold text-gray-900">Vehicles</h2>
              <button className="rounded-lg bg-[#5750F1] px-4 py-2 text-sm font-medium text-white hover:bg-[#5750F1]/90" onClick={() => { setAddVehicleOpen(true); console.log('open') }}>
                Add New Vehicle
              </button>
            </div>

            <div className="relative swiper-container">
              <button
                ref={prevRef}
                className="custom-swiper-button-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white p-2 shadow-md"
              >
                <ChevronLeft className="h-5 w-5 text-gray-600" />
              </button>

              <div className="px-8 py-4">
                <Swiper
                  modules={[Navigation, Pagination, Scrollbar, A11y]}
                  spaceBetween={10}
                  slidesPerView={3}
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
                  className="attachments-swiper"
                >
                  {[...Array(7)].map((_, index) => (
                    <SwiperSlide key={index}>
                      <div className="h-[150px] w-[200px] overflow-hidden rounded-lg border border-gray-200">
                        <img
                          src={logo}
                          alt={`Vehicle `}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              <button
                ref={nextRef}
                className="custom-swiper-button-next absolute right-0 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white p-2 shadow-md"
              >
                <ChevronRight className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className=" bg-white rounded-md ">
        <button onClick={() => { setAddCustomerOpen(true); console.log('open') }} className="bg-[#5750F1] py-[3px] px-[10px] rounded-md text-white text-[12px] mt-3 ml-4 mb-3">
          Add New Payment
        </button>
        <DataGrid className=' text-[#6B7280] text-[14px]'
          rows={rows}
          columns={columns}
          disableDensitySelector
          disableColumnSelector
        />

      </div>
      <FileUploadModal isOpen={isUploadModalOpen} onClose={handleCloseUploadModal} onUpload={handleFileUpload} />
      <Add_vehicle isOpen={isAddVehicleOpen} onClose={setAddVehicleOpen} />
      {/* <AddCustomer isOpen={isAddCustomerOpen} onClose={setAddCustomerOpen} /> */}
    </div>
  )
}

export default CustomerInfo