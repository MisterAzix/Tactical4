import Models from "../types/models";
import Player from "../Player";
import RoomManager from "../RoomManager";

class PlayerController {
   private player: Player;

   constructor(player: Player) {
      this.player = player;
   }

   joinRoom (params: Models.JoinRoomParams, callback: (res: Models.SocketResponse) => void) {
      this.player.setName(params.settings.name);
      if (!params.code) {
         return callback({
            success: false,
            message: 'code undefined'
         })
      }
      const code = params.code;
      const room = RoomManager.getRoom(code);
      if(room) {
         room.join(this.player)
         return callback({
               success: true
         })
      } else {
         return callback({
            success: false,
            message: "La partie n'existe pas !"
         })
      }
   }

   createRoom (params: Models.CreateRoomParams, callback: (res: Models.CreateRoomResponse) => void) {
      this.player.setName(params.settings.name);
      const room = RoomManager.createRoom(this.player);
      callback({
         success: true,
         code: room.code
      });
   }

   getRoomInfo (params: null, callback: (res: Models.GetRoomInfoResponse) => void) {
      const room = this.player.getRoom()
      if (room) {
         callback({
            success: true,
            playersName: room.getPlayersName()
         })
      } else {
         callback({
            success: false,
            message: "Vous n'avez pas rejoint de partie",
            playersName: []
         })
      }
   }

   getGameState (params: null, callback: (res: Models.GetGameStateResponse) => void) {
      const room = this.player.getRoom()
      if (room) {
         callback({
            success: true,
            state: room.getStateInfo()
         })
      }else {
         callback({
            success: false,
            message: "Vous n'avez pas rejoint de partie",
         })
      }
   }

   startRoom (params: null, callback: (res: Models.SocketResponse) => void) {
      const room = this.player.getRoom()
      if (room) {
         if (room.start()) {
            callback({success: true})
         } else {
            callback({success: false})
         }
      } else {
         callback({
            success: false,
            message: "Vous n'avez pas rejoint de partie"
         })
      }
   }

   play (params: Models.PlayParams, callback: (res: Models.SocketResponse) => void) {
      const room = this.player.getRoom()
      if (room) {
         try {
            const hasPlay = room.grid.play(params.column, this.player);
            callback({ success: true})
         } catch (error) {
            callback({ success: false, message: error })
         }
      } else {
         callback({
            success: false,
            message: "Vous n'avez pas rejoint de partie"
         })
      }
   }
}

export default PlayerController;