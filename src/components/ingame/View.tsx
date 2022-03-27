import React, { useEffect, useRef, RefObject, useState, MouseEvent } from "react";
import styled from "styled-components";
import {
  useRecoilValue,

} from 'recoil';
import {
  unitLocationState,
} from "../../state/atom";
import {
  gridSpec,
  e1
} from "../../constants/field";
import {
  createGridTemplate,
  createMarble,
  createEnemy
} from "../../actions/actions";

const StyledCanvasWrapper = styled.div`
  width : 100vw;
  height : calc(100vh - 150px);
  overflow: hidden;
`;

const View: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>();

  const [canvasX, setCanvasX] = useState<number>(0);
  const [canvasY, setCanvasY] = useState<number>(0);

  const location = useRecoilValue(unitLocationState);

  const {
    widthNum,
    heightNum,
  } = gridSpec;

  const canvasWidth = widthNum + "px"
  const canvasHeight = heightNum + "px";
  // Draw Unit
  useEffect(() => {
    const ref: any = canvasRef.current;
    createMarble(location, ref)
  }, [canvasRef, location]);


  const [x, setEnemyX] = useState<number>(e1.x);
  const [y, setEnemyY] = useState<number>(e1.y);

  useEffect(() => {
    createEnemy(x, y);
  }, [x, y]);
  // canvas drag & drop !! Need to be checked. It doesn't work properly.
  useEffect(() => {
    const ref: any = canvasRef.current;
    let prevMouseX: number;
    let prevMouseY: number;
    ref.addEventListener("mousedown", (e: MouseEvent) => {
      const x = e.screenX;
      const y = e.screenY;
      prevMouseX = x;
      prevMouseY = y;
      console.log("MouseDown (x : " + x + ", y : " + y + ')');
    })

    ref.addEventListener("mouseup", (e: MouseEvent) => {
      const x = e.screenX;
      const y = e.screenY;
      const dx = prevMouseX - x;
      const dy = prevMouseY - y;

      if (canvasX - dx < 0) {
        setCanvasX(0);
      } else {
        setCanvasX(dx);
      }
      if (canvasY - dy < 0) {
        setCanvasY(0);
      } else {
        setCanvasY(dy);
      }
    })
  }, []);

  return (
    <StyledCanvasWrapper>
      <canvas
        ref={canvasRef as RefObject<HTMLCanvasElement>}
        id="game-screen"
        width={canvasWidth}
        height={canvasHeight}
        style={{
          backgroundColor: "#FFF",
          border: "3px solid #323232",
          marginBottom: 150,
          position: "relative",
          top: canvasY,
          left: canvasX
        }}>
      </canvas>
    </StyledCanvasWrapper>

  )
}

export { View }