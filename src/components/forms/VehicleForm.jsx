import { Button, Input, Select } from "antd";
import { useAuth } from "../../context/AuthContext";
const { Option } = Select;

const VehicleForm = ({ Form, vehicles, setVehicles }) => {
  const { vehicleType, vehicleFuelType } = useAuth();

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
  return (
    <div>
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
              <Button
                className="w-full"
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
          className=" block mt-2 w-full rounded-md bg-blue-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={addVehicle}
        >
          Add Vehicle
        </button>
      </div>
    </div>
  );
};

export default VehicleForm;
