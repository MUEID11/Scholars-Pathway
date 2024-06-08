import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import toast from "react-hot-toast";

const CheckoutForm = ({ total }) => {
  console.log(total);
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState("");
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
      toast.error(confirmError?.message)
    } else {
      console.log("payment intent", paymentIntent);
    }
    if(paymentIntent.status === "succeeded"){
        document.getElementById("my_modal_1").close()
        toast.success('Payment succesfull');   
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
          className="w-full py-2 px-4 bg-violet-500 text-white font-semibold rounded-lg shadow-md hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-violet-200 disabled:opacity-50"
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Pay
        </button>
        {error && <p className="text-red-600 text-center">{error}</p>}
      </form>
    </div>
  );
};

export default CheckoutForm;
