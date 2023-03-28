import NavbarSearchButtonIcon from "../Icons/NavbarSearchButtonIcon";
import { auth } from "../../firebaseConfig";
import { useContext } from "react";
import DefaultIcon from "../../assets/defaultuserimage.jpg";
import { TypeContext } from "../TypeContext";

/**
 * SearchBar component for handling media search functionality.
 */
export function SearchBar({ setsearchTerm, toggle, setToggle, form }) {
   /**
   * Handles search form submission.
   * @param {Event} event - The form submission event.
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    setToggle(!toggle);
    form.current.value = "";
  };

  return (
    <form ref={form} className="flex items-center" onSubmit={handleSubmit}>
      <input
        onChange={(event) => setsearchTerm(event.target.value)}
        className="md:px-4 px-2 py-1 rounded-l-full md:w-full w-16 focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-900 text-white"
        type="text"
        placeholder="Search..."
      />
      <button className="bg-red-500 hover:bg-red-600 md:px-4 md:py-2 pl-[.3rem] pr-[.3rem] h-[36px] rounded-r-full">
        <NavbarSearchButtonIcon />
      </button>
    </form>
  );
}
/**
 * UserAvatar component for displaying user Google avatar or a default image.
 */
export function UserAvatar({ user, toggleDropdown }) {
  return (
    <img
      onClick={toggleDropdown}
      src={user?.photoURL || DefaultIcon}
      alt="User"
      className="md:h-10 h8 md:w-10 w-8 object-cover rounded-full cursor-pointer"
    />
  );
}
/**
 * DropdownMenu component for displaying a dropdown menu with user actions (Login,Logout,Register, & Favorites).
 */
export function DropdownMenu({
  user,
  toggleDropdown,
}) {
  const { setAuthDisplay,setActive } = useContext(TypeContext);
  return (
    <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg">
      {!user ? (
        <>
          <button
            onClick={() => {
              setAuthDisplay("login");
              toggleDropdown();
            }}
            className="w-full py-2 px-4 hover:bg-gray-200 text-left"
          >
            Login
          </button>
          <button
            onClick={() => {
              setAuthDisplay("reg");
              toggleDropdown();
            }}
            className="w-full py-2 px-4 hover:bg-gray-200 text-left"
          >
            Sign up
          </button>
        </>
      ) : (
        <>
        <button
          onClick={() => {
            toggleDropdown();
            setActive("favorites")
          }}
          className="w-full py-2 px-4 hover:bg-gray-200 text-left"
        >
          Favorites
        </button>
        <button
          onClick={() => {
            auth.signOut();
            toggleDropdown();
            localStorage.clear();
            window.location.reload()
          }}
          className="w-full py-2 px-4 hover:bg-gray-200 text-left"
        >
          Sign Out
        </button>
        </>
      )}
    </div>
  );
}
