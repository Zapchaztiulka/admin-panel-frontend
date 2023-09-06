import { Container } from '../components/Container';
import { LoginForm } from '../components/LoginForm/LoginForm';
import { Logo } from '../utils/icons';

const Login = () => {
  return (
    <Container>
      <div className='pt-[56px]'>
       
          <Logo className='w-[96px] h-[96px] mr-auto ml-auto mb-[86px] '/>
    
        <LoginForm />
        </div>
    </Container>
  )
};
export default Login;
