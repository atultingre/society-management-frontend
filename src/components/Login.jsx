import { Form, Input, message } from "antd";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { handleApiError, login } from "../api/service";

const Login = () => {
  const { email, setEmail, password, setPassword, setShowButtons } = useAuth();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await login({
        email: values.email,
        password: values.password,
      });

      if (response) {
        const { token, user } = response.data;
        const { userId, email, admin, house } = user;
        const { wing, houseNumber } = house;

        localStorage.setItem("token", token);
        localStorage.setItem("admin", admin);
        localStorage.setItem("userId", userId);
        localStorage.setItem("email", email);
        localStorage.setItem("wing", wing);
        localStorage.setItem("houseNumber", houseNumber);

        message.success("Login successful!");
        setShowButtons(true);
        navigate("/");
      } else {
        console.error("Error: No response received");
      }
    } catch (error) {
      handleApiError(error);
    }
  };

  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
        // aria-hidden="true"
      >
        <div
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      <Form
        name="login"
        onFinish={onFinish}
        initialValues={{ email, password }}
        className="mx-auto mt-10 max-w-xl lg:px-8 sm:mt-[-25px]"
      >
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to Laijai Nagari
          </h2>
        </div>
        <div className=" mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              {
                type: "email",
                message: "Please enter a valid email address!",
              },
            ]}
          >
            <Input
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className=" flex w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </Form.Item>

          <Form.Item>
            <button
              htmlType="submit"
              className="block mt-2 w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Login
            </button>
          </Form.Item>
          <div className="text-center">
            <span className="mt-10 text-center text-sm text-gray-500">
              don't have account?{" "}
              <Link
                to={"/signup"}
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Signup
              </Link>
            </span>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default Login;
