import { FaEnvelope, FaLock, FaArrowRight, FaUtensils } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';
import { type FieldValues, useForm } from 'react-hook-form';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import type { User } from '../../types/types';
import { FirebaseError } from 'firebase/app';

const LoginForm = () => {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm();
  const navigate = useNavigate();

  const Login = async (data: FieldValues) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, data.email, data.password);
      localStorage.setItem("token", user.uid);
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()) {
        const currentUser = { id: user.uid, ...userDocSnap.data() } as User;
        // console.log("currentUser", currentUser);
        
        if (currentUser?.roles) {
          localStorage.setItem("role", currentUser.roles.join(","));
          navigate("/", { replace: true });
        } else {
          localStorage.removeItem("role");
        }
      } else {
        localStorage.removeItem("role");
        toast.warn("User role topilmadi.");
      }
    } catch (error: unknown) {

      if (error instanceof FirebaseError) {
        const code = error.code;

        switch (code) {
          case "auth/user-not-found":
            toast.error("Account topilmadi. Iltimos, ro'yxatdan o'ting!");
            break;
          case "auth/wrong-password":
          case "auth/invalid-credential":
            toast.error("Noto'g'ri email yoki parol. Qayta urinib ko'ring.");
            break;
          case "auth/invalid-email":
            toast.error("Email manzili noto'g'ri formatda.");
            break;
          case "auth/too-many-requests":
            toast.error("Juda ko'p urinish. Iltimos, birozdan keyin qayta urinib ko'ring.");
            break;
          default:
            toast.error("Kirishda hatolik yuz berdi. Iltimos, qayta urinib ko'ring.");
        }
      } else {
        toast.error("Noma'lum xatolik yuz berdi!");
        console.error("❌ Unknown error:", error);
      }
    }
  };

  return (
    <div className="login d-flex justify-content-center align-items-center min-vh-100" style={{ 
      backgroundColor: '#fef7f9',
      backgroundImage: 'linear-gradient(135deg, rgba(226, 26, 67, 0.03) 0%, rgba(255, 255, 255, 0.9) 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background decorative elements */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        left: '-10%',
        width: '30%',
        height: '50%',
        backgroundColor: 'rgba(226, 26, 67, 0.05)',
        borderRadius: '50%',
        filter: 'blur(40px)'
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '-10%',
        right: '-5%',
        width: '40%',
        height: '40%',
        backgroundColor: 'rgba(226, 26, 67, 0.05)',
        borderRadius: '50%',
        filter: 'blur(40px)'
      }}></div>
      
      <div className="login-form bg-white p-4 p-md-5 rounded-4 shadow" style={{ 
        width: '95%', 
        maxWidth: '450px',
        border: 'none',
        position: 'relative',
        overflow: 'hidden',
        zIndex: 1,
        boxShadow: '0 10px 30px rgba(226, 26, 67, 0.1) !important'
      }}>
        {/* Decorative elements */}
        <div style={{
          position: 'absolute',
          top: '-30px',
          right: '-30px',
          width: '120px',
          height: '120px',
          backgroundColor: 'rgba(226, 26, 67, 0.08)',
          borderRadius: '50%',
          zIndex: 0
        }}></div>
        
        <div className="text-center mb-4" style={{ position: 'relative', zIndex: 1 }}>
          <div className="mb-3" style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '70px',
            height: '70px',
            backgroundColor: 'rgba(226, 26, 67, 0.1)',
            borderRadius: '50%',
            marginBottom: '1rem'
          }}>
            <FaUtensils style={{ 
              fontSize: '2rem', 
              color: '#E21A43'
            }} />
          </div>
          <h1 className="fw-bold mb-2" style={{ 
            color: '#E21A43',
            fontSize: '2rem',
            background: 'linear-gradient(135deg, #E21A43 0%, #FF6B9D 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>Perfect Breakfast</h1>
          <p className="text-muted" style={{ fontSize: '1rem' }}>Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit(Login)} style={{ position: 'relative', zIndex: 1 }}>
          <div className="mb-4">
            <label htmlFor="email" className="form-label fw-semibold" style={{ color: '#333' }}>Email Address</label>
            <div className="input-group input-group-lg">
              <span className="input-group-text bg-white" style={{ 
                borderRight: 'none',
                borderColor: 'rgba(226, 26, 67, 0.3)',
                borderTopLeftRadius: '12px',
                borderBottomLeftRadius: '12px'
              }}>
                <FaEnvelope style={{ color: '#E21A43' }} />
              </span>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="your@email.com"
                {...register('email', { required: true })}
                style={{ 
                  borderLeft: 'none',
                  borderColor: 'rgba(226, 26, 67, 0.3)',
                  boxShadow: 'none',
                  borderTopRightRadius: '12px',
                  borderBottomRightRadius: '12px',
                  padding: '0.75rem 1rem',
                  fontSize: '1rem'
                }}
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="form-label fw-semibold" style={{ color: '#333' }}>Password</label>
            <div className="input-group input-group-lg">
              <span className="input-group-text bg-white" style={{ 
                borderRight: 'none',
                borderColor: 'rgba(226, 26, 67, 0.3)',
                borderTopLeftRadius: '12px',
                borderBottomLeftRadius: '12px'
              }}>
                <FaLock style={{ color: '#E21A43' }} />
              </span>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="••••••••"
                {...register('password', { required: true })}
                style={{ 
                  borderLeft: 'none',
                  borderColor: 'rgba(226, 26, 67, 0.3)',
                  boxShadow: 'none',
                  borderTopRightRadius: '12px',
                  borderBottomRightRadius: '12px',
                  padding: '0.75rem 1rem',
                  fontSize: '1rem'
                }}
              />
            </div>
            <div className="text-end mt-2">
              <NavLink 
                to="/forgot-password" 
                style={{ 
                  color: '#E21A43', 
                  fontSize: '0.9rem',
                  textDecoration: 'none',
                  fontWeight: '500',
                  transition: 'all 0.3s ease'
                }}
                className="hover-underline"
              >
                Forgot password?
              </NavLink>
            </div>
          </div>

          <button
            disabled={isSubmitting}
            type="submit"
            className="btn w-100 py-3 fw-bold d-flex align-items-center justify-content-center gap-2"
            style={{ 
              background: 'linear-gradient(135deg, #E21A43 0%, #FF6B9D 100%)',
              color: 'white',
              borderRadius: '12px',
              border: 'none',
              boxShadow: '0 4px 15px rgba(226, 26, 67, 0.3)',
              transition: 'all 0.4s ease',
              fontSize: '1.1rem',
              position: 'relative',
              overflow: 'hidden',
              zIndex: 1
            }}
          >
            {isSubmitting ? (
              <>
                <span>Signing in...</span>
                <div className="spinner"></div> 
              </>
            ) : (
              <>
                <span>Sign In</span>
                <FaArrowRight />
              </>
            )}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: '-100%',
                width: '100%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                transition: 'left 0.7s',
                zIndex: 0
              }}
              className="btn-shine"
            ></div>
          </button>


          <div className="text-center mt-4 pt-3" style={{ borderTop: '1px solid rgba(226, 26, 67, 0.1)' }}>
            <p className="text-muted small mb-0">
              Don't have an account?{' '}
              <NavLink 
                to="/sign-up" 
                style={{ 
                  color: '#E21A43', 
                  fontWeight: '600',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease'
                }}
                className="hover-underline"
              >
                Create one
              </NavLink>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;