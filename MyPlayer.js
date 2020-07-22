class MyPlayer
{

    constructor(Name)
    {
        this.Name = Name
        this.Position = Vector2.new(200,200)

        this.Health = 0

        this.Stats = {

        }

        this.RoundStats = {
            Kills: 0
        }

        database.ref("PlayerHealths/" + this.Name).on("value", (data) =>
        {
            this.Health = data.val()
        })

        ThingsToUpdate.push(this)
    }

    Update()
    {   
        if (this.Health == 0)
        {
            console.log("I AM A ZOMBIE")
        }

        database.ref('CurrentPlayers').update({
            [this.Name]: {
                Position: {
                    x: this.Position.x,
                    y: this.Position.y
                }
            }
        });
    }

    ClearInfo()
    {
        if (this.Name != null || this.Name != undefined)
        {
          database.ref("CurrentPlayerNames").update({
            [this.Name]: null
          })
      
          database.ref("CurrentPlayers").update({
            [this.Name]: null
          })
      
          database.ref("PlayerHealths").update({
            [this.Name]: null
          })
        }
      
        for (var i = 0; i <= Zombie.ZombieCount; i++)
        {
          var ref = this.Name + "Zombie" + i
      
          database.ref("Zombies").update({
            [ref]: null
          })
      
          database.ref("ZombieNames").update({
            [ref]: null
          })
      
        }
    }

}