class MyPlayer
{

    constructor(index)
    {
        this.Name = null
        this.Index = index
        this.Model = PlayerModel
        this.Position = {}
        this.PlayerRef = null
    }

    UpdateInfoOnDatabaseUpdate()
    {

        database.ref('Players').update({
            ["Player" + str(this.Index)]: {
                Name: "Cool",
                Position: {
                    x: 200,
                    y: 200
                }
            }
        });


    }

    UpdateInfo()
    {   
        database.ref('Players').update({
            ["Player" + str(this.Index)]: {
                Name: "Cool",
                Position: {
                    x: this.Model.Position.x,
                    y: this.Model.Position.y
                }
            }
        });
    }
}
