import axios from "axios";

export const commonrequest = async (methods, url, body, header) => {
  const config = {
    method: methods,
    url,
    headers: header || { "Content-Type": body instanceof FormData ? undefined : "application/json" },
    data: body,
  };

  try {
    const response = await axios(config);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      status: error.response ? error.response.status : 500,
      message: error.response
        ? error.response.data
        : "An unknown error occurred",
    };
  }
};


