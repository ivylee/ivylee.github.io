---
title: AWS Lambda deployment size limit workaround
excerpt: How I resolved AWS Lambda deployment size error.
publishDate: "2024-05-26"
tags:
  - AWS
  - Lambda
  - Python
  - Alpaca
---

After I implemented a trading strategy using Alpaca paper trading account that runs on AWS Lambda, I ran into the following deployment error:

```bash
 An error occurred (InvalidParameterValueException) when calling the 
 CreateFunction operation: Layers consume more than the available size of 
 262144000 bytes
```

Turns out AWS Lambda has a deployment package [size limit](https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-limits.html) of 256MB. This is the second time I ran into this kind of issue. The first time was about 2 months ago. So I’m writing down the solution for the future me and others who run into this problem.

The root cause is, I need to use [pandas](https://pandas.pydata.org/) and [numpy](https://numpy.org/) in my Lambda function, and they are huge when packaged. Luckily, AWS provides a [managed Lambda layer](https://aws-sdk-pandas.readthedocs.io/en/stable/layers.html) that includes them. I can add this layer on top of my Lambda. Now the problem is, if there’s a package that depends on `pandas` and/or `numpy`, and the package is part of the deployment’s `requirements.txt`, during the installation process `pandas` and/or `numpy` will get installed again, making the total deployment package huge, effectively not leveraging the provided Lambda layer. Instead of putting the desired package in `requirements.txt` and reply on `pip install`, we need a more efficient way to provide the package and its dependencies. The solution strategy is very similar to the [Cryptography Example](https://aws.github.io/chalice/topics/packaging.html#cryptography-example).

In my case, initially I included `alpaca-py==0.21.1` in my Lambda’s `requirements.txt`, and got the size limit error. `alpaca-py`'s dependencies are specified [here](https://github.com/alpacahq/alpaca-py/blob/master/pyproject.toml):

```toml
[tool.poetry.dependencies]
python = "^3.8.0"
requests = "^2.30.0"
pydantic = "^2.0.3"
pandas = ">=1.5.3"
msgpack = "^1.0.3"
websockets = ">=10.4"
sseclient-py = "^1.7.2"
```

`python` is included in the Lambda runtime, `requests` and `pandas` are included in the Lambda layer, that leaves `pydantic`, `msgpack`, `websockets` and `sseclient-py`, all of which are small in size:

```bash
$ pip install alpaca-py                                                                                                                 
...
Using cached alpaca_py-0.21.1-py3-none-any.whl (111 kB)        
Using cached msgpack-1.0.8-cp312-cp312-macosx_11_0_arm64.whl (85 kB)                                                                                                               
Using cached pydantic-2.7.1-py3-none-any.whl (409 kB)                                 
Using cached pydantic_core-2.18.2-cp312-cp312-macosx_11_0_arm64.whl (1.8 MB)             
Using cached sseclient_py-1.8.0-py2.py3-none-any.whl (8.8 kB)                            
Using cached websockets-12.0-cp312-cp312-macosx_11_0_arm64.whl (121 kB)
Using cached annotated_types-0.7.0-py3-none-any.whl (13 kB)          
...
```

So in `requirements.txt`, I added the small packages:

```toml
msgpack==1.0.8
pydantic==2.7.1
sseclient-py==1.8.0
websockets==12.0
```

Then I downloaded `alpaca-py` in `/vendor` folder (you can simply create one if it doesn’t exist):

```bash
$ pip download alpaca-py==0.21.1
```

Then I deleted all the newly downloaded packages except `alpaca_py-0.21.1-py3-none-any.whl`. Then `unzip` it:

```bash
$ unzip alpaca_py-0.21.1-py3-none-any.whl
$ rm alpaca_py-0.21.1-py3-none-any.whl
```

Now my Lambda deployment succeeds. 🙂
