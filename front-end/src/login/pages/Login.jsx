import Header from "../components/Header"
import Login from "../components/Login"
import "../../styling.css"

export default function LoginPage({ setIsVisible }) {
  return (
    <div className="h-full top-0 fixed w-full  flex justify-center backdrop-blur-sm z-[51]">
      <div className="login-bg spin-border rounded-3xl md:min-w-[40%] md:max-w-[40%] m-auto p-4">
        <button
          className="absolute top-4 right-4 text-2xl text-gray-400"
          onClick={() => {
            setIsVisible(false);
          }}
        >
          X
        </button>
        <Header
          heading="Login to your account"
          paragraph="Don't have an account yet? "
          linkName="Signup"
          linkUrl="/signup"
        />
        <Login />
      </div>
    </div>
  );
}