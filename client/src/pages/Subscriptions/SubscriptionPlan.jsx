import React, { useEffect, useState } from "react";
import { getAllSubsData } from "../../services/Apis";
import { useNavigate } from "react-router-dom";
import HeaderLayout from "../../components/HeaderLayout";
import "../general-info.css";
import toast from "react-hot-toast";

const SubscriptionPlan = () => {
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [corsPlan, setCorsPlan] = useState([]);

  const handleCorsPlanChange = (e, index) => {
    const newCorsPlan = [...corsPlan];
    newCorsPlan[index] = e.target.value;
    setCorsPlan(newCorsPlan);
  };

  const fetchPlans = async () => {
    try {

      const response = await getAllSubsData();
      setPlans(response.data.data);
    } catch (error) {
      toast.error("Error fetching plans: ", error);
    }
  };

  const restricNav=()=>{
    const savedUserData = localStorage.getItem("userProfile");
    if (!savedUserData) navigate('/subscription')


  }

  const handleAddToCart = (plan) => {
    const newItem = {
      cors_plan: plan.cors_plan,
      cors_description: plan.cors_description,
      subscription_charges: Number(plan.subscription_charges),
      GST_amt: Number(plan.GST_amt),
    };

    setCartItems((prevCartItems) => [...prevCartItems, newItem]);

    setCorsPlan((prevCorsPlan) => [...prevCorsPlan, plan.cors_plan]);
  };

  const handleDelete = (index) => {
    const newCartItems = cartItems.filter((item, i) => i !== index);
    setCartItems(newCartItems);

    const newCorsPlan = corsPlan.filter((_, i) => i !== index);
    setCorsPlan(newCorsPlan);
  };

  const totalSubscriptionCharges = cartItems.reduce(
    (total, item) => total + item.subscription_charges,
    0
  );
  const totalGST = cartItems.reduce((total, item) => total + item.GST_amt, 0);
  const grandTotal = totalSubscriptionCharges + totalGST;

  useEffect(() => {
    fetchPlans();
    restricNav()
  }, []);

  const sendCorsPlan = {
    cors_plan: corsPlan,
    subscription_charges: cartItems.map((plan) => plan.subscription_charges),
    GST_amt: cartItems.map((plan) => plan.GST_amt),
  };

  const handleDataSend = () => {
    localStorage.setItem('plansData','true');

    navigate("/subscription1/plan", {
      state: {
        sendCorsPlan,
        cartItems,
        grandTotal,
        totalGST,
        totalSubscriptionCharges,
      },
    });
  };

  return (
    <HeaderLayout>
      <div className="container clear">
        <div className="section_heading">
          <h2 className="title_heading">CORS Subscription Plan</h2>
        </div>
        <div className="table-div">
          <table className="content-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Plan</th>
                <th>Description</th>
                <th style={{ width: "10%" }}>Subscription Charges</th>
                <th style={{ width: "10%" }}>GST</th>
                <th style={{ width: "10%" }}>Total</th>
                <th style={{ width: "12%" }}>ADD</th>
              </tr>
            </thead>
            <tbody>
              {plans.length > 0 ? (
                plans.map((plan, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{plan.cors_plan}</td>
                    <td style={{ textAlign: "justify" }}>
                      {plan.cors_description}
                    </td>
                    <td>₹ {Number(plan.subscription_charges).toFixed(2)}</td>
                    <td>₹ {Number(plan.GST_amt).toFixed(2)}</td>
                    <td>
                      ₹{" "}
                      {(
                        Number(plan.subscription_charges) + Number(plan.GST_amt)
                      ).toFixed(2)}
                    </td>
                    <td>
                      <button
                        className="btn"
                        style={{
                          background:
                            "radial-gradient(circle at 10% 20%, rgb(7, 121, 222) 0%, rgb(20, 72, 140) 90%)",
                          color: "#fff",
                        }}
                        onClick={() => handleAddToCart(plan)}
                      >
                       {sendCorsPlan.cors_plan.includes(plan.cors_plan)?"Added": "Add to Cart"} 
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colspan="7" className="text-center">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {grandTotal !== 0 && (
          <div className="container mt-4">
            <h3 className="mb-3">Cart Details</h3>
            <div className="table-div"></div>
            <table className="content-table w-100">
              <thead>
                <tr>
                  <th>Plan</th>
                  <th>Subscription Charges</th>
                  <th>GST</th>
                  <th>Total</th>
                  <th style={{ width: "8%" }}>Delete</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <tr key={index}>
                    <td>{item.cors_plan}</td>
                    <td>₹ {item.subscription_charges.toFixed(2)}</td>
                    <td>₹ {item.GST_amt.toFixed(2)}</td>
                    <td>
                      ₹ {(item.subscription_charges + item.GST_amt).toFixed(2)}
                    </td>
                    <td>
                      <button
                        className="btn btn-link text-danger"
                        onClick={() => handleDelete(index)}
                      >
                        <i className="fa-solid fa-trash-can"></i>
                      </button>
                    </td>
                  </tr>
                ))}
                <tr style={{ backgroundColor: "#1050a2", color: "#fff" }}>
                  <td>Total</td>
                  <td>₹ {totalSubscriptionCharges.toFixed(2)}</td>
                  <td>₹ {totalGST.toFixed(2)}</td>
                  <td colspan="2">₹ {grandTotal.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
            <div className="text-center mt-4">
              <button
                className="btn btn-lg col-md-3"
                style={{
                  background:
                    "radial-gradient(circle at 10% 20%, rgb(7, 121, 222) 0%, rgb(20, 72, 140) 90%)",
                  color: "#fff",
                }}
                onClick={handleDataSend}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </HeaderLayout>
  );
};

export default SubscriptionPlan;
