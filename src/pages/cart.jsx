import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  increment,
  decrement,
  removeFromCart,
  cartTotal,
} from "../store/slice";
import { Star, Trash, Plus, Minus } from "lucide-react";
import { IndianRupee } from "./homepage";
import "../App.css";
const Cart = () => {
  const { cartItems, total } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(cartTotal());
  }, [dispatch, cartItems]);

  return (
    <>
      {cartItems.length === 0 ? (
        <div className="flex justify-center items-center h-[80svh]">
          <h4 className="text-lg font-[verdana] text-zinc-700 italic animate-pulse">
            Your cart is Empty!
          </h4>
        </div>
      ) : (
        <>
          <p className="text-xl font-[helvetica] tabular-nums antialiased italic indent-1 text-zinc-600 pt-8">
            Total bag:{IndianRupee(total)}
          </p>
          <div className="item-layout">
            {cartItems?.map(
              ({
                id,
                count,
                image,
                title,
                description,
                price,
                rating: { rate },
              }) => {
                return (
                  <div
                    key={id}
                    className="shadow-sm bg-white rounded-lg border-1 border-gray-300 p-1 "
                  >
                    <img src={image} alt="" className="item-image" />
                    <h3 className=" text-center truncate text-stone-600 font-[helvetica] py-2">
                      {title}
                    </h3>
                    <div className="flex justify-between items-center px-2 py-2">
                      <p className="font-[helvetica] tabular-nums text-lg text-gray-600">
                        {IndianRupee(price) || price}
                      </p>
                      <p className="flex justify-center items-center gap-0.5 text-lg font-[helvetica] text-gray-600">
                        <span>{rate}</span>
                        <Star className="size-4 text-amber-500" />
                      </p>
                    </div>
                    <p className="item-description">{description}</p>
                    <div className="flex justify-between items-center py-3 px-3">
                      <button onClick={() => dispatch(removeFromCart(id))}>
                        <Trash
                          className="font-normal text-red-400 hover:text-red-500"
                          strokeWidth={1.5}
                        />
                      </button>
                      <div className="flex justify-center items-center gap-3">
                        <button
                          className=" bg-gray-300 text-black rounded-full p-1"
                          onClick={() => {
                            dispatch(increment(id));
                          }}
                        >
                          <Plus size={20} strokeWidth={1.8} />
                        </button>
                        <p className="font-[verdana] text-lg">{count}</p>
                        <button
                          className="decrement-button"
                          onClick={() => {
                            dispatch(decrement(id));
                          }}
                          disabled={count === 1 ? true : false}
                        >
                          <Minus size={20} strokeWidth={1.8} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Cart;
