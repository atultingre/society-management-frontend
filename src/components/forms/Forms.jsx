import { useEffect, useState } from "react";
import { Form, Typography } from "antd";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  createHouse,
  getHouse,
  handleApiError,
  updateHouse,
} from "../../api/service";
import HouseForm from "./HouseForm";
import VehicleForm from "./VehicleForm";

const Forms = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const { token, wing, houseNumber, userId, houses } = useAuth();

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
      {!hasHouse ? (
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
        <HouseForm Form={Form} familyDetails={familyDetails} />
        <VehicleForm
          Form={Form}
          vehicles={vehicles}
          setVehicles={setVehicles}
        />

        <div className=" mx-5">
          {hasHouse ? (
            <button
              htmlType="submit"
              className="block mt-2 w-full rounded-md bg-green-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Update House Details
            </button>
          ) : (
            <button
              htmlType="submit"
              className="block w-full rounded-md bg-green-600  py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save House Details
            </button>
          )}
        </div>
      </Form>
    </>
  );
};

export default Forms;
