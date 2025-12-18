import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { auth } from "../utils/firebase";
import { addUser, removeUser } from "../utils/userSlice";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid, email, displayName, photoURL }));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    signOut(auth).catch(() => navigate("/error"));
  };

  return (
    <header
      className="
        fixed top-0 left-0 w-full z-50
        bg-gradient-to-b from-black/90 to-transparent
      "
    >
      <div className="flex items-center justify-between px-4 sm:px-8 py-3">
        {/* Logo */}
        <img
          src={LOGO}
          alt="Netflix Logo"
          className="w-28 sm:w-40 cursor-pointer"
          onClick={() => navigate("/browse")}
        />

        {/* Right Section */}
        {user && (
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Language Selector (only in GPT mode, hidden on mobile) */}
            {showGptSearch && (
              <select
                className="
                  hidden sm:block
                  bg-black bg-opacity-70
                  text-white
                  text-sm
                  px-2 py-1
                  rounded
                  outline-none
                "
                onChange={(e) => dispatch(changeLanguage(e.target.value))}
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang.identifier} value={lang.identifier}>
                    {lang.name}
                  </option>
                ))}
              </select>
            )}

            {/* GPT Toggle */}
            <button
              onClick={() => dispatch(toggleGptSearchView())}
              className="
                bg-purple-700 hover:bg-purple-800
                text-white
                text-xs sm:text-sm
                px-3 py-1.5
                rounded-md
                font-medium
                transition
              "
            >
              {showGptSearch ? "Home" : "GPT Search"}
            </button>

            {/* User Avatar (hidden on mobile) */}
            <img
              src={user.photoURL}
              alt="user"
              className="hidden sm:block w-9 h-9 rounded-full"
            />

            {/* Sign Out */}
            <button
              onClick={handleSignOut}
              className="
                text-white
                text-xs sm:text-sm
                hover:underline
              "
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
