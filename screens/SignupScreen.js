import { useContext, useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { userSignup } from "../components/util/auth";
import { AuthContext } from "../store/AuthContext";

function SignupScreen() {
  const Authctx = useContext(AuthContext);

  const [isAuthenticating, setisAuthenticating] = useState(false);
  let response;

  async function sendUserData({ email, password }) {
    setisAuthenticating(true);
    response = await userSignup(email, password);
    if (typeof response != "object") {
      Alert.alert(response, "Check your credentials, or try again later");
    } else {
      Authctx.Authenticate(response.idToken);
    }
    setTimeout(() => {
      setisAuthenticating(false);
    }, 2000);
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Creating new user" />;
  }

  return <AuthContent onAuthenticate={sendUserData} />;
}

export default SignupScreen;
