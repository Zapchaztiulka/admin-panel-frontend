import { Container } from "../components/Container";
import { LoginForm } from "../components/LoginForm/LoginForm";
import { Logo } from "../utils/icons";

const Login = () => {
  return (
    <Container>
      <div
        className="pt-[56px] 
      desktop:w-[600px] desktop:pt-[100px] desktop:pb-[86px] desktop:pl-[128px] 
      desktop:pr-[128px] desktop:mt-[50px] desktop:mr-auto desktop:ml-auto
      desktop:border-[1px] desktop:border-border desktop:rounded-[24px] " 
      >
        <Logo className="w-[96px] h-[96px] mr-auto ml-auto mb-[86px] desktop:mb-[121px]" />

        <LoginForm />

      </div>
    </Container>
  );
};
export default Login;
