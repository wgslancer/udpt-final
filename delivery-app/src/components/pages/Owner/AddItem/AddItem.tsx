import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { postCreateItem } from "../../../../api/items/items";

const AddItem = () => {
  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();

  const handleOnSubmit = (data: any) => {
    postCreateItem(data);
    navigate("/owner");
  };

  return (
    <div className="flex-center-center min-h-screen">
      <div className="bg-white rounded-lg p-20 flex flex-col justify-between">
        <div>
          <h1>Add Item</h1>
        </div>
        <br />
        <form
          onSubmit={handleSubmit(handleOnSubmit)}
          className="flex flex-col child:mb-4"
        >
          <input
            {...register("name")}
            type="text"
            placeholder="Name"
            className="input input-bordered input-info w-full max-w-xs"
          />
          <input
            {...register("...price")}
            type="text"
            placeholder="Price"
            className="input input-bordered input-info w-full max-w-xs"
          />
          <input
            {...register("amount")}
            type="text"
            placeholder="Amount"
            className="input input-bordered input-info w-full max-w-xs"
          />
          <button className="btn btn-info" type="submit">
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddItem;
