var database

var ThisPlayer

var ThingsToUpdate = []

var Players

var UserName = null

var GameState = "Form"

var CurrentWave

var CurrentLeader = null

window.onbeforeunload = function () {

  if (UserName != null || UserName != undefined)
  {
    database.ref("CurrentPlayerNames").update({
      [UserName]: null
    })

    database.ref("CurrentPlayers").update({
      [UserName]: null
    })
  }
};

function setup() {
  database = firebase.database()

  Players = new PlayerService()

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

    database.ref("Leader").on("value", (data) => {
      CurrentLeader = data.val()
    })

  database.ref("CurrentWave").on("value", function(data)
  {

    if (data.val() != undefined || data.val() != null)
    {
      CurrentWave = data.val()
    }

    else
    {
      database.ref("/").update({
        CurrentWave: 1
      })
    }
  })

  StartForm()
}

function draw() {
  background(255,255,255);  


  if (GameState == "Play")
  {

      if (CurrentLeader == UserName && frameCount%120 == 0)
      {
        new Zombie()
      }

      if (keyIsDown(40))
      {
        ThisPlayer.Position = Vector2.Add(ThisPlayer.Position, Vector2.new(0,5))
        
        console.log(ThisPlayer.Position)

        ThisPlayer.UpdateInfo()
      }

      if (keyIsDown(38))
      {
        ThisPlayer.Position = Vector2.Add(ThisPlayer.Position, Vector2.new(0,-5))

        ThisPlayer.UpdateInfo()
      }

      if (keyIsDown(37)) // left arrow
      {
        ThisPlayer.Position = Vector2.Add(ThisPlayer.Position, Vector2.new(-5,0))

        ThisPlayer.UpdateInfo()
      }

      if (keyIsDown(39)) // right arrow
      {
        ThisPlayer.Position = Vector2.Add(ThisPlayer.Position, Vector2.new(5,0))
        
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
  ThisPlayer = new MyPlayer(UserName)

  GameState = "Play"

  database.ref("CurrentPlayers").update({
    [UserName] : {
      Position: {x: ThisPlayer.Position.x, y: ThisPlayer.Position.y}
    }
  })

  database.ref("CurrentPlayerNames").update({
    [UserName]: UserName
  })

  database.ref("/").update({
    Leader: UserName
  })


}

function CalculatePath(Part1, Part2)
{
  var Distance = Vector2.Sub(Part1.Position, Part2.Position).Magnitude()

  var Direction = Vector2.Sub(Part1.Position, Part2.Position).Unit()

  
}
