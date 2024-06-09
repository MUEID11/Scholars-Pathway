import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import toast from "react-hot-toast";
import { ImSpinner10 } from "react-icons/im";
import Modal from "react-modal";
import Swal from "sweetalert2";
import useAdmin from "../../../Hooks/useAdmin";
import useModerator from "../../../Hooks/useModerator";

const CheckoutForm = ({ total, scholarshipdetails }) => {
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [paymentSucceeded, setPaymentSucceeded] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [isAdmin] = useAdmin();
  const [isModerator] = useModerator();
  useEffect(() => {
    axiosSecure.post("/create-payment-intent", { price: total }).then((res) => {
      console.log(res.data.clientSecret);
      setClientSecret(res.data.clientSecret);
    });
  }, [axiosSecure, total]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }
    setProcessing(true);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("payment error");
      setError(error.message);
      setProcessing(false);
      return;
    } else {
      console.log("[PaymentMethod", paymentMethod);
      setError("");
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log("confirm error");
      setProcessing(false);
      toast.error(confirmError?.message);
      return;
    } else {
      console.log("payment intent", paymentIntent);
    }

    if (paymentIntent.status === "succeeded") {
      setProcessing(false);
      setTransactionId(paymentIntent.id);
      document.getElementById("my_modal_1").close();
      toast.success("Payment successful");
      setPaymentSucceeded(true);
    }
  };

  const handleAdditionalInfoSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const additionalInfo = {
      applicantPhoneNumber: formData.get("phoneNumber"),
      applicantPhoto: formData.get("photo"),
      applicantAddress: formData.get("address"),
      applicantGender: formData.get("gender"),
      applicantApplyingDegree: formData.get("degree"),
      sscResult: formData.get("sscResult"),
      hscResult: formData.get("hscResult"),
      studyGap: formData.get("studyGap"),
      applicantName: user?.displayName,
      userId: user?.uid,
      applicantEmail: user?.email,
      scholarshipId: scholarshipdetails?._id,
      date: new Date(),
    };

    const paymentInfo = {
      ...scholarshipdetails,
      ...additionalInfo,
      paid: total,
      transactionId: transactionId,
      applicationStatus: "pending",
    };

    delete paymentInfo?._id;
    delete paymentInfo?.formData;
    console.log(paymentInfo);

    try {
      const { data } = await axiosSecure.post("/applied", paymentInfo);
      console.log(data);
      Swal.fire({
        title: "Successful!",
        text: "Redirecting to homepage!",
        icon: "success",
        showConfirmButton: false, // Hide the confirm button
        timer: 1000, // Show the message for 1 second
      }).then(() => {
        // Redirect to homepage after 1 second
        window.location.href = "/dashboard/application";
      });
      document.getElementById("additionalInfoModal").style.display = "none";
    } catch (error) {
      console.log(error);
      toast.error("Failed to submit application");
    }
  };

  return (
    <div className="min-w-[400px] mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center text-violet-600 mb-4">
        Payment Details
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="min-w-sm p-4 border border-gray-300 rounded-lg">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "14px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
            className="w-full"
          />
        </div>
        <button
          className="w-full flex items-center justify-center py-2 px-4 bg-violet-500 text-white font-semibold rounded-lg shadow-md hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-violet-200 disabled:opacity-50"
          type="submit"
          disabled={!stripe || !clientSecret || processing || isAdmin || isModerator}
        >
          {processing ? (
            <ImSpinner10 className="inline-flex items-center justify-center text-xl animate-spin" />
          ) : (
            `Pay ${total}$`
          )}
        </button>
        {error && <p className="text-red-600 text-center">{error}</p>}
      </form>

      <Modal
        isOpen={paymentSucceeded}
        onRequestClose={() => setPaymentSucceeded(false)}
        contentLabel="Fill Additional Information"
        id="additionalInfoModal"
      >
        <h2 className="text-2xl font-semibold text-center text-violet-600 mb-4">
          Additional Information
        </h2>
        <form onSubmit={handleAdditionalInfoSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label">Phone Number</label>
            <input
              name="phoneNumber"
              type="text"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">Photo</label>
            <input
              name="photo"
              type="text"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              Address (village, district, country)
            </label>
            <input
              name="address"
              type="text"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">Gender</label>
            <select name="gender" className="select select-bordered" required>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="form-control">
            <label className="label">Applying Degree</label>
            <select name="degree" className="select select-bordered" required>
              <option value="Diploma">Diploma</option>
              <option value="Bachelor">Bachelor</option>
              <option value="Masters">Masters</option>
            </select>
          </div>
          <div className="form-control">
            <label className="label">SSC Result</label>
            <input
              name="sscResult"
              type="text"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">HSC Result</label>
            <input
              name="hscResult"
              type="text"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">Study Gap</label>
            <input
              name="studyGap"
              type="text"
              className="input input-bordered"
            />
          </div>
          <button
            className="w-full flex items-center justify-center py-2 px-4 bg-violet-500 text-white font-semibold rounded-lg shadow-md hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-violet-200"
            type="submit"
          >
            Submit
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default CheckoutForm;
