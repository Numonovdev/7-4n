import Navbar from "../components/Navbar"
import { useNavigate } from "react-router-dom"


function Header(){
 const navigate = useNavigate()

 
function handleRegister(){
    navigate('/register')
}

function handleLogin(){
    navigate('/login')
}

    return(
        <div className="w-full headerr">
            <div className="text-white flex justify-end gap-5 container mx-auto">
                <span onClick={handleLogin} className="hover:underline cursor-pointer">Sign in / Guest</span>
                <span onClick={handleRegister} className="hover:underline cursor-pointer">Create Account</span>
            </div>
            <Navbar/>
        </div>
    )
}

export default Header