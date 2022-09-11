import { NgModule } from '@angular/core';

import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { ApolloClientOptions, createHttpLink, InMemoryCache, split } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

import { environment } from '@envs/environment';

const httpUri = environment.HTTP_URI;
const wsUrl = environment.WS_URL;

export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  // Create an http link:
  const http = createHttpLink({
    uri: httpUri,
    credentials: 'include',
  });

  const ws = new GraphQLWsLink(
    createClient({
      url: wsUrl,
    })
  );

  const link = split(
    // split based on operation type
    ({ query }) => {
      const definition = getMainDefinition(query);
      return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
    },
    ws,
    http
  );

  return {
    link,
    cache: new InMemoryCache(),
  };
}

@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
