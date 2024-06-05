import React from "react";

const AddScholarship = () => {
  return (
    <div className="container mx-auto p-2">
        <h1 className="text-xl font-bold text-slate-600 mb-2">Add Scholarship</h1>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Scholarship Name</span>
          </label>
          <input
            type="text"
            placeholder="Scholarship Name"
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">University Name</span>
          </label>
          <input
            type="text"
            placeholder="University Name"
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">University Image/Logo</span>
          </label>
          <input type="file" className="file-input file-input-bordered w-full" />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">University Country</span>
          </label>
          <input
            type="text"
            placeholder="University Country"
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">University City</span>
          </label>
          <input
            type="text"
            placeholder="University City"
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">University World Rank</span>
          </label>
          <input
            type="number"
            placeholder="University World Rank"
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Subject Category</span>
          </label>
          <select className="select select-bordered w-full">
            <option>Agriculture</option>
            <option>Engineering</option>
            <option>Doctor</option>
          </select>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Scholarship Category</span>
          </label>
          <select className="select select-bordered w-full">
            <option>Full fund</option>
            <option>Partial</option>
            <option>Self-fund</option>
          </select>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Degree</span>
          </label>
          <select className="select select-bordered w-full">
            <option>Diploma</option>
            <option>Bachelor</option>
            <option>Masters</option>
          </select>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Application Fees</span>
          </label>
          <input
            type="number"
            placeholder="Application Fees"
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Service Charge</span>
          </label>
          <input
            type="number"
            placeholder="Service Charge"
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Scholarship Post Date</span>
          </label>
          <input type="date" className="input input-bordered w-full" />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Application Deadline</span>
          </label>
          <input type="date" className="input input-bordered w-full" />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Posted User Email</span>
          </label>
          <input
            type="email"
            placeholder="Posted User Email"
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control md:col-span-2">
          <button type="submit" className="btn bg-yellow-500 w-full">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddScholarship;
