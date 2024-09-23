import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Link, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'


function Cuisine() {
    const[cuisine, setCuisine]= useState([]);
    let params= useParams();

    const getCuisine= async(name)=>{
        const data = await fetch(
            `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${name}`);
        const recipes=await data.json();
        setCuisine(recipes.results);
    }

    useEffect(()=>{
        getCuisine(params.type)
        
    },[params.type]);

  return (
    <Grid animate={{opacity:1}}
        initial={{opacity:0}}
        exit={{opacity: 0}}
        transition={{duration:0.5, ease: "easeInOut",}}>
        {cuisine.map((item)=>{
            return(
                <Card key={item.id}>
                    <Link to={"/recipes/"+item.id}>
                    <img src={item.image} alt="" />
                    <h4>{item.title}</h4>
                    </Link>
                    
                </Card>
            )
        })}
    </Grid>
  )
}

const Grid=styled(motion.div)`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
    grid-gap: 3rem;

`;

const Card= styled.div`
    img{
    width:100%
    border-radius: 2rem;
    }
    a{
    text_decoration: none
    }
    h4{
    text_align: center;
    padding: 1 rem;
    }    
`;

export default Cuisine