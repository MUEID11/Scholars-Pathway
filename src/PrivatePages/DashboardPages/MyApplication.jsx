import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Table, Tooltip } from "antd";
// import Swal from "sweetalert2";
import { useState } from "react";
import { Link } from "react-router-dom";
import { BiArrowFromLeft, BiDetail } from "react-icons/bi";
import { FcCancel } from "react-icons/fc";

import { MdRateReview } from "react-icons/md";
import Loading from "../../Components/Loading";
import Swal from "sweetalert2";
import { RiEdit2Line } from "react-icons/ri";

const MyApplication = () => {
  const axiosSecure = useAxiosSecure();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: null,
  });
  const {
    data: appliedApplications = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["applied", pagination],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/applied?current=${pagination?.current}&pageSize=${pagination?.pageSize}`
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
  const handleCancelation = async (id) => {
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
          applicationStatus: "cancelled",
        });
        console.log(data);
        refetch();
        Swal.fire("Cancel!", "Your will be cancelled", "success");
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

  if (isLoading) return <Loading />;
  const columns = [
    {
      title: "University Name",
      dataIndex: "universityName",
      key: "universityName",
    },
    {
      title: "University Address",
      dataIndex: "universityCity",
      key: "UniversityCity",
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
      title: "Feedback",
      render: (text, render) => {
        return (
          <Tooltip
            title={
              render?.feedback ? render?.feedback : "No feedback is given yet"
            }
          >
            {text ? "Hover for feedback" : "No feedback available"}
          </Tooltip>
        );
      },
    },
    {
      title: "Add review",
      render: (text, render) => {
        return (
          <div>
            <Tooltip title="add review">
              <Link to={`/dashboard/review/${render?.scholarshipId}`}>
                <MdRateReview />
              </Link>
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
            <Tooltip title="View Details">
              <button
                onClick={() => showDetails(render?._id)}
                className="flex items-center text-orange-400"
              >
                <BiDetail className="text-lg" /> <BiArrowFromLeft />
              </button>
            </Tooltip>
            <Tooltip title="Edit Application">
              {/* <button onClick={()=>handleEdit(render?._id)}>
                <RiEdit2Line className="text-lg text-green-600" />
              </button> */}
              <Link to={`/dashboard/editapplication/${render?._id}`}>
                <RiEdit2Line className="text-lg text-green-600" />
              </Link>
            </Tooltip>
            <Tooltip
              title={
                render?.applicationStatus
                  ? "Your Application was rejected"
                  : "Cancle request"
              }
            >
              <button onClick={() => handleCancelation(render?._id)}>
                <FcCancel className="text-lg text-red-600" />
              </button>
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
          <h2 className="text-2xl font-bold text-yellow-500">
            Not applied Yet!! Limited scholarship, get your chance to carry out
            your dream
          </h2>{" "}
          <Link className="btn bg-violet-500 mt-4 text-white" to="/all">
            Apply Here
          </Link>
        </div>
      ) : (
        <section className="container px-4 mx-auto">
          <div className="flex items-center gap-x-3 mb-6 justify-between">
            <div>
              <h2 className="text-lg font-medium text-gray-800 dark:text-white ">
                You applied for
              </h2>

              <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
                {pagination?.total} Application
              </span>
            </div>
            <div className="mr-24">Sorting user</div>
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

export default MyApplication;
