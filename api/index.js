import {
  articleRepository
} from "~/api/repositories";

const httpClient = client => ({
  article: articleRepository(client),
});

export default httpClient;

export * from './requests';
