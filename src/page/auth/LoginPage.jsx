import React from "react";
import LoginForm from '../../_components/loginComponents/LoginForm'
import MobileNavMenu from "../../_components/MobileNavMenu";

const LoginPage = () => (
    <div>
      {/* MobileNavMenu for mobile screens */}
      <div className="lg:hidden">
            <MobileNavMenu />
          </div>
      <LoginForm />
    </div>
  );

  export default LoginPage;