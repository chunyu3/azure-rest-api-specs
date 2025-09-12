import "@azure-tools/typespec-client-generator-core";

using Azure.ClientGenerator.Core;
using Microsoft.SignalRService;

#suppress "deprecated" "@flattenProperty decorator is not recommended to use."
@@flattenProperty(PrivateLinkResource.properties);

@@clientLocation(WebPubSubResources.get, "WebPubSub");
@@clientLocation(WebPubSubResources.createOrUpdate, "WebPubSub");
@@clientName(WebPubSubResources.createOrUpdate::parameters.resource,
  "parameters"
);
@@clientLocation(WebPubSubResources.update, "WebPubSub");
@@clientName(WebPubSubResources.update::parameters.properties, "parameters");
@@clientLocation(WebPubSubResources.delete, "WebPubSub");
@@clientLocation(WebPubSubResources.listByResourceGroup, "WebPubSub");
@@clientLocation(WebPubSubResources.listBySubscription, "WebPubSub");
@@clientLocation(WebPubSubResources.listKeys, "WebPubSub");
@@clientLocation(WebPubSubResources.regenerateKey, "WebPubSub");
@@clientName(WebPubSubResources.regenerateKey::parameters.body, "parameters");
@@clientLocation(WebPubSubResources.restart, "WebPubSub");
@@clientLocation(WebPubSubResources.listSkus, "WebPubSub");
@@clientLocation(WebPubSubResources.list, "WebPubSubPrivateLinkResources");
#suppress "deprecated" "@flattenProperty decorator is not recommended to use."
@@flattenProperty(WebPubSubResource.properties);

@@clientLocation(PrivateEndpointConnections.get,
  "WebPubSubPrivateEndpointConnections"
);
@@clientLocation(PrivateEndpointConnections.update,
  "WebPubSubPrivateEndpointConnections"
);
@@clientName(PrivateEndpointConnections.update::parameters.resource,
  "parameters"
);
@@clientLocation(PrivateEndpointConnections.delete,
  "WebPubSubPrivateEndpointConnections"
);
@@clientLocation(PrivateEndpointConnections.list,
  "WebPubSubPrivateEndpointConnections"
);
#suppress "deprecated" "@flattenProperty decorator is not recommended to use."
@@flattenProperty(PrivateEndpointConnection.properties);

@@clientLocation(SharedPrivateLinkResources.get,
  "WebPubSubReplicaSharedPrivateLinkResources"
);
@@clientLocation(SharedPrivateLinkResources.createOrUpdate,
  "WebPubSubReplicaSharedPrivateLinkResources"
);
@@clientName(SharedPrivateLinkResources.createOrUpdate::parameters.resource,
  "parameters"
);
@@clientLocation(SharedPrivateLinkResources.list,
  "WebPubSubReplicaSharedPrivateLinkResources"
);
@@clientName(WebPubSubSharedPrivateLinkResources.createOrUpdate::parameters.resource,
  "parameters"
);
#suppress "deprecated" "@flattenProperty decorator is not recommended to use."
@@flattenProperty(SharedPrivateLinkResource.properties);

@@clientLocation(CustomCertificates.get, "WebPubSubCustomCertificates");
@@clientLocation(CustomCertificates.createOrUpdate,
  "WebPubSubCustomCertificates"
);
@@clientName(CustomCertificates.createOrUpdate::parameters.resource,
  "parameters"
);
@@clientLocation(CustomCertificates.delete, "WebPubSubCustomCertificates");
@@clientLocation(CustomCertificates.list, "WebPubSubCustomCertificates");
#suppress "deprecated" "@flattenProperty decorator is not recommended to use."
@@flattenProperty(CustomCertificate.properties);

@@clientLocation(CustomDomains.get, "WebPubSubCustomDomains");
@@clientLocation(CustomDomains.createOrUpdate, "WebPubSubCustomDomains");
@@clientName(CustomDomains.createOrUpdate::parameters.resource, "parameters");
@@clientLocation(CustomDomains.delete, "WebPubSubCustomDomains");
@@clientLocation(CustomDomains.list, "WebPubSubCustomDomains");
#suppress "deprecated" "@flattenProperty decorator is not recommended to use."
@@flattenProperty(CustomDomain.properties);

@@clientName(WebPubSubHubs.createOrUpdate::parameters.resource, "parameters");

@@clientLocation(Replicas.get, "WebPubSubReplicas");
@@clientLocation(Replicas.createOrUpdate, "WebPubSubReplicas");
@@clientName(Replicas.createOrUpdate::parameters.resource, "parameters");
@@clientLocation(Replicas.update, "WebPubSubReplicas");
@@clientName(Replicas.update::parameters.properties, "parameters");
@@clientLocation(Replicas.delete, "WebPubSubReplicas");
@@clientLocation(Replicas.list, "WebPubSubReplicas");
@@clientLocation(Replicas.listReplicaSkus, "WebPubSub");
@@clientLocation(Replicas.restart, "WebPubSubReplicas");
#suppress "deprecated" "@flattenProperty decorator is not recommended to use."
@@flattenProperty(Replica.properties);

@@clientLocation(WebPubSubOperationGroup.checkNameAvailability, "WebPubSub");

@@clientLocation(UsagesOperationGroup.list, "Usages");
