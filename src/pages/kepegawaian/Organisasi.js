import React, { useEffect } from "react";
import KepegawaianOrganisasi from "./kepegawaian-organisasi";
import { getSatker, getKantor, getKanwil } from "../../actions/globalActions";
import { useDispatch } from "react-redux";
import bgImg from "../../assets/img/kepegawaian.jpg";

const Organisasi = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSatker());
    dispatch(getKantor());
    dispatch(getKanwil());
  }, []);

  return (
    <div
      style={{
        paddingBottom: 20,
        paddingTop: 20,
        backgroundImage: `url(${bgImg})`,
        height: "80vh",
        width: "100wh",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        zIndex: 1,
      }}
    >
      <KepegawaianOrganisasi />
    </div>
  );
};

export default Organisasi;
