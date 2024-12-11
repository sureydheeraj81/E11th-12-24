import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { usageUserDetails, usageIndustry, getUserCategoryData } from "../../services/Apis";
import Sidebar from "../layout/Sidebar";
import { useNavigate } from "react-router-dom";

const UsageUserType = () => {
  const navigate = useNavigate();
  const [categoryData, setCatetory] = useState([])
  const [dataType, setDataType] = useState("User Type");
  const [formValues, setFormValues] = useState({
    month: "",
    year: "",
    usageDetails: [
      {
        user_type: "Other Government Users",
        rtk_region_1: "",
        rtk_region_2: "",
        rds_region_1: "",
        rds_region_2: "",
      },
      {
        user_type: "Private Users",
        rtk_region_1: "",
        rtk_region_2: "",
        rds_region_1: "",
        rds_region_2: "",
      },
      {
        user_type: "Research and Academic Users",
        rtk_region_1: "",
        rtk_region_2: "",
        rds_region_1: "",
        rds_region_2: "",
      },
      {
        user_type: "Survey of India",
        rtk_region_1: "",
        rtk_region_2: "",
        rds_region_1: "",
        rds_region_2: "",
      },
      {
        user_type: "Training and Maintenance",
        rtk_region_1: "",
        rtk_region_2: "",
        rds_region_1: "",
        rds_region_2: "",
      },
    ],
    industryDetails: [
      {
        industryType: "",
        rtkRegion1: "",
        rtkRegion2: "",
        rdsRegion1: "",
        rdsRegion2: "",
      },
    ],
  });

  const fetchState = async () => {
    try {
      const resCate = await getUserCategoryData();

      setCatetory(resCate.data.data);
    } catch (error) {
      toast.error('Error fetching data:');
    }
  };
  useEffect(() => {
    fetchState();
  }, []);

  const handleInputChange = (index, field, value, dataType) => {
    if (dataType === "User Type") {
      const updatedDetails = [...formValues.usageDetails];
      updatedDetails[index][field] = value;
      setFormValues({ ...formValues, usageDetails: updatedDetails });
    } else if (dataType === "Industry Type") {
      const updatedDetails = [...formValues.industryDetails];
      updatedDetails[index][field] = value;
      setFormValues({ ...formValues, industryDetails: updatedDetails });
    }
  };

  const addIndustryRow = () => {
    setFormValues({
      ...formValues,
      industryDetails: [
        ...formValues.industryDetails,
        {
          industryType: "",
          rtkRegion1: "",
          rtkRegion2: "",
          rdsRegion1: "",
          rdsRegion2: "",
        },
      ],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (dataType === "User Type") {
      try {
        const response = await usageUserDetails(formValues);

        setFormValues({
          month: "",
          year: "",
          usageDetails: [
            {
              user_type: "Other Government Users",
              rtk_region_1: "",
              rtk_region_2: "",
              rds_region_1: "",
              rds_region_2: "",
            },
            {
              user_type: "Private Users",
              rtk_region_1: "",
              rtk_region_2: "",
              rds_region_1: "",
              rds_region_2: "",
            },
            {
              user_type: "Research and Academic Users",
              rtk_region_1: "",
              rtk_region_2: "",
              rds_region_1: "",
              rds_region_2: "",
            },
            {
              user_type: "Survey of India",
              rtk_region_1: "",
              rtk_region_2: "",
              rds_region_1: "",
              rds_region_2: "",
            },
            {
              user_type: "Training and Maintenance",
              rtk_region_1: "",
              rtk_region_2: "",
              rds_region_1: "",
              rds_region_2: "",
            },
          ],

        });

        if (response.data.success === true) {
          toast.success("Data submitted successfully");
          navigate('/admin/dashboard');
        }
      } catch (error) {
        toast.error("Error submitting form:", error);
      }
    } else if (dataType === "Industry Type") {
      try {
        const response = await usageIndustry(formValues);

        setFormValues({
          month: "",
          year: "",

          industryDetails: [
            {
              industryType: "",
              rtkRegion1: "",
              rtkRegion2: "",
              rdsRegion1: "",
              rdsRegion2: "",
            },
          ],
        });

        if (response.data.success === true) {
          toast.success("Data submitted successfully000");
          navigate('/admin/dashboard');
        }
      } catch (error) {
        console.log(error);
        toast.error("Error submitting form:", error);
      }
    }
  };


  return (
    <Sidebar>
      <div className="clear">
        <div className="section_heading">
          <h2 className="title_heading">Usage Details</h2>
        </div>
        <div className="mb-4">
          <div className="box_header">
            <div>
              <i className="fa-solid fa-square-plus"></i>&nbsp; Add Usage Details
            </div>
          </div>
          <div className="box_body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <div className="row mt-2">
                  <div className="col-md-4">
                    <div className="form-group d-flex align-items-center">
                      <label
                        htmlFor="dataType"
                        className="me-2 mb-0"
                        style={{ whiteSpace: "nowrap" }}
                      >
                        Data Type:
                      </label>
                      <select
                        className="form-control"
                        value={dataType}
                        onChange={(e) => setDataType(e.target.value)}
                      >
                        <option>User Type</option>
                        <option>Industry Type</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group d-flex align-items-center">
                      <label
                        htmlFor="month"
                        className="me-2 mb-0"
                        style={{ whiteSpace: "nowrap" }}
                      >
                        Month [MM]:
                      </label>
                      <input
                        type="text"
                        id="month"
                        required
                        minLength="2"
                        maxLength="2"
                        className="form-control"
                        value={formValues.month}
                        onChange={(e) =>
                          setFormValues({
                            ...formValues,
                            month: e.target.value,
                          })
                        }
                        placeholder="MM eg. 01,02..,10,11 etc."
                      />
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group d-flex align-items-center">
                      <label
                        htmlFor="year"
                        className="me-2 mb-0"
                        style={{ whiteSpace: "nowrap" }}
                      >
                        Year [YYYY]:
                      </label>
                      <input
                        type="text"
                        required
                        minLength="4"
                        maxLength="4"
                        id="year"
                        className="form-control"
                        value={formValues.year}
                        onChange={(e) =>
                          setFormValues({ ...formValues, year: e.target.value })
                        }
                        placeholder="YYYY eg. 2020,2021,2022 etc."
                      />
                    </div>
                  </div>
                </div>
              </div>

              {dataType === "User Type" && (
                <div>
                  <div className="table-responsive">
                    <table className="table table-bordered">
                      <thead className="table-primary">
                        <tr>
                          <th>User Type</th>
                          <th>RTK Region 1</th>
                          <th>RTK Region 2</th>
                          <th>RDS Region 1</th>
                          <th>RDS Region 2</th>
                        </tr>
                      </thead>
                      <tbody>
                        {formValues.usageDetails.map((detail, index) => (
                          <tr key={index}>
                            <td>{detail.user_type}</td>
                            <td>
                              <input
                                type="number"
                                className="form-control"
                                value={detail.rtk_region_1}
                                onChange={(e) =>
                                  handleInputChange(
                                    index,
                                    "rtk_region_1",
                                    e.target.value,
                                    "User Type"
                                  )
                                }
                              />
                            </td>
                            <td>
                              <input
                                type="number"
                                className="form-control"
                                value={detail.rtk_region_2}
                                onChange={(e) =>
                                  handleInputChange(
                                    index,
                                    "rtk_region_2",
                                    e.target.value,
                                    "User Type"
                                  )
                                }
                              />
                            </td>
                            <td>
                              <input
                                type="number"
                                className="form-control"
                                value={detail.rds_region_1}
                                onChange={(e) =>
                                  handleInputChange(
                                    index,
                                    "rds_region_1",
                                    e.target.value,
                                    "User Type"
                                  )
                                }
                              />
                            </td>
                            <td>
                              <input
                                type="number"
                                className="form-control"
                                value={detail.rds_region_2}
                                onChange={(e) =>
                                  handleInputChange(
                                    index,
                                    "rds_region_2",
                                    e.target.value,
                                    "User Type"
                                  )
                                }
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="text-center">
                    <button type="submit" className="btn btn-success col-md-2">
                      Submit
                    </button>
                  </div>
                </div>
              )}
              {dataType === "Industry Type" && (
                <div>
                  <div className="table-responsive">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>Industry Type</th>
                          <th>RTK Region 1</th>
                          <th>RTK Region 2</th>
                          <th>RDS Region 1</th>
                          <th>RDS Region 2</th>
                        </tr>
                      </thead>
                      <tbody>
                        {formValues.industryDetails.map((row, index) => (
                          <tr key={index}>
                            <td>
                              <select
                                className="form-control"
                                value={row.industryType}
                                onChange={(e) =>
                                  handleInputChange(
                                    index,
                                    "industryType",
                                    e.target.value,
                                    "Industry Type"
                                  )
                                }
                              >
                                <option>Select Category</option>
                                {categoryData.length > 0 ? (
                                  categoryData.map((state, index) => (
                                    <option key={index} value={state.name}>
                                      {state.name}
                                    </option>
                                  ))
                                ) : (
                                  <option key={0} value="">No Data</option>
                                )}
                              </select>
                            </td>
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                value={row.rtkRegion1}
                                onChange={(e) =>
                                  handleInputChange(
                                    index,
                                    "rtkRegion1",
                                    e.target.value,
                                    "Industry Type"
                                  )
                                }
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                value={row.rtkRegion2}
                                onChange={(e) =>
                                  handleInputChange(
                                    index,
                                    "rtkRegion2",
                                    e.target.value,
                                    "Industry Type"
                                  )
                                }
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                value={row.rdsRegion1}
                                onChange={(e) =>
                                  handleInputChange(
                                    index,
                                    "rdsRegion1",
                                    e.target.value,
                                    "Industry Type"
                                  )
                                }
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                value={row.rdsRegion2}
                                onChange={(e) =>
                                  handleInputChange(
                                    index,
                                    "rdsRegion2",
                                    e.target.value,
                                    "Industry Type"
                                  )
                                }
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="text-center">
                    <button
                      type="button"
                      className="btn btn-primary me-2 col-md-2"
                      onClick={addIndustryRow}
                    >
                      Add More
                    </button>
                    <button type="submit" className="btn btn-success col-md-2">
                      Submit
                    </button>
                  </div>
                </div>
              )}

            </form>
          </div>
        </div>
      </div>
    </Sidebar>
  );
};

export default UsageUserType;
