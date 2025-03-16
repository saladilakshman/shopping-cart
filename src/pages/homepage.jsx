import { useEffect, useState } from "react";
import "../App.css";
import { fetchContent } from "../store/slice";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart, lowPrice, highPrice } from "../store/slice";
import { Star, ChevronsLeftRight } from "lucide-react";

export const IndianRupee = (price) => {
  try {
    let newPrice = Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumSignificantDigits: price.toString().length,
    });
    return newPrice.format(price);
  } catch (err) {
    console.log(err.message);
  }
};

const Homepage = () => {
  const dispatch = useDispatch();
  const { loading, error, data, cartItems } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    dispatch(fetchContent());
  }, [dispatch]);

  useEffect(() => {
    window.localStorage.setItem("cart", JSON.stringify(data));
    window.localStorage.setItem("saved", JSON.stringify(cartItems));
  }, [data, cartItems]);

  const [isSorted, setIsSorted] = useState(true);

  useEffect(() => {
    if (isSorted) {
      dispatch(lowPrice());
    } else {
      dispatch(highPrice());
    }
  }, [dispatch, isSorted]);

  return (
    <>
      {loading ? (
        <p className="text-center text-xl text-green-400">Loading...</p>
      ) : error ? (
        <p>Error occurs</p>
      ) : (
        <>
          <div className="flex justify-between items-center py-8" role="none">
            <h3 className="text-lg max-sm:text-sm font-[verdana] ">
              Total Products: {data?.length}
            </h3>
            <div
              className="flex gep-1 justify-center items-center cursor-default "
              role="button"
              onClick={() => {
                setIsSorted((prev) => !prev);
              }}
            >
              <ChevronsLeftRight strokeWidth={1.8} />
              <p className="select-none">
                {isSorted ? "Low to High" : "High to Low"}
              </p>
            </div>
          </div>
          <div className="item-layout">
            {data?.map(
              ({ id, image, description, title, price, rating: { rate } }) => {
                return (
                  <div
                    key={id}
                    className="shadow-sm bg-white rounded-lg border-1 border-gray-800 p-1 "
                  >
                    <img src={image} alt="" className="item-image" />
                    <h3 className="text-center truncate text-stone-600 font-[helvetica] py-5 max-sm:py-2">
                      {title}
                    </h3>

                    <div className="flex justify-between items-center px-2 *:max-sm:text-sm">
                      <p className="font-[helvetica] tabular-nums text-lg text-gray-600">
                        {IndianRupee(price) || price}
                      </p>
                      <p className="flex justify-center items-center gap-0.5 text-lg font-[helvetica] text-gray-600">
                        <span>{rate}</span>
                        <Star className="size-4 text-amber-500" />
                      </p>
                    </div>
                    <p className="item-description">{description}</p>
                    <button
                      className="cart-button"
                      onClick={() => {
                        cartItems.find((item) => item.id === id)
                          ? dispatch(removeFromCart(id))
                          : dispatch(addToCart(id));
                      }}
                    >
                      {cartItems.some((item) => item.id === id)
                        ? "Remove from cart"
                        : "Add to cart"}
                    </button>
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

export default Homepage;
