import React from "react";
import MainGameReports from "../../../Helpers/Reports/GameReports/MainReport";
import PagesIndex from "../../PagesIndex";
import { Api } from "../../../Config/Api";
import { abc, today } from "../../../Utils/Common_Date";
import { toast } from "react-toastify";

const AllReports = () => {
  const token = localStorage.getItem("token");

  const [GetDetails, setGetDetails] = PagesIndex.useState([]);
  const [GetBankDetails, setGetBankDetails] = PagesIndex.useState([]);

  const [Refresh, setRefresh] = PagesIndex.useState(false);

  const [UserPagenateData, setUserPagenateData ] = PagesIndex.useState({
    pageno: 1,
    limit: 10,
  });

  const [TotalPages, setTotalPages] = PagesIndex.useState(1);

  const getReportDetails = async () => {
    const res = await PagesIndex.report_service.GET_REPORT_DETAILS_API(
      Api.TOTAL_BIDS_LIST_DETAILS,
      token
    );

    setGetBankDetails(res.provider);
    setGetDetails(res.list);
  };

  PagesIndex.useEffect(() => {
    getReportDetails();
  }, []);

  const FIELDS = [
    {
      title: "Detailed Bidding Report",
      fields: [
        {
          name: "providerName",
          label: "Select Provider",
          type: "select",
          options:
            (GetBankDetails &&
              GetBankDetails?.map((item) => ({
                label: item.providerName,
                value: item._id,
              }))) ||
            [],
          col_size: 3,
        },
        {
          name: "gameType",
          label: "Select Game Type",
          type: "select",
          options:
            (GetDetails &&
              GetDetails?.map((item) => ({
                label: item.gameName,
                value: item._id,
              }))) ||
            [],
          col_size: 3,
        },
        {
          name: "session",
          label: "Select Session",
          type: "select",
          options:
            [
              {
                label: "Close",
                value: "Close",
              },
              {
                label: "Open",
                value: "Open",
              },
            ] || [],
          col_size: 3,
        },
        { name: "date", label: "Start Date", type: "date", col_size: 3 },
      ],
      visibleFields: [
        {
          name: "User Name",
          value: "userName",
          sortable: true,
        },
        {
          name: "Bracket",
          value: "bidDigit",
          sortable: false,
        },
        {
          name: "bidding Points",
          value: "biddingPoints",
          sortable: true,
        },
        {
          name: "Winning Points",
          value: "gameWinPoints",
          sortable: true,
        },
        {
          name: "transaction Id",
          value: "createdAt",
          sortable: true,
          transform: (item, row) => {
            return item || "null";
          },
        },
      ],
      fetchReportData: async (value) => {

        if (!value.providerName) {
          toast.error("Provider Name is required");
          return;
        }
        if (!value.gameType) {
          toast.error("gameType  is required ");
          return;
        }
        if (!value.session) {
          toast.error("session  is required");
          return;
        }

        
        const payload = {
          providerName: value.providerName,
          gameType: value.gameType,
          session: value.session,
          date: today(value.date) || today(new Date()),
          userName: "",
          page: UserPagenateData.pageno,
          limit: UserPagenateData.limit,
        };

        try {
          // Call your API for report 1
          const res = await PagesIndex.report_service.GET_FUND_REPORT_API(
            Api.TOTAL_BIDS_LIST,
            payload,
            token
          );

          if (res.status) {
            setTotalPages(res.totalPages);
            setRefresh(!Refresh);
            toast.success(res.message);
          } else {
            toast.error(res.response.data.message);
          }

          return res;
        } catch (error) {
          const errorMessage =
            error.response?.data?.message ||
            "Something went wrong. Please try again.";
          PagesIndex.toast.error(errorMessage);
        }
      },
      show_additional: false,
    },
  ];

  return (
    <div>
      {FIELDS.map((config, idx) => (
        <MainGameReports
          key={idx}
          title={config.title}
          config={config}
          fetchReportData={config.fetchReportData}
          setUserPagenateData={setUserPagenateData}
          TotalPagesCount={(TotalPages && TotalPages) || []}
          Refresh={Refresh}
        />
      ))}
         <PagesIndex.Toast />
    </div>
  );
};

export default AllReports;
