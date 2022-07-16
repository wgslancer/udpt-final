export interface ItemCardProps {
  name: string;
  amount: number;
  price: string;
  onClickAddToCart: () => void;
  owner?: boolean;
  onClickDelete?: () => void;
}

const ItemCard = ({
  amount,
  name,
  price,
  onClickAddToCart,
  owner,
  onClickDelete,
}: ItemCardProps) => {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <img src="https://placeimg.com/400/225/arch" alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>
          <span>Amount:</span>
          {amount}
        </p>
        <p>
          <span>Price:</span>
          {price}$
        </p>
        <div className="card-actions justify-end">
          {owner ? (
            <button className="btn btn-error" onClick={onClickDelete}>
              Delete
            </button>
          ) : (
            <button className="btn btn-primary" onClick={onClickAddToCart}>
              Add to cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
