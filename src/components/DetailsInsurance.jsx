
import axios from "axios"
import { useEffect, useState } from "react"
import { Link, NavLink, useParams } from "react-router-dom"
import VehiclesList from "./VehiclesList"

function DetailsInsurance() {
    const [date, setDate] = useState("2024-01-04")
    const { id } = useParams()

    const [insuredInfo, setInsuredInfo] = useState({
        name: "",
        image: "",
    })
    const [loading, setLoading] = useState(true)

    const getDetailsInsured = async () => {
        try {
            const token = localStorage.getItem("token")
            const { data } = await axios.get(`https://backendinsurance.onrender.com/api/v1/insured/show/${id}`, {
                headers: { Authorization: `islam__${token}` },
            })

            if (data.message === "success") {
                console.log("success", data.find)
                setInsuredInfo(data.find)
                setLoading(false)
                setDate(data.find.joining_date)
            }
        } catch (error) {
            console.error("Error:", error)
            setLoading(false)
        }
    }

    useEffect(() => {
        getDetailsInsured()

    }, [id])

    return (
        <>
            {loading ? (
                <div className="flex justify-center items-center h-screen">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            ) : (
                <div>
                    <div className="my-3">
                        <h1 className="text-2xl my-3"> معلومات المؤمن</h1>
                        <div className="text-xs text-gray-500 mb-9">
                            <NavLink to="/home"> الصفحة الرئيسية </NavLink> /<NavLink to='/Insurances'>
                                عرض  قائمة المؤمنين</NavLink> /
                            <NavLink to="/AddInsurance"> معلومات المؤمن </NavLink>
                        </div>
                        <div className="flex flex-col gap-3 2md:flex-row pl-5">
                            <div className="card p-2 w-[200px] text-center flex justify-center h-fit">
                                <div className="m-auto">
                                    <div className="w-[100px] rounded-full border border-gray-300 h-[100px]">

                                        {insuredInfo && insuredInfo.image ? (
                                            <img
                                                src={insuredInfo.image || "/placeholder.svg"}
                                                alt=""
                                                className="rounded-full w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center">
                                                <span className="text-gray-500">No Image</span>
                                            </div>
                                        )}
                                    </div>
                                    <h3 className="text-sm py-3 text-center">
                                        {insuredInfo && insuredInfo.name ? insuredInfo.name : "No Name"}
                                    </h3>
                                </div>
                            </div>
                            <div className="card p-3 lg:w-[70%]">
                                <h2 className="mb-4 text-xl"> بيانات المؤمن</h2>


                                <Link
                                    to={`/add_vehicle/${insuredInfo._id}`}
                                    className="bg-blue-500 text-white px-4 py-2 rounded mb-3 hover:bg-blue-700 w-[200px] ">
                                    اضافة مركبة                                </Link>
                                <form action="" className="p-3">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="text-right mb-3">
                                            <label htmlFor="fileNumber" className="form-label text-xs">
                                                {" "}
                                                رقم الملف{" "}
                                            </label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                id="fileNumber"
                                                placeholder="1"
                                                value={insuredInfo?.fileNumber || ""}
                                            />
                                        </div>
                                        <div className="text-right mb-3">
                                            <label htmlFor="fullName" className="form-label text-xs">
                                                {" "}
                                                الاسم الرباعي
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="fullName"
                                                placeholder="اسلام فايز شويكي"
                                                value={insuredInfo?.name || ""}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="text-right mb-3">
                                            <label htmlFor="id_Number" className="form-label text-xs">
                                                {" "}
                                                رقم الهوية
                                            </label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                id="id_Number"
                                                placeholder="304898695"
                                                value={insuredInfo?.id_Number || ""}
                                            />
                                        </div>
                                        <div className="text-right mb-3">
                                            <label htmlFor="phone_number" className="form-label text-xs">
                                                {" "}
                                                رقم الهاتف
                                            </label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                id="phone_number"
                                                placeholder=""
                                                value={insuredInfo?.phone_number || ""}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="text-right mb-3">
                                            <label htmlFor="joinDate" className="form-label text-xs">
                                                {" "}
                                                تاريخ الانضمام{" "}
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="joinDate"
                                                value={date}
                                            // onChange={(e) => setDate(e.target.value)}
                                            />
                                        </div>
                                        {/* <div className="text-right mb-3 flex items-center gap-2">
                      <input type="checkbox" id="under24" defaultChecked={insuredInfo?.under24 || false} />
                      <label htmlFor="under24" className="form-label text-xs m-0">
                        المؤمن تحت عمر ال 24؟
                      </label>
                    </div> */}
                                    </div>
                                    <div className="mb-3 flex flex-col">
                                        <label htmlFor="notes" className="form-label text-xs m-0">
                                            الملاحظات
                                        </label>
                                        <textarea
                                            id="notes"
                                            cols="8"
                                            rows="4"
                                            className="border border-gray-300 p-2 rounded"
                                            placeholder="تم نقل تأمين الحوفا من سيارة 7800676 الى سيارة رقم 5884285 والغاء الثالث واصدار شامل"
                                            value={insuredInfo?.notes || ""}
                                        ></textarea>
                                    </div>

                                    {/* <button
                                        type="submit"
                                        className="text-sm bg-blue-600 px-4 py-2 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        تعديل
                                    </button> */}
                                </form>
                                <div className=" p-3 ">
                                    <VehiclesList id={id} />



                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </>
    )
}

export default DetailsInsurance

