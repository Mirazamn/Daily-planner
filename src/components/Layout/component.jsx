import { Outlet } from "react-router-dom"
import Header from "../Header/component"
import Calendar from "../Calendar/component"

function Layout() {
  return (
   <main>
        <Header />
        <Calendar />
        <Outlet />
   </main>
  )
}

export default Layout