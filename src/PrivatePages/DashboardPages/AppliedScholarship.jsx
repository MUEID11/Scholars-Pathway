import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Table, Tooltip } from "antd";
import { useState } from "react";
import { BiArrowFromLeft, BiDetail } from "react-icons/bi";
import { FcCancel } from "react-icons/fc";
import { RiEdit2Line } from "react-icons/ri";
import Swal from "sweetalert2";
import Loading from "../../Components/Loading";
import { Helmet } from "react-helmet-async";

const AppliedScholarship = () => {
  const axiosSecure = useAxiosSecure();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: null,
  });

  const {
    data: appliedApplications = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["allapplied", pagination.current, pagination.pageSize],
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

  const handleStatusChange = async (id, newStatus) => {
    try {
      const { data } = await axiosSecure.patch(`/updateapplied/${id}`, {
        applicationStatus: newStatus,
      });
      console.log(data);
      refetch();
    } catch (error) {
      console.error("Error updating service status:", error);
    }
  };

  const handleCancel = async (e, id) => {
    e.preventDefault();

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
      cancelButtonText: "No, keep it",
    });

    if (result.isConfirmed) {
      try {
        const { data } = await axiosSecure.patch(`/updateapplied/${id}`, {
          applicationStatus: "rejected",
        });
        console.log(data);
        refetch();
        Swal.fire(
          "Cancelled!",
          "Your application has been cancelled.",
          "success"
        );
      } catch (error) {
        console.error("Error updating service status to rejected:", error);
        Swal.fire(
          "Error!",
          "There was a problem cancelling your application.",
          "error"
        );
      }
    }
  };

  const handleFeedback = async (id) => {
    try {
      const { value: feedback } = await Swal.fire({
        title: "Submit your feedback",
        input: "textarea",
        inputPlaceholder: "Type your feedback here",
        showCancelButton: true,
        confirmButtonText: "Submit",
        cancelButtonText: "Cancel",
      });
      if (feedback) {
        try {
          const res = await axiosSecure.patch(`/updateapplied/${id}`, {
            feedback: feedback,
          });
          console.log(res.data);
          Swal.fire("Success", "Feedback submitted successfully", "success");
        } catch (error) {
          console.error("Error submitting feedback:", error);
          Swal.fire("Error", "Failed to submit feedback", "error");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const showDetails = async (id) => {
    try {
      const { data } = await axiosSecure.get(`/application/${id}`);
      if (data) {
        Swal.fire({
          title: "Application Details",
          html: `
            <div class="flex flex-col space-y-1 text-sm">
              <div class="flex justify-between"><strong>Scholarship Name:</strong> <span>${
                data.scholarshipName
              }</span></div>
              <div class="flex justify-between"><strong>University Name:</strong> <span>${
                data.universityName
              }</span></div>
              <div class="flex justify-between"><strong>Degree:</strong> <span>${
                data.degree
              }</span></div>
              <div class="flex justify-between"><strong>Subject Category:</strong> <span>${
                data.subjectCategory
              }</span></div>
              <div class="flex justify-between"><strong>Scholarship Type:</strong> <span>${
                data.scholarshipType
              }</span></div>
              <div class="flex justify-between"><strong>Application Fees:</strong> <span>$${
                data.applicationFees
              }</span></div>
              <div class="flex justify-between"><strong>Service Charge:</strong> <span>$${
                data.serviceCharge
              }</span></div>
              <div class="flex justify-between"><strong>Posted On:</strong> <span>${new Date(
                data.postedOn
              ).toLocaleDateString()}</span></div>
              <div class="flex justify-between"><strong>Deadline:</strong> <span>${new Date(
                data.deadLine
              ).toLocaleDateString()}</span></div>
              <div class="flex justify-between"><strong>Contact Email:</strong> <span>${
                data.contactEmail
              }</span></div>
              <div class="flex justify-between"><strong>Applicant Name:</strong> <span>${
                data.applicantName
              }</span></div>
              <div class="flex justify-between"><strong>Applicant Email:</strong> <span>${
                data.applicantEmail
              }</span></div>
              <div class="flex justify-between"><strong>Applicant Phone Number:</strong> <span>${
                data.applicantPhoneNumber
              }</span></div>
              <div class="flex justify-between"><strong>Applicant Address:</strong> <span>${
                data.applicantAddress
              }</span></div>
              <div class="flex justify-between"><strong>Applicant Gender:</strong> <span>${
                data.applicantGender
              }</span></div>
              <div class="flex justify-between"><strong>Applicant Applying Degree:</strong> <span>${
                data.applicantApplyingDegree
              }</span></div>
              <div class="flex justify-between"><strong>SSC Result:</strong> <span>${
                data.sscResult
              }</span></div>
              <div class="flex justify-between"><strong>HSC Result:</strong> <span>${
                data.hscResult
              }</span></div>
              <div class="flex justify-between"><strong>Study Gap:</strong> <span>${
                data.studyGap
              } years</span></div>
            </div>
          `,
          width: window.innerWidth > 1200 ? "40%" : "90%",
          padding: "1em",
          background: "#fff",
          confirmButtonText: "Close",
        });
      }
    } catch (error) {
      console.error("Error fetching application details:", error);
      Swal.fire("Error", "Failed to fetch application details", "error");
    }
  };

  const renderDate = (date) => {
    return date ? new Date(date).toLocaleDateString() : "-";
  };

  const renderAppliedDate = (date) => {
    return date ? new Date(date).toLocaleDateString() : "-";
  };

  if (isLoading) return <Loading />;

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
      title: "Service Charge ($)",
      dataIndex: "serviceCharge",
      key: "serviceCharge",
    },
    {
      title: "Applied Date",
      dataIndex: "date",
      key: "appliedDate",
      render: (text, record) => renderAppliedDate(record?.date),
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
    },
    {
      title: "Deadline",
      dataIndex: "deadLine",
      key: "deadline",
      render: (text, record) => renderDate(record?.deadLine),
      sorter: (a, b) => new Date(a.deadLine) - new Date(b.deadLine),
    },
    {
      title: "Status",
      dataIndex: "applicationStatus",
      key: "status",
      render: (text, render) => (
        <select
          value={render.applicationStatus}
          disabled={
            render?.applicationStatus === "accepted" ||
            render?.applicationStatus === "cancelled"
          }
          onChange={(e) => handleStatusChange(render?._id, e.target.value)}
        >
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="accepted">Accepted</option>
          <option value="rejected">Rejected</option>
        </select>
      ),
    },
    {
      title: "Action",
      render: (text, render) =>
        render?.applicationStatus === "cancelled" ? (
          "Request withdrawn"
        ) : (
          <div className="space-x-6 flex items-center">
            <Tooltip title="View Details">
              <button
                onClick={() => showDetails(render?._id)}
                className="flex items-center text-orange-400"
              >
                <BiDetail className="text-lg" /> <BiArrowFromLeft />
              </button>
            </Tooltip>
            <Tooltip title="Feedback">
              <button onClick={() => handleFeedback(render?._id)}>
                <RiEdit2Line className="text-lg text-green-600" />
              </button>
            </Tooltip>
            <Tooltip
              title={
                render?.applicationStatus === "accepted"
                  ? "Already Accepted"
                  : "Cancel Application"
              }
            >
              <button
                disabled={render?.applicationStatus === "accepted"}
                onClick={(e) => handleCancel(e, render?._id)}
              >
                <FcCancel className="text-lg text-red-600" />
              </button>
            </Tooltip>
          </div>
        ),
    },
  ];

  return (
    <div>
      <Helmet>
        <title>Applied Applications</title>
      </Helmet>
      {applies === 0 ? (
        <div className="flex flex-col justify-center items-center mt-6">
          <h2 className="text-2xl font-bold text-yellow-500">
            No Applications found
          </h2>
        </div>
      ) : (
        <section className="container px-4 mx-auto">
          <div className="flex space-x-2 mb-6">
            <h2 className="text-lg font-medium text-gray-800 dark:text-white ">
              Manage Applications
            </h2>
            <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
              {pagination?.total}
            </span>
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
            mobileBreakPoint={768}
          />
        </section>
      )}
    </div>
  );
};

export default AppliedScholarship;
