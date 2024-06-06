const ScholarshipCard = ({ scholarship }) => {
  const {
    universityName,
    universityImage,
    universityCountry,
    discription,
    scholarshipName,
    subjectCategory,
    universityCity,
    scholarshipType,
    applicationFees,
    deadLine,
  } = scholarship;
  const formattedDate = new Date(deadLine);
  const dateString = formattedDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <div className="relative w-full min-w-md px-4 py-3 bg-white rounded-md shadow-md dark:bg-gray-800 p-4 tracking-tight">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-light text-gray-800 dark:text-gray-400">
          {universityName}
        </span>
        <span className="px-3 py-1 text-xs text-violet-800 uppercase bg-violet-200 rounded-full dark:bg-violet-300 dark:text-violet-900">
          {subjectCategory}
        </span>
      </div>

      <div className="flex">
        <img
          className="object-cover w-1/3 sm:h-56 h-auto rounded"
          src={universityImage}
          alt="University image"
        />
        <div className="ml-2 flex flex-col justify-between">
          <div>
            <h1 className="mt-2 text-lg font-semibold text-gray-800 dark:text-white">
              {scholarshipName}
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              {discription.slice(0, 50)} . . .
            </p>

            <div className="mt-2 text-gray-700 dark:text-gray-200 space-y-1">
              <span className="text-lg font-medium text-yellow-500">
                Location: {universityCity}, {universityCountry}
              </span>
              <div>
                <span>Deadline: {dateString}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-green-500">
                  Scholarship: {scholarshipType}
                </span>{" "}
                <span className="text-sm">
                  Application Fee: {applicationFees}
                </span>
              </div>
            </div>
          </div>
          {/* the perfect position */}
      <button className="">
        Rating er jhamela ache
      </button>
        </div>
      </div>
      
    </div>
  );
};

export default ScholarshipCard;
