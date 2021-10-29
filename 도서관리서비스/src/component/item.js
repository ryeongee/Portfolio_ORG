import React from "react";
const Item = (props) => {
  return (
    <li>
      <div>
        <a href={props.url}>
          {props.thumbnail ? (
            <img src={props.thumbnail} alt={require("../no-picture.jpg")} />
          ) : (
            <img
              src={require("../no-picture.jpg")}
              alt={require("../no-picture.jpg")}
            />
          )}
        </a>
        <div>
          <h3>{props.title}</h3>
          <p>{props.authors}</p>
          <p>{props.publisher}</p>
          <p>{props.datetime.substring(0, 10)}</p>
          <p>
            {props.status === "정상판매" && props.sale_price >= 0 ? (
              <b>
                <span>\ </span>
                {props.sale_price
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </b>
            ) : (
              <b>
                
                <span>\ </span>
                {props.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </b>
            )}
          </p>
        </div>
      </div>
    </li>
  );
};

export default Item;
