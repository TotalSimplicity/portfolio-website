---
title: Science Olympiad
date: 2025-11-01
summary: Wilton High School Science Olympiad, top 4 in the state in three events, including a PID-controlled Robot Tour robot.
tags: [robotics, awards]
role: Competitor & programmer
links:
  - label: Robot Tour code
    href: https://github.com/TotalSimplicity/sciolyrobottour2526
---

## Results

Placed top 4 in the state in three events at the Connecticut competition at UConn: Robot Tour, Hovercraft, and Boomilever.

## Robot Tour

- Raspberry Pi Pico running MicroPython, with a custom motor driver and drivetrain module over I2C
- PID-controlled drive to target distances, tuned starting from Ziegler-Nichols values
- Threaded control loop so motion runs alongside the main program
