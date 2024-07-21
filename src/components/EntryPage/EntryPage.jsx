import "./EntryPage.scss";
import { Banner } from "./Banner/Banner";
import { About } from "./About/About";
import { Information } from "./Information/Information";
import { Work } from "./Work/Work";

export const EntryPage = () => {
  return (
    <>
      <div className="black">
        <Banner></Banner>
        <About></About>
        <Information></Information>

       
      </div>
      <Work></Work>
    </>
  );
};
