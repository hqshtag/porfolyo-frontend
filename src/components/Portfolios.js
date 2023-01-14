import React, { useEffect } from "react";
import PortfolioServices from "../services/PortfolioServices";
import Portfolio from "./partials/Portfolio";

/**FETCH AND DISPLAY PORTFOLIOS */
const Portfolios = () => {
  const [portfolios, setPortfolios] = React.useState([]);

  useEffect(() => {
    (async () => {
      const response = await PortfolioServices.getAll();
      setPortfolios(response.data.data);
    })();
  }, []);

  const portfoliosRender = portfolios.map((p) => <Portfolio portfolio={p} />);

  return (
    <div>
      Portfolios
      <div>{portfoliosRender}</div>
    </div>
  );
};

export default Portfolios;
