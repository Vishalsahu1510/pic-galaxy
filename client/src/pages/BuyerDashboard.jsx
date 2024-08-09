import { useState, useEffect } from "react";
import Orders from "../components/Orders";
import PhotoManagement from "../components/seller/PhotoManagement";
import DashboardSidebar from "../components/DashboardSidebar";
import Analytics from "../components/seller/Analytics";
import { useDispatch, useSelector } from "react-redux";
import PhotosPurchased from "../components/buyer/PhotosPurchased";
import { setTab } from "../../store/slices/navSlice";
import Favourites from "../components/Favourites";

const BuyerDashboard = () => {
  const tab = useSelector((state) => state.nav.tab);
  const dispatch = useDispatch()
  if (tab === "") dispatch(setTab("photos-purchased"))

  const [isBooting, setIsBooting] = useState(false);
  const [currentTab, setCurrentTab] = useState(tab);

  useEffect(() => {
    if (currentTab !== tab) {
      setIsBooting(true);
      setTimeout(() => {
        setIsBooting(false);
        setCurrentTab(tab);
      }, 500); // Adjust the duration as needed
    }
  }, [tab, currentTab]);

  const renderComponent = () => {
    switch (currentTab) {
      case "photos-purchased":
        return <PhotosPurchased />;
      case "orders":
        return <Orders />;
      case "analytics":
        return <Analytics />;
      case "favourites":
        return <Favourites />
      default:
        return <PhotoManagement />;
    }
  };

  return (
    <div className="flex flex-col sm:flex-row">
      <DashboardSidebar />
      <div
        className={`transition-opacity duration-500 ${isBooting ? "opacity-0" : "opacity-100"
          }`}
      >
        {renderComponent()}
      </div>
    </div>
  );
};

export default BuyerDashboard;