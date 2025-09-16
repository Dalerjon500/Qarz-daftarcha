import PostsList from "./lists/posts/PostsList"
import UserList from "./lists/users/UserList";
import TodosList from "./lists/todos/TodosList";
import { NavLink, Route, Routes } from "react-router-dom";
import CommentList from "./lists/comments/CommentList";
import AlbumList from "./lists/albums/AlbumList";
import PhotosList from "./lists/albums/PhotosList";


function App() {

  return (
    <div className="container mx-auto p-4">
      <div className="flex gap-4">
        <NavLink to={'/users'} className={({ isActive }) => "header-link" + (isActive ? " active" : "")}>
          Users
        </NavLink>
        <NavLink to={'/posts'} className={({ isActive }) => "header-link" + (isActive ? " active" : "")} >
          Posts
        </NavLink>
        <NavLink to={'/todos'} className={({ isActive }) => "header-link" + (isActive ? " active" : "")}>
          Todos
        </NavLink>
        <NavLink to={'/albums'} className={({ isActive }) => "header-link" + (isActive ? " active" : "")}>
          Albums
        </NavLink>
      </div>

      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/posts" element={<PostsList />} />
        <Route path="/posts/:id/comments" element={<CommentList />} />
        <Route path="/todos" element={<TodosList />} />
        <Route path="/albums" element={<AlbumList />} />\
        <Route path="/albums/:id/photos" element={<PhotosList />} />

   
        <Route path="*" element={<div>404 page not found</div>} />
      </Routes>
    </div>
  )
}

export default App