import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Components/Loading";

const UpdateScholarship = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const axiosSceure = useAxiosSecure();
  const { id } = useParams();
  const {
    data: scholarshipdetails = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["datails", id],
    queryFn: async () => {
      try {
        const res = await axiosSceure.get(`/scholarship/${id}`);
        return res.data;
      } catch (error) {
        console.log(error.message);
        throw error;
      }
    },
  });
  if (isLoading) return <Loading />;

  const onSubmit = async (data) => {
    const formData = {
      scholarshipName: data?.scholarshipname,
      universityName: data?.universityname,
      universityCountry: data?.universitycountry,
      universityCity: data?.universitycity,
      universityImage: data?.universityImage,
      worldRank: Number(data?.worldrank),
      degree: data?.degree,
      subjectCategory: data?.subjectcategory,
      scholarshipType: data?.scholarshiptype,
      applicationFees: parseInt(data?.fees),
      serviceCharge: parseInt(data?.servicecharge),
      postedOn: new Date(data?.postdate).getTime(),
      deadLine: new Date(data?.deadline).getTime(),
      contactEmail: data?.email,
      description: data?.description,
    };
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, update it!",
      });
      if (result) {
        const res = await axiosSceure.patch(
          `/updatescholarship/${id}`,
          formData
        );
        if (res.data?.modifiedCount) {
          Swal.fire("Updated", "Your file has been updated.", "success");
          refetch();
          reset();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="my-4">
      <div className="container mx-auto p-2">
        <h1 className="text-xl font-bold text-slate-600 mb-2">
          Update Scholarship
        </h1>
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
              defaultValue={scholarshipdetails?.scholarshipName}
              placeholder="Scholarship Name"
              className="input input-bordered w-full"
            />
            {errors.scholarshipname && (
              <span className="text-xs text-red-500">
                This field is required
              </span>
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
              defaultValue={scholarshipdetails?.universityName}
              placeholder="University Name"
              className="input input-bordered w-full"
            />
            {errors.universityname && (
              <span className="text-xs text-red-500">
                This field is required
              </span>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">University Image</span>
            </label>
            <input
              name="universityimage"
              {...register("universityimage", { required: true })}
              type="text"
              defaultValue={scholarshipdetails?.universityImage}
              className="input input-bordered w-full"
            />
            {errors.universityimage && (
              <span className="text-xs text-red-500">
                This field is required
              </span>
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
              defaultValue={scholarshipdetails?.universityCountry}
              placeholder="University Country"
              className="input input-bordered w-full"
            />
            {errors.universitycountry && (
              <span className="text-xs text-red-500">
                This field is required
              </span>
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
              defaultValue={scholarshipdetails?.universityCity}
              placeholder="University City"
              className="input input-bordered w-full"
            />
            {errors.universitycity && (
              <span className="text-xs text-red-500">
                This field is required
              </span>
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
              defaultValue={scholarshipdetails?.worldRank}
              placeholder="University World Rank"
              className="input input-bordered w-full"
            />
            {errors.worldrank && (
              <span className="text-xs text-red-500">
                This field is required
              </span>
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
              defaultValue={scholarshipdetails?.subjectCategory}
            >
              <option value="">Select category</option>
              <option>Agriculture</option>
              <option>Engineering</option>
              <option>Doctor</option>
            </select>
            {errors.subjectcategory && (
              <span className="text-xs text-red-500">
                This field is required
              </span>
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
              defaultValue={scholarshipdetails?.scholarshipType}
            >
              <option value="">Select type</option>
              <option>Full free</option>
              <option>Half free</option>
              <option>Self-fund</option>
            </select>
            {errors.scholarshipcategory && (
              <span className="text-xs text-red-500">
                This field is required
              </span>
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
              value={scholarshipdetails?.degree}
            >
              <option value="">Select degree</option>
              <option>Diploma</option>
              <option>MBBS</option>
              <option>Bachelor</option>
              <option>Masters</option>
            </select>
            {errors.degree && (
              <span className="text-xs text-red-500">
                This field is required
              </span>
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
              defaultValue={scholarshipdetails?.applicationFees}
              placeholder="Application Fees"
              className="input input-bordered w-full"
            />
            {errors.fees && (
              <span className="text-xs text-red-500">
                This field is required
              </span>
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
              defaultValue={scholarshipdetails?.serviceCharge}
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
              defaultValue={scholarshipdetails?.postedOn}
            />
            {errors.postdate && (
              <span className="text-xs text-red-500">
                This field is required
              </span>
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
              defaultValue={scholarshipdetails?.deadLine}
            />
            {errors.deadline && (
              <span className="text-xs text-red-500">
                This field is required
              </span>
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
              value={scholarshipdetails?.contactEmail}
              placeholder="Posted User Email"
              className="input input-bordered w-full"
            />
            {errors.useremail && (
              <span className="text-xs text-red-500">
                This field is required
              </span>
            )}
          </div>
          <div className="form-control md:col-span-2">
            <label className="label">
              <span className="label-text">Scholarship Description</span>
            </label>
            <input
              name="description"
              {...register("description", { required: true })}
              type="description"
              defaultValue={scholarshipdetails?.description}
              placeholder="Scholarship description"
              className="input input-bordered w-full"
            />
            {errors.descripiton && (
              <span className="text-xs text-red-500">
                This field is required
              </span>
            )}
          </div>

          <div className="form-control md:col-span-2 mt-2">
            <button type="submit" className="btn bg-yellow-500 w-full">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateScholarship;
