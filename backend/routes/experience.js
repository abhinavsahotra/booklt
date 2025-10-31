const express = require("express")
const experienceRouter = express.Router();
const Experience = require("../models/Experiences")
const zod = require("zod")
const { verifyUser } = require("../middleware/authMiddleware");

const experiencePost = zod.object({
    title: zod.string(),
	location: zod.string(),
	description: zod.string(),
	imageUrl: zod.string(),
    price: zod.number()
})

experienceRouter.post('/experiences', verifyUser, async ( req,res ) => {
    const body = experiencePost.safeParse(req.body);

   if (!body.success) {
  return res.status(400).json({ 
    message: "Content must be in string and Price in no" 
     });
  }
    const { title, location, description, imageUrl, price } = req.body;

    try{
        const exp = await Experience.create({
           title: title,
           location: location,
           description: description,
           imageUrl: imageUrl,
           price: price,
   });
      res.json({
        message : "expreience added"
     })
   }catch(e){
    res.status(404).json({
        message: "Not suucessful"
    })
    console.log(e)
   }
})

experienceRouter.get("/experiences", async(req, res)=> {
    const experiences = await Experience.find({})
    res.json({
    experiences: experiences.map(exp => ({
       _id: exp.id,
       title: exp.title,
       location: exp.location,
       description: exp.description,
       imageUrl: exp.imageUrl,
       price: exp.price
  }))
    })
})

experienceRouter.get('/experience/:id', verifyUser, async(req,res)=>{
     const { id } = req.params;

    try {
        const post = await Experience.findById(id);

        if (!post) {
            return res.status(404).json({ error: 'Experience not found' });
        }

        res.status(200).json(post);
    } catch (error) {
        console.error('Error fetching for post:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})





module.exports = {
    experienceRouter: experienceRouter
}