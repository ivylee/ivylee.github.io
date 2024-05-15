---
publishDate: "2017-12-10T13:47:48-05:00"
title: training monitoring with Visdom and Hyperdash
---

For the past few months, I have enjoyed using [Visdom][1] and [Hyperdash][2] to monitor training processes.

### Visdom

Visom is a Python library developed by Facebook Research. Similar to [Tensorboard][3],
it provides a UI server (using React) through which user can create scatter plots, histograms, visualize images and text.

I have written a small snippet for creating and updating a scatter plot,
which can be used for visualizing training and validation loss and accuracy.

```python
# pip install visdom numpy
# visualize.py

import numpy
from visdom import Visdom

class Plot(object):
    def __init__(self, title, port=8080):
        self.viz = Visdom(port=port)
        self.windows = {}
        self.title = title

    def register_scatterplot(self, name, xlabel, ylabel):
        win = self.viz.scatter(
            X=numpy.zeros((1, 2)),
            opts=dict(title=self.title, markersize=5, xlabel=xlabel, ylabel=ylabel)
        )
        self.windows[name] = win

    def update_scatterplot(self, name, x, y):
        self.viz.updateTrace(
            X=numpy.array([x]),
            Y=numpy.array([y]),
            win=self.windows[name]
        )
```

In my training script, I can initialize and update the plots.

```python
# train.py
import visualize

plot = visualize.Plot("Model A")
plot.register_scatterplot("Loss", "Epoch", "Loss")
for n in range(epoch):
    # ... compute average loss over training data
    plot.update_scatterplot("Loss", n + 1, loss)
```

Before running the training script, we need to start the web server, so that after training starts,
we can go to `localhost:8080` in the browser to see the plots.

```
python -m visdom.server -p 8080
```

The above snippets can also be found [here][4].
[PyTorchNet][5] library provides more [loggers][6] for plots, images, and text, it can be very handy if you're a PyTorch user.

### Hyperdash
Visdom is great for visualizing plots and images, however connection to a remote server isn't always available.
Hyperdash can stream training logs from a process on a remote server directly to my phone.
I can simply open the mobile app to know if the training process died, or loss is no longer decreasing.
The set up is quite simple, all necessary steps are documented in the [homepage][2].
One caveat is that it does not work well with `tqdm` (see [issue 63][7]), simply disable `tqdm` in the training script.


[1]: https://github.com/facebookresearch/visdom
[2]: https://hyperdash.io
[3]: https://www.tensorflow.org/get_started/summaries_and_tensorboard
[4]: https://gist.github.com/ivylee/b2f47d1ad787d7f7079c596bb0ac9c0f
[5]: https://github.com/pytorch/tnt
[6]: https://github.com/pytorch/tnt/blob/master/torchnet/logger/visdomlogger.py
[7]: https://github.com/hyperdashio/hyperdash-sdk-py/issues/63
