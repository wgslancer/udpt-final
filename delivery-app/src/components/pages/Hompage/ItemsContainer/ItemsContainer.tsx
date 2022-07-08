import { useEffect, useState } from "react";
import { getAllItems } from "../../../../api/items/items";
import ItemCard from "../../../common/ItemCard";

const ItemsContainer = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getAllItems()
      .then((res) => setItems(res.data))
      .catch((err) => console.log(err));
  }, []);

  const onClickAddToCart = (item: any) => {
    const { amount, createddate, updateddate, ...itemWithoutAmount } = item;

    const cart = localStorage.getItem("cart");
    if (!cart) {
      const newItem = {
        ...itemWithoutAmount,
        amount: 1,
      };
      const newCart = [newItem];
      localStorage.setItem("cart", JSON.stringify(newCart));
    } else {
      const currentCart = JSON.parse(cart);
      const findItem = currentCart.filter(
        (currentItem: { id: any }) => currentItem.id === item.id
      )[0];
      if (findItem) {
        const addAmountToItem = currentCart.map(
          (currentItem: { id: number; amount: number }) =>
            currentItem.id === item.id
              ? { ...item, amount: currentItem.amount + 1 }
              : currentItem
        );
        const newCart = [...addAmountToItem];
        localStorage.setItem("cart", JSON.stringify(newCart));
      } else {
        const newItem = {
          ...itemWithoutAmount,
          amount: 1,
        };
        const newCart = [...currentCart, newItem];
        localStorage.setItem("cart", JSON.stringify(newCart));
      }
    }
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
          />
        );
      })}
    </div>
  );
};

export default ItemsContainer;
