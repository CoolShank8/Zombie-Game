// this class is supposed to be like all the players

class PlayerService
{
    constructor()
    {
        this.PlayerModels = {}
        this.PlayerInfos = {}
        this.PlayerHealths = {}

        ThingsToUpdate.push(this)

        database.ref("PlayerHealths").on("value", (data) =>
        {
          if (data.val() != undefined && data.val() != null)
          {
            this.PlayerHealths = data.val()
          }
        })
          
        database.ref("CurrentPlayers").on("value", (data) =>
        {

            if (data.val() != null && data.val() != undefined)
            {
                var Keys = Object.keys(data.val())


                for (var i = 0; i < Keys.length; i++)
                { 
                    this.PlayerInfos[Keys[i]] = data.val()[Keys[i]]
                }
            }

            else 
            {
              this.PlayerInfos = {}
            }
        })

        database.ref("CurrentPlayerNames").on("value", (data) =>
        {      
      
            // so we need to check the new player added this is only for models
      
            if (data.val() != null && data != undefined)
            {
      
              
              var ModelKeys = Object.keys(this.PlayerModels)
              var Keys = Object.keys(data.val())
      
              var NewPlayerUserName = null
      
              for (var i = 0; i < Keys.length; i ++)
              {
                if (this.PlayerModels[Keys[i]] == undefined)
                {
                  NewPlayerUserName = Keys[i]
                  var NewPlayerModel = Part.new({
                    Position: Vector2.new(200,200),
                    Shape: "Circle",
                    Color: "yellow"
                  })
        
        
                  this.PlayerModels[NewPlayerUserName] = NewPlayerModel
                }
      
              }

              for (var PlayerName in this.PlayerModels)
              {
                if (data.val()[PlayerName] == undefined)
                {
                  delete this.PlayerModels[PlayerName]
                  console.log("deleted dead player")
                }
              }

            }
        })
    }

    Update()
    {
      for (var plr in this.PlayerModels)
      {
        var plrInfo = this.PlayerInfos[plr]
    
        this.PlayerModels[plr].Position.x = plrInfo.Position.x
        this.PlayerModels[plr].Position.y = plrInfo.Position.y

        push()
        fill("white")
        text("Health: " + this.PlayerHealths[plr].Health, plrInfo.Position.x, plrInfo.Position.y - 75)
        pop()
      }
    }

}