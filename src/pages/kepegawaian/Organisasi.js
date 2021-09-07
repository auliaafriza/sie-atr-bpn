import React, { useEffect } from "react";
import KepegawaianOrganisasi from "./kepegawaian-organisasi";
import { getSatker, getKantor, getKanwil } from "../../actions/globalActions";
import { useDispatch } from "react-redux";

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
        marginTop: 20,
        marginBottom: 20,
        width: "100%",
        height: "90vh",
      }}
    >
      <KepegawaianOrganisasi />
    </div>
  );
};

export default Organisasi;
