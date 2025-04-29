import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Bounce, toast, ToastContainer } from "react-toastify"
function AddInsuranceCompany() {

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [activeTab, setActiveTab] = useState("سيارة_خاصة")
    const token = localStorage.getItem('token')
    const [formData, setFormData] = useState({
        name: "",
        contact: "",
        address: "",
        insuranceType: "الزامي",
    })

    const [vehicleCategories, setVehicleCategories] = useState([
        {
            key: "سيارة_خاصة",
            label: "سيارة خاصة",
            rates: { تحت_24: 0, فوق_24: 0, مبلغ_العرض: 0, الحد_الأدنى_لـ_60_ألف: 0 },
        },
        {
            key: "سيارة_تجارية",
            label: "سيارة تجارية",
            rates: { تحت_24: 0, فوق_24: 0, مبلغ_العرض: 0, الحد_الأدنى_لـ_60_ألف: 0 },
        },
        {
            key: "دراجة_نارية",
            label: "دراجة نارية",
            rates: { تحت_24: 0, فوق_24: 0, مبلغ_العرض: 0, الحد_الأدنى_لـ_60_ألف: 0 },
        },
    ])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleSelectChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleRateChange = (categoryKey, field, value) => {
        const numValue = value === "" ? 0 : Number(value)

        setVehicleCategories((prevCategories) =>
            prevCategories.map((category) =>
                category.key === categoryKey ? { ...category, rates: { ...category.rates, [field]: numValue } } : category,
            ),
        )
    }

    // تعديل دالة handleSubmit لتحسين طريقة إرسال البيانات وإضافة المزيد من التصحيح

    const handleSubmit = async (e) => {

        e.preventDefault()
        setLoading(true)

        try {
            // تحويل بيانات الأسعار إلى الشكل المطلوب للـ API
            const rates = {}

            if (formData.insuranceType !== "الزامي") {
                vehicleCategories.forEach((category) => {
                    rates[category.key] = category.rates
                })
            }

            // إنشاء كائن البيانات للإرسال
            const dataToSend = {
                name: formData.name,
                insuranceType: formData.insuranceType,
                contact: formData.contact,
                address: formData.address,
                rates: formData.insuranceType !== "الزامي" ? rates : {},
            }

            console.log("Sending data to server:", dataToSend)

            // const response = await axios.post("http://localhost:3002/api/v1/company/addInsuranceCompany", dataToSend, {
            const response = await axios.post("https://backendinsurance.onrender.com/api/v1/company/addInsuranceCompany", dataToSend, {
                    headers: { Authorization: `islam__${token}` }
            },
            )
            console.log('res', response.data.message)
            try {
                if (response.data.message == 'success') {

                    toast.success("تمت إضافة الشركة بنجاح", {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                    });
                } else {
                    console.log('errorrr')
                    toast.error(response.data.message)
                }
            } catch (e) {
                toast.error(" فشل في إضافة شركة التأمين")

            }

            // navigate("/insurance-companies")
        } catch (error) {
            console.error("Error adding company:", error)
            toast.error("فشل في إضافة شركة التأمين  ")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="bg-white rounded-lg shadow-md w-full max-w-4xl mx-auto">
            <div className="p-6 border-b">
                <h2 className="text-xl font-bold text-right">إضافة شركة تأمين جديدة</h2>
                <p className="text-gray-500 text-right">أدخل بيانات شركة التأمين الجديدة</p>
            </div>
            <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6 rtl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* اسم الشركة */}
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-right block font-medium">
                                اسم الشركة
                            </label>
                            <input
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="text-right w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                dir="rtl"
                                required
                            />
                        </div>

                        {/* نوع التأمين */}
                        <div className="space-y-2">
                            <label htmlFor="insuranceType" className="text-right block font-medium">
                                نوع التأمين
                            </label>
                            <select
                                id="insuranceType"
                                value={formData.insuranceType}
                                onChange={(e) => handleSelectChange("insuranceType", e.target.value)}
                                className="text-right w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                dir="rtl"
                            >
                                <option value="الزامي">الزامي</option>
                                <option value="ثالث شامل">ثالث شامل</option>
                            </select>
                        </div>

                        {/* معلومات الاتصال */}
                        <div className="space-y-2">
                            <label htmlFor="contact" className="text-right block font-medium">
                                معلومات الاتصال
                            </label>
                            <input
                                id="contact"
                                name="contact"
                                value={formData.contact}
                                onChange={handleInputChange}
                                className="text-right w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                dir="rtl"
                            />
                        </div>

                        {/* العنوان */}
                        <div className="space-y-2">
                            <label htmlFor="address" className="text-right block font-medium">
                                العنوان
                            </label>
                            <input
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                className="text-right w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                dir="rtl"
                            />
                        </div>
                    </div>


                    {formData.insuranceType !== "الزامي" && (

                        <div className="mt-8">
                            <h3 className="text-lg font-medium mb-4 text-right">أسعار التأمين حسب نوع المركبة</h3>

                            <div className="mb-4">
                                <div className="flex border-b">
                                    {vehicleCategories.map((category) => (
                                        <button
                                            key={category.key}
                                            type="button"
                                            onClick={() => setActiveTab(category.key)}
                                            className={`py-2 px-4 text-center flex-1 ${activeTab === category.key ? "border-b-2 border-blue-500 font-medium" : "text-gray-500"}`}
                                        >
                                            {category.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {vehicleCategories.map((category) => (
                                <div key={category.key} className={`space-y-4 ${activeTab === category.key ? "block" : "hidden"}`}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label htmlFor={`${category.key}-under24`} className="text-right block font-medium">
                                                السعر للسائقين تحت 24 سنة
                                            </label>
                                            <input
                                                id={`${category.key}-under24`}
                                                type="number"
                                                value={category.rates.تحت_24 || ""}
                                                onChange={(e) => handleRateChange(category.key, "تحت_24", e.target.value)}
                                                className="text-right w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                dir="rtl"
                                                required={formData.insuranceType !== "الزامي"}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor={`${category.key}-over24`} className="text-right block font-medium">
                                                السعر للسائقين فوق 24 سنة
                                            </label>
                                            <input
                                                id={`${category.key}-over24`}
                                                type="number"
                                                value={category.rates.فوق_24 || ""}
                                                onChange={(e) => handleRateChange(category.key, "فوق_24", e.target.value)}
                                                className="text-right w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                dir="rtl"
                                                required={formData.insuranceType !== "الزامي"}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor={`${category.key}-offer`} className="text-right block font-medium">
                                                مبلغ العرض
                                            </label>
                                            <input
                                                id={`${category.key}-offer`}
                                                type="number"
                                                value={category.rates.مبلغ_العرض || ""}
                                                onChange={(e) => handleRateChange(category.key, "مبلغ_العرض", e.target.value)}
                                                className="text-right w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                dir="rtl"
                                                required={formData.insuranceType !== "الزامي"}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor={`${category.key}-min60k`} className="text-right block font-medium">
                                                الحد الأدنى لـ 60 ألف
                                            </label>
                                            <input
                                                id={`${category.key}-min60k`}
                                                type="number"
                                                value={category.rates.الحد_الأدنى_لـ_60_ألف || ""}
                                                onChange={(e) => handleRateChange(category.key, "الحد_الأدنى_لـ_60_ألف", e.target.value)}
                                                className="text-right w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                dir="rtl"
                                                required={formData.insuranceType !== "الزامي"}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </form>
            </div>
            <div className="p-6 border-t flex justify-end">
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md w-full md:w-auto disabled:opacity-50"
                >
                    {loading ? "جاري الإضافة..." : "إضافة شركة التأمين"}
                </button>
            </div>
            <ToastContainer position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
        </div>
    )
}
export default AddInsuranceCompany