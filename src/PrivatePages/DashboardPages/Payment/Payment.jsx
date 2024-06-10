import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Helmet } from "react-helmet-async";

const stripPromise = loadStripe(import.meta.env.VITE_GATEWAY_PK); //add publishable key
const Payment = ({ scholarshipdetails }) => {
  const total = parseInt(
    scholarshipdetails?.applicationFees + scholarshipdetails?.serviceCharge
  );

  return (
    <div>
      <Helmet>
        <title>Payment</title>
      </Helmet>
      <div className="justify-center text-center space-y-2">
        <h3 className="text-2xl font-semibold">Payment</h3>
        <p>Pay to confirm your application</p>
      </div>
      <div>
        <Elements stripe={stripPromise}>
          <CheckoutForm
            total={total}
            scholarshipdetails={scholarshipdetails}
          ></CheckoutForm>
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
