---
title: Face Similarity
publishDate: 2014-06-11
seo:
  image:
    src: '/facesimilarity.jpg'
    alt: Face Similarity
tags:
  - OpenCV
  - Java
  - Scala
  - Javascript
  - HTML
  - NodeJS
  - R
description: I developed an algorithm to detect and compute face similarity score for a given set of profile images.
isFeatured: true
---

Given a set of social media profile images, how can we tell if they belong to the same person?

I developed an algorithm to detect and compute face similarity score for a given set of profile images, which was implemented as a component in a Scala REST API backend.

Why was this challenging?

1. This was done before the boom of Deep Learning.
2. Profile images from social media were smaller than 150px by 150px, many Deep Learning based algorithm today would not even work.
3. Face detection and similarity scoring had to be done in real-time, latency requirement as such placed contraints on the selection of algorithms that could be used.
4. While developing the algorithm, I discovered a nontrivial bug in OpenCV, for the benefit of the open source community, I submitted a patch upstream.
5. After the algorithm was developed and tested for accuracy, bridging OpenCV and Scala via JNI required careful engineering.
