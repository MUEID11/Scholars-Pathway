import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const EditMyApplication = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  console.log(id);
  const {
    data: appliedApplication,
  } = useQuery({
    queryKey: ["appliedApplication"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/application/${id}`);
      return res.data;
    },
  });
  const handleSubmit = async (e, id) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const phone = form.phone.value;
    const address = form.address.value;
    const degree = form.degree.value;
    const hsc = form.hsc.value;
    const ssc = form.ssc.value;
    const gender = form.gender.value;
    const gap = form.gap.value;
    const formData = {
      applicantName: name,
      applicantAddress: address,
      applicantPhoto: photo,
      applicantPhoneNumber: phone,
      applicantApplyingDegree: degree,
      applicantGender: gender,
      hscResult: hsc,
      sccResult: ssc,
      studyGap: gap,
    };
    try {
      const res = await axiosSecure.patch(`/updateapplied/${id}`, {...formData});
      if (res.status === 200) {
        console.log("Update successful:", res.data);
        Swal.fire("Success", "updated successfully", "success");
        window.location.href = "/dashboard/application";
      } else {
        console.error("Update failed:", res.data);
        // Handle unexpected response statuses
      }
    } catch (error) {
      console.error("Error updating document:", error);
      // Add any error handling here, e.g., showing an error message
    }
  };
  console.log(appliedApplication);
  return (
    <div>
      <Helmet>
        <title>Edit Applications</title>
      </Helmet>
      <h2 className="text-2xl font-bold  text-gray-600">edit application</h2>
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <form
          onSubmit={(e) => handleSubmit(e, id)}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2"
        >
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-bold mb-2"
            >
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={appliedApplication?.applicantName}
              className="input input-bordered w-full"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="photo"
              className="block text-gray-700 font-bold mb-2"
            >
              Photo
            </label>
            <input
              type="text"
              id="photo"
              name="photo"
              defaultValue={appliedApplication?.applicantPhoto}
              className="input input-bordered w-full"
              placeholder="Enter your photo URL"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-gray-700 font-bold mb-2"
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              defaultValue={appliedApplication?.applicantPhoneNumber}
              className="input input-bordered w-full"
              placeholder="Enter your phone number"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="address"
              className="block text-gray-700 font-bold mb-2"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              defaultValue={appliedApplication?.applicantAddress}
              className="input input-bordered w-full"
              placeholder="Enter your address"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="hsc" className="block text-gray-700 font-bold mb-2">
              HSC Result
            </label>
            <input
              type="text"
              id="hsc"
              name="hsc"
              defaultValue={appliedApplication?.hscResult}
              className="input input-bordered w-full"
              placeholder="Enter your HSC result"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="ssc" className="block text-gray-700 font-bold mb-2">
              SSC Result
            </label>
            <input
              type="text"
              id="ssc"
              name="ssc"
              defaultValue={appliedApplication?.sscResult}
              className="input input-bordered w-full"
              placeholder="Enter your SSC result"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="gap" className="block text-gray-700 font-bold mb-2">
              Study Gap
            </label>
            <input
              type="text"
              id="gap"
              name="gap"
              defaultValue={appliedApplication?.studyGap}
              className="input input-bordered w-full"
              placeholder="Enter your study gap"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="degree"
              className="block text-gray-700 font-bold mb-2"
            >
              Degree
            </label>
            <select
              id="degree"
              name="degree"
              defaultValue={appliedApplication?.applicantApplyingDegree}
              className="form-select rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 w-full"
            >
              <option value="mastars">Mastars</option>
              <option value="bachalor">Bachalor</option>
              <option value="agriculture">Agriculture</option>
              <option value="mbbs">MBBS</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="gender"
              className="block text-gray-700 font-bold mb-2"
            >
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              defaultValue={appliedApplication?.applicantGender}
              className="form-select rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 w-full"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="col-span-1 sm:col-span-2">
            <button
              type="submit"
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 w-full sm:w-auto"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMyApplication;
