import { BrowserRouter , Routes,Route} from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import DashBoard from "./pages/DashBoard";
import {SendMoney} from "./pages/SendMoney";

function App() {
  return (
    <>
      {/* <InputBar label={"First Name"} placeholder = {"Ashish"}/> */}
      <BrowserRouter>
      <Routes>
        <Route path= "/signup" element={<Signup/>}/>
        <Route path= "/signin" element={<Signin/>}/>
        <Route path= "/dashboard" element={<DashBoard/>}/>
        <Route path= "/send" element={<SendMoney/>}/>
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
