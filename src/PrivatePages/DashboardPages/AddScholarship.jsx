import { useForm } from "react-hook-form";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
const imagebbApiKey = import.meta.env.VITE_IMAGEBB_API_KEY;
console.log(imagebbApiKey);
const imagebbApiUrl = `https://api.imgbb.com/1/upload?key=${imagebbApiKey}`;
const AddScholarship = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const onSubmit = async (data) => {
    try {
      // Display processing alert
      Swal.fire({
        title: "Processing...",
        text: "Please wait...",
        icon: "info",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      // Upload image
      const imageFile = { image: data.universityimage[0] };
      const res = await axiosPublic.post(imagebbApiUrl, imageFile, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Close processing alert if upload is successful
      Swal.close();

      if (res.data.success) {
        const formData = {
          scholarshipName: data?.scholarshipname,
          universityName: data?.universityname,
          universityCountry: data?.universitycountry,
          universityCity: data?.universitycity,
          universityImage: res?.data?.data?.display_url,
          worldRank: Number(data?.worldrank),
          degree: data?.degree,
          subjectCategory: data?.subjectcategory,
          scholarshipType: data?.scholarshiptype,
          applicationFees: parseInt(data?.fees),
          serviceCharge: parseInt(data?.servicecharge),
          postedOn: new Date(data?.postdate).getTime(),
          deadLine: new Date(data?.deadline).getTime(),
          contactEmail: data?.email,
          discripiton: data?.discripiton,
        };
        console.log("here is your data", formData);
        // Send data to API
        const scholarshipRes = await axiosSecure.post("/scholarship", formData);
        console.log(scholarshipRes.data);
        if (scholarshipRes.data.insertedId) {
          Swal.fire({
            title: "Scholarship added!",
            text: "Scholarship added successfully!",
            icon: "success",
          });
          reset();
        } else {
          Swal.fire({
            title: "Error",
            text: "An error occurred. Please try again.",
            icon: "error",
          });
        }
      }
    } catch (error) {
      // Close processing alert and show error alert
      Swal.fire({
        title: "Error",
        text: "An error occurred while uploading the image. Please try again.",
        icon: "error",
      });
    }
  };

  return (
    <div className="container mx-auto p-2">
      <h1 className="text-xl font-bold text-slate-600 mb-2">Add Scholarship</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-1"
      >
        <div className="form-control">
          <label className="label">
            <span className="label-text">Scholarship Name</span>
          </label>
          <input
            name="scholarshipname"
            {...register("scholarshipname", { required: true })}
            type="text"
            placeholder="Scholarship Name"
            className="input input-bordered w-full"
          />
          {errors.scholarshipname && (
            <span className="text-xs text-red-500">This field is required</span>
          )}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">University Name</span>
          </label>
          <input
            name="universityname"
            {...register("universityname", { required: true })}
            type="text"
            placeholder="University Name"
            className="input input-bordered w-full"
          />
          {errors.universityname && (
            <span className="text-xs text-red-500">This field is required</span>
          )}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">University Image</span>
          </label>
          <input
            name="universityimage"
            {...register("universityimage", { required: true })}
            type="file"
            className="file-input file-input-bordered w-full"
          />
          {errors.universityimage && (
            <span className="text-xs text-red-500">This field is required</span>
          )}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">University Country</span>
          </label>
          <input
            name="universitycountry"
            {...register("universitycountry", { required: true })}
            type="text"
            placeholder="University Country"
            className="input input-bordered w-full"
          />
          {errors.universitycountry && (
            <span className="text-xs text-red-500">This field is required</span>
          )}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">University City</span>
          </label>
          <input
            name="univeristycity"
            {...register("universitycity", { required: true })}
            type="text"
            placeholder="University City"
            className="input input-bordered w-full"
          />
          {errors.universitycity && (
            <span className="text-xs text-red-500">This field is required</span>
          )}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">University World Rank</span>
          </label>
          <input
            name="worldrank"
            {...register("worldrank", { required: true })}
            type="number"
            placeholder="University World Rank"
            className="input input-bordered w-full"
          />
          {errors.worldrank && (
            <span className="text-xs text-red-500">This field is required</span>
          )}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Subject Category</span>
          </label>
          <select
            name="subjectcategory"
            {...register("subjectcategory", { required: true })}
            className="select select-bordered w-full"
          >
            <option value="">Select category</option>
            <option>Agriculture</option>
            <option>Engineering</option>
            <option>Doctor</option>
          </select>
          {errors.subjectcategory && (
            <span className="text-xs text-red-500">This field is required</span>
          )}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Scholarship type</span>
          </label>
          <select
            name="scholarshiptype"
            {...register("scholarshiptype", { required: true })}
            className="select select-bordered w-full"
          >
            <option value="">Select type</option>
            <option>Full free</option>
            <option>Half free</option>
            <option>Self-fund</option>
          </select>
          {errors.scholarshipcategory && (
            <span className="text-xs text-red-500">This field is required</span>
          )}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Degree</span>
          </label>
          <select
            name="degree"
            {...register("degree", { required: true })}
            className="select select-bordered w-full"
          >
            <option value="">Select degree</option>
            <option>Diploma</option>
            <option>Bachelor</option>
            <option>Masters</option>
          </select>
          {errors.degree && (
            <span className="text-xs text-red-500">This field is required</span>
          )}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Application Fees</span>
          </label>
          <input
            name="fees"
            {...register("fees", { required: true })}
            type="number"
            placeholder="Application Fees"
            className="input input-bordered w-full"
          />
          {errors.fees && (
            <span className="text-xs text-red-500">This field is required</span>
          )}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Service Charge</span>
          </label>
          <input
            name="servicecharge"
            {...register("servicecharge", { required: true })}
            type="number"
            placeholder="Service Charge"
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Scholarship Post Date</span>
          </label>
          <input
            type="date"
            name="postdate"
            {...register("postdate", { required: true })}
            className="input input-bordered w-full"
          />
          {errors.postdate && (
            <span className="text-xs text-red-500">This field is required</span>
          )}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Application Deadline</span>
          </label>
          <input
            type="date"
            name="deadline"
            {...register("deadline", { required: true })}
            className="input input-bordered w-full"
          />
          {errors.deadline && (
            <span className="text-xs text-red-500">This field is required</span>
          )}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Posted User Email</span>
          </label>
          <input
            name="email"
            {...register("email", { required: true })}
            type="email"
            placeholder="Posted User Email"
            className="input input-bordered w-full"
          />
          {errors.useremail && (
            <span className="text-xs text-red-500">This field is required</span>
          )}
        </div>
        <div className="form-control md:col-span-2">
          <label className="label">
            <span className="label-text">Scholarship discription</span>
          </label>
          <input
            name="discription"
            {...register("discription", { required: true })}
            type="discription"
            placeholder="Scholarship discription"
            className="input input-bordered w-full"
          />
          {errors.descripiton && (
            <span className="text-xs text-red-500">This field is required</span>
          )}
        </div>

        <div className="form-control md:col-span-2 mt-2">
          <button type="submit" className="btn bg-yellow-500 w-full">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddScholarship;
