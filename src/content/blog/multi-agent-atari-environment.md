---
publishDate: "2020-11-29"
excerpt: Going from single-agent Atari environment to multi-agent Atari environment.
title: Multi-agent Atari environment
---

## Single-agent Atari environment

[OpenAI Gym](https://github.com/openai/gym) provides convenient abstraction of Atari games for training reinforcement learning agents.

An Atari game is represented as a `gym.Env`. There are two important methods of the `gym.Env`. The `step` method takes an action to advance the game into the next state, and returns an observation (typically the image of the console), a reward (the score), a boolean indicating whether the game is over, and an `info` dictionary with auxiliary information. The `reset` method resets the Atari game to the original starting state, before any action is taken.

Under the hood, OpenAI Gym depends on [Arcade Learning Environment](https://github.com/mgbellemare/Arcade-Learning-Environment) (ALE), which is a C++ wrapper of [Stella emulator](https://stella-emu.github.io/) and provides a Python interface.

## Multi-agent Atari environment

A multi-agent environment will allow us to study inter-agent dynamics, such as competition and collaboration. How do we go from single-agent Atari environment to multi-agent Atari environment while preserving the `gym.Env` interface?

[PettingZoo](https://www.pettingzoo.ml) has attempted to do just that. The research team behind PettingZoo first modified ALE to enable multi-player support for Atari games, while their [pull request](https://github.com/mgbellemare/Arcade-Learning-Environment/pull/350) is pending to be merged, they published a Python package that can be easily installed `pip install multi-agent-ale-py`. If you install PettingZoo with Atari - `pip install pettingzoo[atari]`, Multi-agent ALE is automatically installed as a dependency.

An important design choice PettingZoo has made is to model agents taking action sequentially, as opposed to concurrently (which is native to Atari games). They published the idea in [Agent Environment Cycle Games](https://arxiv.org/abs/2009.13051). Naturally, someone [asked](https://github.com/PettingZoo-Team/PettingZoo/issues/158) about this, and the PettingZoo team created a wrapper to collect all of the sequentially gathered outputs in one method.

For my work, I don't need AEC games, I actually prefer concurrent actions, and it would be ideal to avoid the intermediate sequential layer. To achieve this, I built a `gym.Env` like interface with Multi-agent ALE. The `step` method now takes actions for each player, and returns an observation, rewards for each player and game over booleans for each player. To make it suitable for large scale training with [RLlib](https://docs.ray.io/en/master/rllib.html), we modify it to extend `MultiAgentEnv`, create dictionaries for actions and outputs keyed by agent name, and add a boolean to indicate whether the game is over for all of the agents.

## Final thoughts

OpenAI Gym created a neat environment interface for training reinforcement learning agents. It is been adopted in PettingZoo and RLlib. Going from single-agent environment to multi-agent environment will enable us to study interesting multi-agent dynamics. RLlib makes large scale training scalable. I'm excited to see more research in the multi-agent RL domain!
