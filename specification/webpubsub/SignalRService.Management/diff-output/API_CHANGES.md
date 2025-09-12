## Swagger Changes

### Changes for `name`

| Path | Change Type | Value |
|------|------------|-------|
| `paths['/subscriptions/{subscriptionId}/providers/microsoft.SignalRService/locations/{location}/checkNameAvailability'].post.parameters[0].name__deleted` | deleted | `location` |
| `paths['/subscriptions/{subscriptionId}/providers/microsoft.SignalRService/locations/{location}/usages'].get.parameters[0].name__deleted` | deleted | `location` |

### Changes for `in`

| Path | Change Type | Value |
|------|------------|-------|
| `paths['/subscriptions/{subscriptionId}/providers/microsoft.SignalRService/locations/{location}/checkNameAvailability'].post.parameters[0].in__deleted` | deleted | `path` |
| `paths['/subscriptions/{subscriptionId}/providers/microsoft.SignalRService/locations/{location}/usages'].get.parameters[0].in__deleted` | deleted | `path` |

### Changes for `required`

| Path | Change Type | Value |
|------|------------|-------|
| `definitions.CustomCertificateList.required__added` | added | `["value"]` |
| `definitions.CustomDomainList.required__added` | added | `["value"]` |
| `definitions.PrivateEndpointConnectionList.required__added` | added | `["value"]` |
| `definitions.PrivateLinkResourceList.required__added` | added | `["value"]` |
| `definitions.ReplicaList.required__added` | added | `["value"]` |
| `definitions.SharedPrivateLinkResourceList.required__added` | added | `["value"]` |
| `definitions.SignalRServiceUsageList.required__added` | added | `["value"]` |
| `definitions.SkuList.required__added` | added | `["value"]` |
| `definitions.WebPubSubHubList.required__added` | added | `["value"]` |
| `definitions.WebPubSubResourceList.required__added` | added | `["value"]` |
| `paths['/subscriptions/{subscriptionId}/providers/microsoft.SignalRService/locations/{location}/checkNameAvailability'].post.parameters[0].required__deleted` | deleted | `true` |
| `paths['/subscriptions/{subscriptionId}/providers/microsoft.SignalRService/locations/{location}/usages'].get.parameters[0].required__deleted` | deleted | `true` |

### Changes for `type`

| Path | Change Type | Value |
|------|------------|-------|
| `paths['/subscriptions/{subscriptionId}/providers/microsoft.SignalRService/locations/{location}/checkNameAvailability'].post.parameters[0].type__deleted` | deleted | `string` |
| `paths['/subscriptions/{subscriptionId}/providers/microsoft.SignalRService/locations/{location}/usages'].get.parameters[0].type__deleted` | deleted | `string` |

### Changes for `$ref`

| Path | Change Type | Value |
|------|------------|-------|
| `paths['/subscriptions/{subscriptionId}/providers/microsoft.SignalRService/locations/{location}/checkNameAvailability'].post.parameters[0].$ref__added` | added | `../../../../../common-types/resource-management/v5/types.json#/parameters/LocationParameter` |
| `paths['/subscriptions/{subscriptionId}/providers/microsoft.SignalRService/locations/{location}/usages'].get.parameters[0].$ref__added` | added | `../../../../../common-types/resource-management/v5/types.json#/parameters/LocationParameter` |

### Changes for `x-ms-pageable`

| Path | Change Type | Value |
|------|------------|-------|
| `paths['/subscriptions/{subscriptionId}/providers/microsoft.SignalRService/locations/{location}/usages'].get['x-ms-pageable__deleted']` | deleted | `{"nextLinkName":"nextLink"}` |
| `paths['/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.SignalRService/webPubSub/{resourceName}/replicas/{replicaName}/skus'].get['x-ms-pageable__added']` | added | `{"nextLinkName":"nextLink"}` |
| `paths['/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.SignalRService/webPubSub/{resourceName}/skus'].get['x-ms-pageable__added']` | added | `{"nextLinkName":"nextLink"}` |

### Changes for `x-ms-long-running-operation-options`

| Path | Change Type | Value |
|------|------------|-------|
| `paths['/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.SignalRService/webPubSub/{resourceName}'].put['x-ms-long-running-operation-options__deleted']` | deleted | `{"final-state-via":"azure-async-operation"}` |

### Changes for `headers`

| Path | Change Type | Value |
|------|------------|-------|
| `paths['/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.SignalRService/webPubSub/{resourceName}'].delete.responses.202.headers__added` | added | `{"Location":{"type":"string","description":"The Location header contains the URL where the status of...` |
| `paths['/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.SignalRService/webPubSub/{resourceName}'].put.responses.202.headers__added` | added | `{"Location":{"type":"string","description":"The Location header contains the URL where the status of...` |
| `paths['/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.SignalRService/webPubSub/{resourceName}/customCertificates/{certificateName}'].put.responses.201.headers__added` | added | `{"Azure-AsyncOperation":{"type":"string","description":"A link to the status monitor"}}` |
| `paths['/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.SignalRService/webPubSub/{resourceName}/customDomains/{name}'].delete.responses.202.headers__added` | added | `{"Location":{"type":"string","description":"The Location header contains the URL where the status of...` |
| `paths['/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.SignalRService/webPubSub/{resourceName}/hubs/{hubName}'].delete.responses.202.headers__added` | added | `{"Location":{"type":"string","description":"The Location header contains the URL where the status of...` |
| `paths['/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.SignalRService/webPubSub/{resourceName}/hubs/{hubName}'].put.responses.201.headers__added` | added | `{"Azure-AsyncOperation":{"type":"string","description":"A link to the status monitor"}}` |
| `paths['/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.SignalRService/webPubSub/{resourceName}/privateEndpointConnections/{privateEndpointConnectionName}'].delete.responses.202.headers__added` | added | `{"Location":{"type":"string","description":"The Location header contains the URL where the status of...` |
| `paths['/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.SignalRService/webPubSub/{resourceName}/replicas/{replicaName}'].put.responses.201.headers__added` | added | `{"Azure-AsyncOperation":{"type":"string","description":"A link to the status monitor"}}` |
| `paths['/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.SignalRService/webPubSub/{resourceName}/replicas/{replicaName}/sharedPrivateLinkResources/{sharedPrivateLinkResourceName}'].put.responses.201.headers__added` | added | `{"Azure-AsyncOperation":{"type":"string","description":"A link to the status monitor"}}` |
| `paths['/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.SignalRService/webPubSub/{resourceName}/sharedPrivateLinkResources/{sharedPrivateLinkResourceName}'].delete.responses.202.headers__added` | added | `{"Location":{"type":"string","description":"The Location header contains the URL where the status of...` |
| `paths['/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.SignalRService/webPubSub/{resourceName}/sharedPrivateLinkResources/{sharedPrivateLinkResourceName}'].put.responses.201.headers__added` | added | `{"Azure-AsyncOperation":{"type":"string","description":"A link to the status monitor"}}` |

### Changes for `description`

| Path | Change Type | Value |
|------|------------|-------|
| `paths['/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.SignalRService/webPubSub/{resourceName}'].patch.responses.202.headers.Location.description__added` | added | `The Location header contains the URL where the status of the long running operation can be checked.` |
| `paths['/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.SignalRService/webPubSub/{resourceName}/regenerateKey'].post.responses.202.headers.Location.description__added` | added | `The Location header contains the URL where the status of the long running operation can be checked.` |
| `paths['/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.SignalRService/webPubSub/{resourceName}/replicas/{replicaName}'].patch.responses.202.headers.Location.description__added` | added | `The Location header contains the URL where the status of the long running operation can be checked.` |
| `paths['/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.SignalRService/webPubSub/{resourceName}/replicas/{replicaName}/restart'].post.responses.202.headers.Location.description__added` | added | `The Location header contains the URL where the status of the long running operation can be checked.` |
| `paths['/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.SignalRService/webPubSub/{resourceName}/restart'].post.responses.202.headers.Location.description__added` | added | `The Location header contains the URL where the status of the long running operation can be checked.` |

### Changes for `consumes`

| Path | Change Type | Value |
|------|------------|-------|
| `paths['/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.SignalRService/webPubSub/{resourceName}/customCertificates/{certificateName}'].put.consumes__deleted` | deleted | `["application/json","text/json"]` |
| `paths['/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.SignalRService/webPubSub/{resourceName}/customDomains/{name}'].put.consumes__deleted` | deleted | `["application/json","text/json"]` |
| `paths['/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.SignalRService/webPubSub/{resourceName}/replicas/{replicaName}'].patch.consumes__deleted` | deleted | `["application/json","text/json"]` |
| `paths['/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.SignalRService/webPubSub/{resourceName}/replicas/{replicaName}'].put.consumes__deleted` | deleted | `["application/json","text/json"]` |
| `paths['/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.SignalRService/webPubSub/{resourceName}/replicas/{replicaName}/sharedPrivateLinkResources/{sharedPrivateLinkResourceName}'].put.consumes__deleted` | deleted | `["application/json","text/json"]` |

### Changes for `final-state-schema`

| Path | Change Type | Value |
|------|------------|-------|
| `paths['/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.SignalRService/webPubSub/{resourceName}/customCertificates/{certificateName}'].put['x-ms-long-running-operation-options']['final-state-schema__added']` | added | `#/definitions/CustomCertificate` |
| `paths['/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.SignalRService/webPubSub/{resourceName}/customDomains/{name}'].put['x-ms-long-running-operation-options']['final-state-schema__added']` | added | `#/definitions/CustomDomain` |
| `paths['/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.SignalRService/webPubSub/{resourceName}/hubs/{hubName}'].put['x-ms-long-running-operation-options']['final-state-schema__added']` | added | `#/definitions/WebPubSubHub` |
| `paths['/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.SignalRService/webPubSub/{resourceName}/replicas/{replicaName}'].put['x-ms-long-running-operation-options']['final-state-schema__added']` | added | `#/definitions/Replica` |
| `paths['/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.SignalRService/webPubSub/{resourceName}/replicas/{replicaName}/sharedPrivateLinkResources/{sharedPrivateLinkResourceName}'].put['x-ms-long-running-operation-options']['final-state-schema__added']` | added | `#/definitions/SharedPrivateLinkResource` |
| `paths['/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.SignalRService/webPubSub/{resourceName}/sharedPrivateLinkResources/{sharedPrivateLinkResourceName}'].put['x-ms-long-running-operation-options']['final-state-schema__added']` | added | `#/definitions/SharedPrivateLinkResource` |

### Changes for `schema`

| Path | Change Type | Value |
|------|------------|-------|
| `paths['/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.SignalRService/webPubSub/{resourceName}/regenerateKey'].post.responses.202.schema__deleted` | deleted | `{"$ref":"#/definitions/WebPubSubKeys"}` |

### Changes for `minLength`

| Path | Change Type | Value |
|------|------------|-------|
| `paths['/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.SignalRService/webPubSub/{resourceName}/replicas/{replicaName}/sharedPrivateLinkResources'].get.parameters[0].minLength__deleted` | deleted | `3` |
| `paths['/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.SignalRService/webPubSub/{resourceName}/replicas/{replicaName}/sharedPrivateLinkResources'].get.parameters[1].minLength__deleted` | deleted | `3` |
| `paths['/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.SignalRService/webPubSub/{resourceName}/replicas/{replicaName}/sharedPrivateLinkResources/{sharedPrivateLinkResourceName}'].get.parameters[0].minLength__deleted` | deleted | `3` |
| `paths['/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.SignalRService/webPubSub/{resourceName}/replicas/{replicaName}/sharedPrivateLinkResources/{sharedPrivateLinkResourceName}'].get.parameters[1].minLength__deleted` | deleted | `3` |
| `paths['/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.SignalRService/webPubSub/{resourceName}/replicas/{replicaName}/sharedPrivateLinkResources/{sharedPrivateLinkResourceName}'].get.parameters[2].minLength__deleted` | deleted | `3` |
| `paths['/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.SignalRService/webPubSub/{resourceName}/replicas/{replicaName}/sharedPrivateLinkResources/{sharedPrivateLinkResourceName}'].put.parameters[0].minLength__deleted` | deleted | `3` |
| `paths['/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.SignalRService/webPubSub/{resourceName}/replicas/{replicaName}/sharedPrivateLinkResources/{sharedPrivateLinkResourceName}'].put.parameters[1].minLength__deleted` | deleted | `3` |
| `paths['/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.SignalRService/webPubSub/{resourceName}/replicas/{replicaName}/sharedPrivateLinkResources/{sharedPrivateLinkResourceName}'].put.parameters[2].minLength__deleted` | deleted | `3` |
| `paths['/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.SignalRService/webPubSub/{resourceName}/sharedPrivateLinkResources'].get.parameters[0].minLength__deleted` | deleted | `3` |
| `paths['/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.SignalRService/webPubSub/{resourceName}/sharedPrivateLinkResources/{sharedPrivateLinkResourceName}'].delete.parameters[1].minLength__deleted` | deleted | `3` |
| `paths['/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.SignalRService/webPubSub/{resourceName}/sharedPrivateLinkResources/{sharedPrivateLinkResourceName}'].get.parameters[1].minLength__deleted` | deleted | `3` |
| `paths['/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.SignalRService/webPubSub/{resourceName}/sharedPrivateLinkResources/{sharedPrivateLinkResourceName}'].put.parameters[1].minLength__deleted` | deleted | `3` |

### Changes for `maxLength`

| Path | Change Type | Value |
|------|------------|-------|
| `paths['/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.SignalRService/webPubSub/{resourceName}/replicas/{replicaName}/sharedPrivateLinkResources'].get.parameters[0].maxLength__deleted` | deleted | `63` |
| `paths['/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.SignalRService/webPubSub/{resourceName}/replicas/{replicaName}/sharedPrivateLinkResources'].get.parameters[1].maxLength__deleted` | deleted | `63` |
| `paths['/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.SignalRService/webPubSub/{resourceName}/replicas/{replicaName}/sharedPrivateLinkResources/{sharedPrivateLinkResourceName}'].get.parameters[0].maxLength__deleted` | deleted | `63` |
| `paths['/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.SignalRService/webPubSub/{resourceName}/replicas/{replicaName}/sharedPrivateLinkResources/{sharedPrivateLinkResourceName}'].get.parameters[1].maxLength__deleted` | deleted | `63` |
| `paths['/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.SignalRService/webPubSub/{resourceName}/replicas/{replicaName}/sharedPrivateLinkResources/{sharedPrivateLinkResourceName}'].get.parameters[2].maxLength__deleted` | deleted | `63` |
| `paths['/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.SignalRService/webPubSub/{resourceName}/replicas/{replicaName}/sharedPrivateLinkResources/{sharedPrivateLinkResourceName}'].put.parameters[0].maxLength__deleted` | deleted | `63` |
| `paths['/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.SignalRService/webPubSub/{resourceName}/replicas/{replicaName}/sharedPrivateLinkResources/{sharedPrivateLinkResourceName}'].put.parameters[1].maxLength__deleted` | deleted | `63` |
| `paths['/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.SignalRService/webPubSub/{resourceName}/replicas/{replicaName}/sharedPrivateLinkResources/{sharedPrivateLinkResourceName}'].put.parameters[2].maxLength__deleted` | deleted | `63` |
| `paths['/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.SignalRService/webPubSub/{resourceName}/sharedPrivateLinkResources'].get.parameters[0].maxLength__deleted` | deleted | `63` |
| `paths['/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.SignalRService/webPubSub/{resourceName}/sharedPrivateLinkResources/{sharedPrivateLinkResourceName}'].delete.parameters[1].maxLength__deleted` | deleted | `63` |
| `paths['/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.SignalRService/webPubSub/{resourceName}/sharedPrivateLinkResources/{sharedPrivateLinkResourceName}'].get.parameters[1].maxLength__deleted` | deleted | `63` |
| `paths['/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.SignalRService/webPubSub/{resourceName}/sharedPrivateLinkResources/{sharedPrivateLinkResourceName}'].put.parameters[1].maxLength__deleted` | deleted | `63` |

### Changes for `Dimension`

| Path | Change Type | Value |
|------|------------|-------|
| `definitions.Dimension__deleted` | deleted | `{"type":"object","properties":{"name":{"type":"string"},"displayName":{"type":"string"},"internalNam...` |

### Changes for `LogSpecification`

| Path | Change Type | Value |
|------|------------|-------|
| `definitions.LogSpecification__deleted` | deleted | `{"type":"object","properties":{"name":{"type":"string"},"displayName":{"type":"string"}}}` |

### Changes for `MetricSpecification`

| Path | Change Type | Value |
|------|------------|-------|
| `definitions.MetricSpecification__deleted` | deleted | `{"type":"object","properties":{"name":{"type":"string"},"displayName":{"type":"string"},"displayDesc...` |

### Changes for `Operation`

| Path | Change Type | Value |
|------|------------|-------|
| `definitions.Operation__deleted` | deleted | `{"type":"object","properties":{"name":{"type":"string"},"isDataAction":{"type":"boolean"},"display":...` |

### Changes for `OperationDisplay`

| Path | Change Type | Value |
|------|------------|-------|
| `definitions.OperationDisplay__deleted` | deleted | `{"type":"object","properties":{"provider":{"type":"string"},"resource":{"type":"string"},"operation"...` |

### Changes for `OperationList`

| Path | Change Type | Value |
|------|------------|-------|
| `definitions.OperationList__deleted` | deleted | `{"type":"object","description":"[Placeholder] Discription for page model","properties":{"value":{"ty...` |

### Changes for `OperationProperties`

| Path | Change Type | Value |
|------|------------|-------|
| `definitions.OperationProperties__deleted` | deleted | `{"type":"object","properties":{"serviceSpecification":{"$ref":"#/definitions/ServiceSpecification"}}...` |

### Changes for `ServiceSpecification`

| Path | Change Type | Value |
|------|------------|-------|
| `definitions.ServiceSpecification__deleted` | deleted | `{"type":"object","properties":{"metricSpecifications":{"type":"array","items":{"$ref":"#/definitions...` |

### Changes for `Azure.ResourceManager.ArmResponse<WebPubSubKeys>`

| Path | Change Type | Value |
|------|------------|-------|
| `definitions['Azure.ResourceManager.ArmResponse<WebPubSubKeys>__added']` | added | `{"type":"object","properties":{"body":{"$ref":"#/definitions/WebPubSubKeys"}},"required":["body"]}` |

### Changes for `TypeSpec.Http.NoContentResponse`

| Path | Change Type | Value |
|------|------------|-------|
| `definitions['TypeSpec.Http.NoContentResponse__added']` | added | `{"type":"object"}` |

### Changes for `readOnly`

| Path | Change Type | Value |
|------|------------|-------|
| `definitions.SkuList.properties.value.readOnly__deleted` | deleted | `true` |

### Changes for `x-ms-identifiers`

| Path | Change Type | Value |
|------|------------|-------|
| `definitions.SkuList.properties.value['x-ms-identifiers__deleted']` | deleted | `["resourceType","/sku/name","/sku/tier"]` |

### Changes for `x-ms-client-flatten`

| Path | Change Type | Value |
|------|------------|-------|
| `definitions.WebPubSubHub.properties.properties['x-ms-client-flatten__added']` | added | `true` |

### Changes for `x-ms-secret`

| Path | Change Type | Value |
|------|------------|-------|
| `definitions.WebPubSubKeys.properties.primaryConnectionString['x-ms-secret__deleted']` | deleted | `true` |
| `definitions.WebPubSubKeys.properties.primaryKey['x-ms-secret__deleted']` | deleted | `true` |
| `definitions.WebPubSubKeys.properties.secondaryConnectionString['x-ms-secret__deleted']` | deleted | `true` |
| `definitions.WebPubSubKeys.properties.secondaryKey['x-ms-secret__deleted']` | deleted | `true` |

### Changes for `maxItems`

| Path | Change Type | Value |
|------|------------|-------|
| `definitions.WebPubSubNetworkACLs.properties.ipRules.maxItems__deleted` | deleted | `30` |

### Changes for `default`

| Path | Change Type | Value |
|------|------------|-------|
| `definitions.WebPubSubProperties.properties.disableAadAuth.default__deleted` | deleted | `false` |
| `definitions.WebPubSubProperties.properties.disableLocalAuth.default__deleted` | deleted | `false` |
| `definitions.WebPubSubTlsSettings.properties.clientCertEnabled.default__deleted` | deleted | `false` |

## Modified Values

| Path | Old Value | New Value |
|------|-----------|----------|
| `paths['/providers/microsoft.SignalRService/operations'].get.responses.200.schema.$ref` | `#/definitions/OperationList` | `../../../../../common-types/resource-management/v5/types.json#/definitions/OperationListResult` |
| `paths['/subscriptions/{subscriptionId}/providers/microsoft.SignalRService/locations/{location}/checkNameAvailability'].post.parameters[1].name` | `parameters` | `body` |
| `paths['/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/microsoft.SignalRService/webPubSub/{resourceName}/customDomains/{name}'].put['x-ms-long-running-operation-options']['final-state-via']` | `azure-async-operation` | `original-uri` |

