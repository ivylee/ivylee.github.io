---
title: Traffic Cam Bus Detection
publishDate: 2019-09-17
seo:
  image:
    src: '/bus-detection.jpg'
    alt: Traffic Cam Bus Detection screenshot
tags:
  - Python
  - Tensorflow
description: On National Day of Civic Hacking, I developed a proof-of-concept algorithm that detects MTA buses from NYC DOT traffic camera footage.
---

On National Day of Civic Hacking, I was selected to participate in the city's first [Mobility for All Abilities hackathon][1]. I developed a proof-of-concept algorithm that detects MTA buses from NYC DOT traffic camera footage. This technology can be used to monitor traffic conditions and identify violations in real-time. I annotated about 400 images for training, testing and validation, then I trained the model in [Google Colab][2], achieved more than 95% accuracy on test set.

![MTA bus detection result on traffic camera footage](/bus-detection.jpg)

[1]: https://beta.nyc/2019/10/09/mobility-for-all-abilities-hackathon
[2]: https://colab.research.google.com/drive/1jYwyLlFYCdLSPr-C5yvoeyAaCh9ZFylX
