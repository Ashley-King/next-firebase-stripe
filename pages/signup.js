import {useRouter} from 'next/router';
import {useAuthUser} from '../context/authUserContext';
import {useState} from 'react';
import {Container, Row, Col, Button, Form,  Alert} from 'react-bootstrap';

//create functional component for signup page
const Signup = () => {
  const [email, setEmail] = useState('');
  const [passwordOne, setPasswordOne] = useState('');
  const [passwordTwo, setPasswordTwo] = useState('');
  const router = useRouter();
  const[error, setError] = useState(null);

  const {signUp} = useAuthUser();

  const onSubmit =  (event) => {
    event.preventDefault();
    console.log(email, passwordOne, passwordTwo);
    setError(null);
    if(passwordOne !== passwordTwo) {
      setError('Passwords do not match');
      console.log("error: ", error)
      alert('Passwords do not match');
      return;
    }
    if(passwordOne === passwordTwo){
      const userOrError = signUp(email, passwordOne)
      console.log("userOrError: ", userOrError)
      // .then(authUser => {
      //   console.log("success: ", authUser);
      //   router.push('/dashboard');
      // })
      // .catch(error => {
      //   setError(error.message);
      //   console.log("error: ", error);
      // }
      // );
    }
  }

  return (
   <Container>
      <Row>
        <Col>
          <Form onSubmit={onSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formBasicPasswordOne">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={(e) => setPasswordOne(e.target.value)} />
              
            </Form.Group>
            <Form.Group controlId="formBasicPasswordTwo">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password"  placeholder="Password" onChange={(e) => setPasswordTwo(e.target.value)} />
              </Form.Group>
              <Form.Group>
                <Button variant="primary" type="submit">Sign Up</Button>
              </Form.Group>
          </Form>
        </Col>
      </Row>
   </Container>
  )
}

export default Signup;