import React, { useEffect } from "react";
import Split_Main_Containt from "../../../Layout/Main/Split_Main_Content";
import PagesIndex from "../../../Pages/PagesIndex";
import { getActualDateFormate, today } from "../../../Utils/Common_Date";
import ReusableModal from "../../Modal/ReusableModal";

const ProfitLoss = ({ gameType, getProfiLoss, providersList, getBidData }) => {
  const token = localStorage.getItem("token");

  const [GetProvider, setGetProvider] = PagesIndex.useState([]);
  const [PanaList, setPanaList] = PagesIndex.useState([]);
  const [PanaList1, setPanaList1] = PagesIndex.useState([]);
  const [SingleDigit, setSingleDigit] = PagesIndex.useState([]);
  const [SingleDigit1, setSingleDigit1] = PagesIndex.useState([]);
  const [Calulations, setCalulations] = PagesIndex.useState([]);
  const [SearchInTable, setSearchInTable] = PagesIndex.useState("");
  const [UserList, setUserList] = PagesIndex.useState([]);
  const [visible, setVisible] = PagesIndex.useState(false);

  const getGameResultApi = async () => {
    const res = await PagesIndex.game_service.ALL_GAME_PROFIT_LOSS_API(
      providersList,
      token
    );
    if (res.status) {
      setGetProvider(res?.data);
    }
  };

  useEffect(() => {
    getGameResultApi();
  }, []);


  // console.log("todaytoday" ,today(new Date()));
  
  var sumdigit = 0;
  const formik = PagesIndex.useFormik({
    initialValues: {
      provider: "",
      date: today(new Date()),
    },
    validate: (values) => {
      const errors = {};
      if (!values.provider) {
        errors.provider = PagesIndex.valid_err.GAME_PROVIDER_ERROR;
      }
      if (!values.date) {
        errors.date = PagesIndex.valid_err.DOMAIN_ERROR;
      }
      return errors;
    },
    onSubmit: async (values) => {
      const req = {
        // provider: "668d4382211a65d88600fa7e",
        // date: "11/22/2024",

        provider: values.provider,
        date: values.date,
      };
      try {
        const res =
          await PagesIndex.game_service.STARLINE_GAME_PROFIT_LOSS_LIST_API(
            getProfiLoss,
            req,
            token
          );
        if (res.status) {
          let totalPanaSum = 0,
            totalBidPanaSum = 0;
          let totalSum = 0,
            totalBidSum = 0;

          let resultArray = [];

          // Calculate Pana totals
          res.data.data1.forEach((e) => {
            if (e.bidDigit.length === 3) {
              totalPanaSum += e.sumdigit;
              totalBidPanaSum += e.countBid;
            }
          });

          resultArray.push({
            type: "Pana",
            totalBids: totalBidPanaSum,
            totalSum: totalPanaSum,
          });

          res.data.data1.forEach((e) => {
            if (e.bidDigit.length === 1) {
              resultArray.push({
                type: e.gameTypeName,
                totalBids: e.countBid,
                totalSum: e.sumdigit,
              });
              sumdigit += e.sumdigit;
              totalSum = totalPanaSum + sumdigit;
              totalBidSum = totalBidPanaSum + e.countBid;
            }
          });

          resultArray.push({
            type: "Grand Total",
            totalBids: totalBidSum,
            totalSum: totalSum,
          });

          setCalulations(resultArray);
          setPanaList(res.data.pana);
          setSingleDigit(res.data.data2);

          let singleDigit = "";
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message ||
          "Something went wrong. Please try again.";
        PagesIndex.toast.error(errorMessage);
      }
    },
  });

  PagesIndex.useEffect(() => {
    let PanaProfit = Calulations && Calulations[0]?.totalSum;
    let sumdigit = Calulations && Calulations[1]?.totalSum;
    let pannaArr = [];
    let singleArr = [];
    let allSingle = [
      { Digit: 0 },
      { Digit: 1 },
      { Digit: 2 },
      { Digit: 3 },
      { Digit: 4 },
      { Digit: 5 },
      { Digit: 6 },
      { Digit: 7 },
      { Digit: 8 },
      { Digit: 9 },
    ];

    SingleDigit &&
      SingleDigit.map((e) => {
        let str = e._id;
        let total = 0;
        let loss = 0;
        let profit = 0;
        let pl = e.sumdigit * e.gamePrice;

        if (str.length === 1) {
          if (pl > sumdigit) {
            loss = pl - sumdigit;
          } else {
            profit = sumdigit - pl;
          }

          singleArr[e._id] = {
            digit: e._id,
            TotalBidsAmount: e.sumdigit,
            amountToPay: pl,
            profit: profit,
            Loss: loss,
          };
        } else {
          if (pl > PanaProfit) {
            loss = pl - PanaProfit;
          } else {
            profit = PanaProfit - pl;
          }

          pannaArr[e._id] = {
            digit: e._id,

            TotalBidsAmount: e.sumdigit,
            amountToPay: pl,
            profit: profit,
            Loss: loss,
          };
        }
      });

    setSingleDigit1(singleArr);
    let dataArray = [];

    PanaList &&
      PanaList.map(function (e) {
        let tabDigit = e.Digit;
        let bidCount = "No Bids";
        let amountToPay = 0;
        let SumDigit = 0;

        let profit = PanaProfit;
        let loss = 0;
        if (pannaArr[tabDigit]) {
          bidCount = pannaArr[tabDigit].bidCount;
          amountToPay = pannaArr[tabDigit].amountToPay;
          SumDigit = pannaArr[tabDigit].TotalBidsAmount;
          profit = pannaArr[tabDigit].profit;
          loss = pannaArr[tabDigit].Loss;
        }

        dataArray.push({
          Digit: `${tabDigit}-${e.DigitFamily}`,
          tabDigit: tabDigit,
          DigitFamily: e.DigitFamily,
          bidCount: bidCount,
          SumDigit: SumDigit,
          amountToPay: amountToPay,
          TotalBidsAmount: SumDigit,
          profit: profit,
          loss: loss,
        });

        dataArray.sort((a, b) => {
          return parseInt(a.tabDigit) - parseInt(b.tabDigit);
        });
      });

    setPanaList1(dataArray);

    // ---------------------

    // allSingle.forEach(function (e) {
    //   let tabDigit = e.Digit;
    //   let bidCount = "No Bids";
    //   let amountToPay = 0;
    //   let SumDigit = 0;
    //   let profit = sumdigit;
    //   let loss = 0;
    //   if (singleArr[tabDigit]) {
    //     bidCount = singleArr[tabDigit].bidCount;
    //     amountToPay = singleArr[tabDigit].amountToPay;
    //     SumDigit = singleArr[tabDigit].sumDigit;
    //     profit = singleArr[tabDigit].profit;
    //     loss = singleArr[tabDigit].Loss;
    //   }
    // });
  }, [SingleDigit, sumdigit, Calulations]);

  const fields = [
    {
      name: "provider",
      label: "Provider Name",
      type: "select",
      options:
        (GetProvider &&
          GetProvider.map((item) => ({
            label: item.providerName,
            value: item._id,
          }))) ||
        [],
      label_size: 12,
      col_size: 6,
    },
    {
      name: "date",
      label: "Result Date",
      type: "date",
      label_size: 12,
      col_size: 6,
    },
  ];

  const visibleFields = [
    "digit",
    "TotalBidsAmount",
    "amountToPay",
    "profit",
    "Loss",
    "gamePrice",
  ];

  const visibleFields1 = [
    "Digit",
    "TotalBidsAmount",
    "amountToPay",
    "profit",
    "loss",
    "gamePrice",
  ];

  const handleActionBtn = async (row) => {
    const req = {
      date: formik?.values?.date,
      bidDigit: row?.tabDigit || row?.digit,
      id: formik?.values?.provider,
    };
    const res =
      await PagesIndex.game_service.STARLINE_GAME_PROFIT_LOSS_BID_DATA_API(
        getBidData,
        req,
        token
      );
    if (res.status) {
      setUserList(res.data);
    } else {
      setUserList([]);
    }
  };

  const UserFullButtonList = [
    {
      id: 0,
      buttonName: "View Bids Info",
      buttonColor: "",
      route: "",
      Conditions: (row) => {
        setVisible(true);
        handleActionBtn(row, 1);
      },
      Visiblity: true,
      type: "ankertag",
    },
  ];

  const UserFullButtonList1 = [
    {
      id: 0,
      buttonName: "View Bids Info",
      buttonColor: "",
      route: "",
      Conditions: (row) => {
        console.log("test", row);
        setVisible(true);

        handleActionBtn(row, 1);
      },
      Visiblity: true,
      type: "ankertag",
    },
  ];
  const cardLayouts = [
    {
      size: 8,
      body: (
        <div>
          <PagesIndex.Formikform
            fieldtype={fields.filter((field) => !field.showWhen)}
            show_submit={true}
            formik={formik}
            btn_name="Submit"
          />
        </div>
      ),
    },
    {
      size: 4,
      body: (
        <div>
          <div>
            <table
              className="tablesaw table mb-0 tablesaw-swipe"
              data-tablesaw-mode="swipe"
              data-tablesaw-mode-switch=""
              data-tablesaw-minimap=""
              id="tablesaw-5771"
            >
              <thead className="primary-color">
                <tr>
                  <th scope="col">Type</th>
                  <th scope="col">Bids</th>
                  <th scope="col">Amount</th>
                </tr>
              </thead>
              <tbody style={{ fontSize: 12 }} id="groupData">
                {Calulations.length > 0 &&
                  Calulations.map((item, index) => (
                    <tr key={index}>
                      <td
                        className={index === 2 ? " primary-color fw-bold" : ""}
                      >
                        {item.type}
                      </td>
                      <td
                        className={index === 2 ? " primary-color fw-bold" : ""}
                      >
                        {item.totalBids}
                      </td>
                      <td
                        className={index === 2 ? " primary-color fw-bold" : ""}
                      >
                        {item.totalSum}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      ),
    },
    {
      size: 12,
      body: (
        <div>
          <h5>Single Digit</h5>
          <PagesIndex.TableWitCustomPegination
            data={SingleDigit1}
            initialRowsPerPage={5}
            SearchInTable={SearchInTable}
            visibleFields={visibleFields}
            UserFullButtonList={UserFullButtonList}
            searchInput={
              <input
                type="text"
                placeholder="Search..."
                value={SearchInTable}
                onChange={(e) => setSearchInTable(e.target.value)}
                className="form-control ms-auto"
              />
            }
          />
        </div>
      ),
    },
    {
      size: 12,
      body: (
        <div>
          <h5>Pana Digit</h5>
          <PagesIndex.TableWitCustomPegination
            data={PanaList1 && PanaList1}
            initialRowsPerPage={5}
            SearchInTable={SearchInTable}
            visibleFields={visibleFields1}
            UserFullButtonList={UserFullButtonList1}
            searchInput={
              <input
                type="text"
                placeholder="Search..."
                value={SearchInTable}
                onChange={(e) => setSearchInTable(e.target.value)}
                className="form-control ms-auto"
              />
            }
          />
        </div>
      ),
    },
  ];

  const visibleFields2 = [
    "id",
    "userName",
    "bidDigit",
    "biddingPoints",
    "winStatus",
    "createdAt",
  ];

  return (
    <div>
      <Split_Main_Containt
        title="Starline Profit/Loss Calculations"
        add_button={false}
        btnTitle="Add"
        route="/add"
        cardLayouts={cardLayouts}
      />

      <ReusableModal
        ModalState={visible}
        setModalState={setVisible}
        ModalTitle={"test"}
        ModalBody={
          <PagesIndex.TableWitCustomPegination
            data={UserList && UserList}
            initialRowsPerPage={5}
            SearchInTable={SearchInTable}
            visibleFields={visibleFields2}
            showIndex={true}

            // searchInput={
            //   <input
            //     type="text"
            //     placeholder="Search..."
            //     value={SearchInTable}
            //     onChange={(e) => setSearchInTable(e.target.value)}
            //     className="form-control ms-auto"
            //   />
            // }
          />
        }
      />
    </div>
  );
};

export default ProfitLoss;
