import { useNavigate } from "react-router-dom"
import logoPic from "../assets/Logo.png";

function LandingPage() {

    const navigate = useNavigate();

  return (
    <div className="fixed w-full h-full bg-[#FFBF00] w-full shadow-xl flex items-center">
      <div className="flex w-full h-full justify-left">
        <img className="ml-[10px] h-[50px] w-[50px] aspect-auto" src={logoPic}></img>
        <p className="text-black">Weekly photo challenges for your communities!</p>
      </div>
    </div>
  );
}

export default LandingPage;
