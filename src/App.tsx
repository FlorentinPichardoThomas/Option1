import React, { useEffect, useRef } from 'react';
import { Wind, Leaf, Sprout, Sun, CloudRain } from 'lucide-react';

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();
    window.addEventListener('resize', setSize);

    // Grass blade class
    class GrassBlade {
      x: number;
      height: number;
      angle: number;
      originalAngle: number;
      speed: number;
      width: number;
      color: string;

      constructor(x: number) {
        this.x = x;
        this.height = 80 + Math.random() * 80;
        this.angle = Math.PI / 2;
        this.originalAngle = this.angle;
        this.speed = 0.1 + Math.random() * 0.2;
        this.width = 2 + Math.random() * 3;
        const greenBase = 120 + Math.random() * 20;
        this.color = `rgb(40, ${greenBase}, 40)`;
      }

      update(mouseX: number) {
        const distance = Math.abs(mouseX - this.x);
        const influence = Math.max(0, 1 - distance / 150);
        const targetAngle = this.originalAngle - (influence * Math.PI / 4);
        this.angle += (targetAngle - this.angle) * this.speed;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.width;
        
        const startY = canvas.height - 50;
        const endX = this.x + Math.cos(this.angle) * this.height;
        const endY = startY - Math.sin(this.angle) * this.height;
        
        ctx.moveTo(this.x, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = 'rgba(0, 40, 0, 0.1)';
        ctx.moveTo(this.x + 2, startY);
        ctx.lineTo(endX + 2, endY);
        ctx.stroke();
      }
    }

    const blades: GrassBlade[] = [];
    const spacing = 2;
    const bladesCount = Math.floor(canvas.width / spacing);
    for (let i = 0; i < bladesCount; i++) {
      blades.push(new GrassBlade(i * spacing));
    }

    let mouseX = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
    };

    // Listen for mousemove on the window instead of just the canvas
    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#87CEEB');
      gradient.addColorStop(1, '#E0F6FF');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#654321';
      ctx.fillRect(0, canvas.height - 50, canvas.width, 50);

      blades.forEach(blade => {
        blade.update(mouseX);
        blade.draw(ctx);
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setSize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="relative w-full h-screen">
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
      />
      
      {/* Company Information */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="max-w-4xl w-full mx-4">
          <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <Leaf className="w-10 h-10 text-green-600" />
              <h1 className="text-4xl font-bold text-gray-800">GreenScape Solutions</h1>
            </div>
            
            <p className="text-xl text-gray-700 mb-8">
              Transforming spaces into sustainable, living landscapes since 1970
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-start gap-3">
                <Sprout className="w-6 h-6 text-green-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-800">Eco-Friendly Design</h3>
                  <p className="text-gray-600">Native plants and sustainable landscaping solutions</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Sun className="w-6 h-6 text-green-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-800">Smart Irrigation</h3>
                  <p className="text-gray-600">Water-efficient systems and drought-resistant planning</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CloudRain className="w-6 h-6 text-green-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-800">Maintenance</h3>
                  <p className="text-gray-600">Year-round care and seasonal adjustments</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
                Get a Free Quote
              </button>
              <button className="border-2 border-green-600 text-green-600 px-6 py-3 rounded-lg hover:bg-green-50 transition-colors">
                View Our Projects
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-lg">
        <div className="flex items-center gap-2">
          <Wind className="text-green-600" />
          <p className="text-sm text-gray-700">Move your mouse to interact with the grass</p>
        </div>
      </div>
    </div>
  );
}

export default App;