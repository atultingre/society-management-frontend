import { useEffect, useState } from "react";
import { Table, Button, Space, Tag, Typography, Input } from "antd";

// components
import { useAuth } from "../context/AuthContext";
import { getAllHouses, handleApiError } from "../api/service";
import DeleteModal from "./DeleteModal";

const HouseList = () => {
  const { token, houses, setHouses, isAdmin, showButtons } = useAuth();
  const [searchInput, setSearchInput] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedHouse, setSelectedHouse] = useState();
  console.log("isAdmin: ", isAdmin);

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const response = await getAllHouses();
        setHouses(response);
      } catch (error) {
        handleApiError(error);
      }
    };

    fetchHouses();
  }, [setHouses]);

  const columns = [
    {
      title: "Sr. No",
      dataIndex: "",
      rowScope: "row",
      render: (_, __, index) => index + 1,
      width: 90,
    },
    {
      title: "House",
      dataIndex: "house",
      key: "house",
      render: (house) => (
        <>
          {house.wing} - {house.houseNumber}
        </>
      ),
      width: 130,
      fixed: "left",
      sorter: (a, b) =>
        `${a.house.wing} ${a.house.houseNumber}`.localeCompare(
          `${b.house.wing} ${b.house.houseNumber}`
        ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 270,
    },
    {
      title: "Contact Number",
      dataIndex: "contactNumber",
      key: "contactNumber",
      width: 170,
    },
    {
      title: "Family Members",
      dataIndex: "familyDetails",
      key: "familyDetails",
      render: (familyDetails) => <>{familyDetails.totalFamilyMembers}</>,
      width: 130,
    },
    {
      title: "Vehicles Number",
      dataIndex: "vehicles",
      key: "vehicles",
      width: 160,

      render: (vehicles) => (
        <>
          {vehicles.map((vehicle, index) => (
            <div key={index}>{vehicle.vehicleRegistrationNumber}</div>
          ))}
        </>
      ),
    },
    {
      title: "Currently Living",
      dataIndex: "currentlyLiving",
      key: "currentlyLiving",
      render: (currentlyLiving) => (
        <Tag color={currentlyLiving === "Yes" ? "green" : "red"}>
          {currentlyLiving}
        </Tag>
      ),
      width: 160,
      sorter: (a, b) =>
        (a.currentlyLiving === "Yes" ? 1 : -1) -
        (b.currentlyLiving === "Yes" ? 1 : -1),
    },
    isAdmin &&
      showButtons &&
      token && {
        title: "Actions",
        key: "actions",
        width: 100,
        render: (text, record) => (
          <Button onClick={() => handleDelete(record)} type="primary" danger>
            Delete
          </Button>
        ),
      },
  ].filter(Boolean);

  const handleDelete = async (house) => {
    setSelectedHouse(house);
    setOpen(true);
  };

  const handleSearch = (value) => {
    setSearchInput(value);
  };

  const filteredHouses = houses.filter((house) => {
    const searchString = `${house.house.wing} ${house.house.houseNumber} ${
      house.name
    } ${house.contactNumber} ${house.currentlyLiving} ${house.vehicles
      .map((v) => v.vehicleRegistrationNumber)
      .join(" ")}`;
    return searchString.toLowerCase().includes(searchInput.toLowerCase());
  });

  return (
    <div>
      <div className="m-5 sm:m-0">
        <Input
          placeholder="Search House, name, vehicle"
          onChange={(e) => handleSearch(e.target.value)}
          value={searchInput}
          className=" flex w-full mb-2 rounded-md border-0 px-4 py-2.5  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
      <Table
        className="m-1 sm:m-0"
        dataSource={filteredHouses}
        columns={columns}
        rowKey="_id"
        scroll={{ x: 1100 }}
        title={() => (
          <Space style={{ display: "flex", justifyContent: "center" }}>
            <Typography.Title level={3} className="text-red-900">
              Laijai Nagri Houses{" "}
            </Typography.Title>
          </Space>
        )}
        size="small"
        pagination={{
          position: ["bottomCenter"],
        }}
        // onRow={(record, rowIndex) => {
        //   return {
        //     onClick: (event) => {
        //       console.log("record", record);
        //     },
        //   };
        // }}
      />
      <DeleteModal
        open={open}
        setOpen={setOpen}
        selectedHouse={selectedHouse}
      />
    </div>
  );
};

export default HouseList;
