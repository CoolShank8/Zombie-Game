class MyPlayer
{

    constructor(Name)
    {
        this.Name = Name
        this.Model = PlayerModel
        this.Position = {}
        this.PlayerRef = null
    }

    UpdateInfo()
    {   
        database.ref('CurrentPlayers').update({
            [this.Name]: {
                Position: {
                    x: this.Model.Position.x,
                    y: this.Model.Position.y
                }
            }
        });
    }


}