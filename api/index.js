import {
  articleRepository,
  authenticationRepository
} from "~/api/repositories";

const httpClient = client => ({
  article: articleRepository(client),
  authentication: authenticationRepository(client)
});

export default httpClient;

export * from './requests';
