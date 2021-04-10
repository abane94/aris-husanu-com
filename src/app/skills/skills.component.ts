import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, Optional, ViewChild } from '@angular/core';

const DELTA = 5;  // .1 seconds
const VELOCITY_BOUNDS = 2;

interface Skill {
  color: string;
  level: number;
  name: string;
  img: string;
}

interface Circle {
  velocity: number[];
  position: number[];
  radius: number;

  img?: MyImage;
  imgUrl?: string;
  color?: string;

  top: number;
  bottom: number;
  left: number;
  right: number
  speed: number;
}

class MyImage extends Image {
  data?: Circle;
}


@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit, AfterViewInit {
  private balls: Circle[] = [];

  private skills: Partial<Circle>[] = [
    {
      // typescript
      radius: 20,
      color: '#3178C6',  // typescript blue
      imgUrl: '/assets/images/logos/ts-logo-128.png'
    },
    {
      // angular
      color: 'red',
      radius: 20,
      imgUrl: '/assets/images/logos/angular.png'
    },
    {
      // javascript
      color: '#F0DB4F',
      radius: 18,
      imgUrl: '/assets/images/logos/JavaScript-logo.png'
    },
    {
      // git
      color: '#F34F29',
      radius: 15,
      imgUrl: '/assets/images/logos/git-logo.eps'
    },
    {
      // atlassian
      color: '#0152CD',
      radius: 15,
      imgUrl: '/assets/images/logos/mark-gradient-blue-atlassian.png'
    },
    {
      // java
      color: '#0152CD',
      radius: 15,
      imgUrl: '/assets/images/logos/java.png'
    },
    {
      // python
      color: '#0152CD',
      radius: 15,
      imgUrl: '/assets/images/logos/python.png'
    }
  ];

  @ViewChild('canvas', {static: true})
  private canvasRef?: ElementRef<HTMLCanvasElement>;
  private canvas?: HTMLCanvasElement;
  private ctx?: CanvasRenderingContext2D;

  constructor() {
  }


  animate(ctx: CanvasRenderingContext2D, img: MyImage) {
    return () => {
      const c = img.data;
      if (!c) { return; }
      const length = (c.radius * 2) / Math.sqrt(2);
      const offset = ((c.radius * 2) - length) / 2;
      ctx.drawImage(img, c.left + offset, c.top + offset, length, length);
      requestAnimationFrame(img.onload as any as FrameRequestCallback);
    }

  }

  initializeCircle(ctx: CanvasRenderingContext2D, base?: Partial<Circle>): Circle {
    const img = new MyImage();
    img.onload = this.animate(ctx, img);
    img.src = base?.imgUrl || '/assets/images/typescript/ts-logo-128.png';   // load image

    const radius = this.rand(5, 15);
    const c: Circle = Object.assign({
      velocity: [this.rand(-VELOCITY_BOUNDS, VELOCITY_BOUNDS), this.rand(-VELOCITY_BOUNDS, VELOCITY_BOUNDS)],

      // make sure the balls are clearly in side of the canvas
      position: [
        this.rand(1.001 * radius, this.canvas ? this.canvas.width - (1.001 * radius) : 0),
        this.rand(1.001 * radius, this.canvas ? this.canvas.height - (1.001 * radius) : 0)
      ],
      radius,

      get top() { return this.position[1] - this.radius },
      get bottom() { return this.position[1] + this.radius },

      get left() { return this.position[0] - this.radius },
      get right() { return this.position[0] + this.radius },

      // magnitude of the velocity vector
      get speed() { return Math.sqrt((this.velocity[0] ** 2) + (this.velocity[1] ** 2)); }
    }, base || {});
    img.data = c;
    c.img = img;
    return c;
  }

  rand(min: number, max: number) {
    const r = Math.random() * (max - min + 1) + min
    return r;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.canvas = this.canvasRef?.nativeElement;
    if (this.canvas) {
      this.canvas.width = 500;
      this.canvas.height = 500;
    }


    this.ctx = this.canvas?.getContext('2d') || undefined;

    // for (let i = 0; i < 10; i++) {
    //   this.balls.push(this.initializeCircle(this.ctx));
    // }



    // this.ctx = this.canvas?.getContext('2d') || undefined;
    // ctx.clearRect(0, 0, canvas.width, canvas.height);

    // this.drawCircle(this.balls[0]);
    if (this.ctx) {

    // for (let i = 0; i < 10; i++) {
    //   this.balls.push(this.initializeCircle(this.ctx));
    // }
    for (const skill of this.skills) {
      this.balls.push(this.initializeCircle(this.ctx, skill));
    }
      this.tick(this.ctx);
    }

  }

  tick = (ctx: CanvasRenderingContext2D ) => {
    for (const ball of this.balls) {
      this.processMoveable(ball);
    }

    // clear canvas
    ctx.clearRect(0, 0, this.canvas?.width || 0, this.canvas?.height || 0);

    for (const ball of this.balls) {
      this.drawCircle(ball, ctx);
    }

    setTimeout(this.tick, DELTA, ctx);

  }

  processMoveable(c: Circle) {
    console.log(c);
    const x = c.position[0];
    const y = c.position[1];

    let dx = c.velocity[0];
    let dy = c.velocity[1];

    c.position[0] = x + dx;
    c.position[1] = y + dy;

    if (c.left <= 0) {
      // dx = dx - x;
      // newX = dx - x;
      c.velocity[0] = -c.velocity[0] || this.rand(0.01 * VELOCITY_BOUNDS, VELOCITY_BOUNDS);
    } else if (c.right >= (this.canvas?.width || 0)) {
      // newX = x - dx;
      c.velocity[0] = -c.velocity[0] || -this.rand(0.01 * VELOCITY_BOUNDS, VELOCITY_BOUNDS);
    }

    if (c.top <= 0) {
      // dx = dx - x;
      // newY = dy - y;
      c.velocity[1] = -c.velocity[1] || this.rand(0.01 * VELOCITY_BOUNDS, VELOCITY_BOUNDS);
    } else if (c.bottom >= (this.canvas?.height || 0)) {
      // newY = y - dy;
      c.velocity[1] = -c.velocity[1] || -this.rand(0.01 * VELOCITY_BOUNDS, VELOCITY_BOUNDS);
    }

    // if (this.balls.some(c2 => {
    //   return c !== c2 && this.areColliding(c, c2);
    // })) {
    //   c.velocity[0] = -c.velocity[0];
    //   c.velocity[1] = -c.velocity[1];
    //   newX += (c.radius * (c.velocity[0] > 0 ? 1 : -1));
    //   newY += (c.radius * (c.velocity[1] > 0 ? 1 : -1));
    // }

    for (const c2 of this.balls) {
      if (c === c2) {continue;}

      const collisionVector = this.areColliding(c, c2)
      if (collisionVector) {
        // TODO: this logic should use the other circles velocity, and account for the balls sizes

        c.velocity = collisionVector.map(i => -i * c.speed);  // need to scale for speed;
        c2.velocity = collisionVector.map(i => i * c2.speed); // move in the opposite direction
        while (this.areColliding(c, c2)) {
          c.position[0] = c.position[0] + c.velocity[0];;
          c.position[1] = c.position[1] + c.velocity[1];;
        }
      }
    }

    // c.position[0] = newX;
    // c.position[1] = newY;
    console.log(c);
    console.log('\n\n');
  }

  // returns false or the directional unit vector of the collision (also includes the distance from vertices)
  private areColliding(c1: Circle ,c2: Circle){
    // todo: make sure I know how this works
      const dx = c2.position[0] - c1.position[0];
      const dy = c2.position[1] - c1.position[1];
      const rSum = c1.radius + c2.radius;

      if (dx * dx + dy * dy <= rSum * rSum) {
        const m = Math.sqrt((dx ** 2) + (dy ** 2));
        return [dx / m, dy / m, m];
      }
      return false;
  }

  drawCircle(c: Circle, ctx: CanvasRenderingContext2D) {
    ctx?.beginPath();
    ctx?.arc(c.position[0], c.position[1], c.radius, 0, 2 * Math.PI);
    (ctx as any).fillStyle = c.color || "blue";  // why doent this type correctly
    ctx?.fill();
    ctx?.stroke();

    // image
    // const length = (c.radius * 2) / Math.sqrt(2);  // Max size the square can be while inset in the circle
    // const img = new Image();
    // img.height = length;
    // img.width = length;
    // img.onload = this.draw(img, ctx, c.position[0], c.position[1], length);
    // img.src = 'https://www.typescriptlang.org/images/branding/logo-grouping.svg';

    // TODO: need to use animate: https://stackoverflow.com/questions/3057162/moving-an-image-across-a-html-canvas
  }

  private draw(self: CanvasImageSource, ctx: CanvasRenderingContext2D, x: number, y: number, length: number) {
    // potential memory problem
    // cant be lambda bc the 'this' valuable needs to be available
    return function() {
      ctx.drawImage(self, x, y, length, length);
    }
  }

}

