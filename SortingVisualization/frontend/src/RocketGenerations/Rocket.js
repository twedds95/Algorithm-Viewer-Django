export default function Rocket(startingY, dnaSize, dna) {
    const START_Y = startingY;
    this.dnaSize = dnaSize;
    this.frame = 0;
    this.pos = {x: 0, y: startingY};
    this.velocity = {x: 0, y: 0};
    this.acceleration = {x: 0, y: 0};
    this.strength = 0;

    this.crashed = false;
    this.landed = false;
    this.lastFrame = 1;

    if (dna) {
        this.dna = dna;
    } else {
        this.dna = [];
        for (let i = 0; i < dnaSize; i++) {
            this.dna.push(randomGene());
        }
    }

    this.applyForce = function () {
        let index = this.frame;
        this.acceleration.x += this.dna[index].x;
        this.acceleration.y += this.dna[index].y;

        this.velocity.x += this.acceleration.x;
        this.velocity.y += this.acceleration.y;

        this.pos.x += this.velocity.x;
        this.pos.y += this.velocity.y;
        this.frame++;
    }

    this.makeChild = function (otherRocket) {
        let newDNA = [];
        for (let i = 0; i < this.dnaSize; i++) {
            // mutate gene 1% of the time
            if (Math.random() < 0.01) {
                newDNA.push(randomGene());
            }
            // if not mutated, get gene from one of the parents
            else if (Math.random() > 0.5) {
                newDNA.push(otherRocket.dna[i]);
            } else {
                newDNA.push((this.dna[i]));
            }
        }
        return new Rocket(START_Y, this.dnaSize, newDNA);
    }

    this.updatePosition = function (obstacles, bounds) {
        if (!this.landed && !this.crashed) {
            //check if crashed or landed with obstacles and bounds
            for (let i = 0; i < obstacles.length; i++) {
                let o = obstacles[i];
                if (this.pos.x < (o.x + o.width) && this.pos.x > (o.x - o.width)
                    && this.pos.y < (o.y + o.height) && this.pos.y > (o.y - o.height)) {
                    this.crashed = true;
                }
            }
            if (this.pos.x >= (bounds.finish.x - bounds.finish.radius / 1.3)
                && this.pos.y >= (bounds.finish.y - bounds.finish.radius / 1.3)
                && this.pos.y <= (bounds.finish.y + bounds.finish.radius / 1.3)) {
                this.landed = true;
                this.lastFrame = this.frame;
            }
            if (!this.landed && (this.pos.x + 10 <= bounds.left || this.pos.x >= bounds.right || this.pos.y <= bounds.top || this.pos.y + 10 >= bounds.bottom)) {
                this.crashed = true;
                this.lastFrame = this.frame;
            }
            // after checking if still not crashed or landed
            this.applyForce();
        }
        let multiplier = this.frame;
        if (this.landed) {
            multiplier = this.frame * 10 * (this.dnaSize - this.lastFrame);
        }
        if (this.crashed) {
            multiplier = this.lastFrame/10;
        }
        let distanceX = this.pos.x - bounds.finish.x;
        let distanceY = this.pos.y - bounds.finish.y;
        this.strength = multiplier / (distanceX * distanceX + distanceY * distanceY);
    }
}


// keep genes bounded between min and max
function randomGene() {
    let min = -0.0005;
    let max = 0.0005;
    return {x: Math.random() * (max - min) + min * 0.99, y: Math.random() * (max - min) + min};
}