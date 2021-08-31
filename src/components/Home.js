import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      cryptoData: [],
      id: '',
      img: '',
      price: '',
      description: '',
    }
  }

  componentDidMount = () => {
    const config = {
      method: 'get',
      baseURL: 'https://enterance-exam-401.herokuapp.com/',
      url: '/cryptoData'
    }
    axios(config).then(res => {
      this.setState({
        cryptoData: res.data,
      })
    })
  }


  render() {
    return (
      <>
        <h1>Crypto List</h1>
        <Container>
          <Row>
            {this.state.cryptoData.length > 0 && this.state.cryptoData.map(el =>
              <Col key={el.id}>
                <Card calssName="m-auto" style={{ width: '18rem' }}>
                  <Card.Img variant="top" src={el.image_url} />
                  <Card.Body>
                    <Card.Title>{el.title} ${el.toUSD}</Card.Title>
                    <Card.Text>
                      {el.description}
                    </Card.Text>
                    <Button variant="primary"
                      onClick={() => this.props.addToWatchList(el)}>Add To watch list</Button>
                  </Card.Body>
                </Card>
              </Col>
            )}
          </Row>
        </Container>
      </>
    )
  }
}

export default Home;
