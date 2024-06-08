import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import toast from "react-hot-toast";
import { ImSpinner10 } from "react-icons/im";

const CheckoutForm = ({ total, scholarshipdetails }) => {
  console.log(total);
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  useEffect(() => {
    axiosSecure.post("/create-payment-intent", { price: total }).then((res) => {
      console.log(res.data.clientSecret);
      setClientSecret(res.data.clientSecret);
    });
  }, [axiosSecure, total]);

  const handleSubmit = async (event) => {
    setProcessing(true);
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log("payment error");
      setError(error.message);
    } else {
      console.log("[PaymentMethod", paymentMethod);
      setError("");
    }
    //confirm payment
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
    } else {
      console.log("payment intent", paymentIntent);
    }
    if (paymentIntent.status === "succeeded") {
      setProcessing(false);
      const paymentInfo = {
        ...scholarshipdetails,
        scholarshipId: scholarshipdetails?._id,
        paid: total,
        transactionId: paymentIntent.id,
        date: new Date(),
        studentName: user?.displayName,
        studentEmail: user?.email,
        applicationStatus: 'pending',
      }
      delete paymentInfo?._id;
      delete paymentInfo?.formData;
      console.log(paymentInfo);
      document.getElementById("my_modal_1").close();
      toast.success("Payment succesfull");
      try{
        const{ data } = await axiosSecure.post('/applied', paymentInfo);
        console.log(data)
      }catch(error) {
        console.log(error)
      }
    }
  };

  return (
    <div className="min-w-[400px] mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg ">
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
          disabled={!stripe || !clientSecret || processing}
        >
          {processing ? (
            <ImSpinner10 className="inline-flex items-center justify-center text-xl animate-spin" />
          ) : (
            `pay ${total}$`
          )}
        </button>
        {error && <p className="text-red-600 text-center">{error}</p>}
        {/* {transactionId && (
          <p className="text-green-500 text-center">
            Your transactionId is {transactionId}
          </p>
        )} */}
      </form>
    </div>
  );
};

export default CheckoutForm;
