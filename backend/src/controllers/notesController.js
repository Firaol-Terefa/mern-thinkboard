import Note from "../models/Note.js";
export async function getAllNotes(_,res) {
    try {
        const notes = await Note.find().sort({ createdAt: -1 }); // Fetch all notes sorted by creation date in descending(newest first) order
        res.status(200).json(notes);
    } catch(error){
      console.error("Error in getAllNotes controller!", error);
      res.status(500).json({message:"Internal server error!"});
    };
};
// Function to get a note by its ID
// This function retrieves a specific note from the database using its ID
export async function getNoteById(req,res) {
    try {
        const findedNote = await Note.findById(req.params.id);
        // If the note is not found, return a 404 status code
        if(!findedNote) return res.status(404).json({message:"Note not found!"});
         res.status(200).json(findedNote);
    } catch(error) {
     console.error("Error in getNoteById controller!", error);
     res.status(500).json({message:"Internal server error!"});
    }
};
export  async function createNote(req,res){
    try {
     const {title,content} =req.body;
     const note = new Note({title,content});
     const savedNote = await note.save();
     res.status(201).json(savedNote);
    } catch(error){
        console.error("Error in createNote controller!", error);
        res.status(500).json({message:"Internal server error!"});
   }
};

export async function updateNote(req,res){
   try {
const {title,content} =req.body;
const updatedNote = await Note.findByIdAndUpdate(req.params.id, { title,content },
    {
        new:true,
    }
);
if(!updatedNote) return res.status(404).json({message:"Note not Found!"});
res.status(200).json({message:"Note Updated Successfully!"});
   } catch(error){
console.error("Error in Updating Note!", error);
res.status(500).json({message:"Internal server error!"});
   }
};

export async function deleteNote(req,res){
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
       if (!deletedNote) return res.status(404).json({message:"Note not Found!"});
       res.status(200).json({message:"Note Deleted Successfully!"});
    } catch(error) {
        console.error("Error in deleteNote Controller!", error);
        res.status(500).json({message:"Internal server error!"});
    };
};