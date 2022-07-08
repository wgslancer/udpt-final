import { useParams } from "react-router-dom";

const Shipper = () => {
  const { shipperId } = useParams();
  return <div>Shipper page {shipperId}</div>;
};

export default Shipper;
