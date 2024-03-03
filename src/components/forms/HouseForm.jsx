import { Input, Select } from "antd";
import { useAuth } from "../../context/AuthContext";
const { Option } = Select;

const HouseForm = ({ Form, familyDetails }) => {
  const { currentlyLiving } = useAuth();

  return (
    <div>
      <div className="flex flex-col mx-5 sm:flex-row sm:mt-5 sm:gap-x-8 sm:gap-y-6 ">
        <div className="w-full">
          <label className="block text-sm font-semibold leading-6 text-gray-900">
            Full Name
          </label>
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input
              type="text"
              className=" flex w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </Form.Item>
        </div>
        <div className="w-full">
          <label className="block text-sm font-semibold leading-6 text-gray-900">
            Contact Number
          </label>
          <Form.Item
            name="contactNumber"
            rules={[
              {
                required: true,
                message: "Please input your contact number!",
              },
              {
                pattern: /^[0-9]{10}$/,
                message: "Contact number must be 10 digits long.",
              },
            ]}
          >
            <Input
              type="tel"
              className=" flex w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </Form.Item>
        </div>
      </div>

      <div className="flex flex-col mx-5 mt-5 sm:flex-row sm:gap-x-8 sm:gap-y-6">
        <div className="w-full">
          <label className="block text-sm font-semibold leading-6 text-gray-900">
            Select Ladies
          </label>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please select the number of ladies!",
              },
            ]}
          >
            <Select
              value={familyDetails.ladies}
              onChange={(value) =>
                setFamilyDetails({
                  ...familyDetails,
                  ladies: parseInt(value, 10),
                })
              }
              className="block h-10 w-full rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              {[...Array(6).keys()].map((number) => (
                <Option key={number} value={number}>
                  {number}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </div>
        <div className="w-full">
          <label className="block text-sm font-semibold leading-6 text-gray-900">
            Select Gents
          </label>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please select the number of gents!",
              },
            ]}
          >
            <Select
              value={familyDetails.gents}
              onChange={(value) =>
                setFamilyDetails({
                  ...familyDetails,
                  gents: parseInt(value, 10),
                })
              }
              className="block h-10 w-full rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              {[...Array(6).keys()].map((number) => (
                <Option key={number} value={number}>
                  {number}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </div>
      </div>

      <div className="flex flex-col mx-5 sm:flex-row sm:gap-x-8 sm:gap-y-6">
        <div className="w-full">
          <label className="block text-sm font-semibold leading-6 text-gray-900">
            Select Boys
          </label>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please select the number of boys!",
              },
            ]}
          >
            <Select
              value={familyDetails.boys}
              onChange={(value) =>
                setFamilyDetails({
                  ...familyDetails,
                  boys: parseInt(value, 10),
                })
              }
              className="block h-10 w-full rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              {[...Array(6).keys()].map((number) => (
                <Option key={number} value={number}>
                  {number}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </div>
        <div className="w-full">
          <label className="block text-sm font-semibold leading-6 text-gray-900">
            Select Girls
          </label>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please select the number of girls!",
              },
            ]}
          >
            <Select
              value={familyDetails.girls}
              onChange={(value) =>
                setFamilyDetails({
                  ...familyDetails,
                  girls: parseInt(value, 10),
                })
              }
              className="block h-10 w-full rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              {[...Array(6).keys()].map((number) => (
                <Option key={number} value={number}>
                  {number}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </div>
        <div className="w-full">
          <label className="block text-sm font-semibold leading-6 text-gray-900">
            currentlyLiving
          </label>
          <Form.Item
            name={"currentlyLiving"}
            rules={[
              {
                required: true,
                message: "Please select the currently living status!",
              },
            ]}
          >
            <Select
              placeholder="Currently Living"
              className="block h-10 w-full rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              {currentlyLiving.map((living, index) => (
                <Option value={living} key={index}>
                  {living}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </div>
      </div>
    </div>
  );
};

export default HouseForm;
