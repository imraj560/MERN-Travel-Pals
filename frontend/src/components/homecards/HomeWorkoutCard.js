
import Card from 'react-bootstrap/Card'
import { Col } from 'react-bootstrap'
import ListGroup from 'react-bootstrap/ListGroup';
import { format } from 'date-fns';

const HomeWorkoutCard = ({props})=>{

    const {title, reps, load, image} = props

  

    return (

            <Col md={3} className='p-1' style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
            <Card key={props._id} style={{ width: '100%' }}>
            <Card.Img style={{height:'320px'}} variant="top" src={"https://mern-exercise-tracker-production.up.railway.app/api/workout/download/"+props.image} />
            {/* <Card.Img style={{height:'320px'}} variant="top" src={"http://localhost:4000/api/workout/download/"+props.image} /> */}
            <Card.Body>
            <Card.Title>{props.title}</Card.Title>
            <ListGroup className="list-group-flush">
                <ListGroup.Item>Day: {format(props.wdate, 'MMM dd, yyyy')}</ListGroup.Item>
                <ListGroup.Item>Time: {props.wtime}</ListGroup.Item>
                <ListGroup.Item>Type: {props.wtype}</ListGroup.Item>
                
            </ListGroup>
            </Card.Body>
            </Card>
            </Col>
           


    )
}

export default HomeWorkoutCard;