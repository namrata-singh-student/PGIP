import React, { useState, useEffect, useRef } from 'react';

const Statistics = () => {
  const [stats, setStats] = useState({
    schemes: 0,
    states: 0,
    users: 0
  });
  
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef(null);

  const targetStats = {
    schemes: 120,
    states: 28,
    users: 10000
  };

  const animateStatistic = (current, target, setter) => {
    const duration = 2000;
    const intervalTime = 20;
    const steps = Math.ceil(duration / intervalTime);
    const increment = target / steps;
    let count = current;

    const interval = setInterval(() => {
      count += increment;
      if (count >= target) {
        count = target;
        clearInterval(interval);
      }
      setter(prev => ({
        ...prev,
        [Object.keys(targetStats).find(key => targetStats[key] === target)]: Math.floor(count)
      }));
    }, intervalTime);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            animateStatistic(0, targetStats.schemes, setStats);
            animateStatistic(0, targetStats.states, setStats);
            animateStatistic(0, targetStats.users, setStats);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [hasAnimated]);

  return (
    <section ref={sectionRef} id="statistics" className="statistics-section text-center mt-5 py-5">
      <div className="container">
        <h2 className="fw-bold mb-4">Statistics</h2>
        <div className="row">
          <div className="col-md-4">
            <img src="/assets/schemes-icon.png" alt="Schemes Icon" className="stat-icon mb-3" />
            <h3 className="stat-number">{stats.schemes.toLocaleString()}</h3>
            <p>Schemes Covered</p>
          </div>
          <div className="col-md-4">
            <img src="/assets/states-icon.png" alt="States Icon" className="stat-icon mb-3" />
            <h3 className="stat-number">{stats.states.toLocaleString()}</h3>
            <p>States Supported</p>
          </div>
          <div className="col-md-4">
            <img src="/assets/users-icon.png" alt="Users Icon" className="stat-icon mb-3" />
            <h3 className="stat-number">{stats.users.toLocaleString()}</h3>
            <p>Users Served</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Statistics; 