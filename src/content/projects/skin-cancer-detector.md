---
title: Skin Cancer Detector
date: 2024-01-24
summary: A CNN that classifies skin lesions as benign or malignant, live from a webcam.
tags: [software]
role: Solo developer
links:
  - label: GitHub
    href: https://github.com/TotalSimplicity/skincancerdetector
order: 3
---

## How it works

- Keras model fine-tuned from VGG16 on the HAM10000 dermatoscopic image dataset
- Several training iterations with data augmentation
- OpenCV script classifies webcam frames in real time
