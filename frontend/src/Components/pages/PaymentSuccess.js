// import React from 'react'
// // import { useSearchParams } from "react-router-dom"
// const PaymentSuccess = () => {

//     // const seachQuery = useSearchParams()[0]

//     // const referenceNum = seachQuery.get("reference")
//     return (
//         <div>ordered succesfully</div>
//     )
// }

// export default PaymentSuccess






import React from 'react';
import './single.css'; // Import the CSS file

const PaymentSuccess = () => {
  return (
    <div className="PaymentSuccess">
      <div className="PaymentSuccess-message">Order Placed Successfully</div>
      <div className="PaymentSuccess-underline"></div>
      <p>Your payment was successful. Thank you for your order!</p>
      <a className="PaymentSuccess-link" href="/">
        Continue Shopping
      </a>
    </div>
  );
};

export default PaymentSuccess;
