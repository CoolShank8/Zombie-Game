class MyPlayer
{

    constructor(Name)
    {
        this.Name = Name
        this.Position = Vector2.new(0,0)
        this.PlayerRef = null
    }

    UpdateInfo()
    {   
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