import {useEffect} from 'react';
import {useRouter} from 'next/router';
import {Link} from 'next/link';
import {useAuthUser} from '../lib/useFirebaseAuth';
import{Container, Row, Col} from 'react-bootstrap';

const Dashboard = () => {
  const {authUser, loading} = useAuthUser();
  const router = useRouter();
  
  useEffect(() => {
    if(!authUser && !loading) {
      router.push('/');
    }
  } , [authUser, loading])
  
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
      </Container>
      
    
  )

}

export default Dashboard;