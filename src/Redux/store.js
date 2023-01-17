import { configureStore } from "@reduxjs/toolkit";

import { CardReducer } from "./Slice/card";
import { userReducer } from "./Slice/user";

export default configureStore({
  reducer: {
    card: CardReducer,
    user: userReducer,
  },
});
