class MyPlayer
{
    constructor(index)
    {
        this.Name = null
        this.Index = index
        this.Model = PlayerModel
        this.Position = {}
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

      /*  MyPlayerRef.on("value", function(data)
        {
            console.log(data.val())

            this.Position = {
                x: data.val().Position.x,
                y: data.val().Position.y,
            }
        })
    } */

    }

    UpdateInfo()
    {   
        database.ref("Players/" + "Player" +  this.Index).update({
            Position: {
                x: this.Position.x,
                y: this.Position.y
            }
        });
    }
}