import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CardInfo from "../../components/cardInfo/cardInfo";
import { httpsCallable } from "firebase/functions";
import { functions } from "../../firebase/firebaseConfig";

export default function Info() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const call = searchParams.get("call");

  const [loading, setLoading] = useState(true);
  const [fetchData, setFetchData] = useState([]);

  useEffect(() => {
    const getData = httpsCallable(functions, call);
    getData().then((res) => {
      setFetchData(res.data);
    });
  }, [call]);

  const deleteCard = (id) => {
  setFetchData((prev) => prev.filter(card => card.id !== id));
};

  return (
    <div>
      {fetchData.map((data) => (
        <CardInfo key={data.id} data={data} deleteCard={deleteCard} />
      ))}
    </div>
  );
}
