import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Table, Tooltip } from "antd";
// import Swal from "sweetalert2";
import { useState } from "react";
import { Link } from "react-router-dom";
import { BiArrowFromLeft, BiDetail } from "react-icons/bi";
import { FcCancel } from "react-icons/fc";
import { RiEdit2Line } from "react-icons/ri";
import { MdRateReview } from "react-icons/md";

const AppliedScholarship = () => {
  const axiosSecure = useAxiosSecure();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: null,
  });
  const { data: appliedApplications = [] } = useQuery({
    queryKey: ["allapplied", pagination],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/allapplied?current=${pagination?.current}&pageSize=${pagination?.pageSize}`
      );
      setPagination({ ...pagination, total: res.data.total });
      return res.data.result;
    },
  });
  const applies = pagination?.total;
  const handleTableChange = (pagination) => {
    setPagination({
      ...pagination,
      current: pagination?.current,
      pageSize: pagination?.pageSize,
    });
  };

  const columns = [
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
      title: "Subject Degree",
      dataIndex: "degree",
      key: "degree",
    },
    {
      title: "Application Fees ($)",
      dataIndex: "applicationFees",
      key: "applicationFees",
    },
    {
      title: "Serive Charge ($)",
      dataIndex: "serviceCharge",
      key: "serviceCharge",
    },
    {
      title: "status",
      dataIndex: "applicationStatus",
      key: "status",
    },
    {
      title: "Add review",
      render: (text, render) => {
        return (
          <div>
            <Tooltip title="add review">
              <button>
                <MdRateReview />
              </button>
            </Tooltip>
          </div>
        );
      },
    },
    {
      title: "Action",
      render: (text, render) => {
        return (
          <div className="space-x-6 flex items-center">
            <Tooltip title="Edit Application">
              <Link to={`/updateapplied/${render?._id}`}>
                <RiEdit2Line className="text-lg text-green-600" />
              </Link>
            </Tooltip>
            <Tooltip title="Cancle Application">
              <button onClick={() => handleCancle(render?.serviceId)}>
                <FcCancel className="text-lg text-red-600" />
              </button>
            </Tooltip>
            <Tooltip title="View Details">
              <Link
                to={`/applied/${render?.serviceId}`}
                className="flex items-center text-orange-400"
              >
                <BiDetail className="text-lg" /> <BiArrowFromLeft />
              </Link>
            </Tooltip>
          </div>
        );
      },
    },
  ];
  return (
    <div>
      {applies === 0 ? (
        <div className="flex flex-col justify-center items-center mt-6">
          <h2 className="text-2xl font-bold text-yellow-500">Not applied Yet!! Limited scholarship, get your chance to carry out your dream</h2>{" "}
          <Link className="btn bg-violet-500 mt-4 text-white" to="/all">Apply Here</Link>
        </div>
      ) : (
        <section className="container px-4 mx-auto">
          <div className="flex items-center gap-x-3 mb-6 justify-between">
            <div>
              <h2 className="text-lg font-medium text-gray-800 dark:text-white ">
               Manage Application
              </h2>

              <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
                {pagination?.total}
              </span>
            </div>
            <div className="mr-24">Sorting </div>
          </div>
          <Table
            className="overflow-x-auto"
            dataSource={appliedApplications}
            columns={columns}
            pagination={{
              current: pagination.current,
              pageSize: pagination.pageSize,
              total: pagination.total,
            }}
            onChange={handleTableChange}
          />
        </section>
      )}
    </div>
  );
};

export default AppliedScholarship;
