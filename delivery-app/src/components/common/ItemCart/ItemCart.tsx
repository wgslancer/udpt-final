export interface ItemCartProps {
  name: string;
  amount: number;
  price: string;
}

const ItemCart = ({ amount, name, price }: ItemCartProps) => {
  return (
    <div className="p-4 mt-2 shadow-md">
      <h2 className="font-semibold">{name}</h2>
      <p>
        Amount: <span>{amount}</span>
      </p>
      <p>
        Price: <span>{price}$</span>
      </p>
    </div>
  );
};

export default ItemCart;
