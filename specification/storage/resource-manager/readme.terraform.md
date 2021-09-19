
## terraform

These settings apply only when `--terraform` is specified on the command line.

``` yaml $(terraform)
terraform:
    cli-name: storage
    package-name: storage
clear-output-folder: true
output-folder: $(terraform-output-folder)/storage
```

``` yaml $(tag) == 'package-2021-04' && $(terraform)
gosdk-folder: services/storage/mgmt/2021-04-01/storage
```

``` yaml $(tag) == 'package-2021-02' && $(terraform)
gosdk-folder: services/storage/mgmt/2021-02-01/storage
```

``` yaml $(tag) == 'package-2021-01' && $(terraform)
gosdk-folder: services/storage/mgmt/2021-01-01/storage
```

``` yaml $(tag) == 'package-2020-08-preview' && $(terraform)
gosdk-folder: services/preview/storage/mgmt/2020-08-01-preview/storage
```

``` yaml $(tag) == 'package-2019-06' && $(terraform)
gosdk-folder: services/storage/mgmt/2019-06-01/storage
```

``` yaml $(tag) == 'package-2019-04' && $(terraform)
gosdk-folder: services/storage/mgmt/2019-04-01/storage
```

``` yaml $(tag) == 'package-2018-11' && $(terraform)
gosdk-folder: services/storage/mgmt/2018-11-01/storage
```

``` yaml $(tag) == 'package-2018-07' && $(terraform)
gosdk-folder: services/preview/storage/mgmt/2018-07-01-preview/storage
```

``` yaml $(tag) == 'package-2018-03' && $(terraform)
gosdk-folder: services/preview/storage/mgmt/2018-03-01-preview/storage
```

``` yaml $(tag) == 'package-2018-02' && $(terraform)
gosdk-folder: services/storage/mgmt/2018-02-01/storage
```

``` yaml $(tag) == 'package-2017-10' && $(terraform)
gosdk-folder: services/storage/mgmt/2017-10-01/storage
```

``` yaml $(tag) == 'package-2017-06' && $(terraform)
gosdk-folder: services/storage/mgmt/2017-06-01/storage
```

``` yaml $(tag) == 'package-2016-12' && $(terraform)
gosdk-folder: services/storage/mgmt/2016-12-01/storage
```

``` yaml $(tag) == 'package-2016-05' && $(terraform)
gosdk-folder: services/storage/mgmt/2016-05-01/storage
```

``` yaml $(tag) == 'package-2016-01' && $(terraform)
gosdk-folder: services/storage/mgmt/2016-01-01/storage
```

``` yaml $(tag) == 'package-2015-06' && $(terraform)
gosdk-folder: services/storage/mgmt/2015-06-15/storage
```

``` yaml $(tag) == 'package-2015-05-preview' && $(terraform)
gosdk-folder: services/preview/storage/mgmt/2015-05-01-preview/storage
```
