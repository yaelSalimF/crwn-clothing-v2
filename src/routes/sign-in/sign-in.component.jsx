// import { useEffect } from "react";
// import { getRedirectResult } from "firebase/auth";

import Button from "../../components/button/button.component";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import {
  //   auth,
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  //   signInWithGoogleRedirect,
} from "../../utils/firebase.utils";

const SignIn = () => {
  //   useEffect(() => {
  //     const getRedirectRes = async () => {
  //       const response = await getRedirectResult(auth);
  //       if (response) {
  //         const userDocRef = await createUserDocumentFromAuth(response.user);
  //       }
  //     };
  //     getRedirectRes();
  //   }, []);

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };

  return (
    <div>
      <h1>Sign In Page</h1>
      <Button buttonType="google" onClick={logGoogleUser}>
        Sign In with Google Popup{" "}
      </Button>
      {/* <button onClick={signInWithGoogleRedirect}>
        Sign In with Google Redirect{" "}
      </button> */}
      <SignUpForm />
    </div>
  );
};

export default SignIn;
