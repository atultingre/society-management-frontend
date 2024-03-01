import { Disclosure } from "@headlessui/react";
import { IoClose } from "react-icons/io5";
import { FaBars } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { Link, NavLink, useNavigate } from "react-router-dom";

const NavBar = ({ children }) => {
  const {
    loggedinUserEmail,
    token,
    houses,
    userId,
    showButtons,
    setShowButtons,
  } = useAuth();

  const hasHouse = houses?.some((house) => house.userId === userId);

  const navigate = useNavigate();
  
  const handleLogout = () => {
    ["wing", "email", "houseNumber", "admin", "token", "userId"].forEach(
      (item) => localStorage.removeItem(item)
    );
    setShowButtons(false);
  };

  const handleAddHouseDetails = () => {
    const hasHouse = houses?.some((house) => house.userId === userId);

    if (hasHouse) {
      navigate("/update-house-detail");
    } else {
      navigate("/add-house-detail");
    }
  };

  return (
    <div className="min-h-full">
      <Disclosure as="nav" className="bg-gray-800 w-full">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center">
                  <Link to="/" className="flex-shrink-0">
                    <img
                      className="h-12 w-12"
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                      alt="Laijai Nagri Logo"
                    />
                  </Link>
                </div>
                <div className="hidden md:block">
                  <div className="ml-4 flex items-center md:ml-6">
                    {showButtons && token && (
                      <NavLink
                        onClick={handleAddHouseDetails}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                      >
                        {hasHouse ? "Update details" : "Add details"}
                      </NavLink>
                    )}
                    {showButtons && token ? (
                      <NavLink
                        to={"/"}
                        onClick={handleLogout}
                        className="block rounded-md px-3 py-2 text-white text-base font-medium hover:bg-red-700 hover:text-white"
                      >
                        Logout
                      </NavLink>
                    ) : (
                      <NavLink
                        to={"/login"}
                        onClick={handleLogout}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                      >
                        Login
                      </NavLink>
                    )}
                  </div>
                </div>
                <div className="-mr-2 flex md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <IoClose className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <FaBars className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="md:hidden">
              <div className="border-t border-gray-700 pb-3 pt-4">
                {showButtons && token && (
                  <div className="flex items-center px-5">
                    <div className="">
                      {/* <div className="text-base font-medium leading-none text-white">
                        {user.name}
                      </div> */}
                      <div className="text-sm font-medium leading-none text-gray-400">
                        {loggedinUserEmail}
                      </div>
                    </div>
                  </div>
                )}
                <div className="mt-3 space-y-1 px-2">
                  {showButtons && token && (
                    <NavLink
                      onClick={handleAddHouseDetails}
                      className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                    >
                      {houses?.some((house) => house?.userId === userId)
                        ? "Update details"
                        : "Add details"}
                    </NavLink>
                  )}
                  {showButtons && token ? (
                    <NavLink
                      to={"/login"}
                      onClick={handleLogout}
                      className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                    >
                      Logout
                    </NavLink>
                  ) : (
                    <NavLink
                      to={"/login"}
                      onClick={handleLogout}
                      className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                    >
                      Login
                    </NavLink>
                  )}
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
};

export default NavBar;
