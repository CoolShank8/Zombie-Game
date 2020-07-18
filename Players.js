// this class is supposed to be like all the players

class PlayerService
{
    constructor()
    {
        this.PlayerModels = {}
        this.PlayerInfos = {}

        ThingsToUpdate.push(this)
          
        database.ref("CurrentPlayers").on("value", (data) =>
        {
            console.log("cool")

            if (data.val() != null && data != undefined)
            {
                var Keys = Object.keys(data.val())


                for (var i = 0; i < Keys.length; i++)
                {
                    console.log(this)

                    console.log(this.PlayerInfos)
                  
                    this.PlayerInfos[Keys[i]] = data.val()[Keys[i]]
                }
            }
        })

        database.ref("CurrentPlayerNames").on("value", (data) =>
        {
          console.log("ref")
      
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
                  console.log("kjjakskj")
                  break
                }
      
              }
      
              if (NewPlayerUserName)
              {
                var NewPlayerModel = Part.new({
                  Position: Vector2.new(200,200),
                  Shape: "Circle",
                  Color: "yellow"
                })
      
                console.log(NewPlayerModel)
      
                this.PlayerModels[NewPlayerUserName] = NewPlayerModel
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
      }
    }

}