import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/esm/Button';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react"
import { useOutletContext, useLoaderData } from "react-router-dom";
import { addFavComposer, removeFavComposer } from '../ComposerUtils';

function ComposerCard({ id, portrait, name, fav }) {

  const navigate = useNavigate();

  const [isFavorite, setIsFavorite] = useState(fav)

  const handleNavigate = () => {
    if (window.location === '/') {
      navigate(`composer-details/${id}`)
    } else {
      navigate(`../composer-details/${id}`)
    }
  }

  const updateFavComposerList = async (composerId, action) => {
    if (action === 'add') {
      await addFavComposer(composerId); // Add the composer to the backend
      setIsFavorite(true)
    } else if (action === 'remove') {
      await removeFavComposer(composerId); // Remove the composer from the backend
      console.log("here")
      setIsFavorite(false)
    }
  };

  const handleAddFavorite = () => {
    updateFavComposerList(id, 'add'); // Pass 'add' to update the favorites list
  };

  const handleRemoveFavorite = () => {
    updateFavComposerList(id, 'remove'); // Pass 'remove' to update the favorites list
  };

  return (
    <Card className="m-3" style={{ width: '18rem' }}>
      <Card.Body className='bg-slate-800 flex flex-column rounded-md'>
        <img src={portrait} className='m-3 rounded-lg'/>
        <Card.Title className='text-white p-3'>{name}</Card.Title>
        {isFavorite ? (
          <Button onClick={handleRemoveFavorite}>Remove from Favorites</Button>
        ) : (
          <Button onClick={handleAddFavorite}>Add to Favorite</Button>
        )}
        <Button onClick={handleNavigate}>More Info</Button>
      </Card.Body>
    </Card>
  );
};

export default ComposerCard;