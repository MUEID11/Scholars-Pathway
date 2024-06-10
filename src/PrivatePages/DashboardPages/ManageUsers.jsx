import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Table } from "antd";
import { RiDeleteBinLine } from "react-icons/ri";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [sortByRole, setSortByRole] = useState("");
  //handle pagination
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: null,
  });

  const { data: users = [], refetch } = useQuery({
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/users?current=${pagination?.current}&pageSize=${pagination?.pageSize}&role=${sortByRole}`
      );
      setPagination({ ...pagination, total: res.data.total });
      return res.data.result;
    },
    queryKey: ["users", pagination, sortByRole],
  });
  const handleDeleteUser = (eachUser) => {
    if (eachUser.role === "Admin") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Can't delete an Admin",
      });
    } else {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          axiosSecure.delete(`/users/${eachUser._id}`).then((res) => {
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "User was deleted",
                icon: "success",
              });
            }
          });
        }
      });
    }
  };
  const handleRole = (eachUser, e) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Change Role!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/users/admin?role=${e}&id=${eachUser._id}`)
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              refetch();
              Swal.fire({
                title: "Updated",
                text: `Role updated succesfully`,
                icon: "success",
              });
            }
          });
      } else {
        refetch();
      }
    });
  };
  const handleSortByRole = (role) => {
    setSortByRole(role);
  };
  const handleTableChange = (pagination) => {
    setPagination({
      ...pagination,
      current: pagination?.current,
      pageSize: pagination?.pageSize,
    });
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (text, render) => {
        return (
          <div>
            <select
              defaultValue={render?.role}
              onChange={(e) => handleRole(render, e.target.value)}
              disabled={render?.role === "Admin"}
              name="role"
            >
              <option defaultValue={render.role === "User"} value="User">
                User
              </option>
              <option
                defaultValue={render.role === "Moderator"}
                value="Moderator"
              >
                Moderator
              </option>
              <option defaultValue={render.role === "Admin"} value="Admin">
                Admin
              </option>
            </select>
          </div>
        );
      },
    },
    {
      title: "action",

      render: (text, render) => {
        return (
          <button onClick={() => handleDeleteUser(render)}>
            <RiDeleteBinLine className="text-lg text-red-600" />
          </button>
        );
      },
    },
  ];
  return (
    <section className="container px-4 mx-auto">
       <Helmet>
        <title>Manage Users</title>
      </Helmet>
      <div className="flex items-center gap-x-3 mb-6 justify-between">
        <div>
          <h2 className="text-lg font-medium text-gray-800 dark:text-white ">
            Number Of Users
          </h2>

          <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
            {pagination?.total} users
          </span>
        </div>
        <div className="mr-24 text-sm">
          <select
            value={sortByRole}
            onChange={(e) => handleSortByRole(e.target.value)}
            className="px-3 py-1 border rounded-md"
          >
            <option value="">Sort By Role</option>
            <option value="User">User</option>
            <option value="Moderator">Moderator</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
      </div>
      <Table
        className="overflow-x-auto"
        dataSource={users}
        columns={columns}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
        }}
        onChange={handleTableChange}
      />
    </section>
  );
};

export default ManageUsers;
