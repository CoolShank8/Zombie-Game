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