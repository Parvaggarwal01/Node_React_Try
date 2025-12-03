import { useEffect, useRef } from "react";

const WaterfallBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    
    // Ripple effect variables
    const ripples = [];
    const colors = ["#e0f7fa", "#b2ebf2", "#80deea", "#4dd0e1", "#26c6da"];
    
    // Create ripple
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
    
    // Mouse move handler
    const handleMouseMove = (e) => {
      if (Math.random() > 0.3) { // Only create ripple sometimes for better performance
        createRipple(e.clientX, e.clientY);
      }
    };
    
    // Touch move handler for mobile
    const handleTouchMove = (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      if (Math.random() > 0.3) {
        createRipple(touch.clientX, touch.clientY);
      }
    };
    
    // Add event listeners
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    
    // Animation loop
    const animate = () => {
      // Clear canvas with a semi-transparent fill for trail effect
      ctx.fillStyle = "rgba(240, 247, 255, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const ripple = ripples[i];
        
        // Update ripple
        ripple.radius += ripple.speed;
        ripple.alpha = 1 - (ripple.radius / ripple.maxRadius);
        
        // Draw ripple
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.strokeStyle = ripple.color;
        ctx.lineWidth = 2;
        ctx.globalAlpha = ripple.alpha;
        ctx.stroke();
        
        // Remove ripple if it's too big
        if (ripple.radius > ripple.maxRadius) {
          ripples.splice(i, 1);
        }
      }
      
      ctx.globalAlpha = 1;
      requestAnimationFrame(animate);
    };
    
    // Start animation
    animate();
    
    // Cleanup
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