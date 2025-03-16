import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { ArrowUp } from "lucide-react";
const Header = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (document.documentElement.scrollTop > 0) {
        setShow(true);
      } else {
        setShow(false);
      }
    });
  }, []);
  const pageUp = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <>
      {show && (
        <div
          className="fixed right-5 bottom-5 bg-sky-400 text-white rounded-full p-2 z-10"
          role="button"
          onClick={pageUp}
        >
          <ArrowUp />
        </div>
      )}
      <div className="flex justify-center items-center gap-3 shadow bg-gray-200 mx-auto w-38 py-2 rounded-full">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "bg-orange-500 text-white rounded-full px-2  transition-all"
              : "text-black"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="cart"
          className={({ isActive }) =>
            isActive
              ? "bg-orange-500 text-white rounded-full px-2  transition-all"
              : "text-black"
          }
        >
          Cart
        </NavLink>
      </div>
    </>
  );
};

export default Header;
