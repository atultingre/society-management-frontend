import { useEffect, useState } from "react";
import { Form, Input, Button, Select, message, Typography } from "antd";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  createHouse,
  getHouse,
  handleApiError,
  updateHouse,
} from "../api/service";

const { Option } = Select;

const HouseForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const {
    token,
    wing,
    houseNumber,
    userId,
    currentlyLiving,
    vehicleType,
    vehicleFuelType,
    houses,
  } = useAuth();

  const hasHouse = houses.some((house) => house.userId === userId);

  const [vehicles, setVehicles] = useState([
    {
      vehicleType: "",
      vehicleModel: "",
      vehicleFuelType: "",
      vehicleRegistrationNumber: "",
    },
  ]);

  const [familyDetails, setFamilyDetails] = useState({
    ladies: 0,
    gents: 0,
    boys: 0,
    girls: 0,
  });

  const fetchData = async () => {
    try {
      if (hasHouse) {
        const houseDetails = await getHouse({
          token,
          wing,
          houseNumber,
          userId,
        });

        const {
          name,
          contactNumber,
          vehicles,
          familyDetails,
          currentlyLiving,
        } = houseDetails;

        form.setFieldsValue({
          name,
          contactNumber,
          currentlyLiving,
        });
        setVehicles(vehicles);
        setFamilyDetails(familyDetails);
      }
    } catch (error) {
      handleApiError(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleVehicleChange = (index, field, value) => {
    const newVehicles = [...vehicles];
    newVehicles[index][field] = value;
    setVehicles(newVehicles);
  };

  const addVehicle = () => {
    setVehicles([
      ...vehicles,
      {
        vehicleType: "",
        vehicleModel: "",
        vehicleFuelType: "",
        vehicleRegistrationNumber: "",
      },
    ]);
  };

  const removeVehicle = (index) => {
    const newVehicles = [...vehicles];
    newVehicles.splice(index, 1);
    setVehicles(newVehicles);
  };

  const handleSubmit = async (values) => {
    try {
      if (hasHouse) {
        await updateHouse({
          data: { ...values, vehicles, familyDetails },
          wing,
          houseNumber,
          userId,
          token,
        });
      } else {
        await createHouse({
          data: { ...values, vehicles, familyDetails },
          wing,
          houseNumber,
          userId,
          token,
        });
      }

      navigate("/");
    } catch (error) {
      handleApiError(error);
    }
  };

  return (
    <>
      {hasHouse ? (
        <Typography.Title level={3} className="text-center">
          Add House Details
        </Typography.Title>
      ) : (
        <Typography.Title level={3} className="text-center">
          Update House Details
        </Typography.Title>
      )}

      <Form
        form={form}
        onFinish={handleSubmit}
        className="mx-auto mt-10 max-w-xl sm:mt-5"
      >
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
        {vehicles.map((vehicle, index) => (
          <div key={index} className="sm:flex sm:flex-col">
            <div className="flex flex-col sm:flex-row mx-5 mt-0 sm:gap-x-8 sm:gap-y-6">
              <div className="w-full">
                <label className="block text-sm font-semibold leading-6 text-gray-900">
                  Vehicle Type
                </label>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Please select a vehicle type!",
                    },
                  ]}
                >
                  <Select
                    value={vehicle.vehicleType}
                    onChange={(value) =>
                      handleVehicleChange(index, "vehicleType", value)
                    }
                    className="block h-10 w-full rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    {vehicleType.map((type, idx) => (
                      <Option value={type} key={idx}>
                        {type}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
              <div className="w-full">
                <label className="block text-sm font-semibold leading-6 text-gray-900">
                  Vehicle Model
                </label>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Please input the vehicle model!",
                    },
                  ]}
                >
                  <Input
                    value={vehicle.vehicleModel}
                    onChange={(e) =>
                      handleVehicleChange(index, "vehicleModel", e.target.value)
                    }
                    className=" flex w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </Form.Item>
              </div>
            </div>
            <div className="flex flex-col mx-5 sm:flex-row sm:items-center sm:gap-x-8 sm:gap-y-6">
              <div className="w-full">
                <label className="block text-sm font-semibold leading-6 text-gray-900">
                  Fuel Type
                </label>
                <Form.Item
                  rules={[
                    { required: true, message: "Please select a fuel type!" },
                  ]}
                >
                  <Select
                    value={vehicle.vehicleFuelType}
                    onChange={(value) =>
                      handleVehicleChange(index, "vehicleFuelType", value)
                    }
                    className="block h-10 w-full rounded-md border-0  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    {vehicleFuelType.map((fuel, idx) => (
                      <Option value={fuel} key={idx}>
                        {fuel}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
              <div className="w-full">
                <label className="block text-sm font-semibold leading-6 text-gray-900">
                  Registration Number
                </label>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Please input the vehicle registration number!",
                    },
                  ]}
                >
                  <Input
                    value={vehicle.vehicleRegistrationNumber}
                    onChange={(e) =>
                      handleVehicleChange(
                        index,
                        "vehicleRegistrationNumber",
                        e.target.value
                      )
                    }
                    className=" flex w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </Form.Item>
              </div>
              <div className="w-full">
                <Button className="w-full"
                  size="large"
                  type="primary"
                  danger
                  onClick={() => removeVehicle(index)}
                >
                  Remove Vehical
                </Button>
              </div>
            </div>
          </div>
        ))}
        <div className=" mx-5">
          <button
            className=" block mt-2 w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={addVehicle}
          >
            Add Vehicle
          </button>
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
        <div className=" mx-5">
          {hasHouse ? (
            <button
              htmlType="submit"
              className="block mt-2 w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Update House Details
            </button>
          ) : (
            <button
              htmlType="submit"
              className="block w-full rounded-md bg-green-600  py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save House Details
            </button>
          )}
        </div>
      </Form>
    </>
  );
};

export default HouseForm;
