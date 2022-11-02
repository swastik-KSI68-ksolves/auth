import { useContext, useState } from "react";
import { Alert } from "react-native";
import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { userLogin } from "../components/util/auth";
import { AuthContext } from "../store/AuthContext";

function LoginScreen() {
  const Authctx = useContext(AuthContext);

  const [isAuthenticating, setisAuthenticating] = useState(false);
  let response;
  async function sendUserData({ email, password }) {
    setisAuthenticating(true);
    response = await userLogin(email, password);
    if (typeof response != "object") {
      Alert.alert(
        response,
        "Check your email and password, or try again later"
      );
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

  return <AuthContent isLogin onAuthenticate={sendUserData} />;
}

export default LoginScreen;
