import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import React from "react";
import { getComposer } from "../ComposerUtils";
import Button from "react-bootstrap/esm/Button";

function ComposerDetails() {

  const [composer, setComposer] = useState(null)
  const { id } = useParams();
  console.log(id)
  console.log(composer)
  
  const fetchComposer = async () => {
    const composerData = await getComposer(id);
    setComposer(composerData)
  };
  
  useEffect(() => {
    fetchComposer();
  }, [id])

  if (!composer) {
    return <div>Loading...</div>;  // Show loading message while waiting for data
  }

  return (
    <>
      
      
      <h1>Composer Information</h1>
      <div>
        <div>
          <h1>{composer.composer.complete_name}</h1>
          <img src={composer.composer.portrait}/>
          <Button>Add to Favorites</Button>
          <div>
            <div>
              <li>{composer.works[0].title}</li>
            </div>
            <div>
              <li>{composer.works[1].title}</li>
            </div>
            <div>
              <li>{composer.works[2].title}</li>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ComposerDetails;