

## Azure CLI

These settings apply only when `--az` is specified on the command line.

``` yaml $(az) && $(target-mode) == "core"
az:
  extensions: agrifood
  namespace: azure.mgmt.agrifood
  package-name: azure-mgmt-agrifood
  disable-checks: true
  randomize-names: true
  test-unique-resource: true
az-output-folder: $(azure-cli-folder)/src/azure-cli/azure/cli/command_modules/agrifood
python-sdk-output-folder: "$(azure-cli-folder)/src/azure-cli/azure/cli/command_modules/agrifood/vendored_sdks/agrifood"
compatible-level: 'track2'
```