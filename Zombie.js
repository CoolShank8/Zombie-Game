class Zombie {
   constructor()
   {
       this.Model = Part.new({
           Position: Vector2.new(200,200),
           Shape: "Circle",
           Color: "Green"
       })
       this.TargetModel = null

       ThingsToUpdate.push(this)
   }

   Update()
   {
        if (CurrentLeader == UserName)
        {
            console.log("I AM THE LEADER")
            for (var plr in Players.PlayerModels)
            {
                var Distance = Vector2.Sub(this.Model.Position, Players.PlayerModels[plr].Position).Magnitude()
                var Unit = Vector2.Sub(this.Model.Position, Players.PlayerModels[plr].Position).Unit()
    
                console.log(Unit)

                this.Model.Velocity = Vector2.new(-Unit.x * 3, -Unit.y * 3)
            }
        }
   }
}
