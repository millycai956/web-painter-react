import React, { Component } from 'react';
import './style.css';

class WebPainter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDraw: false, 
      lw: 5, 
      col: '#000000', 
      isErase: false, 
    };

    this.canvRef = React.createRef(); 
  }

  componentDidMount() {
    const canv = this.canvRef.current;
    canv.getContext('2d').lineJoin = 'round';
    canv.getContext('2d').lineCap = 'round';
  }

  startDraw = ({ nativeEvent }) => { 
    const { offsetX, offsetY } = nativeEvent;
    const ctx = this.canvRef.current.getContext('2d');
    this.setState({ isDraw: true });
    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
  };

  draw = ({ nativeEvent }) => {
    if (!this.state.isDraw) return;
    const { offsetX, offsetY } = nativeEvent;
    const ctx = this.canvRef.current.getContext('2d');
    const { lw, col, isErase } = this.state;
    ctx.lineWidth = lw;
    ctx.strokeStyle = isErase ? 'white' : col;
    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
  };

  stopDraw = () => { 
    this.setState({ isDraw: false });
  };

  clrCanvas = () => { 
    const canv = this.canvRef.current;
    const ctx = canv.getContext('2d');
    ctx.clearRect(0, 0, canv.width, canv.height);
  };

  render() {
    const { col, lw, isErase } = this.state;
    return (
      <div>
        <div className="controls">
        <button onClick={this.clrCanvas}>Clear Canvas</button>
        <button onClick={() => this.setState({ isErase: !isErase })}>
            {isErase ? "Paint Mode" : "Erase Mode"}
          </button>
          <div className="color-picker">
            <span>Color</span>
            <input type="color" value={this.state.col} onChange={(e) => this.setState({ col: e.target.value })} />
            </div>
          Stroke Weight<input type="range" min="1" max="50" value={lw} onChange={(e) => this.setState({ lw: e.target.value })} />
        </div>
        <canvas
          ref={this.canvRef}
          id="canvas"
          width="800"
          height="600"
          onMouseDown={this.startDraw}
          onMouseMove={this.draw}
          onMouseUp={this.stopDraw}
          onMouseOut={this.stopDraw}
        ></canvas>
      </div>
    );
  }
}

export default WebPainter;