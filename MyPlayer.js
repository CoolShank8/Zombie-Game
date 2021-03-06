class MyPlayer
{

    constructor(Name)
    {
        this.Name = Name
        this.Position = Vector2.new(200,200)

        this.Health = 0

        this.Gun = null

        this.OwnedGuns = {}

        this.CoinsEarned = 0

        this.Stats = {

        }

        this.RoundStats = {
            Kills: 0
        }

        this.Health = 100

        database.ref("PlayerHealths/" + this.Name).update({
          Health: 100
        })


        database.ref("PlayerHealths/" + this.Name).on("value", (data) =>
        {
          if (data.val() != undefined && data.val() != null)
          {
            this.Health = data.val().Health
          }
        })

        ThingsToUpdate.push(this)
    }

    Update()
    {   

        if (this.Health <= 0)
        {

          this.CoinsEarned = (ZombiesToSpawn + Math.round(ZombieSpeedCurrently)) * Math.Round(this.RoundStats.Kills/2)

          database.ref("PlayerStats/" + UserName).update({
            Coins: ThisPlayer.Stats.Coins + this.CoinsEarned
          })


          this.ClearInfo() // since after the game is over the Update() function is not called anymore

           GameState = "GameOver"
           console.log("GAME OVER")

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

        for (var i = 0; i <= Bullet.BulletCount; i++)
        {
          var ref = "Bullet" + UserName + i
      
          database.ref("Bullets").update({
            [ref]: null
          })
      
      
        }
      
    }

}