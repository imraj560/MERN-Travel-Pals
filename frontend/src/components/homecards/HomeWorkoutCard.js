
import Card from 'react-bootstrap/Card'
import { Col } from 'react-bootstrap'
import ListGroup from 'react-bootstrap/ListGroup';

const HomeWorkoutCard = ({props})=>{

    const {title, reps, load, image} = props

  

    return (

            <Col md={4} className='p-1' style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
            <Card key={props._id} style={{ width: '100%' }}>
            <Card.Img style={{height:'320px'}} variant="top" src={process.env.PUBLIC_URL+"/images/"+props.image} />
            <Card.Body>
            <Card.Title>{props.title}</Card.Title>
            <ListGroup className="list-group-flush">
                <ListGroup.Item>Reps: {props.reps}</ListGroup.Item>
                <ListGroup.Item>Weight: {props.load} kg</ListGroup.Item>
                <ListGroup.Item>Date: {props.createdAt}</ListGroup.Item>
            </ListGroup>
            </Card.Body>
            </Card>
            </Col>
           


    )
}

export default HomeWorkoutCard;