import { useState, useRef } from "react";
import { X } from "lucide-react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom"
function Add_vehicle({ onClose, isOpen, onVehicleAdded, insuredId }) {
    if (!isOpen) return null;

    const [files, setFiles] = useState([]);
    const fileInputRef = useRef(null);
    const dropAreaRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
  const navigate = useNavigate()
    const [formData, setFormData] = useState({
        plateNumber: '',
        model: '',
        type: '',
        ownership: '',
        modelNumber: '',
        licenseExpiry: '',
        lastTest: '',
        color: '',
        price: ''
    });

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            setFiles(Array.from(e.dataTransfer.files));
        }
    };

    const handleBrowseClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileInputChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setFiles(Array.from(e.target.files));
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!insuredId) {
            console.error("Insured ID is not provided.");
            return;
        }

        const rawToken = localStorage.getItem("token");
        if (!rawToken) {
            console.error("No token found in localStorage.");
            return;
        }

        const token = `islam__${rawToken}`;
        const data = new FormData();

        Object.keys(formData).forEach((key) => {
            data.append(key, formData[key]);
        });

        if (files.length > 0) {
            data.append('image', files[0]);
        }

        try {
            const response = await axios.post(
                `http://localhost:3002/api/v1/insured/addCar/${insuredId}`,
                data,
                {
                    headers: {
                        token,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            console.log('Vehicle added successfully:', response.data);

            if (onVehicleAdded) {
                onVehicleAdded();
            }

            onClose(false);

                await navigate('/profile', { state: { insuredId } });
        } catch (error) {
            console.error('Error adding vehicle:', error);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3">
            <div className="w-full max-w-[800px] bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between pb-1 p-2 rounded-md">
                    <h2 className="text-2xl font-semibold">Add New Vehicle</h2>
                    <button onClick={() => onClose(false)} className="p-1 rounded-full hover:bg-gray-100">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form className="mt-2 space-y-4 rounded-md border border-gray-300 pt-3" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-3 px-4">
                        <div>
                            <label className="block text-sm font-medium">Vehicle Name</label>
                            <input
                                type="text"
                                name="model"
                                className="w-full p-1 border rounded-md"
                                placeholder="Enter Vehicle Model"
                                value={formData.model}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Vehicle Number</label>
                            <input
                                type="text"
                                name="plateNumber"
                                className="w-full p-1 border rounded-md"
                                placeholder="Enter Vehicle Number"
                                value={formData.plateNumber}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Vehicle Chassis Number</label>
                            <input
                                type="text"
                                name="modelNumber"
                                className="w-full p-1 border rounded-md"
                                placeholder="Enter Chassis Number"
                                value={formData.modelNumber}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Vehicle Type</label>
                            <select
                                name="type"
                                className="w-full p-1 border rounded-md"
                                value={formData.type}
                                onChange={handleInputChange}
                            >
                                <option>Choose Vehicle Type</option>
                                <option>Car</option>
                                <option>Truck</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Ownership</label>
                            <select
                                name="ownership"
                                className="w-full p-1 border rounded-md"
                                value={formData.ownership}
                                onChange={handleInputChange}
                            >
                                <option>Choose Ownership</option>
                                <option>Private</option>
                                <option>Company</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium">License Expiry</label>
                            <input
                                type="date"
                                name="licenseExpiry"
                                className="w-full p-1 border rounded-md"
                                value={formData.licenseExpiry}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Last Test Date</label>
                            <input
                                type="date"
                                name="lastTest"
                                className="w-full p-1 border rounded-md"
                                value={formData.lastTest}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Vehicle Color</label>
                            <input
                                type="text"
                                name="color"
                                className="w-full p-1 border rounded-md"
                                placeholder="Enter Vehicle Color"
                                value={formData.color}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Vehicle Price</label>
                            <input
                                type="text"
                                name="price"
                                className="w-full p-1 border rounded-md"
                                placeholder="Enter Vehicle Price"
                                value={formData.price}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div className="px-4">
                        <label className="block text-sm font-medium">Vehicle Image (Optional)</label>
                        <div
                            onClick={handleBrowseClick}
                            ref={dropAreaRef}
                            className={`w-full h-[100px] flex cursor-pointer items-center justify-center border-2 rounded-md bg-[#DEE4EE] ${isDragging ? "border-[#5750F1] bg-[#5750F1]/5" : "border-gray-300"}`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                        >
                            <div className="text-center">
                                <p className="text-md text-gray-600">Drop Files here or click to upload</p>
                                <input ref={fileInputRef} type="file" multiple className="hidden" onChange={handleFileInputChange} />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end px-4">
                        <input
                            type="submit"
                            value="Submit"
                            className="px-4 py-2 text-white w-full bg-indigo-600 rounded-md hover:bg-indigo-500"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Add_vehicle;
