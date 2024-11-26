import React from "react";
import { useMyContext } from "../../Hooks/Context/CreateSidebarContext";
import ToggleDark from "./ToggleDark";
import PagesIndex from "../../Pages/PagesIndex";
import { Remove_Space_Character } from "../../Utils/Valid_Rejex";
import { GetExpired } from "../../Utils/UserExpired";
const Header = () => {
  const { toggleSidebar } = useMyContext();
  const navigate = PagesIndex.useNavigate();
  const dispatch = PagesIndex.useDispatch();



  const token = localStorage.getItem("token");

  const generateToken = async () => {
    const val = PagesIndex.Remove_Special_Character(PagesIndex.v4());
    // const res = await dispatch(PagesIndex.getGenerateToken(val)).unwrap();
    // const res1 = await PagesIndex.LIST_SYSTEM_INFO_API(res?.data?.token);
    // let image = res1?.data?.details?.[0]?.backgroundImage;
    // let logo = res1?.data?.details?.[0]?.logo;
    // let favIcon = res1?.data?.details?.[0]?.favIcon;
    // let shortIcon = Remove_Space_Character(res1?.data?.details?.[0]?.title);

    // $("#dynamic-background").css("background-image", `url(${image && image})`);
    // $("#company-logo").attr("src", logo);
    // $("#favicon").attr("href", favIcon);
    // $("#sidebar-logo").attr("src", logo);
    // $("#sidebar-logo-short").html(shortIcon);
  };

  // PagesIndex.useEffect(() => {
  //   generateToken();
  // }, []);

  const handleLogout = () => {
    // localStorage.removeItem("token");
    // localStorage.removeItem("role");
    // localStorage.removeItem("userId");
    PagesIndex.toast.success("Logged Out Successfully");
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  const abcd = () => {
    const checkTokenExpiry = () => {
      GetExpired(token, navigate);
    };
    const interval = setInterval(checkTokenExpiry, 5000);
    return () => clearInterval(interval);
  };

  PagesIndex.useEffect(() => {
    abcd();
  }, [navigate]);

  return (
    <div className="header">
      <div className="header-content clearfix">
        <div className="nav-control">
          <div className="hamburger">
            <span className="toggle-icon">
              <i className="icon-menu" onClick={() => toggleSidebar()} />
            </span>
          </div>
        </div>

        <div className="header-right">
          <ul className="clearfix">
            <li className="icons dropdown">
              <ToggleDark />
            </li>
            <li className="icons dropdown">
              <div
                className="user-img c-pointer position-relative"
                data-toggle="dropdown"
              >
                <span className="activity active" />
                <img
                  src="/assets/images/user/1.png"
                  height={40}
                  width={40}
                  alt=""
                />
              </div>
              <div className="drop-down dropdown-profile animated fadeIn dropdown-menu">
                <div className="dropdown-content-body">
                  <ul>
                    <li>
                      <PagesIndex.Link to="/admin/user/profile">
                        <i className="icon-user" /> <span>Profile</span>
                      </PagesIndex.Link>
                    </li>
                    <li>
                      <a href="javascript:void()">
                        <i className="icon-envelope-open" /> <span>Inbox</span>{" "}
                        <div className="badge gradient-3 badge-pill gradient-1">
                          3
                        </div>
                      </a>
                    </li>
                    <hr className="my-2" />
                    <li>
                      <a href="page-lock.html">
                        <i className="icon-lock" /> <span>Lock Screen</span>
                      </a>
                    </li>
                    <li>
                      <PagesIndex.Link href="#" onClick={() => handleLogout()}>
                        <i className="icon-key" /> <span>Logout</span>
                      </PagesIndex.Link>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
