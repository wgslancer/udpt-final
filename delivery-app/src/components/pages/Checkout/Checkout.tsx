import { useEffect, useMemo, useState } from "react";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { postCreateOrder } from "../../../api/orders/orders";
import { useAuthContext } from "../../../provider/AuthProvider/AuthProvider";
import ItemCart from "../../common/ItemCart";

type CheckoutForm = {
  "checkout-phone": string;
  "checkout-address": string;
  "checkout-method": string;
};
const Checkout = () => {
  const { isLogin } = useAuthContext();
  const { register, handleSubmit } = useForm<CheckoutForm>();
  const [items, setItems] = useState<Array<any>>([]);
  const navigate = useNavigate();
  const onSubmitValid: SubmitHandler<CheckoutForm> = async (data) => {
    try {
      const result = await postCreateOrder({
        address: data["checkout-address"],
        items,
        payment_method: data["checkout-method"],
        phone: data["checkout-phone"],
        totalPrice: calTotalPrice,
      });
      console.log(result);

      if (result.status === 200) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };
  const onSubmitInvalid: SubmitErrorHandler<CheckoutForm> = (error) => {
    console.log(error);
  };

  const getItemsFromLocalStorage = () => {
    const itemsFromCart = localStorage.getItem("cart");
    if (itemsFromCart) {
      setItems(JSON.parse(itemsFromCart));
    }
  };

  useEffect(() => {
    getItemsFromLocalStorage();
  }, []);

  const calTotalPrice = useMemo(() => {
    const sum = items.reduce(
      (prev, curr) => prev + Number(curr.price) * curr.amount,
      0
    );
    return sum;
  }, [items]);

  return (
    <div className="flex-center-center min-h-screen">
      <div className="bg-white rounded-lg p-20 flex justify-between">
        <div className="mr-8">
          {items.map(
            ({
              id,
              amount,
              name,
              price,
            }: {
              id: number;
              amount: number;
              name: string;
              price: string;
            }) => {
              return (
                <ItemCart
                  key={`item-checkout-cart-${id}`}
                  amount={amount}
                  name={name}
                  price={price}
                />
              );
            }
          )}
          <p className="mt-4">
            <span className="font-semibold">Total:</span> {calTotalPrice}$
          </p>
        </div>
        <div className="min-w-[300px] flex-center-center flex-col">
          <h2 className="font-semibold">Information</h2>
          <form
            onSubmit={handleSubmit(onSubmitValid, onSubmitInvalid)}
            className="flex-center-center flex-col"
            autoComplete="off"
          >
            <label className="label">
              <span className="label-text">Phone</span>
            </label>
            <input
              {...register("checkout-phone")}
              autoComplete="off"
              type="text"
              placeholder="Phone"
              className="input w-full max-w-xs input-info"
            />
            <label className="label">
              <span className="label-text">Address</span>
            </label>
            <input
              autoComplete="new-password"
              {...register("checkout-address")}
              type="text"
              placeholder="Address"
              className="input w-full max-w-xs input-info"
            />
            <select
              {...register("checkout-method")}
              className="select select-bordered w-full max-w-xs input-info my-4"
              defaultValue={"label"}
            >
              <option disabled value={"label"}>
                Payment method
              </option>
              <option value={"COD"}>COD</option>
              <option value={"Visa"}>Visa</option>
            </select>
            {isLogin ? (
              <button type="submit" className="btn">
                Order
              </button>
            ) : (
              <h3 className="text-warning">Please login to order</h3>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
