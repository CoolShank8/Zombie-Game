class MyPlayer
{

    constructor(Name)
    {
        this.Name = Name
        this.Position = Vector2.new(200,200)

        this.Health = 0

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

}