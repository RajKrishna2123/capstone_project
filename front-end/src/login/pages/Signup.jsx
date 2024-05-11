import Header from "../components/Header";
import Signup from "../components/Signup";

export default function SignupPage(){
    return (
      <div className="h-full top-0 fixed w-full  flex justify-center backdrop-blur-sm z-[51]">
        <div className="login-bg spin-border rounded-3xl md:min-w-[40%] md:max-w-[40%] m-auto p-4">
          <Header
            heading="Signup to create an account"
            paragraph="Already have an account? "
            linkName="Login"
            linkUrl="/login"
          />
          <Signup />
        </div>
      </div>
    );
}