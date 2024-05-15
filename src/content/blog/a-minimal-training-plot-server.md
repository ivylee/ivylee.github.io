---
publishDate: "2017-03-04T16:15:05-05:00"
title: a minimal training plot server
---

Training a deep convolutional neural network (CNN) can be a lengthy process.
We usually want to monitor training loss and accuracy and validation loss and accuracy by plotting how these metrics
change as the number of minibatches grows on a graph.
[Tensorflow][1] provides [Tensorboard][2] for visualizing training progress.
Recently I have been playing with [PyTorch][3], I really like its expresiveness and flexibility.
Here's a strategy for visualizing training progress with
any learning framework that doesn't provide Tensorboard-equivalent feature out of the box using Python 3.

First of all as a good practice we output relevant metrics into a log file, the log file should be structured in a way
that is easy to parse and extract metrics. We will need to write a parser method, and a plot method to generate desired
graph(s). [matplotlib][4], [seaborn][5], [ggplot][6] or [bokeh][7] are useful python libraries for graphing.

Then we can use [asyncio][8] to create a background job to plot the metrics we want to visualize and use [aiohttp][9] to create
a web server that displays and refreshes the graph(s) at a certain interval.

```python
# Using python 3.4
import asyncio
import argparse
from aiohttp import web


GRAPH_LOCATION = "static/train_plot.png"


def parser(log_file):
    # read log_file and extract metrics such as
    # minibatch number, training loss, training accuracy,
    # validation loss, validation accuracy
    return metrics


def plot(metrics, output=GRAPH_LOCATION):
    # save output image to GRAPH_LOCATION


def plot_loop(args, loop):
    print("Updating plot")
    metrics = parser(args.log_file)
    plot(metrics)
    loop.call_later(args.interval, plot_loop, args, loop)


@asyncio.coroutine
def handler(request):
    interval = int(request.GET.get('interval', 30))
    resp = web.StreamResponse(status=200,
                                reason='OK',
                                headers={'Content-Type': 'text/html'})

    yield from resp.prepare(request)

    html_str = """
        <html>
            <head>
                <meta http-equiv='refresh' content='{}'>
            </head>
            <body>
                <img src='{}' width='100%'/>
            </body>
        </html>
    """.format(interval, GRAPH_LOCATION)
    resp.write(str.encode(html_str))

    yield from resp.drain()
    return resp


@asyncio.coroutine
def build_server(loop, address, port):
    app = web.Application(loop=loop)
    app.router.add_route('GET', "/plot", handler)
    app.router.add_static('/static', "static")
    ret = yield from loop.create_server(app.make_handler(), address, port)
    return ret


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Training graphs server')
    parser.add_argument('log_file',
                        help='path to train log file')
    parser.add_argument('--interval', '-i', default=30,
                        help='plot interval')
    parser.add_argument('--port', '-p', default=7777,
                        help='server port')
    args = parser.parse_args()

    loop = asyncio.get_event_loop()
    loop.call_soon(plot_loop, args, loop)
    loop.run_until_complete(build_server(loop, '0.0.0.0', args.port))
    try:
        loop.run_forever()
    except KeyboardInterrupt:
        print("Server shutting down!")
        loop.close()
```

This snippet can also be found [here][10].


[1]: https://www.tensorflow.org
[2]: https://www.tensorflow.org/get_started/summaries_and_tensorboard
[3]: http://pytorch.org
[4]: http://matplotlib.org
[5]: http://seaborn.pydata.org
[6]: http://ggplot.yhathq.com
[7]: http://bokeh.pydata.org/en/latest
[8]: https://docs.python.org/3/library/asyncio.html
[9]: http://aiohttp.readthedocs.io/en/stable
[10]: https://gist.github.com/ivylee/f1b00ce54f948e627605598ccf3cf4b9
