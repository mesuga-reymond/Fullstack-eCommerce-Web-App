import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap"
import Rating from "../components/Rating"
import axios from "axios"

// import products from "../products" we get rid of this because we are now getting products from the backend
const ProductScrren = ({match}) => {
    // const product = products.find(p => p._id === match.params.id) // this is we fetch from the frontend not backend
    const [product, setProduct] = useState({}) //we use {} bcasue product is an object

    useEffect(() => {
        const fetchProduct = async () => {
            const {data} = await axios.get(`/api/products/${match.params.id}`)

            setProduct(data)
        }
        fetchProduct()
    },[match])

    return (
        <>
            <Link className="btn btn-light my-3" to="/">Go back</Link>
            <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid></Image>
                </Col>
                <Col md={3}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Price: ${product.price}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Description: ${product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Price:
                                    </Col>
                                    <Col>
                                        <strong>${product.price}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Status:
                                    </Col>
                                    <Col>
                                        {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button 
                                className="btn-block" 
                                type="button" 
                                disabled={product.countInStock === 0}
                                >
                                Add To Cart
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default ProductScrren
