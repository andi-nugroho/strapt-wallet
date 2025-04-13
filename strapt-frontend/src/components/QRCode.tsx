
import { useEffect, useRef } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import QRCodeLib from 'qrcode';

interface QRCodeProps {
  value: string;
  size?: number;
  className?: string;
  bgColor?: string;
  fgColor?: string;
}

const QRCode = ({ 
  value, 
  size = 200, 
  className = "", 
  bgColor = "#FFF", 
  fgColor = "#000" 
}: QRCodeProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isMobile = useIsMobile();
  
  // Adjust QR code size for mobile
  const qrSize = isMobile ? Math.min(size, window.innerWidth - 100) : size;

  useEffect(() => {
    if (canvasRef.current) {
      QRCodeLib.toCanvas(
        canvasRef.current,
        value,
        {
          width: qrSize,
          margin: 2,
          color: {
            dark: fgColor,
            light: bgColor,
          },
        },
        (error) => {
          if (error) console.error(error);
        }
      );
    }
  }, [value, qrSize, bgColor, fgColor]);

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default QRCode;
