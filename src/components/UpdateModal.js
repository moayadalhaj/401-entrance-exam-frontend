import React, { Component } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import axios from 'axios';

class UpdateModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      price: this.props.price,
      description: this.props.description
    }
  }

  getName = (e) => {
    this.setState({
      name: e.target.value,
    })
  }

  getPrice = (e) => {
    this.setState({
      Price: e.target.value,
    })
  }
  getDescription = (e) => {
    this.setState({
      description: e.target.value,
    })
  }

  UpdateCryptoData = (e) => {
    const data = {
      name: this.state.name,
      img: this.state.img,
      price: this.state.price,
      description: this.state.description,
    }
    const config = {
      method: 'put',
      baseURL: 'https://enterance-exam-401.herokuapp.com/',
      url: `/favCrypto/${this.state.cryptoId}`,
      data: data
    }
    axios(config).then(res => {
      console.log(res.data);
      this.setState({
        AddedData: res.data,
      })
    })
  }

  render() {
    return (
      <div>
        <Modal show={this.props.show} onHide={this.handleClose}>
          <Form onSubmit={(e) => { this.UpdateCryptoData(e) }}>
            <Modal.Dialog>
              <Modal.Header closeButton>
                <Modal.Title>Modal title</Modal.Title>
              </Modal.Header>

              <Modal.Body>

                <Form.Group className="mb-3" controlId="name">
                  <Form.Label>Crypto Name</Form.Label>
                  <Form.Control
                    onChange={(e) => this.getName(e)}
                    type="text" value={this.state.name} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="price">
                  <Form.Label>Price in USD</Form.Label>
                  <Form.Control onChange={(e) => this.getPrice(e)}
                    type="email" value={this.state.price} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control onChange={(e) => this.getDescription(e)}
                    as="textarea" rows={3} value={this.state.description} />
                </Form.Group>

              </Modal.Body>

              <Modal.Footer>
                <Button type="submit" variant="secondary">Update</Button>
                <Button onClick={this.handleClose} variant="primary">Close</Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Form>
        </Modal>
      </div>
    )
  }
}

export default UpdateModal
