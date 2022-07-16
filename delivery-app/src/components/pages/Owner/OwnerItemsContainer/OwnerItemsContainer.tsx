import { useEffect, useState } from "react";
import { deleteItemById, getAllItemsOwner } from "../../../../api/items/items";
import ItemCard from "../../../common/ItemCard";

interface ItemsContainerProps {
  owner?: boolean;
}

const OwnerItemsContainer = ({ owner }: ItemsContainerProps) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      getAllItemsOwner()
        .then((res) => setItems(res.data))
        .catch((err) => console.log(err));
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const onClickAddToCart = (item: any) => {};

  const onClickDelete = (id: string) => {
    deleteItemById(id);
  };
  return (
    <div className="flex bg-white flex-wrap child:mr-5 child:mb-10 p-20">
      {items.map((item) => {
        const { amount, name, price, id } = item;
        return (
          <ItemCard
            key={`item-${id}`}
            onClickAddToCart={() => onClickAddToCart(item)}
            amount={amount}
            name={name}
            price={price}
            owner={owner}
            onClickDelete={() => onClickDelete(id)}
          />
        );
      })}
    </div>
  );
};

export default OwnerItemsContainer;
