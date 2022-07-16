import Modal from "../../../global/Modal";

interface CurrentOrderModalProps {
  open: boolean;
  handleClose: () => void;
  handleOpen: () => void;

  status: string;
  address: string;
  items: Array<{
    name: string;
    amount: string | number;
    price: string | number;
  }>;
  onClickContinue: () => void;
}

const CurrentOrderModal = ({
  handleClose,
  open,
  handleOpen,
  status,
  address,
  items,
  onClickContinue,
}: CurrentOrderModalProps) => {
  return (
    <Modal handleClose={handleClose} isOpen={open} handleOpen={handleOpen}>
      <div className="card w-[500px] bg-neutral text-neutral-content">
        <div className="card-body items-center text-center">
          <h2 className="card-title">Current Order</h2>
          <p>Status: {status}</p>
          <p>Address: {address}</p>
          <ul className="menu w-56 bg-neutral text-neutral-content">
            {items?.map(({ name, amount, price }, index) => (
              <li key={`order-item-current-${index}`}>
                <p>Name: {name}</p>
                <p>Amount: {amount}</p>
                <p>Price: {price}</p>
                <br />
                <div className="divider-horizontal"></div>
              </li>
            ))}
          </ul>
          <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={onClickContinue}>
              Continue
            </button>
            <button className="btn btn-ghost">Cancel</button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CurrentOrderModal;
