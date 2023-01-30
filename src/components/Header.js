import React from "react";

const Header = () => {
  if (window.location.pathname === "/") return null;
  // if (window.location.pathname === "/SignUp") return null;
  return (
    <header>
      <div className="title">오뭐신?</div>
    </header>
  );
};

export default Header;
