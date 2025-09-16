import type { Album } from "../../types/types";
import { useState } from "react";
import useAlbums from "../../hooks/useAlbums";
import { useNavigate } from "react-router-dom";


function AlbumList() {
    const [inpAlbum, setInpAlbum] = useState("")
    const {albumsQuery, createAlbum, removeAlbum } = useAlbums();
    const navigate = useNavigate();

    if (albumsQuery.isLoading) return <div>Loading...</div>;
    if (albumsQuery.isError) return <div>Error</div>;
    
  return (
    <div className="min-w-full p-4">
      <div className="mb-6 p-4 ">
        <div className="text-center border-b pb-3 flex justify-between items-center">
          <h1 className="text-xl">Albums</h1>
        <div className="flex gap-2">
          <input 
            onChange={(e) => setInpAlbum(e.target.value)}
            value={inpAlbum}
            type="text" 
            placeholder="Add album..."
            className="border rounded-full px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400" 
          />
          <button 
            onClick={() => createAlbum.mutate({userId: 1, title: inpAlbum })}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Add Album</button>
        </div>
        </div>
      </div>

      <div>
        <div>
            {albumsQuery.data.map((album : Album) => (
                <div onClick={() => navigate(`/albums/${album.id}/photos`)} key={album.id} className="flex justify-between items-center border rounded-full px-3 py-2 gap-2 shadow-sm mb-2 hover:bg-green-100 cursor-pointer ">
                    <span className="text-gray-500">{album.id}</span>
                    <span className="text-gray-500">{album.title}</span>
                    <button 
                      onClick={(e) => { e.stopPropagation(); removeAlbum.mutate(album.id) }}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete
                    </button>
                </div>
            ))
            }
        </div>
      </div>
    </div>
  )
}

export default AlbumList