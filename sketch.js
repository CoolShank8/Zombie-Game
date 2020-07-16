var database

var Players = {}

var ThisPlayer

var ThingsToUpdate = []

var PlayerModel

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


  var index = GetHighestDatabasePlayerIndex()

  //ThisPlayer = new MyPlayer(index)


  //console.log(ThisPlayer.Index)

  //ThisPlayer.UpdateInfoOnDatabaseUpdate()

  var LoginForm = new Form()

  var EnterUsername = LoginForm.CreateInput("Username", Vector2.new(displayWidth/2, 300))
  var EnterPassword = LoginForm.CreateInput("Password",  Vector2.new(displayWidth/2, 400))

  var LoginButton = LoginForm.CreateButton("Login", Vector2.new(displayWidth/2, 500), async function()
  {
    console.log(UserName)

    if (UserName == null)
    {

        var Status = await LoginHandler(EnterPassword.value(), EnterUsername.value())
        LoginButton.html(Status)


        if (Status == "Sucessfully logging in" )
        {
          setTimeout(StartGame, 2000)

          setTimeout(function()
          {
            LoginForm.Hide()
            ReigsterForm.Hide()
            RegisterAccountButton.hide()
            ShowLoginFormButton.hide()
          },2000)
        }
    }
  })

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  var ReigsterForm = new Form()

  var RegisterFormEnterUsername = ReigsterForm.CreateInput("Username", Vector2.new(displayWidth/2, 300))
  var RegisterFormEnterPassword = ReigsterForm.CreateInput("Password",  Vector2.new(displayWidth/2, 400))

  var RegisterButton = ReigsterForm.CreateButton("Create Account", Vector2.new(displayWidth/2, 500), async function()
  {
    console.log("register button pressed")

    var Status = await RegisterHandler(RegisterFormEnterUsername.value(), RegisterFormEnterPassword.value())

    RegisterButton.html(Status)
  })

  ReigsterForm.Hide()
  LoginForm.Hide()

  var ShowLoginFormButton = createButton("Login into account")
  ShowLoginFormButton.position(displayWidth/2 - 100, 200)

  ShowLoginFormButton.mousePressed(function()
  {
    LoginForm.Show()
    ShowLoginFormButton.hide()
  })
  

  
  var RegisterAccountButton = createButton("Make an account")

  RegisterAccountButton.position(displayWidth/2 + 100, 200)

  RegisterAccountButton.mousePressed(function()
  {
    ReigsterForm.Show()
    ShowLoginFormButton.hide()
  })
}

function draw() {
  background(255,255,255);  

  //console.log(MyPlayerDetails)

  if (GameState == "Play")
  {
      if (keyIsDown(40))
      {
        PlayerModel.Position = Vector2.Add(PlayerModel.Position, Vector2.new(0,5))
        
        //ThisPlayer.UpdateInfo()
      }

      if (keyIsDown(38))
      {
        PlayerModel.Position = Vector2.Add(PlayerModel.Position, Vector2.new(0,-5))

        //ThisPlayer.UpdateInfo()
      }

      if (keyIsDown(37)) // left arrow
      {
        PlayerModel.Position = Vector2.Add(PlayerModel.Position, Vector2.new(-5,0))

        //ThisPlayer.UpdateInfo()
      }

      if (keyIsDown(39)) // right arrow
      {
        PlayerModel.Position = Vector2.Add(PlayerModel.Position, Vector2.new(5,0))
        
        //ThisPlayer.UpdateInfo()
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
}