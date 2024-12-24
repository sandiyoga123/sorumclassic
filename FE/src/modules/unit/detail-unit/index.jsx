import { useParams } from "react-router-dom";

const DetailUnit = () => {
  const { id } = useParams();
  return (
    <div>
      <h1>Detail unit : {id}</h1>
    </div>
  );
};

export default DetailUnit;
