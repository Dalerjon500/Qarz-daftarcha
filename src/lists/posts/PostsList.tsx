import { useState } from "react";
import usePosts from "../../hooks/usePosts";
import { BiLike } from 'react-icons/bi';
import AddPostModal from "./AddPostModal";
import { FaEdit, FaTrash, FaPlus, FaFilter } from "react-icons/fa";
import type { Post } from "../../types/types";
import DeletePostModal from "./DeletePostModal";
import useUsers from "../../hooks/useUsers";
import UserSelect from "./UserSelect";
import InfiniteScroll from "react-infinite-scroll-component";
import { GoComment } from "react-icons/go";
import { useNavigate } from "react-router-dom";

function PostsList() {
  const { posts, createPost, updatePost, deletePost, setSelectedUser, selectedUser, loadMore, hasMore } = usePosts();
  const { users } = useUsers();
  const [isOpen, setOpen] = useState(false)
  const [editPost, setEditPost] = useState<Post | null>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deletePostId, setDeletePostId] = useState<number | null>(null);
  const [showFilter, setShowFilter] = useState(false);
  const navigate = useNavigate();

  const getRandomColor = () => {
    const colors = [
      'linear-gradient(135deg, #43cea2, #185a9d)',
      'linear-gradient(135deg, #ff4e50, #f9d423)',
      'linear-gradient(135deg, #654ea3, #eaafc8)',
      'linear-gradient(135deg, #3a7bd5, #00d2ff)',
      'linear-gradient(135deg, #ff5f6d, #ffc371)',
      'linear-gradient(135deg, #8e2de2, #4a00e0)',
      'linear-gradient(135deg, #3494E6, #EC6EAD)',
      'linear-gradient(135deg, #2b5876, #4e4376)',
      'linear-gradient(135deg, #396afc, #2948ff)'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="min-w-full p-4">

      <div className="mb-6 p-4 ">
        <div className="text-center border-b pb-3">
          <h1 className="text-xl">Posts List</h1>
        </div>
      </div>

      <div className="mb-6">
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-2xl p-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
              <button
                onClick={() => setShowFilter(!showFilter)}
                className="flex items-center gap-2 border border-blue-500 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900 px-4 py-2 rounded-xl transition-all duration-200"
              >
                <FaFilter /> Filter
              </button>

              {showFilter && (
                <div className="animate-fadeIn">
                  <UserSelect
                    users={users}
                    selectedUser={selectedUser}
                    setSelectedUser={setSelectedUser}
                  />
                </div>
              )}
            </div>
            <button
              onClick={() => {
                setOpen(true);
                setEditPost(null);
              }}
              className="flex items-center gap-2 px-6 py-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-500 text-white font-medium shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              <FaPlus /> Create Post
            </button>
          </div>
        </div>
      </div>
      <div className="w-full">
        <InfiniteScroll
          dataLength={posts.length}
          next={loadMore}
          hasMore={hasMore}
          loader={
            <div className="flex justify-center my-6">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          }
          endMessage={
            <div className="text-center text-gray-500 p-4">
              All posts loaded ✅
            </div>
          }
        >
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col h-full"
              >
                <div
                  className="relative rounded-t-2xl"
                  style={{
                    background: getRandomColor(),
                    height: "160px",
                  }}
                >
                  <div className="absolute top-3 left-3 bg-black/60 text-white text-xs px-3 py-1 rounded-full">
                    Post #{post.id}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-white/70 text-gray-700 text-xs px-3 py-1 rounded-full">
                    User: {post.userId}
                  </div>
                </div>

                <div className="p-4 flex flex-col flex-grow">
                  <h5 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1">
                    {post.title}
                  </h5>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mt-2 line-clamp-3">
                    {post.body.substring(0, 100)}...
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto pt-4">
                    <small className="text-gray-500 text-xs">
                      Posted by User {post.userId}
                    </small>
                    <div className="flex items-center gap-2">
                      <GoComment className="text-blue-600 cursor-pointer hover:text-blue-800 transition-all duration-200 hover:scale-110" size={20} 
                      onClick={() => navigate(`/posts/${post.id}/comments`)}/>
                      <button
                        onClick={() => {
                          setOpen(true);
                          setEditPost(post);
                        }}
                        className="flex items-center gap-1 text-blue-600 border border-blue-600 hover:bg-blue-600 hover:text-white text-xs px-3 py-1 rounded-full transition-all duration-200"
                      >
                        <FaEdit className="text-xs" /> Edit
                      </button>
                      <button
                        onClick={() => {
                          setOpenDeleteModal(true);
                          setDeletePostId(post.id);
                        }}
                        className="flex items-center gap-1 text-red-600 border border-red-600 hover:bg-red-600 hover:text-white text-xs px-3 py-1 rounded-full transition-all duration-200"
                      >
                        <FaTrash className="text-xs" /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </InfiniteScroll>
      </div>
      
      {posts.length === 0 && (
        <div className="row text-center mt-5">
          <div className="col">
            <div className="empty-state p-5">
              <BiLike className="empty-icon display-1 text-muted opacity-25" />
              <h5 className="mt-3 text-muted">No posts found.</h5>
              <p className="text-muted">Try changing your filters or create a new post.</p>
            </div>
          </div>
        </div>
      )}
      
      <AddPostModal 
        isOpen={isOpen} 
        setOpen={setOpen} 
        createPost={createPost} 
        updatePost={updatePost} 
        editPost={editPost}
      />

      <DeletePostModal
        deleteOpenModal={openDeleteModal}
        setDeleteOpenModal={setOpenDeleteModal}
        deletePostId={deletePostId}
        setDeletePostId={setDeletePostId}
        deletePost={deletePost}
      />
    </div>
  );
}

export default PostsList;