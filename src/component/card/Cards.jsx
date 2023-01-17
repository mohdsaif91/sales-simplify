import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCardValueToCard,
  deleteCard,
  upVoteCard,
} from "../../Redux/Slice/card";

import "./Cards.scss";

const Cards = ({ cardData, cardFamily, cardIndex }) => {
  const [edit, setEdit] = useState(false);

  const inputRef = useRef();

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);

  useEffect(() => {
    if (!cardData.card_title) {
      inputRef.current.focus();
    }
  }, [cardData]);

  return (
    <div className={`card card-${cardFamily}`}>
      {cardData.card_title === "" ? (
        <div className="form">
          <div className="input-container">
            <input
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  dispatch(
                    addCardValueToCard({
                      cardValue: e.target.value,
                      cardIndex: cardIndex,
                      cardFamily: cardFamily - 1,
                    })
                  );
                }
              }}
              ref={inputRef}
              className="input"
              placeholder="Card title"
            />
          </div>
        </div>
      ) : (
        <>
          <>
            <h3 className="card-title">
              {edit ? (
                <input
                  onKeyUp={(e) => {
                    if (e.key === "Enter") {
                      setEdit(false);
                      dispatch(
                        addCardValueToCard({
                          cardValue: e.target.value,
                          cardIndex: cardIndex,
                          cardFamily: cardFamily - 1,
                        })
                      );
                    }
                  }}
                  ref={inputRef}
                  className="input full-width"
                  placeholder="Card title"
                />
              ) : (
                cardData.card_title
              )}
            </h3>
            <p>{cardData.score}</p>
            <p>{cardData.card_color}</p>
          </>
          <div className="btn-container">
            <span
              className="c-p"
              onClick={() => {
                dispatch(
                  upVoteCard({
                    score: cardData.score + 1,
                    cardIndex: cardIndex,
                    cardFamily: cardFamily - 1,
                  })
                );
              }}
            >
              <img src={require("../../assests/icon/up-vote.png")} />
            </span>
            {userData.user && userData.user.id === cardData.userId && (
              <>
                <span className="c-p" onClick={() => setEdit(true)}>
                  <img src={require("../../assests/icon/edit.png")} />
                </span>
                <span
                  className="c-p"
                  onClick={() =>
                    dispatch(
                      deleteCard({
                        id: cardData.id,
                        cardFamily: cardFamily - 1,
                      })
                    )
                  }
                >
                  <img src={require("../../assests/icon/delete.png")} />
                </span>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Cards;
