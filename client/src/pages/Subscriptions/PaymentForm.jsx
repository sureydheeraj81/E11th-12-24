import React, { useState,useEffect } from 'react';
import { useLocation } from "react-router-dom";


const PaymentForm = () => {
  const location = useLocation();

  const [paymentMethod, setPaymentMethod] = useState('card'); 
  const { grandTotal } = location.state || {};

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Payment successful using ${paymentMethod}!`);
  };
  useEffect(()=>{
    restricNav(grandTotal)

  },[grandTotal])
  const restricNav=(grandTotal)=>{
    if (!grandTotal) navigate('/subscription')


  }

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">
        <i className="fas fa-credit-card me-2"></i>Bharatkosh Payment Gateway
      </h1>
      <form className="card p-4" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="amount" className="form-label">
            <i className="fas fa-coins me-2"></i>Enter Amount
          </label>
          <input
            type="number"
            className="form-control"
            id="amount"
            value={grandTotal}
            placeholder="Enter amount"
            disabled
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">
            <i className="fas fa-wallet me-2"></i>Select Payment Method
          </label>
          <div className="d-flex flex-column">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="paymentMethod"
                id="card"
                value="card"
                checked={paymentMethod === 'card'}
                onChange={handlePaymentMethodChange}
              />
              <label className="form-check-label" htmlFor="card">
                <i className="fas fa-credit-card me-2"></i>Card Payment
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="paymentMethod"
                id="upi"
                value="upi"
                checked={paymentMethod === 'upi'}
                onChange={handlePaymentMethodChange}
              />
              <label className="form-check-label" htmlFor="upi">
                <i className="fas fa-qrcode me-2"></i>UPI
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="paymentMethod"
                id="netBanking"
                value="netBanking"
                checked={paymentMethod === 'netBanking'}
                onChange={handlePaymentMethodChange}
              />
              <label className="form-check-label" htmlFor="netBanking">
                <i className="fas fa-university me-2"></i>Net Banking
              </label>
            </div>
          </div>
        </div>

        {paymentMethod === 'card' && (
          <div className="mb-3">
            <label htmlFor="cardNumber" className="form-label">
              <i className="fas fa-credit-card me-2"></i>Card Number
            </label>
            <input
              type="text"
              className="form-control"
              id="cardNumber"
              placeholder="1234 5678 9012 3456"
              required
            />
            <div className="row mt-3">
              <div className="col">
                <label htmlFor="expiryDate" className="form-label">
                  <i className="fas fa-calendar-check me-2"></i>Expiry Date
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="expiryDate"
                  placeholder="MM/YY"
                  required
                />
              </div>
              <div className="col">
                <label htmlFor="cvv" className="form-label">
                  <i className="fas fa-shield-alt me-2"></i>CVV
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="cvv"
                  placeholder="***"
                  required
                />
              </div>
            </div>
          </div>
        )}

        {paymentMethod === 'upi' && (
          <div className="mb-3">
            <label htmlFor="upiId" className="form-label">
              <i className="fas fa-qrcode me-2"></i>UPI ID
            </label>
            <input
              type="text"
              className="form-control"
              id="upiId"
              placeholder="your-upi-id@bank"
              required
            />
          </div>
        )}

        {paymentMethod === 'netBanking' && (
          <div className="mb-3">
            <label htmlFor="bank" className="form-label">
              <i className="fas fa-university me-2"></i>Select Bank
            </label>
            <select className="form-select" id="bank" required>
              <option value="">Choose your bank</option>
              <option value="sbi">State Bank of India</option>
              <option value="hdfc">HDFC Bank</option>
              <option value="icici">ICICI Bank</option>
              <option value="axis">Axis Bank</option>
              <option value="boi">Bank of India</option>

            </select>
          </div>
        )}

        <button type="submit" className="btn btn-primary w-100 mt-3">
          <i className="fas fa-arrow-right me-2"></i>Pay Now
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
