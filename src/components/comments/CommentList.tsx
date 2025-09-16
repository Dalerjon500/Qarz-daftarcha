import { FaIdCard, FaRegEnvelope, FaUser } from "react-icons/fa";
import useComments from "../../hooks/useComments";

function CommentList() {
    const { comments } = useComments();

  return (
    <div className="row">
        <div className="col-lg-12 col-xl-12">
            {comments.length === 0 ? (
            <div className="text-center py-5">
                <div className="bg-primary bg-opacity-10 d-inline-block p-4 rounded-circle mb-3">
                <FaUser className="text-primary" size={32} />
                </div>
                <h4 className="text-muted mb-2">No comments yet</h4>
                <p className="text-muted">Be the first to share your thoughts!</p>
            </div>
            ) : (
            <div className="mt-3">
                {comments.map(comment => (
                <div 
                    key={comment.id}
                    className="card mb-4 border-0 shadow-sm"
                    style={{
                    borderRadius: '12px',
                    transition: 'transform 0.2s ease',
                    }}
                >
                    <div className="card-body p-4">
                        <div className="d-flex align-items-start gap-3">
                            <div className="position-relative">

                            <div className="bg-primary bg-opacity-10 p-3 rounded-circle">
                                <FaUser className="text-primary" size={18} />
                            </div>
                                {comment.postId}
                            </div>
                            
                            <div className="flex-grow-1">
                            <div className="d-flex justify-content-between align-items-start mb-1">
                                <div>
                                <h3 className="h6 card-title text-primary mb-0">
                                    {comment.name || `User ${comment.id}`}
                                </h3>
                                <div className="d-flex align-items-center gap-2 mt-1">
                                    <span className="badge bg-light text-muted small d-flex align-items-center">
                                    <FaRegEnvelope className="me-1" size={10} />
                                    {comment.email}
                                    </span>
                                    <span className="badge bg-light text-muted small d-flex align-items-center">
                                    <FaIdCard className="me-1" size={10} />
                                    ID: {comment.id}
                                    </span>
                                </div>
                                </div>
                            </div>
                            
                            <p className="card-text text-dark mb-3">
                                {comment.body}
                            </p>
                            
                            </div>
                        </div>
                    </div>
                </div>
                ))}
            </div>
            )}
        </div>
    </div>
  )
}

export default CommentList