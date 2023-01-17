import { createSlice, current } from "@reduxjs/toolkit";
import { addDataToLocalStorage, getDeepclone } from "../../util";

const initailWallData = [
  {
    id: 1,
    section_title: "What Went Well",
    cards_data: [],
  },
  {
    id: 2,
    section_title: "What can be improved",
    cards_data: [],
  },
  {
    id: 3,
    section_title: "Start doing",
    cards_data: [],
  },
  {
    id: 4,
    section_title: "Action items",
    cards_data: [],
  },
];

const card = createSlice({
  initialState: {
    wallData: JSON.parse(localStorage.getItem("wallData"))
      ? JSON.parse(localStorage.getItem("wallData"))
      : initailWallData,
  },
  name: "cardSlice",
  reducers: {
    addCard: (state, action) => {
      const wallDataCurrent2 = getDeepclone(current(state));
      const { index, id, userId } = action.payload;
      const card_data = {
        id,
        card_title: "",
        score: 0,
        userId,
      };
      wallDataCurrent2.wallData[index].cards_data.push({
        ...card_data,
      });
      addDataToLocalStorage(wallDataCurrent2.wallData);
      return {
        ...state,
        wallData: wallDataCurrent2.wallData,
      };
    },
    addCardValueToCard: (state, action) => {
      const { cardValue, cardIndex, cardFamily } = action.payload;
      const wallDataCurrent2 = getDeepclone(current(state));
      wallDataCurrent2.wallData[cardFamily].cards_data[cardIndex].card_title =
        cardValue;
      addDataToLocalStorage(wallDataCurrent2.wallData);
      return {
        ...state,
        wallData: wallDataCurrent2.wallData,
      };
    },
    upVoteCard: (state, action) => {
      const wallDataCurrent2 = getDeepclone(current(state));
      const { score, cardIndex, cardFamily } = action.payload;
      wallDataCurrent2.wallData[cardFamily].cards_data[cardIndex].score = score;
      addDataToLocalStorage(wallDataCurrent2.wallData);
      return {
        ...state,
        wallData: wallDataCurrent2.wallData,
      };
    },
    deleteCard: (state, action) => {
      const wallDataCurrent2 = getDeepclone(current(state));
      const { id, cardFamily } = action.payload;
      const removedList = wallDataCurrent2.wallData[
        cardFamily
      ].cards_data.filter((f) => f.id != id);
      wallDataCurrent2.wallData[cardFamily].cards_data = [...removedList];
      return {
        ...state,
        wallData: wallDataCurrent2.wallData,
      };
    },
  },
});

export const CardReducer = card.reducer;
export const { addCard, addCardValueToCard, deleteCard, upVoteCard } =
  card.actions;
