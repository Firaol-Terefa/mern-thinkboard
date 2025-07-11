
import {useState} from "react";
import { useParams, useNavigate , Link } from "react-router";
import {useEffect} from "react";
import Navbar from '../components/Navbar';
import  toast  from "react-hot-toast";
import api from "../lib/axios";
import { LoaderIcon , Trash2Icon , ArrowLeftIcon } from "lucide-react";




const NoteDetailPage = () => {
  const [note, setNote] = useState(false);
  const [loading,setLoading] = useState(true);
  const [saving,setSaving] = useState(false);

  const navigate = useNavigate();
  const {id} = useParams();

useEffect(() =>{
  const fetchNote = async () => {
    try {
      const res = await api.get(`/notes/${id}`);
      setNote(res.data);

    } catch(error){
      console.error("Error in fetching note", error);
      toast.error("Failed to fetch note");
    } finally {
      setLoading(false);
    }
  };
  fetchNote();
}, [id]);

const handleDelete = async () => {
  if(!window.confirm("Are you sure you want to delete this note?")) return;
  try {
    await api.delete(`/notes/${id}`)
    toast.success("Note deleted successfully");
    navigate("/")
  } catch (error) {
    console.error("Error in handleDelete note", error);
    toast.error("Failed deleting note");
  }
};

const handleSave = async () => {
  if(!note.title.trim() || !note.content.trim()){
    toast.error("Please add a title or content");
    return;
  }
  setSaving(true);
  try {
    await api.put(`/notes/${id}`, note);
    toast.success("Note updated successfully");
    navigate("/");
  } catch (error) {
    console.log("Error in Saving note", error);
    toast.error("Failed updating note");
  } finally {
    setSaving(false);
  }

}

if(loading){
   return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center">
      <LoaderIcon className="animate-spin size-10" />
    </div>
   );
};

        return (
          <div className="min-h-screen bg-base-200">
            <div className="container mx-auto px-4 py-8">
              <div className="max-w-2xl mx-auto">
               <div className="flex items-center justify-between mb-6">
                  <Link to="/" className="btn btn-ghost">
                    <ArrowLeftIcon className="h-5 w-5" />
                    Back to Notes
                  </Link>
                  <button onClick={handleDelete} className="btn btn-error btn-outline">
                    <Trash2Icon className="h-5 w-5" />
                    Delete Note
                  </button>
                </div>

                  <div className="card bg-base-100">
                    <div className="card-body">
                      <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text">Title</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Note title"
                            className="input input-bordered"
                            value={note.title}
                            onChange={(e) =>     setNote(prevNote => ({
                                    ...prevNote,          // Copy all existing fields
                                    title: e.target.value, // Update only title
                                  }))} 
                        />
                     </div>
                   {/* edit content */}
                    <div className="form-control mb-4">
                      <label  className="label">
                        <span className="label-text">Content</span>
                      </label>
                      <textarea
                          className="textarea textarea-bordered h-32"
                          placeholder="Write here your note content"
                          value={note.content}
                          onChange={(e) =>     setNote(prevNote => ({
                                  ...prevNote,          // Copy all existing fields
                                  content: e.target.value, // Update only content
                                }))} 
                      />
                    </div>


                    {/* tags or buttons */}
                    <div className="card-actions justify-end">
                      <button
                        className="btn btn-primary"
                        disabled={saving}  onClick={handleSave}>
                        {saving ? "Saving..." : "Save Changes"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          )
};

export default NoteDetailPage;
