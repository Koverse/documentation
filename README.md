# Updating the OpenAPI specification

To update the OpenAPI specification, you will need to edit the appropriate files in the `open-api` directory. (`open-api/api.yaml` is the entry point)

After making the appropriate updates, `cd` to the `open-api` directory and run `npm run build` (make sure you are using the correct node version with `nvm` and that you have installed the dependencies with `npm install`)
This will create the consolidated OpenAPI specification that readthedocs expects at `docs/source/api.yaml`

Commit your changes to both the `open-api` files and the consolidated specification.

Readthedocs will now use the updated OpenAPI specification when building the docs.
