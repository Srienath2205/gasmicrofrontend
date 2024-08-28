import axios from "axios";

const GET = "http://localhost:8787/requestside/getPendingRequestList";
const GETAllForms = "http://localhost:8787/requestside/getConnectionRequests";
const GETApproved = "http://localhost:8787/requestside/getApprovedRequestList";

class FormServices {
  getPendingRequests() {
    return axios.get(GET);
  }

  getAllForms() {
    return axios.get(GETAllForms);
  }

  getApprovedRequests() {
    return axios.get(GETApproved);
  }
}

const formServicesInstance = new FormServices();
export default formServicesInstance;
