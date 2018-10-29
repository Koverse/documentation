import os

from io import open
from setuptools import setup, find_packages

setup(
    name='Koverse',
    version='0.1.0',
    author='Koverse, Inc.',
    author_email='support@koverse.com',
    packages=find_packages(),
    description='Koverse Documentation',
    install_requires=[
      'sphinxcontrib-httpdomain >= 1.5.0',
      'sphinxcontrib-redoc',
    ],
)
