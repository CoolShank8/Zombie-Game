class Zombie {
    static ZombieCount = 0

   constructor()
   {
       Zombie.ZombieCount++

       this.ref = UserName + "Zombie" + Zombie.ZombieCount

       this.Position = Vector2.new(200,200)

       this.TargetModel = null

       database.ref("Zombies").update({
           [this.ref]: {
               Position: {
                   x: this.Position.x,
                   y:this.Position.y
               }
           }
       })

       ThingsToUpdate.push(this)
   }

   Update()
   {
                if (this.TargetModel != null)
                {
                    var Unit = Vector2.Sub(this.Position, this.TargetModel.Position).Unit()

                    console.log(this.Position)

                    console.log(Unit)

                    this.Position = Vector2.Add(this.Position, Vector2.new(-Unit.x * 3, -Unit.y * 3) )

                    console.log(this.Position)

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
                    }
                }
   }
}
