from setuptools import setup, find_packages

setup(
    name='Koverse',
    version='2.3',
    author='Koverse',
    url='http://koverse.readthedocs.io/en/2.3/',
    packages=find_packages(),
    include_package_data=True,
    zip_safe=True,
    install_requires=[
        'requests',
        'simplejson'],
    extras_require={
        'docs': [
            'sphinx >= 1.5.2',
            'sphinx_rtd_theme']}
)
