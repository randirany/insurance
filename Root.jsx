import React from 'react'
import Navbar from './src/components/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './src/components/Footer'
import Sidebar from './src/components/Sidebar'
import { useTranslation } from 'react-i18next';

function Root() {
  const { t, i18n: { language } } = useTranslation()

  return (
    <div>
      {
        language=="en" ? <>
        </>:<>
        </>
      }
      <div className='flex sidebarCompo' style={{ direction: 'ltr!important' }}>
        <Sidebar />
        <div className={`secondcomponent ${language=='en'? 'paddingCompEn':'paddingCompAr'}`} style={{ width: '100%' }}>
          <Navbar />
          <div style={{ marginTop: '110px' }}>
            <Outlet />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
export function AuthLayout() {
  return <Outlet />;
}
export default Root