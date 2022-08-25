import {useEffect} from 'react';
import {useRouter} from 'next/router';
import {Link} from 'next/link';
import {useAuthUser} from '../lib/useFirebaseAuth';
import{Container, Row, Col, Button} from 'react-bootstrap';

const Dashboard = () => {
  const {authUser, loading, signOut} = useAuthUser();
  const router = useRouter();
  
  useEffect(() => {
    if(!authUser && !loading) {
      router.push('/');
    }
  } , [router, authUser, loading])

  return (
   
      <Container>
        <Row>
          <Col>
            <h1>Your Dashboard</h1>
            <p>
              <Link href="/">
                <a>Home</a>
              </Link>
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button variant="primary" onClick={signOut}>Sign Out</Button>

          </Col>
        </Row>
      </Container>
      
    
  )

}

export default Dashboard;