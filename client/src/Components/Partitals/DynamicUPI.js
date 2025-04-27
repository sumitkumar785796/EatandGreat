import QRCode from "react-qr-code";
import { useEffect, useState } from "react";

export default function DynamicUPIPayment({ amount, upiId = "yourupi@bank", merchantName = "Your Food Store", visible }) {
  const [upiString, setUpiString] = useState("");

  useEffect(() => {
    const upi = `upi://pay?pa=${upiId}&pn=${merchantName}&am=${amount}&cu=INR&tn=Order Payment`;
    setUpiString(upi);
  }, [amount, upiId, merchantName]);

  if (!visible || amount <= 0) return null;

  return (
    <div className="text-center mt-4">
      <h4>Scan & Pay with UPI</h4>
      <div className="bg-white p-4 inline-block rounded-md">
        <QRCode value={upiString} size={200} level="H" />
      </div>
      <p className="mt-2 text-sm">Pay ₹{amount} via UPI</p>
    </div>
  );
}
