import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

import { Button, Table } from "antd";
import { useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Loading from "../../Components/Loading";
import { Helmet } from "react-helmet-async";

const ManageReviews = () => {
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const getReviews = async ({ queryKey }) => {
    const [{ current, pageSize }] = queryKey;
    const { data } = await axiosPublic.get(
      `/reviews?current=${current}&pageSize=${pageSize}`
    );
    setPagination((prev) => ({ ...prev, total: data.total }));
    return data.result;
  };

  const {
    data: reviews = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["managereviws", pagination],
    queryFn: getReviews,
    keepPreviousData: true,
  });
  const handleTableChange = (pagination) => {
    setPagination({
      ...pagination,
      current: pagination?.current,
      pageSize: pagination?.pageSize,
    });
    refetch();
  };
  const handleDelete = async (id) => {
    try {
      const res = await axiosSecure.delete(`/deletereviews/${id}`);
      if (res.data.deletedCount > 0) {
        Swal.fire("Deleted", "The review was deleted successfully.", "success"); // Use success icon
      }
      refetch(); // Refetch data after successful deletion
    } catch (error) {
      console.error("Error deleting review:", error);
      Swal.fire("Error", "Failed to delete review.", "error"); // Inform user about error
    }
  };
  if (isLoading) {
    return <Loading/>;
  }
  if (isError) {
    return <h1>Error loading reviews.</h1>;
  }
  const columns = [
    {
      title: "Name",
      dataIndex: "applicantName",
      key: "applicantname",
    },
    {
      title: "Email",
      dataIndex: "applicantEmail",
      key: "email",
    },
    {
      title: "Date",
      dataIndex: "reviewDate",
      key: "date",
    },
    {
      title: "Scholarship Name",
      dataIndex: "scholarshipName",
      key: "scholarship name",
    },
    {
      title: "Action",
      render: (text, render) => {
        return (
          <Button
            onClick={() => handleDelete(render?._id)}
            className="bg-red-200"
          >
            delete
          </Button>
        );
      },
    },
  ];

  return (
    <div>
      <Helmet>
        <title>Manage Reviews</title>
      </Helmet>
      <Table
        dataSource={reviews}
        columns={columns}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: pagination.total,
        }}
        onChange={handleTableChange}
      />
      ;
    </div>
  );
};

export default ManageReviews;
