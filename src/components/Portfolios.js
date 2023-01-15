import React, { useEffect } from "react";
import styled from "styled-components";
import PortfolioServices from "../services/PortfolioServices";
import Portfolio from "./partials/Portfolio";

/**FETCH AND DISPLAY PORTFOLIOS */
const Portfolios = ({update}) => {
  const [portfolios, setPortfolios] = React.useState([]);

  useEffect(() => {
    (async () => {
      const response = await PortfolioServices.getAll();
      setPortfolios(response.data.data);
    })();
  }, [update]);

  const portfoliosRender = portfolios?.map((p, k) => <Portfolio portfolio={p} key={k} />);

  return (
    <div>
      <PortfoliosDisplay>{portfoliosRender}</PortfoliosDisplay>
    </div>
  );
};


export const PortfoliosDisplay = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
`

export default Portfolios;
