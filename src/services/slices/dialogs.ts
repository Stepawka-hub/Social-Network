import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getDialogsAsync,
  getMessagesAsync,
  sendMessageAsync,
  startDialogAsync,
} from "@thunks/dialogs";
import { TDialog, TMessage } from "@types";
import { TDialogsState } from "./types";

const initialState: TDialogsState = {
  dialogs: [],
  messages: [],
  loading: {
    isGettingDialogs: false,
    isStartingDialog: false,
    isGettingMessages: false,
    isSendingMessage: false,
  },
};

const dialogsSlice = createSlice({
  name: "dialogs",
  initialState,
  reducers: {
    setMessages: (state, { payload }: PayloadAction<TMessage[]>) => {
      state.messages = payload;
    }
  },
  selectors: {
    getDialogs: (state) => state.dialogs,
    getMessages: (state) => state.messages,
    getIsLoadingMessages: (state) => state.loading.isGettingMessages,
    getIsLoadingDialogs: (state) => state.loading.isGettingDialogs,
    getIsSendingMessage: (state) => state.loading.isSendingMessage,
    getIsStartingDialog: (state) => state.loading.isStartingDialog,
  },
  extraReducers(builder) {
    builder
      .addCase(getDialogsAsync.pending, (state) => {
        state.loading.isGettingDialogs = true;
      })
      .addCase(
        getDialogsAsync.fulfilled,
        (state, { payload }: PayloadAction<TDialog[]>) => {
          state.dialogs = payload;
          state.loading.isGettingDialogs = false;
        }
      )
      .addCase(getDialogsAsync.rejected, (state) => {
        state.loading.isGettingDialogs = false;
      })

      .addCase(getMessagesAsync.pending, (state) => {
        state.loading.isGettingMessages = true;
      })
      .addCase(
        getMessagesAsync.fulfilled,
        (state, { payload }: PayloadAction<TMessage[]>) => {
          state.messages = payload;
          state.loading.isGettingMessages = false;
        }
      )
      .addCase(getMessagesAsync.rejected, (state) => {
        state.loading.isGettingMessages = false;
      })

      .addCase(sendMessageAsync.pending, (state) => {
        state.loading.isSendingMessage = true;
      })
      .addCase(
        sendMessageAsync.fulfilled,
        (state, { payload }: PayloadAction<TMessage>) => {
          state.messages.push(payload);
          state.loading.isSendingMessage = false;
        }
      )
      .addCase(sendMessageAsync.rejected, (state) => {
        state.loading.isSendingMessage = false;
      })

      .addCase(startDialogAsync.pending, (state) => {
        state.loading.isStartingDialog = true;
      })
      .addCase(startDialogAsync.fulfilled, (state) => {
        state.loading.isStartingDialog = false;
      })
      .addCase(startDialogAsync.rejected, (state) => {
        state.loading.isStartingDialog = false;
      });
  },
});

export const reducer = dialogsSlice.reducer;
export const {
  getMessages,
  getDialogs,
  getIsLoadingDialogs,
  getIsLoadingMessages,
  getIsStartingDialog,
  getIsSendingMessage,
} = dialogsSlice.selectors;
export const { setMessages } = dialogsSlice.actions;
