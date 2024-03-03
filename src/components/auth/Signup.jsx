import { useState } from "react";
import { Form, Input, Select } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { handleApiError, signup } from "../../api/service";

const { Option } = Select;

const Signup = () => {
  const { email, setEmail, password, setPassword, wingEnum } = useAuth();
  const [form] = Form.useForm();
  const [wing, setWing] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    const userData = { email, password, house: { wing, houseNumber } };
    try {
      await signup(userData);
      form.resetFields();
      navigate("/login");
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
        form={form}
        onFinish={handleSubmit}
        className="mx-auto mt-0 max-w-xl lg:px-8 sm:mt-[-70px]"
      >
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Signup to Laijai Nagari
          </h2>
        </div>
        <div className=" mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input
              value={email}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className=" flex w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </Form.Item>

          <Form.Item
            name="wing"
            rules={[{ required: true, message: "Please select your wing!" }]}
          >
            <Select
              value={wing}
              onChange={(value) => setWing(value)}
              placeholder="Select Wing"
              className="block h-10 w-full rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              {wingEnum.map((wing, index) => (
                <Option value={wing} key={index}>
                  {wing}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="houseNumber"
            rules={[
              { required: true, message: "Please input your house number!" },
              { min: 1, message: "House number must be at least 1!" },
              { max: 250, message: "House number must be at most 250!" },
            ]}
          >
            <Input
              type="tel"
              value={houseNumber}
              onChange={(e) => setHouseNumber(e.target.value)}
              placeholder="House Number"
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </Form.Item>

          <Form.Item>
            <button
              htmlType="submit"
              className="block mt-2 w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign Up
            </button>
          </Form.Item>
          <div className="text-center mt-2">
            <span className=" text-center text-sm text-gray-500">
              don't have account?{" "}
              <Link
                to={"/login"}
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Login
              </Link>
            </span>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default Signup;
