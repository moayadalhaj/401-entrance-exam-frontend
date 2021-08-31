import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';
import UpdateModal from './UpdateModal';

class FavCrypto extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      favCryptoData: [],
      show: false,
      name: '',
      img: '',
      price: '',
      cryptoId: '',
      description: '',
    }
  }

  componentDidMount = () => {
    const config = {
      method: 'get',
      baseURL: 'https://enterance-exam-401.herokuapp.com/',
      url: '/favCrypto'
    }
    axios(config).then(res => {
      this.setState({
        favCryptoData: res.data,
      })
    })
  }

  deleteFavCrypto = (cryptoId) => {

    const config = {
      method: 'delete',
      baseURL: 'https://enterance-exam-401.herokuapp.com/',
      url: `/favCrypto/${cryptoId}`
    }
    axios(config).then(res => {
      console.log(res.data);
      this.setState({
        favCryptoData: res.data,
      })
    })
  }

  showUpdateModal = (el) => {
    this.setState({
      name: el.name,
      img: el.img,
      price: el.price,
      cryptoId: el.id,
      description: el.description,
      show: true,
    })
  }

  handleClose = (value) => {
    this.setState({
      show: value,
    })
  }
  render() {
    return (
      <>
        <h1>Fav Crypto List</h1>
        {
          <UpdateModal show={this.state.show}
            name={this.state.name}
            img={this.state.img}
            price={this.state.price}
            description={this.state.description}
            handleClose={() => this.handleClose(false)}
          />
        }
        <Container>
          <Row>
            {this.state.favCryptoData.length > 0 && this.state.favCryptoData.map(el =>
              <Col key={el.id}>
                <Card calssName="m-auto" style={{ width: '18rem' }}>
                  <Card.Img variant="top" src={el.img} />
                  <Card.Body>
                    <Card.Title>{el.name} ${el.price}</Card.Title>
                    <Card.Text>
                      {el.description}
                    </Card.Text>
                    <Button onClick={() => this.showUpdateModal(el)}
                      className="mx-2" variant="primary">
                      Update
                    </Button>
                    <Button
                      onClick={() => this.deleteFavCrypto(el.id)}
                      variant="danger">
                      Delete
                    </Button>
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

export default FavCrypto;
