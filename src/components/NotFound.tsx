import { FaHome, FaUtensils, FaSearch, FaArrowLeft} from 'react-icons/fa';
import { GiBacon, GiCoffeeCup, GiForkKnifeSpoon } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';
import { FiCoffee } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { LuChefHat } from 'react-icons/lu';

function NotFound() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  return (
    <div className="not-found-container">
      {/* Background decorative elements */}
      <div className="not-bg-decoration not-bg-1"></div>
      <div className="not-bg-decoration not-bg-2"></div>
      <div className="not-bg-decoration not-bg-3"></div>
      
      <div className={`not-found-content ${isVisible ? 'visible' : ''}`}>
        <div className="not-header-decoration">
          <div className="not-decoration-dot not-dot-1"></div>
          <div className="not-decoration-dot not-dot-2"></div>
          <div className="not-decoration-dot not-dot-3"></div>
        </div>
        
        <div className="not-animation-container">
          <div className="not-floating-icon not-icon-1">
            <GiBacon />
            <div className="not-icon-shadow"></div>
          </div>
          <div className="not-floating-icon not-icon-2">
            <FiCoffee />
            <div className="not-icon-shadow"></div>
          </div>
          <div className="not-floating-icon not-icon-3">
            <FaUtensils />
            <div className="not-icon-shadow"></div>
          </div>
          <div className="not-floating-icon not-icon-4">
            <LuChefHat />
            <div className="not-icon-shadow"></div>
          </div>
          <div className="not-floating-icon not-icon-5">
            <GiForkKnifeSpoon />
            <div className="not-icon-shadow"></div>
          </div>
          <div className="not-floating-icon not-icon-6">
            <GiCoffeeCup />
            <div className="not-icon-shadow"></div>
          </div>
        </div>
        
        <div className="not-found-text">
          <div className="not-number-glow">
            <h1>4<span className="not-highlight">0</span>4</h1>
          </div>
          <h2>Oops! Breakfast Not Found</h2>
          <p>Unfortunately, the page you're looking for doesn't exist. <br />It might have been removed or the URL has changed.</p>
        </div>
        
        <div className="not-action-buttons">
          <button className="not-btn not-primary" onClick={() => navigate(-1)}>
            <FaArrowLeft className="not-btn-icon" />
            <span>Go Back</span>
            <div className="not-btn-hover-effect"></div>
          </button>
          <button className="not-btn not-secondary" onClick={() => navigate('/')}>
            <FaHome className="not-btn-icon" />
            <span>Home Page</span>
            <div className="not-btn-hover-effect"></div>
          </button>
          <button className="not-btn not-outline" onClick={() => {
            const query = prompt("What breakfast are you craving for?");
            if (query) navigate(`/search?q=${encodeURIComponent(query)}`);
          }}>
            <FaSearch className="not-btn-icon" />
            <span>Search Breakfast</span>
            <div className="not-btn-hover-effect"></div>
          </button>
        </div>
        
        <div className="not-breakfast-tips">
          <div className="not-tips-header">
            <LuChefHat className="not-chef-icon" />
            <h3>Chef's Breakfast Tips</h3>
          </div>
          <div className="not-tips-container">
            <div className="not-tip-card">
              <div className="not-tip-icon">🥓</div>
              <div className="not-tip-content">
                <h4>Crispy Bacon Secret</h4>
                <p>Toss bacon in a little flour before cooking for extra crispiness</p>
              </div>
            </div>
            <div className="not-tip-card">
              <div className="not-tip-icon">🍳</div>
              <div className="not-tip-content">
                <h4>Perfect Eggs</h4>
                <p>Always cook scrambled eggs over medium heat for creamy texture</p>
              </div>
            </div>
            <div className="not-tip-card">
              <div className="not-tip-icon">🥐</div>
              <div className="not-tip-content">
                <h4>Flaky Croissants</h4>
                <p>Reheat at 180°C for 5 minutes to restore original flakiness</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="not-floating-particles">
          {[...Array(15)].map((_, i) => (
            <div key={i} className="not-particle" style={{
              animationDelay: `${i * 0.5}s`,
              left: `${Math.random() * 100}%`
            }}></div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default NotFound;