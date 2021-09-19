
## terraform

These settings apply only when `--terraform` is specified on the command line.

``` yaml $(terraform)
terraform:
    cli-name: documentdb
    package-name: documentdb
clear-output-folder: true
output-folder: $(terraform-output-folder)/documentdb
```

``` yaml $(tag) == 'package-2021-06' && $(terraform)
gosdk-folder: services/cosmos-db/mgmt/2021-06-15/documentdb
```

``` yaml $(tag) == 'package-2021-05' && $(terraform)
gosdk-folder: services/cosmos-db/mgmt/2021-05-15/documentdb
```

``` yaml $(tag) == 'package-2021-04' && $(terraform)
gosdk-folder: services/cosmos-db/mgmt/2021-04-15/documentdb
```

``` yaml $(tag) == 'package-2021-04-preview' && $(terraform)
gosdk-folder: services/preview/cosmos-db/mgmt/2021-04-01-preview/documentdb
```

``` yaml $(tag) == 'package-2021-03' && $(terraform)
gosdk-folder: services/cosmos-db/mgmt/2021-03-15/documentdb
```

``` yaml $(tag) == 'package-2021-03-preview' && $(terraform)
gosdk-folder: services/preview/cosmos-db/mgmt/2021-03-01-preview/documentdb
```

``` yaml $(tag) == 'package-2021-01' && $(terraform)
gosdk-folder: services/cosmos-db/mgmt/2021-01-15/documentdb
```

``` yaml $(tag) == 'package-2020-09' && $(terraform)
gosdk-folder: services/preview/cosmos-db/mgmt/2020-09-01-preview/documentdb
```

``` yaml $(tag) == 'package-2020-06-preview' && $(terraform)
gosdk-folder: services/preview/cosmos-db/mgmt/2020-06-01-preview/documentdb
```

``` yaml $(tag) == 'package-2020-04' && $(terraform)
gosdk-folder: services/preview/cosmos-db/mgmt/2020-04-01-preview/documentdb
```

``` yaml $(tag) == 'package-2020-03' && $(terraform)
gosdk-folder: services/preview/cosmos-db/mgmt/2020-03-01-preview/documentdb
```

``` yaml $(tag) == 'package-2019-12' && $(terraform)
gosdk-folder: services/preview/cosmos-db/mgmt/2019-12-12-preview/documentdb
```

``` yaml $(tag) == 'package-2019-08' && $(terraform)
gosdk-folder: services/cosmos-db/mgmt/2019-08-01/documentdb
```

``` yaml $(tag) == 'package-2019-08-preview' && $(terraform)
gosdk-folder: services/preview/cosmos-db/mgmt/2019-08-01-preview/documentdb
```

``` yaml $(tag) == 'package-2015-04' && $(terraform)
gosdk-folder: services/cosmos-db/mgmt/2015-04-08/documentdb
```

``` yaml $(tag) == 'package-2014-04' && $(terraform)
gosdk-folder: services/cosmos-db/mgmt/2014-04/documentdb
```

``` yaml $(tag) == 'package-2015-11' && $(terraform)
gosdk-folder: services/cosmos-db/mgmt/2015-11-06/documentdb
```

``` yaml $(tag) == 'package-2016-03-19' && $(terraform)
gosdk-folder: services/cosmos-db/mgmt/2016-03-19/documentdb
```

``` yaml $(tag) == 'package-2016-03-31' && $(terraform)
gosdk-folder: services/cosmos-db/mgmt/2016-03-31/documentdb
```
