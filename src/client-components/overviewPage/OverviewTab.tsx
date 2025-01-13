"use client";

import OverviewContainer from "@/components/OverviewContainer";
import PrizesContainer from "@/components/PrizesContainer";
import { RootState } from "@/redux/store";
import { JSX } from "react";
import { useSelector } from "react-redux";

const OverviewTab = () => {
  const { tab } = useSelector((store: RootState) => store.overviewTab);

  const tabComponents: Record<string, JSX.Element | null> = {
    overview: <OverviewContainer />,
    prizes: <PrizesContainer />,
  };

  return (
    <div>
      {tabComponents[tab] || <div>Invalid tab selected. Please try again.</div>}
    </div>
  );
};

export default OverviewTab;
