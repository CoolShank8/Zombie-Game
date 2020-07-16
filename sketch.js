var database

var Players = {}

var ThisPlayer

var ThingsToUpdate = []

var PlayerModel

var AllPlayerModels = {}

var AllPlayersInfo = {}

var UserName = null

var GameState = "Form"

function setup() {
  database = firebase.database()

  createCanvas(displayWidth,700)

  Part.DefaultProperties = {
    Position: Vector2.new(displayWidth/2, 200),
    Size:  Vector2.new(50,50),
    Texture: undefined,
    TextureVisibility: 1,
    Color: "grey",
    Angle: 0,
    Anchored: true,
    Shape: "Rect",
    Velocity: Vector2.new(0,0),
    Density: 3
}

  database.ref("CurrentPlayerNames").on("value", function(data)
  {
    Players = data.val()
  })

  database.ref("CurrentPlayers").on("value", function(data)
  {
    AllPlayersInfo = data.val()
  })

  StartForm()
}

function draw() {
  background(255,255,255);  

  //console.log(MyPlayerDetails)

  console.log(AllPlayersInfo)

  if (GameState == "Play")
  {



      if (keyIsDown(40))
      {
        PlayerModel.Position = Vector2.Add(PlayerModel.Position, Vector2.new(0,5))
        
        ThisPlayer.UpdateInfo()
      }

      if (keyIsDown(38))
      {
        PlayerModel.Position = Vector2.Add(PlayerModel.Position, Vector2.new(0,-5))

        ThisPlayer.UpdateInfo()
      }

      if (keyIsDown(37)) // left arrow
      {
        PlayerModel.Position = Vector2.Add(PlayerModel.Position, Vector2.new(-5,0))

        ThisPlayer.UpdateInfo()
      }

      if (keyIsDown(39)) // right arrow
      {
        PlayerModel.Position = Vector2.Add(PlayerModel.Position, Vector2.new(5,0))
        
        ThisPlayer.UpdateInfo()
      }

  }


  Update()

}


function Update()
{
  for (var i = 0; i < ThingsToUpdate.length; i++)
  {
    ThingsToUpdate[i].Update()
  }
}

function UpdateValueInDatabase(NodeName, NewValue)
{
  database.ref('/').update({
    [NodeName]: NewValue
  });
}



function Collide(Circle1, Circle2)
{
    var DistanceX = Circle1.Position.x - Circle2.Position.x
    var DistanceY = Circle1.Position.y - Circle2.Position.y

    var RaduisSum = Circle1.Size.x/2 + Circle2.Size.x/2

    if (DistanceX * DistanceX + DistanceY * DistanceY < RaduisSum * RaduisSum)
    {
        return true
    }

    else{
        return false
    }
}

async function GetHighestDatabasePlayerIndex()
{
  var HighestIndex_Ref = await database.ref('CurrentHighestPlayerIndex').once("value")

  console.log(JSON.stringify(HighestIndex_Ref.val()))

  if (HighestIndex_Ref.exists())
  {
    return HighestIndex_Ref.val()
  }
}


function StartGame()
{
  PlayerModel = Part.new({
    Position: Vector2.new(displayWidth/2, 200),
    Shape: "Circle"
  })

  GameState = "Play"

  database.ref("CurrentPlayers").update({
    [UserName] : {
      Position: {x: 200, y:200}
    }
  })

  database.ref("CurrentPlayerNames").update({
    [UserName]: UserName
  })

  ThisPlayer = new MyPlayer(UserName)
}