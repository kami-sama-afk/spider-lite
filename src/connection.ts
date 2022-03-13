import makeWaSocket, {
  DisconnectReason,
  useSingleFileAuthState,
} from "@adiwajshing/baileys";

import { Boom } from "@hapi/boom";

export const connect = async () => {
  const { state, saveState } = useSingleFileAuthState(
    "./cache/auth_info_multi.json"
  );

  const socket = makeWaSocket({
    printQRInTerminal: true,
    auth: state,
  });

  socket.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === "close") {
      const shouldReconnect =
        (lastDisconnect?.error as Boom)?.output?.statusCode !==
        DisconnectReason.loggedOut;

      if (shouldReconnect) {
        await connect();
      }
    }
  });

  socket.ev.on("creds.update", saveState);

  return socket;
};
