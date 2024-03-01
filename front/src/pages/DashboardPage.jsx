import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SchoolSignup from "../components/Dashboard/SchoolSignup";
import DataTable from "../components/Dashboard/DataTable";

function DashboardPage() {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    // console.log('dashboard2')
    if (userInfo?.role !== "admin") {
      navigate("/");
    }
  }, [userInfo, navigate]);
  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <div
        style={{
          width: "200px",
          backgroundColor: "#f0f0f0",
          padding: "20px",
          minHeight: "60vh",
        }}
      >
        <SchoolSignup />
        {/* You can add more sidebar content here */}
      </div>
      {/* Main Content */}
      <div style={{ flex: 1, padding: "20px" }}>
        <DataTable />
      </div>
    </div>
  );
}

export default DashboardPage;
