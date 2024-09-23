import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

function Searched() {
    const[searchedRecipes, setSearchedRecies] = useState([]);
    let params= useParams();
;
    const getSearched= async(name)=>{
        const data = await fetch(
            `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${name}`);
        const recipes=await data.json();
        setSearchedRecies(recipes.results);
    }
    useEffect(()=>{
        getSearched(params.search);
    },[params.search]);
  return (
    <Grid>
        {searchedRecipes.map((item)=>{
            return(
                <Card key={item.id}>
                    <Link to={"/recipes/"+item.id}>
                    <img src={item.image} alt="" />
                    <h4>{item.title}</h4>
                    </Link>
                    
                </Card>
            );
        })}
    </Grid>
  )
}
const Grid=styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
    grid-gap: 3rem;

`;

const Card= styled.div`
    img{
    width:100%;
    border-radius: 2rem;
    }
    a{
    text_decoration: none;
    }
    h4{
    text_align: center;
    padding: 1 rem;
    }    
`;

export default Searched