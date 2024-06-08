import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripPromise = loadStripe(import.meta.env.VITE_GATEWAY_PK)//add publishable key
const Payment = ({scholarshipdetails}) => {
    const total = parseInt(scholarshipdetails?.applicationFees + scholarshipdetails?.serviceCharge);

    return (
        <div className="">
            <div className="justify-center text-center space-y-4">
                <h3 className="text-2xl font-semibold">Payment</h3>
                <p>Pay to confirm your application</p>
            </div>
            <div  className="">
                <Elements stripe={stripPromise}>
                <CheckoutForm total={total}></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;