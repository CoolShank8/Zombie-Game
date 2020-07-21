class Zombie {
    static ZombieCount = 0

   constructor()
   {
       Zombie.ZombieCount++

       this.ref = UserName + "Zombie" + Zombie.ZombieCount

       this.Position = Vector2.new(200,200)

       this.TargetModel = null
       this.TargetName = null
       
       this.Destoryed = false

       database.ref("Zombies").update({
           [this.ref]: {
               Position: {
                   x: this.Position.x,
                   y:this.Position.y
               }
           }
       })

       database.ref("Zombies").on("value", (data) =>
       {
        if (this.Destoryed == false)
        {
            var Zombies = data.val()

            if (Zombies == null)
            {
                ThingsToUpdate.splice(this.UpdatePosition, 0)
                this.Destoryed = true
            }

            else
            {
                if (Zombies[this.ref] == undefined || Zombies[this.ref]  == null)
                {
                    console.log(" DESTROYED")
                    ThingsToUpdate.splice(this.UpdatePosition, 0)
                    this.Destoryed = true
                }
            }
           
        }
       })

       database.ref("ZombieNames").update({
           [this.ref]: this.ref
       })

       ThingsToUpdate.push(this)

       this.UpdatePosition = ThingsToUpdate.length - 1
   }

   Update()
   {
       if (this.Destoryed == false)
       {
            if (this.TargetModel != null)
            {
                var Unit = Vector2.Sub(this.Position, this.TargetModel.Position).Unit()
                var Distance = Vector2.Sub(this.Position, this.TargetModel.Position).Magnitude()

            

                this.Position = Vector2.Add(this.Position, Vector2.new(-Unit.x * 3, -Unit.y * 3) )

                if (Distance < this.TargetModel.Size.x/2)
                {
                    
                    database.ref("PlayerHealths/" + this.TargetName).update({
                        Health: 0
                    })
                }

                database.ref("Zombies").update({
                    [this.ref]: {
                        Position: {
                            x: this.Position.x,
                            y: this.Position.y
                        }
                    }
                })
            }

            else
            {
                for (var plr in Players.PlayerModels)
                {
                   // var Distance = Vector2.Sub(this.Model.Position, Players.PlayerModels[plr].Position).Magnitude()
    
                    this.TargetModel = Players.PlayerModels[plr]
                    this.TargetName = plr
                }
            }
       }            
   }
}
