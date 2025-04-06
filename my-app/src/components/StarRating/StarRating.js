import React, { useState } from "react";
import { IoMdStar } from "react-icons/io";

const StarRating = () => {
    const [rating, setRating] = useState(null);

    return (
        <div className="star-rating-wrapper">
            {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;

                return (
                    <label>
                        {/* <input
                            type="radio"
                            name="rating"
                            value={ratingValue}
                            onClick={() => setRating(ratingValue)}
                        /> */}
                        <IoMdStar
                            key={i}
                            className="star"
                            size={25}
                            onClick={() => setRating(ratingValue)}
                            color={ratingValue <= (rating) ? "#a6cdc4" : "#e4e5e9"}
                        />
                    </label>
                );
            })}
            <p>Rating is: {rating}</p>
        </div>
    );
};

export default StarRating;
