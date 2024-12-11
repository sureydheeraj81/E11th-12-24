import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PDFViewer } from "@react-pdf/renderer";
import Sidebar from "./layout/Sidebar";
import {
  getAllSubsData,
  getRejectionReason,
  getSingleUser,
  UpdateSubscriptionPaymentFinalStatus,
} from "../services/Apis";
import toast from "react-hot-toast";
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
  pdf,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 20,
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 12,
    color: "#333",
    marginBottom: 10,
  },
  image: {
    border: "0.5px",
    width: "100%",
    height: "auto",
    paddingBottom: "5px",
  },
  table: {
    width: "100%",
    marginTop: 10,
    borderWidth: 0.5,
    borderColor: "#ccc",
    borderStyle: "solid",
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCell: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderStyle: "solid",
    fontSize: 10,
    textAlign: "left",
    width: "50%",
    padding: "5px",
  },
  tableCellRow: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderStyle: "solid",
    fontSize: 10,
    textAlign: "left",
    width: "50%",
  },
  tableHeader: {
    fontWeight: "bold",
    // backgroundColor: '#f8f9fa',
    textAlign: "center",
  },
  tableBody: {
    // paddingTop: 10,
  },
  // Modify the cell style to add a line between the left and right parts
  twoPartsCell: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "left",
    textAlign: "left",
  },
});

const UpdateSubsStatus = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const subsData = location.state;
  const [rejReason, setRejReason] = useState([]);
  const [inputs, setInputs] = useState({
    ack_no: location.state.ack_no,
    name: location.state.name,
    mobile: location.state.mobile,
    id: location.state.id,
    email: location.state.email,
    status: "",
    address: location.state.address,
    cors_plan: location.state.cors_plan,
    date_created: location.state.date_created,
    GST_name: location.state.GST_name,
    GST_number: location.state.GST_number,
    gst_receiptAmt: location.state.gst_receiptAmt,
    gst_receiptNo: location.state.gst_receiptNo,
    approved_by: location.state.approved_by,
    approved_date: location.state.approved_date,
    path_sub_pdf: location.state.path_sub_pdf,
    payment_verification_date: location.state.payment_verification_date,
    payment_verified_by: location.state.payment_verified_by,
    region_name: location.state.region_name,
    rejection_reason: "",
    state_id: location.state.state_id,
    sub_gst: location.state.sub_gst,
    subs_receiptAmt: location.state.subs_receiptAmt,
    subs_receiptNo: location.state.subs_receiptNo,
    subscription_charge: location.state.subscription_charge,
    user_reg_id: location.state.user_reg_id,
    rejection_reason_data: "",
    challan_no: "",
  });
  const [data, setData] = useState([]);
  const [subsValue, setSubsValue] = useState([]);

  let stateName = [
    { id: 1, state: "Andhra Pradesh" },
    { i: 2, state: "Arunachal Pradesh" },
    { id: 3, state: "Assam" },
    { id: 4, state: "Bihar" },
    { id: 5, state: "Chhattisgarh" },
    { id: 6, state: "Goa" },
    { id: 7, state: "Gujarat" },
    { id: 8, state: "Haryana" },
    { d: 9, state: "Himachal Pradesh" },
    { id: 10, state: "Jharkhand" },
    { id: 11, state: "Karnataka" },
    { id: 12, state: "Kerala" },
    {
      id: 13,
      state: "Madhya Pradesh",
    },
    { id: 14, state: "Maharashtra" },
    { id: 15, state: "Manipur" },
    { id: 16, state: "Meghalaya" },
    { id: 17, state: "Mizoram" },
    { id: 18, state: "Nagaland" },
    { id: 19, state: "Odisha" },
    { id: 20, state: "Punjab" },
    { id: 21, state: "Rajasthan" },
    { id: 22, state: "Sikkim" },
    { id: 23, state: "Tamil Nadu" },
    { id: 24, state: "Telangana" },
    { id: 25, state: "Tripura" },
    { id: 26, state: "Uttar Pradesh" },
    { id: 27, state: "Uttarakhand" },
    { id: 28, state: "West Bengal" },
    { id: 29, stat: "Andaman and Nicobar Islands" },
    { id: 30, state: "Chandigarh" },
    { id: 31, state: "Dadra& Nagar Haveli and Daman & Diu" },
    { id: 32, state: "Delhi" },
    { id: 33, state: "Jammu and Kashmir" },
    { id: 34, state: "Lakshadweep" },
    { id: 35, state: "Puducherry" },
    { id: 36, state: "Ladakh" },
  ];

  const date = new Date(location.state.date_created);
  const formattedDate = date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  function convertNumberToWords(amount) {
    const ones = [
      "",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
      "Ten",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ];
    const tens = [
      "",
      "",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];
    const thousands = ["", "Thousand", "Million", "Billion", "Trillion"];

    let numStr = amount.toString();
    let [integer, decimal] = numStr.split("."); // Split into integer and decimal parts

    let words = "";
    let group = 0;

    // Function to convert number group (e.g., 123, 456) to words
    const convertGroup = (num) => {
      let word = "";
      if (num >= 100) {
        word += ones[Math.floor(num / 100)] + " Hundred ";
        num %= 100;
      }
      if (num >= 20) {
        word += tens[Math.floor(num / 10)] + " ";
        num %= 10;
      }
      if (num > 0) {
        word += ones[num] + " ";
      }
      return word.trim();
    };

    while (integer.length > 0) {
      let chunk = integer.slice(-3); // Take 3 digits from the end
      integer = integer.slice(0, -3); // Remove the last 3 digits

      if (parseInt(chunk) > 0) {
        words =
          convertGroup(parseInt(chunk)) +
          " " +
          (thousands[group] || "") +
          " " +
          words;
      }
      group++;
    }

    // Convert decimal part (if any)
    if (decimal && decimal.length > 0) {
      words += "and " + convertGroup(parseInt(decimal)) + " Paise";
    }

    return words.trim() + " Rupees Only";
  }
  let count = convertNumberToWords(Number(subsData.subs_receiptAmt));
  let getFiltered = subsValue.filter((elem) => {
    const corsPlansArray = subsData.cors_plan.split(",");
    return corsPlansArray.some((plan) => plan === elem.cors_plan);
  });

  const handleChange = (e) => {
    e.preventDefault();
    setInputs((prevInputs) => ({
      ...prevInputs,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (inputs.status === "Verified" || inputs.status === "Approved") {
        inputs.rejection_reason = "";
        let response = await UpdateSubscriptionPaymentFinalStatus(inputs, {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        });
        if (response.success) {
          toast.success(response.data.message);
          navigate("/admin/subscription-list");
        } else {
          toast.error(response.data.message);
        }
      } else {
        let description = rejReason.filter((elem) =>
          elem.sno == inputs.rejection_reason ? elem : ""
        );
        inputs.rejection_reason_data = description[0].description;

        let response = await UpdateSubscriptionPaymentFinalStatus(inputs, {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        });
        if (response.success) {
          toast.success(response.data.message);
          navigate("/admin/subscription-list");
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      toast.error("Error in user status updation");
    }
  };

  // for invoice

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     if (inputs.status === "Verified" || inputs.status === "Approved") {
  //       inputs.rejection_reason = "";

  //       let formData = new FormData();

  //       for (const [key, value] of Object.entries(inputs)) {
  //         formData.append(key, value);
  //       }

  //       if (inputs.status === "Approved") {
  //         const blob = await downloadInvoice("send");

  //         formData.append("invoice", blob, "invoice.pdf");

  //         for (let [key, value] of formData.entries()) {
  //           console.log(key, value);
  //         }

  //         let response = await UpdateSubscriptionPaymentFinalStatus(formData, {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         });
  //         if (response.success) {
  //           toast.success(response.data.message);
  //           navigate("/admin/subscription-list");
  //         } else {
  //           toast.error(response.data.message);
  //         }
  //       } else {
  //         let response = await UpdateSubscriptionPaymentFinalStatus(formData, {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         });
  //         if (response.success) {
  //           toast.success(response.data.message);
  //           navigate("/admin/subscription-list");
  //         } else {
  //           toast.error(response.data.message);
  //         }
  //       }
  //     } else {
  //       let description = rejReason.filter((elem) =>
  //         elem.sno == inputs.rejection_reason ? elem : ""
  //       );
  //       inputs.rejection_reason_data = description[0].description;

  //       let formData = new FormData();

  //       for (const [key, value] of Object.entries(inputs)) {
  //         formData.append(key, value);
  //       }

  //       let response = await UpdateSubscriptionPaymentFinalStatus(formData, {
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       });
  //       if (response.success) {
  //         toast.success(response.data.message);
  //         navigate("/admin/subscription-list");
  //       } else {
  //         toast.error(response.data.message);
  //       }
  //     }
  //   } catch (error) {
  //     toast.error("Error in user status updation");
  //   }
  // };

  const handleDiscard = async () => {
    toast.success("Changes discarded");
    navigate("/admin/subscription-list");
  };
  const getUserInfo = async () => {
    try {
      let response = await getSingleUser(location.state.user_reg_id);
      if (response.success) {
        setData(response.data.Data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {}
  };
  const getRejectedReason = async () => {
    try {
      let response = await getRejectionReason();
      if (response.success) {
        setRejReason(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error in status updation page");
    }
  };
  const getSubsCharge = async () => {
    try {
      let response = await getAllSubsData({
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      });
      if (response.success) {
        setSubsValue(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error in getting subscription plan data");
    }
  };

  // const downloadInvoice = async () => {

  //   const pdfDoc = <DownloadInvoice data={subsData} />;
  //   const pdfBlob = await pdf(pdfDoc).toBlob();

  //   // Create a link to download the generated PDF
  //   const url = URL.createObjectURL(pdfBlob);

  //   // Create a temporary <a> element to trigger the download
  //   const link = document.createElement("a");
  //   link.href = url;
  //   link.download = "invoice.pdf";  // Specify the file name
  //   link.click();  // Trigger the download

  //   // Clean up the object URL
  //   URL.revokeObjectURL(url);
  // };

  const downloadInvoice = async (value) => {
    const pdfDoc = (
      <Document>
        <Page style={styles.page}>
          <Text
            style={{
              backgroundColor: "#000",
              color: "#fff",
              textAlign: "center",
              padding: "5px",
            }}
          >
            TAX INVOICE
          </Text>
          <Image
            src="/images/header.png"
            alt="Invoice Header"
            style={styles.image}
          />
          <View style={styles.table}>
            {/* Table Header */}
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={styles.tableCell}>GST NUMBER: 05AAAGG5994E1ZD</Text>
              <Text style={styles.tableCell}>PAN NUMBER: AAAGG5994E</Text>
            </View>

            {/* Table Body */}
            <View style={styles.tableBody}>
              <View style={styles.tableRow}>
                <View style={styles.tableCellRow}>
                  <View style={styles.twoPartsCell}>
                    <Text style={{ padding: "5px", width: "25%" }}>
                      Invoice No:{" "}
                    </Text>
                    <hr
                      style={{
                        borderColor: "#ccc",
                        border: "0.7px",
                        height: "100%",
                        opacity: "0.3",
                      }}
                    />
                    <Text style={{ padding: "5px" }}>2391</Text>
                  </View>
                </View>
                <View style={styles.tableCellRow}>
                  <View style={styles.twoPartsCell}>
                    <Text style={{ padding: "5px", width: "25%" }}>
                      Invoice Date:
                    </Text>
                    <hr
                      style={{
                        backgroundColor: "#ccc",
                        border: "0.7px",
                        height: "100%",
                        opacity: "0.3",
                      }}
                    />
                    <Text style={{ padding: "5px" }}>
                      {subsData.approved_date.slice(0, 10)}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.table}>
            {/* Table Header */}
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text
                style={[
                  styles.tableCell,
                  { textAlign: "center", fontFamily: "Helvetica-Bold" },
                ]}
              >
                Depositor's Details
              </Text>
              <Text
                style={[
                  styles.tableCell,
                  { textAlign: "center", fontFamily: "Helvetica-Bold" },
                ]}
              >
                CORS Registration Details
              </Text>
            </View>

            {/* Table Body */}
            <View style={styles.tableBody}>
              <View style={styles.tableRow}>
                <View style={styles.tableCellRow}>
                  <View style={styles.twoPartsCell}>
                    <Text style={{ padding: "5px", width: "25%" }}>Name:</Text>
                    <hr
                      style={{
                        borderColor: "#ccc",
                        border: "0.7px",
                        height: "100%",
                        opacity: "0.3",
                      }}
                    />
                    <Text style={{ padding: "5px" }}>{subsData.name}</Text>
                  </View>
                </View>
                <View style={styles.tableCellRow}>
                  <View style={styles.twoPartsCell}>
                    <Text style={{ padding: "5px", width: "25%" }}>Name:</Text>
                    <hr
                      style={{
                        backgroundColor: "#ccc",
                        border: "0.7px",
                        height: "100%",
                        opacity: "0.3",
                      }}
                    />
                    <Text style={{ padding: "5px" }}>{subsData.name}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={styles.tableCellRow}>
                  <View style={styles.twoPartsCell}>
                    <Text style={{ padding: "5px", width: "25%" }}>
                      Address:
                    </Text>
                    <hr
                      style={{
                        borderColor: "#ccc",
                        border: "0.7px",
                        height: "100%",
                        opacity: "0.3",
                      }}
                    />
                    <Text
                      style={{ padding: "5px", height: "auto", width: "75%" }}
                    >
                      {subsData.address}
                    </Text>
                  </View>
                </View>
                <View style={styles.tableCellRow}>
                  <View style={styles.twoPartsCell}>
                    <Text style={{ padding: "5px", width: "25%" }}>Email:</Text>
                    <hr
                      style={{
                        backgroundColor: "#ccc",
                        border: "0.7px",
                        height: "32px",
                        opacity: "0.3",
                      }}
                    />
                    <Text style={{ padding: "5px" }}>{subsData.email}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={styles.tableCellRow}>
                  <View style={styles.twoPartsCell}>
                    <Text style={{ padding: "5px", width: "25%" }}>Email:</Text>
                    <hr
                      style={{
                        borderColor: "#ccc",
                        border: "0.7px",
                        height: "100%",
                        opacity: "0.3",
                      }}
                    />
                    <Text style={{ padding: "5px" }}>{subsData.email}</Text>
                  </View>
                </View>
                <View style={styles.tableCellRow}>
                  <View style={styles.twoPartsCell}>
                    <Text style={{ padding: "5px", width: "25%" }}>
                      Mobile no:
                    </Text>
                    <hr
                      style={{
                        backgroundColor: "#ccc",
                        border: "0.7px",
                        height: "100%",
                        opacity: "0.3",
                      }}
                    />
                    <Text style={{ padding: "5px" }}>{subsData.mobile}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={styles.tableCellRow}>
                  <View style={styles.twoPartsCell}>
                    <Text style={{ padding: "5px", width: "25%" }}>
                      Mobile no:
                    </Text>
                    <hr
                      style={{
                        borderColor: "#ccc",
                        border: "0.7px",
                        height: "100%",
                        opacity: "0.3",
                      }}
                    />
                    <Text style={{ padding: "5px" }}>{subsData.mobile}</Text>
                  </View>
                </View>
                <View style={styles.tableCellRow}>
                  <View style={styles.twoPartsCell}>
                    <Text style={{ padding: "5px", width: "25%" }}>
                      Ack No:
                    </Text>
                    <hr
                      style={{
                        backgroundColor: "#ccc",
                        border: "0.7px",
                        height: "auto",
                        opacity: "0.3",
                      }}
                    />
                    <Text style={{ padding: "5px" }}>{subsData.ack_no}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.tableRow}>
                <View style={styles.tableCellRow}>
                  <View style={styles.twoPartsCell}>
                    <Text style={{ padding: "5px", width: "25%" }}>
                      Place of Supply:
                    </Text>
                    <hr
                      style={{
                        borderColor: "#ccc",
                        border: "0.7px",
                        height: "auto",
                        opacity: "0.3",
                      }}
                    />
                    <Text style={{ padding: "5px" }}>
                      {
                        stateName.filter(
                          (elem) => elem.id === subsData.state_id
                        )[0].state
                      }
                    </Text>
                  </View>
                </View>
                <View style={styles.tableCellRow}>
                  <View style={styles.twoPartsCell}>
                    <Text style={{ padding: "5px", width: "25%" }}>
                      Date of Purchase:
                    </Text>
                    <hr
                      style={{
                        backgroundColor: "#ccc",
                        border: "0.7px",
                        height: "auto",
                        opacity: "0.3",
                      }}
                    />
                    <Text style={{ padding: "5px" }}>
                      {subsData.date_created.slice(0, 10)}
                    </Text>
                  </View>
                </View>
              </View>
              {subsData.GST_name !== "" && subsData.GST_name!==null ? (
                <View style={styles.tableRow}>
                  <View style={styles.tableCellRow}>
                    <View style={styles.twoPartsCell}>
                      <Text style={{ padding: "5px", width: "25%" }}>
                        Name as per GST:
                      </Text>
                      <hr
                        style={{
                          backgroundColor: "#ccc",
                          border: "0.7px",
                          height: "auto",
                          opacity: "0.3",
                        }}
                      />
                      <Text style={{ padding: "5px" }}>
                        {subsData.GST_name}
                      </Text>
                    </View>
                  </View>
                </View>
              ) : (
                ""
              )}
              {subsData.GST_name !== "" && subsData.GST_name!==null ? (
                <View style={styles.tableRow}>
                  <View style={styles.tableCellRow}>
                    <View style={styles.twoPartsCell}>
                      <Text style={{ padding: "5px", width: "25%" }}>
                        GST Number:
                      </Text>
                      <hr
                        style={{
                          backgroundColor: "#ccc",
                          border: "0.7px",
                          height: "auto",
                          opacity: "0.3",
                        }}
                      />
                      <Text style={{ padding: "5px" }}>
                        {subsData.GST_number}
                      </Text>
                    </View>
                  </View>
                </View>
              ) : (
                ""
              )}
            </View>
          </View>
          <View style={styles.table}>
            {/* Table Header */}
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={[styles.tableCell, { width: "10%" }]}>S.No</Text>
              <Text style={[styles.tableCell, { width: "10%" }]}>Plan ID</Text>
              <Text style={[styles.tableCell, { width: "30%" }]}>
                Description
              </Text>
              <Text style={[styles.tableCell, { width: "10%" }]}>Quantity</Text>
              <Text style={[styles.tableCell, { width: "10%" }]}>
                Unit Price
              </Text>
              <Text style={[styles.tableCell, { width: "10%" }]}>
                Taxable Value
              </Text>
              <Text style={[styles.tableCell, { width: "10%" }]}>
                IGST(18%)
              </Text>
              <Text style={[styles.tableCell, { width: "10%" }]}>
                Sub Total
              </Text>
            </View>

            {/* Table Body */}
            {getFiltered.map((item, idx) => (
              <View style={[styles.tableBody, styles.tableRow]} key={idx}>
                <Text
                  style={[
                    styles.tableCell,
                    { width: "10%", textAlign: "center" },
                  ]}
                >
                  {idx + 1}
                </Text>
                <Text
                  style={[
                    styles.tableCell,
                    { width: "10%", textAlign: "center" },
                  ]}
                >
                  {item.cors_plan}
                </Text>
                <Text
                  style={[
                    styles.tableCell,
                    { width: "30%", textAlign: "center" },
                  ]}
                >
                  {/* {limitWords(item.cors_description, 7)} */}
                  {item.cors_description}
                </Text>
                <Text
                  style={[
                    styles.tableCell,
                    { width: "10%", textAlign: "center" },
                  ]}
                >
                  1
                </Text>
                <Text
                  style={[
                    styles.tableCell,
                    { width: "10%", textAlign: "center" },
                  ]}
                >
                  {item.subscription_charges}
                </Text>
                <Text
                  style={[
                    styles.tableCell,
                    { width: "10%", textAlign: "center" },
                  ]}
                >
                  {item.subscription_charges}
                </Text>
                <Text
                  style={[
                    styles.tableCell,
                    { width: "10%", textAlign: "center" },
                  ]}
                >
                  {item.GST_amt}
                </Text>
                <Text
                  style={[
                    styles.tableCell,
                    { width: "10%", textAlign: "center" },
                  ]}
                >
                  {Number(item.subscription_charges) + Number(item.GST_amt)}
                </Text>
              </View>
            ))}
            <View style={[styles.tableBody, styles.tableRow]}>
              <Text
                style={[
                  styles.tableCell,
                  {
                    width: "87.5%",
                    textAlign: "center",
                    fontFamily: "Helvetica-Bold",
                  },
                ]}
              >
                Total Amount in words: {count}
              </Text>
              <Text style={[styles.tableCell, { width: "12.5%" }]}>
                {subsData.subs_receiptAmt}
              </Text>
            </View>
            {/* ))} */}
          </View>
          <View style={styles.table}>
            {/* Table Header */}
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text
                style={[
                  styles.tableCell,
                  {
                    textAlign: "center",
                    fontFamily: "Helvetica-Bold",
                    width: "100%",
                  },
                ]}
              >
                Payment Details
              </Text>
            </View>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text
                style={[
                  styles.tableCell,
                  { width: "12.5%", textAlign: "center" },
                ]}
              >
                S.No
              </Text>
              <Text
                style={[
                  styles.tableCell,
                  { width: "25%", textAlign: "center" },
                ]}
              >
                Purpose
              </Text>
              <Text
                style={[
                  styles.tableCell,
                  { width: "25%", textAlign: "center" },
                ]}
              >
                Transaction Ref. No
              </Text>
              <Text
                style={[
                  styles.tableCell,
                  { width: "25%", textAlign: "center" },
                ]}
              >
                Transaction Date
              </Text>
              <Text
                style={[
                  styles.tableCell,
                  { width: "12.5%", textAlign: "center" },
                ]}
              >
                Amount
              </Text>
            </View>

            <View style={[styles.tableBody, styles.tableRow]}>
              <Text
                style={[
                  styles.tableCell,
                  { width: "12.5%", textAlign: "center" },
                ]}
              >
                1
              </Text>
              <Text
                style={[
                  styles.tableCell,
                  { width: "25%", textAlign: "center" },
                ]}
              >
                Network RTK Services
              </Text>
              <Text
                style={[
                  styles.tableCell,
                  { width: "25%", textAlign: "center" },
                ]}
              >
                {subsData.subs_receiptNo}
              </Text>
              <Text
                style={[
                  styles.tableCell,
                  { width: "25%", textAlign: "center" },
                ]}
              >
                {subsData.date_created.slice(0, 10)}
              </Text>
              <Text
                style={[
                  styles.tableCell,
                  { width: "12.5%", textAlign: "center" },
                ]}
              >
                {subsData.subs_receiptAmt}
              </Text>
            </View>
            <View style={[styles.tableBody, styles.tableRow]}>
              <Text
                style={[
                  styles.tableCell,
                  {
                    width: "87.5%",
                    textAlign: "center",
                    fontFamily: "Helvetica-Bold",
                  },
                ]}
              >
                Total Amount in words: {count}
              </Text>
              <Text style={[styles.tableCell, { width: "12.5%" }]}>
                {subsData.subs_receiptAmt}
              </Text>
            </View>
          </View>
          <Text style={{ fontSize: 11, marginTop: "30px" }}>
            Note: All terms and conditions are given on
            cors.surveyofindia.gov.in and for futher queries, please right us to
            grb.soi@gov.in or cors-grb.soi@gov.in
          </Text>
        </Page>
      </Document>
    );
    const pdfBlob = await pdf(pdfDoc).toBlob();

    if (value === "download") {
      // Create a link to download the generated PDF
      const url = URL.createObjectURL(pdfBlob);

      // Create a temporary <a> element to trigger the download
      const link = document.createElement("a");
      link.href = url;
      link.download = "invoice.pdf"; // Specify the file name
      link.click(); // Trigger the download

      // Clean up the object URL
      URL.revokeObjectURL(url);
    } else {
      return pdfBlob;
    }
  };
  const downloadChallan = async () => {
    const pdfDoc = (
      <Document>
        <Page style={styles.page}>
          <View style={styles.table}>
            <View style={[styles.tableBody, styles.tableRow]}>
              <Text style={[styles.tableCell, { width: "12.5%" }]}>
                TR-6 (See Rule 92) (Obverse)
              </Text>
              <Text style={[styles.tableCell, { width: "25%" }]}>
                Challan No:
              </Text>
              <View style={[styles.tableCell, { width: "62.5%" }]}>
                <Text>Please Indicate whether</Text>
                <View
                  style={[styles.tableCell, styles.tableRow, { width: "100%" }]}
                >
                  <Text
                    style={[
                      styles.tableCell,
                      {
                        width: "33.33%",
                        border: "none",
                        paddingTop: "0",
                        paddingBottom: "0",
                      },
                    ]}
                  >
                    Civil-----------
                  </Text>
                  <Text
                    style={[
                      styles.tableCell,
                      {
                        width: "33.33%",
                        borderTop: "none",
                        borderBottom: "none",
                        paddingTop: "0",
                        paddingBottom: "0",
                      },
                    ]}
                  >
                    Defence-----------
                  </Text>
                  <Text
                    style={[
                      styles.tableCell,
                      {
                        width: "33.33%",
                        border: "none",
                        paddingTop: "0",
                        paddingBottom: "0",
                      },
                    ]}
                  >
                    Railways-----------
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <Text
            style={{ fontSize: 12, marginTop: "30px", textAlign: "center" }}
          >
            Treasury/Sub-Treasury
          </Text>
          <Text style={{ fontSize: 11, marginTop: "5px" }}>
            Challan of cash paid into
            ............................................. at
            ..................................... Union Bank of India, Dehradun
          </Text>
          <View style={styles.table}>
            {/* Table Header */}
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={[styles.tableCell, { textAlign: "center" }]}>
                To be filled in by the remitter
              </Text>
              <Text style={[styles.tableCell, { textAlign: "center" }]}>
                To be filled in by the Department Officer or the Treasury
              </Text>
            </View>

            {/* Table Body */}
            <View style={[styles.tableBody, styles.tableRow]}>
              <Text style={[styles.tableCell, { width: "10%" }]}>
                BY Whom tendered
              </Text>
              <Text style={[styles.tableCell, { width: "12.5%" }]}>
                Name (or designation and address of the person on whose behalf
                money is paid)
              </Text>
              <Text style={[styles.tableCell, { width: "27.5%" }]}>
                Full particulars of the remittance and/or authoriy(if any)
              </Text>
              <Text style={[styles.tableCell, { width: "12.5%" }]}>
                Amount Rs.
              </Text>
              <Text style={[styles.tableCell, { width: "17.5%" }]}>
                Head of Account
              </Text>
              <Text style={[styles.tableCell, { width: "10%" }]}>
                Accounts Officer by whom adjustable
              </Text>
              <Text
                style={[
                  styles.tableCell,
                  { width: "10%", textAlign: "center" },
                ]}
              >
                Order to the Bank
              </Text>
            </View>
            <View style={[styles.tableBody, styles.tableRow]}>
              <Text style={[styles.tableCell, { width: "10%" }]}>G&RB</Text>
              <Text style={[styles.tableCell, { width: "12.5%" }]}>
                The Senior Accounts Officer, C.P.A.O. Dehradun
              </Text>
              <Text style={[styles.tableCell, { width: "27.5%" }]}>
                Advance Payment vide, Received from Choudam Naveen, Telangana
                Vide, Rs. {subsData.subs_receiptAmt}/-, Date:{" "}
                {subsData.date_created.slice(0, 10)} Challan No.{" "}
                {subsData.challan_no} ({count})
              </Text>
              <Text style={[styles.tableCell, { width: "12.5%" }]}>
                {subsData.subscription_charge}/- {subsData.gst_receiptAmt}/-
              </Text>
              <Text style={[styles.tableCell, { width: "17.5%" }]}>
                "1425002010100" "8658001390000"
              </Text>

              <Text
                style={[
                  styles.tableCell,
                  { width: "10%", textAlign: "center" },
                ]}
              >
                C. P.A.O., Dehradun
              </Text>
              <Text style={[styles.tableCell, { width: "10%" }]}>
                Date Correct, Receive and grant & receipt signature & full
                designation of the officer ordering the money to be paid in
              </Text>
            </View>
            <View style={[styles.tableBody, styles.tableRow]}>
              <Text style={[styles.tableCell, { width: "50%" }]}>
                (In words) (Rs. {count})
              </Text>
              <Text style={[styles.tableCell, { width: "50%" }]}>
                To be used only in the case of remittences to the Bank through
                Department Office of the Treasury Officer
              </Text>
            </View>
          </View>
          <Text
            style={{ fontSize: 12, marginTop: "30px", textAlign: "center" }}
          >
            Received Payment (Rs. {count})
          </Text>
          <View style={styles.table}>
            <View style={[styles.tableBody, styles.tableRow]}>
              <Text style={[styles.tableCell, { width: "25%" }]}>
                Treasures
              </Text>
              <Text style={[styles.tableCell, { width: "25%" }]}>
                Accountant
              </Text>
              <Text style={[styles.tableCell, { width: "50%" }]}>
                Date Treasury Office
              </Text>
            </View>
          </View>
        </Page>
      </Document>
    );
    const pdfBlob = await pdf(pdfDoc).toBlob();

    // Create a link to download the generated PDF
    const url = URL.createObjectURL(pdfBlob);

    // Create a temporary <a> element to trigger the download
    const link = document.createElement("a");
    link.href = url;
    link.download = "challan.pdf"; // Specify the file name
    link.click(); // Trigger the download

    // Clean up the object URL
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    if (location.state) {
      setInputs({
        ack_no: location.state.ack_no,
        name: location.state.name,
        mobile: location.state.mobile,
        id: location.state.id,
        email: location.state.email,
        status: location.state.status,
        address: location.state.address,
        cors_plan: location.state.cors_plan,
        date_created: location.state.date_created,
        GST_name: location.state.GST_name,
        GST_number: location.state.GST_number,
        gst_receiptAmt: location.state.gst_receiptAmt,
        gst_receiptNo: location.state.gst_receiptNo,
        approved_by: location.state.approved_by,
        approved_date: location.state.approved_date,
        path_sub_pdf: location.state.path_sub_pdf,
        payment_verification_date: location.state.payment_verification_date,
        payment_verified_by: location.state.payment_verified_by,
        region_name: location.state.region_name,
        rejection_reason: location.state.rejection_reason,
        state_id: location.state.state_id,
        sub_gst: location.state.sub_gst,
        subs_receiptAmt: location.state.subs_receiptAmt,
        subs_receiptNo: location.state.subs_receiptNo,
        subscription_charge: location.state.subscription_charge,
        user_reg_id: location.state.user_reg_id,
        challan_no: location.state.challan_no,
      });
    }
  }, [location.state]);

  useEffect(() => {
    getUserInfo();
    getSubsCharge();
    getRejectedReason();
  }, []);
  return (
    <Sidebar>
      <div className="clear">
        <div className="section_heading">
          <h2 className="title_heading">Subscription Details</h2>
        </div>
        <div>
          <div className="box_header">
            <div>
              <i className="fa-solid fa-pen-to-square"></i>&nbsp; Subscription
              Details
            </div>
          </div>
          <div>
            <div className="box_body">
              {/* BEGIN FORM */}
              <form
                action="#"
                id="form_page"
                onSubmit={handleSubmit}
                className="form-horizontal"
                encType="multipart/form-data"
              >
                <div>
                  {subsData.status === "Approved" ? (
                    <h2 style={{ color: "green" }}>Approved</h2>
                  ) : subsData.status === "Pending" ? (
                    <h1 style={{ color: "orange" }}>Pending</h1>
                  ) : subsData.status === "Verified" ? (
                    <h1 style={{ color: "blue" }}>Verified</h1>
                  ) : subsData.status === "Rejected" ? (
                    <h1 style={{ color: "red" }}>Rejected</h1>
                  ) : null}
                </div>
                <hr />

                <div className="form-group row mt-2">
                  <label htmlFor="name" className="control-label col-md-2">
                    Name:
                  </label>
                  <div className="col-md-4">
                    <input
                      type="text"
                      name="name"
                      value={data.name}
                      className="form-control"
                      readOnly
                    />
                  </div>
                  <label htmlFor="name" className="control-label col-md-2 mt-1">
                    User ID:
                  </label>
                  <div className="col-md-4">
                    <input
                      type="text"
                      name="username"
                      value={data.username}
                      className="form-control"
                      readOnly
                    />
                  </div>
                </div>

                <div className="form-group row mt-2">
                  <label
                    htmlFor="mobile_no"
                    className="control-label col-md-2 mt-1"
                  >
                    Mobile No:
                  </label>
                  <div className="col-md-4">
                    <input
                      type="text"
                      name="mobile_no"
                      value={data.mobile_no}
                      className="form-control"
                      readOnly
                    />
                  </div>
                  <label
                    htmlFor="email"
                    className="control-label col-md-2 mt-1"
                  >
                    Email ID:
                  </label>
                  <div className="col-md-4">
                    <input
                      type="email"
                      name="email"
                      value={data.email}
                      className="form-control"
                      readOnly
                    />
                  </div>
                </div>
                <hr />

                <div>
                  <h3>Subscription Details:</h3>
                </div>

                <div className="form-group row mt-2">
                  <label
                    htmlFor="ack_no"
                    className="control-label col-md-2 mt-1"
                  >
                    Ack. No:
                  </label>
                  <div className="col-md-4">
                    <input
                      type="text"
                      name="ack_no"
                      value={location.state.ack_no}
                      className="form-control"
                      readOnly
                    />
                  </div>
                  <label
                    htmlFor="date_created"
                    className="control-label col-md-2 mt-1"
                  >
                    Date of Purchase:
                  </label>
                  <div className="col-md-4">
                    <input
                      type="text"
                      name="ack_no"
                      value={formattedDate}
                      className="form-control"
                      readOnly
                    />
                  </div>
                </div>

                <div className="form-group row mt-2">
                  <label
                    htmlFor="subscription_charge"
                    className="control-label col-md-2 mt-1"
                  >
                    Subscription Amount:
                  </label>
                  <div className="col-md-4">
                    <input
                      type="text"
                      name="subscription_charge"
                      value={location.state.subscription_charge}
                      className="form-control"
                      readOnly
                    />
                  </div>
                  <label
                    htmlFor="gst_receiptAmt"
                    className="control-label col-md-2"
                  >
                    GST Amount:
                  </label>
                  <div className="col-md-4">
                    <input
                      type="text"
                      name="gst_receiptAmt"
                      value={location.state.gst_receiptAmt}
                      className="form-control"
                      readOnly
                    />
                  </div>
                </div>

                <div className="form-group row mt-2">
                  <label
                    htmlFor="subs_receiptAmt"
                    className="control-label col-md-2 mt-2"
                  >
                    Subscription Paid:
                  </label>
                  <div className="col-md-4">
                    <input
                      type="text"
                      name="subs_receiptAmt"
                      value={location.state.subs_receiptAmt}
                      className="form-control"
                      readOnly
                    />
                  </div>
                  <label
                    htmlFor="sub_gst"
                    className="control-label col-md-2 mt-1"
                  >
                    GST Paid:
                  </label>
                  <div className="col-md-4">
                    <input
                      type="text"
                      name="sub_gst"
                      value={location.state.sub_gst || "0.00"}
                      className="form-control"
                      readOnly
                    />
                  </div>
                </div>

                <div className="form-group row mt-2">
                  <label
                    htmlFor="subs_receiptNo"
                    className="control-label col-md-2 mt-1"
                  >
                    Subscription Receipt:
                  </label>
                  <div className="col-md-4">
                    <input
                      type="text"
                      name="subs_receiptNo"
                      value={location.state.subs_receiptNo}
                      className="form-control"
                      readOnly
                    />
                  </div>
                  <label
                    htmlFor="gst_receiptNo"
                    className="control-label col-md-2 mt-1"
                  >
                    GST Receipt:
                  </label>
                  <div className="col-md-4">
                    <input
                      type="text"
                      name="gst_receiptNo"
                      value={location.state.gst_receiptNo || 0}
                      className="form-control"
                      readOnly
                    />
                  </div>
                </div>
                <div className="form-group row mt-2">
                  <label
                    htmlFor="sub_gst"
                    className="control-label col-md-2 mt-1"
                  >
                    Subscription PDF:
                  </label>
                  <div className="col-md-4 mt-1">
                    {location?.state?.path_sub_pdf ? (
                      <a
                        href={`/${location.state.path_sub_pdf}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: "none" }}
                      >
                        View Subscription PDF
                      </a>
                    ) : (
                      <p>No PDF available</p>
                    )}
                  </div>
                  <label
                    htmlFor="sub_gst"
                    className="control-label col-md-2 mt-1"
                  >
                    GST PDF:
                  </label>
                  <div className="col-md-4 mt-1">
                    {location?.state?.sub_gst ? (
                      <a
                        href={`/${location.state.sub_gst}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View GST PDF
                      </a>
                    ) : (
                      <p>No PDF available</p>
                    )}
                  </div>
                </div>
                <hr />
                <h3>Plan Details</h3>
                <div className="table-div-admin">
                  <table className=" data_table">
                    <thead>
                      <tr>
                        <th>Plan ID</th>
                        <th>Subscription Charge</th>
                        <th>GST Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="table-light">
                        <td>{subsData.cors_plan}</td>
                        <td>{subsData.subscription_charge}</td>
                        <td>{subsData.gst_receiptAmt}</td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "bold" }}>Total Amount</td>
                        <td style={{ fontWeight: "bold" }}>
                          {subsData.subscription_charge}
                        </td>
                        <td style={{ fontWeight: "bold" }}>
                          {subsData.gst_receiptAmt}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="form-group row mt-2">
                  <label
                    htmlFor="status"
                    className="control-label col-md-2 mt-1"
                  >
                    Update Status:<span className="red">*</span>
                  </label>
                  <div className="col-md-4">
                    {subsData.status === "Pending" ? (
                      <select
                        className="form-control app_status"
                        name="status"
                        value={inputs.status}
                        onChange={handleChange}
                        size="1"
                        required
                      >
                        <option value="">{subsData.status}</option>
                        <option value="Verified">Verified</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    ) : subsData.status === "Verified" ? (
                      <select
                        className="form-control app_status"
                        name="status"
                        value={inputs.status}
                        onChange={handleChange}
                        size="1"
                        required
                      >
                        <option value="">{subsData.status}</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    ) : subsData.status === "Approved" ? (
                      <select
                        className="form-control app_status"
                        name="status"
                        value={inputs.status}
                        onChange={handleChange}
                        size="1"
                        required
                      >
                        <option value="">{subsData.status}</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    ) : subsData.status === "Rejected" ? (
                      <input
                        name="status"
                        value={inputs.status}
                        placeholder="rejeted"
                        className="form-control app_status"
                        readOnly
                      />
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                {inputs.status === "Rejected" ? (
                  <div className="form-group row mt-2">
                    <label
                      htmlFor="rejection_reason"
                      className="control-label col-md-2 mt-1"
                    >
                      Reason :<span className="red">*</span>
                    </label>
                    <div className="col-md-4">
                      <select
                        className="form-control app_status"
                        name="rejection_reason"
                        value={inputs.rejection_reason}
                        onChange={handleChange}
                        size="1"
                        required
                      >
                        {rejReason.map((elem, idx) => {
                          return (
                            <option value={elem.sno} key={idx}>
                              {elem.description}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                {inputs.status === "Approved" &&
                subsData.status !== "Approved" ? (
                  <div className="form-group row mt-2">
                    <label
                      htmlFor="challan_no"
                      className="control-label col-md-2 mt-1"
                    >
                      Challan No. :
                    </label>
                    <div className="col-md-4">
                      <input
                        type="text"
                        name="challan_no"
                        value={inputs.challan_no}
                        onChange={handleChange}
                        placeholder="Enter Challan No"
                        className="form-control"
                      />
                    </div>
                  </div>
                ) : (
                  ""
                )}
                <div className="form-actions mt-4">
                  <button
                    type="submit"
                    name="submit"
                    className="btn btn-success col-md-2 me-3"
                  >
                    SUBMIT
                  </button>
                  <button
                    type="button"
                    onClick={handleDiscard}
                    className="btn btn-info col-md-2"
                  >
                    Cancel
                  </button>
                </div>
              </form>
              {subsData.status === "Approved" ? (
                <div>
                  <hr />
                  <h3>Invoice and Challan Details:</h3>
                  <div>
                    <button
                      className="btn btn-primary me-3"
                      onClick={() => downloadInvoice("download")}
                    >
                      Download Invoice
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={downloadChallan}
                    >
                      Download Challan
                    </button>
                  </div>
                </div>
              ) : (
                ""
              )}
              <br />
            </div>
          </div>
        </div>
      </div>
    </Sidebar>
  );
};

export default UpdateSubsStatus;
