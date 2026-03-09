import { Request, Response, Router } from 'express';
import { getDb } from '../db';
import { v4 as uuidv4 } from 'uuid';
import authenticatedUser, { AuthRequest } from '../middleware/authenticateUser';


const postcardRoutes = Router();

// Create a new image
postcardRoutes.post('/', authenticatedUser, async (req: AuthRequest, res: Response): Promise<any> => {
    const { finalImageUri, originalImageUri, overlayText, textPosition, textFont, textFontSize, chosenColor, svgData } = req.body;
  
    if (!finalImageUri) {
      return res.status(400).json({ message: 'finalImageUri is required' });
    }

    const userId = req.user?.id;
    
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: User ID is required" });
    }
    
    console.log('Received body:', req.body);
  
    const newId = uuidv4();
    try {
      const db = getDb();
      await db.run(
        `INSERT INTO images (id, finalImageUri, originalImageUri, overlayText, textPositionX, textPositionY, textFont, textFontSize, chosenColor, svgData, userId) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)`, 
        [
          newId,
          finalImageUri,
          originalImageUri,
          overlayText,
          textPosition.x, 
          textPosition.y,
          textFont,
          textFontSize,
          chosenColor,
          JSON.stringify(svgData),
          userId
        ]);
      res.status(201).json({ 
        message: 'Image added successfully', 
        id: newId, 
        finalImageUri,
        originalImageUri,
        overlayText,
        textPosition,
        textFont,
        textFontSize,
        chosenColor,
        svgData,
        userId
    });
    } catch (error) {
      console.error("Error inserting image:", error);
      res.status(500).json({ message: 'Error inserting image', error });
    }
  });

// Get all images
postcardRoutes.get('/', authenticatedUser, async (req: AuthRequest, res: Response): Promise<any> => {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: User ID is required" });
    }

    try {
      const db = getDb();
      const images = await db.all('SELECT * FROM images WHERE userId=?',[userId]);
      console.log('Received fetch get:', images);

      if (!images || images.length === 0) {
        console.warn("⚠️ No images found in the database.");
      }

      images.forEach(image => {
        try {
          image.textPosition = { x: image.textPositionX, y: image.textPositionY }; // Rebuild textPosition object
          image.svgData = JSON.parse(image.svgData);  // Ensure svgData is parsed as JSON
        } catch (e) {
          console.error("Error parsing JSON for image data:", e);
        }
      });

      res.json(images);
    } catch (error) {
      console.error("Database fetch error:", error);
      res.status(500).json({ message: 'Error fetching images', error });
    }
  });

// Get image
postcardRoutes.get('/:id', authenticatedUser, async (req: AuthRequest, res: Response): Promise<any> => {
  const { id } = req.params;
  const userId = req.user?.id;
  if(!userId){
    return res.status(401).json({message: 'Unauthorized: User ID is required'})
  }

  try {
    const db = getDb();
    const image = await db.get('SELECT * FROM images WHERE id = ? and userId=?', [id, userId]);
    
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }
    image.textPosition = { x: image.textPositionX, y: image.textPositionY };
    image.svgData = JSON.parse(image.svgData);

    res.json(image);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching image', error });
  }

})


// Update image
postcardRoutes.put('/:id', authenticatedUser, async (req: AuthRequest, res: Response): Promise<any> => {
  const { id } = req.params;
  const userId = req.user?.id;
  if(!userId){
    return res.status(401).json({message: 'Unauthorized: User ID is required'})
  }

  const { finalImageUri, originalImageUri, overlayText, textPosition, textFont, textFontSize, chosenColor, svgData } = req.body;
  
  if (!finalImageUri) {
    return res.status(400).json({ message: 'finalImageUri is required' });
  }

  try{
    const db = getDb();
    const statement = await db.prepare(
      `UPDATE images 
      SET finalImageUri = ?, originalImageUri = ?, overlayText = ?, textPositionX = ?, textPositionY = ?, textFont = ?, textFontSize = ?, chosenColor = ?, svgData = ?
      WHERE id = ? AND userId=?`);
    const result = await statement.run( 
      finalImageUri,
      originalImageUri,
      overlayText,
      textPosition.x, 
      textPosition.y,
      textFont,
      textFontSize,
      chosenColor,
      JSON.stringify(svgData),
      id,
      userId
    );

    if (result.changes === 0) {
      return res.status(404).json({ message: "Image not found" });
    }
    console.log('Received ID:', id);
    console.log('Received data:', { finalImageUri, originalImageUri, overlayText, textPosition, textFont, textFontSize, chosenColor, svgData });

    res.json({message: 'Image updated successfully', 
      id,
      finalImageUri,
      originalImageUri,
      overlayText,
      textPosition,
      textFont,
      textFontSize,
      chosenColor,
      svgData,
    })
  }catch(error){
    console.error("Error updating image:", error);
    res.status(500).json({ message: "Server error", error });
  }
})




postcardRoutes.delete('/:id', authenticatedUser, async (req: AuthRequest, res: Response): Promise<any> => {
    const { id } = req.params;
    const userId = req.user?.id;
    if(!userId){
      return res.status(401).json({message: 'Unauthorized: User ID is required'})
    }

    try {
      const db = getDb();
      const result = await db.run('DELETE FROM images WHERE id = ? AND userId=?', [id, userId]);
      
      if (result.changes === 0) {
        return res.status(404).json({ message: 'Image not found' });
      }
  
      res.json({ message: 'Image deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting image', error });
    }
});

  
export default postcardRoutes;