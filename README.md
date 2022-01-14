## Updating the Docs

Make the appropriate changes to the `.rst` files ([helpful .rst cheat sheet](https://thomas-cokelaer.info/tutorials/sphinx/rest_syntax.html)). 
Static assets should be added to the `_static` directory.

## Updating the OpenAPI specification

To update the OpenAPI specification, you will need to edit the appropriate files in the `open-api` directory. (`open-api/api.yaml` is the entry point) 

After making the appropriate updates, `cd` to the `open-api` directory and run `npm run build` (make sure you are using the correct node version with `nvm` and that you have installed the dependencies with `npm install`)
This will create the consolidated OpenAPI specification that readthedocs expects at `docs/source/api.yaml` 

Commit your changes to both the `open-api` files and the consolidated specification. 

Readthedocs will now use the updated OpenAPI specification when building the docs. 

## Generating HTML
This setup requires Python and the Python package installer 

Check if Python is installed: `python --version` 
Otherwise download the latest here: https://www.python.org/ 

Check if the installer is available: `pip --version` 
Otherwise follow the instructions here: https://packaging.python.org/tutorials/installing-packages/#id13 

**Note: In some cases if you have both Python 2 and Python 3 installed the `pip` command may be `pip3` (e.g. `pip3 install ...`)**

After Python is set up `cd` into `docs` 

run `pip install -r ./source/requirements.txt` to install packages 

run `make html` to generate HTML in `./build/html` 

Preview the results by opening the `index.html` file in your browser 

**Note: If you are updating the API documentation make sure to build before generating HTML so `api/api.yaml` has the latest changes** 

## Pull Requests
Please build and preview locally before submitting a pull request. If applicable, capture screen shots of the proposed changes and include them for review, thank you! 

## New Minor Releases
For new minor release:
1. Update the version in `open-api/api.yaml` and `docs/source/conf.py`
2. Add version to source/releasenotes.rst
3. Run `npm run build`
4. Add the new version, activate and build it here: https://readthedocs.org/projects/koverse/builds/
