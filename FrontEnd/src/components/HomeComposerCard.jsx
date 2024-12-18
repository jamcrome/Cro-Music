import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/esm/Button';
import { useNavigate } from 'react-router-dom';

function HomeComposerCard({ ind }) {

  const navigate = useNavigate();

  return (
    <Card className="p-2 bg-neutral-300" style={{ width: '12rem' }}>
      <Card.Img src={ind.portrait}/>
      <Card.Body>
        <Card.Title className='text-center'>{ind.complete_name}</Card.Title>
        <Button onClick={()=>navigate(`composer-details/${ind.id}`)}>More Info</Button>
      </Card.Body>
    </Card>
  );
};

export default HomeComposerCard;