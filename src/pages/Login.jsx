import { Container } from "../components/Container";
import { LoginForm } from "../components/LoginForm/LoginForm";
import { Logo } from "../utils/icons";

const Login = () => {
  return (
    <Container>
      <div
        className="pt-[88px] 
      mobile375:pt-[56px] 
      mobile480:w-[423px] mobile480:mr-auto mobile480:ml-auto  mobile480:p-[40px]
       mobile480:absolute  mobile480:top-[50%] mobile480:left-[50%] mobile480:translate-x-[-50%]  
       mobile480:translate-y-[-50%] mobile480:m-h-[468px]
       mobile480:border-[1px] mobile480:border-borderDefault mobile480:rounded-large" 
      >
        <Logo className="w-[96px] h-[96px] mr-auto ml-auto mb-[56px] 
        mobile375:mb-[86px] mobile480:mb-[56px]" />

        <LoginForm />

      </div>
    </Container>
  );
};
export default Login;


