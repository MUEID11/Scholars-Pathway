import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Loading from "../../Components/Loading";
import { Table } from "antd";
import { RiDeleteBinLine, RiEdit2Line } from "react-icons/ri";

import { BiArrowFromLeft, BiDetail } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import { axiosSecure } from "../../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const ManageScholarship = () => {
  const axiosPublic = useAxiosPublic();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: null,
  });
  const {
    data: scholarships = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["scholarships", pagination],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/scholarships?current=${pagination?.current}&pageSize=${pagination?.pageSize}`
      );
      setPagination({ ...pagination, total: res.data.total });
      return res.data.result;
    },
  });
  if (isLoading) return <Loading />;

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      const res = await axiosSecure.delete(`/deletescholarship/${id}`);
      if (res.data.deletedCount > 0) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        refetch();
      }
    }
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
      title: "Scholarship Name",
      dataIndex: "scholarshipName",
      key: "scholarshipName",
    },
    {
      title: "University Name",
      dataIndex: "universityName",
      key: "universityName",
    },
    {
      title: "Subject Category",
      dataIndex: "subjectCategory",
      key: "subjectCategory",
    },
    {
      title: "Applied Degree",
      dataIndex: "degree",
      key: "degree",
    },
    {
      title: "Application Fee",
      dataIndex: `applicationFees`,
      key: "applicationFees",
    },
    {
      title: "Edit",
      dataIndex: "role",
      key: "role",
      render: (text, render) => {
        return (
          <div className="space-x-6 flex items-center">
            <Link to={`/updatescholarship/${render?._id}`}>
              <RiEdit2Line className="text-lg text-green-600" />
            </Link>
            <button onClick={() => handleDelete(render?._id)}>
              <RiDeleteBinLine className="text-lg text-red-600" />
            </button>
            <Link
              to={`/scholarship/${render?._id}`}
              className="flex items-center text-orange-400"
            >
              <BiDetail className="text-lg" /> <BiArrowFromLeft />
            </Link>
          </div>
        );
      },
    },
  ];
  return (
    <div>
       <Helmet>
        <title>Manage Scholarship</title>
      </Helmet>
      <Table
        dataSource={scholarships}
        columns={columns}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
        }}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default ManageScholarship;
