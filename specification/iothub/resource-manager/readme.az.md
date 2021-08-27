

## Azure CLI

These settings apply only when `--az` is specified on the command line.

``` yaml $(az) && $(target-mode) == "core"
az:
  extensions: iothub
  namespace: azure.mgmt.iothub
  package-name: azure-mgmt-iothub
  disable-checks: true
  randomize-names: true
  test-unique-resource: true
az-output-folder: $(azure-cli-folder)/src/azure-cli/azure/cli/command_modules/iothub
python-sdk-output-folder: "$(azure-cli-folder)/src/azure-cli/azure/cli/command_modules/iothub/vendored_sdks/iothub"
compatible-level: 'track2'
```