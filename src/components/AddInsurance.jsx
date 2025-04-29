
import React, { useContext, useRef, useState } from 'react';
import { useFormik } from "formik"
import * as Yup from "yup"
import axios from "axios"
import { UserContext } from '../context/User';
import { useNavigate } from "react-router-dom"
import { Bounce, toast, ToastContainer } from "react-toastify"

const AddInsurance = () => {
  const [loading, setLoading] = useState(false)
  const [imagePreview, setImagePreview] = useState(null)
  const { setInsuranceCount } = useContext(UserContext);

  const navigate = useNavigate()

  // تحقق من صحة النموذج باستخدام Yup
  const validationSchema = Yup.object({
    fileNumber: Yup.number().required("رقم الملف مطلوب"),
    name: Yup.string().required("الاسم مطلوب"),
    id_Number: Yup.number().required("رقم الهوية مطلوب").positive("يجب أن يكون رقم الهوية إيجابي"),
    phone_number: Yup.string().required("رقم الهاتف مطلوب"),
    joining_date: Yup.date().required("تاريخ الانضمام مطلوب"),
    notes: Yup.string(),
  })

  const formik = useFormik({
    initialValues: {
      fileNumber: "",
      name: "",
      id_Number: "",
      phone_number: "",
      joining_date: new Date().toISOString().split("T")[0],
      notes: "",
      image: null,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true)

        const formData = new FormData()
        formData.append("fileNumber", values.fileNumber)
        formData.append("name", values.name)
        formData.append("id_Number", values.id_Number)
        formData.append("phone_number", values.phone_number)
        formData.append("joining_date", values.joining_date)
        formData.append("notes", values.notes)

        if (values.image) {
          formData.append("image", values.image)
        }

        const token = localStorage.getItem("token")

        // const response = await axios.post("https://backendinsurance.onrender.com/api/v1/insured/addInsured", formData, {
          const response = await axios.post("https://backendinsurance.onrender.com/api/v1/insured/addInsured", formData, {

          headers: {
            Authorization: `islam__${token}`,
            "Content-Type": "multipart/form-data",
          },
        })

        if (response.data.message === "succsses") {
          setInsuranceCount((prev) => prev + 1)
          toast.success("تمت إضافة المؤمن بنجاح", {
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
          toast.error(response.data.message || "حدث خطأ أثناء إضافة المؤمن")
        }
      } catch (error) {
        console.error("Error adding insured:", error)
        toast.error(error.response?.data?.message || "حدث خطأ في الخادم")
      } finally {
        setLoading(false)
      }
    },
  })


  const handleImageChange = (event) => {
    const file = event.currentTarget.files[0]
    if (file) {
      formik.setFieldValue("image", file)


      const reader = new FileReader()
      reader.onload = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="container  p-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">إضافة مؤمن جديد</h2>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
              <label htmlFor="fileNumber" className="block text-sm font-medium text-gray-700 mb-1">
                رقم الملف
              </label>
              <input
                type="number"
                id="fileNumber"
                name="fileNumber"
                className={`w-full p-2 border rounded-md ${formik.touched.fileNumber && formik.errors.fileNumber ? "border-red-500" : "border-gray-300"
                  }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.fileNumber}
              />
              {formik.touched.fileNumber && formik.errors.fileNumber && (
                <p className="mt-1 text-sm text-red-500">{formik.errors.fileNumber}</p>
              )}
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
                className={`w-full p-2 border rounded-md ${formik.touched.name && formik.errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
              {formik.touched.name && formik.errors.name && (
                <p className="mt-1 text-sm text-red-500">{formik.errors.name}</p>
              )}
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
                className={`w-full p-2 border rounded-md ${formik.touched.id_Number && formik.errors.id_Number ? "border-red-500" : "border-gray-300"
                  }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.id_Number}
              />
              {formik.touched.id_Number && formik.errors.id_Number && (
                <p className="mt-1 text-sm text-red-500">{formik.errors.id_Number}</p>
              )}
            </div>

            <div>
              <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700 mb-1">
                رقم الهاتف
              </label>
              <input
                type="text"
                id="phone_number"
                name="phone_number"
                className={`w-full p-2 border rounded-md ${formik.touched.phone_number && formik.errors.phone_number ? "border-red-500" : "border-gray-300"
                  }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone_number}
              />
              {formik.touched.phone_number && formik.errors.phone_number && (
                <p className="mt-1 text-sm text-red-500">{formik.errors.phone_number}</p>
              )}
            </div>

            <div>
              <label htmlFor="joining_date" className="block text-sm font-medium text-gray-700 mb-1">
                تاريخ الانضمام
              </label>
              <input
                type="date"
                id="joining_date"
                name="joining_date"
                className={`w-full p-2 border rounded-md ${formik.touched.joining_date && formik.errors.joining_date ? "border-red-500" : "border-gray-300"
                  }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.joining_date}
              />
              {formik.touched.joining_date && formik.errors.joining_date && (
                <p className="mt-1 text-sm text-red-500">{formik.errors.joining_date}</p>
              )}
            </div>

            {/* الصورة */}
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

          {/* الملاحظات */}
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
              ملاحظات
            </label>
            <textarea
              id="notes"
              name="notes"
              rows="3"
              className="w-full p-2 border border-gray-300 rounded-md"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.notes}
            ></textarea>
          </div>

          {/* زر الإرسال */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {loading ? "جاري الإضافة..." : "إضافة المؤمن"}
            </button>
          </div>
        </form>
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
    </div>
  )
}

export default AddInsurance

