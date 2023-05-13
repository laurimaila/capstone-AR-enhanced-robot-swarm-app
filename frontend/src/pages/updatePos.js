export default function UpdatePos(robot, frameCount) {
    robot.x = robot.x + 2 * Math.sin(frameCount * 0.02)
    robot.y = robot.y + Math.cos(frameCount * 0.02)
}