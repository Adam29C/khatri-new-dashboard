import { jwtDecode } from "jwt-decode";


export const GetExpired = (tokenExpiry , navigate) => {
   
  const decoded = jwtDecode(tokenExpiry && tokenExpiry);

  if (decoded.exp < parseInt(Date.now() / 1000)) {
    localStorage.removeItem("token");
    localStorage.removeItem("user_details");
    localStorage.removeItem("roles");
    setTimeout(() => {
      navigate("/tokenexpiry", { replace: true });
    }, 1000);
  } else {
    return "not Expired";
  }
};
