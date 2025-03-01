import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import AddCampaignPage from "./pages/AddCampaignPage";
import CampaignDetailsPage from "./pages/CampaignDetailsPage";


function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/campaign/add" element={<AddCampaignPage />} />
        <Route path="/campaign/:id" element={<CampaignDetailsPage />} />
        <Route path="/campaign/:id/edit" element={<AddCampaignPage />} />
      </Routes>
    </div>
  )
}

export default App
