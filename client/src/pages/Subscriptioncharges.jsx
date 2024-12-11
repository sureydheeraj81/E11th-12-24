import { useEffect, useState } from "react";
import HeaderLayout from "../components/HeaderLayout";
import "./general-info.css";
import { getAllSubsData } from "../services/Apis";
import toast from "react-hot-toast";

const Subscriptioncharges = () => {

  const [data,setData] = useState([]);

  const getSubscriptionCharges = async() =>{
    try {
      const response = await getAllSubsData();
      if(response.data.success){
        setData(response.data.data);
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  }
  useEffect(()=>{
    getSubscriptionCharges();
  },[]);
  return (
    <HeaderLayout>
      <div className="container clear">
        <div className="row">
          <div className="col-md-12">
            <div>
              {/* SECTION HEADING START */}
              <div className="section_heading">
                <h2 className="title_heading">Subscription Charges</h2>
              </div>
              {/* SECTION HEADING END */}

              <div className="table-div">
                <table className="content-table">
                  <thead>
                    <tr>
                      <th >S.No</th>
                      <th >Plan</th>
                      <th style={{width:'50%'}}>Description</th>
                      <th >Subscription Charges</th>
                      <th >GST</th>
                      <th >Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((elem, idx) => {
                      return (
                        <tr key={idx}>
                          <td scope="row">{idx + 1}</td>
                          <td style={{textAlign:'justify'}}>{elem.cors_plan}</td>
                          <td style={{textAlign:'justify'}}>{elem.cors_description}</td>
                          <td>₹ {Number(elem.subscription_charges).toFixed(2)}</td>
                          <td>₹ {Number(elem.GST_amt).toFixed(2)}</td>
                          <td>₹ {(Number(elem.subscription_charges) + Number(elem.GST_amt)).toFixed(2)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HeaderLayout>
  );
};

export default Subscriptioncharges;
