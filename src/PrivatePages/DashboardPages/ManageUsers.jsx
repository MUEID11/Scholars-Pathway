import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Table } from "antd";
import { RiDeleteBinLine } from "react-icons/ri";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
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
              onChange={(e) => handleRole(render, e.target.value)}
              name="role"
            >
              <option selected={render.role === "User"} value="User">
                User
              </option>
              <option selected={render.role === "Moderator"} value="Moderator">
                Moderator
              </option>
              <option selected={render.role === "Admin"} value="Admin">
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
      <div className="flex items-center gap-x-3">
        <h2 className="text-lg font-medium text-gray-800 dark:text-white">
          Number Of Users
        </h2>

        <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
          {users.length} users
        </span>
      </div>
      <Table className="overflow-x-auto" dataSource={users} columns={columns} />
    </section>
  );
};

export default ManageUsers;
