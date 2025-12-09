import { useEffect, useRef } from "react";

const WaterfallBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    
    
    const ripples = [];
    const colors = ["#e0f7fa", "#b2ebf2", "#80deea", "#4dd0e1", "#26c6da"];
    
    
    const createRipple = (x, y) => {
      ripples.push({
        x,
        y,
        radius: 0,
        maxRadius: Math.random() * 100 + 50,
        speed: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1
      });
    };
    
    
    const handleMouseMove = (e) => {
      if (Math.random() > 0.3) { 
        createRipple(e.clientX, e.clientY);
      }
    };
    
    
    const handleTouchMove = (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      if (Math.random() > 0.3) {
        createRipple(touch.clientX, touch.clientY);
      }
    };
    
    
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    
    
    const animate = () => {
      
      ctx.fillStyle = "rgba(240, 247, 255, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      
      for (let i = ripples.length - 1; i >= 0; i--) {
        const ripple = ripples[i];
        
        
        ripple.radius += ripple.speed;
        ripple.alpha = 1 - (ripple.radius / ripple.maxRadius);
        
        
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.strokeStyle = ripple.color;
        ctx.lineWidth = 2;
        ctx.globalAlpha = ripple.alpha;
        ctx.stroke();
        
        
        if (ripple.radius > ripple.maxRadius) {
          ripples.splice(i, 1);
        }
      }
      
      ctx.globalAlpha = 1;
      requestAnimationFrame(animate);
    };
    
    
    animate();
    
    
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="waterfall-background"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: -1
      }}
    />
  );
};

export default WaterfallBackground;