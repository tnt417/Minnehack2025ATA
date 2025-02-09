import { NavLink, useLocation } from 'react-router-dom';
import logoPic from "../../assets/Logo.png";

const navLinks = [
  { to: '/explore-groups', text: 'Explore' },
  { to: '/my-groups', text: 'My Groups' },
  { to: '/profile', text: 'Profile' },
];

function NavBar() {

    const location = useLocation();

  return (
    <div className="fixed h-[50px] bg-[#FFBF00] w-full shadow-xl flex items-center z-[5]">
      <div className="flex w-full h-full justify-left">
        <img className="ml-[10px] h-full" src={logoPic}></img>
        {location.pathname == "/" || navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `text-lg text-white font-semibold h-full flex px-[10px] items-center justify-center transition-all duration-300 ease-in-out
              ${isActive ? 'border-b-4 border-white' : 'border-b-0'} 
              hover:bg-[#D9A300]`
            }
          >
            <p>{link.text}</p>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default NavBar;
