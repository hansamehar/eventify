import { Route, Routes ,Navigate} from "react-router-dom"
import './App.css'
import Authentication from "./pages/Authentication"
import Dashboard from "./pages/Dashboard"
import Events from "./pages/Events"
import Bookings from "./pages/Bookings"
import Bookmarks from "./pages/Bookmarks"
import AdminDashboard from "./pages/AdminDashboard"
import ViewEvent from "./pages/ViewEvent"
import Users from "./pages/Users"
import Landing from "./pages/Landing"
import PrivateRoute from "./components/PrivateRoute"
import PaymentPage from "./pages/PaymentPage"
import About from "./pages/About"


function App() {

  return (
    <>
        <Routes>
        <Route path="/" element={< Landing />} />
        <Route path="/about" element={<About  />} />
        <Route path="/userdashboard" element={<PrivateRoute element={<Dashboard />}/>} />
        <Route path="/admindashboard" element={<PrivateRoute element={<AdminDashboard />}/>} />
        <Route path="/users" element={<PrivateRoute element={<Users />}/>} />
        <Route path='/login' element={<Authentication/> } />
        <Route path="/register" element={<Authentication insideRegister={true} />}/>
        <Route path="/events" element={<Events/>}/>
        <Route path="/bookings" element={<PrivateRoute element={<Bookings/>}/>}/>
        <Route path="/bookmarks" element={<PrivateRoute element={<Bookmarks/>}/>}/>
        <Route path="/payment" element={<PrivateRoute element={<PaymentPage/>}/>}/>
        <Route path="/viewEvent/:id" element={<ViewEvent/>}/>
      </Routes>
   
    </>
  )
}

export default App
