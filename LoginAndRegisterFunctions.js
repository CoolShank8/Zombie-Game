function StartForm()
{
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

          setTimeout(async function(){
            await StartLobby()

            var BuyGunsForm = new Form()

            var StartGameButton = createButton("Start game!")

            StartGameButton.position(displayWidth/4 * 3, 500)


            StartGameButton.mousePressed(function()
            {
                StartGameButton.hide()

                setTimeout(function()
                {
                  BuyGunsForm.Hide()
                  StartGame()
                }, 2000)

            })


            LoginForm.Hide()
            ReigsterForm.Hide()
            RegisterAccountButton.hide()
            ShowLoginFormButton.hide()

            var XPosition = 300

            for (var gun in Guns)
            {
              DisplayGun(BuyGunsForm, gun, XPosition)
              XPosition += 200
            }

            DisplayGun(BuyGunsForm, "Piston", 300)
            DisplayGun(BuyGunsForm, "Ak47", 500)
          }, 2000)
  

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












async function LoginHandler(PasswordTyped, UserNameTyped)
{
  var ref = await database.ref("RegisteredAccounts/" + UserNameTyped).once("value")


  if (ref.exists() == false)
  {
    return "Account does not exist!"
  }

  if (PasswordTyped == ref.val())
  {
    UserName = UserNameTyped
    return "Sucessfully logging in"
  }

  else
  {
    return "Wrong Password"
  }
}

async function RegisterHandler(UserName, Password)
{
  var ref = await database.ref("RegisteredAccounts/" + UserName).once("value")

  if (ref.exists())
  {
    return "Account already Registered"
  }

  else{
    database.ref("RegisteredAccounts").update({
      [UserName] : Password
    })

    return "Sucessfully created account"
  }

}
