"use client";
import { useSocket } from "@/components/molecules/providers/socket-provider";
import "./styles.scss";
import React, { useCallback, useEffect, useRef, useState } from "react";

const LINE_COLOR = "white";
const TEXT_COLOR = "white";

enum TYPES {
  "enemy" = 1,
  "teammate" = 2,
  "boom" = 3,
}

const POINTS = [
  {
    x: 1000,
    y: 1000,
    type: 1,
  },
  {
    x: 327,
    y: -103,
    type: 1,
  },

  {
    x: -300,
    y: 300,
    type: 3,
  },
  {
    x: -300,
    y: -500,
    type: 2,
  },
  {
    x: 300,
    y: -300,
    type: 1,
  },
];

interface IPoint {
  x: number;
  y: number;
  type: TYPES;
}

export default function Radar({ room }: { room: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { socket } = useSocket();

  const [points, setPoints] = useState<IPoint[]>([]);

  const getMaxSize = useCallback(() => {
    if (points.length === 0) return { x: 1, y: 1 };
    let x = 0;
    let y = 0;

    const xAxises = [...points].map((e) => Math.abs(e.x));
    const yAxises = [...points].map((e) => Math.abs(e.y));

    x = Math.max(...xAxises);
    y = Math.max(...yAxises);

    return { x, y };
  }, [points]);

  useEffect(() => {
    if (!socket?.active) return;
    socket.emit("join_room", {
      room: room,
    });
    socket.on("my_response", function (data, callback) {
      console.log(data);
      if (
        data?.data &&
        typeof data.data === "object" &&
        data?.data?.length > 0
      ) {
        callback?.();
        setPoints(data.data);
      }
    });
  }, [socket, setPoints]);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      const resizeCanvas = () => {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }

        canvas.width = 1 * window.innerWidth;
        canvas.height = 1 * window.innerHeight;
        const maxSize = getMaxSize();
        const ratio = Math.min(
          Math.floor(canvas.width / 2 / maxSize.x / 0.05) * 0.05,
          Math.floor(canvas.height / 2 / maxSize.y / 0.05) * 0.05
        );

        console.log(ratio);

        drawCompass();

        points.forEach((e, index) => {
          drawPoint({
            x: e.x,
            y: e.y,
            ratio: ratio,
            type: e.type,
          });
        });
      };

      const drawPoint = ({
        x,
        y,
        ratio = 1,
        type,
      }: {
        x: number;
        y: number;
        ratio: number;
        type: TYPES;
      }) => {
        const canvas = canvasRef.current;
        if (canvas) {
          let color = "red";
          const ctx = canvas.getContext("2d");
          (x = canvas.width / 2 + x * ratio),
            (y = canvas.height / 2 - y * ratio);
          if (ctx) {
            switch (type) {
              case TYPES.enemy:
                drawEnemy(ctx, { x, y });
                break;
              case TYPES.teammate:
                drawTeammate(ctx, { x, y });
                break;
              case TYPES.boom:
                drawBoom(ctx, { x, y });
            }

            // ctx.fillStyle = "red"; // Set the color for the point
            // ctx.beginPath();
            // ctx.arc(x, y, 5, 0, 2 * Math.PI); // Draw a circle with a radius of 5

            // ctx.font = "20px Arial";
            // ctx.textAlign = "center";
            // ctx.textBaseline = "middle";
            // ctx.fillText("", x + 10, y, 30);
          }
        }
      };

      const drawBoom = (
        ctx: CanvasRenderingContext2D,
        { x, y }: { x: number; y: number }
      ) => {
        ctx.fillStyle = "blue";
        ctx.beginPath();
        const img = new Image();
        img.onload = function () {
          ctx.drawImage(img, x, y);
        };
        img.src = "/grenade.png";
        ctx.drawImage(img, x, y);

        // ctx.font = "15px Arial";
        // ctx.textAlign = "center";
        // ctx.textBaseline = "middle";
        // ctx.fillStyle = TEXT_COLOR;
        // ctx.fillText("20:30", x + 15, y - 10);
        ctx.fill();
      };

      const drawTeammate = (
        ctx: CanvasRenderingContext2D,
        { x, y }: { x: number; y: number }
      ) => {
        ctx.fillStyle = "blue";
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, 2 * Math.PI);
        ctx.fill();
      };

      const drawEnemy = (
        ctx: CanvasRenderingContext2D,
        { x, y }: { x: number; y: number }
      ) => {
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, 2 * Math.PI);
        ctx.fill();
      };

      const drawCompass = () => {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          const centerX = canvas.width / 2;
          const centerY = canvas.height / 2;

          // Clear canvas
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          //Set Background color to canvas
          ctx.fillStyle = "black";
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          // Draw horizontal and vertical lines
          ctx.beginPath();
          ctx.moveTo(centerX, 20);
          ctx.lineTo(centerX, canvas.height - 20);
          ctx.moveTo(20, centerY);
          ctx.lineTo(canvas.width - 20, centerY);
          ctx.strokeStyle = LINE_COLOR;
          ctx.stroke();

          // Draw labels
          ctx.font = "20px Arial";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillStyle = TEXT_COLOR;
          ctx.fillText("N", centerX + 20, 30);
          ctx.fillText("S", centerX + 20, canvas.height - 30);
          ctx.fillText("E", canvas.width - 30, centerY + 20);
          ctx.fillText("W", 30, centerY + 20);

          //Draw center point
          ctx.beginPath();
          ctx.fillStyle = "blue"; // Set the color for the point
          ctx.rect(centerX - 10, centerY - 10, 20, 20);
          ctx.fill();
        }
      };

      resizeCanvas();
      window.addEventListener("resize", resizeCanvas);
      return () => window.removeEventListener("resize", resizeCanvas);
    }
  }, [getMaxSize, points]);

  return (
    <div className="App">
      <div style={{ position: "fixed", top: 0 }}>
        {/* <button onClick={add}>dsadsa</button>
        <button onClick={resize}>resize</button> */}
      </div>

      <canvas
        ref={canvasRef}
        width="400"
        height="400"
        className="compass-canvas"
      ></canvas>
    </div>
  );
}
