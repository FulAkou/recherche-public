// import EtablissementsCharts from "./charts/EtablissementsCharts";
// import MarcheInternetChart from "./charts/MarcheInternetChart";
// import MatierePremiereChart from "./charts/MatierePremiereChart";
// import ProductionCacaoChart from "./charts/ProductionCacaoChart";
// import ProductionPoissonViandeChart from "./charts/ProductionPoissonViandeChart";

// const Dashboard = ({ activeChart }) => {
//   return (
//     <div className="bg-white rounded-xl shadow-md p-6">
//       {activeChart === "production" && <ProductionPoissonViandeChart />}
//       {activeChart === "matiere" && <MatierePremiereChart />}
//       {activeChart === "internet" && <MarcheInternetChart />}
//       {activeChart === "Etablissement" && <EtablissementsCharts />}
//       {activeChart === "Production Cacao" && <ProductionCacaoChart />}
//     </div>
//   );
// };

// export default Dashboard;

import BilanProgrammeServiceGouvChart from "./charts/BilanProgrammeServiceGouvChart";
import ConsommationEngraisChart from "./charts/ConsommationEngraisChart";
import CovidCorrelationChart from "./charts/CovidCorrelationChart";
import DisponibiliteInfraChart from "./charts/DisponibiliteInfraChart";
import EffectifParVilleChart from "./charts/EffectifParVilleChart";
import EffectifServicesChart from "./charts/EffectifServicesChart";
import EtablissementsCharts from "./charts/EtablissementsCharts";
import MarcheInternetChart from "./charts/MarcheInternetChart";
import MatierePremiereChart from "./charts/MatierePremiereChart";
import ProductionCacaoChart from "./charts/ProductionCacaoChart";
import ProductionPoissonViandeChart from "./charts/ProductionPoissonViandeChart";
import SecteurAccidentsRouteChart from "./charts/SecteurAccidentsRouteChart";
import SecteurAccidentsTravailChart from "./charts/SecteurAccidentsTravailChart";

const Dashboard = ({ activeChart }) => {
  return (
    <div className="bg-[#A5E4FF4D] rounded-xl shadow-md p-6 my-4">
      {activeChart === "production" && <ProductionPoissonViandeChart />}
      {activeChart === "matiere" && <MatierePremiereChart />}
      {activeChart === "internet" && <MarcheInternetChart />}
      {activeChart === "Etablissement" && <EtablissementsCharts />}
      {activeChart === "Production Cacao" && <ProductionCacaoChart />}
      {activeChart === "Effectif des ecoles" && <EffectifParVilleChart />}
      {activeChart === "disponibilite des infrastructures" && (
        <DisponibiliteInfraChart />
      )}
      {activeChart === "Bilan Programme Service Gouv" && (
        <BilanProgrammeServiceGouvChart />
      )}
      {activeChart === "Consommation engraisse" && <ConsommationEngraisChart />}
      {activeChart === "Hopitaux Generaux" && <EffectifServicesChart />}
      {activeChart === "Covid Correlation" && <CovidCorrelationChart />}
      {activeChart === "Accident de Travail" && (
        <SecteurAccidentsTravailChart />
      )}
      {activeChart === "Accident de Route" && <SecteurAccidentsRouteChart />}
    </div>
  );
};

export default Dashboard;
