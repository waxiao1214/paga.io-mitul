import ScanBarcode from "containers/scanbarcode/ScanBarcode";
import ViewProfile from "containers/viewprofile/ViewProfile";
import ProfileStatistics from "containers/statistics/ProfileStatistics";
import AppInformation from "containers/information/AppInformation";
import CreateProfile from "containers/createprofile/CreateProfile";
import MedDetail from "containers/med/MedDetail";
import PowerDetail from "containers/power/PowerDetail";
import SimulationDetail from "containers/simulation/SimulationDetail";
import StopAllenamento from "containers/stopallenamento/StopAllenamento";
import Workout from "containers/workout/Workout";
// PAD COMPONENETS
import QRCodeStarter from "containers/pad/barcode/QRCodeStarter";
import Stats from "containers/pad/stats/Stats";
import PadSimulation from "containers/pad/padsimulation/PadSimulation";

const indexRoutes = [
  { path: "/scan", component: ScanBarcode },
  { path: "/view-profile", component: ViewProfile },
  { path: "/profile-statistics", component: ProfileStatistics },
  { path: "/information", component: AppInformation },
  { path: "/create-profile", component: CreateProfile },
  { path: "/med", component: MedDetail },
  { path: "/power", component: PowerDetail },
  { path: "/simulation", component: SimulationDetail },
  { path: "/stop-allenamento", component: StopAllenamento },
  { path: "/choose-workout", component: Workout },
  // IPAD ROUTES
  { path: "/barcode", component: QRCodeStarter },
  { path: "/stats", component: Stats },
  { path: "/pad/:id", component: PadSimulation },
];

export default indexRoutes;
