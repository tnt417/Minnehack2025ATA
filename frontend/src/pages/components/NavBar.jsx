import { NavLink } from 'react-router-dom';

const navLinks = [
  { to: '/explore-groups', text: 'Explore' },
  { to: '/my-groups', text: 'My Groups' },
  { to: '/profile', text: 'Profile' },
];

function NavBar() {
  return (
    <div className="h-[50px] bg-[#FFBF00] w-full shadow-xl flex items-center">
      <div className="flex w-full justify-center space-x-8">
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `text-lg font-semibold transition-all duration-300 ease-in-out px-[10px] pt-[2px] rounded-full
              ${isActive ? 'border-b-4 border-black' : 'border-b-0'} 
              hover:bg-white`
            }
          >
            {link.text}
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default NavBar;
